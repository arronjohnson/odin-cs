// merge sort implementation using recursion

function mergeSort(arr) {
  if (arr.length <= 1) return arr; // array is already sorted

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  // sort the individual halves, then merge the results
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let arr = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      arr.push(left[leftIndex]);
      leftIndex++;
    } else {
      arr.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // append remaining elements from both halves
  return arr.concat(left.slice(leftIndex), right.slice(rightIndex));
}
