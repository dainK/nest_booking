import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsInt({ message: '숫자 형식으로 입력해주세요.' })
  role: number = 0;
  
  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요' })
  nickname: string;
}
