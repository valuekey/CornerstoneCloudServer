/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudAppComponent } from '../../../../../../main/webapp/app/entities/cloud-app/cloud-app.component';
import { CloudAppService } from '../../../../../../main/webapp/app/entities/cloud-app/cloud-app.service';
import { CloudApp } from '../../../../../../main/webapp/app/entities/cloud-app/cloud-app.model';

describe('Component Tests', () => {

    describe('CloudApp Management Component', () => {
        let comp: CloudAppComponent;
        let fixture: ComponentFixture<CloudAppComponent>;
        let service: CloudAppService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudAppComponent],
                providers: [
                    CloudAppService
                ]
            })
            .overrideTemplate(CloudAppComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudAppComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudAppService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CloudApp(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cloudApps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
