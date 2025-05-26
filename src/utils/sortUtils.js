// src/utils/sortUtils.js
export const sortByName = (array) => {
    return array.sort((a, b) => a.name.localeCompare(b.name));
  };
  
  export const sortByStatus = (array) => {
    return array.sort((a, b) => a.status.localeCompare(b.status));
  };
  