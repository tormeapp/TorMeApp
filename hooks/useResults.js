import { useEffect, useState } from "react";
import fb from "../fb";

export default () => {
  const [results, setResults] = useState();
  const businessRef = fb.database().ref().child(`businesses`);

  const getBusinesses = () => {
    businessRef.once("value", function (snapshot) {
      const data = snapshot.val();
      const businessList = [];
      for (let id in data) {
        businessList.push(data[id]);
      }

      setResults(businessList);
    });
  };

  return [getBusinesses, results];
};
