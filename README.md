# Interest Badge

A Chrome extension for Twitter/X that shows users' interests as badges next to their usernames in the feed.

## What it does

When you browse Twitter/X, you'll see a small badge next to usernames of people who have registered their interests on the Interest Badge website. Click the badge to expand it and see what they're into — anime, gaming, history, mythology, and more.

## How to use

### 1. Register your interests

Go to **[twitter-interest-badge.vercel.app](https://twitter-interest-badge.vercel.app)**, sign in with your Twitter/X account, and pick up to 5 interests from the available categories.

### 2. Install the extension

Since the extension is not yet in the Chrome Web Store, you'll need to install it manually:

1. Go to [Releases](https://github.com/Vantana1995/x-chrome-extension/releases/latest) and download `interest-badge-extension.zip`
2. Unzip the archive
3. Open Chrome and go to `chrome://extensions`
4. Enable **Developer Mode** (toggle in the top right corner)
5. Click **Load unpacked**
6. Select the folder you unzipped
7. Go to Twitter/X and start browsing — badges will appear next to registered users

## Categories

Currently available: Anime, Gaming, History, Crafts, Mythology, Science, Other

More categories will be added as the project grows.

## Stack

- **Backend**: NestJS + PostgreSQL + Prisma — hosted on Oracle Cloud
- **Frontend**: Next.js — hosted on Vercel
- **Extension**: Vanilla JS, Chrome Manifest V3

## Notes

- Interest badges may take 1-3 seconds to load on first appearance (caching in progress)
- Only users who have registered on the site will have badges
