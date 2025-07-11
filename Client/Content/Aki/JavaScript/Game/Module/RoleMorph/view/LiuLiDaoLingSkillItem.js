"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiuLiDaoLingSkillItem = undefined;
const UE = require("ue");
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LiuLiDaoLingSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xy = 0;
    this.wut = false;
    this.$ct = InputEnums_1.EInputAxis.None;
    this.jce = 0;
    this.rTt = undefined;
    this.Oc_ = () => {
      this.wut = true;
      InputController_1.InputController.InputAxis(this.$ct, this.jce);
      this.rTt?.(this.Xy);
    };
    this.Gc_ = () => {
      this.wut = false;
      InputController_1.InputController.InputAxis(this.$ct, 0);
    };
  }
  RefreshByMoveType(t, s, i, e) {
    this.Xy = t;
    this.$ct = s;
    this.jce = i;
    this.rTt = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]];
  }
  OnAfterShow() {
    super.OnAfterShow();
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.Oc_);
    t.OnPointUpCallBack.Bind(this.Gc_);
    t.OnPointCancelCallBack.Bind(this.Gc_);
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    this.wut = false;
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind();
    t.OnPointUpCallBack.Unbind();
    t.OnPointCancelCallBack.Unbind();
  }
  Tick(t) {
    if (this.wut) {
      InputController_1.InputController.InputAxis(this.$ct, this.jce);
    }
  }
  Press(t) {
    if (t !== this.wut) {
      if (t) {
        this.Oc_();
      } else {
        this.Gc_();
      }
    }
  }
}
exports.LiuLiDaoLingSkillItem = LiuLiDaoLingSkillItem;
//# sourceMappingURL=LiuLiDaoLingSkillItem.js.map