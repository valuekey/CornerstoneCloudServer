import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CloudMeu } from './cloud-meu.model';
import { CloudMeuService } from './cloud-meu.service';

@Injectable()
export class CloudMeuPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cloudMeuService: CloudMeuService

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
                this.cloudMeuService.find(id)
                    .subscribe((cloudMeuResponse: HttpResponse<CloudMeu>) => {
                        const cloudMeu: CloudMeu = cloudMeuResponse.body;
                        this.ngbModalRef = this.cloudMeuModalRef(component, cloudMeu);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cloudMeuModalRef(component, new CloudMeu());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cloudMeuModalRef(component: Component, cloudMeu: CloudMeu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cloudMeu = cloudMeu;
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
