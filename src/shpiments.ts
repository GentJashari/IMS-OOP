import { Puppeteer } from "puppeteer";
import * as element from "./BaseElements";
import { browserInstance } from "./browser";
import { login } from "./login";
let { assert, expect, } = require("chai");
let getEl = require("puppeteer-shadow-selector").$;


class Shipments {
    constructor() { };
    shipmentsPage = async () => {
        {
            await login.login();
            // await browserInstance.getCurrentPage().waitForTimeout(7000);
            expect(browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/')
        }
        {
            await browserInstance.goto(`${element.shipmentsPageUrl}`);
            expect(browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/delivery/shipments')
        }
        // browserInstance.sleep();
        {
            await browserInstance.getCurrentPage().waitForTimeout(3000);
            await browserInstance.newBtton();
            expect(browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/delivery/shipments/new/shipment')
        }

        // TODO: clcik to selectNewCustomer
        {

            await this.fillTheForm();

        }
        // TODO: clcik to addnewCustomer
    }

    fillTheForm = async () => {
        await browserInstance.getCurrentPage().waitForTimeout(5000)
        let shadowEditor = await getEl(browserInstance.getCurrentPage(), 'ipd-ims-shipment-editor-component::shadow-dom(div)');
        let selectCustomer = await shadowEditor?.waitForSelector("#f_customerId_0");
        console.log(selectCustomer);
        // debugger;
        // let selectCustomer = await getEl(browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_customerId_0"])`);
        let customerName = await shadowEditor?.waitForSelector(`[select="customerId"]`);
        // await browserInstance.getCurrentPage().waitForTimeout(2000);
        await selectCustomer.select(`select#${customerName}`, '171');
        // await browserInstance.getCurrentPage().waitForTimeout(2000);

        let selectDestination = await shadowEditor?.waitForSelector("#f_destination_1");
        let destinationName = await shadowEditor?.waitForSelector(".form-select #f_destination_1");

        await selectDestination.select(`select#${destinationName}`, 'sterilization');

        // await browserInstance.getCurrentPage().waitForTimeout(2000);

        let shipTo = await shadowEditor?.waitForSelector('#shipToId');
        let shipToName = await shadowEditor?.waitForSelector('.form-select #shipToId')
        // await browserInstance.getCurrentPage().waitForTimeout(3000)
        await shipTo.select(`select#${shipToName}`, '52');

        let shadowEditorComponent = await getEl(browserInstance.getCurrentPage(), 'ipd-ims-shipment-editor-component::shadow-dom(div)');

        // await browserInstance.getCurrentPage().waitForTimeout(3000)
        let option = await shadowEditorComponent?.waitForSelector("#f_shipToId_0 > option:nth-child(1)");

        if (option) {
            let packginSlipValue = await browserInstance.getCurrentPage().evaluate(() => {
                return (document.querySelector('ipd-ims-shipment-editor-component').shadowRoot.querySelector('#f_packingSlipNumber_0') as HTMLInputElement).value;
            })

            console.log(packginSlipValue);

            let cartons = await getEl(browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_cartons_1"])`);

            await browserInstance.getCurrentPage().waitForTimeout(2000)
            await cartons.type('1');

            await browserInstance.getCurrentPage().waitForTimeout(2000);

            let shipVia = await getEl(browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_shipVia_2"])`);
            let shipViaName = await getEl(browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([select="shipVia"])`);

            let selected = await shipVia.select(`select#${shipViaName}`, 'fedex');

            await browserInstance.getCurrentPage().waitForTimeout(2000);


            let notes = await getEl(browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_notes_0"])`);
            await notes.type(``);
            // await notes.type(`${this.generateCharacters()}`);

            await browserInstance.getCurrentPage().waitForTimeout(2000);

            let saveBtn = await browserInstance.getCurrentPage().$('#root > section > div > div > div > main > div.btn-toolbar.mt-4.mb-4 > div:nth-child(1) > button:nth-child(2)');
            saveBtn.click();

            await browserInstance.getCurrentPage().waitForTimeout(2000);


            await browserInstance.goto(`${element.shipmentsPageUrl}`);
            await browserInstance.getCurrentPage().waitForNavigation();

            let shadoRootBrowserComponent = await getEl(browserInstance.getCurrentPage(), 'ipd-ims-shipment-browser-component::shadow-dom(div)');
            let findNextBtn = await shadoRootBrowserComponent?.waitForSelector('.pagination li:last-child');
            console.log(findNextBtn);

            // await browserInstance.getCurrentPage().waitForTimeout(1000);

            console.log(browserInstance.getCurrentPage().url());
            const findNextBtnProperty = await (await findNextBtn.getProperty('disabled')).jsonValue();
            if (!findNextBtnProperty) {
                findNextBtn.click();
            }

            // await browserInstance.getCurrentPage().waitForTimeout(2000);

            // let selectTheCustomerToDelete = await browserInstance.getCurrentPage().evaluate(() => document.querySelector('ipd-ims-shipment-browser-component').shadowRoot.querySelector('div > div > div > div > div > div > div > table > tbody > tr:nth-child(1)'));
            // await browserInstance.getCurrentPage().waitForTimeout(2000);
            await browserInstance.getCurrentPage().goto(`https://amb.polymaths.dev/delivery/shipments/179/shipment`);
            await browserInstance.getCurrentPage().waitForTimeout(3000);
            // let deleteBtn = await page.$('#root > section > div > div > div > main > div.btn-toolbar.mt-4.mb-4 > div:nth-child(1) > button:nth-child(3)');
            let deleteBtn = await shadoRootBrowserComponent?.waitForSelector(".btn-group button:nth-child(3)");
            deleteBtn.click();
        }

        else {
            let shadowEditorComponentForButton = await getEl(browserInstance.getCurrentPage(), 'ipd-ims-shipment-editor-component::shadow-dom(div.position-relative.h-100 > div > div > form > div:nth-child(2) > div.col-1 > div)');
            // console.log(shadowEditorComponentForButton)
            let addNewAdress = await shadowEditorComponentForButton?.waitForSelector(".btn");
            addNewAdress.click();
            // console.log(addNewAdress)
            await browserInstance.getCurrentPage().waitForTimeout(4000);
            // let okBtn = await shadowEditorComponent?.waitForSelector("div > div > div:nth-child(2) > div > div > div.modal-footer > button.btn.btn-sm.btn-primary.text-uppercase");
            // okBtn.click();

            await browserInstance.getCurrentPage().waitForNavigation();

        }
    }
    generateCharacters = (): string => {
        let a = 'a';
        for (let i = 0; i <= 1001; i++) {
            a += 'b';
        }
        return a;
    }

}


let shpiments = new Shipments();

export { shpiments }
