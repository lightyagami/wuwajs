"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShootAimUnit = undefined;
const UE = require("ue");
const HudUnitBase_1 = require("../HudUnitBase");
class FollowShootAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.fXi = [];
    this.LFa = false;
    this.AFa = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UIItem], [10, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    for (let t = 0; t <= 8; t++) {
      this.fXi.push(this.GetTexture(t));
    }
  }
  RefreshState(t, s = false) {
    if (this.LFa !== t || s) {
      this.LFa = t;
      for (const i of this.fXi) {
        i.SetChangeColor(t, i.changeColor);
      }
    }
  }
  SetIsAimTarget(t) {
    if (this.AFa !== t) {
      this.AFa = t;
      if (this.AFa) {
        this.StopTweenAnim(10);
        this.PlayTweenAnim(9);
      } else {
        this.StopTweenAnim(9);
        this.PlayTweenAnim(10);
      }
    }
  }
}
exports.FollowShootAimUnit = FollowShootAimUnit;
//# sourceMappingURL=FollowShootAimUnit.js.map