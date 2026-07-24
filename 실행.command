#!/bin/bash
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "의존성 설치 중..."
  npm install
fi

npm run dev &
DEV_PID=$!

echo "서버 시작 대기 중..."
until curl -s -o /dev/null http://localhost:9003; do
  sleep 0.5
done

open http://localhost:9003

wait $DEV_PID
