import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ServiceOwnerUpdatePage from './service-owner-update.page-object';

const expect = chai.expect;
export class ServiceOwnerDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('dataelyReactAppV1App.serviceOwner.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-serviceOwner'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ServiceOwnerComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('service-owner-heading'));
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
    await navBarPage.getEntityPage('service-owner');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateServiceOwner() {
    await this.createButton.click();
    return new ServiceOwnerUpdatePage();
  }

  async deleteServiceOwner() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const serviceOwnerDeleteDialog = new ServiceOwnerDeleteDialog();
    await waitUntilDisplayed(serviceOwnerDeleteDialog.deleteModal);
    expect(await serviceOwnerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dataelyReactAppV1App.serviceOwner.delete.question/
    );
    await serviceOwnerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(serviceOwnerDeleteDialog.deleteModal);

    expect(await isVisible(serviceOwnerDeleteDialog.deleteModal)).to.be.false;
  }
}
