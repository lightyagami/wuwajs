"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotChildView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PlotChildView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.L0e = [];
    this.FiniteSpineEndCallback = undefined;
    this.SWd = new Map();
    this.MWd = new Map();
    this.PlaySpineAnimation = (t, i = true, s = false, o = 0) => {
      var e = (0, puerts_1.$ref)(undefined);
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "Ui预览图:播放Spine动画", ["spineName", t], ["isLoop", i], ["freeze", s]);
        }
        this.RootItem?.GetAllAttachUIChildren(e);
        var r = (0, puerts_1.$unref)(e);
        for (let e = 0; e < r.Num(); e++) {
          var n = r.Get(e);
          if (n.IsA(UE.UISpineRenderable.StaticClass()) && ((n = (n.GetOwner()?.GetComponentByClass(UE.SpineSkeletonAnimationComponent.StaticClass())).SetAnimation(0, t, i))?.SetMixDuration(o), n?.isValidAnimation()) && !i) {
            if (s) {
              n.SetTimeScale(0);
              this.SWd.set(n, n.getAnimationDuration());
            }
            (this.MWd.has(t) ? this.MWd : this.MWd.set(t, new Set())).get(t).add(n);
            n.AnimationComplete.Add(this.EWd);
          }
        }
      }
    };
    this.EWd = t => {
      if (t) {
        t.AnimationComplete.Clear();
        let e = undefined;
        for (var [i, s] of this.MWd) {
          if (s.delete(t) && s.size === 0) {
            e = i;
          }
        }
        if (e) {
          this.MWd.delete(e);
          this.FiniteSpineEndCallback?.(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FiniteSpineEnd, e);
        }
      }
    };
    this.CloseSpineAnimation = (t, i = 0) => {
      var e = (0, puerts_1.$ref)(undefined);
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Plot", 45, "Ui预览图:关闭Spine动画", ["spineName", t]);
        }
        var s = this.MWd.get(t);
        if (s && s.size > 0) {
          s?.forEach(e => {
            e.SetTimeScale(1);
            this.SWd.delete(e);
          });
        }
        this.RootItem?.GetAllAttachUIChildren(e);
        var o = (0, puerts_1.$unref)(e);
        for (let e = 0; e < o.Num(); e++) {
          var r = o.Get(e);
          if (r.IsA(UE.UISpineRenderable.StaticClass()) && (r = r.GetOwner()?.GetComponentByClass(UE.SpineSkeletonAnimationComponent.StaticClass())).HasAnimation(t)) {
            r.SetEmptyAnimation(0, i);
          }
        }
      }
    };
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayPlotSpine, this.PlaySpineAnimation);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayPlotSpine, this.PlaySpineAnimation);
  }
  OnBeforeDestroy() {
    this.L0e.length = 0;
    this.MWd.clear();
    this.SWd.clear();
    this.LevelSequencePlayer?.Clear();
  }
  async PreOpenAsync(e, t) {
    if (t) {
      await this.CreateByResourceIdAsync(t, e, false);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "Ui预览图:预加载Ui预览图，但Ui预制体名称为空", ["uiName", t]);
    }
  }
  async OpenAsync(e, t, i, s = true, o = false) {
    if (t) {
      if (o) {
        await this.ShowAsync();
      } else {
        await this.CreateThenShowByResourceIdAsync(t, e, false);
      }
      var o = (0, puerts_1.$ref)(undefined);
      this.RootItem?.GetAllAttachUIChildren(o);
      var r = (0, puerts_1.$unref)(o);
      for (let e = 0; e < r.Num(); e++) {
        var n = r.Get(e);
        if (n.IsA(UE.UINiagara.StaticClass())) {
          this.L0e.push(n);
        }
      }
      this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", false);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", false);
      this.PlaySpineAnimation(i, s);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 45, "Ui预览图:打开Ui预览图，但Ui预制体名称为空", ["uiName", t]);
    }
  }
  async OpenAsyncInArray(e, t, i, s = false) {
    if (t) {
      if (s) {
        await this.ShowAsync();
      } else {
        await this.CreateThenShowByResourceIdAsync(t, e, false);
      }
      await this.CreateThenShowByResourceIdAsync(t, e, false);
      this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", false);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", false);
      for (let e = 0; e < i.Num(); e++) {
        this.PlaySpineAnimation(i.Get(e).Name, i.Get(e).NeedLoop);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 45, "Ui预览图:打开Ui预览图，但Ui预制体名称为空", ["uiName", t]);
    }
  }
  async PlayUiLevelSequence(e) {
    var t = new CustomPromise_1.CustomPromise();
    this.LevelSequencePlayer?.StopCurrentSequence(false, true);
    this.LevelSequencePlayer?.PlaySequencePurely(e, false, false, t);
    return t.Promise;
  }
  async CloseAsync() {
    await this.LevelSequencePlayer?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
    await this.HideAsync();
    await this.DestroyAsync();
  }
  UpdateFrozenSpine(e) {
    for (var [t, i] of this.SWd) {
      if (t.isValidAnimation()) {
        i = i * e;
        t?.SetTrackTime(i);
        t?.SetMixTime(i);
      }
    }
  }
  ManualUpdateNiagara(e, t) {
    for (const i of e) {
      for (const s of this.L0e) {
        s.SetNiagaraVarFloat(i, t);
      }
    }
  }
  RestoreFreezeSpine(e, t = false) {
    var i = this.MWd.get(e);
    if (i) {
      var s = new Set();
      for (const o of i) {
        this.SWd.delete(o);
        if (o.isValidAnimation()) {
          o.SetLoop(t);
          o.SetTimeScale(1);
        } else {
          s.add(o);
        }
      }
      for (const r of s) {
        i.delete(r);
      }
      if (i.size === 0) {
        this.MWd.delete(e);
        this.FiniteSpineEndCallback?.(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FiniteSpineEnd, e);
      }
    } else {
      this.FiniteSpineEndCallback?.(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FiniteSpineEnd, e);
    }
  }
}
exports.PlotChildView = PlotChildView;
//# sourceMappingURL=PlotChildView.js.map