import axios from "axios";

export interface Loompa {
  id: number;
  firstName: string;
  lastName: string;
  favorite: {
    color: string;
    food: string;
    randomString: string;
    song: string;
  };
  gender: string;
  image: string;
  profession: string;
  email: string;
  age: number;
  country: string;
  height: number;
}

const URL =
  "https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas";

const fixData = (data: any): Loompa => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    favorite: {
      color: data.favorite.color,
      food: data.favorite.food,
      randomString: data.favorite.random_string,
      song: data.favorite.song,
    },
    gender: data.gender,
    image: data.image,
    profession: data.profession,
    email: data.email,
    age: data.age,
    country: data.country,
    height: data.height,
  };
};

const list = async (page: number): Promise<Loompa[]> => {
  const response = await axios.get(URL, {
    params: { page },
  });
  const results = response.data.results;
  return results.map(fixData);
};

const get = async (id: string): Promise<Loompa> => {
  const response = await axios.get(`${URL}/${id}`);
  const data = response.data;
  return fixData(data);
};

export const LoompaService = {
  list,
  get,
};
