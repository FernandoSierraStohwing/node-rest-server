//=================
//=====PUERTO======
//=================
process.env.PORT = process.env.PORT || 3000;

//=================
// ====ENTORNO====
//=================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=================
//VENCIMIENTO TOKEN
//=================
// 60 SEGUNDOS
// 60 MINUTOS
// 24 HORAS
// 30 DIAS
process.env.CADUCIDAD_TOKEN = '48h'


//=====================
//SEED de autenticacion
//=====================
process.env.SEED = process.env.SEED || 'secret-desarrollo'



//=================
//==BASE DE DATOS==
//=================
const urlDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI
process.env.URLDB = urlDB;

//=================
//==GOOGLE CLIENT ID==
//=================

process.envCLIENT_ID = process.envCLIENT_ID || '551897572819-n0pjt2a8i4k1oeuh0k1euvqjt2cg3a8k.apps.googleusercontent.com'

