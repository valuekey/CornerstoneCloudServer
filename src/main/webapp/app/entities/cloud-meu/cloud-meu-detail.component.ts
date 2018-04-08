import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudMeu } from './cloud-meu.model';
import { CloudMeuService } from './cloud-meu.service';

@Component({
    selector: 'jhi-cloud-meu-detail',
    templateUrl: './cloud-meu-detail.component.html'
})
export class CloudMeuDetailComponent implements OnInit, OnDestroy {

    cloudMeu: CloudMeu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cloudMeuService: CloudMeuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCloudMeus();
    }

    load(id) {
        this.cloudMeuService.find(id)
            .subscribe((cloudMeuResponse: HttpResponse<CloudMeu>) => {
                this.cloudMeu = cloudMeuResponse.body;
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

    registerChangeInCloudMeus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cloudMeuListModification',
            (response) => this.load(this.cloudMeu.id)
        );
    }
}
