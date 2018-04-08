import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudMeuConfiguration } from './cloud-meu-configuration.model';
import { CloudMeuConfigurationPopupService } from './cloud-meu-configuration-popup.service';
import { CloudMeuConfigurationService } from './cloud-meu-configuration.service';
import { CloudMeu, CloudMeuService } from '../cloud-meu';

@Component({
    selector: 'jhi-cloud-meu-configuration-dialog',
    templateUrl: './cloud-meu-configuration-dialog.component.html'
})
export class CloudMeuConfigurationDialogComponent implements OnInit {

    cloudMeuConfiguration: CloudMeuConfiguration;
    isSaving: boolean;

    cloudmeus: CloudMeu[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private cloudMeuConfigurationService: CloudMeuConfigurationService,
        private cloudMeuService: CloudMeuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cloudMeuService.query()
            .subscribe((res: HttpResponse<CloudMeu[]>) => { this.cloudmeus = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cloudMeuConfiguration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cloudMeuConfigurationService.update(this.cloudMeuConfiguration));
        } else {
            this.subscribeToSaveResponse(
                this.cloudMeuConfigurationService.create(this.cloudMeuConfiguration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CloudMeuConfiguration>>) {
        result.subscribe((res: HttpResponse<CloudMeuConfiguration>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CloudMeuConfiguration) {
        this.eventManager.broadcast({ name: 'cloudMeuConfigurationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCloudMeuById(index: number, item: CloudMeu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cloud-meu-configuration-popup',
    template: ''
})
export class CloudMeuConfigurationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudMeuConfigurationPopupService: CloudMeuConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cloudMeuConfigurationPopupService
                    .open(CloudMeuConfigurationDialogComponent as Component, params['id']);
            } else {
                this.cloudMeuConfigurationPopupService
                    .open(CloudMeuConfigurationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
