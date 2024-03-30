export const sendPushNotification = async (text: string) => {
  const payload = {
    title: "Whatsapp API",
    message: text,
  };

  try {
    await fetch(
      `${process.env.SERVER_BASE_URL}:${process.env.HASS_PORT}/api/services/notify/mobile_app_iphone_6`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HASS_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );
  } catch (error) {
    console.error("An error occured while sending a push notification", JSON.stringify(error));
    throw new Error("Failed to send push notification");
  }
};
