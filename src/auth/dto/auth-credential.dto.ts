import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'PW is only accepts english and number'
    }) // 영어랑 숫자만 가능하게 유효성 체크, 컨트롤러에 ValidationPipe를 넣어야 적용됨
    password: string;
}