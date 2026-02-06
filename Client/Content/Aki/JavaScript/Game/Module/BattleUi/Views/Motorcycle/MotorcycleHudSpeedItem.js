"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleHudSpeedItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const MotorcyclePercentMachine_1 = require("./MotorcyclePercentMachine");
class MotorcycleHudSpeedItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.IsLeft = false;
    this.Xzf = new MotorcyclePercentMachine_1.MotorcyclePercentMachine();
    this.Rzd = undefined;
    this.r3f = undefined;
    this.e7f = undefined;
    this.Ast = undefined;
    this.u4g = undefined;
    this.c4g = undefined;
    this.hwe = new UE.Rotator(0, 0, 0);
    this.nun = 0;
    this.u8g = 30;
    this.c8g = 175;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture]];
    if (this.IsLeft) {
      this.ComponentRegisterInfos.push([3, UE.UIArtText]);
      this.ComponentRegisterInfos.push([4, UE.UIArtText]);
      this.ComponentRegisterInfos.push([5, UE.UIArtText]);
    }
  }
  OnStart() {
    this.Rzd = this.GetTexture(0);
    this.r3f = this.GetTexture(1);
    this.e7f = this.GetTexture(2);
    if (this.IsLeft) {
      this.Ast = this.GetArtText(3);
      this.u4g = this.GetArtText(4);
      this.c4g = this.GetArtText(5);
      this.r3f.SetUIActive(false);
    }
    this.Xzf.Init(0);
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("MotorHudPointerYawRange");
    if (t && t.length > 1) {
      this.u8g = t[0];
      this.c8g = t[1];
    }
    this.Yzf(0);
  }
  SetSpeed(t, i) {
    this.nun = i;
    this.Xzf.SetTargetPercent(t);
  }
  Yzf(t) {
    var i = this.nun > 0 ? Math.min(1, t / this.nun) : 0;
    this.Rzd.SetFillAmount(0.33 + i * 0.43);
    this.hwe.Yaw = this.u8g + i * (this.c8g - this.u8g);
    this.r3f.SetUIRelativeRotation(this.hwe);
    this.e7f.SetFillAmount(i);
    if (this.IsLeft) {
      i = (t * 0.036).toFixed(0);
      this.Ast.SetText(i);
      this.u4g?.SetText(i);
      this.c4g?.SetText(i);
    }
  }
  Tick(t) {
    if (this.Xzf.Update(t)) {
      this.Yzf(this.Xzf.GetCurPercent());
    }
  }
  SetMainColor(t) {
    this.e7f?.SetColor(t.ToFColor(true));
  }
  SetPointerColor(t) {
    this.r3f?.SetColor(t.ToFColor(true));
  }
  SetNumTextColor(t) {
    if (this.IsLeft) {
      this.Ast?.SetColor(t.ToFColor(true));
    }
  }
  SetNumTextStrokeColor(t) {
    if (this.IsLeft) {
      this.u4g?.SetColor(t.ToFColor(true));
    }
  }
  SetNumTextGlowColor(t) {
    if (this.IsLeft) {
      this.c4g?.SetColor(t.ToFColor(true));
    }
  }
}
exports.MotorcycleHudSpeedItem = MotorcycleHudSpeedItem;
//# sourceMappingURL=MotorcycleHudSpeedItem.js.map