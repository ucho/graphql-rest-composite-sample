import { Field, ObjectType, Directive, ID } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Task])
  tasks?: Task[];
}
