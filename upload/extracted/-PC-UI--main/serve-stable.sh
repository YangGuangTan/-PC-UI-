#!/bin/bash
# Stable server script with auto-restart
# Uses Python's built-in HTTP server which is more stable in this sandbox
while true; do
  cd /home/z/my-project/out
  python3 -m http.server 3000 --bind 0.0.0.0 2>/dev/null
  sleep 2
done
