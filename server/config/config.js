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
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30


//=====================
//SEED de autenticacion
//=====================
process.env.SEED = process.env.SEED || 'secret-desarrollo'



//=================
//==BASE DE DATOS==
//=================
const urlDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI
process.env.URLDB = urlDB;




