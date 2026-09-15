import threading
import time
import uvicorn
import webview

from main import app


def iniciar_api():

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )


api_thread = threading.Thread(
    target=iniciar_api,
    daemon=True
)

api_thread.start()


time.sleep(2)


webview.create_window(
    "CRM Inteligente → SaleU",
    "index.html"
)

webview.start()