import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector // private readonly jwtService: JwtService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取路由角色
    const roles = this.reflector.get('roles', context.getHandler());
    // console.log(roles, '获取路由角色');
    if (!roles) {
      return true;
    }
    // 读取user
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user.roles);
    if (!user) {
      return false;
    }
    // 判断用户的角色是否包含和roles相同的角色列表，并返回一个布尔类型
    const hasRoles = roles.some((role: string) => {
      return user.roles.some((role2: any) => role == role2.name);
      // user.roles.map((role2) => {
      //   return role == role2.name;
      // });
    });
    if (!hasRoles) {
      throw new UnauthorizedException('抱歉，您没有权限进行该操作！');
    }
    return hasRoles;
  }
}
