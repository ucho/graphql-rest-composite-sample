import { Module } from '@nestjs/common';
import { TasksResolvers, UsersResolvers } from './tasks.resolver';

@Module({
  providers: [TasksResolvers, UsersResolvers],
})
export class TasksModule {}
