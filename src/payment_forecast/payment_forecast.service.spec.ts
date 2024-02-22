import { Test, TestingModule } from '@nestjs/testing';
import { PaymentForecastService } from './payment_forecast.service';

describe('PaymentForecastService', () => {
  let service: PaymentForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentForecastService],
    }).compile();

    service = module.get<PaymentForecastService>(PaymentForecastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
