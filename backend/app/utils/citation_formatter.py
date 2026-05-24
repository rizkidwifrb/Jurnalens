from app.models import Paper


def _authors(paper: Paper) -> str:
    names = [pa.author.name for pa in getattr(paper, "authors", []) if pa.author]
    return ", ".join(names) if names else "Not available"


def apa(paper: Paper) -> str:
    authors = _authors(paper)
    year = paper.year or "n.d."
    source = paper.journal or paper.source or "Not available"
    doi = f"https://doi.org/{paper.doi}" if paper.doi else "DOI not available"
    return f"{authors} ({year}). {paper.title}. {source}. {doi}"


def ieee(paper: Paper) -> str:
    authors = _authors(paper)
    year = paper.year or "Not available"
    source = paper.journal or paper.source or "Not available"
    doi = paper.doi or "Not available"
    return f"{authors}, \"{paper.title},\" {source}, {year}. doi: {doi}."


def bibtex(paper: Paper) -> str:
    key = (paper.doi or paper.id.hex[:8]).replace("/", "_").replace(".", "_")
    return "\n".join([
        f"@article{{{key},",
        f"  title = {{{paper.title}}},",
        f"  author = {{{_authors(paper)}}},",
        f"  year = {{{paper.year or 'Not available'}}},",
        f"  journal = {{{paper.journal or paper.source or 'Not available'}}},",
        f"  doi = {{{paper.doi or 'Not available'}}}",
        "}",
    ])
