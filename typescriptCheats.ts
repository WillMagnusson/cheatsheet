//Merge two arrays with identical objects, only take unique ones.
const newGAs = newPageValues?.areas?.filter((a) => a.globalArea);
const globalAreas = [...currentLayout.globalAreas, ...(newGAs ?? [])];
const uniqueGlobalAreas = globalAreas?.filter(
  (area, index, self) =>
    area.globalArea && self.findIndex((a) => a.id === area.id) === index,
);

//Add new object and scroll into view
let npId;
const createNewParameter = async () => {
  debounce(() => {
    const formData = form.getValues();
    const newParameter: ParameterInstance = {
      ...formData,
      id: uuid(),
    } as ParameterInstance;

    npId = newParameter.id;

    snapshot &&
      setSnapshot({
        ...snapshot,
        parameters: [...(snapshot.parameters ?? []), newParameter],
      });

    //capitalize since state values of categories are capitalized for some reason
    const category =
      formData.category.charAt(0).toUpperCase() + formData.category.slice(1);
    //open category accordion
    setOpenStates((prev: { [name: string]: boolean }) => ({
      ...prev,
      [category]: true,
    }));

    if (npId)
      document.getElementById(npId)?.scrollIntoView({ behavior: 'smooth' });
  }, 1000);
  setShowDialog(false);
};
