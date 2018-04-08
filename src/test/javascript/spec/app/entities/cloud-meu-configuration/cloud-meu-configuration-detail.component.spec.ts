/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuConfigurationDetailComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration-detail.component';
import { CloudMeuConfigurationService } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.service';
import { CloudMeuConfiguration } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.model';

describe('Component Tests', () => {

    describe('CloudMeuConfiguration Management Detail Component', () => {
        let comp: CloudMeuConfigurationDetailComponent;
        let fixture: ComponentFixture<CloudMeuConfigurationDetailComponent>;
        let service: CloudMeuConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuConfigurationDetailComponent],
                providers: [
                    CloudMeuConfigurationService
                ]
            })
            .overrideTemplate(CloudMeuConfigurationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuConfigurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CloudMeuConfiguration(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cloudMeuConfiguration).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
