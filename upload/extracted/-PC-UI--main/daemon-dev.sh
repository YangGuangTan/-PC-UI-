#!/bin/bash
cd /home/z/my-project
export DATABASE_URL="file:./db/custom.db"
export PORT=3000
export HOSTNAME=0.0.0.0

# Start the dev server
node node_modules/.bin/next dev -p 3000 -H 0.0.0.0 &
SERVER_PID=$!

# Wait for the server to be ready
for i in $(seq 1 30); do
  sleep 1
  if node -e "
    const http = require('http');
    const req = http.get('http://127.0.0.1:3000/', (res) => {
      console.log(res.statusCode);
      res.resume();
    });
    req.on('error', () => console.log('error'));
    req.setTimeout(2000, () => req.destroy());
  " 2>&1 | grep -q "200"; then
    echo "Dev server is ready on port 3000"
    break
  fi
done

# Keep the script alive to prevent the server from being killed
wait $SERVER_PID
