//CVYR

const express = require('express')

const app = express()

const port = process.env.PORT || 3000

const met = require('./met.js')

const request = require('request')





const objetoDeArte = function(id, callback){
	url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id

	request({ url, json: true }, function(error, response) {
		if ( error ){
			console.log('Connection error')
			callback(error, undefined)
		}

		else {
			const pieza = {
				artist : response.body.constituents[0].name,
  				title: response.body.title,
  				year: response.body.objectEndDate,
  				technique: response.body.medium,
  				metUrl: response.body.objectURL
			}
			callback(undefined, pieza)
		}
	})
}

app.get('/students/:id', function(req, res) {

  	if ( req.params.id == 'A01193217'){  
    	res.send({
         	id: 'A01193217',
    		fullname: 'Javier Marcelo Gutierrez Perez',
    		nickname: 'Javi',
    		age: '23'
            })    
      	}

      else {
      	res.send({
      	error: 'Debes de pasar la matricula como parametro'
    	})
      }
  })

app.get('/met', function(req, res) {

	console.log(req.query.search)

	if ( !req.query.search ) {
    	return res.send({
      	error: 'Debes de pasar un ejemplo correcto'
    	})
  	}

  	met.buscaObjetos( req.query.search, function(error, response){

  		if ( error ){
      		return res.send({
        		error: error
      		})
   		}

   		if ( response.id ){
   			objetoDeArte(response.id, function(error, response) {

   				if ( error ) {
   					return res.send({
                		error: error
              		})
   				}

   				else {
   					if ( response.artist ){
   						res.send({
   							searchTerm: req.query.search,
              				artist : response.artist,
  							title: response.title,
  							year: response.year,
		  					technique: response.technique,
  							metUrl: response.metUrl
            			})
   					}
   					else {
   						return res.send({
                		error: error
              			})
   					}   					
          		}
   			})
   		}
  	})

})





app.get('*', function(req, res) {
  res.send({
    error: 'Ruta no valida'
  })
})


app.listen(port, function() {
  console.log('Good news!')
})