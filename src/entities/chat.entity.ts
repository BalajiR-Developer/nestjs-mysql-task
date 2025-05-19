import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  status: string; // e.g. pending, completed

  @Column({ type: 'datetime' })
  createdAt: Date;
}
