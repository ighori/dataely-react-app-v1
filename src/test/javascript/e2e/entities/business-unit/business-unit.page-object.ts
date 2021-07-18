import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BusinessUnitUpdatePage from './business-unit-update.page-object';

const expect = chai.expect;
export class BusinessUnitDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('dataelyReactAppV1App.businessUnit.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-businessUnit'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BusinessUnitComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('business-unit-heading'));
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
    await navBarPage.getEntityPage('business-unit');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBusinessUnit() {
    await this.createButton.click();
    return new BusinessUnitUpdatePage();
  }

  async deleteBusinessUnit() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const businessUnitDeleteDialog = new BusinessUnitDeleteDialog();
    await waitUntilDisplayed(businessUnitDeleteDialog.deleteModal);
    expect(await businessUnitDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dataelyReactAppV1App.businessUnit.delete.question/
    );
    await businessUnitDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(businessUnitDeleteDialog.deleteModal);

    expect(await isVisible(businessUnitDeleteDialog.deleteModal)).to.be.false;
  }
}
