# OpenArms Project 3 - Redis

## What is OpenArms?
OpenArms is a case management system for social services organizations. It helps case workers manage clients, appointments, cases, services, and referrals.

## What does this project do?
This project extends the OpenArms database from Projects 1 and 2 by adding Redis, an in-memory key-value database. Redis is used to store frequently accessed data for fast retrieval.

We designed 5 Redis features for OpenArms:
1. Appointment Scheduling & Real-Time Access
2. Active Case Tracking (Open Cases Cache)
3. Recently Viewed Clients
4. Available Services Lookup (Cached)
5. Referral Status Tracking (Real-Time Updates)

## What did we implement?
We built a Node + Express + Redis web application that implements the **Recently Viewed Clients** feature. Case workers can view, add, and remove recently accessed clients using a Redis List.

## How to run the app

### Requirements
- Node.js
- Docker (for Redis)
- Redis container running on port 6379

### Steps
1. Start your Redis container in Docker
2. Install dependencies:
```
npm install
```
3. Start the app:
```
npm start
```
4. Open your browser at:
```
http://localhost:3000
```

## File Structure
```
openarms-redis/
├── bin/
│   └── www.js          # Starts the server
├── db/
│   └── myRedisDB.js    # Redis connection and operations
├── routes/
│   └── index.js        # URL route handlers
├── views/
│   ├── index.ejs       # Main page
│   └── error.ejs       # Error page
├── public/
│   └── stylesheets/
│       └── style.css   # CSS styling
├── app.js              # Express app setup
├── package.json        # Project configuration
└── README.md           # This file
```

## Redis Data Structure Used
- **Key:** `staff:{staffId}:recentClients`
- **Type:** List
- **Operations:**
  - `LPUSH` - Add a client to the front of the list
  - `LTRIM` - Keep only the 10 most recent clients
  - `LRANGE` - Read the full list
  - `LREM` - Remove a specific client
  - `DEL` - Clear the entire list

## Video Walkthrough
- Risha's Explanation (Parts 1 + 2): https://northeastern-my.sharepoint.com/:v:/g/personal/bansal_rish_northeastern_edu/IQBhWTD8Kj8hQqDju7rbuQs2AYh-YF_8KGhc6mHj_FZ9s3w?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=Vfb5n0
- Mitya's Explanation (Parts 3 + 4): https://northeastern-my.sharepoint.com/:v:/g/personal/nigam_m_northeastern_edu/IQBsOSprI9PpTKLtlIy_zGSiAXPOAZ6MLvLP2wmynb4ZHA4?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=wbzFLg

## AI Disclosure
Used Claude (claude.ai) to assist with:
- Generating Redis CRUD command examples for Part 3
- Scaffolding the Node + Express + Redis app structure for Part 4
- Writing README documentation

Prompts used:
- "Generate more Redis data structure examples like this..."
- "Help me build a Node + Express + Redis app for recently viewed clients"
