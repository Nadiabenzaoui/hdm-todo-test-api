import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import SaveTaskDto from 'src/UseCase/SaveTask/SaveTaskDto';
import { dot } from 'node:test/reporters';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(dto: SaveTaskDto) {
    if (!dto.id) {
      // @todo IMPLEMENT HERE USING PRISMA API
      return this.prisma.task.create({
        data: {
          name: dto.name,
        },
      });
    }
    // @todo IMPLEMENT HERE USING PRISMA API
    return this.prisma.task.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
    });
  }
}
