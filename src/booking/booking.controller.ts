import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ShowService } from 'src/show/show.service';
import { UserService } from 'src/user/user.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly showService: ShowService,
    private readonly userServiec: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const show = await this.showService.findOne(createBookingDto.showId);
    if (!show) {
      throw new Error(`공연 정보가 없습니다.`);
    }
    await this.bookingService.create(
      show.id,
      req.user.id,
      createBookingDto.count,
    );

    return await this.userServiec.buy(
      req.user.id,
      show.price * createBookingDto.count,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async findAll(@Req() req) {
    return await this.bookingService.findAll(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    const booking = await this.bookingService.findOne(+id);
    if (!booking) {
      throw new Error(`예매 정보가 없습니다.`);
    }
    if (booking.id !== req.user.id) {
      throw new Error(`권한이 없습니다.`);
    }
    return booking;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto, @Req() req) {
  //   return this.bookingService.update(+id, updateBookingDto, req.user.id);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    const booking = await this.bookingService.findOne(+id);
    if (!booking) {
      throw new Error(`예매 정보가 없습니다.`);
    }
    if (booking.userId !== req.user.id) {
      throw new Error(`권한이 없습니다.`);
    }

    await this.bookingService.remove(+id);
    
    return await this.userServiec.refund(
      req.user.id,
      booking.price,
    );
  }
}
