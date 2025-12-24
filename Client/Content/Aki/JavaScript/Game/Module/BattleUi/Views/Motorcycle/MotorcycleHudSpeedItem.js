"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleHudSpeedItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const MotorcyclePercentMachine_1 = require("./MotorcyclePercentMachine");
const START_YAW = 25;
const END_YAW = 180;
class MotorcycleHudSpeedItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsLeft = false;
    this.D6f = new MotorcyclePercentMachine_1.MotorcyclePercentMachine();
    this.Rzd = undefined;
    this.ckf = undefined;
    this.FGf = undefined;
    this.Ast = undefined;
    this.hwe = new UE.Rotator(0, 0, 0);
    this.nun = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture]];
    if (this.IsLeft) {
      this.ComponentRegisterInfos.push([3, UE.UIArtText]);
    }
  }
  OnStart() {
    this.Rzd = this.GetTexture(0);
    this.ckf = this.GetTexture(1);
    this.FGf = this.GetTexture(2);
    if (this.IsLeft) {
      this.Ast = this.GetArtText(3);
      this.ckf.SetUIActive(false);
    }
    this.D6f.Init(0);
    this.U6f(0);
  }
  SetSpeed(t, i) {
    this.nun = i;
    this.D6f.SetTargetPercent(t);
  }
  U6f(t) {
    var i = this.nun > 0 ? Math.min(1, t / this.nun) : 0;
    this.Rzd.SetFillAmount(0.33 + i * 0.43);
    this.hwe.Yaw = START_YAW + i * (END_YAW - START_YAW);
    this.ckf.SetUIRelativeRotation(this.hwe);
    this.FGf.SetFillAmount(i);
    if (this.IsLeft) {
      this.Ast.SetText((t * 0.036).toFixed(0));
    }
  }
  Tick(t) {
    if (this.D6f.Update(t)) {
      this.U6f(this.D6f.GetCurPercent());
    }
  }
  SetMainColor(t) {
    this.FGf?.SetColor(t.ToFColor(true));
  }
  SetPointerColor(t) {
    this.ckf?.SetColor(t.ToFColor(true));
    if (this.IsLeft) {
      this.Ast?.SetColor(t.ToFColor(true));
    }
  }
}
exports.MotorcycleHudSpeedItem = MotorcycleHudSpeedItem;
//# sourceMappingURL=MotorcycleHudSpeedItem.js.map