import pandas as pd
import json
import sys

def convert():
    print("Iniciando procesamiento...", file=sys.stderr)

    # Excel file path
    csv_path = "C:/Users/juanj/Downloads/candidates.xls"

    # Creats a data frame
    dataFrame = pd.read_excel(csv_path)

    # From data frame to JSON
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

    # Prints the JSON
    print(json.dumps(filtered_data, ensure_ascii=False))

if __name__ == "__main__":
    convert()
