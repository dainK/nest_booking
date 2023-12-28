import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isAfter } from 'date-fns';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>
  ) {}

  async create(showId:number, userId : number, count : number) {
    const existingBooking = await this.bookingRepository.findOne({where : {
        user: { id : userId },
        show: { id : showId}
        }
      });
    if (existingBooking) {
      throw new ConflictException(
        '이미 예매했습니다.',
      );
    }
    return await this.bookingRepository.save({
      user: { id: userId }, 
      show: { id: showId }, 
      count
    });
  }

  async findAll(userId: number) {
    const bookings = await this.bookingRepository.find({where : {
      user: { id : userId },
      },
      relations: ['show'], 
    });
    return bookings.map(e => ({
      id : e.id,
      title: e.show.title,
      date: e.show.date,
      price: e.count * e.show.price,
    }));
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({ 
      where: { id },
      relations: ['show','user']  
    });
    return {
      id : booking.id,
      title: booking.show.title,
      date: booking.show.date,
      price: booking.count * booking.show.price,
      userId: booking.user.id
    }
    // return `This action returns a #${id} booking`;
  }

  // update(id: number, updateBookingDto: UpdateBookingDto, userId: number) {
  //   return `This action updates a #${id} booking`;
  // }

  async remove(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['show'],
    });

    if(!booking) {
      return `예매 정보가 없습니다.`;
    }
  
    if (!isAfter(booking.show.date, new Date())) {
      return `취소 날짜가 지났습니다. `;
    } 
    await this.bookingRepository.remove(booking);
    return `This action removes a #${id} booking`;
  }
  
}
