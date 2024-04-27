import puppeteer, { Browser, Page } from "puppeteer";
import { lauchOptions } from "../config/puppeteer";

export const openWebWhatsapp = async (): Promise<{ browser: Browser; page: Page }> => {
  try {
    const browser = await puppeteer.launch(lauchOptions);
    const page = (await browser.pages())[0];

    await page.setUserAgent(process.env.USER_AGENT!);
    await page.setDefaultTimeout(3 * 60 * 1000);

    await page.goto("https://web.whatsapp.com");

    return { browser, page };
  } catch (error) {
    console.error("An error occured while opening web Whatsapp:", JSON.stringify(error));
    throw new Error("Failed to open web-whatsapp");
  }
};

export const showsAuthenticateScreen = async (page: Page) => {
  await page.waitForNetworkIdle();
  return !!(await page.$('div[id="wa_web_initial_startup"]'));
};
