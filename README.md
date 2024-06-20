
# Benchmarking node sodium libraries compared to tweetnacl and also in C

The goal of this benchmark has been to test alternative singature verification libraries for the cryptpad project https://cryptpad.org, as it is the most heavy task in terms of CPU on the server.

## Install

./build.sha

## Run

./run.sh

## Resuls on an Intel Gold 6226R

./run.sh 
 - testing libsodium 10 rounds of 5000 signatures

real    0m7.554s
user    0m7.588s
sys     0m0.060s
 - testing sodium 10 rounds of 5000 signatures

real    0m3.362s
user    0m3.387s
sys     0m0.040s
 - testing sodium-native 10 rounds of 5000 signatures

real    0m3.461s
user    0m3.505s
sys     0m0.024s
 - testing tweetnacl 10 rounds of 5000 signatures

real    1m28.845s
user    1m52.551s
sys     0m28.910s

time ./benchsign 
Testing libsodium cpp 10 rounds of 5000 signatures
AES-NI is supported and enabled.
AVX2 is not supported.

real    0m3.158s
user    0m3.152s
sys     0m0.004s

Also the cpp test was done with a specially compiled version of libsodium without assembly code (so without any hardware acceleration) and the results were similar. It seems hardware acceleration is not useful for signature verification.

## Summary

- sodium-native would be the best for server (at least 30x faster than tweetnacl) and the library seems quite active
- libsodium for client (2x slower though, but at least 15x faster than tweetnacl) as it is in webassembly.
- sodium-native is only 10% slower than pure C.

These measures are without overhead in the cryptpad context. A load test showed a reduction of 5x in terms of CPU of the workers handling the signature verification.
