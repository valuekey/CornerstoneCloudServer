/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuConfigurationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration-delete-dialog.component';
import { CloudMeuConfigurationService } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.service';

describe('Component Tests', () => {

    describe('CloudMeuConfiguration Management Delete Component', () => {
        let comp: CloudMeuConfigurationDeleteDialogComponent;
        let fixture: ComponentFixture<CloudMeuConfigurationDeleteDialogComponent>;
        let service: CloudMeuConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuConfigurationDeleteDialogComponent],
                providers: [
                    CloudMeuConfigurationService
                ]
            })
            .overrideTemplate(CloudMeuConfigurationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuConfigurationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuConfigurationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
