export default (value: string) => {
  console.log(value);
  
  const date = new Date(value);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
