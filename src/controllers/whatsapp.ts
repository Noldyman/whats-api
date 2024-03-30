import { Request, Response } from "express";
import { openWebWhatsapp, showsAuthenticateScreen } from "../services/webWhatsappService";
import { SendMessagesBody } from "../models/messages";
import { sendPushNotification } from "../services/pushNotificationService";

export const authenticate = async (req: Request, res: Response) => {
  const { browser, page } = await openWebWhatsapp();

  if (!showsAuthenticateScreen(page)) res.send("Already authenticated");

  await page.waitForSelector('canvas[aria-label="Scan me!"]');
  const encodedScreenShot = await page.screenshot({ encoding: "base64" });

  res.send(`<img src="data:image/png;base64,${encodedScreenShot}" alt="No QR code" />`);

  await page.waitForNavigation({ timeout: 2 * 60 * 1000 });
  await page.waitForNetworkIdle();
  await browser.close();
};

export const sendMessages = async (req: Request, res: Response) => {
  const { browser, page } = await openWebWhatsapp();

  if (await showsAuthenticateScreen(page)) {
    await browser.close();
    await sendPushNotification("Failed to send a message. Authentication required.");
    return res.status(401).send("Not authenticated");
  }

  await page.waitForNavigation();

  try {
    const { messages } = req.body as SendMessagesBody;

    for (const message of messages) {
      await page.click('div[title="Nieuwe chat"]');
      await page.waitForNetworkIdle();

      await page.type('div[title="Tekstvak zoekopdracht"]', message.phoneNumber);
      await page.waitForNetworkIdle();

      await page.click(`span[title="${message.recipientName}"]`);
      await page.waitForNetworkIdle();

      await page.type('div[title="Typ een bericht"]', message.text);
      await page.keyboard.press("Enter");
      await page.waitForNetworkIdle();

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    await sendPushNotification(
      `A whatsapp message was sent to: ${messages.map((m) => m.recipientName).join(", ")}.`
    );
    await browser.close();
    res.send(`${messages.length} messages were sent...`);
  } catch (error) {
    console.error("Sending message failed with error:", JSON.stringify(error));
    await browser.close();
    res.status(500).send(error);
  }
};
