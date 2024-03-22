# https://data.gov.sg/datasets/{dataset_id}/view
# endpoint at /environment/2-hour-weather-forecast

import sys
import requests
import json
import os
from datetime import datetime, timezone
# Add the parent directory to the sys.path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(parent_dir)

from config.settings import NEWS_API_KEY
import glob
from datetime import datetime, timedelta # Import timedelta

def get_weather():
    url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
    date = datetime.now(timezone(timedelta(hours=8))) # Pass timedelta(hours=8) to timezone
    print(date.strftime("%Y-%m-%dT%H:%M:%S"))
    params = {
        "date_time": date.strftime("%Y-%m-%dT%H:%M:%S")
    }
    data = requests.get(url, params=params)
    data_json = data.json()
    return data_json

if __name__ == "__main__":
    print(get_weather())