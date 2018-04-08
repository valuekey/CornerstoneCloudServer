import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CloudMeuConfiguration } from './cloud-meu-configuration.model';
import { CloudMeuConfigurationService } from './cloud-meu-configuration.service';

@Component({
    selector: 'jhi-cloud-meu-configuration-detail',
    templateUrl: './cloud-meu-configuration-detail.component.html'
})
export class CloudMeuConfigurationDetailComponent implements OnInit, OnDestroy {

    cloudMeuConfiguration: CloudMeuConfiguration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cloudMeuConfigurationService: CloudMeuConfigurationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCloudMeuConfigurations();
    }

    load(id) {
        this.cloudMeuConfigurationService.find(id)
            .subscribe((cloudMeuConfigurationResponse: HttpResponse<CloudMeuConfiguration>) => {
                this.cloudMeuConfiguration = cloudMeuConfigurationResponse.body;
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

    registerChangeInCloudMeuConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cloudMeuConfigurationListModification',
            (response) => this.load(this.cloudMeuConfiguration.id)
        );
    }
}
