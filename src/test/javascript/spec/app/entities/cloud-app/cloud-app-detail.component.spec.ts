/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudAppDetailComponent } from '../../../../../../main/webapp/app/entities/cloud-app/cloud-app-detail.component';
import { CloudAppService } from '../../../../../../main/webapp/app/entities/cloud-app/cloud-app.service';
import { CloudApp } from '../../../../../../main/webapp/app/entities/cloud-app/cloud-app.model';

describe('Component Tests', () => {

    describe('CloudApp Management Detail Component', () => {
        let comp: CloudAppDetailComponent;
        let fixture: ComponentFixture<CloudAppDetailComponent>;
        let service: CloudAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudAppDetailComponent],
                providers: [
                    CloudAppService
                ]
            })
            .overrideTemplate(CloudAppDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudAppDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CloudApp(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cloudApp).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
