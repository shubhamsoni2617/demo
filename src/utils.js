import { getTreemap } from 'treemap-squarify';

export const descendingComparator = (a, b, orderBy) => {
  if (!orderBy) {
    return 0;
  }
  let refA = a[orderBy];
  let refB = b[orderBy];

  if (orderBy === 'last_remodelled_date') {
    refA = a[orderBy] ? Number(a[orderBy]?.split('-').join('')) : null;
    refB = b[orderBy] ? Number(b[orderBy]?.split('-').join('')) : null;
  }

  if (orderBy === 'last_remodelled_name') {
    if (!a[orderBy] && a[orderBy] !== 0) {
      refA = '';
    }

    if (!b[orderBy] && b[orderBy] !== 0) {
      refB = '';
    }
  } else {
    if (!a[orderBy] && a[orderBy] !== 0) {
      refA = Number.MIN_SAFE_INTEGER;
    }

    if (!b[orderBy] && b[orderBy] !== 0) {
      refB = Number.MIN_SAFE_INTEGER;
    }
  }

  if (refB < refA) {
    return -1;
  }
  if (refB > refA) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, order)
    : (a, b) => -descendingComparator(a, b, orderBy, order);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis?.map((el) => el[0]);
};

export const abbreviateNumber = (value) => {
  var newValue = Number(value);
  if (value >= 1000) {
    value = parseInt(value);
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + (suffixes[suffixNum] || '');
  } else if (!Number.isInteger(newValue)) {
    newValue = newValue.toFixed(2);
  }

  return newValue;
};

export const abbreviateNumberK = (value) => {
  if (value >= 1000) {
    let num = (value / 1000).toFixed(0).replace(/\.0$/, '');
    num = parseInt(num)?.toLocaleString() + 'K';
    return num;
  }
  return value;
};

export const abbreviateGraphNumberK = (value) => {
  if (value >= 1000) {
    let num = (value / 1000).toFixed(1).replace(/\.0$/, '');
    num = Number(num)?.toLocaleString() + 'K';
    return num;
  }
  return value;
};

export const customFilter = (arr, key, values) => {
  if (values?.length <= 0) {
    return arr;
  }

  const filteredResult = arr?.filter((item) => {
    return values?.some((arrItem) => {
      return item[key]?.indexOf(arrItem?.value) > -1;
    });
  });
  return filteredResult;
};

export const calculateStickyLeft = (headCells, index) => {
  let leftSum = 0;
  for (let i = 0; i < index; i++) {
    leftSum += headCells[i]['minWidth'];
  }

  return leftSum;
};

export const filterData = (arr, filtersObj) => {
  // arr is the original data
  // filtersObj is the filters applied
  // let filteredResults = [];

  if (!Object.values(filtersObj)?.some((item) => item?.length)) return arr;

  return arr?.filter((item) =>
    Object.entries(filtersObj)?.every(([key, val]) =>
      val?.length ? val?.map(({ label }) => label)?.includes(item[key]) : true
    )
  );
};

export const nullCompareOption = {
  value: null,
  label: 'None',
};

export const customSearch = (arr, value) => {
  let start = 0;
  let end = arr?.length - 1;
  let result = value;
  let resultIndex = -1;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    if (arr[mid] === value) {
      return arr[mid];
    }

    if (arr[mid] < value) {
      resultIndex = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  result = arr[resultIndex + 1] ? arr[resultIndex + 1] : arr[resultIndex];
  return result;
};

export const calculateDiff = (val1, val2) => {
  if (typeof val1 === 'number' && typeof val2 === 'number') {
    return val1 - val2;
  } else {
    return;
  }
};

export const roundNearest100 = (num) => {
  return Math.round(num / 1000) * 1000;
};

export const roundNearestBound = (num) => {
  const stringNum = String(num);

  let numLength = stringNum?.length;
  let isLessThanHalf = false;
  if (Number(stringNum[0] < 5)) {
    isLessThanHalf = true;
    numLength -= 1;
  }

  const append = isLessThanHalf ? 5 : 1;
  return Number(append + `0`.repeat(numLength));
};

export const updatedDataDeletedKey = (arr, key) => {
  if (!arr?.length) return arr;

  const updatedArrStr = JSON.stringify(arr);

  const updatedArr = JSON.parse(updatedArrStr);
  const filteredResult = updatedArr.map((item) => {
    delete item[key];
    return item;
  });

  return JSON.stringify(filteredResult);
};

export const getFormattedName = () => {
  let userName = localStorage.getItem('name')
    ? localStorage.getItem('name')?.split('@')[0]
    : 'User';
  let updatedUserName = userName
    ?.split('.')
    ?.map((item) => item.charAt(0)?.toUpperCase() + item?.slice(1))
    .join(' ');
  if (updatedUserName?.length > 12) {
    return updatedUserName?.slice(0, 12) + '...';
  }
  return updatedUserName;
};

export const transformToTreemap = (data, height, width) => {
  const result =
    data?.length > 0
      ? getTreemap({
          data,
          height,
          width,
        })
      : data;

  return result;
};

// export const handleCascadeData = (arr, filtersObj, headCellId) => {
//   const updatedFiltersObj = { ...filtersObj };
//   delete updatedFiltersObj[headCellId];

//   if (!Object.values(filtersObj).some((item) => item?.length)) {
//     return arr;
//   }
//   if (headCellId === 'floor_str') {
//     delete updatedFiltersObj.floor_str;
//   }
//   if (headCellId === 'floor_plan_area') {
//     delete updatedFiltersObj.floor_plan_area;
//     delete updatedFiltersObj.department;
//   }
//   if (headCellId === 'department') {
//     delete updatedFiltersObj.department;
//   }

//   return arr.filter((item) =>
//     Object.entries(updatedFiltersObj).every(([key, val]) =>
//       val?.length ? val.map(({ label }) => label).includes(item[key]) : true
//     )
//   );
// };

export const handleCascadeData = (arr) => {
  return arr;
};
