import * as  Puppeteer from "puppeteer";
import { browserInstance } from "./browser";
import { Given, When, Then, } from '@cucumber/cucumber';
import { shpiments } from "./shpiments";
import { componentCatalogClass } from "./catalogComponents";


let init = async () => {
   // shpiments.shipmentsPage();
   // at the end -> browserInstance.getCurrentPage().close();
   componentCatalogClass.compoentsCatalog();
}

init();



