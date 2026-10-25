export const QuickSortObjects = (array:Array<any>, prop:number|string, ascending:boolean):Array<any> => {
    if (array.length <= 1) return array;
  
    // warning: bad pivot
    const pivot:number|string = array[0][prop];
    const left = []; // warning: allocations
    const right = [];
  
    for (let i = 1; i < array.length; i++) {
      if (array[i][prop] < pivot) {
        if (ascending)
            left.push(array[i]);
        else
            right.push(array[i]);
      }
      else {
        if (ascending)
            right.push(array[i]);
        else
            left.push(array[i]);
      }
    }
  
    return [
      ...QuickSortObjects(left, prop, ascending),
      array[0],
      ...QuickSortObjects(right, prop, ascending)
    ]; // warning: copies
  };