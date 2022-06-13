export namespace JsonResponse {

  export interface Response {
    "fulfillmentText": string | undefined,
    "fulfillmentMessages": FulfillmentMessage[] | undefined,
    "source": string | undefined,
    "payload": Payload | undefined
  }

  export interface FulfillmentMessage {
    text: Text;
  }

  export interface Payload {
    google: Google;
  }

  export interface Google {
    expectUserResponse: boolean;
    richResponse: RichResponse;
  }

  export interface RichResponse {
    items: Item[];
  }

  export interface Item {
    simpleResponse: SimpleResponse;
  }

  export interface SimpleResponse {
    textToSpeech: string;
  }
}