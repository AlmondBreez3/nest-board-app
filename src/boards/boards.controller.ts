import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  //게시글 모두 불러오기
  @Get('/')
  getAllBoard(): Board[] {
    //타입을 정해주는 이유는? 원하는 타입과 다른 코드를 사용할 시 에러가 발생안하고 코드를 읽는 입장에서 더 코드를 쉽게 이해하며 읽을 수 있다
    return this.boardsService.getAllBoards();
  }

  //게시물 만들기
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //@Body() body로 req에 값을 받을 수 있음
    //하나씩 가져오려면  @Body('title')title
    return this.boardsService.createBoard(createBoardDto);
  }

  //id별로 게시글 가져오기
  //@param이라는 것을 처음 써본다!url의 id를 가져오려면 Param을 쓰는 것!
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }
  //여러가지 param을 가져오기 위해서는 findOne(@Param() params:string[])

  //ID로 게시물 지우기
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
