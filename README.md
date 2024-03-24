### Introduction

This repository contains a Node.js script (`scrapeReviews.js`) to scrape reviews of a business from Google Maps using Puppeteer. The script is designed to gather reviews efficiently and log relevant information during the scraping process. It is accompanied by supporting modules (`browser.js` and `logger.js`) to manage browser interactions and logging respectively.

### Dependencies

Before running the script, ensure you have the following dependencies installed:

- Node.js: Make sure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine using the following command:
   `git clone https://github.com/sultamuh/google-reviews-scraper.git`
2. Navigate to the project directory:
   `cd google-reviews-scraper`
3. Install the required npm packages by running:
   `npm install`

### Update Browser Path & Headless Mode (Optional)

Before running the script, ensure to update the browser path in the `browser.js` file. Locate the following line:

```javascript
executablePath: '/usr/bin/google-chrome-stable',
```

Set headless to false if you want to show the browser GUI during scraping. By default, it is set to true for headless mode.

```javascript
headless: true,
```

### Usage

To scrape reviews for a business on Google Maps, follow these steps:

1. **Run the Command**:
   Open a terminal in the project directory and run the following command:
   `node scrapeReviews.js "business name"`
   Replace `"business name"` with the name of the business whose reviews you want to scrape. Make sure to enclose the business name in double quotes if it contains spaces.

2. **Wait for Completion**:
   The script will start scraping reviews for the specified business. It will log progress information to the console and create an output file named `output_business_name.json` containing the scraped review data.

3. **Review Output**:
   Once the scraping process is complete, you can find the scraped review data in the `output_business_name.json` file. Additionally, logs are stored in `info.log` and `errors.log` files for reference.

### Why This Scraper?

Building websites often requires showcasing customer reviews, and while there are various solutions available, many come with a cost, especially when integrating with Google's API for reviews. Frustrated with the lack of free alternatives, I decided to build this scraper. Now, anyone can use it to gather Google reviews without the need for an API key. Simply utilize the `output_business_name.json` file generated by the script, which contains all the review data you need.

### Contribution

I would love if other people could contribute to this project. Whether it's adding new features, improving existing ones, or fixing bugs, every contribution is welcomed! Feel free to fork this repository, make your changes, and submit a pull request.

### Additional Notes

- **Logging**: The script utilizes Winston for logging. Logs are categorized into different levels (`silly`, `info`, `warn`, `error`), and are written to both the console and log files (`info.log` and `errors.log`).
- **Browser Interaction**: The `browser.js` module handles browser initialization, navigation, and review loading using Puppeteer.
- **Scraping Logic**: The main scraping logic is implemented in `scrapeReviews.js`, where review data is extracted from the loaded page using DOM manipulation techniques.
- **Error Handling**: The script includes error handling mechanisms to gracefully manage exceptions and provide meaningful error messages.
- **Dependencies**: The project relies on Puppeteer and Winston packages, which are installed automatically during setup (`npm install`).

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
