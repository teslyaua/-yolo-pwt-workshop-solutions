import { test, expect } from "@playwright/test";
import { Backoffice } from "./backoffice";
import { ygfAdmin } from "./admins";
import { searchOptions } from "./enums";

const extendedTest = test.extend<{ backoffice: ReturnType<typeof Backoffice> }>(
  {
    backoffice: async ({ page }, use) => {
      await use(Backoffice(page));
    },
  }
);

// ------- save storage
extendedTest.beforeEach(async ({ backoffice }) => {
  await backoffice.loginPage.open();
  await backoffice.loginPage.login(ygfAdmin);
  await backoffice.page
    .context()
    .storageState({ path: "storageStates/ygfAdminSavedStorage.json" });
});

  // extendedTest.use({
  //   storageState: "storageStates/ygfAdminSavedStorage.json",
  // });

extendedTest.beforeEach(async ({ backoffice }) => {
  await backoffice.loginPage.open();
});

extendedTest("@smokeAdmin could search user by name", async ({ backoffice }) => {
  await backoffice.customersPage.searchByUserName(searchOptions.userName, "myrtice.gerlach")
});


// // ------ grep
// extendedTest(
//   "@regression | Admin could search user by user ID",
//   async ({ backoffice }) => {
//     await backoffice.customersPage.searchByUserName(searchOptions.id, "178717");
//   }
// );

// extendedTest(
//   "@regression | Admin could search user by user email",
//   async ({ backoffice }) => {
//     await backoffice.customersPage.searchByUserName(
//       searchOptions.email,
//       "username_myrtice.gerlach@hi.com"
//     );
//   }
// );
