import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudEpg } from './cloud-epg.model';
import { CloudEpgService } from './cloud-epg.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cloud-epg',
    templateUrl: './cloud-epg.component.html'
})
export class CloudEpgComponent implements OnInit, OnDestroy {
cloudEpgs: CloudEpg[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cloudEpgService: CloudEpgService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cloudEpgService.query().subscribe(
            (res: HttpResponse<CloudEpg[]>) => {
                this.cloudEpgs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCloudEpgs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CloudEpg) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInCloudEpgs() {
        this.eventSubscriber = this.eventManager.subscribe('cloudEpgListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
