export enum Oas2RootNodeTypes {
  OAS2 = 'oas2',
  SECURITY_SCHEMES = 'oas2_security_schemes',
  PATHS = 'oas2_paths',
  TAGS = 'oas2_tags',
  SHARED = 'oas2_shared',
}

export enum Oas2ChildNodeTypes {
  SECURITY_SCHEME = 'oas2_security_scheme',
  PATH = 'oas2_path',
  TAG = 'oas2_tag',
}

type OasBaseParamType = 'header' | 'query' | 'path';

export type Oas2ParamType = OasBaseParamType | 'body';
export type Oas3ParamType = OasBaseParamType | 'cookie';

export enum Oas3RootNodeTypes {
  OAS3 = 'oas3',
  SHARED = 'oas3_shared',
  TAGS = 'oas3_tags',
  SERVERS = 'oas3_servers',
  INFO = 'oas3_info',
  OPERATION = 'operation',
  COMPONENTS = 'oas3_components',
  PATHS = 'oas3_paths',
}

export enum Oas3ChildNodeTypes {
  SECURITY_SCHEME = 'oas3_security_scheme',
  PATH = 'oas3_path',
  TAG = 'oas3_tag',
  SERVER = 'oas3_server',
}

export enum OasNodeChildType {
  OBJECT = 1,
  ARRAY,
}

export enum Oas2SharedNodeTypes {
  PARAMETERS = 'oas2_parameters',
  PARAMETER = 'oas2_parameter',
  RESPONSES = 'oas2_responses',
  RESPONSE = 'oas2_response',
  JSON_SCHEMA = 'json_schema',
  SCHEMAS = 'oas2_schemas',
  OPERATION = 'oas2_operation',
}

export enum Oas3SharedNodeTypes {
  SCHEMAS = 'oas3_schemas',
  RESPONSES = 'oas3_responses',
  RESPONSE = 'oas3_response',
  PARAMETERS = 'oas3_parameters',
  EXAMPLES = 'oas3_examples',
  REQUEST_BODIES = 'oas3_request_bodies',
  HEADERS = 'oas3_headers',
  SECURITY_SCHEMES = 'oas3_security_schemes',
  LINKS = 'oas3_links',
  CALLBACKS = 'oas3_callbacks',
  OPERATION = 'oas3_operation',
}
