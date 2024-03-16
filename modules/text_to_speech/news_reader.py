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

# Example usage
if __name__ == "__main__":
    news_sources = ['bbc-news', 'cnn', 'reuters']
    api_key = 'YOUR_API_KEY'  # Replace with your actual API key
    news_reader = NewsReader(api_key, news_sources)
    articles = news_reader.fetch_latest_news()
    news_reader.read_news(articles)
