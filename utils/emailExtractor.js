const axios = require("axios");

async function extractEmail(url) {
  try {
    const { data } = await axios.get(url, { timeout: 10000 });

    const emails = data.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
    );

    return emails ? emails[0] : null;
  } catch {
    return null;
  }
}

module.exports = extractEmail;