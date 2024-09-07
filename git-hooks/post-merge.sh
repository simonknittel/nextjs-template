#!/bin/sh

# Automatically install correct Node.js version after `git pull`
NVMRC_REGEX="^.nvmrc$"
NVMRC_MATCHES=("$(git diff --name-only HEAD@{1} HEAD | grep -E "$NVMRC_REGEX")")
if [[ ${NVMRC_MATCHES[@]} ]]; then
	nvm install
fi

# Automatically install correct npm dependencies after `git pull`
PACKAGE_LOCK_REGEX="^package-lock\.json$"
PACKAGE_LOCK_MATCHES=("$(git diff --name-only HEAD@{1} HEAD | grep -E "$PACKAGE_LOCK_REGEX")")
if [[ ${PACKAGE_LOCK_MATCHES[@]} ]]; then
	npm ci --prefer-offline
fi
