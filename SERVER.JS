

const API_URL = "http://127.0.0.1:8000/crear_lead";

//datos de crm

const crmData = {

    origen: "",
    campaña: "",
    subcampaña: "",
};



function updateProgress(step,total){

    const percent = (step / total) * 100;

    document.getElementById("progressBar").style.width =
        percent + "%";

    document.getElementById("stepText").innerText =
        "Paso " + step + " de " + total;

}

function setQuestion(question,help=""){

    document.getElementById("question").innerText =
        question;

    document.getElementById("help").innerText =
        help;

}

function clearMessages(){

    document.getElementById("successBox").style.display =
        "none";

    document.getElementById("errorBox").style.display =
        "none";

}

function setOptions(options){

    const container =
        document.getElementById("options");

    container.innerHTML = "";

    options.forEach(opt => {

        const wrapper =
            document.createElement("div");

        const button =
            document.createElement("button");

        button.className = "option-btn";

        button.innerText = opt.text;

        button.onclick = opt.action;

        wrapper.appendChild(button);

        if(opt.desc){

            const desc =
                document.createElement("div");

            desc.className = "option-desc";

            desc.innerText = opt.desc;

            wrapper.appendChild(desc);

        }

        container.appendChild(wrapper);

    });

}



function setResult(
    origen,
    campaña,
    subcampaña,
    detalleFuente=""
){

    crmData.origen = origen;

    crmData.campaña = campaña;

    crmData.subcampaña = subcampaña;

    crmData.detalleFuente = detalleFuente;

    document.getElementById("rOrigen").innerText =
        origen;

    document.getElementById("rCampana").innerText =
        campaña;

    document.getElementById("rSubcampana").innerText =
        subcampaña;

    document.getElementById("resultBox").style.display =
        "block";

    document.getElementById("formSection").style.display =
        "block";

    document.getElementById("options").innerHTML = "";

    document.getElementById("question").innerText =
        "Clasificación completada";

    document.getElementById("help").innerText =
        "Captura los datos del cliente";

}



function resetFlow(){

    crmData.origen = "";

    crmData.campaña = "";

    crmData.subcampaña = "";

    document.getElementById("resultBox").style.display =
        "none";

    document.getElementById("formSection").style.display =
        "none";

    document.getElementById("nombre").value = "";

    document.getElementById("apellidoPaterno").value = "";

    document.getElementById("apellidoMaterno").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("correo").value = "";

    document.getElementById("producto").value = "";

    document.getElementById("comentarios").value = "";

    clearMessages();

    start();

}


function start(){

    updateProgress(1,3);

    setQuestion(
        "Vamos a registrar un cliente",
        "Responde las preguntas"
    );

    setOptions([

        {
            text:"Comenzar",
            desc:"Iniciar asistente",
            action:paso1
        }

    ]);

}



function paso1(){

    updateProgress(1,3);

    setQuestion(
        "¿Este cliente ya existía?",
        "Selecciona la opción correcta"
    );

    setOptions([

        {
            text:"Sí",
            desc:"Cliente ya registrado",

            action:() => {

                updateProgress(2,3);

                setQuestion(
                    "¿Regresó sin cita?",
                    "Si volvió sin avisar es BE BACK"
                );

                setOptions([

                    {
                        text:"Sí",
                        desc:"Cliente BE BACK",

                        action:() => {

                            setResult(
                                "BE BACK",
                                "BE BACK",
                                "BE BACK"
                            );

                        }
                    },

                   {
                        text:"No",
                        desc:"Ya estaba en seguimiento",

                        action:() => {

                            document
                            .getElementById("options")
                            .innerHTML = `

                             <button
                                class="reset-btn"
                                onclick="resetFlow()"
                            >
                                Reiniciar Asistente
                            </button>

                            `;

                            document
                            .getElementById("question")
                            .innerText =
                            "No registrar nuevo lead";

                            document
                            .getElementById("help")
                            .innerText =
                            "El cliente ya existe en seguimiento";

                        }
                    }

                ]);

            }

        },

        {
            text:"No",
            desc:"Cliente nuevo",
            action:paso2
        }

    ]);

}


