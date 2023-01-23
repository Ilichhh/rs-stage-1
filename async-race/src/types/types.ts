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

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = {
  items: Winner[];
  count: number | null;
};

export type WinnersUpdated = {
  items: WinnersData[];
  count: number | null;
};

export type WinnersData = {
  id: number;
  wins: number;
  time: number;
  name: string;
  color: string;
};
