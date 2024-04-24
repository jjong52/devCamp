import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';


@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post('/')
    createBoard(
        @Body() createBoardDto: CreateBoardDto // 스프링의 @RequestBody 요청 본문 추출
    ): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board { // 스프링의 @PathVariable
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status') status: BoardStatus
    ) {
        return this.boardService.updateBoardStatus(id, status);
    }
 }
