import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Show]),
  ],
  controllers: [ShowController],
  providers: [ShowService,JwtAuthGuard,AdminGuard],
  exports: [ShowService], 
})
export class ShowModule {}
