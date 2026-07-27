import { Request, Response } from 'express';

export const getWeatherAlerts = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      location: 'Baladweyne, Hiran Region, Somalia',
      riverMonitoring: {
        riverName: 'Shabelle River (Webi Shabelle)',
        currentLevelMeters: 4.85,
        warningLevelMeters: 5.50,
        floodRiskStatus: 'MODERATE_WATCH', // LOW, MODERATE_WATCH, SEVERE_FLOOD
        trend: 'RISING'
      },
      currentWeather: {
        temperatureC: 33,
        condition: 'Partly Cloudy',
        humidity: 62,
        windSpeedKmH: 14,
        rainfallForecastMm: 12.4
      },
      alerts: [
        {
          id: 'w-alert-01',
          type: 'FLOOD_WATCH',
          severity: 'WARNING',
          title: 'Shabelle River Upstream Water Level Increase',
          message: 'Upstream rainfall in Ethiopian Highlands causing 0.35m rise in Shabelle River gauge at Baladweyne bridge. Irrigation canal gates should be monitored.',
          issuedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'w-alert-02',
          type: 'RAIN_FORECAST',
          severity: 'INFO',
          title: 'Gu Season Moderate Rainfall Expected',
          message: 'Expect scattered showers of 10-15mm across Bundaweyn and Kooshin farming sectors within the next 48 hours.',
          issuedAt: new Date(Date.now() - 3600000 * 12).toISOString()
        }
      ],
      weeklyForecast: [
        { day: 'Mon', tempMax: 34, tempMin: 24, condition: 'Sunny', rainProb: 10 },
        { day: 'Tue', tempMax: 33, tempMin: 23, condition: 'Cloudy', rainProb: 40 },
        { day: 'Wed', tempMax: 31, tempMin: 23, condition: 'Thunderstorms', rainProb: 80 },
        { day: 'Thu', tempMax: 32, tempMin: 22, condition: 'Scattered Showers', rainProb: 60 },
        { day: 'Fri', tempMax: 33, tempMin: 24, condition: 'Partly Cloudy', rainProb: 20 },
        { day: 'Sat', tempMax: 35, tempMin: 25, condition: 'Sunny', rainProb: 5 },
        { day: 'Sun', tempMax: 35, tempMin: 25, condition: 'Sunny', rainProb: 5 }
      ]
    }
  });
};
