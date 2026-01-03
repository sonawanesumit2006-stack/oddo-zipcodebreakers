import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def index():
    return """
    <html>
        <head>
            <title>Globe Trotter Auth Test</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; display: flex; gap: 20px; justify-content: center; padding: 50px; background-color: #f0f2f5; }
                .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; }
                h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
                input { width: 100%; padding: 8px; margin: 5px 0 15px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
                button { width: 100%; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
                button:hover { background-color: #45a049; }
                .google-btn { background-color: #4285F4; margin-top: 10px; }
                .google-btn:hover { background-color: #357ae8; }
                label { font-size: 0.9em; color: #666; font-weight: bold; }
                #result { margin-top: 20px; padding: 10px; background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 4px; display: none; word-wrap: break-word; }
                img.avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-top: 10px; border: 2px solid #4CAF50; }
            </style>
        </head>
        <body>
            <!-- REGISTER FORM -->
            <div class="card">
                <h2>Register</h2>
                <!-- enctype required for file upload -->
                <form id="registerForm" onsubmit="handleRegister(event)" enctype="multipart/form-data">
                    <label>Name</label> <input type="text" name="name" required placeholder="John Doe">
                    <label>Username</label> <input type="text" name="username" required placeholder="johndoe">
                    <label>Email</label> <input type="email" name="email" required placeholder="john@example.com">
                    <label>Password</label> <input type="password" name="password" required>
                    <label>Bio (Optional)</label> <input type="text" name="bio" placeholder="I love travel">
                    <label>Home City (Optional)</label> <input type="text" name="home_city" placeholder="New York">
                    
                    <label>Profile Picture (Optional)</label> 
                    <input type="file" name="avatar_file" accept="image/*">
                    
                    <button type="submit">Register</button>
                    <div id="registerMsg"></div>
                </form>
            </div>

            <!-- LOGIN FORM -->
            <div class="card">
                <h2>Login</h2>
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <!-- We label it Email, but the API expects 'username' key for OAuth2 -->
                    <label>Email</label> <input type="email" name="username" required placeholder="john@example.com">
                    <label>Password</label> <input type="password" name="password" required>
                    <button type="submit">Login</button>
                </form>
                
                <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
                
                <!-- GOOGLE LOGIN -->
                <a href="http://localhost:8000/auth/google/login" style="text-decoration:none;">
                    <button type="button" class="google-btn">Sign in with Google</button>
                </a>
            </div>

            <!-- TOKEN DISPLAY -->
            <div class="card">
                <h2>Results</h2>
                <div id="result">
                    <strong>Logged in!</strong>
                    <div id="avatarContainer"></div>
                    <p style="font-size: 0.8em">Token:</p>
                    <code id="tokenDisplay"></code>
                    <p style="font-size: 0.8em; margin-top: 10px;">User:</p>
                    <pre id="userDisplay" style="font-size: 0.8em; text-align: left; overflow-x: auto;"></pre>
                </div>
            </div>

            <script>
                async function handleRegister(e) {
                    e.preventDefault();
                    // FormData automatically handles file input
                    const formData = new FormData(e.target);
                    
                    try {
                        const res = await fetch('http://localhost:8000/register', {
                            method: 'POST',
                            // Do NOT set Content-Type header when using FormData with files; browser sets boundary
                            body: formData 
                        });
                        const json = await res.json();
                        if (!res.ok) throw new Error(json.detail || "Registration failed");
                        
                        alert(JSON.stringify(json, null, 2));
                    } catch (err) {
                        alert("Error: " + err.message);
                    }
                }

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
                        if (!res.ok) {
                            const err = await res.json();
                            throw new Error(err.detail || "Login failed");
                        }
                        
                        const json = await res.json();
                        document.getElementById('result').style.display = 'block';
                        document.getElementById('tokenDisplay').innerText = json.access_token.substring(0, 20) + "...";
                        document.getElementById('userDisplay').innerText = JSON.stringify(json.user, null, 2);
                        
                        // Display Avatar if exists
                        const container = document.getElementById('avatarContainer');
                        container.innerHTML = '';
                        if (json.user.avatar_url) {
                            // Backend returns /static/..., ensuring it points to localhost:8000
                            const img = document.createElement('img');
                            // Handle absolute vs relative URLs (Google Auth is absolute, Uploads are relative)
                            const src = json.user.avatar_url.startsWith('http') 
                                ? json.user.avatar_url 
                                : 'http://localhost:8000' + json.user.avatar_url;
                            img.src = src;
                            img.className = 'avatar';
                            container.appendChild(img);
                        }
                    } catch (err) {
                        alert(err.message);
                    }
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
            <p>Check the console or your backend for user details created/retrieved.</p>
        </body>
    </html>
    """

if __name__ == "__main__":
    print("Running extended frontend simulator on http://localhost:5173")
    uvicorn.run(app, host="127.0.0.1", port=5173)
