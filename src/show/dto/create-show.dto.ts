import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '날짜를 입력해주세요' })
  date: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number

}
