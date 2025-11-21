"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRewardViewModel = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const TrapDefenseRewardTabItem_1 = require("../View/Reward/TrapDefenseRewardTabItem");
class TrapDefenseRewardViewModel {
  constructor() {
    this.CurSelectRewardType = 0;
    this.l9u = [];
  }
  static Create() {
    return new TrapDefenseRewardViewModel();
  }
  Clear() {
    this.CurSelectRewardType = 0;
    this.l9u.length = 0;
  }
  RegisterOnSelectRewardTypeChange(e) {
    if (!this.l9u.includes(e)) {
      this.l9u.push(e);
    }
  }
  UnregisterOnSelectRewardTypeChange(e) {
    e = this.l9u.indexOf(e);
    if (e >= 0) {
      this.l9u.splice(e, 1);
    }
  }
  SetCurSelectRewardType(e) {
    if (this.CurSelectRewardType !== e) {
      this.CurSelectRewardType = e;
      this._9u(e);
    }
  }
  GetRewardTypeDataList() {
    var r = [];
    for (let e = 1; e < 5; e++) {
      var t = e;
      if (ModelManager_1.ModelManager.TrapDefenseModel.RewardData.GetRewardListByType(t).length !== 0) {
        r.push(new TrapDefenseRewardTabItem_1.TrapDefenseRewardTabData(t));
      }
    }
    return r;
  }
  _9u(e) {
    for (const r of this.l9u) {
      r(e);
    }
  }
}
exports.TrapDefenseRewardViewModel = TrapDefenseRewardViewModel;
//# sourceMappingURL=TrapDefenseRewardViewModel.js.map