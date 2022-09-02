import * as puppeteer from 'puppeteer';
import { Page, Browser } from 'puppeteer';
import * as element from './BaseElements'


import { newButton } from './BaseElements';

const options = {
    // defaultViewport: {
    //     // width: 1300,
    //     // height: 800
    // },
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
}

class BrowserAddapter {
    private currentPage: Page;
    private browser: Browser;

    constructor() {
        // 
    }

    getCurrentPage() {
        return this.currentPage;
    }

    async initCurrentPage() {
        this.browser = await puppeteer.launch(options);
        this.currentPage = await this.browser.newPage();
    }

    async goto(url: string) {
        if (!this.currentPage) {
            await this.initCurrentPage();
        }
        await this.currentPage.goto(url);
    }

    async close() {
        await this.browser.close();
    }

    async sleep(time = 1000) {
        await (() => new Promise(res => setTimeout(res, time)))();
    }

    async newBtton() {
        await browserInstance.getCurrentPage().url();
        await browserInstance.getCurrentPage().waitForSelector("#root > section > div > div > div > main > div.btn-toolbar.mt-4.mb-4 > div > button:nth-child(1)");
        // console.log(await newBtn)
        await browserInstance.getCurrentPage().click("#root > section > div > div > div > main > div.btn-toolbar.mt-4.mb-4 > div > button:nth-child(1)");
    }

}


const browserInstance = new BrowserAddapter();

export {
    browserInstance
}