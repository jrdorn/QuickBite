## Introduction

QuickBite is a Node.js CLI app provides directions to five restaurants within walking distance to the user.

I drew design inspiration from TechCrunch ASCII art and from dialog boxes in the 1994 RPG EarthBound.

## Status

This project is under development. Future updates will include new ASCII animations, the option to send directions via SMS, and local storage for direction search results.

## Features

- Find user address via WiFi trilateration
- Communicate with [server-side REST API](https://github.com/jrdorn/quickbite-server) to get walking directions to five local restaurants
- Print directions to screen, send to email, or save as text file

## Technologies

QuickBite is created with:

- Node.js
- Express
- Google Maps API

## Installation

Install via NPM:

```
npm install quickbite -g
```

## Usage

![intro](https://github.com/jrdorn/QuickBite/blob/main/img/s01.png?raw=true)

![get_MAC_address](https://github.com/jrdorn/QuickBite/blob/main/img/s02.png?raw=true)

![choose_restaurant](https://github.com/jrdorn/QuickBite/blob/main/img/s03.png?raw=true)

![view_save_send](https://github.com/jrdorn/QuickBite/blob/main/img/s04.png?raw=true)
