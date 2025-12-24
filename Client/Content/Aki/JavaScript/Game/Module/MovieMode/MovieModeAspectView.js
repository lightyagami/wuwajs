"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieModeAspectView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const MovieModeDefine_1 = require("./MovieModeDefine");
class MovieModeAspectView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.WI = false;
    this.Rld = undefined;
    this.wld = undefined;
    this.Lld = MovieModeDefine_1.MOVIE_MODE_ASPECT_RATIO;
    this.cwr = 0;
    this.r1t = 0;
    this.Ist = 0;
    this.qte = 0;
    this.dhf = 0;
    this.Pld = false;
    this.LDe = -1;
    this.a1e = true;
    this.mhf = undefined;
    this.fhf = 0;
    this.ghf = 0;
    this.Chf = {
      IsFadeIn: this.a1e,
      IsWidthBlend: this.Pld,
      Offset: 0,
      Progress: 0
    };
    this.phf = 0;
    this.J_ = t => {
      if (this.r1t >= this.cwr) {
        this.yDe();
      } else {
        this.r1t += t;
        this.qte += t * this.Ist;
        this.qte = this.a1e ? Math.max(this.qte, this.dhf) : Math.min(this.qte, this.dhf);
        this.vhf(this.qte);
        this.Chf.IsFadeIn = this.a1e;
        this.Chf.IsWidthBlend = this.Pld;
        this.Chf.Offset = this.Pld ? this.fhf - this.qte : this.ghf - this.qte;
        this.Chf.Progress = this.Chf.Offset / this.phf;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MovieModeAspectOffsetUpdate, this.Chf);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture]];
  }
  OnStart() {
    this.Rld = this.GetTexture(0);
    this.Rld?.SetUIActive(false);
    this.Rld?.SetAlpha(1);
    this.wld = this.GetTexture(1);
    this.wld?.SetUIActive(false);
    this.wld?.SetAlpha(1);
    this.GetRootItem().GetRenderCanvas().bPostTickUpdate = true;
    this.GetRootItem().SetRaycastTarget(false);
  }
  OnBeforeDestroy() {
    this.mhf?.SetResult();
    this.S0t();
  }
  async Fade(t, i) {
    this.WI = true;
    this.cwr = i;
    this.a1e = t;
    this.mhf = new CustomPromise_1.CustomPromise();
    this.Ald();
    await this.mhf.Promise;
  }
  FadeReverse() {
    this.a1e = !this.a1e;
    this.Ist = -this.Ist;
    this.r1t = this.cwr - this.r1t;
    var t = this.Pld ? this.fhf : this.ghf;
    var i = this.Pld ? this.ghf * this.Lld : this.fhf / this.Lld;
    this.dhf = this.a1e ? t / 2 + i / 2 : t;
  }
  yDe() {
    this.mhf?.SetResult();
    this.S0t();
  }
  S0t() {
    ControllerHolder_1.ControllerHolder.MovieModeController.RemoveTick(this.LDe);
    this.LDe = -1;
  }
  Ald() {
    var t;
    var i;
    if (this.WI && (this.WI = false, t = this.OpenParam, this.Rld?.SetUIActive(!t.IsBanAdaptation), this.wld?.SetUIActive(!t.IsBanAdaptation), this.fhf = this.RootItem.GetWidth(), this.ghf = this.RootItem.GetHeight(), t = this.fhf / this.ghf, this.Pld = this.Lld < t, this.Chf.IsWidthBlend = this.Pld, t = this.Pld ? this.fhf : this.ghf, i = this.Pld ? this.ghf * this.Lld : this.fhf / this.Lld, this.Shf(t, t / 2 + i / 2), this.r1t = 0, this.LDe = ControllerHolder_1.ControllerHolder.MovieModeController.AddTick(this.J_), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("MovieMode", 87, "进出电影模式，更新黑边", ["uiWidth", this.fhf], ["uiHeight", this.ghf], ["isFadeIn", this.a1e], ["currentValue", this.qte], ["targetValue", this.dhf]);
    }
  }
  Shf(t, i) {
    this.qte = this.a1e ? t : i;
    this.dhf = this.a1e ? i : t;
    this.phf = Math.abs(this.dhf - this.qte);
    this.Ist = (this.dhf - this.qte) / this.cwr;
    this.vhf(this.qte);
  }
  vhf(t) {
    if (this.Pld) {
      this.Rld?.SetStretchRight(t);
      this.wld?.SetStretchLeft(t);
      this.Rld?.SetStretchTop(0);
      this.wld?.SetStretchBottom(0);
    } else {
      this.Rld?.SetStretchTop(t);
      this.wld?.SetStretchBottom(t);
      this.Rld?.SetStretchRight(0);
      this.wld?.SetStretchLeft(0);
    }
  }
  GetAspectOffset() {
    return this.Chf;
  }
  UpdateTransform() {
    this.fhf = this.RootItem.GetWidth();
    this.ghf = this.RootItem.GetHeight();
    var t = this.fhf / this.ghf;
    this.Pld = this.Lld < t;
    this.Chf.IsWidthBlend = this.Pld;
    var t = this.Pld ? this.fhf : this.ghf;
    var i = t / 2 + (this.Pld ? this.ghf * this.Lld : this.fhf / this.Lld) / 2;
    var s = this.a1e ? t : i;
    var i = this.a1e ? i : t;
    var t = MathUtils_1.MathUtils.Clamp(this.r1t / this.cwr, 0, 1);
    this.qte = s + (i - s) * t;
    this.dhf = i;
    this.phf = Math.abs(i - s);
    this.Ist = (i - s) / this.cwr;
    this.vhf(this.qte);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MovieMode", 87, "屏幕分辨率有改变，更新黑边", ["uiWidth", this.fhf], ["uiHeight", this.ghf], ["isFadeIn", this.a1e], ["currentValue", this.qte], ["targetValue", this.dhf]);
    }
  }
}
exports.MovieModeAspectView = MovieModeAspectView;
//# sourceMappingURL=MovieModeAspectView.js.map