"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalChoiceData = void 0;
class CiacconaGalChoiceData {
  constructor(t) {
    this.Lo = t, this.Z4c = !0, this.eVc = !1, this.tVc = !0
  }
  get Id() {
    return this.Lo.Id
  }
  get Content() {
    return this.Lo.Content
  }
  get RequiredInspiration() {
    return this.Lo.RequiredInspiration
  }
  get NeedInspiration() {
    return 0 < this.Lo.RequiredInspiration
  }
  get IsAvailable() {
    return 0 === this.State
  }
  get State() {
    return this.Ybc ? this.zbc ? this.Jbc ? 3 : 0 : 1 : 2
  }
  get ToStepId() {
    return this.Lo.ToStep
  }
  get CorrSubEndingId() {
    return this.Lo.CorrSubEnding
  }
  get Jbc() {
    return this.eVc
  }
  get zbc() {
    return !this.NeedInspiration || this.Z4c
  }
  get Ybc() {
    return this.tVc
  }
  UpdateByServerData(t) {
    for (const e of t.h4c)
      if (e.l4c === this.Id) {
        this.Z4c = e._4c, this.tVc = e.c4c;
        break
      } this.eVc = t.a4c.some(t => t.u4c === this.CorrSubEndingId && t.a3_)
  }
}
exports.CiacconaGalChoiceData = CiacconaGalChoiceData;
//# sourceMappingURL=CiacconaGalChoiceData.js.map