import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// request에서 user만 반환하는 커스텀 데코레이터, 이거 안쓰고 그냥 req.user로 써도 됨
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})