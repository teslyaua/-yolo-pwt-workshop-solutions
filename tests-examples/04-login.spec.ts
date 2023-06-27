import { test, expect } from "@playwright/test";

test("Admin could login into BO", async ({ page }) => {
  await page.goto("http://p-lab_user-admin.p.testenv.io/login?return_path=%2F");
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("**/users");

  // //-------- Locators are strict
  // await page.getByRole("link").click();

  // //--------  Locators are lazy
  // const usernameSearch = page.getByPlaceholder("Search by User Name1");
  // console.log(`Locator is not used yet`);
  // await usernameSearch.fill("123");

  // //--------  Locators can be chained
  // const rows = await page.locator("tbody").getByRole("row").count();
  // console.log(`rows = ${rows}`);
});

// actionTimeout: 15 * 1000,
