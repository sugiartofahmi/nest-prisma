import { Module } from '@nestjs/common';
import { BookModule } from '../book';

@Module({
  imports: [BookModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
