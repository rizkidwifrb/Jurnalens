class RerankerService:
    def rerank(self, query: str, scored_items: list[dict]) -> list[dict]:
        return sorted(scored_items, key=lambda item: item.get("score", 0), reverse=True)
