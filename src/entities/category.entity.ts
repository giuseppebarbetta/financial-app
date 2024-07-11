type CategoryProps = {
  _id?: string;
  title: string;
  color: string;
};

export class Category {
  public id?: string;
  public title: string;
  public color: string;

  constructor({ _id, title, color }: CategoryProps) {
    this.title = title;
    this.color = color.toUpperCase();
    this.id = _id;
  }
}
