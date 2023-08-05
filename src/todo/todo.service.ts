import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { getOrThrow } from '../utils';
import { Todo } from './schemas';
import {
  TCreateTodoPayload,
  TFindAllParams,
  TTodo,
  TTodoId,
  TUpdateTodoPayload,
} from './types';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(payload: TCreateTodoPayload): Promise<TTodo> {
    const todo = new this.todoModel({
      isDone: false,
      ...payload,
    });

    const result = await todo.save();

    return result.toObject();
  }

  findAll({ search, limit }: TFindAllParams): Promise<TTodo[]> {
    const filters: FilterQuery<TTodo> = {};

    if (search) {
      filters.title = { $regex: search, $options: 'i' };
    }

    return this.todoModel.find(filters).limit(limit).exec();
  }

  async findOne(id: TTodoId): Promise<TTodo> {
    const todo = getOrThrow(
      await this.todoModel.findOne({ _id: id }).exec(),
      new NotFoundException(),
    );

    return todo.toObject();
  }

  async update(id: TTodoId, payload: TUpdateTodoPayload): Promise<TTodo> {
    const todo = getOrThrow(await this.findOne(id), new NotFoundException());

    await this.todoModel.updateOne({ _id: id }, { ...todo, ...payload }).exec();

    return this.findOne(id);
  }

  async delete(id: TTodoId): Promise<void> {
    getOrThrow(await this.findOne(id), new NotFoundException());

    await this.todoModel.deleteOne({ _id: id }).exec();
  }

  async deleteAll(): Promise<void> {
    await this.todoModel.deleteMany({}).exec();
  }
}
