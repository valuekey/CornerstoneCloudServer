import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CloudMeuZip } from './cloud-meu-zip.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CloudMeuZip>;

@Injectable()
export class CloudMeuZipService {

    private resourceUrl =  SERVER_API_URL + 'api/cloud-meu-zips';

    constructor(private http: HttpClient) { }

    create(cloudMeuZip: CloudMeuZip): Observable<EntityResponseType> {
        const copy = this.convert(cloudMeuZip);
        return this.http.post<CloudMeuZip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cloudMeuZip: CloudMeuZip): Observable<EntityResponseType> {
        const copy = this.convert(cloudMeuZip);
        return this.http.put<CloudMeuZip>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CloudMeuZip>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CloudMeuZip[]>> {
        const options = createRequestOption(req);
        return this.http.get<CloudMeuZip[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CloudMeuZip[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CloudMeuZip = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CloudMeuZip[]>): HttpResponse<CloudMeuZip[]> {
        const jsonResponse: CloudMeuZip[] = res.body;
        const body: CloudMeuZip[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CloudMeuZip.
     */
    private convertItemFromServer(cloudMeuZip: CloudMeuZip): CloudMeuZip {
        const copy: CloudMeuZip = Object.assign({}, cloudMeuZip);
        return copy;
    }

    /**
     * Convert a CloudMeuZip to a JSON which can be sent to the server.
     */
    private convert(cloudMeuZip: CloudMeuZip): CloudMeuZip {
        const copy: CloudMeuZip = Object.assign({}, cloudMeuZip);
        return copy;
    }
}
