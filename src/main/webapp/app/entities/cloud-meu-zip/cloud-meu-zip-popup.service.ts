import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CloudMeuZip } from './cloud-meu-zip.model';
import { CloudMeuZipService } from './cloud-meu-zip.service';

@Injectable()
export class CloudMeuZipPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cloudMeuZipService: CloudMeuZipService

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
                this.cloudMeuZipService.find(id)
                    .subscribe((cloudMeuZipResponse: HttpResponse<CloudMeuZip>) => {
                        const cloudMeuZip: CloudMeuZip = cloudMeuZipResponse.body;
                        this.ngbModalRef = this.cloudMeuZipModalRef(component, cloudMeuZip);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cloudMeuZipModalRef(component, new CloudMeuZip());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cloudMeuZipModalRef(component: Component, cloudMeuZip: CloudMeuZip): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cloudMeuZip = cloudMeuZip;
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
