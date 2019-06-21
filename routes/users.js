const express = require('express');
const router = express.Router();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'responses/file.csv',
  header: [
      {id: 'nm', title: 'NAME'},
      {id: 'pp', title: 'PARTY'},
      {id: 'tm', title: 'PRESIDENTIAL TERM'},
      {id: 'president', title: 'PRESIDENT NUMBER'},
      {id: 'time', title: 'INGESTION TIME'}
  ]
});

router.post('/', (req, res, next) => {
  const request = JSON.parse(req.body.submission)

  let newRecord = []
 
  const filteredFederalists = request.filter((data)=>{ 
      return !data.pp.includes('Federalist')
      })

  filteredFederalists.forEach((data)=>{
      const backwardsName = data.nm.split(' ')[0].split('').reverse().join('') + ' ' + data.nm.split(' ')[1] + (data.nm.split(' ')[2] === undefined ? '' : ' ' + data.nm.split(' ')[2])

      const partyAcronym = data.pp === 'Democratic-Republican' ? 'DR' : data.pp === 'Democrat' 
      ? 'D' : data.pp === 'Whig' 
      ? 'W' : data.pp === 'Republican' 
      ? 'R' : data.pp === 'National Union' 
      ? 'NU' : null;

      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = currentDate.getMonth(); 
      const year = currentDate.getFullYear();

      const record = {
        nm: backwardsName,
        pp: partyAcronym,
        tm: 'January ' + '20 ' + data.tm.split('-')[0],
        president: data.president,
        time: date + '/' + month + '/' + year
      }
      newRecord.push(record)
    })

    const compareName = ( a, b ) => {
      if ( a.nm < b.nm ){
        return -1;
      }
      if ( a.nm > b.nm ){
        return 1;
      }
      return 0;
    }
    
    recordFrom1800To1900 = []
    recordFrom1900To2000 = []
    recordFrom2000To2100 = []

    newRecord.forEach((data)=>{
      let year = data.tm.split(' ')[2]
      if(year >= 1800 && year < 1900){
        recordFrom1800To1900.push(data)
      }
      else if ( year >= 1900 && year < 2000){
        recordFrom1900To2000.push(data)
      }
      else if ( year >= 2000 && year < 2100){
        recordFrom2000To2100.push(data)
      }
    })

    newRecord = []
    newRecord.push(recordFrom1800To1900.sort(compareName))
    newRecord.push(recordFrom1900To2000.sort(compareName))
    newRecord.push(recordFrom2000To2100.sort(compareName))

  csvWriter.writeRecords(newRecord.flat()) 
    .then(() => {
      res.download('responses/file.csv')
    });
});

module.exports = router;
