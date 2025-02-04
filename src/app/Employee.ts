export class Skill {
  constructor(public id?: number, public skill?: string) {}
}

export class Employee {
  constructor(public id?: number,
              public lastName?: string,
              public firstName?: string,
              public street?: string,
              public postcode?: string,
              public city?: string,
              public phone?: string,
              public skillSet?: Skill[]) {
  }
}
