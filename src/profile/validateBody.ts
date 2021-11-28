export async function validateBody(
  body: object,
  validDto: any,
  excludedProprties?: string[],
) {
  const validated = {};
  const entries = Object.entries(body);
  for (const entry of entries) {
    if (excludedProprties) {
      if (!excludedProprties.includes(entry[0])) {
        if (new validDto()[entry[0]] === null) {
          validated[entry[0]] = entry[1];
        }
      }
    } else {
      if (new validDto()[entry[0]] === null) {
        validated[entry[0]] = entry[1];
      }
    }
    // if (validEntries.includes(entry[0])) {
    //   validated[entry[0]] = entry[1];
    // }
  }
  return validated;
}
