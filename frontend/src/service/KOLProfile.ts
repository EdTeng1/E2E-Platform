import { getData } from "./http";

const queryAll = () => {
	return getData("/queryAll/kol-profile");
};

const queryKOLProfileByName = (name: string) => {
	return getData("/queryKOLProfileByName?name=" + name);
};

export { queryAll, queryKOLProfileByName };
