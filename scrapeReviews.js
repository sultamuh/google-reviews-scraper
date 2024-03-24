const fs = require('fs').promises;
const {
  initBrowser,
  getTotalReviews,
  scrollAndLoadReviews,
  extractReviewData,
} = require('./browser');
const logger = require('./logger');

const scrapeReviews = async (businessName) => {
  try {
    const page = await initBrowser(businessName);
    const totalReviews = await getTotalReviews(page);
    await scrollAndLoadReviews(page, totalReviews);
    const reviewData = await page.evaluate(extractReviewData);

    logger.info(
      `Successfully scraped ${
        Object.keys(reviewData).length
      } out of ${totalReviews} review(s) for ${businessName}.`,
    );

    return reviewData;
  } catch (error) {
    logger.error(`Error occurred during scraping for ${businessName}:`, error);
    throw new Error(`An error occurred during scraping for ${businessName}`);
  }
};

(async () => {
  try {
    const businessName = process.argv[2];
    if (!businessName) {
      throw new Error(`Script usage: node scrapeReviews.js "business name"`);
    }

    logger.info(`Starting scraping process for ${businessName}`);
    const reviewData = await scrapeReviews(businessName);

    const filePath = `output_${businessName.replace(/\s+/g, '_')}.json`;
    await fs.writeFile(filePath, JSON.stringify(reviewData, null, 2));
    logger.info(
      `Reviews scraped successfully for ${businessName}, please check ${filePath}`,
    );
    process.exit(0);
  } catch (error) {
    logger.error('Error occurred:', error);
    process.exit(1);
  }
})();
