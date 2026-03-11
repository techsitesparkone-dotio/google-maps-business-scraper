const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const path = require("path");
const { Parser } = require("json2csv");

const delay = require("./utils/delay");
const logger = require("./utils/logger");
const extractEmail = require("./utils/emailExtractor");

const { SEARCH_QUERY, MAX_SCROLL, DELAY } = require("./config");

let leads = [];

async function search(page) {
  logger.info("Opening Google Maps");

  await page.goto("https://www.google.com/maps", {
    waitUntil: "domcontentloaded",
  });

  await delay(5000);

  await page.waitForSelector(".NhWQq");

  await page.type(".NhWQq", SEARCH_QUERY);

  await page.keyboard.press("Enter");

  await page.waitForSelector('div[role="feed"]');

  logger.success("Search loaded");
}

async function scrollResults(page) {
  logger.info("Scrolling results");

  const feedSelector = 'div[role="feed"]';

  await page.waitForSelector(feedSelector);

  let previousCount = 0;

  for (let i = 0; i < 50; i++) {
    // scroll panel
    await page.evaluate((selector) => {
      const feed = document.querySelector(selector);
      feed.scrollTop = feed.scrollHeight;
    }, feedSelector);

    await delay(3000);

    // count loaded business cards
    const currentCount = await page.evaluate(() => {
      return document.querySelectorAll('a[href*="/maps/place"]').length;
    });

    logger.info(`Loaded businesses: ${currentCount}`);

    if (currentCount === previousCount) {
      logger.success("No more new results");
      break;
    }

    previousCount = currentCount;
  }
}

async function getResultCards(page) {
  return await page.$$('div[role="feed"] a[href*="/maps/place"]');
}

async function scrapeBusiness(page) {
  const data = await page.evaluate(() => {
    const getText = (sel) => document.querySelector(sel)?.innerText || null;

    const name = getText("h1");

    const rating =
      document.querySelector('div[role="img"]')?.getAttribute("aria-label") ||
      null;

    const category = getText('button[jsaction*="pane.rating.category"]');

    const address = getText('button[data-item-id="address"]');

    const phone = getText('button[data-item-id^="phone"]');

    const website =
      document.querySelector('a[data-item-id="authority"]')?.href || null;

    return {
      name,
      rating,
      category,
      phone,
      website,
      address,
      maps_url: window.location.href,
    };
  });

  return data;
}

async function saveData(data) {
  const output = path.join(__dirname, "output");

  await fs.ensureDir(output);

  const jsonPath = path.join(output, "leads.json");
  const csvPath = path.join(output, "leads.csv");

  await fs.writeJson(jsonPath, data, { spaces: 2 });

  const parser = new Parser();

  const csv = parser.parse(data);

  await fs.writeFile(csvPath, csv);

  logger.success("Data saved");
}

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  try {
    await search(page);

    await scrollResults(page);

    const cards = await getResultCards(page);

    logger.success(`Found ${cards.length} businesses`);

    for (let i = 0; i < cards.length; i++) {
      try {
        await cards[i].click();

        await delay(3000);

        const business = await scrapeBusiness(page);

        if (business.website) {
          business.email = await extractEmail(business.website);
        }

        leads.push(business);

        logger.info(`Scraped ${business.name}`);
      } catch (err) {
        logger.error("Failed scraping business");
      }
    }

    await saveData(leads);
  } catch (err) {
    logger.error(err.message);
  } finally {
    await browser.close();
  }
}

run();
