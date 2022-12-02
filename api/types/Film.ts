import GenericModel from './GenericModel';

type FilmProperties = {
  characters: string[];
  created: Date;
  director: string;
  edited: Date;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: Date;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
};

type Film = {
  properties: FilmProperties;
} & GenericModel;

export default Film;
