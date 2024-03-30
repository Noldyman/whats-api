import puppeteer, { Browser, Page } from "puppeteer";

export const openWebWhatsapp = async (): Promise<{ browser: Browser; page: Page }> => {
  try {
    const browser = await puppeteer.launch({
      // headless: false,
      userDataDir: "./user_data",
    });
    const page = await browser.newPage();

    await page.setUserAgent(process.env.USER_AGENT!);
    await page.goto("https://web.whatsapp.com");

    return { browser, page };
  } catch (error) {
    console.error("An error occured while opening web Whatsapp:", JSON.stringify(error));
    throw new Error("Failed to open web-whatsapp");
  }
};

export const showsAuthenticateScreen = async (page: Page) => {
  await page.waitForNetworkIdle();
  return !!(await page.$('div[id="initial_startup"]'));
};
