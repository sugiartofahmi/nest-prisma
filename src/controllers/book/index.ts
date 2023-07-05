import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Book } from 'src/entities/dto';
import { CloudinaryService } from 'src/services';
import { BookService } from 'src/services/book';

@Controller('books')
export class BooksController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private booksService: BookService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadBooks(
    @UploadedFile() file: Express.Multer.File,
    @Body() book: Book,
  ): Promise<Book> {
    const imgaeUrl = await this.cloudinaryService.uploadImage(file);
    const saveBook = await this.booksService.createBook({
      title: book.title,
      description: book.description,
      author: book.author,
      image: imgaeUrl,
    });
    return saveBook;
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Book> {
    return this.booksService.getBookByID(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateBook(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatedBook: Book,
  ): Promise<Book> {
    let imageUrl = updatedBook.image;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      imageUrl = uploadedImage.secure_url;
    }

    const book: Book = {
      ...updatedBook,
      image: imageUrl,
    };

    return this.booksService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBookById(@Param('id') id: number): Promise<{ message: string }> {
    const book = await this.booksService.getBookByID(id);
    if (!book) {
      throw new NotFoundException('Buku tidak ada');
    }

    await this.booksService.deleteBookById(id);
    return { message: 'Berhasil hapus buku' };
  }
}
