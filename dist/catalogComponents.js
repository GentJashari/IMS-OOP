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
            let shadowRootEl = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-component-browser-component::shadow-dom(div)`);
            let columnDetails = await browser_1.browserInstance.getCurrentPage().evaluate(() => {
                let getInnerText = async (selector) => {
                    await browser_1.browserInstance.getCurrentPage().waitForTimeout(4000);
                    await shadowRootEl?.waitForSelector(`${selector}`);
                };
                return {
                    columnName: getInnerText('div > div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > p')
                };
            });
            console.log(columnDetails.columnName);
        }
    };
}
let componentCatalogClass = new CatalogComponents();
exports.componentCatalogClass = componentCatalogClass;
