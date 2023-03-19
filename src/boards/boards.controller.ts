import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    //타입을 정해주는 이유는? 원하는 타입과 다른 코드를 사용할 시 에러가 발생안하고 코드를 읽는 입장에서 더 코드를 쉽게 이해하며 읽을 수 있다
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
    //@Body() body로 req에 값을 받을 수 있음
    //하나씩 가져오려면  @Body('title')title
    return this.boardsService.createBoard(CreateBoardDto);
  }
}
