"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChoiceData = undefined;
class CiacconaGalChoiceData {
  constructor(t) {
    this.Lo = t;
    this.Z4c = true;
    this.eVc = false;
    this.tVc = true;
  }
  get Id() {
    return this.Lo.Id;
  }
  get Content() {
    return this.Lo.Content;
  }
  get RequiredInspiration() {
    return this.Lo.RequiredInspiration;
  }
  get NeedInspiration() {
    return this.Lo.RequiredInspiration > 0;
  }
  get IsAvailable() {
    return this.State === 0;
  }
  get State() {
    if (this.Ybc) {
      if (this.zbc) {
        if (this.Jbc) {
          return 3;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    } else {
      return 2;
    }
  }
  get ToStepId() {
    return this.Lo.ToStep;
  }
  get CorrSubEndingId() {
    return this.Lo.CorrSubEnding;
  }
  get Jbc() {
    return this.eVc;
  }
  get zbc() {
    return !this.NeedInspiration || this.Z4c;
  }
  get Ybc() {
    return this.tVc;
  }
  UpdateByServerData(t) {
    for (const e of t.h4c) {
      if (e.l4c === this.Id) {
        this.Z4c = e._4c;
        this.tVc = e.c4c;
        break;
      }
    }
    this.eVc = t.a4c.some(t => t.u4c === this.CorrSubEndingId && t.a3_);
  }
}
exports.CiacconaGalChoiceData = CiacconaGalChoiceData;
//# sourceMappingURL=CiacconaGalChoiceData.js.map