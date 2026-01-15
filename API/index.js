export default async function handler(req, res) {
  // Sadece POST isteklerini kabul et
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const data = req.body;

  // Konsola yaz
  console.log("📌 Yeni log geldi:", data);

  // --- Discord Webhook ---
  const webhookUrl = "https://discord.com/api/webhooks/1453028894813851658/dSyHbMw1rg4uTaiyweRx1T8oj7y5IIwzYK9W7Jqc_6BbVeWBnPso6TRSqR3n9wpbv9ds"; // buraya kendi webhook URL’ini koy

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**Yeni Log:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``
      })
    });
  } catch (err) {
    console.error("Webhook gönderilemedi:", err);
  }

  // Vercel API cevabı
  res.status(200).json({
    status: "ok",
    message: "Log alındı ve Discord’a gönderildi!"
  });
}
