import is from "is_js";

export const mapArrayItemProperty = (array, propertyName) => {
  if (is.array(array) && array.length > 0) {
    return array.map((arrayItem) => {
      if (is.propertyDefined(arrayItem, propertyName)) {
        return arrayItem[propertyName];
      } else {
        return null;
      }
    });
  } else {
    return null;
  }
};
