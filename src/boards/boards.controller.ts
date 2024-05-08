import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller('boards')
@UseGuards(AuthGuard()) // 로그인한 유저만 접근 가능
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }
    // @Post('/')
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto // 스프링의 @RequestBody 요청 본문 추출
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }
    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe) // 내장 파이프 CreateBoardDto에서 @IsNotEmpty() 유효성 검사
    //Cannot read properties of undefined~ 에러가 뜨면 꼭 @Body() 데코레이션을 빼먹지 않았는지 꼭! 확인하자
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User): Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user);
    }

    @Get('/my-boards')
    getMyBoards(@GetUser() user: User): Promise<Board[]> {
        return this.boardService.getMyBoards(user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

  
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board { // 스프링의 @PathVariable
    //     return this.boardService.getBoardById(id);
    // }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id);
    // }



    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number,
    @GetUser() user:User
    ): Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardService.updateBoardStatus(id, status);
    // }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status);
    }
 }
