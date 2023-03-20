/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

//class는 인터페이스에서 프로그램이 실행되는 중(런타임)에 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용하다
export class CreateBoardDto {
  //비어 있는 경우에도 request가 200 성공이 되서 이를 방지하기 위한 파이프 모듈
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
