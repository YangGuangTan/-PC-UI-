#!/bin/bash
# Watchdog script that keeps restarting the server if it dies
LOG="/tmp/serve-watchdog.log"
while true; do
  cd /home/z/my-project
  node serve-keepalive.js >> "$LOG" 2>&1 &
  PID=$!
  echo "$(date): Started server PID=$PID" >> "$LOG"
  # Wait and check if process dies
  while kill -0 $PID 2>/dev/null; do
    sleep 2
  done
  echo "$(date): Server PID=$PID died, restarting..." >> "$LOG"
  sleep 1
done
