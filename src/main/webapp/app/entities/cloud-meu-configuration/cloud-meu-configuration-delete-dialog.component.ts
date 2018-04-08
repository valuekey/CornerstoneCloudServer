import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CloudMeuConfiguration } from './cloud-meu-configuration.model';
import { CloudMeuConfigurationPopupService } from './cloud-meu-configuration-popup.service';
import { CloudMeuConfigurationService } from './cloud-meu-configuration.service';

@Component({
    selector: 'jhi-cloud-meu-configuration-delete-dialog',
    templateUrl: './cloud-meu-configuration-delete-dialog.component.html'
})
export class CloudMeuConfigurationDeleteDialogComponent {

    cloudMeuConfiguration: CloudMeuConfiguration;

    constructor(
        private cloudMeuConfigurationService: CloudMeuConfigurationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cloudMeuConfigurationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cloudMeuConfigurationListModification',
                content: 'Deleted an cloudMeuConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cloud-meu-configuration-delete-popup',
    template: ''
})
export class CloudMeuConfigurationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cloudMeuConfigurationPopupService: CloudMeuConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cloudMeuConfigurationPopupService
                .open(CloudMeuConfigurationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
