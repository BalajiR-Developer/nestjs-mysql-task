import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const buffer = file.buffer;
    return await this.chat.importExcel(buffer);
  }

  @Get()
  getByStatus(@Query('status') status: string) {
    return this.chat.getByStatus(status);
  }
}
