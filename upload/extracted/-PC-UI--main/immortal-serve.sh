#!/bin/sh
while true; do
  cd /home/z/my-project/out
  python3 -m http.server 3000 --bind 0.0.0.0 2>/dev/null
  sleep 1
done
