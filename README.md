# Request Scheduler & Rate Limiter Simulator

This project simulates how a backend server handles requests under load.

## Concepts simulated
- FIFO request queue
- Worker pool with fixed capacity
- Async request processing
- Rate limiting (requests/sec)
- Overload detection & backpressure

## Why this exists
To understand what happens *inside* a backend server when many users send requests.

## Architecture
- Server engine (pure JS, no React state)
- React UI as an observer
- Dockerized development environment

## How to run
docker build ...
docker run ...
