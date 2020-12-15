const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash')

admin.initializeApp();

exports.transactions = functions.https.onRequest((request, response) => {
  let finalData = []
  response.set('Access-Control-Allow-Origin', '*')
  admin.database().ref("users/").on("value", (snapshot) => {
    data = snapshot.val().user1
    data.balance.forEach((val, index) => {
      let newObj = val
      newObj.transactions = _.filter(data.transactions, { date: val.id.split('.', 2)[1] })
      finalData.push(newObj)
    })
    response.send({ data: finalData });
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code)
    response.send({ error: 'Please check load data' });
  });
});
