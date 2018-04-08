import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CloudMeuConfiguration } from './cloud-meu-configuration.model';
import { CloudMeuConfigurationService } from './cloud-meu-configuration.service';

@Injectable()
export class CloudMeuConfigurationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cloudMeuConfigurationService: CloudMeuConfigurationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cloudMeuConfigurationService.find(id)
                    .subscribe((cloudMeuConfigurationResponse: HttpResponse<CloudMeuConfiguration>) => {
                        const cloudMeuConfiguration: CloudMeuConfiguration = cloudMeuConfigurationResponse.body;
                        this.ngbModalRef = this.cloudMeuConfigurationModalRef(component, cloudMeuConfiguration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cloudMeuConfigurationModalRef(component, new CloudMeuConfiguration());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cloudMeuConfigurationModalRef(component: Component, cloudMeuConfiguration: CloudMeuConfiguration): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cloudMeuConfiguration = cloudMeuConfiguration;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
