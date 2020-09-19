const signInService = async (ctx) => {
  
  
  try {
    console.log('signinservice@#$#$@#$#@$', ctx.db.user)
    
    // Get user to send data on login
    let user = await ctx.db.user.findOne({
      where : { email : ctx.data.username },
      // include : { Profile : true }
    })
    
    // user = user[0]



      // This is the user object for the Auth service (i.e. cognito)
    const authSignin = {
      client : ctx.auth.client,
      ...ctx.data
    }

    // Sign into Auth service
    console.log('pre signin', 'HOLAAA')
    let result = await ctx.auth.signin(authSignin) 

    console.log('post signin', result)

    // Invalidate previous sessions
    await ctx.db.session.updateMany({
      data : { isAlive : false },
      where : {
        userId : user.id
      }
    })
  
    // Create new session
    let session = await ctx.db.session.create(
      {
        data : {
          refresh_token : result.RefreshToken,
          access_token : result.AccessToken,
          id_token : result.IdToken,
          isAlive : true,
          user : {
            connect : { id : user.id }
          }
        }
    })
    
    // Return session to controller or invoker
    result.session = session;
    session.user = user;
    return session

  } catch(e) {
    return e
  }
}
 
module.exports = {
  signInService
}