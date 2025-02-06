# @Author: Juan Cervantes
# @Date: 1/29/2025
# @About: Encrypting the data

import tenseal as ts
import sys
import json

# Configurar el contexto de TenSEAL (CKKS)
context = ts.context(ts.SCHEME_TYPE.CKKS, poly_modulus_degree=8192, coeff_mod_bit_sizes=[60, 40, 40, 60])
context.global_scale = 2**40
context.generate_galois_keys()

# Datos a encriptar
data = sys.stdin.read().strip()

dataList = json.loads(data)

# Encriptar los datos
enc_data = ts.ckks_vector(context, dataList)

# Operación homomórfica: multiplicación por 2
enc_result = enc_data * 89

# Descifrar el resultado
dec_result = enc_result.decrypt()



print("Datos originales:", data)
print("Resultado cifrado:", dec_result)
