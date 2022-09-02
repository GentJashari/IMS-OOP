import { Puppeteer } from "puppeteer";
import * as element from "./BaseElements";
let getEl = require("puppeteer-shadow-selector").$;
import { browserInstance } from "./browser";


class LoginPage {
    constructor() { }
    login = async () => {
        await browserInstance.goto(`${element.loginPage}`,);
        // await browserInstance.getCurrentPage().waitForNavigation({ waitUntil: 'networkidle0' });

        await browserInstance.getCurrentPage().waitForTimeout(2000);

        let email = await getEl(browserInstance.getCurrentPage(), `login-component::shadow-dom([id=${element.inputEmail}])`);
        let password = await getEl(browserInstance.getCurrentPage(), `login-component::shadow-dom([id=${element.inputPassowrd}])`);
        let loginBtn = await getEl(browserInstance.getCurrentPage(), `login-component::shadow-dom([id=${element.loginBtn}])`);

        await email.type("gent.jashari@polymaths.co");
        await browserInstance.getCurrentPage().waitForTimeout(1000);
        await password.type("123456");
        await browserInstance.getCurrentPage().waitForTimeout(1000);
        await loginBtn.click();
        await browserInstance.getCurrentPage().waitForNavigation({ waitUntil: 'networkidle0' });
    }
}

let login = new LoginPage();


export {
    login
}
