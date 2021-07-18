import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BusinessUnitUpdatePage {
  pageTitle: ElementFinder = element(by.id('dataelyReactAppV1App.businessUnit.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#business-unit-code'));
  nameInput: ElementFinder = element(by.css('input#business-unit-name'));
  detailInput: ElementFinder = element(by.css('input#business-unit-detail'));
  creationDateInput: ElementFinder = element(by.css('input#business-unit-creationDate'));
  lastUpdatedInput: ElementFinder = element(by.css('input#business-unit-lastUpdated'));
  organizationSelect: ElementFinder = element(by.css('select#business-unit-organization'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDetailInput(detail) {
    await this.detailInput.sendKeys(detail);
  }

  async getDetailInput() {
    return this.detailInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return this.creationDateInput.getAttribute('value');
  }

  async setLastUpdatedInput(lastUpdated) {
    await this.lastUpdatedInput.sendKeys(lastUpdated);
  }

  async getLastUpdatedInput() {
    return this.lastUpdatedInput.getAttribute('value');
  }

  async organizationSelectLastOption() {
    await this.organizationSelect.all(by.tagName('option')).last().click();
  }

  async organizationSelectOption(option) {
    await this.organizationSelect.sendKeys(option);
  }

  getOrganizationSelect() {
    return this.organizationSelect;
  }

  async getOrganizationSelectedOption() {
    return this.organizationSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('code');
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    await waitUntilDisplayed(this.saveButton);
    await this.setDetailInput('detail');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await this.organizationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
