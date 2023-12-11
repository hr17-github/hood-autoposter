import puppeteer from "puppeteer";
import { loveAndHumorArray } from "./posts.js";
import fs from "fs";

// Paste these values from your localstorage *after login*
const localStorage = {
  loglevel: "",
  WZRK_L: "",  
  WZRK_PR: "",  
  WZRK_META: "",  
  activeRow: "", 
  WZRK_EV: "",  
  userData: "",
  WZRK_K: "",  
  WZRK_FPU: "",
};

const setDomainLocalStorage = async (browser, url, values) => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (r) => {
    r.respond({
      status: 200,
      contentType: "text/plain",
      body: "tweak me.",
    });
  });
  await page.goto(url);
  await page.evaluate((values) => {
    for (const key in values) {
      localStorage.setItem(key, values[key]);
    }
  }, values);
  await page.close();
};

let progress = 0;
const total = loveAndHumorArray.length;

const startSendingPosts = async () => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });

    const url = "https://hood.live/";
    await setDomainLocalStorage(browser, url, localStorage);

    const page = await browser.newPage();

    // Navigate to the parent URL
    await page.goto("https://hood.live/feed");

    let progress = JSON.parse(fs.readFileSync("progress.json", "utf-8")).update;

    while (progress < total) {
      // Set screen size
      await page.setViewport({width: 1080, height: 1024});

      await page.waitForTimeout(3 * 60 * 1000);
      // Select the textarea with class name 'post-comment-box' and write text into it
      await page.type("textarea.post-comment-box", loveAndHumorArray[progress]);

      await page.click("button.primary-btn");

      console.log("Waiting for next post");
      await page.waitForTimeout(2 * 60 * 1000);
      console.log("wait over");
      await page.goto("https://hood.live/feed");
      progress++;
      // update in json file
      const data = {
        update: progress
      }
      fs.writeFileSync("progress.json", JSON.stringify(data));
    }
  } catch (er) {
    console.log(er);
    console.log("Wait for 5 minutes");
    setTimeout(() => {
      console.log("Restarting the process");
      startSendingPosts();
    }, 5 * 60 * 1000);
  }
};

startSendingPosts();
