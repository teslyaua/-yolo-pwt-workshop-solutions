import { Page, expect } from "@playwright/test";
import { searchOptions } from "./enums";

export const customersPage = (page: Page) => ({
  async searchByUserName(searchOption: searchOptions, parameter: string) {
    await page.getByPlaceholder(searchOption).fill(parameter);
    await expect(async () => {
      await page.getByPlaceholder(searchOption).press("Enter");

      const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
      expect(rowNumber).toBe(1);
    }, "Should be only the 1 raw after the search").toPass({
      timeout: 15_000,
      intervals: [5_000],
    });
  },
  async chooseBrand(brand: string) {
    await page
      .getByRole("button")
      .filter({ hasText: "Brands • All" })
      .nth(1)
      .click();
    await page
      .getByTestId("site-filter-popover-panel")
      .getByText(brand)
      .click();
    await page.getByRole("button", { name: "Apply" }).click();
  },
});