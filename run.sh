#!/bin/bash

time node --no-warnings bench-libsodium.js
time node --no-warnings bench-sodium.js
time node --no-warnings bench-sodiumnative.js
time node --no-warnings bench-tweetnacl.js

