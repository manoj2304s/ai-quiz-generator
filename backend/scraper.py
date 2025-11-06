# scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str):
    """
    Fetches and cleans text content from a Wikipedia article.
    Returns: (title, clean_text)
    """

    # ✅ Step 1: Fetch page content (with headers to mimic a browser)
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        )
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch URL: {url} | Status code: {response.status_code}")

    # ✅ Step 2: Parse HTML using BeautifulSoup
    soup = BeautifulSoup(response.text, "html.parser")

    # ✅ Step 3: Extract article title
    title = soup.find("h1", {"id": "firstHeading"})
    title = title.text.strip() if title else "Untitled Article"

    # ✅ Step 4: Extract main article body
    content_div = soup.find("div", {"id": "mw-content-text"})
    if not content_div:
        raise Exception("Unable to locate main content section.")

    # ✅ Step 5: Remove unwanted tags (tables, references, scripts)
    for tag in content_div.find_all(["table", "sup", "script", "style"]):
        tag.decompose()

    # ✅ Step 6: Collect paragraph text
    paragraphs = content_div.find_all("p")
    clean_text = "\n".join([p.get_text().strip() for p in paragraphs if p.get_text().strip()])

    return title, clean_text


# ✅ Quick test (Run directly to verify)
if __name__ == "__main__":
    test_url = "https://en.wikipedia.org/wiki/Python_(programming_language)"
    title, text = scrape_wikipedia(test_url)
    print("✅ Title:", title)
    print("✅ Sample text preview:", text[:500], "...")
