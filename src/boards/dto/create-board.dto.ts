/* eslint-disable prettier/prettier */
//class는 인터페이스에서 프로그램이 실행되는 중(런타임)에 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용하다
export class CreateBoardDto {
  title: string;
  description: string;
}
