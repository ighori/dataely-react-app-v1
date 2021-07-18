import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class OrganizationUpdatePage {
  pageTitle: ElementFinder = element(by.id('dataelyReactAppV1App.organization.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#organization-code'));
  nameInput: ElementFinder = element(by.css('input#organization-name'));
  detailInput: ElementFinder = element(by.css('input#organization-detail'));
  creationDateInput: ElementFinder = element(by.css('input#organization-creationDate'));
  lastUpdatedInput: ElementFinder = element(by.css('input#organization-lastUpdated'));
  userSelect: ElementFinder = element(by.css('select#organization-user'));

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

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
