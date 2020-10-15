'use strict';
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const data = {
  "keys": [
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "SEVRfPGQ3PH+hjDzY9HF03OLDGc9szEmq0OJVqhE2BA=",
      "kty": "RSA",
      "n": "tkgdHuBbliaNNpHWX0j2JX_O-vLwTCqUiOIya7sPi6Jrh6LDO7H7__FD5kByrIE8w5vYwZMZOLnWwnQ2v_cLr-49D3VVCsMDf7j-a7rxT9daNCXhoAz2wHWvt3dK4T_JCUJctQ26Ik8E_HbLMJxzXH-6PU5-uBQpyxmx31p5Sq4Xfy5lRxAU_d5yabSPi4UoGi3j-1CHz0uZEhz2lTxnUW-58LvTgOKai2bik8uFJQLsi5S1bsBvU6KWesMg_WIKEn_9gBR3YRtTudj2HerOFKTBnYg3S5I-5x_Nmc0E5VlXRIoTUlLu5KzwqQPF2GLkaHMVOsWAjg_GyABn1dVKxw",
      "use": "sig"
    },
    {
      "alg": "RS256",
      "e": "AQAB",
      "kid": "lNit4/cM8iSptgGqQpOjs35Qu7yrYD/5dpsePiDemNg=",
      "kty": "RSA",
      "n": "lF_Mmvlhid_tXbn-aFHrHvoOwJGxpZFGSKhjN4Uw92yPENMLXN2q_4wGeZHT2hGKTXuM3N6Mlq_MXlyoUoHCN_Wgjs6Adi5NFv3l0PehZsFwiMhSQMLq8Z2zraRKEBeIFPWX4m6hMMM4HocGvBAsqSUJQPYD526gFi68AGos99ip7WHMmFNgKKHeFaP9EX2ymXSBjNTxBIU14fXTzcm1gLVPw2RlmGkZFZjaC4Nimwje2SuAQo-RRY-hfxzDZQdepjNHLiZ3R8OLa0oOntslmiRD10fABai4W-0e_7J8yrX9yhADw4rdujRZTc188iaD6iwVuvNf5nWmQ1dX5Yelow",
      "use": "sig"
    }
  ]
}
  
const pem = jwkToPem(data.keys[0]);
const TOOLS = require('./../lib/sdk/index');
const cognito = new TOOLS.COGNITO();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// se requiere acceso a la base de datos para obtener acceso a las sesiones del usuario
// const connectToDatabase = require('../_db/instance');

const DeviceDetector = require("device-detector-js");
const {
    v5: uuidv5
} = require('uuid');
module.exports = (req, res, next) => {

    // const [req, res, next] = args;
    // res.removeHeader('session-refresh');
    if (!req.headers.authorization) {
        // return (unauthorized(...args));
        res.status(401).json('Unauthorized x');
        // next()
    } else {
        var token = req.headers.authorization;
        
        jwt.verify(token, pem, {
            algorithms: ['RS256']
        }, async function (err, decoded) {

            let query = {
                where: {
                    id_token: token
                },
                include : {
                    user : true
                }
            };

            let userSession = await prisma.session.findMany(query);

            req.session = userSession[0]
            //SI EL ERROR DEL TOKEN NO ES POR EXPIRACION retorna error
            if (err && err.name != 'TokenExpiredError') {
                // return (unauthorized(...args))
                res.status(401).json('Unauthorized y');
                // next()
            } 
            // SI LA RAZON DEL ERR TOKEN ES POR EXPIRACION HAY QUE OBTENER UNO NUEVO
            if (err && err.name == 'TokenExpiredError') {
            // if (true) {
                
                decoded = jwt.decode(token);
                
                let query = {
                    where: {
                        id_token: token
                    },
                    include : {
                        user : true
                    }
                };

                let session = await prisma.session.findMany(query);

                
                
                
                //SI LA SESSION EXISTE OBTENGO EL REFRESHTOKEN DE LA SESSION Y SOLICITO NUEVOS TOKENS (YA QUE ESTAMOS AQUÍ POR QUE EL ERROR ES LA EXPIRACION)
                if (session) {
                    let a = {refreshToken:session[0].refresh_token, client : req.ctx.auth.client};
                    
                    cognito.refreshToken(a)
                    .then(async newtoken => {
                        //aqui elimino la session actual y creo una nueva
                        await prisma.session.updateMany({
                            where : {
                                id_token : token
                            },
                            data : {
                                isAlive : false
                            }
                        });
                        // este es el objeto para la nueva sesión
                        let newSession = {
                            refresh_token: session[0].refresh_token,
                            access_token: newtoken.AccessToken,
                            id_token: newtoken.IdToken,
                            isAlive: true,
                            user: { connect : { id : session[0].userId } }
                        }
                        await prisma.session.create({ data : newSession })
                        res.set('Refresh-Session', newtoken.IdToken);
                        res.set('Access-Control-Expose-Headers', 'Refresh-Session');
                        req.headers.decoded = decoded;
                        next()
                    })
                    .catch(err => {
                        console.log('catch', err)
                        res.set('Restart-Session', true);
                        res.status(401).json(err.name)
                        // next()
                    });
                  
                } else {
                    res.status(401).json(err.name)
                    // next()
                }
            } else {
                req.headers.decoded = decoded;
                next()
            }
        });
    }
}