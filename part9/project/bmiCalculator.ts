function calculateBmi(weight: number, height: number): string {
  const bmi = weight / height;
  if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 29) return "Overweight (medium weight)";
  else return "Obese (not healthy weight)";
}

console.log(calculateBmi(180, 74));
