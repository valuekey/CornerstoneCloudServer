import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CloudApp } from './cloud-app.model';
import { CloudAppPopupService } from './cloud-app-popup.service';
import { CloudAppService } from './cloud-app.service';

@Component({
    selector: 'jhi-cloud-app-delete-dialog',
    templateUrl: './cloud-app-delete-dialog.component.html'
})
export class CloudAppDeleteDialogComponent {

    cloudApp: CloudApp;

    constructor(
        private cloudAppService: CloudAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cloudAppService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cloudAppListModification',
                content: 'Deleted an cloudApp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cloud-app-delete-popup',
    template: ''
})
export class CloudAppDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudAppPopupService: CloudAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cloudAppPopupService
                .open(CloudAppDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
