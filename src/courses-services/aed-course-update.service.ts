import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { CurrencyExchangeService } from '../currency-exchange.service';

@Injectable()
export class AedUpdateCourseService {
  constructor(
    private readonly appService: AppService,
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  public async updateAedRub() {
    try {
      const [ask, bid] = await this.appService.getOffer('USDT', 'RUB');
      const bidCourse = bid.price / 3.64;
      const askCourse = 1 / (ask.price / 3.7);
      await this.currencyExchangeService.updateCourse('AED', 'RUB', bidCourse);
      await this.currencyExchangeService.updateCourse('RUB', 'AED', askCourse);
    } catch (err) {
      console.log('this');
    }
  }

  public getTasks() {
    return [this.updateAedRub()];
  }
}
