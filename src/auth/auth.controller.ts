import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard()) // 리퀘스트에 유저 객체를 넣어줌
    // test(@Req() req) {
    //     console.log(req.user)
    // }

    @Post('/test')
    @UseGuards(AuthGuard()) // 리퀘스트에 유저 객체를 넣어줌
    test(@GetUser() user: User) { // 리퀘스트에서 유저 객체를 반환하는 커스텀 데코레이터
        console.log(user)
    }


}
