import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudMeuConfiguration } from './cloud-meu-configuration.model';
import { CloudMeuConfigurationService } from './cloud-meu-configuration.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cloud-meu-configuration',
    templateUrl: './cloud-meu-configuration.component.html'
})
export class CloudMeuConfigurationComponent implements OnInit, OnDestroy {
cloudMeuConfigurations: CloudMeuConfiguration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cloudMeuConfigurationService: CloudMeuConfigurationService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cloudMeuConfigurationService.query().subscribe(
            (res: HttpResponse<CloudMeuConfiguration[]>) => {
                this.cloudMeuConfigurations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCloudMeuConfigurations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CloudMeuConfiguration) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInCloudMeuConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('cloudMeuConfigurationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
