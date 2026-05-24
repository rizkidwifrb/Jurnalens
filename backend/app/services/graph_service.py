from sqlalchemy.orm import Session
from app.models import Paper


class GraphService:
    def paper_graph(self, db: Session, paper_id) -> dict:
        paper = db.get(Paper, paper_id)
        if not paper:
            return {"nodes": [], "edges": [], "missing": "Paper not found"}
        nodes = [{"id": str(paper.id), "type": "paper", "label": paper.title}]
        edges = []
        for pa in paper.authors:
            nodes.append({"id": str(pa.author.id), "type": "author", "label": pa.author.name})
            edges.append({"id": f"{paper.id}-{pa.author.id}", "source": str(paper.id), "target": str(pa.author.id), "label": "written by"})
        if paper.journal:
            journal_id = f"journal:{paper.journal}"
            nodes.append({"id": journal_id, "type": "journal", "label": paper.journal})
            edges.append({"id": f"{paper.id}-journal", "source": str(paper.id), "target": journal_id, "label": "published in"})
        return {"nodes": nodes, "edges": edges, "missing": "Citation graph is partial unless source metadata provides references/cited-by data."}
