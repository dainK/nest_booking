import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../types/userRole.type';
import { Booking } from 'src/booking/entities/booking.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
  
  @Column({ type: 'varchar', select: true, nullable: false })
  nickname: string;
  
  @Column({ type: 'int', unsigned: true, select: true, default: 1000000 })
  point: number;
  
  @OneToMany(() => Booking, (booking) => booking.user) // Booking 엔터티와의 관계 설정
  bookings: Booking[];
}