import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudEpg } from './cloud-epg.model';
import { CloudEpgService } from './cloud-epg.service';

@Component({
    selector: 'jhi-cloud-epg-detail',
    templateUrl: './cloud-epg-detail.component.html'
})
export class CloudEpgDetailComponent implements OnInit, OnDestroy {

    cloudEpg: CloudEpg;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cloudEpgService: CloudEpgService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCloudEpgs();
    }

    load(id) {
        this.cloudEpgService.find(id)
            .subscribe((cloudEpgResponse: HttpResponse<CloudEpg>) => {
                this.cloudEpg = cloudEpgResponse.body;
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

    registerChangeInCloudEpgs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cloudEpgListModification',
            (response) => this.load(this.cloudEpg.id)
        );
    }
}
