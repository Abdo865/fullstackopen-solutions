export function calculateBmi(weight: number, height: number): string {
  const bmi = weight / (height / 100);
  if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 29) return "Overweight (medium weight)";
  else return "Obese (not healthy weight)";
}

const height: number = +process.argv[2];
const weight: number = +process.argv[3];

console.log(calculateBmi(weight, height));

