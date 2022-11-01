// import mysql from 'mysql';
import knex from "knex"; 

// export const dbconnect = mysql.createConnection({
//     host     : 'akax.lima-ftp.de',
//     user     : 'USER340568_akado',
//     password : 'qwertvbnmasdf',
//     database : 'db_340568_10'
// });


// dbconnect.connect()
// dbconnect.beginTransaction()
// dbconnect.query('INSERT INTO Persons (PersonID,LastName,FirstName,Address,City) VALUES (?,?,?,?,?)', [1,"test","test","test","test"]);
// dbconnect.query('SELECT * FROM Persons WHERE PersonID = ?', [1]);
// dbconnect.query('UPDATE Persons SET PersonID = ? WHERE PersonID = ?', [2,1]);
// dbconnect.query('DELETE FROM Persons WHERE PersonID = ?', [2]);
// dbconnect.commit()
// dbconnect.rollback()
// dbconnect.end()


export const dbconnect = knex({
  client: 'mysql2',
  connection: {
      host     : 'akax.lima-ftp.de',
      user     : 'USER340568_akado',
      password : 'qwertvbnmasdf',
      database : 'db_340568_10'
  },
});

  // dbconnect.schema.createTableIfNotExists('user', table => {
  //   table.increments('id');
  //   table.string('name');
  //   table.string('pw');
  // }).then();

    // dbconnect('Persons')
    // .insert(
    //   [
    //     { PersonID: 1,Address: 'Great Gatsby' ,LastName: "test",FirstName:"test",City:"test"}
    //   ]
    // ).then((out:any)=>console.log(out))
  

