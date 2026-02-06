"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightItemData = undefined;
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
class MotorFightItemData {
  constructor(t, e) {
    this.Lo = undefined;
    this.P4e = false;
    this.Count = undefined;
    this.Lo = t;
    this.Count = e;
  }
  set IsUnLock(t) {
    this.P4e = t;
  }
  get IsUnLock() {
    return this.P4e || this.Count !== undefined;
  }
  get HasItemRedDot() {
    var t;
    return !!this.IsUnLock && (!(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightItemClicked)) || !t.has(this.Id));
  }
  ReadItemRedDot() {
    var t;
    if (this.IsUnLock) {
      if (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightItemClicked)) {
        t.add(this.Id);
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightItemClicked, t);
      } else {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorFightItemClicked, new Set([this.Id]));
      }
    }
  }
  get Id() {
    return this.Lo.Id;
  }
  get Name() {
    return this.Lo.Name;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get DescParams() {
    return this.Lo.DescParam;
  }
  get Type() {
    return this.Lo.Type;
  }
  get Quality() {
    return this.Lo.Quality;
  }
  get Icon() {
    return this.Lo.Icon;
  }
  get BigIcon() {
    return this.Lo.IconBig;
  }
  get ConditionId() {
    return this.Lo.UnlockCondition;
  }
}
exports.MotorFightItemData = MotorFightItemData;
//# sourceMappingURL=MotorFightItemData.js.map