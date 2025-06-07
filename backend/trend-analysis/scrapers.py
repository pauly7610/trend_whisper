from playwright.async_api import async_playwright
import datetime
import requests
from bs4 import BeautifulSoup
import random
from typing import List

USER_AGENTS = [
    # A few common user agents
    (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/605.1.15 (KHTML, like Gecko) "
        "Version/17.0 Safari/605.1.15"
    ),
    (
        "Mozilla/5.0 (X11; Linux x86_64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    ),
    (
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
        "AppleWebKit/605.1.15 (KHTML, like Gecko) "
        "Version/17.0 Mobile/15E148 Safari/604.1"
    ),
]

PROXIES = [
    # Add your proxy URLs here (format: "http://user:pass@proxyhost:port")
    # Example: "http://username:password@proxy.example.com:8080"
    None  # Use None for direct connection if no proxies available
]


def pick_proxy():
    return random.choice(PROXIES)


def pick_user_agent():
    return random.choice(USER_AGENTS)


async def scrape_tiktok_hashtag(
    hashtag="90sfit",
    max_videos=10,
    use_stealth=True,
    headless=True
):
    # TikTok hashtag scraper with stealth,
    # headful/headless toggle, and CAPTCHA detection.
    # - use_stealth: If True, applies stealth
    # JS to evade bot detection.
    # - headless: If False, runs browser in visible mode
    # (may help evade detection).
    results = []
    url = f"https://www.tiktok.com/tag/{hashtag}"
    user_agent = pick_user_agent()
    proxy = pick_proxy()
    playwright_args = {}
    if proxy:
        playwright_args["proxy"] = {"server": proxy}
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True, **playwright_args
            )
            context = await browser.new_context(user_agent=user_agent)
            page = await context.new_page()
            # Stealth mode: inject JS to mask automation
            if use_stealth:
                await page.add_init_script(
                    (
                        (
                            "Object.defineProperty(navigator, 'webdriver', "
                            "{get: () => undefined});"
                        )
                        +
                        "window.navigator.chrome = { runtime: {} };"
                        "Object.defineProperty(navigator, 'languages', "
                        "{get: () => ['en-US', 'en']});"
                        "Object.defineProperty(navigator, 'plugins', "
                        "{get: () => [1,2,3,4,5]});"
                    )
                )
            await page.goto(url, timeout=60000)
            await page.wait_for_timeout(random.randint(4000, 8000))
            # Anti-bot workaround: scroll to bottom
            await page.evaluate(
                "window.scrollTo(0, document.body.scrollHeight)"
            )
            await page.wait_for_timeout(random.randint(2000, 4000))
            # CAPTCHA detection
            captcha_present = await page.query_selector(
                (
                    "input#captcha-verify-input"
                )
            )
            if captcha_present:
                print(
                    (
                        "[TikTok Scraper] CAPTCHA detected! "
                        "Manual intervention or advanced bypass required."
                    )
                )
                # Optionally: take screenshot for debugging
                await page.screenshot(path="tiktok_captcha.png")
                await browser.close()
                return results
            videos = await page.query_selector_all("a[href*='/video/']")
            for video in videos[:max_videos]:
                try:
                    href = await video.get_attribute("href")
                    title = (
                        await video.inner_text()
                        if await video.inner_text() else ""
                    )
                    results.append({
                        "platform": "TikTok",
                        "trend": hashtag,
                        "description": title,
                        "thumbnail_url": None,
                        "engagement": {},
                        "timestamp": (
                            datetime.datetime.now(datetime.timezone.utc)
                        ),
                        "extra": {"video_url": href},
                    })
                except Exception:
                    continue
            await browser.close()
    except Exception as e:
        print(f"[TikTok Scraper] Error: {e}")
    return results


