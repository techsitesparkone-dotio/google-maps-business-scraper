# Google Maps Business Scraper

A **Node.js web scraping tool** built using Puppeteer that extracts business listings from Google Maps search results.

The scraper automatically searches a query, scrolls through the results panel, and collects business data such as **name, rating, reviews, and address**.

---

## Tech Stack

- Node.js
- Puppeteer
- json2csv
- dotenv

---

## Features

- Automated browser control using Puppeteer
- Search businesses on Google Maps
- Automatic scrolling to load more results
- Extract business details
- Export data to **JSON and CSV**
- Retry logic for stability
- Console logging for scraping progress

---

## Extracted Data

The scraper collects the following information:

- Business Name
- Rating
- Review Count
- Address

---

## Output Example

### JSON

```json
[
  {
    "name": "Smile Dental Clinic",
    "rating": "4.8",
    "reviews": "120 reviews",
    "address": "New York, USA"
  },
  {
    "name": "City Dental Care",
    "rating": "4.6",
    "reviews": "89 reviews",
    "address": "New York, USA"
  }
]

CSV

name,rating,reviews,address
Smile Dental Clinic,4.8,120 reviews,New York USA
City Dental Care,4.6,89 reviews,New York USA


⸻

Installation

Clone the repository:

git clone https://github.com/techsitesparkone-dotio/google-maps-business-scraper.git

Navigate to the project folder:

cd google-maps-business-scraper

Install dependencies:

npm install


⸻

Run the Scraper

node scraper.js


⸻

Project Structure

google-maps-business-scraper
│
├── scraper.js
├── config.js
├── utils/
├── output/
├── package.json
└── README.md


⸻

Disclaimer

This project is for educational and research purposes only.
Ensure compliance with Google Maps terms of service before using the scraper for commercial purposes.

⸻

Author

Built by Ritesh Sharma

---
