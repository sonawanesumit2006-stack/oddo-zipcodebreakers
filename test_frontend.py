import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def index():
    return """
    <html>
        <head>
            <title>Globe Trotter Phase 2</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; display: flex; gap: 20px; padding: 20px; background-color: #f0f2f5; flex-wrap: wrap; }
                .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; margin-bottom: 20px; }
                h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0; }
                input { width: 100%; padding: 8px; margin: 5px 0 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
                button { width: 100%; padding: 8px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-bottom: 10px; }
                button:hover { background-color: #45a049; }
                button.secondary { background-color: #008CBA; }
                .google-btn { background-color: #4285F4; }
                label { font-size: 0.8em; color: #666; font-weight: bold; }
                #result, #tripsList { margin-top: 20px; padding: 10px; background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 4px; word-wrap: break-word; font-family: monospace; font-size: 0.9em; }
                img.avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #4CAF50; float: right; }
                .trip-item { background: #fff; padding: 10px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px; }
            </style>
        </head>
        <body>
            <!-- AUTH COLUMN -->
            <div style="display:flex; flex-direction:column">
                <div class="card">
                    <h2>1. Login (Email)</h2>
                    <form id="loginForm" onsubmit="handleLogin(event)">
                        <label>Email</label> <input type="email" name="username" required placeholder="john@example.com">
                        <label>Password</label> <input type="password" name="password" required>
                        <button type="submit">Login</button>
                    </form>
                    <a href="http://localhost:8000/auth/google/login"><button class="google-btn">Google Login</button></a>
                </div>
                
                <div class="card">
                    <h2>2. Current User</h2>
                    <div id="avatarContainer"></div>
                    <div id="userInfo">Not logged in</div>
                    <input type="hidden" id="accessToken">
                </div>
            </div>

            <!-- TRIPS COLUMN -->
            <div style="display:flex; flex-direction:column">
                <div class="card">
                    <h2>3. Create Trip</h2>
                    <form id="tripForm" onsubmit="handleCreateTrip(event)">
                        <label>Title</label> <input type="text" name="title" required placeholder="Summer Vacay">
                        <label>Budget</label> <input type="number" name="budget_limit" value="1000">
                        <button type="submit" class="secondary">Create Trip</button>
                    </form>
                </div>

                <div class="card" style="width: 400px;">
                    <h2>4. My Trips</h2>
                    <button onclick="fetchTrips()" class="secondary">Refresh List</button>
                    <div id="tripsList">No trips loaded.</div>
                </div>
            </div>

            <script>
                // --- AUTH ---
                async function handleLogin(e) {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const params = new URLSearchParams(formData);

                    try {
                        const res = await fetch('http://localhost:8000/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: params
                        });
                        if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
                        
                        const json = await res.json();
                        setSession(json);
                    } catch (err) { alert(err.message); }
                }

                function setSession(data) {
                    document.getElementById('accessToken').value = data.access_token;
                    
                    // Display User
                    const user = data.user;
                    const container = document.getElementById('avatarContainer');
                    container.innerHTML = '';
                    if (user.avatar_url) {
                        const img = document.createElement('img');
                        img.src = user.avatar_url.startsWith('http') ? user.avatar_url : 'http://localhost:8000' + user.avatar_url;
                        img.className = 'avatar';
                        container.appendChild(img);
                    }
                    document.getElementById('userInfo').innerHTML = `<strong>${user.name}</strong><br>${user.email}<br>ID: ${user.id}`;
                    
                    // Auto-fetch trips
                    fetchTrips();
                }

                // --- TRIPS ---
                function getHeaders() {
                    const token = document.getElementById('accessToken').value;
                    if (!token) { alert("Please login first!"); return null; }
                    return { 
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    };
                }

                async function handleCreateTrip(e) {
                    e.preventDefault();
                    const headers = getHeaders();
                    if (!headers) return;

                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData.entries());

                    try {
                        const res = await fetch('http://localhost:8000/trips/', {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(data)
                        });
                        if (!res.ok) throw new Error((await res.json()).detail);
                        
                        alert("Trip Created!");
                        fetchTrips(); // Refresh list
                    } catch (err) { alert("Error: " + err.message); }
                }

                async function fetchTrips() {
                    const headers = getHeaders();
                    if (!headers) return;

                    try {
                        const res = await fetch('http://localhost:8000/trips/', { headers: headers });
                        const trips = await res.json();
                        
                        const list = document.getElementById('tripsList');
                        if (trips.length === 0) {
                            list.innerHTML = "No trips found.";
                            return;
                        }
                        
                        list.innerHTML = trips.map(t => `
                            <div class="trip-item">
                                <strong>${t.title}</strong>
                                <span style="float:right; color: #888">$${t.budget_limit}</span>
                                <br><small>ID: ${t.id} | ${t.is_public ? 'Public' : 'Private'}</small>
                            </div>
                        `).join('');
                    } catch (err) { console.error(err); }
                }
            </script>
        </body>
    </html>
    """

@app.get("/google-callback", response_class=HTMLResponse)
def callback(token: str):
    return f"""
    <html>
        <head><title>Success</title></head>
        <body style="font-family: sans-serif; padding: 40px; text-align: center; background-color: #e6fffa;">
            <h1>✅ Google Login Successful!</h1>
            <p>Token: <code>{token}</code></p>
            <script>
                // Quick hack: print to console for manual copying if needed
                console.log("Token:", "{token}");
            </script>
        </body>
    </html>
    """

if __name__ == "__main__":
    print("Running Phase 2 Simulator on http://localhost:5173")
    uvicorn.run(app, host="127.0.0.1", port=5173)
