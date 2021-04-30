import { Field, InputType, ID, ObjectType, Directive } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Task {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => User)
  user?: User;
}

@InputType()
export class TaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => ID)
  ownerId: string;
}
