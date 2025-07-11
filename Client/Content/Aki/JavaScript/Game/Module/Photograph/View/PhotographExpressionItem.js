"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographExpressionItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LOCK_ALPHA = 0.3;
const UNLOCK_ALPHA = 1;
class PhotographExpressionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IKi = 0;
    this.fPi = undefined;
    this.TKi = undefined;
    this.LKi = undefined;
    this.gke = () => {
      var t = this.DKi();
      if (t && this.TKi) {
        return this.TKi(this);
      } else {
        return t;
      }
    };
    this.jYe = t => {
      if (this.DKi() && this.fPi) {
        this.fPi(this, t === 1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).CanExecuteChange.Unbind();
  }
  Refresh(t) {
    var i;
    var e;
    if ((this.IKi = t) !== 0 && (this.LKi = ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(t), this.LKi)) {
      t = this.LKi.Name;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
      t = this.DKi();
      i = this.GetExtendToggle(0);
      if (t) {
        i.RootUIComp.SetAlpha(UNLOCK_ALPHA);
        e = this.LKi.IconType;
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_PhotoMotionIcon" + e);
        this.SetSpriteByPath(e, this.GetSprite(1), false);
      } else {
        i.RootUIComp.SetAlpha(LOCK_ALPHA);
        e = this.LKi.ConditionTipsId;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
      }
      this.GetText(3).SetUIActive(!t);
      this.GetSprite(1).SetUIActive(t);
      this.GetItem(4).SetUIActive(!t);
    }
  }
  DKi() {
    var t;
    return this.IKi === 0 || (t = this.LKi.UnLockConditionGroup) === 0 || ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(t.toString(), undefined, true);
  }
  BindOnSelected(t) {
    this.fPi = t;
  }
  BindOnCanExecuteChange(t) {
    this.TKi = t;
  }
  SetSelected(t, i = false) {
    var e = this.GetExtendToggle(0);
    if (t) {
      e.SetToggleStateForce(1, i);
    } else {
      e.SetToggleStateForce(0, i);
    }
  }
  GetPhotoMontageId() {
    return this.IKi;
  }
  GetPhotoMontageConfig() {
    return this.LKi;
  }
}
exports.PhotographExpressionItem = PhotographExpressionItem;
//# sourceMappingURL=PhotographExpressionItem.js.map