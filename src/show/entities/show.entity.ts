import { Booking } from "src/booking/entities/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', select: true, nullable: false })
  title: string;

  @Column({type: 'date', select: true, nullable: false })
  date: Date;
    
  @Column({type: 'integer', select: true, nullable: false })
  price: number;
    
  @OneToMany(() => Booking, (booking) => booking.show) // Booking 엔터티와의 관계 설정
  bookings: Booking[];
}
