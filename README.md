# Hood Auto Poster

Automatically post to Hood (Every 5 minutes). Built for fun in 30-40 minutes.

## Getting Started

Follow these steps:

1. Clone this repo
2. In terminal, navigate to the cloned repo 
3. Run `npm install`  (Will take some time, puppeteer downloads chrome for itself ~170 mb)
4. **Important Step**: 
   - Login to Hood.live on chrome web browser(Yes, you need pc and chrome)
   - Open dev tools, navigate to Application tab and copy localstorage
   - Paste localstorage pairs in `index.js`
5. Modify `posts.js` with your posts 
6. Run `node index.js`
7. Re-run anytime to auto-post more. It should automatically pickup from where you left

### Adding new posts
1. Replace existing ones with new ones in posts.js
2. Set `"update": 0` in `progress.json` 
3. Run `node index.js` to start posting

## Additional features:

- Stores login to post automatically 
- Easy setup
- Configurable posting

## Contributing

Feel free to fork and enhance. Some ideas:

- Adding OpenAI token and prompting support to generate auto posts on the fly
- Like Other Posts in Live feed.
- Like Comments to own posts.