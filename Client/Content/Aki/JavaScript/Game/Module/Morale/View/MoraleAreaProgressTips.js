"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaProgressTips = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MoraleAreaProgressItem_1 = require("./MoraleAreaProgressItem"),
  MoraleAreaProgressPointItem_1 = require("./MoraleAreaProgressPointItem");
class MoraleAreaProgressTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.OpenParam = void 0, this.PercentLayout = void 0, this.PointLayout = void 0, this.NewProgressCurve = void 0, this.GridProgressCurve = void 0, this.NewProgressPromise = void 0, this.GridProgressPromise = void 0, this.IsPlayingNewProgress = !1, this.IsPlayingGridProgress = !1, this.NewProgressTime = 0, this.GridProgressTime = 0, this.DeltaNewProgressTime = 0, this.DeltaGridProgressTime = 0, this._$1 = () => new MoraleAreaProgressItem_1.MoraleAreaProgressItem, this.Veu = () => new MoraleAreaProgressPointItem_1.MoraleAreaProgressPointItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UISliderComponent],
      [4, UE.UILayoutBase],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIText]
    ]
  }
  Es_() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam])
  }
  async OnBeforeStartAsync() {
    this.Es_(), await super.OnBeforeStartAsync(), await this.InitCurve();
    var s = this.GetLayoutBase(0),
      t = this.GetItem(1)?.GetOwner(),
      s = (this.PercentLayout = new GenericLayout_1.GenericLayout(s, this._$1, t), this.GetLayoutBase(4)),
      t = this.GetItem(5)?.GetOwner();
    this.PointLayout = new GenericLayout_1.GenericLayout(s, this.Veu, t)
  }
  OnStart() {
    this.UpdateData()
  }
  OnAfterShow() {
    this.PlayAllProgress()
  }
  OnBeforeDestroy() {
    this.IsPlayingGridProgress = !1, this.IsPlayingNewProgress = !1, this.NewProgressPromise?.SetResult(), this.GridProgressPromise?.SetResult()
  }
  UpdateData() {
    this.UpdateProgressDesc();
    var s = this.OpenParam?.InfoList ?? [];
    this.PercentLayout?.RefreshByData(s), this.PointLayout?.RefreshByData(s), this.UpdateNewProgress(0), this.UpdateGridProgress(0)
  }
  UpdateProgressText(s) {
    var t = this.GetText(6),
      i = this.GetTotalValue(),
      s = Math.floor(s) + "/" + i;
    t?.SetText(s)
  }
  GetTotalValue() {
    var s = this.OpenParam?.InfoList ?? [];
    return s[s.length - 1]?.TargetScore ?? 1
  }
  GetStartValue() {
    return this.OpenParam?.StartNum ?? 0
  }
  GetAddValue() {
    return this.OpenParam?.AddNum ?? 0
  }
  GetTargetValue() {
    return this.GetStartValue() + this.GetAddValue()
  }
  UpdateProgressDesc() {
    var s = this.GetAddValue(),
      t = this.GetText(7);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.OpenParam?.SourceDescKey ?? "", s)
  }
  UpdateNewProgress(s) {
    var t = Math.max(0, Math.min(s, 1)),
      i = this.GetSlider(3),
      e = this.GetStartValue(),
      r = this.GetTotalValue(),
      a = this.GetAddValue(),
      h = a * t / r,
      o = e / r + h;
    i?.SetValue(o), this.GridProgressTime <= 0 && this.UpdateProgressText(e + a * t), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "UpdateNewProgress", ["percent", s], ["limitPercent", t], ["start", e], ["total", r], ["add", a], ["addPercent", h], ["value", o])
  }
  UpdateGridProgress(s) {
    var t = Math.max(0, Math.min(s, 1)),
      i = this.GetStartValue(),
      e = this.GetAddValue();
    const r = i + e * t;
    this.PercentLayout?.GetLayoutItemList().forEach(s => {
      s.SetUiProgressByScore(r)
    }), this.PointLayout?.GetLayoutItemList().forEach(s => {
      s.SetUiProgressByScore(r)
    }), this.UpdateProgressText(r), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "UpdateGridProgress", ["percent", s], ["limitPercent", t], ["start", i], ["add", e], ["value", r])
  }
  async InitCurve() {
    this.NewProgressCurve = await this.LoadCurveFloat("MoraleNewProgressCurve"), this.GridProgressCurve = await this.LoadCurveFloat("MoraleGridProgressCurve"), this.NewProgressTime = this.GetCurveTime(this.NewProgressCurve), this.GridProgressTime = this.GetCurveTime(this.GridProgressCurve)
  }
  GetCurveTime(s) {
    var t = s.FloatCurve.Keys.Num();
    return 1e3 * (s.FloatCurve.Keys.Get(t - 1).Time ?? 1)
  }
  GetCurveValue(s, t) {
    return s.GetFloatValue(t / 1e3)
  }
  async LoadCurveFloat(s) {
    s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    return new LoadAsyncPromise_1.LoadAsyncPromise(s, UE.CurveFloat).Promise
  }
  async PlayNewProgress() {
    await this.NewProgressPromise?.Promise, this.IsPlayingNewProgress = !0, this.DeltaNewProgressTime = 0, this.NewProgressPromise = new CustomPromise_1.CustomPromise, await this.NewProgressPromise?.Promise, this.NewProgressPromise = void 0
  }
  async PlayGridProgress() {
    this.GridProgressTime <= 0 || (await this.GridProgressPromise?.Promise, this.IsPlayingGridProgress = !0, this.DeltaGridProgressTime = 0, this.GridProgressPromise = new CustomPromise_1.CustomPromise, await this.GridProgressPromise?.Promise, this.GridProgressPromise = void 0)
  }
  async PlayAllProgress() {
    await this.PlayNewProgress(), await this.PlayGridProgress(), this.CloseMe()
  }
  OnTick(s) {
    this.TickNewProgress(s), this.TickGridProgress(s)
  }
  TickNewProgress(t) {
    if (this.IsPlayingNewProgress) {
      this.DeltaNewProgressTime += t;
      let s = this.DeltaNewProgressTime;
      this.DeltaNewProgressTime >= this.NewProgressTime && (s = this.NewProgressTime, this.IsPlayingNewProgress = !1, this.NewProgressPromise?.SetResult());
      t = this.GetCurveValue(this.NewProgressCurve, s);
      this.UpdateNewProgress(t)
    }
  }
  TickGridProgress(t) {
    if (this.IsPlayingGridProgress) {
      this.DeltaGridProgressTime += t;
      let s = this.DeltaGridProgressTime;
      this.DeltaGridProgressTime >= this.GridProgressTime && (s = this.GridProgressTime, this.IsPlayingGridProgress = !1, this.GridProgressPromise?.SetResult());
      t = this.GetCurveValue(this.GridProgressCurve, s);
      this.UpdateGridProgress(t)
    }
  }
  LogInfo() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "LogInfo", ["IsPlayingNewProgress", this.IsPlayingNewProgress], ["IsPlayingGridProgress", this.IsPlayingGridProgress], ["NewProgressTime", this.NewProgressTime], ["GridProgressTime", this.GridProgressTime], ["DeltaNewProgressTime", this.DeltaNewProgressTime], ["DeltaGridProgressTime", this.DeltaGridProgressTime], ["NewProgressPromise-IsPending", this.NewProgressPromise?.IsPending()], ["GridProgressPromise-IsPending", this.GridProgressPromise?.IsPending()])
  }
}
exports.MoraleAreaProgressTips = MoraleAreaProgressTips;
//# sourceMappingURL=MoraleAreaProgressTips.js.map