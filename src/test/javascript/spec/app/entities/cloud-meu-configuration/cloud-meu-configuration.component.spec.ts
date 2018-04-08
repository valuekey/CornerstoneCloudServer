/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CornerstoneCloudServerTestModule } from '../../../test.module';
import { CloudMeuConfigurationComponent } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.component';
import { CloudMeuConfigurationService } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.service';
import { CloudMeuConfiguration } from '../../../../../../main/webapp/app/entities/cloud-meu-configuration/cloud-meu-configuration.model';

describe('Component Tests', () => {

    describe('CloudMeuConfiguration Management Component', () => {
        let comp: CloudMeuConfigurationComponent;
        let fixture: ComponentFixture<CloudMeuConfigurationComponent>;
        let service: CloudMeuConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CornerstoneCloudServerTestModule],
                declarations: [CloudMeuConfigurationComponent],
                providers: [
                    CloudMeuConfigurationService
                ]
            })
            .overrideTemplate(CloudMeuConfigurationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CloudMeuConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CloudMeuConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CloudMeuConfiguration(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cloudMeuConfigurations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
