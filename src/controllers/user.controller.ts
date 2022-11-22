import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@/dto/user/create-user.dto';
import { UpdateUserDto } from '@/dto/user/update-user.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

// 设置swagger文档标签分类
@ApiTags('用户模块')
// 使用装饰器修饰类（路由）
@Controller('user')
export class UserController {
  // 依赖注入的方式，引入service
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: '添加用户' // 接口描述信息
  })
  // 请求返回数据时将密码这个字段隐藏
  @UseInterceptors(ClassSerializerInterceptor)
  // @Body是指获取到（http请求）客户端传递过来的body体中的数据，将数据给createUserDto这个变量，CreateUserDto是TS类型约束
  // createUserDto可自定义
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户添加失败'
      });
    }
  }

  @Get('list')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // 验证token
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '获取user列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.userService.getUserList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取用户列表失败'
      });
    }
  }

  @Get('list/:id')
  @ApiOperation({
    summary: '根据id获取user'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取用户失败'
      });
    }
  }

  @Patch('list/:id')
  @ApiOperation({
    summary: '根据id修改user'
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改用户失败'
      });
    }
  }

  @Delete('list/:id')
  @ApiOperation({
    summary: '根据id删除user'
  })
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除用户失败'
      });
    }
  }
}
