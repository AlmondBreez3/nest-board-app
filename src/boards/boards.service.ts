import { Injectable, NotFoundException } from '@nestjs/common';
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

  getBoardById(id: string): Board {
    //아무것도 없는 게시물을 찾으려 할 때 에러를 반환해 주어야함, 그러기위해서는 예외 인스턴스를 생성해서 이용해주면 된다
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
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

  deleteBoard(id: string): void {
    //없는 게시물을 지우려 할 때 결과 값 처리
    //이미 있는 메소드인 getBoardById를 이용해서 지우려고 하는 게시물이 있는지 체크를 해준 후
    //지워주고 없다면 에러문구로 보내주면 된다

    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
