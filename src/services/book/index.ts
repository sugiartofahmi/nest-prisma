import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async createBook(): Promise<{ message: string }> {
    return { message: 'Hello API' };
  }
}
