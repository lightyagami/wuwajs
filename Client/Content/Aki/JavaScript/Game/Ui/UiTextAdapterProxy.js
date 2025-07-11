"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiTextAdapterProxy = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const TickSystem_1 = require("../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const Global_1 = require("../Global");
const LguiUtil_1 = require("../Module/Util/LguiUtil");
const FONT_SIZE = 38;
const DELAY_REFRESH_TIME = 100;
class UiTextAdapterProxy {
  constructor(t) {
    this.BindText = t;
    this.$Js = 0;
    this.DefaultToggleItemHeight = 0;
    this.Qoa = undefined;
    this.Rqe = undefined;
    this.hMa = undefined;
    this.E1a = true;
    this.lMa = undefined;
    this.nLc = undefined;
    this.dua = () => {
      var t = Global_1.Global.CharacterController;
      var i = (0, puerts_1.$ref)(0);
      var s = (0, puerts_1.$ref)(0);
      t.GetViewportSize(i, s);
      var t = (0, puerts_1.$unref)(i);
      var i = (0, puerts_1.$unref)(s);
      return new UE.IntPoint(t, i);
    };
    this.J_ = () => {
      var t = this.dua();
      if (this.hMa?.X !== t.X || this.hMa?.Y !== t.Y) {
        this.hMa = t;
        this.y1a();
      }
    };
  }
  Init() {
    this.nLc = this.BindText.GetOwner().GetUIItem().GetParentAsUIItem();
    this.Qoa = this.nLc.GetOwner().GetComponentByClass(UE.UISizeControlByOther.StaticClass());
    this.$Js = this.BindText.GetSize();
    this.DefaultToggleItemHeight = this.nLc.GetHeight();
    this.hMa = this.dua();
    this.StartTick();
  }
  SetLocalText(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.BindText, t, i);
    this.Xp1();
  }
  SetText(t) {
    this.BindText.SetText(t);
    this.Xp1();
  }
  Xp1() {
    this.lMa ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.y1a();
      this.lMa = undefined;
    }, DELAY_REFRESH_TIME);
  }
  StartTick() {
    this.StopTick();
    this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "UiTextSizeFitter." + this.BindText.GetName());
  }
  StopTick() {
    if (this.Rqe) {
      TickSystem_1.TickSystem.Remove(this.Rqe.Id);
      this.Rqe = undefined;
    }
  }
  Clear() {
    this.StopTick();
    if (this.lMa && TimerSystem_1.GameplayTimerSystem.Has(this.lMa)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.lMa);
      this.lMa = undefined;
    }
  }
  y1a() {
    var t;
    if (this.BindText && this.nLc && (this.BindText.GetRealSize(), t = this.BindText.GetRenderLineNum() < 2, this.E1a !== t)) {
      this.E1a = t;
      if (this.E1a) {
        this.Qoa?.SetControlHeight(false);
        this.BindText.SetFontSize(this.$Js);
        this.BindText.GetRealSize();
        if (!(this.BindText.GetRenderLineNum() < 2)) {
          this.BindText.SetFontSize(FONT_SIZE);
        }
        this.nLc?.SetHeight(this.DefaultToggleItemHeight);
      } else {
        this.BindText.SetFontSize(FONT_SIZE);
        this.Qoa?.SetControlHeight(true);
        this.BindText.SetFontSize(FONT_SIZE);
        this.BindText.GetRealSize();
        if (this.BindText.GetRenderLineNum() < 2) {
          this.Qoa?.SetControlHeight(false);
          this.E1a = true;
        } else {
          this.Qoa?.SetControlHeight(true);
        }
      }
    }
  }
}
exports.UiTextAdapterProxy = UiTextAdapterProxy;
//# sourceMappingURL=UiTextAdapterProxy.js.map