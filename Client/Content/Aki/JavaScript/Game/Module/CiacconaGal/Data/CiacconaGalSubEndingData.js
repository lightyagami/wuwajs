"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalSubEndingData = void 0;
class CiacconaGalSubEndingData {
  constructor(t) {
    this.Lo = t, this.jqc = !1, this.iVc = !1, this.oVc = !1
  }
  get Id() {
    return this.Lo.Id
  }
  get Title() {
    return this.Lo.Title
  }
  get Desc() {
    return this.Lo.Desc
  }
  get ImagePath() {
    return this.Lo.BackgroundImage
  }
  get Type() {
    return this.Lo.Type
  }
  get RewardId() {
    return this.Lo.Reward
  }
  get IsFinished() {
    return this.jqc
  }
  get IsRewarded() {
    return this.iVc
  }
  get ShouldExitOnFirstFinish() {
    return this.Lo.ExitOnFinish
  }
  get IsFaked() {
    return this.oVc
  }
  UpdateByServerData(t) {
    this.jqc = t.a3_, this.iVc = t.d4c, this.oVc = !1
  }
  ClientSetFinished(t) {
    this.jqc !== t && (this.jqc = t, this.oVc = !0)
  }
}
exports.CiacconaGalSubEndingData = CiacconaGalSubEndingData;
//# sourceMappingURL=CiacconaGalSubEndingData.js.map