def scrape_reddit_subreddit(subreddit="streetwear", max_posts=10):
    url = f"https://www.reddit.com/r/{subreddit}/top/?t=day"
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, "lxml")
    results = []
    for post in soup.select("div[data-testid='post-container']")[:max_posts]:
        title = post.select_one("h3")
        if not title:
            continue
        title_text = title.text
        upvotes = post.select_one("div[data-click-id='upvote']")
        upvotes_count = upvotes.text if upvotes else ""
        results.append({
            "platform": "Reddit",
            "trend": subreddit,
            "description": title_text,
            "thumbnail_url": None,
            "engagement": {"upvotes": upvotes_count},
            "timestamp": (
                datetime.datetime.now(datetime.timezone.utc)
            ),
            "extra": {}
        })
    return results


async def scrape_pinterest_board(
    board="streetstyle",
    max_pins=10,
    use_stealth=True,
    headless=True
) -> List[dict]:
    """
    Scrape Pinterest board (or search) for trending pins.
    - board: Pinterest board or search term
    - max_pins: How many pins to fetch
    - use_stealth: Use stealth JS to mask automation
    - headless: Run browser headless or headful
    Returns: List of trend dicts (platform,
    trend, description, thumbnail_url, engagement,
    timestamp, extra)
    """
    results = []
    # Pinterest search URL (can be board or search)
    url = f"https://www.pinterest.com/search/pins/?q={board}"
    user_agent = pick_user_agent()
    proxy = pick_proxy()
    playwright_args = {}
    if proxy:
        playwright_args["proxy"] = {"server": proxy}
    try:
        from playwright.async_api import async_playwright
        async with async_playwright() as p:
            browser = await p.chromium.launch(
                headless=True, **playwright_args
            )
            context = await browser.new_context(user_agent=user_agent)
            page = await context.new_page()
            # Stealth mode: inject JS to mask automation
            if use_stealth:
                await page.add_init_script(
                    (
                        "Object.defineProperty(navigator, 'webdriver', "
                        "{get: () => undefined});"
                        "window.navigator.chrome = { runtime: {} };"
                        "Object.defineProperty(navigator, 'languages', "
                        "{get: () => ['en-US', 'en']});"
                        "Object.defineProperty(navigator, 'plugins', "
                        "{get: () => [1,2,3,4,5]});"
                    )
                )
            await page.goto(url, timeout=60000)
            await page.wait_for_timeout(random.randint(4000, 8000))
            # Anti-bot workaround: scroll to bottom
            await page.evaluate(
                "window.scrollTo(0, document.body.scrollHeight)"
            )
            await page.wait_for_timeout(random.randint(2000, 4000))
            # CAPTCHA detection
            captcha_present = await page.query_selector(
                (
                    "input[name='captcha']"
                )
            )
            if captcha_present:
                print(
                    (
                        "[Pinterest Scraper] CAPTCHA detected! "
                        "Manual intervention or advanced bypass required."
                    )
                )
                await page.screenshot(path="pinterest_captcha.png")
                await browser.close()
                return results
            # Extract pins
            pins = await page.query_selector_all("div[data-test-id='pin']")
            for pin in pins[:max_pins]:
                try:
                    desc_elem = await pin.query_selector(
                        "div[data-test-id='pin-description']"
                    )
                    desc = await desc_elem.inner_text() if desc_elem else ""
                    img_elem = await pin.query_selector("img")
                    img_url = (
                        await img_elem.get_attribute("src")
                        if img_elem else None
                    )
                    results.append({
                        "platform": "Pinterest",
                        "trend": board,
                        "description": desc,
                        "thumbnail_url": img_url,
                        "engagement": {},
                        "timestamp": datetime.datetime.utcnow(),
                        "extra": {}
                    })
                except Exception:
                    continue
            await browser.close()
    except Exception as e:
        print(f"[Pinterest Scraper] Error: {e}")
    return results

# Further anti-bot strategies for Pinterest
# (manual, not yet implemented):
# - Use a pool of residential proxies
# - Integrate third-party CAPTCHA solving services
# (e.g., 2Captcha, Anti-Captcha)
# - Use Playwright's "stealth" plugin
# (requires Node.js wrapper or custom JS)
# - Human-in-the-loop fallback for persistent CAPTCHAs
