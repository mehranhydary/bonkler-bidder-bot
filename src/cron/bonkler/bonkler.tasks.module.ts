import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BonklerTasksService } from './bonkler.tasks.service';

@Module({
  exports: [BonklerTasksService],
  imports: [HttpModule],
  providers: [BonklerTasksService],
})
export class BonklerTasksModule {}
