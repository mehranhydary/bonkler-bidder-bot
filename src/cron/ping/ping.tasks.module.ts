import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PingTasksService } from './ping.tasks.service';

@Module({
  exports: [PingTasksService],
  imports: [HttpModule],
  providers: [PingTasksService],
})
export class PingTasksModule {}
