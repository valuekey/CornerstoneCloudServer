import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CloudMeu e2e test', () => {

    let navBarPage: NavBarPage;
    let cloudMeuDialogPage: CloudMeuDialogPage;
    let cloudMeuComponentsPage: CloudMeuComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CloudMeus', () => {
        navBarPage.goToEntity('cloud-meu');
        cloudMeuComponentsPage = new CloudMeuComponentsPage();
        expect(cloudMeuComponentsPage.getTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudMeu.home.title/);

    });

    it('should load create CloudMeu dialog', () => {
        cloudMeuComponentsPage.clickOnCreateButton();
        cloudMeuDialogPage = new CloudMeuDialogPage();
        expect(cloudMeuDialogPage.getModalTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudMeu.home.createOrEditLabel/);
        cloudMeuDialogPage.close();
    });

    it('should create and save CloudMeus', () => {
        cloudMeuComponentsPage.clickOnCreateButton();
        cloudMeuDialogPage.setGroupIdInput('groupId');
        expect(cloudMeuDialogPage.getGroupIdInput()).toMatch('groupId');
        cloudMeuDialogPage.setNameInput('name');
        expect(cloudMeuDialogPage.getNameInput()).toMatch('name');
        cloudMeuDialogPage.setVersionInput('version');
        expect(cloudMeuDialogPage.getVersionInput()).toMatch('version');
        cloudMeuDialogPage.setTypeInput('type');
        expect(cloudMeuDialogPage.getTypeInput()).toMatch('type');
        cloudMeuDialogPage.setMeuDefinitionInput('meuDefinition');
        expect(cloudMeuDialogPage.getMeuDefinitionInput()).toMatch('meuDefinition');
        cloudMeuDialogPage.cloudMeuZipSelectLastOption();
        cloudMeuDialogPage.save();
        expect(cloudMeuDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CloudMeuComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cloud-meu div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CloudMeuDialogPage {
    modalTitle = element(by.css('h4#myCloudMeuLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    groupIdInput = element(by.css('input#field_groupId'));
    nameInput = element(by.css('input#field_name'));
    versionInput = element(by.css('input#field_version'));
    typeInput = element(by.css('input#field_type'));
    meuDefinitionInput = element(by.css('textarea#field_meuDefinition'));
    cloudMeuZipSelect = element(by.css('select#field_cloudMeuZip'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setGroupIdInput = function(groupId) {
        this.groupIdInput.sendKeys(groupId);
    };

    getGroupIdInput = function() {
        return this.groupIdInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setVersionInput = function(version) {
        this.versionInput.sendKeys(version);
    };

    getVersionInput = function() {
        return this.versionInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    };

    setMeuDefinitionInput = function(meuDefinition) {
        this.meuDefinitionInput.sendKeys(meuDefinition);
    };

    getMeuDefinitionInput = function() {
        return this.meuDefinitionInput.getAttribute('value');
    };

    cloudMeuZipSelectLastOption = function() {
        this.cloudMeuZipSelect.all(by.tagName('option')).last().click();
    };

    cloudMeuZipSelectOption = function(option) {
        this.cloudMeuZipSelect.sendKeys(option);
    };

    getCloudMeuZipSelect = function() {
        return this.cloudMeuZipSelect;
    };

    getCloudMeuZipSelectedOption = function() {
        return this.cloudMeuZipSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
