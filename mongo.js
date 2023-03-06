var mongoose=require('mongoose');
var url = 'mongodb+srv://Jaideep:Yahvi123@cluster0.eot5t.mongodb.net/?retryWrites=true&w=majority';
//var url = 'mongodb://localhost/cse'
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
// var schema_teacher=mongoose.Schema({name: String,username: {type:String, unique: true },email: String,post: String});
// var model=mongoose.model('teacher',schema_teacher);
// var schema_login=mongoose.Schema({username: {type:String, index:{unique: true,dropDups: true}},email: String,password: String});
// var model=mongoose.model('login',schema_login);
// var schema_batch=mongoose.Schema({Semester: Number,exam: Array,file: Array});
// var model=mongoose.model('batch',schema_batch);
var schema_batch=mongoose.Schema({Subject: Array,id: Number});
var model=mongoose.model('subjects',schema_batch);
var newmodel=new model();
// newmodel.Semester=8;
// newmodel.exam=[  ]; 
// //     '2017-2021#iae1',
// // '2017-2021#iae2',
// // '2017-2021#iae3',
// // '2017-2021#iae4',
// // '2017-2021#iae5',
// // '2017-2021#model',
// // '2017-2021#universityExam'];
// newmodel.file=[];
newmodel.id=1;
newmodel.Subject=["CSE#2020-2024#Semester 1#Engineering Graphics#5"]
//     'jai2021_2017-2021_Semester 1_Communicative English_iae3.xlsx',
// 'jai2021_2017-2021_Semester 1_Communicative English_iae1.xlsx',
// 'jai2021_2017-2021_Semester 1_Communicative English_iae2.xlsx',
//       'jai2021_2017-2021_Semester 1_Communicative English_iae4.xlsx',
//       'jai2021_2017-2021_Semester 1_Communicative English_iae5.xlsx',
//       'jai2021_2017-2021_Semester 1_Communicative English_model.xlsx',
//       'jai2021_2017-2021_Semester 1_Communicative English_universityExam.xlsx',
//       'jai2021_2017-2021_Semester 1_Communicative English_pos.xlsx'];
// newmodel.username="admin2021";
// newmodel.email="admin@gmail.com";
// newmodel.password="admin";
// newmodel.username="jai2021";
// newmodel.email="jai@gmail.com";
// // newmodel.password="jai";
// newmodel.name="jai";
// newmodel.post="asss";
// newmodel.subject=["2017-2021#Semester1#Communicative English","2018-2022#Semester2#Technical English"];
newmodel.save(function()
{
    console.log("saved");
    mongoose.disconnect();
});
// console.log(newmodel);
// model.find({},function(err,data) {
//     // console.log(data[1].subject[0].split("#")[0]);
//     // console.log(data[1].subject[0].split("#")[1]);
//     // console.log(data[1].subject[0].split("#")[2]);
//     console.log(data)
//     mongoose.disconnect();
// });

// model.updateOne({Semester:2},{exam:[]},function(err)
// {
//     console.log("updated")
//     mongoose.disconnect();
// })
// model.remove({username:"sam2021"},function()
// {
//     console.log("removed");
//     mongoose.disconnect();
// });

// var GoogleSpreadSheet=require('google-spreadsheet')
// const {promisify}=require('util')

// async function accessSpreadSheet()
// {
//     const doc = new GoogleSpreadSheet('1KDRrJbE-kHt8-sKLUHx1F_627b7ISZ8KMxEufdYlmQQ');
//     await promisify(doc.useServiceAccountAuth)(client_email:'jaideep - college@college-379813.iam.gserviceaccount.com',
//         private_key:118364870667154070407)
//         const info=await promisify(doc.getInfo)()
//         const sheet=info.worksheets[0]
//         console.log(`Rows:${sheet.rowCount}`)
// }
// model.findOneAndUpdate({ id: 1 }, { $push: { exammark:'CSE#2023-2027#Semester 1#comput#Assignmen3#80' } }, function () {
//         console.log("saved");
//     mongoose.disconnect();
// });