import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudApp } from './cloud-app.model';
import { CloudAppService } from './cloud-app.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cloud-app',
    templateUrl: './cloud-app.component.html'
})
export class CloudAppComponent implements OnInit, OnDestroy {
cloudApps: CloudApp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cloudAppService: CloudAppService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cloudAppService.query().subscribe(
            (res: HttpResponse<CloudApp[]>) => {
                this.cloudApps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCloudApps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CloudApp) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInCloudApps() {
        this.eventSubscriber = this.eventManager.subscribe('cloudAppListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
