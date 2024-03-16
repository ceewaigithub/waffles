from config.settings import TRAFFIC_API_KEY, MUSIC_API_KEY, NEWS_API_KEY, USER_PREFERENCES
from modules.traffic import TrafficMonitor, MusicPlayer, NewsReader

def main():
    # Initialize modules with API keys and user preferences
    traffic_monitor = TrafficMonitor(api_key=TRAFFIC_API_KEY)
    music_player = MusicPlayer(api_key=MUSIC_API_KEY, user_preferences=USER_PREFERENCES)
    news_reader = NewsReader(api_key=NEWS_API_KEY, news_sources=USER_PREFERENCES['news_sources'])
    
    # Example location for traffic monitoring (to be dynamically updated in a real application)
    location = "your_location_here"
    traffic_data = traffic_monitor.get_traffic_data(location)
    if traffic_data:
        traffic_conditions = traffic_monitor.interpret_traffic_data(traffic_data)
        print(f"Traffic Conditions: {traffic_conditions}")
        
        # Play music based on traffic conditions
        playback_response = music_player.select_music_based_on_traffic(traffic_conditions)
        print(playback_response)
        
        # Fetch and read the latest news
        latest_news = news_reader.fetch_latest_news()
        if latest_news:
            print("Reading the latest news...")
            news_reader.read_news(latest_news)
        else:
            print("No latest news to read.")
    else:
        print("Unable to retrieve traffic data.")

if __name__ == "__main__":
    main()
