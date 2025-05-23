import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generatePdf(text: string): Promise<Buffer> {
    return new Promise((res, reject) => {
      const doc = new PDFDocument();
      const stream = new PassThrough();
      const chunks: Uint8Array[] = [];

      doc.pipe(stream);
      doc.text(text);
      doc.end();

      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => res(Buffer.concat(chunks)));
      stream.on('erorr', err => reject(err));
    })
  }
}


