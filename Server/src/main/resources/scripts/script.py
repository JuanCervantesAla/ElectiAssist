# @Author: Juan Cervantes
# @Date: 1/29/2025
# @About: Encrypting the data

import tenseal as ts
import sys
import json

# Config tenseal
context = ts.context(ts.SCHEME_TYPE.CKKS, poly_modulus_degree=8192, coeff_mod_bit_sizes=[60, 40, 40, 60])
context.global_scale = 2**40
context.generate_galois_keys()

# Data to encrypt
data = sys.stdin.read().strip()

dataList = json.loads(data)//From json to list

# Encrypt data
enc_data = ts.ckks_vector(context, dataList)

# Homomorphic operation
enc_result = enc_data * 89

# Decrypt the data in case of
dec_result = enc_result.decrypt()



print("Original data:", data)
print("Encrypted data:", dec_result)
