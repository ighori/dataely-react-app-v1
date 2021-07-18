import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EnvironmentComponentsPage from './environment.page-object';
import EnvironmentUpdatePage from './environment-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Environment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let environmentComponentsPage: EnvironmentComponentsPage;
  let environmentUpdatePage: EnvironmentUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    environmentComponentsPage = new EnvironmentComponentsPage();
    environmentComponentsPage = await environmentComponentsPage.goToPage(navBarPage);
  });

  it('should load Environments', async () => {
    expect(await environmentComponentsPage.title.getText()).to.match(/Environments/);
    expect(await environmentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Environments', async () => {
    const beforeRecordsCount = (await isVisible(environmentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(environmentComponentsPage.table);
    environmentUpdatePage = await environmentComponentsPage.goToCreateEnvironment();
    await environmentUpdatePage.enterData();
    expect(await isVisible(environmentUpdatePage.saveButton)).to.be.false;

    expect(await environmentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(environmentComponentsPage.table);
    await waitUntilCount(environmentComponentsPage.records, beforeRecordsCount + 1);
    expect(await environmentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await environmentComponentsPage.deleteEnvironment();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(environmentComponentsPage.records, beforeRecordsCount);
      expect(await environmentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(environmentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
