import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ServiceOwnerUpdatePage {
  pageTitle: ElementFinder = element(by.id('dataelyReactAppV1App.serviceOwner.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#service-owner-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#service-owner-lastName'));
  nameInput: ElementFinder = element(by.css('input#service-owner-name'));
  roleInput: ElementFinder = element(by.css('input#service-owner-role'));
  emailInput: ElementFinder = element(by.css('input#service-owner-email'));
  contactNumberInput: ElementFinder = element(by.css('input#service-owner-contactNumber'));
  extensionInput: ElementFinder = element(by.css('input#service-owner-extension'));
  locationInput: ElementFinder = element(by.css('input#service-owner-location'));
  addressLine1Input: ElementFinder = element(by.css('input#service-owner-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#service-owner-addressLine2'));
  cityInput: ElementFinder = element(by.css('input#service-owner-city'));
  countryInput: ElementFinder = element(by.css('input#service-owner-country'));
  imageInput: ElementFinder = element(by.css('input#service-owner-image'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setRoleInput(role) {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput() {
    return this.roleInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setContactNumberInput(contactNumber) {
    await this.contactNumberInput.sendKeys(contactNumber);
  }

  async getContactNumberInput() {
    return this.contactNumberInput.getAttribute('value');
  }

  async setExtensionInput(extension) {
    await this.extensionInput.sendKeys(extension);
  }

  async getExtensionInput() {
    return this.extensionInput.getAttribute('value');
  }

  async setLocationInput(location) {
    await this.locationInput.sendKeys(location);
  }

  async getLocationInput() {
    return this.locationInput.getAttribute('value');
  }

  async setAddressLine1Input(addressLine1) {
    await this.addressLine1Input.sendKeys(addressLine1);
  }

  async getAddressLine1Input() {
    return this.addressLine1Input.getAttribute('value');
  }

  async setAddressLine2Input(addressLine2) {
    await this.addressLine2Input.sendKeys(addressLine2);
  }

  async getAddressLine2Input() {
    return this.addressLine2Input.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return this.imageInput.getAttribute('value');
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
    await this.setFirstNameInput('firstName');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    await waitUntilDisplayed(this.saveButton);
    await this.setRoleInput('role');
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('?+B:e&lt;@F[.4~');
    await waitUntilDisplayed(this.saveButton);
    await this.setContactNumberInput('contactNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setExtensionInput('extension');
    await waitUntilDisplayed(this.saveButton);
    await this.setLocationInput('location');
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressLine1Input('addressLine1');
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressLine2Input('addressLine2');
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryInput('country');
    await waitUntilDisplayed(this.saveButton);
    await this.setImageInput(absolutePath);
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
