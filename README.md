# San vs Moon

Game project testing the possibility of hosting `websocket` on VPS.

[![Screen](https://github.com/bbrojson/galvanize/blob/trunk/screenshot.png)](https://galvanize-ecru.vercel.app/)

## Overview

This project is a simple one-button game where user can choose between **Sun** or **Moon**. The game uses a **State Machine** for managing transitions between different states.

## Hosting

The application is self-hosted on an **Ubuntu** server using **PM2** for process management, ensuring the game runs as a persistent service without the need for cloud-based services.

## Stack

- VPS, ubuntu
- nginx
- pm2
- nodejs
- nextjs
