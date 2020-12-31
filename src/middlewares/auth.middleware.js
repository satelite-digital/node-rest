var admin = require('firebase-admin');

admin.initializeApp({
    apiKey : process.env.FIREBASE_API_KEY,
    authDomain : process.env.FIREBASE_AUTH_DOMAIN,
    projectId : process.env.FIREBASE_PROJECT_ID,
    appId : process.env.FIREBASE_APP_ID
})

module.exports = async (req, res, next)=>{
    if (!req.headers.authorization) {
        // return (unauthorized(...args));
        res.status(401).json('Unauthorized');
        // next()
    } else {
        // get token from headers
        var token = req.headers.authorization;
        
        // Validate token, else, return error
        const decodedToken = await admin.auth().verifyIdToken(token)

        // Check if decoded else return error
        

        next()
    }

}