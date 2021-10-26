function getFirstOccurrence(arr: string[]) {
  let number = 1;

  for(let i in arr) {
    let item = arr[i];

    if(!!item && item !== "" && number > 0){
      number--;
    } else {
      arr[i] = "";
    };
  };

  return arr;
};

export {
  getFirstOccurrence
};