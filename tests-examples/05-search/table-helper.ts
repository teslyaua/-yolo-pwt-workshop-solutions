import { Locator, Page } from "@playwright/test";

export class TableHelper {
  readonly page: Page;
  readonly tableLocator: Locator;

  constructor(page: Page, tableLocator: string) {
    this.page = page;
    this.tableLocator = this.page.locator(tableLocator).getByRole("table");
  }

  /**
   * Returns the header index of elements matching given headerValue in the table Header.
   * Error would be raised if column name would not be found in the table header.
   * @param headerValue A value / column name in the table Header.
   * @returns headerIndex
   */
  async getHeaderIndexByValue(headerValue: string) {
    const headerNames = this.tableLocator.locator("thead").getByRole("cell");
    let headerIndex: number = -1;
    for (let i = 0; i < (await headerNames.count()); ++i) {
      const headerText = await headerNames.nth(i).innerText();
      if (headerText === headerValue) {
        headerIndex = i;
        return headerIndex;
      }
    }

    if (headerIndex === -1) {
      throw new Error(
        `'${headerValue}' column name was not found in the table header`
      );
    }
  }

  /**
   * Returns the cell inner text based on given headerValue and rawIndex / rawHasText.
   * @param headerValue A value / column name in the table Header.
   * @param options A rawIndex / rawHasText parameters to find particular raw in the table. At least one parameter is mandatory.
   * @returns
   */
  async getCellTextByHeaderValue(
    headerValue: string,
    options: { rawIndex?: number; rawHasText?: string }
  ) {
    let headerIndex = (await this.getHeaderIndexByValue(headerValue)) ?? -1;

    const rows = this.tableLocator.locator("tbody").getByRole("row");
    if (options?.rawIndex != null) {
      return rows
        .nth(options?.rawIndex)
        .getByRole("cell")
        .nth(headerIndex)
        .innerText();
    } else if (options?.rawHasText != null) {
      return rows
        .filter({ hasText: options?.rawHasText })
        .getByRole("cell")
        .nth(headerIndex)
        .innerText();
    } else {
      throw new Error("Please provide a rawIndex or rawHasText value");
    }
  }

  /**
   * Clicking cell based on given headerValue and rawIndex / rawHasText.
   * @param headerValue A value / column name in the table Header.
   * @param options A rawIndex / rawHasText parameters to find particular raw in the table. At least one parameter is mandatory.
   * @returns
   */
  async clickCellByHeaderValue(
    headerValue: string,
    options: { rawIndex?: number; rawHasText?: string }
  ) {
    let headerIndex = (await this.getHeaderIndexByValue(headerValue)) ?? -1;

    const rows = this.tableLocator.locator("tbody").getByRole("row");
    if (options?.rawIndex != null) {
      return rows
        .nth(options?.rawIndex)
        .getByRole("cell")
        .nth(headerIndex)
        .click();
    } else if (options?.rawHasText != null) {
      return rows
        .filter({ hasText: options?.rawHasText })
        .getByRole("cell")
        .nth(headerIndex)
        .click();
    } else {
      throw new Error("Please provide a rawIndex or rawHasText value");
    }
  }
}
