import {Card} from "./Card";

export type CardUpdateDTO = Partial<Pick<Card, 'name' | 'accessType'>>;
