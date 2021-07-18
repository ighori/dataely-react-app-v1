import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import OrganizationUpdatePage from './organization-update.page-object';

const expect = chai.expect;
export class OrganizationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('dataelyReactAppV1App.organization.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-organization'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OrganizationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('organization-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('organization');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOrganization() {
    await this.createButton.click();
    return new OrganizationUpdatePage();
  }

  async deleteOrganization() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const organizationDeleteDialog = new OrganizationDeleteDialog();
    await waitUntilDisplayed(organizationDeleteDialog.deleteModal);
    expect(await organizationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dataelyReactAppV1App.organization.delete.question/
    );
    await organizationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(organizationDeleteDialog.deleteModal);

    expect(await isVisible(organizationDeleteDialog.deleteModal)).to.be.false;
  }
}
