import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PingTasksService {
  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async ping() {
  //   try {
  //     console.log('Bonkler Bidder is alive');
  //   } catch (error: any) {
  //     console.error(error, 'Error occurred while running ping tasks');
  //     return Promise.resolve();
  //   }
  // }
}
