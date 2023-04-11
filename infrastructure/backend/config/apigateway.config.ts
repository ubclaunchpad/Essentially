import { API_GATEWAY_METHOD, COMPONENTS } from "./constants";

export interface ApiGatewayMethodConfig {
  componentName: string,
  methodType: string,
  requestTemplates: {[contentType: string]: string},
}

export const REQUEST_TEMPLATES = { "application/json": '{ "statusCode": "200" }' };

const BackendStatusAPI: ApiGatewayMethodConfig = {
  componentName: COMPONENTS.status,
  methodType: API_GATEWAY_METHOD.GET,
  requestTemplates: REQUEST_TEMPLATES,
}

const SummaryAPI: ApiGatewayMethodConfig = {
  componentName: COMPONENTS.summary,
  methodType: API_GATEWAY_METHOD.POST,
  requestTemplates: REQUEST_TEMPLATES,
}

const KeywordAPI: ApiGatewayMethodConfig = {
  componentName: COMPONENTS.keyword,
  methodType: API_GATEWAY_METHOD.POST,
  requestTemplates: REQUEST_TEMPLATES,
}

const SummaryRequestAPI: ApiGatewayMethodConfig = {
  componentName: COMPONENTS.summaryRequest,
  methodType: API_GATEWAY_METHOD.POST,
  requestTemplates: REQUEST_TEMPLATES,
}

export const TO_DEPLOY_APIS: ApiGatewayMethodConfig[] = [BackendStatusAPI, SummaryAPI, KeywordAPI, SummaryRequestAPI];
