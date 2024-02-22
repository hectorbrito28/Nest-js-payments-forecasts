import { Test, TestingModule } from '@nestjs/testing';
import { PaymentForecastController } from './payment_forecast.controller';
import { PaymentForecastService } from './payment_forecast.service';

describe('PaymentForecastController', () => {
  let controller: PaymentForecastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentForecastController],
      providers: [PaymentForecastService],
    }).compile();

    controller = module.get<PaymentForecastController>(PaymentForecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
