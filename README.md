# Google Maps Business Scraper

A Node.js web scraper built with Puppeteer that extracts business listings from Google Maps search results.

The scraper automatically searches a query, scrolls the results panel, and collects business information such as name, rating, reviews, and address.

## Tech Stack

Node.js
Puppeteer
JSON2CSV
dotenv



## Features

• Automated browser control with Puppeteer
• Searches businesses on Google Maps
• Infinite scrolling to load all results
• Extracts business details
• Saves results to JSON and CSV
• Retry logic for reliability
• Console logging for progress tracking



Output Sample
JSON
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


How to Run
## Installation

git clone https://github.com/yourusername/google-maps-business-scraper

cd google-maps-business-scraper

npm install


Run the scraper
node scraper.js
