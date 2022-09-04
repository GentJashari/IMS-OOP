"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentCatalogClass = void 0;
const browser_1 = require("./browser");
const login_1 = require("./login");
let { assert, expect, } = require("chai");
let getEl = require("puppeteer-shadow-selector").$;
class CatalogComponents {
    constructor() { }
    compoentsCatalog = async () => {
        {
            await login_1.login.login();
            expect(browser_1.browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/');
        }
        {
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
            await browser_1.browserInstance.getCurrentPage().waitForSelector('#root > section > div > div > div > nav > div > ul > li:nth-child(2) > a');
            await browser_1.browserInstance.getCurrentPage().click('#root > section > div > div > div > nav > div > ul > li:nth-child(2) > a');
            await browser_1.browserInstance.getCurrentPage().waitForSelector('#root > section > div > div > div > nav > div > ul > li.nav-item.active > div > ul > li:nth-child(2) > a');
            await browser_1.browserInstance.getCurrentPage().click('#root > section > div > div > div > nav > div > ul > li.nav-item.active > div > ul > li:nth-child(2) > a');
            expect(browser_1.browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/catalog/components');
        }
        {
            let columnDetails = await browser_1.browserInstance.getCurrentPage().evaluate(async () => {
                await browser_1.browserInstance.getCurrentPage().waitForTimeout(4000);
                let getInnerText = (shadow, selector) => {
                    document.querySelector(shadow).shadowRoot.querySelector(selector) ? document.querySelector(shadow).shadowRoot.querySelector(selector).textContent : false;
                };
                return {
                    columnName: await getInnerText('ipd-ims-component-browser-component', 'div > div > div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > p')
                };
            });
            console.log(columnDetails);
        }
    };
}
let componentCatalogClass = new CatalogComponents();
exports.componentCatalogClass = componentCatalogClass;
