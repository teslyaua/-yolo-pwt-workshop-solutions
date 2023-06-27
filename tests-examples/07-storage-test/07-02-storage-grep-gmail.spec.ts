import { test, expect } from "@playwright/test";
import { Backoffice } from "./backoffice";
import { ygfAdmin } from "./admins";
import { searchOptions } from "./enums";
import { getBodyFromEmail } from "./gmail/gmail-utils";

const extendedTest = test.extend<{ backoffice: ReturnType<typeof Backoffice> }>(
  {
    backoffice: async ({ page }, use) => {
      await use(Backoffice(page));
    },
  }
);
extendedTest.beforeEach(async ({ backoffice }) => {
  await backoffice.loginPage.open();
});

extendedTest(
  "@smoke | Admin could search user by name",
  async ({ backoffice }) => {
    const now = new Date();
    const userName = "iurii.teslia";

    // await extendedTest.step(
    //   `STEP-1: Open  Forgot UserName page and submit recovering username`,
    //   async () => {
    //     await backoffice.loginPage.submitRecoveringUsername(ygfAdmin);
    //   }
    // );

    let emailBody = await extendedTest.step(
      `STEP-2: Get body from Email`,
      async () => {
        const emailSubject = "Recover Username";
        const emailFrom = "support@example.com";
        return await getBodyFromEmail(emailSubject, emailFrom, now);
      }
    );

    expect(emailBody).toContain(`Your username is: ${userName}`);
  }
);
