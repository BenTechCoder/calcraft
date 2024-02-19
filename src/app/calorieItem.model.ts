export class calorieItem {
  public id: string;
  public name: string;
  public calories: number;
  constructor(name: string, calories: number) {
    this.id = 'id' + (new Date()).getTime();
    this.name = name;
    this.calories = calories;
  }
}
