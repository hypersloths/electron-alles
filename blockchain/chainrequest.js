var request = require('request')


var url = 'http://services-uscentral.skytap.com:9054/chaincode';
var id = 23
var invocationBody = function(key, value){
    var body = require('./invoke.json')

    body.invoke.body.params.ctorMsg.args = [key, value]
    id += id
    body.invoke.body.id = id
    return body;
}

var invoke = function(key, value, cb){

    query(key, value, function(err, data){
        if(err) console.error('jerre');

        data.push(value)




        var options = {
            method:'POST',
            url:url,
            json:true,
            body:invocationBody(key, data)

        }


        request(options, function(err, body, res){
            cb(err,data)
        })
    })


}

var queryBody = function (key){
    var body = require('./query.json')
    body.query.body.params.ctorMsg.args = [key];
    id += id
    body.query.body.id = id
    return body
}

var query = function(key, cb){
    var options = {
        method:'POST',
        url:url,
        json:true,
        body:queryBody(key)

    }
    request(options, function(err, body, res){
        cb(err, body)
    })
}

module.exports ={
    write:invoke,
    read:query
}