import requests

class TrafficMonitor:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "http://example_traffic_api.com/api"

    def get_traffic_data(self, location):
        """Fetch traffic data for the specified location."""
        url = f"{self.base_url}/traffic?apikey={self.api_key}&location={location}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def interpret_traffic_data(self, traffic_data):
        """Interpret traffic data to determine conditions."""
        # Simplified interpretation logic
        if traffic_data['status'] == 'heavy':
            return "Heavy traffic detected. Expect delays."
        elif traffic_data['status'] == 'moderate':
            return "Moderate traffic ahead. Drive carefully."
        else:
            return "Traffic is light. Enjoy your ride."

# Example usage
if __name__ == "__main__":
    traffic_monitor = TrafficMonitor(api_key='your_traffic_api_key_here')
    location = "your_location_here"  # This should be dynamically set based on user's current location or destination
    traffic_data = traffic_monitor.get_traffic_data(location)
    if traffic_data:
        traffic_conditions = traffic_monitor.interpret_traffic_data(traffic_data)
        print(traffic_conditions)
    else:
        print("Unable to retrieve traffic data.")
