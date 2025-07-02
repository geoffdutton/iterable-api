# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js wrapper for the Iterable API (`node-iterable-api`), providing a clean interface to interact with Iterable's marketing automation platform. The package wraps Iterable's REST API endpoints into JavaScript methods.

## Architecture

- **Entry Point**: `index.js` - Simple module export that re-exports the main Iterable class
- **Core Library**: `lib/` directory contains the main implementation
  - `iterable.js` - Main factory function that creates client instances with all resource modules
  - `request.js` - HTTP client wrapper using Axios with API key authentication
  - `api.js` - Configuration array defining all available API resources and methods
  - `resources/` - Individual resource modules (users, lists, events, campaigns, etc.)
- **Resource Pattern**: Each resource in `lib/resources/` exports a factory function that accepts a request instance and returns methods for that resource
- **Testing**: Uses Jest with mock implementations in `lib/__mocks__/`

## Development Commands

```bash
# Run tests with coverage and linting
npm test

# Test-driven development (watch mode)
npm run tdd

# List all implemented resources
node index.js
```

## Testing Setup

- Uses Jest as the test framework
- Standard.js for linting (runs automatically with `npm test`)
- Requires `ITERABLE_API_KEY=fake-key` environment variable for tests
- Mock implementations in `lib/__mocks__/request.js`
- Test helper utilities in `test/resources/helper.js`

## API Resource Structure

Resources are defined in `lib/api.js` and follow this pattern:
- **methods**: Direct HTTP methods on the resource (get, post, delete, etc.)
- **actions**: Named actions that map to specific endpoints
- **subResources**: Nested resources with their own methods (e.g., catalogs.items, catalogs.fieldMappings)

Each resource module exports a factory function that:
1. Takes a request instance as parameter
2. Returns an object with methods corresponding to API endpoints
3. Handles URL construction and parameter formatting

## Key Files to Understand

- `lib/api.js:1` - Complete API resource definitions
- `lib/iterable.js:6` - Main client factory function
- `lib/request.js:4` - HTTP client with Iterable API authentication
- `lib/resources/users.js:20` - Example resource implementation pattern