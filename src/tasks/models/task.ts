export class Task {
  //   public id: number;
  //   public title: string;
  //   public desc: string;
  //   public statut: string;

  constructor(
    public id: number,
    public title: string,
    public desc: string,
    public statut: string,
    public year?: number,
    public createdAt?: Date,
  ) {
    // this.id = id;
    // this.title = title;
    // this.desc = desc;
    // this.statut = statut;
  }
}
