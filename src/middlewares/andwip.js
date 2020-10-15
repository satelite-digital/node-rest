const parseWhere = function(parsed, query, key){
    console.log('query', query)
    console.log('key', key)
  
    // try{
      // Check if parsed already has where or create
      if(!parsed.where){
        parsed.where = {};
      }
      let AND = false
      if(query[key].indexOf('[AND]')){
        AND = true
      }
  
      // get field i.e. other, name
      let field = key.split("-")[1];
      
      if(AND){
        parsed.where['AND'] = []
      }else{
        parsed.where[field] = {};
      }
    
      if(AND){
        query[key] = query[key].split('[AND]')
      }else{
        query[key] = [ query[key] ]
      }
  
      for(value in query[key]){
          // if query[key][value] is indexOf startsWith, endsWith, contains or is (only value )
        // add value to where
        if ( (query[key][value].indexOf("startsWith:") != -1)
        || (query[key][value].indexOf("endsWith:") != -1)
        || (query[key][value].indexOf("contains:") != -1)
        || (query[key][value].indexOf("gte:") != -1)
        || (query[key][value].indexOf("gt:") != -1)
        || (query[key][value].indexOf("lt:") != -1)
        || (query[key][value].indexOf("lte:") != -1)
        || (query[key][value].indexOf("notIn:") != -1)
        || (query[key][value].indexOf("in:") != -1)
        || (query[key][value].indexOf("not:") != -1)
        || (query[key][value].indexOf("equals:") != -1)){
          let tmp = {};
          // Date parsing fix split
          let splitValue = [];
          splitValue[0] = query[key][value].split(':')[0]
          splitValue[1] = query[key][value].split(':').slice(1).join(':')
          // Boolean parsing
          if(splitValue[1] === 'true'){
            splitValue[1] = true
          }
          if(splitValue[1] === 'false'){
            splitValue[1] = false
          }
          // Date parsing fix split
          if(splitValue.length > 2){
            splitValue[1] = `${splitValue[1]}:${splitValue[2]}`
          }
          tmp[splitValue[0]] = splitValue[1];
          if(AND){
            parsed.where.AND.push({ [field] : tmp })
          }else{
            console.log('aqui')
            parsed.where[field] = tmp;
          }
        }else{
          // Boolean parsing
          if(query[key][value] === 'true'){
            query[key][value] = true
          }
          if(query[key][value] === 'false'){
            query[key][value] = false
          }
          
          if(AND){
          parsed.where[field].AND = query[key][value];
          }else{
            parsed.where[field] = query[key][value];
          }
        }
      
      }
  
    // }catch(e){
    //   throw new Error(e)
    // }
    console.log(parsed)
    return parsed
  }
  
  const parseSelectInclude = function(parsed, query, key){
    try{
      // Check if parsed already has where or create
      if(!parsed[key]){
        parsed[key] = {};
      }
      // get fields
      let fields = query[key].split(",");
      for(field in fields){
        parsed[key][fields[field]] = true;
      }
    }catch(e){
      throw new Error(e)
    }
    return parsed
  }
  
  const parseOrderBy = function(parsed, query, key){
    try{
      let order;
      if(query[key].indexOf(':')){
        let split = query[key].split(':')
        order = split[0]
        query[key] = split[1]
      }else{
        order = true
      }
      parsed[key] = {};
      parsed[key][query[key]] = order;
    }catch(e){
      throw new Error(e)
    }
    return parsed
  }
  
  module.exports = async function(req, res, next) {
  
    let query = req.query;
  
    let parsed = {};
    let keys = Object.keys(query);
    
    for(i in keys){
      let key = keys[i];
      if (key.indexOf("where-") != -1){
        parsed = parseWhere(parsed, query, key)
      }else if (key == "select" || key == "include"){
        parsed = parseSelectInclude(parsed, query, key)
      }else if(key == "orderBy"){
        parsed = parseOrderBy(parsed, query, key)
      }else if(  key == "take" || key == "skip"){
        try{
          parsed[key] = query[key];
        }catch(e){
          throw new Error(e)
        }
      }else if(  key == "groupBy" ){
          console.log("groupBy:", query[key])
      }
      
    }
    
  
    req._query = parsed
    
    next();
  };
  
  