#include <stdio.h>
#include <sodium.h>

#define MESSAGE (const unsigned char *) "Hi, this is a string that I want signed, will keep it short"
#define MESSAGE_LEN 56 // Length of the MESSAGE
#define SEED (const unsigned char*)  "Aav6yqemxoPNNqxeKJXMlruKxXEHLD931S8pXzxt4mk="
#define PUBKEY (const unsigned char*) "DsWygyoTcB7/NT5OqRzT0eaFf+6bJBSSBRfDOyU3x9k="

unsigned char pk[crypto_sign_PUBLICKEYBYTES];
unsigned char sk[crypto_sign_SECRETKEYBYTES];
unsigned char signed_message[crypto_sign_BYTES + MESSAGE_LEN];
unsigned long long signed_message_len;

void runTest(const unsigned char* message, unsigned long long message_len) {
  // Signing the message
  if (crypto_sign(signed_message, &signed_message_len, message, message_len, sk) != 0) {
      printf("Failed to sign the message\n");
      return;
  }

  // Verifying the signed message multiple times
  for (int i = 0; i < 5000; i++) {
    unsigned char unsigned_message[MESSAGE_LEN];
    unsigned long long unsigned_message_len;
    if (crypto_sign_open(unsigned_message, &unsigned_message_len, signed_message, signed_message_len, pk) != 0) {
        printf("Incorrect signature\n");
    } else {
        // printf("Correct signature\n");
    }
  }
}

int main() {
  // Initialize libsodium
  if (sodium_init() < 0) {
      printf("Failed to initialize libsodium\n");
      return 1;
  }

   // Check for AES-NI support
    if (sodium_runtime_has_aesni()) {
        printf("AES-NI is supported and enabled.\n");
    } else {
        printf("AES-NI is not supported.\n");
    }

  // Generate key pair
  crypto_sign_keypair(pk, sk);

  // Run the test
  for (int i = 0; i < 5; i++) {
    runTest(MESSAGE, MESSAGE_LEN);
  }

  return 0;
}

