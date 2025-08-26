"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleAreaPlotItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MoraleTickPromise_1 = require("./MoraleTickPromise");
class MoraleAreaPlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PlotData = undefined;
    this.EnterConfig = undefined;
    this.LoopConfig = undefined;
    this.EnterTickPromise = undefined;
    this.NewUnlockTickPromise = undefined;
    this.LoopTickPromise = undefined;
  }
  async Init(t, i) {
    this.PlotData = i;
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.SetPlotActive(false);
  }
  SetPlotActive(t) {
    this.GetItem(0)?.SetUIActive(t);
  }
  UpdatePlotState() {
    this.SetPlotActive(this.GetPlotIsActive());
  }
  GetPlotIsActive() {
    var t = this.PlotData.FlagId;
    var i = this.PlotData.AreaId;
    return !!ModelManager_1.ModelManager.MoraleModel?.GetAreaData(i)?.GetFlag(t)?.IsActive;
  }
  SetPlotLight(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
  SetPlotLightAlpha(t) {
    this.GetItem(2)?.SetAlpha(t);
  }
  SetPlotNewUnlock(t) {
    this.GetUiNiagara(3)?.SetUIActive(t);
  }
  Wyu() {
    this.SetPlotActive(true);
    this.SetPlotLight(true);
    this.Qyu(0);
    this.SetPlotNewUnlock(false);
  }
  Qyu(t) {
    t = this.Kyu(t, this.EnterConfig.格子入场曲线);
    this.SetPlotLightAlpha(t);
  }
  Xyu() {
    this.SetPlotActive(true);
    this.SetPlotLight(true);
    this.Yyu(0);
    this.SetPlotNewUnlock(false);
  }
  Yyu(t) {
    t = this.Kyu(t, this.LoopConfig.格子入场曲线);
    this.SetPlotLightAlpha(t);
  }
  zyu() {
    this.SetPlotActive(true);
    this.SetPlotLight(false);
    this.SetPlotLightAlpha(0);
    this.SetPlotNewUnlock(true);
  }
  Jyu(t) {
    var i = t?.FloatCurve.Keys.Num() ?? 0;
    return (t?.FloatCurve.Keys.Get(i - 1).Time ?? 1) * 1000;
  }
  Kyu(t, i) {
    return i?.GetFloatValue(t / 1000) ?? 0;
  }
  OnTick(t) {
    this.EnterTickPromise?.Tick(t);
    this.NewUnlockTickPromise?.Tick(t);
    this.LoopTickPromise?.Tick(t);
  }
  async PlayEnterEffect() {
    if (!this.IsDestroyOrDestroying) {
      if (!this.EnterTickPromise) {
        this.EnterConfig = ModelManager_1.ModelManager.MoraleModel.UiEnterConfig;
        if (!this.EnterConfig) {
          return;
        }
        this.EnterTickPromise = MoraleTickPromise_1.MoraleTickPromise.Create({
          StartCallback: this.Wyu.bind(this),
          TickCallback: this.Qyu.bind(this)
        });
      }
      await this.EnterTickPromise.PlayStart(this.Jyu(this.EnterConfig.格子入场曲线));
    }
  }
  async PlayNewUnlockEffect() {
    if (!this.IsDestroyOrDestroying) {
      if (!this.NewUnlockTickPromise) {
        this.EnterConfig = ModelManager_1.ModelManager.MoraleModel.UiEnterConfig;
        if (!this.EnterConfig) {
          return;
        }
        this.NewUnlockTickPromise = MoraleTickPromise_1.MoraleTickPromise.Create({
          StartCallback: this.zyu.bind(this),
          EndCallback: this.SetPlotNewUnlock.bind(this, false)
        });
      }
      await this.NewUnlockTickPromise.PlayStart(this.EnterConfig.解锁新格子播放所需时间);
    }
  }
  async PlayLoopEffect() {
    if (!this.IsDestroyOrDestroying) {
      if (!this.LoopTickPromise) {
        this.LoopConfig = ModelManager_1.ModelManager.MoraleModel.UiLoopConfig;
        if (!this.LoopConfig) {
          return;
        }
        this.LoopTickPromise = MoraleTickPromise_1.MoraleTickPromise.Create({
          StartCallback: this.Xyu.bind(this),
          TickCallback: this.Yyu.bind(this),
          EndCallback: this.Yyu.bind(this, 0)
        });
      }
      await this.LoopTickPromise.PlayStart(this.Jyu(this.LoopConfig.格子入场曲线));
    }
  }
  OnBeforeDestroy() {
    this.EnterTickPromise?.Destroy();
    this.NewUnlockTickPromise?.Destroy();
    this.LoopTickPromise?.Destroy();
  }
}
exports.MoraleAreaPlotItem = MoraleAreaPlotItem;
//# sourceMappingURL=MoraleAreaPlotItem.js.map