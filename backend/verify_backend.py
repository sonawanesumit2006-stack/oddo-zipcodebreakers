import urllib.request
import urllib.parse
import json
import ssl

BASE_URL = "http://localhost:8000"

def verify():
    # 1. Register (Skip multipart complexity, assume user exists or use simpler flow if possible)
    # Since multipart in urllib is verbose, let's try just LOGIN assuming the user from previous steps exists
    # If login fails, we know we need to register.
    
    print("Logging in...")
    login_data = urllib.parse.urlencode({"username": "test@example.com", "password": "password123"}).encode()
    req = urllib.request.Request(f"{BASE_URL}/login", data=login_data, method="POST")
    
    try:
        with urllib.request.urlopen(req) as response:
            res_json = json.loads(response.read().decode())
            token = res_json["access_token"]
            print("Login successful.")
    except urllib.error.HTTPError as e:
        print(f"Login failed: {e.code} {e.read().decode()}")
        # If 403, maybe not registered. But constructing multipart in pure python stdlib is pain.
        # Let's hope the user exists or I can use the CURL command via subprocess if needed.
        # Actually, let's just abort if login fails, as I can't easily do multipart register here.
        return

    # 3. Create Trip
    print("Creating Trip...")
    trip_payload = {
        "destination": "Goa",
        "start_date": "2025-12-01",
        "end_date": "2025-12-05",
        "travelers": 4,
        "budget": 5000.0
    }
    
    req = urllib.request.Request(
        f"{BASE_URL}/trips/", 
        data=json.dumps(trip_payload).encode(),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            trip_data = json.loads(response.read().decode())
            print(f"Create Trip Response: {trip_data.get('id')}")
    except urllib.error.HTTPError as e:
        print(f"Create Trip Failed: {e.code} {e.read().decode()}")
        return

    # 4. Get Trip Details (Test Eager Load & total_spent)
    trip_id = trip_data.get('id')
    req = urllib.request.Request(f"{BASE_URL}/trips/{trip_id}")
    req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req) as response:
            details_data = json.loads(response.read().decode())
            print(f"Trip Details Keys: {list(details_data.keys())}")
            print(f"Total Spent (Computed): {details_data.get('total_spent')}")
    except urllib.error.HTTPError as e:
        print(f"Details Error: {e.read().decode()}")

    # 5. Get Trip Stats
    req_stats = urllib.request.Request(f"{BASE_URL}/trips/{trip_id}/stats")
    req_stats.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req_stats) as response:
            stats_data = json.loads(response.read().decode())
            print(f"Trip Stats: {stats_data}")
    except urllib.error.HTTPError as e:
        print(f"Stats Error: {e.read().decode()}")
        print(f"Stats Error Code: {e.code}")

if __name__ == "__main__":
    # Create ssl context if needed (not for localhost http)
    verify()
