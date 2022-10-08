import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Picture } from './entities/picture';
import { File } from './entities/file';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  async createPicture(
    filename: string,
    mimetype: string,
    path: string,
    size: number
  ) {
    const picture = await this.pictureRepository.create({
      filename,
      mimetype,
      path,
      size
    });
    return await this.pictureRepository.save(picture);
  }

  async getPictureList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.pictureRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findPictureById(id: number) {
    return await this.pictureRepository.findOneBy({ id });
  }

  async updatePicture(id: number, file) {
    const { filename, mimetype, path, size } = file;
    const picture = await this.pictureRepository.preload({
      id,
      ...{
        filename,
        mimetype,
        path,
        size
      }
    });
    if (!picture) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.pictureRepository.save(picture);
  }

  async removePicture(id: number) {
    const picture = await this.pictureRepository.findOneBy({ id });
    if (!picture) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.pictureRepository.remove(picture);
  }

  async createFile(
    filename: string,
    mimetype: string,
    path: string,
    size: number
  ) {
    const picture = await this.fileRepository.create({
      filename,
      mimetype,
      path,
      size
    });
    return await this.fileRepository.save(picture);
  }

  async getFileList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    return await this.fileRepository.find({
      skip: offset,
      take: limit
    });
  }

  async findFileById(id: number) {
    return await this.fileRepository.findOneBy({ id });
  }

  async updateFile(id: number, updateFile) {
    const { filename, mimetype, path, size } = updateFile;
    const file = await this.fileRepository.preload({
      id,
      ...{
        filename,
        mimetype,
        path,
        size
      }
    });
    if (!file) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.fileRepository.save(file);
  }

  async removeFile(id: number) {
    const file = await this.pictureRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.fileRepository.remove(file);
  }
}
