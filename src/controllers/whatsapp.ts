import { Request, Response } from "express";
import { openWebWhatsapp } from "../services/webWhatsappService";
import { SendMessagesBody } from "../models/messages";
import { sendPushNotification } from "../services/pushNotificationService";

export const sendMessages = async (req: Request, res: Response) => {
  const { browser, page } = await openWebWhatsapp();

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
