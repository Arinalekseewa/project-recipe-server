import { type NodeType } from './index.js';
export declare const Oas2Types: {
    readonly Root: NodeType;
    readonly Tag: NodeType;
    readonly TagList: {
        name: string;
        properties: {};
        items: string;
    };
    readonly TagGroups: {
        name: string;
        properties: {};
        items: string;
    };
    readonly TagGroup: NodeType;
    readonly ExternalDocs: NodeType;
    readonly Example: NodeType;
    readonly ExamplesMap: {
        name: string;
        properties: {};
        additionalProperties: () => string;
    };
    readonly EnumDescriptions: NodeType;
    readonly SecurityRequirement: NodeType;
    readonly SecurityRequirementList: {
        name: string;
        properties: {};
        items: string;
    };
    readonly Info: NodeType;
    readonly Contact: NodeType;
    readonly License: NodeType;
    readonly Logo: NodeType;
    readonly Paths: NodeType;
    readonly PathItem: NodeType;
    readonly Parameter: NodeType;
    readonly ParameterItems: NodeType;
    readonly ParameterList: {
        name: string;
        properties: {};
        items: string;
    };
    readonly Operation: NodeType;
    readonly Examples: NodeType;
    readonly Header: NodeType;
    readonly Responses: NodeType;
    readonly Response: NodeType;
    readonly Schema: NodeType;
    readonly Xml: NodeType;
    readonly SchemaProperties: NodeType;
    readonly NamedSchemas: {
        name: string;
        properties: {};
        additionalProperties: () => string;
    };
    readonly NamedResponses: {
        name: string;
        properties: {};
        additionalProperties: () => string;
    };
    readonly NamedParameters: {
        name: string;
        properties: {};
        additionalProperties: () => string;
    };
    readonly NamedSecuritySchemes: {
        name: string;
        properties: {};
        additionalProperties: () => string;
    };
    readonly SecurityScheme: NodeType;
    readonly XCodeSample: NodeType;
    readonly XCodeSampleList: {
        name: string;
        properties: {};
        items: string;
    };
    readonly XServerList: {
        name: string;
        properties: {};
        items: string;
    };
    readonly XServer: NodeType;
};
//# sourceMappingURL=oas2.d.ts.map