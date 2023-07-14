function calculateExercises(daily: number[], target: number): returnType {
  const trainingDays = daily.filter((day) => day > 0).length;
  const average = daily.reduce((sum, day) => sum + day, 0) / daily.length;
  const x: returnType = {
    periodLength: daily.length,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: average >= target,
    rating: 2,                      // fixed for now
    ratingDescription: "good",      // fixed for now
  };
  return x;
}

interface returnType {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
