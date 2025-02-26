import pandas as pd
import json
import sys

def convert():
    print("Iniciando procesamiento...", file=sys.stderr)

    # Ruta del archivo Excel
    csv_path = "C:/Users/juanj/Downloads/candidates.xls"

    # Crear un DataFrame desde el archivo Excel
    dataFrame = pd.read_excel(csv_path)

    # Convertir el DataFrame a JSON
    filtered_data = [
        {
            "NOMBRE_CANDIDATO": item.get("NOMBRE_CANDIDATO"),
            "PARTIDO_COALICION": item.get("PARTIDO_COALICION"),
            "CARGO": item.get("CARGO"),
            "NUM_LISTA_O_FORMULA": item.get("NUM_LISTA_O_FORMULA"),
            "EDAD": item.get("EDAD"),
            "SEXO": item.get("SEXO"),
            "PROPUESTA_1": item.get("PROPUESTA_1"),
            "PROPUESTA_2": item.get("PROPUESTA_2"),
        }
        for item in dataFrame.to_dict(orient="records")
    ]

    # Imprimir el JSON en sys.stdout (para que lo capture Java)
    print(json.dumps(filtered_data, ensure_ascii=False))

if __name__ == "__main__":
    convert()
