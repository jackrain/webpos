var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('chain.sqlite3');
// 或者
// var db = new sqlite3.Database('todo.db');  

db.serialize(function() {
  // 建表
  db.run("CREATE TABLE IF NOT EXISTS todo (title TEXT)");

  // 插入数据
  var stmt = db.prepare("INSERT INTO todo(title) VALUES (?)");
  stmt.run('起床1');
  stmt.run('洗刷2');
  stmt.finalize();
  
  // db.all("SELECT rowid AS id, title FROM todo", function(err, rows) {
  //   console.log(rows);  //  [ { id: 1, title: '起床' }, { id: 2, title: '洗刷' } ]
  //   rows.forEach(function (row) {
  //     console.log(row.title);
  //   });
  // });

  //或者
  db.each("SELECT rowid AS id, title FROM todo", function(err, row) {
     console.log(row.id + ": " + row.title);
  });
});
db.close();