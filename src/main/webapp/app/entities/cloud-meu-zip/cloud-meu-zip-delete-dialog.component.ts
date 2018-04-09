import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CloudMeuZip } from './cloud-meu-zip.model';
import { CloudMeuZipPopupService } from './cloud-meu-zip-popup.service';
import { CloudMeuZipService } from './cloud-meu-zip.service';

@Component({
    selector: 'jhi-cloud-meu-zip-delete-dialog',
    templateUrl: './cloud-meu-zip-delete-dialog.component.html'
})
export class CloudMeuZipDeleteDialogComponent {

    cloudMeuZip: CloudMeuZip;

    constructor(
        private cloudMeuZipService: CloudMeuZipService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cloudMeuZipService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cloudMeuZipListModification',
                content: 'Deleted an cloudMeuZip'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cloud-meu-zip-delete-popup',
    template: ''
})
export class CloudMeuZipDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudMeuZipPopupService: CloudMeuZipPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cloudMeuZipPopupService
                .open(CloudMeuZipDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
