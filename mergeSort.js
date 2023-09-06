// merge sort implementation using recursion

function merge(left, right) {
  const arr = [];
  let [leftIndex, rightIndex] = [0, 0];

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      arr.push(left[leftIndex++]);
    } else {
      arr.push(right[rightIndex++]);
    }
  }
  // append remaining elements from both halves
  return arr.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr; // array is already sorted

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  // sort the individual halves, then merge the results
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([10, 0, 5, 3]));
