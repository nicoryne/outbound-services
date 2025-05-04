import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('generate-pdf')
  async generatePdf(@Body('text') text: string, @Res() res: Response) {
    const pdfBuffer = await this.apiService.generatePdf(text);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
  

}
