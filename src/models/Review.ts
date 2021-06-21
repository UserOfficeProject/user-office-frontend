export class Review {
  constructor(
    public id: number,
    public proposalPK: number,
    public userID: number,
    public comment: string,
    public grade: number,
    public status: number
  ) {}
}
