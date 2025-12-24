"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourTaskTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MotorParkourTaskTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnToggleCallback = t => {};
    this.N8e = () => {
      this.OnToggleCallback?.(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIExtendToggleSpriteTransition], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(0).bLockStateOnSelect = true;
  }
  Refresh(t, i, s) {
    this.Pe = t;
    this.SetSpriteByPath(t.RomanNum, this.GetSprite(1), false, undefined, () => {
      this.GetUiExtendToggleSpriteTransition(3).SetAllStateSprite(this.GetSprite(1).GetSprite());
    });
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.LevelName);
    this.GetItem(4)?.SetUIActive(t.HasRewardRedDot);
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  GetKey(t, i) {
    return t.Id;
  }
}
exports.MotorParkourTaskTabItem = MotorParkourTaskTabItem;
//# sourceMappingURL=MotorParkourTaskTabItem.js.map