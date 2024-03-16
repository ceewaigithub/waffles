import requests
from gtts import gTTS
import os

class NewsReader:
    def __init__(self, api_key, news_sources):
        self.api_key = api_key
        self.news_sources = ','.join(news_sources)
        self.base_url = "https://newsapi.org/v2/top-headlines"

    def fetch_latest_news(self):
        """Fetch the latest news articles from the specified sources."""
        params = {
            'apiKey': self.api_key,
            'sources': self.news_sources,
        }
        response = requests.get(self.base_url, params=params)
        if response.status_code == 200:
            articles = response.json()['articles']
            return articles[:5]  # Return the top 5 articles
        else:
            return []

    def read_news(self, articles):
        """Use a TTS engine to read the titles and descriptions of news articles."""
        for article in articles:
            tts = gTTS(text=f"Title: {article['title']}. Description: {article['description']}", lang='en')
            tts.save("news.mp3")
            os.system("mpg321 news.mp3")  # Play the audio. mpg321 is a command-line mp3 player

    def fetch_and_generate_news_audio(news_items, output_dir="audio_files"):
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        audio_file_paths = []
        for idx, news in enumerate(news_items[:5]):  # Limit to 5 news items
            tts = gTTS(text=news['title'], lang='en')
            audio_file_path = os.path.join(output_dir, f"news_{idx}.mp3")
            tts.save(audio_file_path)
            audio_file_paths.append(audio_file_path)
        
        return audio_file_paths

# Example usage
if __name__ == "__main__":
    news_sources = ['bbc-news', 'the-verge']  # User-defined or default news sources
    news_reader = NewsReader(api_key='your_news_api_key_here', news_sources=news_sources)
    latest_news = news_reader.fetch_latest_news()
    if latest_news:
        news_reader.read_news(latest_news)
    else:
        print("No news found.")
