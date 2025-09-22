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
  InitByBaseData(t, e, s, i) {
    this.FFe = t;
    this.FGi = e;
    this.rCd = s;
    this.oCd = i;
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