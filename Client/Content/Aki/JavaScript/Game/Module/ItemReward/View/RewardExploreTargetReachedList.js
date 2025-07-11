"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreTargetReachedList = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RewardExploreTargetReached_1 = require("./RewardExploreTargetReached");
class RewardExploreTargetReachedList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._fi = undefined;
    this.ufi = undefined;
    this.Y0i = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.ufi = this.GetItem(0);
    this._fi = this.GetItem(1);
    this._fi.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.ufi = undefined;
    this._fi = undefined;
    this.cfi();
  }
  SetBarList(e) {
    this.cfi();
    var t = this.GetItem(0);
    if (e && e.length !== 0) {
      for (const r of e) {
        this.Cfi(r);
      }
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  Cfi(e) {
    var t = LguiUtil_1.LguiUtil.DuplicateActor(this._fi.GetOwner(), this.ufi);
    var t = new RewardExploreTargetReached_1.RewardExploreTargetReached(t);
    t.Refresh(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 5, e?.DescriptionTextId);
    }
    t.SetActive(true);
    this.Y0i.push(t);
  }
  cfi() {
    for (const e of this.Y0i) {
      e.Destroy();
    }
    this.Y0i.length = 0;
  }
}
exports.RewardExploreTargetReachedList = RewardExploreTargetReachedList;
//# sourceMappingURL=RewardExploreTargetReachedList.js.map