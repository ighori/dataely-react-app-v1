import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OrganizationComponentsPage from './organization.page-object';
import OrganizationUpdatePage from './organization-update.page-object';
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

describe('Organization e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let organizationComponentsPage: OrganizationComponentsPage;
  let organizationUpdatePage: OrganizationUpdatePage;
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
    organizationComponentsPage = new OrganizationComponentsPage();
    organizationComponentsPage = await organizationComponentsPage.goToPage(navBarPage);
  });

  it('should load Organizations', async () => {
    expect(await organizationComponentsPage.title.getText()).to.match(/Organizations/);
    expect(await organizationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Organizations', async () => {
        const beforeRecordsCount = await isVisible(organizationComponentsPage.noRecords) ? 0 : await getRecordsCount(organizationComponentsPage.table);
        organizationUpdatePage = await organizationComponentsPage.goToCreateOrganization();
        await organizationUpdatePage.enterData();
        expect(await isVisible(organizationUpdatePage.saveButton)).to.be.false;

        expect(await organizationComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(organizationComponentsPage.table);
        await waitUntilCount(organizationComponentsPage.records, beforeRecordsCount + 1);
        expect(await organizationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await organizationComponentsPage.deleteOrganization();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(organizationComponentsPage.records, beforeRecordsCount);
          expect(await organizationComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(organizationComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