function paso2(){

    updateProgress(2,3);

    setQuestion(
        "¿Cómo llegó el cliente?",
        "Selecciona el origen"
    );

    setOptions([

        {
            text:"Publicidad",
            desc:"Redes sociales o anuncios",
            action:pasoDigital
        },

        {
            text:"Prospección",
            desc:"Lo buscó el asesor",
            action:pasoProspeccion
        },

        {
            text:"Piso",
            desc:"Llegó a la agencia",

            action:() => {

                setResult(
                    "PISO",
                    "PISO",
                    "PISO"
                );

            }

        },

        {
            text:"Cartera",
            desc:"Cliente del asesor",

            action:() => {

                setResult(
                    "CARTERA",
                    "CARTERA",
                    "CARTERA"
                );

            }

        },

        {
            text:"Referido",
            desc:"Cliente recomendado",

            action:() => {

                setResult(
                    "REFERIDO",
                    "REFERIDO",
                    "REFERIDO"
                );

            }

        }

    ]);

}

function pasoDigital(){

    updateProgress(3,3);

    setQuestion(
        "¿Dónde vio el anuncio?",
        "Selecciona el origen digital"
    );

    setOptions([

        {
            text:"Publicidad Marca",
            desc:"Publicidad oficial",

            action:() => {

                setResult(
                    "MARCA",
                    "META",
                    "PUBLICIDAD MARCA"
                );

            }
        },

        {
            text:"Publicidad Agencia",
            desc:"Campañas de agencia",

            action:() => {

                const nombreCampaña =
                prompt(
                    "Escribe el nombre de la campaña"
                );

                setResult(
                    "META",
                    "META ADS",
                    "LEADS",
                    nombreCampaña || "CAMPAÑA"
                );

            }
        },

        {
            text:"Fan Page",
            desc:"Fan page del asesor",

            action:() => {

                const fanpage =
                prompt(
                    "Nombre de la fan page"
                );

                setResult(
                    "FAN PAGE",
                    "FAN PAGE",
                    fanpage || "FAN PAGE"
                );

            }
        }

    ]);

}



function pasoProspeccion(){

    updateProgress(3,3);

    setQuestion(
        "¿Dónde se prospectó?",
        "Selecciona el lugar"
    );

    setOptions([

        {
            text:"Calle",
            desc:"Prospección rápida",

            action:() => {

                setResult(
                    "CALLE",
                    "CALLE",
                    "CALLE",
                );

            }
        },

        {
            text:"Evento",
            desc:"Stand o feria",

            action:() => {

                const evento =
                prompt(
                    "Nombre del evento"
                );

                setResult(
                    "EVENTO",
                    "EVENTO",
                    evento || "EVENTO"
                );

            }
        },

        {
            text:"Fashion Mall",
            desc:"Prospección en Fashion Mall",

            action:() => {

                setResult(
                    "PLAZAS",
                    "PLAZAS",
                    "FASHION MALL"
                );

            }
        },

        {
            text:"Sendero",
            desc:"Prospección en Plaza Sendero",

                action:() => {

                    setResult(
                        "PLAZAS",
                        "PLAZAS",
                        "SENDERO"
                    );

                 }
        }

    ]);

}



async function enviarLead(){

    clearMessages();

    const payload = {

        nombre:
        document.getElementById("nombre").value,

        apellidoPaterno:
        document.getElementById("apellidoPaterno").value,

        apellidoMaterno:
        document.getElementById("apellidoMaterno").value,

        telefono:
        document.getElementById("telefono").value,

        correo:
        document.getElementById("correo").value,

        producto:
        document.getElementById("producto").value,

        comentarios:
        document.getElementById("comentarios").value,

        origen:
        crmData.origen,

        campaña:
        crmData.campaña,

        subcampaña:
        crmData.subcampaña,

        detalleFuente:
        crmData.detalleFuente,

        intencionCompra:
        document.getElementById("intencionCompra").value,

        temperatura:
        document.getElementById("temperatura").value

    };

    console.log(
        "Payload enviado:",
        payload
    );

    document.getElementById("loading")
    .style.display = "block";

    try{

        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(payload)

        });

        const data =
        await response.json();

        document.getElementById("loading")
        .style.display = "none";

        if(data.success === 1){

            document.getElementById("successBox")
            .style.display = "block";

            document.getElementById("successBox")
            .innerHTML =
            "<strong>Lead enviado correctamente</strong>";

        }else{

            document.getElementById("errorBox")
            .style.display = "block";

            document.getElementById("errorBox")
            .innerHTML =
            "<strong>Error:</strong> " +
            (
                data.message ||
                "No se pudo enviar"
            );

        }

    }catch(error){

        document.getElementById("loading")
        .style.display = "none";

        document.getElementById("errorBox")
        .style.display = "block";

        document.getElementById("errorBox")
        .innerHTML =
        "<strong>Error:</strong> " +
        error.message;

    }

}



start();