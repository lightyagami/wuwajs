"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleEntranceButton = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const BattleVisibleChildView_1 = require("./BattleVisibleChildView");
class BattleEntranceButton extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.jYe = undefined;
    this.l4e = undefined;
    this.FunctionType = undefined;
    this.HideInGamepad = undefined;
    this.HideByRoleConfig = undefined;
    this.WYe = undefined;
    this.OnClickedOnlineButton = () => {
      if (this.jYe) {
        this.jYe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickedOnlineButton]];
  }
  Initialize(t) {
    var e;
    super.Initialize();
    if (t && (this.HideInGamepad = t.HideInGamepad, this.HideByRoleConfig = t.HideByRoleConfig, (e = t.RedDotName) && (this.l4e = e, RedDotController_1.RedDotController.BindRedDot(e, this.GetItem(1))), this.InitChildType(t.ChildType), e = t.FunctionType)) {
      this.FunctionType = e;
      this.SetFunctionOpen(e, ModelManager_1.ModelManager.FunctionModel.IsOpen(this.FunctionType));
    }
  }
  Reset() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
    }
    this.jYe = undefined;
    super.Reset();
  }
  SetFunctionOpen(t, e) {
    if (t === this.FunctionType) {
      this.SetVisible(1, e);
      this.SetOtherHide(this.WYe?.() ?? false);
    }
  }
  SetGetOtherHideCallCall(t) {
    this.WYe = t;
  }
  SetGamepadHide(t) {
    if (this.HideInGamepad) {
      this.SetVisible(2, !t);
    }
  }
  SetOtherHide(t) {
    this.SetVisible(4, !t);
  }
  SetGmHide(t) {
    this.SetVisible(3, !t);
  }
  BindOnClicked(t) {
    this.jYe = t;
  }
}
exports.BattleEntranceButton = BattleEntranceButton;
//# sourceMappingURL=BattleEntranceButton.js.map