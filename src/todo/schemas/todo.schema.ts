import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Todo {
  id: string;

  @Prop()
  title: string;

  @Prop()
  isDone: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
