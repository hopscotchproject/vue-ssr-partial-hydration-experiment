# Partial Hydration with Vue

## Introduction
This is an experiment to validate the idea of partial hydration with Vue. The goal is to see if Vue SSR provides the possibility to allow hydrate different partial of a webpage with different Vue/Vue Router instances.

## Servers
* Main renderer server runs on port `8080`
* Proxy server (for demo purpose) runs on port `8081`
* Webpack Dev Server runs on port `8082`
* Helper server (only for dev purpose) runs on `8083`