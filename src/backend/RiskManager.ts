import riskJson from "src/data/risk/risk.json";
import explainationJson from "src/data/risk/explaination.json";

/**
 * Returns a number from 1 to 3 that rates the risk of a specific data
 * @param dataType the type of the specific data
 * @returns number from 1 to 3
 * */
export function getRisk(dataType: string) {
  let riskNumber;
  try {
    for (let i = 0; i++; i < riskJson.length) {
      if (riskJson[i].dataType === dataType) {
        riskNumber = Number(riskJson[i].risk);
      }
    }
  } catch (err) {
    throw Error(`Unexpected error parsing the JSON file: ${err}`);
  }
  return riskNumber;
}

/**
 * Returns a string with detailed information about a specific data
 * @param dataType the type of the specific data
 * @returns a sting with detaild infos
 * */
export function getDetailedInfo(dataType: string) {
  let explaination;
  try {
    for (let i = 0; i++; i < riskJson.length) {
      if (riskJson[i].dataType === dataType) {
        explaination = loadExplainationById(Number(riskJson[i].explainationId));
      }
    }
  } catch (err) {
    throw Error(`Unexpected error parsing the JSON file: ${err}`);
  }
  return explaination;
}

function loadExplainationById(id: number) {
  return explainationJson[id];
}
