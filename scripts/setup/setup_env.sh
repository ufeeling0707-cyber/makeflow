#!/bin/bash

ensure_env_value() {
  local key="$1"
  local value="$2"

  if ! grep -q "^${key}=" .env; then
    printf "%s=%s\n" "$key" "$value" >> .env
  fi
}

# Create a .env if it doesn't exist and keep MakeFlow's local defaults stable.
if [ ! -f .env ]; then
  echo "Creating .env file"
  touch .env
fi

ensure_env_value "LANGFLOW_AUTO_LOGIN" "false"
ensure_env_value "LANGFLOW_SUPERUSER" "admin"
ensure_env_value "LANGFLOW_SUPERUSER_PASSWORD" "makeflow"
ensure_env_value "LANGFLOW_CACHE_TYPE" ""
ensure_env_value "DEFAULT_FOLDER_NAME" "Project"
