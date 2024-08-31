import axios from "axios";

const { MODE } = import.meta.env,
    prefix = MODE === "development" ? "http://localhost:4004" : "",
    _fetchAllInfo = async () => {
        const { data } = await axios.get(`${prefix}/api/weather`);
        return data;
    },
    _postWeatherInfo = async (payload) => {
        const { data } = await axios.post(`${prefix}/api/weather`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return data;
    };

export { _fetchAllInfo, _postWeatherInfo };