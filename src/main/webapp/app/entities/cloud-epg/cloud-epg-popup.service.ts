import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CloudEpg } from './cloud-epg.model';
import { CloudEpgService } from './cloud-epg.service';

@Injectable()
export class CloudEpgPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cloudEpgService: CloudEpgService

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
                this.cloudEpgService.find(id)
                    .subscribe((cloudEpgResponse: HttpResponse<CloudEpg>) => {
                        const cloudEpg: CloudEpg = cloudEpgResponse.body;
                        this.ngbModalRef = this.cloudEpgModalRef(component, cloudEpg);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cloudEpgModalRef(component, new CloudEpg());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cloudEpgModalRef(component: Component, cloudEpg: CloudEpg): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cloudEpg = cloudEpg;
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
