import readline from 'readline';

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const units: number[] = [];
const gradePoints: number[] = [];

const askCourseCredit = (courseName: string) => {
  readLineInterface.question(`Enter course unit for ${courseName}: `, (input) => {
    if (!input) {
      console.log('Invalid input type, please try again. Input should be a number');
      return askCourseCredit(courseName);
    }
    const unit = Number(input);
    if (isNaN(unit)) {
      console.log('Invalid input type, please try again. Input should be a number');
      return askCourseCredit(courseName);
    }
    units.push(unit);
    askGrade(unit, courseName);
  });
};

const askCourseName = () => {
  readLineInterface.question('Enter course name: ', (input) => {
    if (!input) {
      console.log('Invalid input type, please try again.');
      return askCourseName();
    }
    askCourseCredit(input);
  });
};

const getGradePoint = (grade: string, unit: number) => {
  let point;
  switch (grade) {
    case 'A':
      point = 5;
      break;
    case 'B':
      point = 4;
      break;
    case 'C':
      point = 3;
      break;
    case 'D':
      point = 2;
      break;
    case 'E':
      point = 1;
      break;
    default:
      point = 0;
      break;
  }
  return point * unit;
};

const askGrade = (unit: number, courseName: string) => {
  const validGrades = ['A', 'B', 'C', 'D', 'E', 'F'];
  readLineInterface.question(`Enter your grade for ${courseName}: `, (grade) => {
    if (!validGrades.includes(grade.toUpperCase())) {
      console.log(
        'Invalid input type, please try again. Grade should be between A and F',
      );
      askGrade(unit, courseName);
    }
    const gradePoint = getGradePoint(grade.toUpperCase(), unit);
    gradePoints.push(gradePoint);
    rePromptOrCalculate();
  });
};

const rePromptOrCalculate = () => {
  readLineInterface.question(
    'Would you like to enter another course? (Y/N): ',
    (answer) => {
      const validAnswers = ['Y', 'N'];
      if (!validAnswers.includes(answer.toUpperCase())) {
        console.log('Invalid input type, please try again.');
        rePromptOrCalculate();
      }
      if (answer.toUpperCase() === 'Y') {
        askCourseName();
      } else {
        calculateCGPA();
      }
    },
  );
};

const calculateCGPA = () => {
  const totalUnits = units.reduce((acc: number, currentVal: number) => acc + currentVal);
  const totalGradePoints = gradePoints.reduce((acc: number, currentVal: number) => acc + currentVal);
  const cgpa = totalGradePoints / totalUnits;
  console.log(`Your CGPA is ${cgpa}`);
};

askCourseName();
