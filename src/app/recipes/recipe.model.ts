export interface Ingredient {
    item: string;
    amount: string;
    unit: string;
    preparation: string;
}

export interface Instruction {
    step: number;
    description: string;
}

export class Recipe {
    constructor(
      public _id: string,
      public name: string,
      public ingredients: Ingredient[],
      public instructions: Instruction[],
      public notes: string,
      public servings: number,
      public photoUrl: string
    ) {}
  }
  