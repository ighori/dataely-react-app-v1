import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ServiceOwnerComponentsPage from './service-owner.page-object';
import ServiceOwnerUpdatePage from './service-owner-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('ServiceOwner e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceOwnerComponentsPage: ServiceOwnerComponentsPage;
  let serviceOwnerUpdatePage: ServiceOwnerUpdatePage;
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
    serviceOwnerComponentsPage = new ServiceOwnerComponentsPage();
    serviceOwnerComponentsPage = await serviceOwnerComponentsPage.goToPage(navBarPage);
  });

  it('should load ServiceOwners', async () => {
    expect(await serviceOwnerComponentsPage.title.getText()).to.match(/Service Owners/);
    expect(await serviceOwnerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ServiceOwners', async () => {
    const beforeRecordsCount = (await isVisible(serviceOwnerComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(serviceOwnerComponentsPage.table);
    serviceOwnerUpdatePage = await serviceOwnerComponentsPage.goToCreateServiceOwner();
    await serviceOwnerUpdatePage.enterData();
    expect(await isVisible(serviceOwnerUpdatePage.saveButton)).to.be.false;

    expect(await serviceOwnerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(serviceOwnerComponentsPage.table);
    await waitUntilCount(serviceOwnerComponentsPage.records, beforeRecordsCount + 1);
    expect(await serviceOwnerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await serviceOwnerComponentsPage.deleteServiceOwner();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(serviceOwnerComponentsPage.records, beforeRecordsCount);
      expect(await serviceOwnerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(serviceOwnerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
