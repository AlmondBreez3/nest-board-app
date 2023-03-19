import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
//게시물에 관한 로직을 처리하는 곳은 Service

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  //게시물 생성하기
  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      //게시물 id는 유니크 해야한다=>uuid모듈을 사용할 것
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
}
