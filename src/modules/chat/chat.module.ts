import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([Chat])],
})
export class ChatModule {}
