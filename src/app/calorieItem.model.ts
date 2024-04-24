export class calorieItem {
  public id: string;
  public name: string;
  public calories: number;
  public protein?: number;
  constructor(name: string, calories: number, protein?: number) {
    this.id = 'id' + self.crypto.randomUUID();
    this.name = name;
    this.calories = calories;
    this.protein = protein;
  }
}
