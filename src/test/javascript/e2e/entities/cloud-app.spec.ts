import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CloudApp e2e test', () => {

    let navBarPage: NavBarPage;
    let cloudAppDialogPage: CloudAppDialogPage;
    let cloudAppComponentsPage: CloudAppComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CloudApps', () => {
        navBarPage.goToEntity('cloud-app');
        cloudAppComponentsPage = new CloudAppComponentsPage();
        expect(cloudAppComponentsPage.getTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudApp.home.title/);

    });

    it('should load create CloudApp dialog', () => {
        cloudAppComponentsPage.clickOnCreateButton();
        cloudAppDialogPage = new CloudAppDialogPage();
        expect(cloudAppDialogPage.getModalTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudApp.home.createOrEditLabel/);
        cloudAppDialogPage.close();
    });

    it('should create and save CloudApps', () => {
        cloudAppComponentsPage.clickOnCreateButton();
        cloudAppDialogPage.setNameInput('name');
        expect(cloudAppDialogPage.getNameInput()).toMatch('name');
        cloudAppDialogPage.setDescriptionInput('description');
        expect(cloudAppDialogPage.getDescriptionInput()).toMatch('description');
        cloudAppDialogPage.setEpgsInput('epgs');
        expect(cloudAppDialogPage.getEpgsInput()).toMatch('epgs');
        cloudAppDialogPage.setConfigurationsInput('configurations');
        expect(cloudAppDialogPage.getConfigurationsInput()).toMatch('configurations');
        cloudAppDialogPage.setUploadFileInput('uploadFile');
        expect(cloudAppDialogPage.getUploadFileInput()).toMatch('uploadFile');
        cloudAppDialogPage.statusSelectLastOption();
        cloudAppDialogPage.setAccountNameInput('accountName');
        expect(cloudAppDialogPage.getAccountNameInput()).toMatch('accountName');
        cloudAppDialogPage.setBuildFileIdInput('buildFileId');
        expect(cloudAppDialogPage.getBuildFileIdInput()).toMatch('buildFileId');
        cloudAppDialogPage.setResouceMappingInput('resouceMapping');
        expect(cloudAppDialogPage.getResouceMappingInput()).toMatch('resouceMapping');
        cloudAppDialogPage.setBuildLogInput('buildLog');
        expect(cloudAppDialogPage.getBuildLogInput()).toMatch('buildLog');
        cloudAppDialogPage.setAppContentInput('appContent');
        expect(cloudAppDialogPage.getAppContentInput()).toMatch('appContent');
        cloudAppDialogPage.save();
        expect(cloudAppDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CloudAppComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cloud-app div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CloudAppDialogPage {
    modalTitle = element(by.css('h4#myCloudAppLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    epgsInput = element(by.css('input#field_epgs'));
    configurationsInput = element(by.css('textarea#field_configurations'));
    uploadFileInput = element(by.css('textarea#field_uploadFile'));
    statusSelect = element(by.css('select#field_status'));
    accountNameInput = element(by.css('input#field_accountName'));
    buildFileIdInput = element(by.css('input#field_buildFileId'));
    resouceMappingInput = element(by.css('textarea#field_resouceMapping'));
    buildLogInput = element(by.css('textarea#field_buildLog'));
    appContentInput = element(by.css('textarea#field_appContent'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setEpgsInput = function(epgs) {
        this.epgsInput.sendKeys(epgs);
    };

    getEpgsInput = function() {
        return this.epgsInput.getAttribute('value');
    };

    setConfigurationsInput = function(configurations) {
        this.configurationsInput.sendKeys(configurations);
    };

    getConfigurationsInput = function() {
        return this.configurationsInput.getAttribute('value');
    };

    setUploadFileInput = function(uploadFile) {
        this.uploadFileInput.sendKeys(uploadFile);
    };

    getUploadFileInput = function() {
        return this.uploadFileInput.getAttribute('value');
    };

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    };
    setAccountNameInput = function(accountName) {
        this.accountNameInput.sendKeys(accountName);
    };

    getAccountNameInput = function() {
        return this.accountNameInput.getAttribute('value');
    };

    setBuildFileIdInput = function(buildFileId) {
        this.buildFileIdInput.sendKeys(buildFileId);
    };

    getBuildFileIdInput = function() {
        return this.buildFileIdInput.getAttribute('value');
    };

    setResouceMappingInput = function(resouceMapping) {
        this.resouceMappingInput.sendKeys(resouceMapping);
    };

    getResouceMappingInput = function() {
        return this.resouceMappingInput.getAttribute('value');
    };

    setBuildLogInput = function(buildLog) {
        this.buildLogInput.sendKeys(buildLog);
    };

    getBuildLogInput = function() {
        return this.buildLogInput.getAttribute('value');
    };

    setAppContentInput = function(appContent) {
        this.appContentInput.sendKeys(appContent);
    };

    getAppContentInput = function() {
        return this.appContentInput.getAttribute('value');
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
