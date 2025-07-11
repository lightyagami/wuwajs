"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreBarList = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TrainingItem_1 = require("../../TrainingDegree/TrainingItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardExploreBarList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._fi = undefined;
    this.ufi = undefined;
    this.Y0i = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
    this.BtnBindInfo = [];
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
  Refresh(i, e) {
    var t = !StringUtils_1.StringUtils.IsEmpty(i);
    if (t) {
      this.Ubt(i);
    }
    this.mfi(t);
    this.dfi(e);
  }
  dfi(i) {
    this.cfi();
    var e = this.GetItem(0);
    if (i && i.length !== 0) {
      for (const t of i) {
        this.Cfi(t);
      }
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
    }
  }
  Ubt(i) {}
  mfi(i) {}
  Cfi(i) {
    var e = LguiUtil_1.LguiUtil.CopyItem(this._fi, this.ufi);
    var e = new TrainingItem_1.TrainingItem(e);
    e.SetData(i.TrainingData);
    e.SetActive(true);
    this.Y0i.push(e);
  }
  cfi() {
    for (const i of this.Y0i) {
      i.Destroy();
    }
    this.Y0i.length = 0;
  }
}
exports.RewardExploreBarList = RewardExploreBarList;
//# sourceMappingURL=RewardExploreBarList.js.map