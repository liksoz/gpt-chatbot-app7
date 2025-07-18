export default async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY;
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ reply: "메시지를 입력해주세요." });
  }

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "당신은 시니어를 친절하게 돕는 디지털 도우미 챗봇입니다." },
          { role: "user", content: message }
        ]
      })
    });

    const json = await resp.json();
    console.log("🔍 OpenAI 응답:", json);

    if (json.error) {
      console.error("❌ OpenAI 오류:", json.error);
      return res.status(500).json({ reply: "OpenAI 오류: " + json.error.message });
    }

    const reply = json.choices?.[0]?.message?.content || "죄송하지만 응답할 수 없습니다.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ 네트워크 또는 처리 오류:", err);
    res.status(500).json({ reply: "API 호출 중 오류가 발생했습니다." });
  }
}
