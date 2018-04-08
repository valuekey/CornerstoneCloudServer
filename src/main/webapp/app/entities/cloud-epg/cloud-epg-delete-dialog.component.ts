import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CloudEpg } from './cloud-epg.model';
import { CloudEpgPopupService } from './cloud-epg-popup.service';
import { CloudEpgService } from './cloud-epg.service';

@Component({
    selector: 'jhi-cloud-epg-delete-dialog',
    templateUrl: './cloud-epg-delete-dialog.component.html'
})
export class CloudEpgDeleteDialogComponent {

    cloudEpg: CloudEpg;

    constructor(
        private cloudEpgService: CloudEpgService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cloudEpgService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cloudEpgListModification',
                content: 'Deleted an cloudEpg'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cloud-epg-delete-popup',
    template: ''
})
export class CloudEpgDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudEpgPopupService: CloudEpgPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cloudEpgPopupService
                .open(CloudEpgDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
