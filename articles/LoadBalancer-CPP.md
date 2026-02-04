---
title: High Performance - Load Balancer in C++
category: Coding
date: 04-02-2026
---
# High Performance - Load Balancer in C++

This project is a Layer 7 (Application Layer) load balancer that functions as a reverse proxy for HTTP/S traffic. It distributes incoming requests across a pool of backend servers using various balancing algorithms.


We'll try to implement the following functionalities for our load balancer:
- Core Load Balancing - Round Robin and Least Connection Strategy
- Metrics and Logging
- Background health checks of our application servers
- Dynamic Setup - TOML config driven approach
- Hot Reloading with zero downtime

## 1. Core Load Balancing:
This section will focus on core logic of load balancing strategies:
a. Round robin strategy
b. Least connection strategy

### a. Round Robin Strategy:
- eg: let's say we have 3 application servers to which we distribute the traffic
- we'll take the first request and send it to the first server, then the second request to second server, and the 3rd request to 3rd server, and again the next request will be directed towards the first server.
- in this cyclical manner we'll handle all the requests and distribute them equally.

### b. Least Connection Strategy:
- we'll have to keep the record of how many requests are sent to a particular server.
- Using that data we'll redirect the request to the server which has least amount of connection attached to it.

#### LLD Implementation:
##### strategy Pattern:

IRouteStrategy -> [RoundRobinStrategy, LeastConnectionStrategy]

![Strategy Pattern](/Strategy-Pattern.png)

---
## 2. Metrics & Logging:
We need to implement this without touching the core logic and structure of our Load Balancer
- we can use decorator pattern so that we do not edit our core logic
- we can implement this as a wrapper to our core functionality


#### LLD Implementation:
##### Decorator Pattern:

![Decorator Pattern](/Decorator-Pattern.png)

---

## 3. Background Health Checks:
Employs multi-threaded, asynchronous health checks (healthChecker.cpp) to continuously monitor backend servers. Automatically removes unhealthy servers from the rotation and re-adds them upon recovery.
- Maintain a list of **Healthy** and **Un-Healthy Servers**
- Check for **heartbeats** from the application servers.
- If we receive the heartbeat then let the server stay in healthy servers list otherwise move it to unhealthy servers list

---

## 4. Dynamic Setup: TOML Config:
- Implement config reading by using a TOML parser (toml++).
- TOML config keeps all settings, including server pools and algorithms, are managed via a TOML file (tomlParser.cpp).

---

## 5. Hot Reloading:
- To implement Hot reloading we'll need to keep a watch on file changes.
- On a unix environment we can use EFSW file watcher library to look for any changes in our config file.

---
You can check out the code on github: [LoadBalancer-CPP](https://github.com/harshal24-chavan/LoadBalancer-CPP)