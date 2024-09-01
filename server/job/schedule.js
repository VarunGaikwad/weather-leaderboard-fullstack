import cron from 'node-cron';
import weatherModel from '../db/schema.js';
import _fetchWeatherInfo from '../service/weather/weather.js';

cron.schedule('0 0 * * *', async function () {
    try {
        const response = await weatherModel.find();
        for (let i = 0; i < response.length; i++) {
            const data = await _fetchWeatherInfo({ lat: response[i].coord.lat, lon: response[i].coord.lon });
            await weatherModel.findByIdAndUpdate(response[i]._id, { $set: data });
            console.log(`Updated weather for ${response[i].name}`);
        }
    } catch (err) {
        console.error(err.message);
    }
});