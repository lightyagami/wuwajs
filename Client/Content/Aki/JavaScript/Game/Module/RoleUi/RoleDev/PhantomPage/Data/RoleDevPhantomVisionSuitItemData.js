"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitItemData = undefined;
class RoleDevPhantomVisionSuitItemData {
  constructor() {
    this.FFe = 0;
    this.FGi = "";
    this.rCd = 0;
    this.oCd = "";
    this.ANd = [];
    this.DNd = [];
    this.EMh = 0;
    this.UNd = 0;
    this.JGi = 0;
    this.xNd = 0;
    this.aYd = "";
  }
  get Id() {
    return this.FFe;
  }
  get Name() {
    return this.FGi;
  }
  get Cost() {
    return this.rCd;
  }
  get ButtonName() {
    return this.oCd;
  }
  get MonsterDataList() {
    return this.ANd;
  }
  get RewardDataList() {
    return this.DNd;
  }
  get DungeonId() {
    return this.EMh;
  }
  get FetterGroupId() {
    return this.UNd;
  }
  get RoleId() {
    return this.JGi;
  }
  get ItemType() {
    return this.xNd;
  }
  get TypeIcon() {
    return this.aYd;
  }
  InitByBaseData(t, e, s, i, h, r) {
    this.FFe = t;
    this.xNd = e;
    this.FGi = s;
    this.rCd = i;
    this.oCd = h;
    this.aYd = r;
  }
  SetItemType(t) {
    this.xNd = t;
  }
  SetMonsterDataList(t) {
    this.ANd = [...t];
  }
  SetRewardDataList(t) {
    this.DNd = [...t];
  }
  AddMonsterDataItem(t) {
    this.ANd.push(t);
  }
  AddRewardDataItem(t) {
    this.DNd.push(t);
  }
  SetDungeonId(t) {
    this.EMh = t;
  }
  SetFetterGroupInfo(t, e) {
    this.UNd = t;
    this.JGi = e;
  }
}
exports.RoleDevPhantomVisionSuitItemData = RoleDevPhantomVisionSuitItemData;
//# sourceMappingURL=RoleDevPhantomVisionSuitItemData.js.map