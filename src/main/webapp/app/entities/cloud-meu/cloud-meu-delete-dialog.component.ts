import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CloudMeu } from './cloud-meu.model';
import { CloudMeuPopupService } from './cloud-meu-popup.service';
import { CloudMeuService } from './cloud-meu.service';

@Component({
    selector: 'jhi-cloud-meu-delete-dialog',
    templateUrl: './cloud-meu-delete-dialog.component.html'
})
export class CloudMeuDeleteDialogComponent {

    cloudMeu: CloudMeu;

    constructor(
        private cloudMeuService: CloudMeuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cloudMeuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cloudMeuListModification',
                content: 'Deleted an cloudMeu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cloud-meu-delete-popup',
    template: ''
})
export class CloudMeuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudMeuPopupService: CloudMeuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cloudMeuPopupService
                .open(CloudMeuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
