import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { ulid } from 'ulid';
import { Task, TaskInput } from './task.model';
import { User } from './user.model';

const tasks: Task[] = [
  {
    id: ulid(),
    title: 'Buy a bottle of water',
    ownerId: '1',
  },
  {
    id: ulid(),
    title: 'Clean up the desk',
    ownerId: '1',
  },
  {
    id: ulid(),
    title: 'Walking the dog',
    ownerId: '2',
  },
];

@Resolver((of) => Task)
export class TasksResolvers {
  @Query((returns) => [Task])
  async findByOwner(
    @Args('ownerId', { type: () => ID }) ownerId: string,
  ): Promise<Task[]> {
    return tasks.filter((task) => task.ownerId === ownerId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Task {
    return tasks.find((task) => task.id === reference.id);
  }

  @ResolveField((of) => User)
  user(@Parent() task: Task): any {
    return { __typename: 'User', id: task.ownerId };
  }

  @Mutation((returns) => Task)
  async addTask(
    @Args('task', { type: () => TaskInput }) taskInput: TaskInput,
  ): Promise<Task> {
    const task: Task = {
      id: ulid(),
      ...taskInput,
    };
    tasks.push(task);
    return task;
  }
}

@Resolver((of) => User)
export class UsersResolvers {
  @ResolveField((of) => [Task])
  public tasks(@Parent() user: User): Task[] {
    return tasks.filter((task) => task.ownerId === user.id);
  }
}
