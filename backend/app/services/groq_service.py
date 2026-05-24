from openai import OpenAI, APIError
from app.core.config import get_settings


SYSTEM = """You are an academic research assistant. Ground every claim in provided paper context.
Never invent DOI, authors, titles, citation counts, or unavailable metadata. If missing, say Not available.
Return concise academic prose with bracket citations like [1]. Include a confidence level."""


class GroqService:
    def __init__(self):
        self.settings = get_settings()
        if self.settings.openrouter_api_key:
            self.client = OpenAI(
                api_key=self.settings.openrouter_api_key,
                base_url="https://openrouter.ai/api/v1",
            )
        else:
            self.client = None

    def complete(self, prompt: str, context: list[dict] | None = None, model: str = "deepseek/deepseek-v4-flash:free") -> str:
        if not self.client:
            return "OpenRouter API key is not configured. Add OPENROUTER_API_KEY to enable grounded AI analysis. Confidence: Not available."
        
        try:
            ctx = "\n\n".join(f"[{i+1}] {p.get('title')} ({p.get('year', 'Not available')}): {p.get('abstract', '')}" for i, p in enumerate(context or []))
            messages = [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": f"Context papers:\n{ctx}\n\nTask:\n{prompt}"},
            ]
            response = self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.2
            )
            return response.choices[0].message.content or ""
        except APIError as e:
            if "429" in str(e) or "unavailable" in str(e).lower():
                return f"DeepSeek V4 Flash model is temporarily unavailable. Error: {str(e)}. Please try again later. Confidence: Not available."
            raise

