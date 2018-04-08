import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CloudApp } from './cloud-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CloudApp>;

@Injectable()
export class CloudAppService {

    private resourceUrl =  SERVER_API_URL + 'api/cloud-apps';

    constructor(private http: HttpClient) { }

    create(cloudApp: CloudApp): Observable<EntityResponseType> {
        const copy = this.convert(cloudApp);
        return this.http.post<CloudApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cloudApp: CloudApp): Observable<EntityResponseType> {
        const copy = this.convert(cloudApp);
        return this.http.put<CloudApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CloudApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CloudApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<CloudApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CloudApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CloudApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CloudApp[]>): HttpResponse<CloudApp[]> {
        const jsonResponse: CloudApp[] = res.body;
        const body: CloudApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CloudApp.
     */
    private convertItemFromServer(cloudApp: CloudApp): CloudApp {
        const copy: CloudApp = Object.assign({}, cloudApp);
        return copy;
    }

    /**
     * Convert a CloudApp to a JSON which can be sent to the server.
     */
    private convert(cloudApp: CloudApp): CloudApp {
        const copy: CloudApp = Object.assign({}, cloudApp);
        return copy;
    }
}
