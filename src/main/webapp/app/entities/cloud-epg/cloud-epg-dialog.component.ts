import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudEpg } from './cloud-epg.model';
import { CloudEpgPopupService } from './cloud-epg-popup.service';
import { CloudEpgService } from './cloud-epg.service';

@Component({
    selector: 'jhi-cloud-epg-dialog',
    templateUrl: './cloud-epg-dialog.component.html'
})
export class CloudEpgDialogComponent implements OnInit {

    cloudEpg: CloudEpg;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private cloudEpgService: CloudEpgService,
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
        if (this.cloudEpg.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cloudEpgService.update(this.cloudEpg));
        } else {
            this.subscribeToSaveResponse(
                this.cloudEpgService.create(this.cloudEpg));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CloudEpg>>) {
        result.subscribe((res: HttpResponse<CloudEpg>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CloudEpg) {
        this.eventManager.broadcast({ name: 'cloudEpgListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cloud-epg-popup',
    template: ''
})
export class CloudEpgPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudEpgPopupService: CloudEpgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cloudEpgPopupService
                    .open(CloudEpgDialogComponent as Component, params['id']);
            } else {
                this.cloudEpgPopupService
                    .open(CloudEpgDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
