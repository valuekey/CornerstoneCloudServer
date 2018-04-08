import { BaseEntity } from './../../shared';

export class CloudMeuConfiguration implements BaseEntity {
    constructor(
        public id?: number,
        public filename?: string,
        public content?: any,
        public cloudMeu?: BaseEntity,
    ) {
    }
}
