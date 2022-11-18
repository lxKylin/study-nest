import {
  Injectable
  // ExecutionContext,
  // ForbiddenException,
  // UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// import { AuthService } from '@/module/auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private readonly authService: AuthService) {
  //   super();
  // }
  // request.user可获取user信息
  // async getRequest(context: ExecutionContext) {
  //   const ctx = context.switchToHttp();
  //   // console.log(ctx.getResponse());
  //   const request = ctx.getRequest();
  //   console.log(request, 'request');
  //   // const accessToken =
  //   //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJLeWxpbiIsImlhdCI6MTY2NjA4NjE3NCwiZXhwIjoxNjY2MTE0OTc0fQ.eRBjeRu7wf9dwVRz-qdXpDQ3Ie07A0MbgDK66xkOXd8';
  //   const accessToken = request.header('Authorization');
  //   console.log(accessToken, 'Authorization');
  //   if (!accessToken) {
  //     throw new ForbiddenException('请先登录');
  //   }
  //   const userId = await this.authService.verifyToken(accessToken);
  //   if (!userId) {
  //     throw new UnauthorizedException('当前登录已过期，请重新登录');
  //   }
  //   return true;
  // }
  // handleRequest<User>(err, user: User): User {
  //   console.log(err, user, 'handleRequest');
  //   if (err || !user) {
  //     throw new UnauthorizedException('身份验证失败');
  //   }
  //   return user;
  // }
}
