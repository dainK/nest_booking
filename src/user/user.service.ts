import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createDto : CreateUserDto) {
    const existingUser = await this.findOne(createDto.email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(createDto.password, 10);
    await this.userRepository.save({
      email : createDto.email,
      password: hashedPassword,
      role : createDto.role,
      nickname : createDto.nickname
    });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
  
  async refund(userId: number, point :number) {
    const user = await this.findOneById(userId);
    if(!user) {
      return "유저 정보를 불러올수없습니다."
    }
    user.point += point;
    await this.userRepository.save(user);
    return `${point} 포인트 회수`;
  }

  async buy(userId: number, point :number) {
    const user = await this.findOneById(userId);
    if(!user) {
      return "유저 정보를 불러올수없습니다."
    }
    user.point -= point;
    await this.userRepository.save(user);
    return `${point} 포인트 차감`;
  }
}
