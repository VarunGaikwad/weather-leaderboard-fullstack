import { Router } from 'express';
import weatherModel from '../../db/schema.js'; // Correct import
import _fetchWeatherInfo from '../../service/weather/weather.js';

const router = new Router();

router.get('/', (_req, res) => {
    res.status(200).send('Welcome to the weather leaderboard server. This is api route.');
});

router.route("/weather").get(async (_req, res, next) => {
    try {
        const response = await weatherModel.find().sort({ 'main.temp': -1 });;
        res.status(200).json(response);
    } catch (error) {
        next({
            status: error.status || 500,
            message: error.message || 'An unexpected error occurred.'
        });
    }
}).post(async (req, res, next) => {
    try {
        const { lat, lon, q } = req.body,
            data = await _fetchWeatherInfo({ lat, lon, q }),
            response = await weatherModel.create(data);
        res.status(201).json(response);
    } catch (error) {
        next({
            status: error.status || 500,
            message: error.message || 'An unexpected error occurred.'
        });
    }
})



export default router;
