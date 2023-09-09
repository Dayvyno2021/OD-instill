
export const dateYears = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1; i <= currentYear; i++){
    years.push(i);
  }

  return years;
}