import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';

import { diskStorage } from 'multer';
import * as path from 'path';

import { UploadService } from '@/services/upload.service';

import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';

@ApiTags('文件/图片上传模块')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * FileInterceptor接收两个参数
   * 一个 fieldName (指向包含文件的 HTML 表单的字段)
   * 可选 options 对象, 类型为 MulterOptions
   */
  @Post('picture')
  @ApiOperation({
    summary: '图片上传' // 接口描述信息
  })
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        // 文件上传后的文件夹路径
        destination: (req, file, cb) => {
          const savePath = path.join(process.cwd(), 'public/picture');
          // const savePath = path.join(__dirname, '../../../public/picture');
          cb(null, savePath);
        },
        // 自定义上传的文件名字
        filename: (req, file, cb) => {
          const singFileArray = file.originalname.split('.');
          const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
          const newFilename = `${
            singFileArray[0]
          }_${Date.now()}.${fileExtension}`;
          cb(null, newFilename);
        }
      })
    })
  ) // 获取header的file文件、键名
  @ApiConsumes('multipart/form-data')
  uploadPicture(@UploadedFile() file: Express.Multer.File) {
    try {
      const { filename, mimetype, path, size } = file;
      return this.uploadService.createPicture(filename, mimetype, path, size);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '图片上传失败'
      });
    }
  }

  @Get('picture/list')
  @ApiOperation({
    summary: '获取图片列表' // 接口描述信息
  })
  findPictureAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.uploadService.getPictureList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取图片列表失败'
      });
    }
  }

  @Get('picture/:id')
  @ApiOperation({
    summary: '根据id获取图片' // 接口描述信息
  })
  findPictureOne(@Param('id') id: string) {
    try {
      return this.uploadService.findPictureById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取图片失败'
      });
    }
  }

  @Patch('picture/:id')
  @ApiOperation({
    summary: '根据id修改图片' // 接口描述信息
  })
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        // 文件上传后的文件夹路径
        destination: (req, file, cb) => {
          const savePath = path.join(process.cwd(), 'public/picture');
          // const savePath = path.join(__dirname, '../../../public/picture');
          cb(null, savePath);
        },
        // 自定义上传的文件名字
        filename: (req, file, cb) => {
          const singFileArray = file.originalname.split('.');
          const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
          const newFilename = `${
            singFileArray[0]
          }_${Date.now()}.${fileExtension}`;
          cb(null, newFilename);
        }
      })
    })
  ) // 获取header的file文件、键名
  @ApiConsumes('multipart/form-data')
  updatePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      return this.uploadService.updatePicture(+id, file);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改图片失败'
      });
    }
  }

  @Delete('picture/:id')
  @ApiOperation({
    summary: '根据id删除图片' // 接口描述信息
  })
  removePicture(@Param('id') id: string) {
    try {
      return this.uploadService.removePicture(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除图片失败'
      });
    }
  }

  @Post('file')
  @ApiOperation({
    summary: '文件上传' // 接口描述信息
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // 文件上传后的文件夹路径
        destination: (req, file, cb) => {
          const savePath = path.join(process.cwd(), 'public/file');
          // const savePath = path.join(__dirname, '../../../public/picture');
          cb(null, savePath);
        },
        // 自定义上传的文件名字
        filename: (req, file, cb) => {
          const singFileArray = file.originalname.split('.');
          const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
          const newFilename = `${
            singFileArray[0]
          }_${Date.now()}.${fileExtension}`;
          cb(null, newFilename);
        }
      })
    })
  ) // 获取header的file文件、键名
  @ApiConsumes('multipart/form-data')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const { filename, mimetype, path, size } = file;
      return this.uploadService.createFile(filename, mimetype, path, size);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '文件上传失败'
      });
    }
  }

  @Get('file/list')
  @ApiOperation({
    summary: '获取文件列表' // 接口描述信息
  })
  findFileAll(@Query() paginationsQuery: PaginationQueryDto) {
    try {
      return this.uploadService.getPictureList(paginationsQuery);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取文件列表失败'
      });
    }
  }

  @Get('file/:id')
  @ApiOperation({
    summary: '根据id获取文件' // 接口描述信息
  })
  findFileOne(@Param('id') id: string) {
    try {
      return this.uploadService.findPictureById(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '获取文件失败'
      });
    }
  }

  @Patch('file/:id')
  @ApiOperation({
    summary: '根据id修改文件' // 接口描述信息
  })
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        // 文件上传后的文件夹路径
        destination: (req, file, cb) => {
          const savePath = path.join(process.cwd(), 'public/picture');
          // const savePath = path.join(__dirname, '../../../public/picture');
          cb(null, savePath);
        },
        // 自定义上传的文件名字
        filename: (req, file, cb) => {
          const singFileArray = file.originalname.split('.');
          const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
          const newFilename = `${
            singFileArray[0]
          }_${Date.now()}.${fileExtension}`;
          cb(null, newFilename);
        }
      })
    })
  ) // 获取header的file文件、键名
  @ApiConsumes('multipart/form-data')
  updateFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      return this.uploadService.updatePicture(+id, file);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '修改文件失败'
      });
    }
  }

  @Delete('file/:id')
  @ApiOperation({
    summary: '根据id文件图片' // 接口描述信息
  })
  removeFile(@Param('id') id: string) {
    try {
      return this.uploadService.removePicture(+id);
    } catch (error) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '删除文件失败'
      });
    }
  }
}
