import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudApp } from './cloud-app.model';
import { CloudAppService } from './cloud-app.service';

@Component({
    selector: 'jhi-cloud-app-detail',
    templateUrl: './cloud-app-detail.component.html'
})
export class CloudAppDetailComponent implements OnInit, OnDestroy {

    cloudApp: CloudApp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cloudAppService: CloudAppService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCloudApps();
    }

    load(id) {
        this.cloudAppService.find(id)
            .subscribe((cloudAppResponse: HttpResponse<CloudApp>) => {
                this.cloudApp = cloudAppResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCloudApps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cloudAppListModification',
            (response) => this.load(this.cloudApp.id)
        );
    }
}
