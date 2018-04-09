/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuZipDetailComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip-detail.component';
import { CloudMeuZipService } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.service';
import { CloudMeuZip } from '../../../../../../main/webapp/app/entities/cloud-meu-zip/cloud-meu-zip.model';

describe('Component Tests', () => {

    describe('CloudMeuZip Management Detail Component', () => {
        let comp: CloudMeuZipDetailComponent;
        let fixture: ComponentFixture<CloudMeuZipDetailComponent>;
        let service: CloudMeuZipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuZipDetailComponent],
                providers: [
                    CloudMeuZipService
                ]
            })
            .overrideTemplate(CloudMeuZipDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuZipDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuZipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CloudMeuZip(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cloudMeuZip).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
