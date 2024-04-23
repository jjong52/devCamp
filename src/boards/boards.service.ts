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
}
