import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UnitSolutionService } from './unit-solution.service';
import { CreateUnitSolutionDto } from './dto/create-unit-solution.dto';
import { UpdateUnitSolutionDto } from './dto/update-unit-solution.dto';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('单位解决方案模块')
@Controller('unit-solution')
export class UnitSolutionController {
  constructor(private readonly unitSolutionService: UnitSolutionService) {}

  @Post()
  @ApiOperation({
    summary: '添加单位解决方案'
  })
  create(@Body() createUnitSolutionDto: CreateUnitSolutionDto) {
    try {
      return this.unitSolutionService.create(createUnitSolutionDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '单位解决方案添加失败'
      });
    }
  }

  @Get('list')
  @ApiOperation({
    summary: '获取单位解决方案列表'
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.unitSolutionService.getUnitSolutionList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位解决方案列表失败'
      });
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据id获得单位解决方案'
  })
  findOne(@Param('id') id: string) {
    try {
      return this.unitSolutionService.findOneById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取单位解决方案失败'
      });
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: '根据id更新单位解决方案'
  })
  update(
    @Param('id') id: string,
    @Body() updateUnitSolutionDto: UpdateUnitSolutionDto
  ) {
    try {
      return this.unitSolutionService.update(+id, updateUnitSolutionDto);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改单位解决方案失败'
      });
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: '根据id删除单位解决方案'
  })
  remove(@Param('id') id: string) {
    try {
      return this.unitSolutionService.remove(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除单位解决方案失败'
      });
    }
  }
}
