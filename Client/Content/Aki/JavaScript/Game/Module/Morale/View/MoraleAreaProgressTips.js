"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaProgressTips = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MoraleAreaProgressItem_1 = require("./MoraleAreaProgressItem");
const MoraleAreaProgressPointItem_1 = require("./MoraleAreaProgressPointItem");
class MoraleAreaProgressTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.PercentLayout = undefined;
    this.PointLayout = undefined;
    this.NewProgressCurve = undefined;
    this.GridProgressCurve = undefined;
    this.NewProgressPromise = undefined;
    this.GridProgressPromise = undefined;
    this.IsPlayingNewProgress = false;
    this.IsPlayingGridProgress = false;
    this.NewProgressTime = 0;
    this.GridProgressTime = 0;
    this.DeltaNewProgressTime = 0;
    this.DeltaGridProgressTime = 0;
    this.Q$1 = () => new MoraleAreaProgressItem_1.MoraleAreaProgressItem();
    this.Otu = () => new MoraleAreaProgressPointItem_1.MoraleAreaProgressPointItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISliderComponent], [4, UE.UILayoutBase], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    await this.InitCurve();
    var s = this.GetLayoutBase(0);
    var t = this.GetItem(1)?.GetOwner();
    this.PercentLayout = new GenericLayout_1.GenericLayout(s, this.Q$1, t);
    var s = this.GetLayoutBase(4);
    var t = this.GetItem(5)?.GetOwner();
    this.PointLayout = new GenericLayout_1.GenericLayout(s, this.Otu, t);
  }
  OnStart() {
    this.UpdateData();
  }
  OnAfterShow() {
    this.PlayAllProgress();
  }
  OnBeforeDestroy() {
    this.IsPlayingGridProgress = false;
    this.IsPlayingNewProgress = false;
    this.NewProgressPromise?.SetResult();
    this.GridProgressPromise?.SetResult();
  }
  UpdateData() {
    this.UpdateProgressDesc();
    var s = this.OpenParam?.InfoList ?? [];
    this.PercentLayout?.RefreshByData(s);
    this.PointLayout?.RefreshByData(s);
    this.UpdateNewProgress(0);
    this.UpdateGridProgress(0);
  }
  UpdateProgressText(s) {
    var t = this.GetText(6);
    var i = this.GetTotalValue();
    var s = Math.floor(s) + "/" + i;
    t?.SetText(s);
  }
  GetTotalValue() {
    var s = this.OpenParam?.InfoList ?? [];
    return s[s.length - 1]?.TargetScore ?? 1;
  }
  GetStartValue() {
    return this.OpenParam?.StartNum ?? 0;
  }
  GetAddValue() {
    return this.OpenParam?.AddNum ?? 0;
  }
  GetTargetValue() {
    return this.GetStartValue() + this.GetAddValue();
  }
  UpdateProgressDesc() {
    var s = this.GetAddValue();
    var t = this.GetText(7);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.OpenParam?.SourceDescKey ?? "", s);
  }
  UpdateNewProgress(s) {
    var t = Math.max(0, Math.min(s, 1));
    var i = this.GetSlider(3);
    var e = this.GetStartValue();
    var r = this.GetTotalValue();
    var a = this.GetAddValue();
    var h = a * t / r;
    var o = e / r + h;
    i?.SetValue(o);
    if (this.GridProgressTime <= 0) {
      this.UpdateProgressText(e + a * t);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "UpdateNewProgress", ["percent", s], ["limitPercent", t], ["start", e], ["total", r], ["add", a], ["addPercent", h], ["value", o]);
    }
  }
  UpdateGridProgress(s) {
    var t = Math.max(0, Math.min(s, 1));
    var i = this.GetStartValue();
    var e = this.GetAddValue();
    const r = i + e * t;
    this.PercentLayout?.GetLayoutItemList().forEach(s => {
      s.SetUiProgressByScore(r);
    });
    this.PointLayout?.GetLayoutItemList().forEach(s => {
      s.SetUiProgressByScore(r);
    });
    this.UpdateProgressText(r);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "UpdateGridProgress", ["percent", s], ["limitPercent", t], ["start", i], ["add", e], ["value", r]);
    }
  }
  async InitCurve() {
    this.NewProgressCurve = await this.LoadCurveFloat("MoraleNewProgressCurve");
    this.GridProgressCurve = await this.LoadCurveFloat("MoraleGridProgressCurve");
    this.NewProgressTime = this.GetCurveTime(this.NewProgressCurve);
    this.GridProgressTime = this.GetCurveTime(this.GridProgressCurve);
  }
  GetCurveTime(s) {
    var t = s.FloatCurve.Keys.Num();
    return (s.FloatCurve.Keys.Get(t - 1).Time ?? 1) * 1000;
  }
  GetCurveValue(s, t) {
    return s.GetFloatValue(t / 1000);
  }
  async LoadCurveFloat(s) {
    s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    return new LoadAsyncPromise_1.LoadAsyncPromise(s, UE.CurveFloat).Promise;
  }
  async PlayNewProgress() {
    await this.NewProgressPromise?.Promise;
    this.IsPlayingNewProgress = true;
    this.DeltaNewProgressTime = 0;
    this.NewProgressPromise = new CustomPromise_1.CustomPromise();
    await this.NewProgressPromise?.Promise;
    this.NewProgressPromise = undefined;
  }
  async PlayGridProgress() {
    if (!(this.GridProgressTime <= 0)) {
      await this.GridProgressPromise?.Promise;
      this.IsPlayingGridProgress = true;
      this.DeltaGridProgressTime = 0;
      this.GridProgressPromise = new CustomPromise_1.CustomPromise();
      await this.GridProgressPromise?.Promise;
      this.GridProgressPromise = undefined;
    }
  }
  async PlayAllProgress() {
    await this.PlayNewProgress();
    await this.PlayGridProgress();
    this.CloseMe();
  }
  OnTick(s) {
    this.TickNewProgress(s);
    this.TickGridProgress(s);
  }
  TickNewProgress(t) {
    if (this.IsPlayingNewProgress) {
      this.DeltaNewProgressTime += t;
      let s = this.DeltaNewProgressTime;
      if (this.DeltaNewProgressTime >= this.NewProgressTime) {
        s = this.NewProgressTime;
        this.IsPlayingNewProgress = false;
        this.NewProgressPromise?.SetResult();
      }
      t = this.GetCurveValue(this.NewProgressCurve, s);
      this.UpdateNewProgress(t);
    }
  }
  TickGridProgress(t) {
    if (this.IsPlayingGridProgress) {
      this.DeltaGridProgressTime += t;
      let s = this.DeltaGridProgressTime;
      if (this.DeltaGridProgressTime >= this.GridProgressTime) {
        s = this.GridProgressTime;
        this.IsPlayingGridProgress = false;
        this.GridProgressPromise?.SetResult();
      }
      t = this.GetCurveValue(this.GridProgressCurve, s);
      this.UpdateGridProgress(t);
    }
  }
  LogInfo() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "LogInfo", ["IsPlayingNewProgress", this.IsPlayingNewProgress], ["IsPlayingGridProgress", this.IsPlayingGridProgress], ["NewProgressTime", this.NewProgressTime], ["GridProgressTime", this.GridProgressTime], ["DeltaNewProgressTime", this.DeltaNewProgressTime], ["DeltaGridProgressTime", this.DeltaGridProgressTime], ["NewProgressPromise-IsPending", this.NewProgressPromise?.IsPending()], ["GridProgressPromise-IsPending", this.GridProgressPromise?.IsPending()]);
    }
  }
}
exports.MoraleAreaProgressTips = MoraleAreaProgressTips;
//# sourceMappingURL=MoraleAreaProgressTips.js.map