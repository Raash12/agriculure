import { Request, Response } from 'express';

export let mockMarketPrices = [
  {
    id: 'mkt-01',
    cropName: 'Sesame (White Quality A)',
    marketName: 'Baladweyne Main Market',
    pricePerKgUSD: 2.10,
    prevPriceUSD: 1.95,
    trend: 'UP', // UP, DOWN, STABLE
    demand: 'HIGH',
    recommendedMarket: 'Mogadishu Central Export Hub'
  },
  {
    id: 'mkt-02',
    cropName: 'Maize (Local Dry)',
    marketName: 'Baladweyne Main Market',
    pricePerKgUSD: 0.65,
    prevPriceUSD: 0.70,
    trend: 'DOWN',
    demand: 'MEDIUM',
    recommendedMarket: 'Beledweyne Cooperative Silo'
  },
  {
    id: 'mkt-03',
    cropName: 'Watermelon (Fresh Harvest)',
    marketName: 'Howlwadaag Fresh Produce Yard',
    pricePerKgUSD: 0.40,
    prevPriceUSD: 0.38,
    trend: 'UP',
    demand: 'HIGH',
    recommendedMarket: 'Local City Retail Markets'
  },
  {
    id: 'mkt-04',
    cropName: 'Red Tomatoes',
    marketName: 'Kooshin Wholesale Yard',
    pricePerKgUSD: 0.85,
    prevPriceUSD: 0.85,
    trend: 'STABLE',
    demand: 'HIGH',
    recommendedMarket: 'Jowhar Trade Processing Center'
  }
];

export const getMarketPrices = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: mockMarketPrices,
    historicalTrends: [
      { month: 'Jan', sesame: 1.80, maize: 0.60, watermelon: 0.35, tomatoes: 0.75 },
      { month: 'Feb', sesame: 1.85, maize: 0.62, watermelon: 0.38, tomatoes: 0.80 },
      { month: 'Mar', sesame: 1.90, maize: 0.65, watermelon: 0.40, tomatoes: 0.82 },
      { month: 'Apr', sesame: 1.95, maize: 0.70, watermelon: 0.38, tomatoes: 0.85 },
      { month: 'May', sesame: 2.05, maize: 0.68, watermelon: 0.39, tomatoes: 0.88 },
      { month: 'Jun', sesame: 2.10, maize: 0.65, watermelon: 0.40, tomatoes: 0.85 }
    ]
  });
};
