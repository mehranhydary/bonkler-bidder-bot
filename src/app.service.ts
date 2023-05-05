import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomepage() {
    return 'Bonkler Bidder Bot';
  }
}
