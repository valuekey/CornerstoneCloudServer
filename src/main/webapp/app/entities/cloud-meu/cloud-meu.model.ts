import { BaseEntity } from './../../shared';

export class CloudMeu implements BaseEntity {
    constructor(
        public id?: number,
        public groupId?: string,
        public name?: string,
        public version?: string,
        public type?: string,
        public meuDefinition?: any,
        public fileId?: string,
        public configurations?: BaseEntity[],
    ) {
    }
}
