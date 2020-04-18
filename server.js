const express = require( 'express' );
const app = express()
const path = require( 'path' )
const multer = require( 'multer' )
const upload = multer({dest: `${__dirname}/Client/public/uploads`});
const PORT = process.env.PORT || 5000



app
    .post( '/upload', upload.single( "file" ), ( req, res ) => {
        if ( req.file === undefined || req.file === null ) {
            return res.status(400).json({msg: 'No file uploaded'})
        } else {
            // console.log( req.file )
            res.json({fileName: req.file.originalname, filePath: `/uploads/${req.file.filename}`})
        }


    
})

app.listen( PORT, () => console.log( `server started on port ${ PORT }` ) );