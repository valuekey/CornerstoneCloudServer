import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudMeuZip } from './cloud-meu-zip.model';
import { CloudMeuZipService } from './cloud-meu-zip.service';

@Component({
    selector: 'jhi-cloud-meu-zip-detail',
    templateUrl: './cloud-meu-zip-detail.component.html'
})
export class CloudMeuZipDetailComponent implements OnInit, OnDestroy {

    cloudMeuZip: CloudMeuZip;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cloudMeuZipService: CloudMeuZipService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCloudMeuZips();
    }

    load(id) {
        this.cloudMeuZipService.find(id)
            .subscribe((cloudMeuZipResponse: HttpResponse<CloudMeuZip>) => {
                this.cloudMeuZip = cloudMeuZipResponse.body;
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

    registerChangeInCloudMeuZips() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cloudMeuZipListModification',
            (response) => this.load(this.cloudMeuZip.id)
        );
    }
}
