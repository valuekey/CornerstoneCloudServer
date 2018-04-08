import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudApp } from './cloud-app.model';
import { CloudAppPopupService } from './cloud-app-popup.service';
import { CloudAppService } from './cloud-app.service';

@Component({
    selector: 'jhi-cloud-app-dialog',
    templateUrl: './cloud-app-dialog.component.html'
})
export class CloudAppDialogComponent implements OnInit {

    cloudApp: CloudApp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private cloudAppService: CloudAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.cloudApp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cloudAppService.update(this.cloudApp));
        } else {
            this.subscribeToSaveResponse(
                this.cloudAppService.create(this.cloudApp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CloudApp>>) {
        result.subscribe((res: HttpResponse<CloudApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CloudApp) {
        this.eventManager.broadcast({ name: 'cloudAppListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cloud-app-popup',
    template: ''
})
export class CloudAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudAppPopupService: CloudAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cloudAppPopupService
                    .open(CloudAppDialogComponent as Component, params['id']);
            } else {
                this.cloudAppPopupService
                    .open(CloudAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
