import { Show } from "src/show/entities/show.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'booking',
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: 'integer', select: true, nullable: false })
  count: number;
  
  @ManyToOne(() => User, { eager: true }) // User 엔터티와의 관계 설정
  @JoinColumn({ name: 'user_id' }) // 외부키로 사용할 열의 이름
  user: User;
  
  @ManyToOne(() => Show, { eager: true }) // Show 엔터티와의 관계 설정
  @JoinColumn({ name: 'show_id' }) // 외부키로 사용할 열의 이름
  show: Show;
}
