import puppeteer from "puppeteer";

(async ()=> {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto("https://archive.org/details/texts?tab=collection")

    const url = await page.url()
    console.log(url)

    const content = await page.content()
    console.log(content)

    // await page.screenshot()
    await browser.close()
})()