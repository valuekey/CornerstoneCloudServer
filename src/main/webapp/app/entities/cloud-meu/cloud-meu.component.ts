import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CloudMeu } from './cloud-meu.model';
import { CloudMeuService } from './cloud-meu.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cloud-meu',
    templateUrl: './cloud-meu.component.html'
})
export class CloudMeuComponent implements OnInit, OnDestroy {
cloudMeus: CloudMeu[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cloudMeuService: CloudMeuService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cloudMeuService.query().subscribe(
            (res: HttpResponse<CloudMeu[]>) => {
                this.cloudMeus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCloudMeus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CloudMeu) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInCloudMeus() {
        this.eventSubscriber = this.eventManager.subscribe('cloudMeuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
