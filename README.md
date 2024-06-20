
Benchmarking node sodium libraries compared to tweetnacl and also in C

Install

./build.sha

Run

./run.sh

Resuls on an Intel Gold 6226R

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

