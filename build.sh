#!/bin/sh

sudo apt install libsodium-dev
npm install
gcc -o benchsign benchsign.c -lsodium
