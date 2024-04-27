import { PuppeteerLaunchOptions } from "puppeteer";

export const lauchOptions: PuppeteerLaunchOptions = {
  userDataDir: "./user_data",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath: "/usr/bin/google-chrome-stable",
};
