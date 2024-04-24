import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title, // 매개변수명과 필드명이 같을 땐 title: title을 그냥 title로 줄일 수 있다.
            description,
            status: BoardStatus.PUBLIC,
        }
        this.boards.push(board);
        return board;
    }
    getBoardById(id: string): Board {
        return this.boards.find((board) => board.id == id); // find는 배열의 내장함수, 콜백함수를 매개변수로 받음
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id); 
        // array.filter(콜백함수) 콜백함수로 걸러낸 새로운 배열 생성 (java의 stream().filter().toArray()기능)
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
