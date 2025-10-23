declare module 'mammoth' {
  export interface ConvertToHtmlOptions {
    path?: string;
    buffer?: Buffer;
    arrayBuffer?: ArrayBuffer;
  }

  export interface ConvertToHtmlResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export function convertToHtml(
    options: ConvertToHtmlOptions
  ): Promise<ConvertToHtmlResult>;

  export function extractRawText(
    options: ConvertToHtmlOptions
  ): Promise<ConvertToHtmlResult>;
}
