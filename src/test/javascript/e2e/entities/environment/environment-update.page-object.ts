import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EnvironmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('dataelyReactAppV1App.environment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#environment-code'));
  nameInput: ElementFinder = element(by.css('input#environment-name'));
  detailInput: ElementFinder = element(by.css('input#environment-detail'));
  appTypeSelect: ElementFinder = element(by.css('select#environment-appType'));
  typeSelect: ElementFinder = element(by.css('select#environment-type'));
  purposeSelect: ElementFinder = element(by.css('select#environment-purpose'));
  creationDateInput: ElementFinder = element(by.css('input#environment-creationDate'));
  lastUpdatedInput: ElementFinder = element(by.css('input#environment-lastUpdated'));
  serviceOwnerSelect: ElementFinder = element(by.css('select#environment-serviceOwner'));
  projectSelect: ElementFinder = element(by.css('select#environment-project'));

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

  async setAppTypeSelect(appType) {
    await this.appTypeSelect.sendKeys(appType);
  }

  async getAppTypeSelect() {
    return this.appTypeSelect.element(by.css('option:checked')).getText();
  }

  async appTypeSelectLastOption() {
    await this.appTypeSelect.all(by.tagName('option')).last().click();
  }
  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async setPurposeSelect(purpose) {
    await this.purposeSelect.sendKeys(purpose);
  }

  async getPurposeSelect() {
    return this.purposeSelect.element(by.css('option:checked')).getText();
  }

  async purposeSelectLastOption() {
    await this.purposeSelect.all(by.tagName('option')).last().click();
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

  async serviceOwnerSelectLastOption() {
    await this.serviceOwnerSelect.all(by.tagName('option')).last().click();
  }

  async serviceOwnerSelectOption(option) {
    await this.serviceOwnerSelect.sendKeys(option);
  }

  getServiceOwnerSelect() {
    return this.serviceOwnerSelect;
  }

  async getServiceOwnerSelectedOption() {
    return this.serviceOwnerSelect.element(by.css('option:checked')).getText();
  }

  async projectSelectLastOption() {
    await this.projectSelect.all(by.tagName('option')).last().click();
  }

  async projectSelectOption(option) {
    await this.projectSelect.sendKeys(option);
  }

  getProjectSelect() {
    return this.projectSelect;
  }

  async getProjectSelectedOption() {
    return this.projectSelect.element(by.css('option:checked')).getText();
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
    await this.appTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.purposeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await this.serviceOwnerSelectLastOption();
    await this.projectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
