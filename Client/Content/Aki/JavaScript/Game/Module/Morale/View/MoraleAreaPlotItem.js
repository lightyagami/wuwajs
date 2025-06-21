"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaPlotItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  MoraleTickPromise_1 = require("./MoraleTickPromise");
class MoraleAreaPlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.PlotData = void 0, this.EnterConfig = void 0, this.LoopConfig = void 0, this.EnterTickPromise = void 0, this.NewUnlockTickPromise = void 0, this.LoopTickPromise = void 0
  }
  async Init(t, i) {
    this.PlotData = i, await this.CreateThenShowByActorAsync(t.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UINiagara]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.SetPlotActive(!1)
  }
  SetPlotActive(t) {
    this.GetItem(0)?.SetUIActive(t)
  }
  UpdatePlotState() {
    this.SetPlotActive(this.GetPlotIsActive())
  }
  GetPlotIsActive() {
    var t = this.PlotData.FlagId,
      i = this.PlotData.AreaId;
    return !!ModelManager_1.ModelManager.MoraleModel?.GetAreaData(i)?.GetFlag(t)?.IsActive
  }
  SetPlotLight(t) {
    this.GetItem(2)?.SetUIActive(t)
  }
  SetPlotLightAlpha(t) {
    this.GetItem(2)?.SetAlpha(t)
  }
  SetPlotNewUnlock(t) {
    this.GetUiNiagara(3)?.SetUIActive(t)
  }
  w1u() {
    this.SetPlotActive(!0), this.SetPlotLight(!0), this.A1u(0), this.SetPlotNewUnlock(!1)
  }
  A1u(t) {
    t = this.P1u(t, this.EnterConfig.格子入场曲线);
    this.SetPlotLightAlpha(t)
  }
  x1u() {
    this.SetPlotActive(!0), this.SetPlotLight(!0), this.U1u(0), this.SetPlotNewUnlock(!1)
  }
  U1u(t) {
    t = this.P1u(t, this.LoopConfig.格子入场曲线);
    this.SetPlotLightAlpha(t)
  }
  D1u() {
    this.SetPlotActive(!0), this.SetPlotLight(!1), this.SetPlotLightAlpha(0), this.SetPlotNewUnlock(!0)
  }
  B1u(t) {
    var i = t?.FloatCurve.Keys.Num() ?? 0;
    return 1e3 * (t?.FloatCurve.Keys.Get(i - 1).Time ?? 1)
  }
  P1u(t, i) {
    return i?.GetFloatValue(t / 1e3) ?? 0
  }
  OnTick(t) {
    this.EnterTickPromise?.Tick(t), this.NewUnlockTickPromise?.Tick(t), this.LoopTickPromise?.Tick(t)
  }
  async PlayEnterEffect() {
    if (!this.IsDestroyOrDestroying) {
      if (!this.EnterTickPromise) {
        if (this.EnterConfig = ModelManager_1.ModelManager.MoraleModel.UiEnterConfig, !this.EnterConfig) return;
        this.EnterTickPromise = MoraleTickPromise_1.MoraleTickPromise.Create({
          StartCallback: this.w1u.bind(this),
          TickCallback: this.A1u.bind(this)
        })
      }
      await this.EnterTickPromise.PlayStart(this.B1u(this.EnterConfig.格子入场曲线))
    }
  }
  async PlayNewUnlockEffect() {
    if (!this.IsDestroyOrDestroying) {
      if (!this.NewUnlockTickPromise) {
        if (this.EnterConfig = ModelManager_1.ModelManager.MoraleModel.UiEnterConfig, !this.EnterConfig) return;
        this.NewUnlockTickPromise = MoraleTickPromise_1.MoraleTickPromise.Create({
          StartCallback: this.D1u.bind(this),
          EndCallback: this.SetPlotNewUnlock.bind(this, !1)
        })
      }
      await this.NewUnlockTickPromise.PlayStart(this.EnterConfig.解锁新格子播放所需时间)
    }
  }
  async PlayLoopEffect() {
    if (!this.IsDestroyOrDestroying) {
      if (!this.LoopTickPromise) {
        if (this.LoopConfig = ModelManager_1.ModelManager.MoraleModel.UiLoopConfig, !this.LoopConfig) return;
        this.LoopTickPromise = MoraleTickPromise_1.MoraleTickPromise.Create({
          StartCallback: this.x1u.bind(this),
          TickCallback: this.U1u.bind(this),
          EndCallback: this.U1u.bind(this, 0)
        })
      }
      await this.LoopTickPromise.PlayStart(this.B1u(this.LoopConfig.格子入场曲线))
    }
  }
  OnBeforeDestroy() {
    this.EnterTickPromise?.Destroy(), this.NewUnlockTickPromise?.Destroy(), this.LoopTickPromise?.Destroy()
  }
}
exports.MoraleAreaPlotItem = MoraleAreaPlotItem;
//# sourceMappingURL=MoraleAreaPlotItem.js.map