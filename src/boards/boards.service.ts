import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ){}
    // private boards: Board[] = [];
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title, // 매개변수명과 필드명이 같을 땐 title: title을 그냥 title로 줄일 수 있다.
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     }
    //     this.boards.push(board);
    //     return board;
    // }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }
    
    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        const title = createBoardDto.title;
        const description = createBoardDto.description;

        const board = this.boardRepository.create({
            title,
            description,
            status : BoardStatus.PUBLIC
        });
        await this.boardRepository.save(board);
        return board;
    }
 
    // async await을 이용해 데이터베이스 작업이 끝난 후 결과값을 받게 한다.
    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log(result); // DB에 존재하지 않는 보드면 DeleteResult { raw: [], affected: 0 }
        if(result.affected == 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }
    // deleteBoard(id: string): void {
    //     this.boards = this.boards.filter((board) => board.id !== id); 
    //     // array.filter(콜백함수) 콜백함수로 걸러낸 새로운 배열 생성 (java의 stream().filter().toArray()기능)
    // }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}
