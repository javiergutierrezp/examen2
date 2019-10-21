//CVYR

const request = require('request')


const buscaObjetos = function(keyword, callback) {
	console.log('entro a los objetos')

	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + keyword
	console.log(url)

	request({ url, json : true }, function(error, response){

    	if (error){
      		console.log("Connection error")
      		callback(error, undefined)
    	}

    	else{

    		if (response.body.total == 0){
    			console.log('No se encontrarion elementos')
    			callback('No se encontraron elementos', undefined)
    		}
    		else {
    			console.log(response.body.objectIDs)
    			const identificacion = {
    				id: response.body.objectIDs[0]
    			} 
    			callback(undefined, identificacion)
    		}
    	}
	})
}

module.exports = {
	buscaObjetos: buscaObjetos
}