import requests
from gtts import gTTS
import os
import sys
import json
from newsapi.newsapi_client import NewsApiClient

# Add the parent directory to the sys.path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(parent_dir)

from config.settings import NEWS_API_KEY
import glob

class NewsReader:
    def __init__(self, api_key, news_sources):
        self.news_api_client = NewsApiClient(api_key=api_key)
        self.news_sources = news_sources

    def fetch_latest_news(self, num_articles=3):
        """Fetch the latest news articles from the specified sources."""
        response = self.news_api_client.get_top_headlines(
            sources=','.join(self.news_sources),
            language='en',
            page_size=num_articles
        )
        if response['status'] == 'ok':
            return response['articles']
        else:
            print("Failed to fetch latest news")
            return []

    def generate_news_audio(self, articles, output_dir="../audio_files"):
        """Generate audio files for each news article."""
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        audio_file_paths = []
        for idx, article in enumerate(articles):
            text = f"Title: {article['title']}. Description: {article.get('description', 'No description available.')}"
            tts = gTTS(text=text, lang='en')
            audio_file_path = os.path.join(output_dir, f"news_{idx}.mp3")
            tts.save(audio_file_path)
            audio_file_paths.append(audio_file_path)
        
        return audio_file_paths

# Example usage
if __name__ == "__main__":
    news_sources = ['9to5mac' , 'bbc-news', 'the-verge']
    news_reader = NewsReader(api_key=NEWS_API_KEY, news_sources=news_sources)
    # Check if audio_files/ already has 3 news
    existing_files = glob.glob("../audio_files/news_*.mp3")
    if len(existing_files) < 3:
        latest_news = news_reader.fetch_latest_news(num_articles=3 - len(existing_files))
        audio_file_paths = news_reader.generate_news_audio(latest_news)
    else:
        audio_file_paths = existing_files

    print(json.dumps(audio_file_paths))  # Print JSON array of file paths