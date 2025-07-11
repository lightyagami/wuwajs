"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrapplingHookTracked = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiControl_1 = require("../../BattleUiControl");
const RAD_2_DEG = 180 / Math.PI;
class GrapplingHookTracked extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.tlt = false;
    this.hwe = new UE.Rotator();
    this.Due = undefined;
    this.ilt = () => {
      if (this.Due) {
        BattleUiControl_1.BattleUiControl.FocusToTargetLocation(this.Due);
      }
    };
    this.CreateThenShowByResourceIdAsync("UiItem_GsTracked", t, true).then(() => {
      this.tlt = true;
    }, () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.ilt]];
  }
  Refresh(t, e) {
    var s;
    if (this.tlt) {
      s = this.GetItem(0);
      this.hwe.Pitch = 0;
      this.hwe.Yaw = Math.atan2(t.Y, t.X) * RAD_2_DEG - 90;
      this.hwe.Roll = 0;
      s.SetUIRelativeRotation(this.hwe);
      this.RootItem.SetAnchorOffset(t);
      this.Due = e;
    }
  }
  GetIsTrackedActivated() {
    return this.tlt;
  }
  OnBeforeDestroy() {
    this.tlt = false;
    this.Due = undefined;
  }
}
exports.GrapplingHookTracked = GrapplingHookTracked;
//# sourceMappingURL=GrapplingHookTracked.js.map