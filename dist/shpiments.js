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
exports.shpiments = void 0;
const element = __importStar(require("./BaseElements"));
const browser_1 = require("./browser");
const login_1 = require("./login");
let { assert, expect, } = require("chai");
let getEl = require("puppeteer-shadow-selector").$;
class Shipments {
    constructor() { }
    ;
    shipmentsPage = async () => {
        {
            await login_1.login.login();
            expect(browser_1.browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/');
        }
        {
            await browser_1.browserInstance.goto(`${element.shipmentsPageUrl}`);
            expect(browser_1.browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/delivery/shipments');
        }
        {
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
            await browser_1.browserInstance.newBtton();
            expect(browser_1.browserInstance.getCurrentPage().url()).to.be.equal('https://amb.polymaths.dev/delivery/shipments/new/shipment');
        }
        {
            await this.fillTheForm();
        }
    };
    fillTheForm = async () => {
        await browser_1.browserInstance.getCurrentPage().waitForTimeout(5000);
        let selectCustomer = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_customerId_0"])`);
        let customerName = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([select="customerId"])`);
        await selectCustomer.select(`select#${customerName}`, '185');
        await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
        let selectDestination = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_destination_1"])`);
        let destinationName = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([select="destination"])`);
        await selectDestination.select(`select#${destinationName}`, 'sterilization');
        await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
        let shipTo = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_shipToId_0"])`);
        let shipToName = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_shipToId_0"])`);
        await shipTo.select(`select#${shipToName}`, '56');
        let shadowEditorComponent = await getEl(browser_1.browserInstance.getCurrentPage(), 'ipd-ims-shipment-editor-component::shadow-dom(div)');
        let option = await shadowEditorComponent?.waitForSelector("#f_shipToId_0 > option:nth-child(1)");
        if (option) {
            let packginSlipValue = await browser_1.browserInstance.getCurrentPage().evaluate(() => {
                return document.querySelector('ipd-ims-shipment-editor-component').shadowRoot.querySelector('#f_packingSlipNumber_0').value;
            });
            console.log(packginSlipValue);
            let cartons = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_cartons_1"])`);
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(2000);
            await cartons.type('1');
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(2000);
            let shipVia = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_shipVia_2"])`);
            let shipViaName = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([select="shipVia"])`);
            let selected = await shipVia.select(`select#${shipViaName}`, 'fedex');
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(2000);
            let notes = await getEl(browser_1.browserInstance.getCurrentPage(), `ipd-ims-shipment-editor-component::shadow-dom([id="f_notes_0"])`);
            await notes.type(``);
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
            let saveBtn = await browser_1.browserInstance.getCurrentPage().$('#root > section > div > div > div > main > div.btn-toolbar.mt-4.mb-4 > div:nth-child(1) > button:nth-child(2)');
            saveBtn.click();
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(2000);
            await browser_1.browserInstance.goto(`${element.shipmentsPageUrl}`);
            await browser_1.browserInstance.getCurrentPage().waitForNavigation();
            let shadoRootBrowserComponent = await getEl(browser_1.browserInstance.getCurrentPage(), 'ipd-ims-shipment-browser-component::shadow-dom(div)');
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
            await browser_1.browserInstance.getCurrentPage().goto(`https://amb.polymaths.dev/delivery/shipments/184/shipment`);
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(8000);
            let deleteBtn = await browser_1.browserInstance.getCurrentPage().waitForSelector(".btn-group > button:nth-child(3)");
            deleteBtn.click();
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(3000);
        }
        else {
            let shadowEditorComponentForButton = await getEl(browser_1.browserInstance.getCurrentPage(), 'ipd-ims-shipment-editor-component::shadow-dom(div.position-relative.h-100 > div > div > form > div:nth-child(2) > div.col-1 > div)');
            let addNewAdress = await shadowEditorComponentForButton?.waitForSelector(".btn");
            addNewAdress.click();
            await browser_1.browserInstance.getCurrentPage().waitForTimeout(4000);
            await browser_1.browserInstance.getCurrentPage().waitForNavigation();
        }
    };
    generateCharacters = () => {
        let a = 'a';
        for (let i = 0; i <= 1001; i++) {
            a += 'b';
        }
        return a;
    };
}
let shpiments = new Shipments();
exports.shpiments = shpiments;
