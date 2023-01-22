export enum PageIds {
  GaragePage = 'garage',
  WinnersPage = 'winners',
}

export enum ErrorTypes {
  Error_404 = 404,
}

export type TextObject = {
  [name: string | number]: string;
};

export type Attributes = {
  [name: string]: string;
};

export type AttributesObject = {
  [name: string]: Attributes;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Cars = {
  items: Car[];
  count: number | null;
};

export type CarEngine = {
  velocity: number;
  distance: number;
};

export type CarDrive = {
  success: boolean;
};

export type RaceResult = {
  id: number;
  time: number;
  finished: boolean;
};
