import explainationJson from "src/data/risk/explaination.json";

/**
 *  Returns the detailed info String for a data.
 */
export function riskExplanation(id: number, visible: boolean) {
  if (visible) {
    return explainationJson[id].visible;
  } else {
    return explainationJson[id].notVisible;
  }
}
