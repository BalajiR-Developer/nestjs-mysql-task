import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Repository } from 'typeorm';
import * as ExcelJs from 'exceljs';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
  ) {}

  importExcel = async (buffer: Buffer) => {
    try {
      const wb = new ExcelJs.Workbook();
      await wb.xlsx.load(buffer);
      const ws = wb.worksheets[0];
      const chats = [];

      ws.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        const [message, status, dateStr] = [
          row.getCell(1).value,
          row.getCell(2).value,
          row.getCell(3).value,
        ];
        chats.push(
          this.chatRepo.create({
            message: String(message),
            status: String(status),
            createdAt: new Date(String(dateStr)),
          }),
        );
      });
      await this.chatRepo.save(chats);
    } catch (error) {
      console.log(error);
      throw new Error('Error while importing excel');
    }
  };

  getByStatus = async (status: string) => {
    try {
      if (status === 'all') {
        // return await this.chatRepo.find();
        return await this.chatRepo.query('SELECT * FROM Chat');
      } else {
        // return await this.chatRepo.findOne({where:{status}});
        return await this.chatRepo.query(
          `SELECT * FROM Chat WHERE status ='${status}' `,
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error while getting chats');
    }
  };
}
