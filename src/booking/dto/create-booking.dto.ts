import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookingDto {
  
  @IsInt()
  @IsNotEmpty({ message: '공연 id를 입력해주세요' })
  showId: number;
  
  @IsInt()
  @IsNotEmpty({ message: '인원수를 입력해주세요.' })
  count: number;
}
