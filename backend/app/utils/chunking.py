from app.utils.text_cleaning import clean_text


def chunk_text(text: str, chunk_size: int = 1200, overlap: int = 180) -> list[str]:
    words = clean_text(text).split()
    chunks: list[str] = []
    start = 0
    while start < len(words):
        end = min(start + chunk_size, len(words))
        chunks.append(" ".join(words[start:end]))
        if end == len(words):
            break
        start = max(end - overlap, start + 1)
    return chunks
