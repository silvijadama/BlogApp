import puppeteer from "puppeteer";
const log = console.log;
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : "Volbeat" ;
const searchTermENV = process.env.SEARCHTXT ?? "Volbeat";

(async ()=> {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto("https://www.youtube.com/")
    await page.waitForSelector("#search-input #search")
    await page.type("#search-input #search", searchTermCLI, {delay: 100})
    await page.emulateVisionDeficiency("blurredVision")
    await page.screenshot({path: "./modules/youtube-homeblurred.jpg"})

    await page.emulateVisionDeficiency("none")
    await page.screenshot({path: "./modules/youtube-home.jpg"})
    await browser.close()
})()