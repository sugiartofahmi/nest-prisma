import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary';
import { BooksController } from 'src/controllers';
import { BookService } from 'src/services/book';
import { PrismaService } from 'src/services';

@Module({
  imports: [CloudinaryModule],
  controllers: [BooksController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
