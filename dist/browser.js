"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserInstance = void 0;
const puppeteer = __importStar(require("puppeteer"));
const options = {
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
};
class BrowserAddapter {
    currentPage;
    browser;
    constructor() {
    }
    getCurrentPage() {
        return this.currentPage;
    }
    async initCurrentPage() {
        this.browser = await puppeteer.launch(options);
        this.currentPage = await this.browser.newPage();
    }
    async goto(url) {
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
        await browserInstance.getCurrentPage().click("#root > section > div > div > div > main > div.btn-toolbar.mt-4.mb-4 > div > button:nth-child(1)");
    }
}
const browserInstance = new BrowserAddapter();
exports.browserInstance = browserInstance;
