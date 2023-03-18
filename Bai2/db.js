const http = require('http');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/user';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  pincode: Number,
  country: String
})

const UserModel = new mongoose.model('User', UserSchema);


http.createServer((req, res) => {
  if (req.url === '/api/users') {
    UserModel.find()
      .then(users => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(users));
        res.end();
      })
      .catch(err => {
        res.statusCode = 500;
        res.end();
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(3001);





// client.connect(err => {
//   console.log(err);
//   if (err) {
//     console.log('Failed to connect to MongoDB:', err);
//     return;
//   }

//   const collection = client.db('user').collection('users');
//   const newUser = {selected: false, Name: 'John Doe', Address: '123 Main St', City: 'Anytown', PinCode: '12345', Country: 'USA' };
//   collection.insertOne(newUser, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`Inserted new user with ID ${result.insertedId}`);
//     }
//     client.close();
//   });
// });



