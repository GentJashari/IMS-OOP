import { Puppeteer } from "puppeteer";
import * as element from "./BaseElements";
import { browserInstance } from "./browser";
import { login } from "./login";
let { assert, expect, } = require("chai");
let getEl = require("puppeteer-shadow-selector").$;


class CatalogComponents {
    constructor() { }

    compoentsCatalog = async () => {
        {
            await login.login();
            expect(browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/')
        }

        {
            await browserInstance.getCurrentPage().waitForTimeout(3000)
            await browserInstance.getCurrentPage().waitForSelector('#root > section > div > div > div > nav > div > ul > li:nth-child(2) > a');
            await browserInstance.getCurrentPage().click('#root > section > div > div > div > nav > div > ul > li:nth-child(2) > a');
            await browserInstance.getCurrentPage().waitForSelector('#root > section > div > div > div > nav > div > ul > li.nav-item.active > div > ul > li:nth-child(2) > a');
            await browserInstance.getCurrentPage().click('#root > section > div > div > div > nav > div > ul > li.nav-item.active > div > ul > li:nth-child(2) > a')

            expect(browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/catalog/components')
        }

        {
            let shadowRootEl = await getEl(browserInstance.getCurrentPage(), `ipd-ims-component-browser-component::shadow-dom(div)`);

            let columnDetails = await browserInstance.getCurrentPage().evaluate(() => {

                let getInnerText = async (selector: string) => {
                    await browserInstance.getCurrentPage().waitForTimeout(4000)
                    await shadowRootEl?.waitForSelector(`${selector}`);
                };
                return {
                    columnName: getInnerText('div > div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > p')
                }
            })
            console.log(columnDetails.columnName)
        }


    }

}

let componentCatalogClass = new CatalogComponents();

export { componentCatalogClass };