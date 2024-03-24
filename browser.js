const puppeteer = require('puppeteer');
const logger = require('./logger');

const initBrowser = async (businessName) => {
  try {
    logger.info(`Initializing browser for ${businessName}`);
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome-stable',
      defaultViewport: null,
      args: ['--start-maximized'],
    });
    const [page] = await browser.pages();
    await navigateToGoogleMaps(page);
    await searchAndNavigateToBusinessReviews(page, businessName);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    logger.info(`Browser initialized for ${businessName}`);
    return page;
  } catch (error) {
    logger.error('Error initializing browser:', error);
    throw new Error('Error initializing browser');
  }
};

const navigateToGoogleMaps = async (page) => {
  try {
    logger.info('Navigating to Google Maps');
    await page.goto('https://www.google.com/maps');
    await page.waitForSelector('input[id="searchboxinput"]');
    await page.click('input[id="searchboxinput"]');
  } catch (error) {
    logger.error('Error navigating to Google Maps:', error);
    throw new Error('Error navigating to Google Maps');
  }
};

const searchAndNavigateToBusinessReviews = async (page, businessName) => {
  try {
    logger.info(
      `Searching and navigating to business reviews for ${businessName}`,
    );
    await page.type('input[id="searchboxinput"]', businessName);
    await page.waitForSelector(
      'div[aria-label="Suggestions"] > div[data-index="0"]',
    );
    await page.click('div[aria-label="Suggestions"] > div[data-index="0"]');
    await page.waitForSelector('div[role="tablist"]');
    await page.click('div[role="tablist"]');
  } catch (error) {
    logger.error('Error searching and navigating to business reviews:', error);
    throw new Error('Error searching and navigating to business reviews');
  }
};

const getTotalReviews = async (page) => {
  try {
    logger.info('Getting total reviews');
    const totalReviewsSelector =
      'div.m6QErb.DxyBCb.kA9KIf.dS8AEf > div.PPCwl > div > div.jANrlb > div.fontBodySmall';
    const totalReviews = await page.evaluate((totalReviewsSelector) => {
      const div = document.querySelector(totalReviewsSelector);
      return div ? div.innerHTML.split(' ')[0] : null;
    }, totalReviewsSelector);
    logger.info(`Total reviews found: ${totalReviews}`);
    return totalReviews;
  } catch (error) {
    logger.error('Error getting total reviews:', error);
    throw new Error('Error getting total reviews');
  }
};

const scrollAndLoadReviews = async (page, totalReviews) => {
  try {
    logger.info('Scrolling and loading reviews');
    const loadedReviewsSelector = 'div.jftiEf.fontBodyMedium';
    const reviewsSelector = 'div.m6QErb.DxyBCb.kA9KIf.dS8AEf';

    let previousLoadedReviews = 0;
    let currentLoadedReviews;
    let dynamicDelay = 1000; // Starting dynamic delay

    while (true) {
      currentLoadedReviews = await page.$$eval(
        loadedReviewsSelector,
        (divs) => divs.length,
      );
      await page.evaluate((reviewsSelector) => {
        const div = document.querySelector(reviewsSelector);
        div.scrollTop = div.scrollHeight;
      }, reviewsSelector);
      await new Promise((resolve) => setTimeout(resolve, dynamicDelay)); // Wait for the dynamic delay
      logger.info(`Loaded reviews: ${currentLoadedReviews}`);

      await page.evaluate(() => {
        const buttons = document.querySelectorAll(
          '.MyEned > span:nth-child(2) > button',
        );
        buttons.forEach((button) => button.click());
      });

      if (currentLoadedReviews === previousLoadedReviews) {
        dynamicDelay = Math.min(dynamicDelay + 1000, 10000); // Increase the delay by 1000 milliseconds, up to a maximum of 10000 milliseconds
      } else {
        dynamicDelay = 1000;
      }

      previousLoadedReviews = currentLoadedReviews;

      if (currentLoadedReviews >= totalReviews) {
        break;
      }
    }
  } catch (error) {
    logger.error('Error scrolling and loading reviews:', error);
    throw new Error('Error scrolling and loading reviews');
  }
};

module.exports = {
  initBrowser,
  getTotalReviews,
  scrollAndLoadReviews,
};
