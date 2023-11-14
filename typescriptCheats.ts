//Merge two arrays with identical objects, only take unique ones.
const newGAs = newPageValues?.areas?.filter((a) => a.globalArea);
const globalAreas = [...currentLayout.globalAreas, ...(newGAs ?? [])];
const uniqueGlobalAreas = globalAreas?.filter(
  (area, index, self) =>
    area.globalArea && self.findIndex((a) => a.id === area.id) === index,
);
