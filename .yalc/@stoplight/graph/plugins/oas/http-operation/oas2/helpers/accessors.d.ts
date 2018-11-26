import { Operation, Security, Spec } from 'swagger-schema-official';
export declare function getSecurities(operation: Partial<Operation>, spec: Partial<Spec>): Security[];
export declare function getProduces(operation: Partial<Operation>, spec: Partial<Spec>): string[];
export declare function getConsumes(operation: Partial<Operation>, spec: Partial<Spec>): string[];
