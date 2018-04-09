import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('CloudMeuZip e2e test', () => {

    let navBarPage: NavBarPage;
    let cloudMeuZipDialogPage: CloudMeuZipDialogPage;
    let cloudMeuZipComponentsPage: CloudMeuZipComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CloudMeuZips', () => {
        navBarPage.goToEntity('cloud-meu-zip');
        cloudMeuZipComponentsPage = new CloudMeuZipComponentsPage();
        expect(cloudMeuZipComponentsPage.getTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudMeuZip.home.title/);

    });

    it('should load create CloudMeuZip dialog', () => {
        cloudMeuZipComponentsPage.clickOnCreateButton();
        cloudMeuZipDialogPage = new CloudMeuZipDialogPage();
        expect(cloudMeuZipDialogPage.getModalTitle())
            .toMatch(/cornerstoneCloudServerApp.cloudMeuZip.home.createOrEditLabel/);
        cloudMeuZipDialogPage.close();
    });

   /* it('should create and save CloudMeuZips', () => {
        cloudMeuZipComponentsPage.clickOnCreateButton();
        cloudMeuZipDialogPage.setFileNameInput('fileName');
        expect(cloudMeuZipDialogPage.getFileNameInput()).toMatch('fileName');
        cloudMeuZipDialogPage.setZipFileInput(absolutePath);
        cloudMeuZipDialogPage.save();
        expect(cloudMeuZipDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CloudMeuZipComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cloud-meu-zip div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CloudMeuZipDialogPage {
    modalTitle = element(by.css('h4#myCloudMeuZipLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    fileNameInput = element(by.css('input#field_fileName'));
    zipFileInput = element(by.css('input#file_zipFile'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFileNameInput = function(fileName) {
        this.fileNameInput.sendKeys(fileName);
    };

    getFileNameInput = function() {
        return this.fileNameInput.getAttribute('value');
    };

    setZipFileInput = function(zipFile) {
        this.zipFileInput.sendKeys(zipFile);
    };

    getZipFileInput = function() {
        return this.zipFileInput.getAttribute('value');
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
