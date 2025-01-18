export class Qualification {
  constructor(public id?: number, public _skill?: string) {
  }

  get skill(): string | undefined{
    return this._skill;
  }

  set skill(value: string | undefined) {
    this._skill = value;
  }
}
