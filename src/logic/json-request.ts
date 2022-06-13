namespace JsonRequest {
  
  export interface Request {
    responseId: string;
    session: string;
    queryResult: QueryResult;
  }

  export interface QueryResult {
    queryText: string;
    parameters: Parameters;
    allRequiredParamsPresent: boolean;
    fulfillmentText: string;
    fulfillmentMessages: FulfillmentMessage[];
    outputContexts: OutputContext[];
    intent: Intent;
    intentDetectionConfidence: number;

    languageCode: string;
  }

  export interface Text {
    text: string[];
  }

  export interface FulfillmentMessage {
    text: Text;
  }

  export interface Parameters {
    [key: string]: string;
  }

  export interface OutputContext {
    name: string;
    lifespanCount: number;
    parameters: Parameters;
  }

  export interface Intent {
    name: string;
    displayName: string;
  }

}