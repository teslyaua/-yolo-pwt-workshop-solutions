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

  async submitRecoveringUsername(admin: Admin) {
    await page.getByRole("link", { name: "Forgot UserName?" }).click();
    await page.waitForLoadState("networkidle");
    await page
      .locator('[name="recover_user_uid[operator_id]"]')
      .selectOption(admin.operatorName);
    await page
      .locator('[name="recover_user_uid[email]"]')
      .fill(admin.adminEmail);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Email has been sent!!").waitFor();
  },
});
