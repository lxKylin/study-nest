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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/module/auth/guards/jwt-auth.guard';

// 设置swagger文档标签分类
@ApiTags('用户模块')
// 使用装饰器修饰类（路由）
@Controller('user')
export class UserController {
  // 依赖注入的方式，引入service
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '添加用户' // 接口描述信息
  })
  // 请求返回数据时将密码这个字段隐藏
  @UseInterceptors(ClassSerializerInterceptor)
  // @Body是指获取到（http请求）客户端传递过来的body体中的数据，将数据给createUserDto这个变量，CreateUserDto是TS类型约束
  // createUserDto可自定义
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  // @UseGuards(JwtAuthGuard) // 验证token
  @ApiOperation({
    summary: '获取user列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    return this.userService.getUserList(paginationsQuery);
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获取user'
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id修改user'
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除user'
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
