import axios from 'axios';

export const googleAnalytics = async (user) => {
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${"your_measurement_id"}&api_secret=${"your_secret_key"}`;
  const data = {
    client_id: user.id,
    events: [
      {
        name: 'session_start',
        params: {
          engagement_time_msec: '100',
          session_id: user.id.toString(),
        },
      },
    ],
  };
  const response = await axios.post(url, JSON.stringify(data));
}