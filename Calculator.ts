import readline from 'readline';

class Calculator {
  units: number[];
  gradePoints: number[];
  readLineInterface: readline.Interface;

  constructor() {
    this.units = [];
    this.gradePoints = [];
    this.readLineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getGradePoint = (grade: string, unit: number) => {
    let point: number;
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

  calculateCGPA = () => {
    const totalUnits = this.units.reduce(
      (acc: number, currentVal: number) => acc + currentVal,
    );
    const totalGradePoints = this.gradePoints.reduce(
      (acc: number, currentVal: number) => acc + currentVal,
    );
    const cgpa = totalGradePoints / totalUnits;
    console.log(`Your CGPA is ${cgpa}`);
  };

  rePromptOrCalculate = () => {
    this.readLineInterface.question(
      'Would you like to enter another course? (Y/N): ',
      (answer) => {
        const validAnswers = ['Y', 'N'];
        if (!validAnswers.includes(answer.toUpperCase())) {
          console.log('Invalid input type, please try again.');
          this.rePromptOrCalculate();
        }
        if (answer.toUpperCase() === 'Y') {
          this.askCourseName();
        } else {
          this.calculateCGPA();
        }
      },
    );
  };

  askGrade(unit: number, courseName: string) {
    const validGrades = ['A', 'B', 'C', 'D', 'E', 'F'];
    this.readLineInterface.question(`Enter your grade for ${courseName}: `, (grade) => {
      if (!validGrades.includes(grade.toUpperCase())) {
        console.log(
          'Invalid input type, please try again. Grade should be between A and F',
        );
        this.askGrade(unit, courseName);
      }
      const gradePoint = this.getGradePoint(grade.toUpperCase(), unit);
      this.gradePoints.push(gradePoint);
      this.rePromptOrCalculate();
    });
  }

  askCourseCredit(courseName: string) {
    this.readLineInterface.question(`Enter course unit for ${courseName}: `, (input) => {
      if (!input) {
        console.log('Invalid input type, please try again. Input should be a number');
        return this.askCourseCredit(courseName);
      }
      const unit = Number(input);
      if (isNaN(unit)) {
        console.log('Invalid input type, please try again. Input should be a number');
        return this.askCourseCredit(courseName);
      }
      this.units.push(unit);
      this.askGrade(unit, courseName);
    });
  }

  askCourseName() {
    this.readLineInterface.question('Enter course name: ', (input) => {
      if (!input) {
        console.log('Invalid input type, please try again.');
        return this.askCourseName();
      }
      this.askCourseCredit(input);
    });
  }
}
export default Calculator;
