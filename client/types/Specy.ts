import GenericModel from './GenericModel';

type SpecyProperties = {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: Date;
  designation: string;
  edited: Date;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
};

type Specy = {
  name?: string;
  properties: SpecyProperties;
} & GenericModel;

export default Specy;
