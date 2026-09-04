import { getMarketPrices, predictMarketPrice } from '../services/marketService.js';

export const getPrices = async (req, res, next) => {
  try {
    const { crop, state, district, market, date } = req.query;
    const result = await getMarketPrices({ crop, state, district, market, date });
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getPricePrediction = async (req, res, next) => {
  try {
    const { crop = 'Wheat', market = 'Khanna Mandi', days = 15 } = req.query;
    const result = predictMarketPrice(crop, market, Number(days));
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
