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
exports.login = void 0;
const element = __importStar(require("./BaseElements"));
let getEl = require("puppeteer-shadow-selector").$;
const browser_1 = require("./browser");
class LoginPage {
    constructor() { }
    login = async () => {
        await browser_1.browserInstance.goto(`${element.loginPage}`);
        await browser_1.browserInstance.getCurrentPage().waitForTimeout(2000);
        let email = await getEl(browser_1.browserInstance.getCurrentPage(), `login-component::shadow-dom([id=${element.inputEmail}])`);
        let password = await getEl(browser_1.browserInstance.getCurrentPage(), `login-component::shadow-dom([id=${element.inputPassowrd}])`);
        let loginBtn = await getEl(browser_1.browserInstance.getCurrentPage(), `login-component::shadow-dom([id=${element.loginBtn}])`);
        await email.type("gent.jashari@polymaths.co");
        await browser_1.browserInstance.getCurrentPage().waitForTimeout(1000);
        await password.type("123456");
        await browser_1.browserInstance.getCurrentPage().waitForTimeout(1000);
        await loginBtn.click();
        await browser_1.browserInstance.getCurrentPage().waitForNavigation({ waitUntil: 'networkidle0' });
    };
}
let login = new LoginPage();
exports.login = login;
