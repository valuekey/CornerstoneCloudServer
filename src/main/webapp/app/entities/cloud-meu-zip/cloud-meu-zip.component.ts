import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudMeuZip } from './cloud-meu-zip.model';
import { CloudMeuZipService } from './cloud-meu-zip.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cloud-meu-zip',
    templateUrl: './cloud-meu-zip.component.html'
})
export class CloudMeuZipComponent implements OnInit, OnDestroy {
cloudMeuZips: CloudMeuZip[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cloudMeuZipService: CloudMeuZipService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cloudMeuZipService.query().subscribe(
            (res: HttpResponse<CloudMeuZip[]>) => {
                this.cloudMeuZips = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCloudMeuZips();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CloudMeuZip) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInCloudMeuZips() {
        this.eventSubscriber = this.eventManager.subscribe('cloudMeuZipListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
