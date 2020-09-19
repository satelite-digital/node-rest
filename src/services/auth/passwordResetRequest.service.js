const passwordResetRequestService = async (ctx)=>{

    try{    

        const REDIRECT_URL = 'https://satelite.digital'
        const requestParams = {
            "client" : ctx.auth.client,
            "username" : ctx.user.email,
            "redirect" : REDIRECT_URL
        }

        const response = await ctx.auth.forgotPassword(requestParams)

        return response

    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    passwordResetRequestService
}