import json
import os
import requests
import sys
import argparse

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(parent_dir)
from config.settings import WEATHER_API_KEY

class WeatherAPI:
    """
    Location Parameters:
    - Latitude and Longitude (Decimal degree) location=42.3478, -71.0466
    - City name location=new york
    - US zip location=10001 US(2-letter code based on ISO-3166)
    - UK postcode location=SW1 
    """
    def __init__(self, api_key, location, units='metric'):
        self.api_key = api_key
        self.location = location
        self.units = units
        self.base_url = "https://api.tomorrow.io/v4/weather/"

    def get_realtime_weather(self):
        """Get the current weather conditions."""
        url = f"{self.base_url}/realtime?location={self.location}&units={self.units}&apikey={self.api_key}"
        response = requests.get(url, headers={'Accept': 'application/json'})
        return response.json()
    
    def get_forcasted_weather(self, timeteps="1d"):
        """Get the weather forecast for specified timesteps (hourly: "1h", daily: "1d")"""
        url = f"{self.base_url}forecast?location={self.location}&timesteps={timeteps}&units={self.units}&apikey={self.api_key}"
        response = requests.get(url, headers={'Accept': 'application/json'})
        return response.json()


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Weather API")
    parser.add_argument("location", default="singapore", help="Location for weather data")
    parser.add_argument("action", help="Action to perform (realtime or forecast)")
    parser.add_argument("timesteps", default="1d", help="Timesteps for forecast (1h or 1d)")

    args = parser.parse_args()
    print("\nActions: ", args.action, args.location, args.timesteps)

    weather_api = WeatherAPI(WEATHER_API_KEY, args.location)

    match args.action:
        case "realtime":
            print(json.dumps(weather_api.get_realtime_weather()))
        case "forecast":
            print(json.dumps(weather_api.get_forcasted_weather(args.timesteps)))
        case _:
            print("Invalid argument. Please use 'realtime' or 'forecast'")