import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { ShowModule } from 'src/show/show.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    ShowModule,
    UserModule
  ],
  controllers: [BookingController],
  providers: [BookingService,JwtAuthGuard],
})
export class BookingModule {}
