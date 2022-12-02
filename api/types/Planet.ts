import GenericModel from './GenericModel';

type PlanetProperties = {
  climate: string;
  created: Date;
  diameter: string;
  edited: Date;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

type Planet = {
  properties: PlanetProperties;
} & GenericModel;

export default Planet;
