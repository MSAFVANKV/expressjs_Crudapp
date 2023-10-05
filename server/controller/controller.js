
// // ceate and save user
// exports.create=(req,res)=>{
// // validate request 

//     if(req.body){
//         res.status(400).send({message:"content can not be empty!!"});
//         return;
//     }

// }

// // retrieve and return all users / retrieve and return a single user
// exports.find=(req,res)=>{

// }
// // update a newidentified user by user id
// exports.update=(req,res)=>{

// }

// // Delete a user with specified user id request
// exports.delete=(req,res)=>{

// }





// ==========================================
const fs = require('fs');
const path = require('path');
const filepath = "./server/services/data.json";
const fileContents = fs.readFileSync(filepath, 'utf-8');
const data = JSON.parse(fileContents);

exports.create = (req, res) => {
  
  if (!req.body.name || !req.body.department || !req.body.phone) {
    console.log("safvan");
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }

  const user = {
    id: data.length + 1,
    name: req.body.name,
    department: req.body.department,
    phone: req.body.phone
  };

  data.push(user);
  fs.writeFileSync(filepath, JSON.stringify(data));
  res.redirect('/add-user');

}

exports.find = (req, res) => {
  if (data) {
    res.send(data);
  } else {
    res.status(500).send({ message: error.message || "User Data not found" });
  }
}

exports.findById = (req, res, err) => {
  const userId = req.params.id;
  const user = data.find((item) => item.id === parseInt(userId));

  if (user) {
    res.send(user);
  } else {
    res.status(500).send({ message: error.message || "User Data not found" });
  }
}

exports.update = (req, res) => {
 
  if (!req.body) {
    res.status(400).send({ message: "Data to update can't be empty" });
    return;
  }
  const userId = req.params.id;
  
  const updatatedData = req.body;

  let index = data.findIndex(e => e.id == userId);
  
  if (index !== -1){
   
    data[index] = {
      id: userId,
      name: updatatedData.name,
      department: updatatedData.department,
      phone: updatatedData.phone
  
    }

    fs.writeFileSync(filepath, JSON.stringify(data));
    res.status(200).send('<script>alert(Form Submitted Successfully!);</script>')
    
  }
  else { res.status(404).send("No ID found");}
}
exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Need to specify an id for deletion" });
    return;
  }
  const id = req.params.id;

  const index = data.findIndex(obj => obj.id === parseInt(id));
  if (index !== -1) {
    data.splice(index, 1);
  }
  for (let i = 0; i < data.length; i++) {
    data[i].id = i + 1;
  }
  fs.writeFileSync(filepath, JSON.stringify(data));
  res.status(200).send('<script>alert(Data Deleted Successfully!);</script>')

}