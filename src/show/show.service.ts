import { Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>
  ) {}


  async create(createShowDto: CreateShowDto) {
    await this.showRepository.save({
      title : createShowDto.title,
      date : createShowDto.date,
      price : createShowDto.price
    });
    return 'This action adds a new show';
  }

  async findAll() {
    return await this.showRepository.find();
  }

  async findOne(id: number) {
    return await this.showRepository.findOne({ where: { id } });
  }

  async update(id: number, updateShowDto: UpdateShowDto) {
    const show = await this.showRepository.findOne({ where: { id } });

    if (!show) {
      throw new Error(`Movie with ID ${id} not found`);
    }
  
    Object.assign(show, updateShowDto);

    await this.showRepository.save(show);
    return `This action updates a #${id} show`;
  }

  async remove(id: number) {
    const show = await this.showRepository.findOne({ where: { id } });

    if (!show) {
      throw new Error(`Show with ID ${id} not found`);
    }
  
    await this.showRepository.remove(show);

    return `This action removes a #${id} show`;
  }
}
