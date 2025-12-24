"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymDifficultyItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LordGymDifficultyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.syi = -1;
    this.OnToggleClick = undefined;
    this.CanExecuteChangeCallBack = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    if (this.OnToggleClick) {
      this.BtnBindInfo = [[0, () => {
        this.OnToggleClick?.(this.GridIndex);
      }]];
    }
  }
  OnStart() {
    if (this.CanExecuteChangeCallBack) {
      this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => this.CanExecuteChangeCallBack?.(this.GridIndex) ?? true);
    }
    this.GetItem(4).SetUIActive(false);
  }
  Refresh(t, e, i) {
    this.syi = t;
    var r;
    var t = !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(this.syi) || !ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.syi);
    this.GetItem(2).SetUIActive(t);
    var t = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(this.syi);
    if (t) {
      r = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(this.syi);
      this.GetItem(3).SetUIActive(r);
      this.SetLevelText(t);
      r = e ? 1 : 0;
      this.GetExtendToggle(0).SetToggleState(r, false);
    }
  }
  SetLevelText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.GymTitle);
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
}
exports.LordGymDifficultyItem = LordGymDifficultyItem;
//# sourceMappingURL=LordGymDifficultyItem.js.map