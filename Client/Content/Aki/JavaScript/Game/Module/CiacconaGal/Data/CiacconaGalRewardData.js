"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalRewardData = undefined;
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById");
class CiacconaGalRewardData {
  constructor(e) {
    this.Lo = e;
    this.sJh = false;
    this.rVc = false;
  }
  get Id() {
    return this.Lo.Id;
  }
  get ActivityId() {
    return this.Lo.ActivityId;
  }
  get RewardId() {
    return this.Lo.RewardId;
  }
  get RewardItemDataList() {
    var e;
    var t;
    var r = [];
    var a = DropPackageById_1.configDropPackageById.GetConfig(this.RewardId);
    if (a) {
      for ([e, t] of a.DropPreview) {
        r.push([{
          ItemId: e,
          IncId: 0
        }, t]);
      }
    }
    return r;
  }
  get Title() {
    return this.Lo.Title;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get CanReceive() {
    return this.rVc;
  }
  get IsReceived() {
    return this.sJh;
  }
  UpdateByServerData(e) {
    this.rVc = e.m4c;
    this.sJh = e.d4c;
  }
}
exports.CiacconaGalRewardData = CiacconaGalRewardData;
//# sourceMappingURL=CiacconaGalRewardData.js.map