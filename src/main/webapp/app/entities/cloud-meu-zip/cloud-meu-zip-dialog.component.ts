import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudMeuZip } from './cloud-meu-zip.model';
import { CloudMeuZipPopupService } from './cloud-meu-zip-popup.service';
import { CloudMeuZipService } from './cloud-meu-zip.service';
import { CloudMeu, CloudMeuService } from '../cloud-meu';

@Component({
    selector: 'jhi-cloud-meu-zip-dialog',
    templateUrl: './cloud-meu-zip-dialog.component.html'
})
export class CloudMeuZipDialogComponent implements OnInit {

    cloudMeuZip: CloudMeuZip;
    isSaving: boolean;

    cloudmeus: CloudMeu[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private cloudMeuZipService: CloudMeuZipService,
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
        if (this.cloudMeuZip.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cloudMeuZipService.update(this.cloudMeuZip));
        } else {
            this.subscribeToSaveResponse(
                this.cloudMeuZipService.create(this.cloudMeuZip));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CloudMeuZip>>) {
        result.subscribe((res: HttpResponse<CloudMeuZip>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CloudMeuZip) {
        this.eventManager.broadcast({ name: 'cloudMeuZipListModification', content: 'OK'});
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
    selector: 'jhi-cloud-meu-zip-popup',
    template: ''
})
export class CloudMeuZipPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudMeuZipPopupService: CloudMeuZipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cloudMeuZipPopupService
                    .open(CloudMeuZipDialogComponent as Component, params['id']);
            } else {
                this.cloudMeuZipPopupService
                    .open(CloudMeuZipDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
