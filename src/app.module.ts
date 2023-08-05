import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/todo'),
  ],
})
export class AppModule {}
