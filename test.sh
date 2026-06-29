#!/usr/bin/env bash
set -e

BASE="http://localhost:3000/api"

pass() { echo "  PASS: $1"; }
fail() { echo "  FAIL: $1"; exit 1; }

check() {
  local label=$1 url=$2 method=${3:-GET} body=$4
  if [ "$method" = "POST" ]; then
    STATUS=$(curl -s -o /tmp/rc_res -w "%{http_code}" -X POST \
      -H "Content-Type: application/json" -d "$body" "$url")
  else
    STATUS=$(curl -s -o /tmp/rc_res -w "%{http_code}" "$url")
  fi
  BODY=$(cat /tmp/rc_res)
  echo "[$STATUS] $label"
  echo "  $BODY"
}

echo ""
echo "=== radiocalico API tests ==="
echo ""

check "Ping backend"        "$BASE/ping-backend"
check "List users (empty)"  "$BASE/users"
check "Create user Alice"   "$BASE/users" POST '{"name":"Alice","email":"alice@example.com"}'
check "Create user Bob"     "$BASE/users" POST '{"name":"Bob","email":"bob@example.com"}'
check "Duplicate email"     "$BASE/users" POST '{"name":"Alice2","email":"alice@example.com"}'
check "Missing fields"      "$BASE/users" POST '{}'
check "List users"          "$BASE/users"

echo ""
echo "=== Done ==="
