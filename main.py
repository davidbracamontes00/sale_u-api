from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import requests
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



SALEU_URL = "https://api.sale-u.com/v1/ConexionTerceros/GenerarLeadAPIJSONAgenciaAPS.php"

AUTHORIZATION_TOKEN = "1633fbfc54a2ff34f32e3f3f5a7d9c4534da5721cc28d3cb8103e4a719"

SECRET_TOKEN = "e44959061707c7a9871897ea0c44b0ee39b58a30be559c41b438f702c4"

AGENCIA = "MGCHIH0478"


# MODELO DE DATOS

class LeadData(BaseModel):

    nombre: str
    apellidoPaterno: str = ""
    apellidoMaterno: str = ""
    telefono: str
    correo: str = ""
    producto: str
    comentarios: str = ""

    origen: str
    campaña: str
    subcampaña: str
    

    intencionCompra: str = ""
    temperatura: str = "1"


# FUNCION PRINCIPAL

@app.post("/crear_lead")
def crear_lead(data: LeadData):

    try:

        timestamp_api = datetime.now().strftime("%Y/%m/%d %H:%M:%S")

        timestamp_normal = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        lead_id = f"{data.telefono}_{datetime.now().strftime('%Y%m%d%H%M%S')}"

        payload_saleu = {

            "infoAuthApp": {

                "sSecretTokenApp": SECRET_TOKEN,

                "tmTimeStampSol": timestamp_api

            },

            "infoAuthUsu": [],

            "infoJSON": {

                "sTituloLead":
                    f"Lead Web {data.producto}",

                "sEmail":
                    data.correo,

                "sNombre":
                    data.nombre,

                "sApellidoPaterno":
                    data.apellidoPaterno,

                "sApellidoMaterno":
                    data.apellidoMaterno,

                "sNumTelefono":
                    data.telefono,

                "sMensaje":
                    data.comentarios,

                "sProducto":
                    data.producto,

                "AgAgencia":
                    AGENCIA,

                "sIDLeadSistema":
                    lead_id,

                "sFuenteLead":
                    data.origen,


                "sTipoLead":
                    "Cotizacion",

                "sAreaEnvioPrs":
                    "Ventas",

                "sIntencionCompra":
                    data.intencionCompra,

                "sGenero":
                    "",

                "tmFechaCita":
                    timestamp_normal,

                "tmFechaPrueba":
                    None,

                "sEdad":
                    "",

                "sMetodoPago":
                    "",

                "bApartado":
                    "0",

                "sCampanaLead":
                    data.campaña,

                "sSubCampanaLead":
                    data.subcampaña,

                "sUTM":
                    "",

                "sUTMSource":
                    None,

                "sUTMMedium":
                    None,

                "sUTMContent":
                    None,

                "sUTMCampaign":
                    None,

                "iTemperatura":
                    data.temperatura

            }

        }

        headers = {

            "Authorization": AUTHORIZATION_TOKEN,

            "Content-Type": "application/json"

        }

        print("\n==============================")
        print("ENVIANDO LEAD A SALEU")
        print("==============================")
        print(payload_saleu)

        response = requests.post(

            SALEU_URL,

            json=payload_saleu,

            headers=headers,

            timeout=30

        )

        print("\n==============================")
        print("RESPUESTA SALEU")
        print("==============================")

        print("STATUS CODE:")
        print(response.status_code)

        print("\nHEADERS:")
        print(response.headers)

        print("\nTEXTO CRUDO:")
        print(response.text)

        try:

            json_response = response.json()

            print("\nJSON DECODIFICADO:")
            print(json_response)
            return json_response
        except Exception as json_error:

            print("\nNO SE PUDO DECODIFICAR JSON")
            print(str(json_error))

    except Exception as e:

        print("\nERROR:")
        print(str(e))

        return {

            "ok": False,

            "message": str(e)

        }



@app.get("/")
def home():

    return {

        "status": "API funcionando correctamente"

    }


