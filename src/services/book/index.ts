import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Book } from 'src/entities/dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook(data: Book): Promise<Book> {
    return this.prisma.books.create({
      data: {
        title: data.title,
        description: data.description,
        author: data.author,
        image: data.image.secure_url,
      },
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.books.findMany();
  }

  async getBookByID(id: number): Promise<Book> {
    return this.prisma.books.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async updateBook(id: number, data: Book): Promise<Book> {
    return this.prisma.books.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async deleteBookById(id: number): Promise<void> {
    await this.prisma.books.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
