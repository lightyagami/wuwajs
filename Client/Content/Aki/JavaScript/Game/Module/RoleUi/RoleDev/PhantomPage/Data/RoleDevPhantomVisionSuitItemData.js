"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitItemData = undefined;
class RoleDevPhantomVisionSuitItemData {
  constructor() {
    this.FFe = 0;
    this.FGi = "";
    this.Ivd = 0;
    this.Tvd = "";
    this.B7d = [];
    this.k7d = [];
    this.EMh = 0;
    this.O7d = 0;
    this.JGi = 0;
    this.q7d = 0;
    this.DCm = "";
  }
  get Id() {
    return this.FFe;
  }
  get Name() {
    return this.FGi;
  }
  get Cost() {
    return this.Ivd;
  }
  get ButtonName() {
    return this.Tvd;
  }
  get MonsterDataList() {
    return this.B7d;
  }
  get RewardDataList() {
    return this.k7d;
  }
  get DungeonId() {
    return this.EMh;
  }
  get FetterGroupId() {
    return this.O7d;
  }
  get RoleId() {
    return this.JGi;
  }
  get ItemType() {
    return this.q7d;
  }
  get TypeIcon() {
    return this.DCm;
  }
  InitByBaseData(t, e, s, i, h, r) {
    this.FFe = t;
    this.q7d = e;
    this.FGi = s;
    this.Ivd = i;
    this.Tvd = h;
    this.DCm = r;
  }
  SetItemType(t) {
    this.q7d = t;
  }
  SetMonsterDataList(t) {
    this.B7d = [...t];
  }
  SetRewardDataList(t) {
    this.k7d = [...t];
  }
  AddMonsterDataItem(t) {
    this.B7d.push(t);
  }
  AddRewardDataItem(t) {
    this.k7d.push(t);
  }
  SetDungeonId(t) {
    this.EMh = t;
  }
  SetFetterGroupInfo(t, e) {
    this.O7d = t;
    this.JGi = e;
  }
}
exports.RoleDevPhantomVisionSuitItemData = RoleDevPhantomVisionSuitItemData;
//# sourceMappingURL=RoleDevPhantomVisionSuitItemData.js.map