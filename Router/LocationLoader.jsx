export const LocationLoader = async () => {
  const districts = await fetch("/districts.json").then(res => res.json());
  const upazilas = await fetch("/upazilas.json").then(res => res.json());

  return { districts, upazilas };
};
