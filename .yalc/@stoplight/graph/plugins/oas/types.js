"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Oas2RootNodeTypes;
(function (Oas2RootNodeTypes) {
    Oas2RootNodeTypes["OAS2"] = "oas2";
    Oas2RootNodeTypes["SECURITY_SCHEMES"] = "oas2_security_schemes";
    Oas2RootNodeTypes["PATHS"] = "oas2_paths";
    Oas2RootNodeTypes["TAGS"] = "oas2_tags";
    Oas2RootNodeTypes["SHARED"] = "oas2_shared";
})(Oas2RootNodeTypes = exports.Oas2RootNodeTypes || (exports.Oas2RootNodeTypes = {}));
var Oas2ChildNodeTypes;
(function (Oas2ChildNodeTypes) {
    Oas2ChildNodeTypes["SECURITY_SCHEME"] = "oas2_security_scheme";
    Oas2ChildNodeTypes["PATH"] = "oas2_path";
    Oas2ChildNodeTypes["TAG"] = "oas2_tag";
})(Oas2ChildNodeTypes = exports.Oas2ChildNodeTypes || (exports.Oas2ChildNodeTypes = {}));
var Oas3RootNodeTypes;
(function (Oas3RootNodeTypes) {
    Oas3RootNodeTypes["OAS3"] = "oas3";
    Oas3RootNodeTypes["SHARED"] = "oas3_shared";
    Oas3RootNodeTypes["TAGS"] = "oas3_tags";
    Oas3RootNodeTypes["SERVERS"] = "oas3_servers";
    Oas3RootNodeTypes["INFO"] = "oas3_info";
    Oas3RootNodeTypes["OPERATION"] = "operation";
    Oas3RootNodeTypes["COMPONENTS"] = "oas3_components";
    Oas3RootNodeTypes["PATHS"] = "oas3_paths";
})(Oas3RootNodeTypes = exports.Oas3RootNodeTypes || (exports.Oas3RootNodeTypes = {}));
var Oas3ChildNodeTypes;
(function (Oas3ChildNodeTypes) {
    Oas3ChildNodeTypes["SECURITY_SCHEME"] = "oas3_security_scheme";
    Oas3ChildNodeTypes["PATH"] = "oas3_path";
    Oas3ChildNodeTypes["TAG"] = "oas3_tag";
    Oas3ChildNodeTypes["SERVER"] = "oas3_server";
})(Oas3ChildNodeTypes = exports.Oas3ChildNodeTypes || (exports.Oas3ChildNodeTypes = {}));
var OasNodeChildType;
(function (OasNodeChildType) {
    OasNodeChildType[OasNodeChildType["OBJECT"] = 1] = "OBJECT";
    OasNodeChildType[OasNodeChildType["ARRAY"] = 2] = "ARRAY";
})(OasNodeChildType = exports.OasNodeChildType || (exports.OasNodeChildType = {}));
var Oas2SharedNodeTypes;
(function (Oas2SharedNodeTypes) {
    Oas2SharedNodeTypes["PARAMETERS"] = "oas2_parameters";
    Oas2SharedNodeTypes["PARAMETER"] = "oas2_parameter";
    Oas2SharedNodeTypes["RESPONSES"] = "oas2_responses";
    Oas2SharedNodeTypes["RESPONSE"] = "oas2_response";
    Oas2SharedNodeTypes["JSON_SCHEMA"] = "json_schema";
    Oas2SharedNodeTypes["SCHEMAS"] = "oas2_schemas";
    Oas2SharedNodeTypes["OPERATION"] = "oas2_operation";
})(Oas2SharedNodeTypes = exports.Oas2SharedNodeTypes || (exports.Oas2SharedNodeTypes = {}));
var Oas3SharedNodeTypes;
(function (Oas3SharedNodeTypes) {
    Oas3SharedNodeTypes["SCHEMAS"] = "oas3_schemas";
    Oas3SharedNodeTypes["RESPONSES"] = "oas3_responses";
    Oas3SharedNodeTypes["RESPONSE"] = "oas3_response";
    Oas3SharedNodeTypes["PARAMETERS"] = "oas3_parameters";
    Oas3SharedNodeTypes["EXAMPLES"] = "oas3_examples";
    Oas3SharedNodeTypes["REQUEST_BODIES"] = "oas3_request_bodies";
    Oas3SharedNodeTypes["HEADERS"] = "oas3_headers";
    Oas3SharedNodeTypes["SECURITY_SCHEMES"] = "oas3_security_schemes";
    Oas3SharedNodeTypes["LINKS"] = "oas3_links";
    Oas3SharedNodeTypes["CALLBACKS"] = "oas3_callbacks";
    Oas3SharedNodeTypes["OPERATION"] = "oas3_operation";
})(Oas3SharedNodeTypes = exports.Oas3SharedNodeTypes || (exports.Oas3SharedNodeTypes = {}));
//# sourceMappingURL=types.js.map