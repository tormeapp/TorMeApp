import { useEffect, useState } from "react";
import fb from "../fb";

export default (isSearch) => {
  const [results, setResults] = useState([]);
  const businessRef = fb.database().ref().child(`businesses`);

  const getBusinesses = () => {
    businessRef.once("value", function (snapshot) {
      const data = snapshot.val();
      const businessList = [];
      for (let id in data) {
        businessList.push(data[id]);
      }

      setResults(businessList);
      //console.log(businessList);
    });
  };

  return [getBusinesses, results];
};
