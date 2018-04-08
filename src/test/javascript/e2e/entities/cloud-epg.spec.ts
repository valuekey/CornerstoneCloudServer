import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CloudEpg e2e test', () => {

    let navBarPage: NavBarPage;
    let cloudEpgDialogPage: CloudEpgDialogPage;
    let cloudEpgComponentsPage: CloudEpgComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CloudEpgs', () => {
        navBarPage.goToEntity('cloud-epg');
        cloudEpgComponentsPage = new CloudEpgComponentsPage();
        expect(cloudEpgComponentsPage.getTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudEpg.home.title/);

    });

    it('should load create CloudEpg dialog', () => {
        cloudEpgComponentsPage.clickOnCreateButton();
        cloudEpgDialogPage = new CloudEpgDialogPage();
        expect(cloudEpgDialogPage.getModalTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudEpg.home.createOrEditLabel/);
        cloudEpgDialogPage.close();
    });

    it('should create and save CloudEpgs', () => {
        cloudEpgComponentsPage.clickOnCreateButton();
        cloudEpgDialogPage.setNameInput('name');
        expect(cloudEpgDialogPage.getNameInput()).toMatch('name');
        cloudEpgDialogPage.setDescriptionInput('description');
        expect(cloudEpgDialogPage.getDescriptionInput()).toMatch('description');
        cloudEpgDialogPage.setEpgDefinitionInput('epgDefinition');
        expect(cloudEpgDialogPage.getEpgDefinitionInput()).toMatch('epgDefinition');
        cloudEpgDialogPage.setAccountNameInput('accountName');
        expect(cloudEpgDialogPage.getAccountNameInput()).toMatch('accountName');
        cloudEpgDialogPage.setUrlMappingsInput('urlMappings');
        expect(cloudEpgDialogPage.getUrlMappingsInput()).toMatch('urlMappings');
        cloudEpgDialogPage.setGraphInfoInput('graphInfo');
        expect(cloudEpgDialogPage.getGraphInfoInput()).toMatch('graphInfo');
        cloudEpgDialogPage.save();
        expect(cloudEpgDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CloudEpgComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cloud-epg div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CloudEpgDialogPage {
    modalTitle = element(by.css('h4#myCloudEpgLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    epgDefinitionInput = element(by.css('textarea#field_epgDefinition'));
    accountNameInput = element(by.css('input#field_accountName'));
    urlMappingsInput = element(by.css('textarea#field_urlMappings'));
    graphInfoInput = element(by.css('textarea#field_graphInfo'));

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

    setEpgDefinitionInput = function(epgDefinition) {
        this.epgDefinitionInput.sendKeys(epgDefinition);
    };

    getEpgDefinitionInput = function() {
        return this.epgDefinitionInput.getAttribute('value');
    };

    setAccountNameInput = function(accountName) {
        this.accountNameInput.sendKeys(accountName);
    };

    getAccountNameInput = function() {
        return this.accountNameInput.getAttribute('value');
    };

    setUrlMappingsInput = function(urlMappings) {
        this.urlMappingsInput.sendKeys(urlMappings);
    };

    getUrlMappingsInput = function() {
        return this.urlMappingsInput.getAttribute('value');
    };

    setGraphInfoInput = function(graphInfo) {
        this.graphInfoInput.sendKeys(graphInfo);
    };

    getGraphInfoInput = function() {
        return this.graphInfoInput.getAttribute('value');
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
