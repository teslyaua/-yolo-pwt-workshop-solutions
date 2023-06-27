import { Page } from "playwright-core";
import { Admin } from "./admins";

export const loginPage = (page: Page) => ({
  async open() {
    await page.goto(
      "http://p-lab_user-admin.p.testenv.io/login?return_path=%2F"
    );
    await page.waitForLoadState("networkidle");
  },
  async login(admin: Admin) {
    await page.locator("#login_operator_id").selectOption(admin.operatorName);
    await page.locator("#login_username").fill(`${admin.adminName}`);
    await page.locator("#login_password").fill(`${admin.adminPassword}`);
    await page.getByRole("button", { name: "Log in" }).click();
    await page.waitForURL("**/users");
  },
});
