import * as path from "path";

export const APP_NAME = {
  PREFIX: "Essentially-Summary-BE-",
};

export const COMPONENTS = {
  status: "status",
  summary: "summary",
};

export const RESOURCE_ID = "ID";

export const LAMBDA_NAMES = {
  function: "function",
};

export const API_GATEWAY_METHOD = {
  GET: "GET",
  POST: "POST",
};

export const SUMMARY_BE_LAMBDA_HANDLERS = {
  summary: "get_summary",
  status: "get_status",
};

export const SUMMARY_BE_BASE_DIR = "/../../../summary_be/lambda_handlers";

const LAYERS_BASE_DIR = path.join(
  __dirname,
  "../../../summary_be/lambda_layers"
);

export const LayersDir: Record<string, string> = {
  summaryLayer: path.join(LAYERS_BASE_DIR, "nltk_summarization_layer"),
};
