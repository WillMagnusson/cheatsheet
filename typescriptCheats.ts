//Merge two arrays with identical objects, only take unique ones.
const newGAs = newPageValues?.areas?.filter((a) => a.globalArea);
const globalAreas = [...currentLayout.globalAreas, ...(newGAs ?? [])];
const uniqueGlobalAreas = globalAreas?.filter(
  (area, index, self) =>
    area.globalArea && self.findIndex((a) => a.id === area.id) === index,
);

//Add new object and scroll into view
//dependant on the elements getting the Id as id attribute
  const createNewParameter = async () => {
    let npId: string;
    let npCat: string;
    debounce(() => {
      const formData = form.getValues();
      const newParameter: ParameterInstance = {
        ...formData,
        id: uuid(),
      } as ParameterInstance;

      npId = newParameter.id;
      npCat = newParameter.category;

      snapshot &&
        setSnapshot({
          ...snapshot,
          parameters: [...(snapshot.parameters ?? []), newParameter],
        });
    }, 1000);

    //wait a moment for the data to update and the new parameter to be rendered
    //if the new param is the first of its category, scroll to the category since its closed
    setTimeout(() => {
      if (npId) {
        document.getElementById(npId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        document.getElementById(npCat)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
    setShowDialog(false);
    setShowRecommendation(false);
  };
