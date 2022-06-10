import riskJson from "src/data/risk/risk.json";
import explainationJson from "src/data/risk/explaination.json";
import { RiskLevel } from "./RiskLevel.js";
import { riskExplanation } from "./RiskExplanation.js";

/**
 * Returns a number from 1 to 3 that rates the risk of a specific data
 * @param dataType the type of the specific data
 * @returns number from 1 to 3
 * */
function getRiskNumber(dataType: string) {
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

export function getRisk(dataType: string) {
  const riskNumber = getRiskNumber(dataType);
  switch (riskNumber) {
    case 1: {
      return RiskLevel.low;
      break;
    }
    case 2: {
      return RiskLevel.medium;
      break;
    }
    case 3: {
      return RiskLevel.high;
      break;
    }
    default: {
      break;
    }
  }
}

function getVisibility(dataType: string) {
  const visible = true;
  return visible;
}

/**
 * Returns a string with detailed information about a specific data
 * @param dataType the type of the specific data
 * @returns a sting with detaild infos
 * */
export function getExplanation(dataType: string) {
  let explaination;
  try {
    for (let i = 0; i++; i < riskJson.length) {
      if (riskJson[i].dataType === dataType) {
        explaination = riskExplanation(
          Number(riskJson[i].explainationId),
          getVisibility(dataType)
        );
      }
    }
  } catch (err) {
    throw Error(`Unexpected error parsing the JSON file: ${err}`);
  }
  return explaination;
}
