import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PingTasksModule } from './cron/ping/ping.tasks.module';
import { BonklerTasksModule } from './cron/bonkler/bonkler.tasks.module';

// We can add multile models like so: https://stackoverflow.com/questions/59075112/nestjs-use-multiple-mongodb-connections-per-module

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PingTasksModule,
    BonklerTasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
