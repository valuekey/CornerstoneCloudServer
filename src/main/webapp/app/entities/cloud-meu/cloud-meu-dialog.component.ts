import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudMeu } from './cloud-meu.model';
import { CloudMeuPopupService } from './cloud-meu-popup.service';
import { CloudMeuService } from './cloud-meu.service';

@Component({
    selector: 'jhi-cloud-meu-dialog',
    templateUrl: './cloud-meu-dialog.component.html'
})
export class CloudMeuDialogComponent implements OnInit {

    cloudMeu: CloudMeu;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private cloudMeuService: CloudMeuService,
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
        if (this.cloudMeu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cloudMeuService.update(this.cloudMeu));
        } else {
            this.subscribeToSaveResponse(
                this.cloudMeuService.create(this.cloudMeu));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CloudMeu>>) {
        result.subscribe((res: HttpResponse<CloudMeu>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CloudMeu) {
        this.eventManager.broadcast({ name: 'cloudMeuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cloud-meu-popup',
    template: ''
})
export class CloudMeuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudMeuPopupService: CloudMeuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cloudMeuPopupService
                    .open(CloudMeuDialogComponent as Component, params['id']);
            } else {
                this.cloudMeuPopupService
                    .open(CloudMeuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
