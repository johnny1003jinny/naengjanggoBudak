export async function POST(request) {
  const { ingredients, staples, mealType, simpleBreakfast } = await request.json();

  const allIng = [...ingredients, ...staples].map(i => i.name).join(", ");
  const typeLabel = { basic:"기본식", baby:"유아식", diet:"다이어트", highcal:"고열량" }[mealType] || "기본식";
  const morningNote = simpleBreakfast ? "아침은 간편식으로" : "아침도 한식으로";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 1500,
      messages: [{
        role: "user",
        content: `한국 요리 전문가로서 JSON만 출력하세요.
냉장고 재료: ${allIng}
식단: ${typeLabel}, ${morningNote}
아침·점심·저녁 3끼 추천.
JSON만 출력 (다른 텍스트 절대 금지):
{"breakfast":{"name":"","description":"","time":"","diff":"","main":[],"missingIngredients":[],"steps":[],"tip":""},"lunch":{"name":"","description":"","time":"","diff":"","main":[],"missingIngredients":[],"steps":[],"tip":""},"dinner":{"name":"","description":"","time":"","diff":"","main":[],"missingIngredients":[],"steps":[],"tip":""}}`
      }],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return Response.json({ error: data.error?.message || "API 오류" }, { status: 500 });
  }

  const text = data.content.map(b => b.text || "").join("").trim();
  const s = text.replace(/```json|```/g, "").trim();
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a < 0 || b < 0) return Response.json({ error: "형식 오류" }, { status: 500 });

  const parsed = JSON.parse(s.slice(a, b + 1));
  return Response.json(parsed);
}
