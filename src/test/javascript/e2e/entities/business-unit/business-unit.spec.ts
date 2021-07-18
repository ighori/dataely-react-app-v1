import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BusinessUnitComponentsPage from './business-unit.page-object';
import BusinessUnitUpdatePage from './business-unit-update.page-object';
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

describe('BusinessUnit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let businessUnitComponentsPage: BusinessUnitComponentsPage;
  let businessUnitUpdatePage: BusinessUnitUpdatePage;
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
    businessUnitComponentsPage = new BusinessUnitComponentsPage();
    businessUnitComponentsPage = await businessUnitComponentsPage.goToPage(navBarPage);
  });

  it('should load BusinessUnits', async () => {
    expect(await businessUnitComponentsPage.title.getText()).to.match(/Business Units/);
    expect(await businessUnitComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BusinessUnits', async () => {
    const beforeRecordsCount = (await isVisible(businessUnitComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(businessUnitComponentsPage.table);
    businessUnitUpdatePage = await businessUnitComponentsPage.goToCreateBusinessUnit();
    await businessUnitUpdatePage.enterData();
    expect(await isVisible(businessUnitUpdatePage.saveButton)).to.be.false;

    expect(await businessUnitComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(businessUnitComponentsPage.table);
    await waitUntilCount(businessUnitComponentsPage.records, beforeRecordsCount + 1);
    expect(await businessUnitComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await businessUnitComponentsPage.deleteBusinessUnit();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(businessUnitComponentsPage.records, beforeRecordsCount);
      expect(await businessUnitComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(businessUnitComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
