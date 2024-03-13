const express= require('express');
const cors = require('cors');
const app = express();
const mongoose  = require('mongoose');
const User = require('./models/user');
const Place = require('./models/place');
require('dotenv').config();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser= require('cookie-parser')
const imageDownloader=require('image-downloader');
const path = require('path');
const multer= require('multer');
const fs= require('fs');

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='hvghvjhjnkbhjbh56yft';

// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:5173', 
    //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    // optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//to view uploaded image
app.use('/uploads', express.static(__dirname + '/uploads'));


mongoose.connect(process.env.MONGO_URL);

app.get('/test',(req,res)=>{
    res.json('Test ok');
});

app.post('/register', async (req,res)=>{
    console.log('hello i am register...');
    const {name,email,password}=req.body;

    try{
        const userDoc= await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userDoc);
    }catch(e){
        console.log('Registration Failed');
    }
});



app.post('/login', async (req, res) => {
    console.log("hello iam login");
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });

        if (userDoc) {
            const hashedPassword = userDoc.password;
            const passOk = bcrypt.compareSync(password, hashedPassword);

            if (passOk) {
                    jwt.sign({email:userDoc.email, id:userDoc._id, name:userDoc.name},jwtSecret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(userDoc);
                })
                // res.cookie('token','').json('Correct password');
            } else {
                res.status(422).json('Incorrect password');
            }
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json('Internal Server Error');
    }
});

app.post('/logout',(req,res)=>{
    console.log('this is logout');
    res.cookie('token','').json(true);
});

//--------------upoload by link-----------------------

app.post('/upload-by-link', async (req, res) => {
    console.log('this is upload by link');
    try {
      const { link } = req.body;
      const newName = 'photo' + Date.now() + '.jpg';
      await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
      });
      res.json(newName);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// app.post('/upload-by-link',async(req,res)=>{
//     const {link}=req.body;
//     const newName= 'photo' +Date.now() + '.jpg';
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname + '/uploads/' + newName,
//     });
//     res.json(newName);

// })

app.get('/profile',(req,res)=>{
    console.log('this is profile');
    const {token} = req.cookies;
    if(token){
       jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
        const {name,email,_id}=await User.findById(userData.id);
        res.json( {name,email,_id});
        // res.json(userData);
       }) 
    }else{
        res.json(null);
    }
    //res.json({token});
    //res.json('This is user info');
})

//function to upload photo------------------------ ---
const photoMiddleware=multer({dest:'uploads/'});
app.post('/upload',photoMiddleware.array('photos',100),(req,res)=>{
    //console.log(req.files);
    const uploadedFiles=[];
   for(let i=0;i<req.files.length;i++){
      const {path,originalname}=req.files[i];
      
      const parts=originalname.split('.');
    //   const ext=parts[parts.length-1];
     const ext='jpg';
      const newPath= path+'.'+ext;
      fs.renameSync(path,newPath);
      uploadedFiles.push(newPath.replace('uploads/',''));
   }
   res.json(req.files);
})

//---------API End point to add new places-----------
app.post('/places',(req,res)=>{
    
    const {title,address,addedPhotos,description,perks,extraInfo,checkin,checkout,maxGuests} = req.body;
    console.log('To add new places...');
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
        const placeDoc =await Place.create({
            owner:userData.id,
            title,address,addedPhotos,description,perks
            ,extraInfo,checkin,checkout,maxGuests
        });
        res.json(placeDoc);
    }) 
   
})

//-----------To fetch list of places--------------
app.get('/placelist',(req,res)=>{
    console.log('this is Placelist');
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        const {id}=userData;
        const data=await Place.find({owner:id});
        res.json(data);
    });
})

//---------------Place ka brief------------------
app.get('placesB/:id',async (req,res)=>{
    const {id}= req.params;
    res.json(await Place.findById(id));

})

//-------- app listning on the port ----------------
app.listen(4001,(req,res)=>{
    console.log('Listening at port 4001.....');
    console.log(__dirname);
});



