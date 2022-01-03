import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/image')
  @UseInterceptors(FileInterceptor('file'))
  checkImage(@UploadedFile() file: Express.Multer.File) {
    return this.appService.proccessImage(file);
  }
}
