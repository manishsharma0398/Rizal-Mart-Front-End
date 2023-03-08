export const convertToIndianNumberFormat = (num) => {
  const curr = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 7,
  }).format(num);
  //   const curr = num.toLocaleString("en-IN", {
  //     // style: "currency",
  //     style: ""
  //     // currency: "INR",
  //   });
  return curr;
};
