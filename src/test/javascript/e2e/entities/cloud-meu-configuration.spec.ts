import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CloudMeuConfiguration e2e test', () => {

    let navBarPage: NavBarPage;
    let cloudMeuConfigurationDialogPage: CloudMeuConfigurationDialogPage;
    let cloudMeuConfigurationComponentsPage: CloudMeuConfigurationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CloudMeuConfigurations', () => {
        navBarPage.goToEntity('cloud-meu-configuration');
        cloudMeuConfigurationComponentsPage = new CloudMeuConfigurationComponentsPage();
        expect(cloudMeuConfigurationComponentsPage.getTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudMeuConfiguration.home.title/);

    });

    it('should load create CloudMeuConfiguration dialog', () => {
        cloudMeuConfigurationComponentsPage.clickOnCreateButton();
        cloudMeuConfigurationDialogPage = new CloudMeuConfigurationDialogPage();
        expect(cloudMeuConfigurationDialogPage.getModalTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudMeuConfiguration.home.createOrEditLabel/);
        cloudMeuConfigurationDialogPage.close();
    });

   /* it('should create and save CloudMeuConfigurations', () => {
        cloudMeuConfigurationComponentsPage.clickOnCreateButton();
        cloudMeuConfigurationDialogPage.setFilenameInput('filename');
        expect(cloudMeuConfigurationDialogPage.getFilenameInput()).toMatch('filename');
        cloudMeuConfigurationDialogPage.setContentInput('content');
        expect(cloudMeuConfigurationDialogPage.getContentInput()).toMatch('content');
        cloudMeuConfigurationDialogPage.cloudMeuSelectLastOption();
        cloudMeuConfigurationDialogPage.save();
        expect(cloudMeuConfigurationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CloudMeuConfigurationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cloud-meu-configuration div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CloudMeuConfigurationDialogPage {
    modalTitle = element(by.css('h4#myCloudMeuConfigurationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    filenameInput = element(by.css('input#field_filename'));
    contentInput = element(by.css('textarea#field_content'));
    cloudMeuSelect = element(by.css('select#field_cloudMeu'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFilenameInput = function(filename) {
        this.filenameInput.sendKeys(filename);
    };

    getFilenameInput = function() {
        return this.filenameInput.getAttribute('value');
    };

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    };

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    };

    cloudMeuSelectLastOption = function() {
        this.cloudMeuSelect.all(by.tagName('option')).last().click();
    };

    cloudMeuSelectOption = function(option) {
        this.cloudMeuSelect.sendKeys(option);
    };

    getCloudMeuSelect = function() {
        return this.cloudMeuSelect;
    };

    getCloudMeuSelectedOption = function() {
        return this.cloudMeuSelect.element(by.css('option:checked')).getText();
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
