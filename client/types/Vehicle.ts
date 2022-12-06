import GenericModel from './GenericModel';

type VehicleProperties = {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: Date;
  crew: string;
  edited: Date;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
};

type Vehicle = {
  name?: string;
  properties: VehicleProperties;
} & GenericModel;

export default Vehicle;
