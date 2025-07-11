"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalLineItem = undefined;
const UE = require("ue");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SignalItemBase_1 = require("./SignalItemBase");
class SignalLineItem extends SignalItemBase_1.SignalItemBase {
  constructor() {
    super(...arguments);
    this.DEo = undefined;
    this.REo = undefined;
  }
  Init(t, i) {
    this.SetRootActor(t.GetOwner(), true);
    this.Width = this.RootItem.Width;
    this.RootItem.SetAnchorOffsetX(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  OnStart() {
    this.DEo = this.GetSprite(0);
    this.REo = this.GetSprite(1);
  }
  AddWidth(t) {
    this.Width += t;
    this.RootItem.SetWidth(this.Width);
  }
  OnReset() {
    this.DEo.SetUIActive(true);
    this.REo.SetFillAmount(0);
    this.REo.SetUIActive(true);
  }
  InitByGameplayType(t) {
    super.InitByGameplayType(t);
    let i = t === 2 ? "SP_SignalNoteSolidLineGreen" : "SP_SignalNoteSolidLineYellow";
    if (t === 3) {
      i = "SP_SignalNoteSolidLineOrange";
    }
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(t, this.REo, false);
    this.Reset();
  }
  OnUpdate() {
    var t;
    var i;
    return !!super.OnUpdate() && (i = -this.DecisionShowSize / 2, t = this.REo.GetFillAmount(), this.CurrentRelativeX < i ? t !== 0 && this.REo.SetFillAmount(0) : t !== (i = this.GetProgress()) && this.REo.SetFillAmount(i), true);
  }
  GetProgress() {
    var t = -this.DecisionShowSize / 2;
    var t = this.CurrentRelativeX - t;
    return MathCommon_1.MathCommon.Clamp(t / this.RootItem.Width, 0, 1);
  }
}
exports.SignalLineItem = SignalLineItem;
//# sourceMappingURL=SignalLineItem.js.map