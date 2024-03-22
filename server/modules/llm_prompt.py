import base64
from datasets import load_dataset
import requests
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    HfArgumentParser,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    GenerationConfig
)
from tqdm import tqdm
from trl import SFTTrainer
import torch
import time
import pandas as pd
import numpy as np
from huggingface_hub import interpreter_login
import os

import random
import json
from geopy.geocoders import Nominatim
from weather_reader import get_weather

prompts = []
prompts.append('''
    Pretend you're a personal assistant tailored for Singaporean travelers, offering insights and recommendations on road conditions and travel plans. Speak directly to the user in a warm, friendly tone resembling a lively radio host. Craft words that resonate and can be effortlessly translated into engaging speech.

    Let's explore the user's journey that passes through the following roads: {route_path}. Delve into the forecasted traffic volumes for each road, covering the current time, the next hour, and two hours ahead: {traffic_volume_json}

    Prepare the user to anticipate an estimated ERP (Electronic Road Pricing) pricing of around ${erp_pricing} for the entire trip. Conveniently, there are parking options near the user's destination at {nearby_carparks}, ensuring hassle-free parking. As for the weather at {destination_location}, it is expected to be {weather_forecast}.

    Now, let's craft a concise and informative summary of the user's trip, sprinkled with personalized recommendations. Engage the user and offer insights that enhance their travel experience. ### Response ###''')

def get_images(current_location, destination_location, api_key):
    start = time.time()

    url = "https://pli9nw524l.execute-api.us-west-2.amazonaws.com/dev/get-images"
    params = {
        "current_location": current_location,
        "destination_location": destination_location,
        "api_key": api_key
    }

    headers = {'Cache-Control': 'no-cache'}
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        json_data = response.json()
        image_data_list = json_data.get("images")
        # camera_ids
        camera_ids = json_data.get("camera_ids")
        if image_data_list:
            # Create a folder to store the images (if it doesn't exist)
            folder_name = "images"
            os.makedirs(folder_name, exist_ok=True)

            # Save each image to the folder
            for i, image_data in enumerate(image_data_list):
                image_data = image_data.strip('"')  # Remove leading/trailing quotes if present
                image_bytes = base64.b64decode(image_data)
                image_filename = os.path.join(folder_name, f"image_{i+1}.jpg")
                with open(image_filename, "wb") as file:
                    file.write(image_bytes)
            end = time.time()
            print(f"{len(image_data_list)} images saved successfully.")
            print(f"Camera IDs: {camera_ids}")
            print(f"Time taken: {end - start:.2f} seconds.")
        else:
            print("No image data found in the response.")
    else:
        print("Failed to retrieve the images.")


def carparklots(api_key, destination_location):
    # Set the API endpoint URL
    api_url = "https://x9yx4wuqkd.execute-api.us-west-2.amazonaws.com/dev/carparklots"

    # Set the Google API key and destination as query parameters
    params = {
        "googleAPIKEY": api_key,
        "destination": destination_location
    }

    # Send a GET request to the API endpoint
    response = requests.get(api_url, params=params)

    # Check the response status code
    if response.status_code == 200:
        # Parse the response JSON
        data = response.json()
        print(data)
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

def call_api_gateway(current_location, destination_location, api_key):
    url = "https://gh0xe7oue2.execute-api.us-west-2.amazonaws.com/dev/calculate-erp-charge"
    
    params = {
        "current_location": current_location,
        "destination_location": destination_location,
        "api_key": api_key
    }
    
    response = requests.post(url, params=params)
    
    if response.status_code == 200:
        result = response.json()
        print("API Gateway Response:")
        print(result)
    else:
        print(f"API Gateway request failed with status code: {response.status_code}")
        print("Error message:", response.text)


def trafficVolume(camera_id, num_hours=3):
    url = "https://e6mqofeusvazz7nv3odpa5jghi0hnfsr.lambda-url.ap-southeast-1.on.aws/"

    payload = json.dumps({
        "camera_id": camera_id,
        "num_hours": num_hours
    })
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.json()
