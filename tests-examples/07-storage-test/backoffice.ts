import { Page } from "playwright-core";
import { loginPage } from "./login.page";
import { customersPage } from "./customers.page";

export const Backoffice = (page: Page) => ({
  page: page,
  loginPage: loginPage(page),
  customersPage: customersPage(page),
});