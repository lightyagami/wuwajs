"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalEndingData = void 0;
class CiacconaGalEndingData {
  constructor(t) {
    this.Lo = t, this.jqc = !1, this.iVc = !1
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
  get DetailImagePath() {
    return this.Lo.DetailBackgroundImage
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
  UpdateByServerData(t) {
    this.jqc = !0, this.iVc = t.d4c
  }
}
exports.CiacconaGalEndingData = CiacconaGalEndingData;
//# sourceMappingURL=CiacconaGalEndingData.js.map