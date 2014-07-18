var Cookies = require( "cookies" )
var http    = require( "http" )
var uuid    = require( "node-uuid" );

server = http.createServer( function( req, res ) {

    var cookies = new Cookies( req, res )

    if(!cookies.get("uuid")){
        cookies.set( "uuid", uuid.v1())
    }

    if ( req.url == "/collector.gif" ) {
        contentType = 'image/gif'
        content = new Buffer([
            0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
            0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
            0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
            0x02, 0x44, 0x01, 0x00, 0x3b]);
    }else if (req.url == "/collector.js") {
        contentType = 'text/javascript'
        content = 'function collect(){}'
    }else{
        res.writeHead(404)
        return res.end('')
    }

    res.writeHead( 200,
        {
            "Content-Type": contentType
        }
    )
    res.end(content)
})

server.listen(80)