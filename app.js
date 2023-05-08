const express = require("express");
const dbConnection = require("./config/db");
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const examRoutes = require("./src/exam/routes/exam.routes.js");
const questionRoutes = require("./src/questions/routes/question.routes.js");
const usersRoutes = require("./src/users/routes/user.routes.js");
const departmentRoutes = require("./src/department/routes/department.routes.js");
const gradeRoutes = require("./src/grade/routes/grade.routes");
const subjectRoutes = require("./src/subject/routes/subject.routes");
const answerRoutes = require("./src/examAnswers/routes/answer.routes");


const port = 5000 ;

//***public middelware */
app.use(express.json());

dbConnection();

app.use(examRoutes);
app.use(questionRoutes);
app.use(usersRoutes);
//app.use(departmentRoutes);
//app.use(gradeRoutes);
app.use(subjectRoutes);
app.use(answerRoutes);



app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));