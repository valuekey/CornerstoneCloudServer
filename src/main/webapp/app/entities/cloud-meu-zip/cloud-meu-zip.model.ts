import { BaseEntity } from './../../shared';

export class CloudMeuZip implements BaseEntity {
    constructor(
        public id?: number,
        public fileName?: string,
        public zipFileContentType?: string,
        public zipFile?: any,
        public cloudMeu?: BaseEntity,
    ) {
    }
}
