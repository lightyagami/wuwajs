"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteController = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const InputManager_1 = require("../../../Ui/Input/InputManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GameModeController_1 = require("../../../World/Controller/GameModeController");
const CommonQteGroupContext_1 = require("./CommonQteGroupContext");
const EXTRA_EXPIRED_TIME = 5000;
const MAX_EXPIRED_TIME = 60000;
class CommonQteController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportAfterComplete, this.V3u);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportAfterComplete, this.V3u);
    return true;
  }
  static OnLeaveLevel() {
    this.qFt();
    return true;
  }
  static OnChangeMode() {
    this.qFt();
    return true;
  }
  static RecoverTimeDilationAfterTeleport() {
    if (this.IsInQte() && this.nx?.IsActive() && this.nx?.IsPending()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "传送状态结束, 尝试恢复Qte时停", ["QteId", this.nx.QteId]);
      }
      this.SetQteTimeDilation(this.nx.Config.BaseConfig.TimeDilation);
    }
  }
  static qFt() {
    if (this.IsInQte()) {
      this.ResetQteTimeDilation();
    }
    this.ClearQte();
  }
  static StartQte(t, e = undefined, i = undefined, o = 0, s = undefined) {
    let r = undefined;
    if (this.IsInQte()) {
      r = "当前存在执行中的Qte, 无法开始新的Qte";
    } else if (this.wfc) {
      r = "Qte预加载中, 无法开始新的Qte";
    }
    if (r) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, r, ["HandleId", this.nx?.HandleId], ["QteId", t], ["Source", o]);
      }
    } else {
      e = ModelManager_1.ModelManager.CommonQteModel?.CreateQteContext(t, e, i, o, s);
      if (e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用Qte开始", ["HandleId", e.HandleId], ["QteId", t], ["Source", o]);
        }
        if (this.elc(e)) {
          return e;
        } else {
          return undefined;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte开始失败, 获取context为空", ["QteId", t]);
      }
    }
  }
  static elc(o) {
    ModelManager_1.ModelManager.CommonQteModel?.SetCurrentCommonQte(o);
    const s = o.QteId;
    this.zEl = true;
    this.nx = o;
    const r = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteViewName(s);
    let a = undefined;
    if (!r) {
      a = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteItemName(s);
    }
    this.PreloadQteRes([s], o.HandleId).then(t => {
      var e = this.zEl && this.nx?.HandleId === o.HandleId;
      if (e) {
        if (t) {
          if (a) {
            var i = this.NXu.get(s);
            if (i) {
              o.Resource = ModelManager_1.ModelManager.CommonQteModel?.GetQteResource(s);
              o.UiActor = i.GetRootActor();
              i.SetQteContext(o);
              i.PlayQteStart();
              this.NXu?.delete(s);
              return;
            }
          } else if (r) {
            var i = this.sS1.get(r);
            if (i) {
              o.Resource = ModelManager_1.ModelManager.CommonQteModel?.GetQteResource(s);
              i.SetQteContext(o);
              i.PlayQteStart();
              this.sS1?.delete(r);
              return;
            }
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CommonQte", 67, "Qte加载失败, 停止当前Qte", ["HandleId", o.HandleId], ["QteId", o.QteId], ["ViewName", r], ["ItemName", a], ["Success", t]);
        }
        this.JEl();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CommonQte", 67, "Qte预加载完成后, Qte已结束或已过期", ["HandleId", o.HandleId], ["CurrentQteHandleId", this.nx?.HandleId], ["QteId", o.QteId], ["CurrentQteId", this.nx?.QteId], ["IsInQte", this.zEl], ["IsQteValid", e], ["ViewName", r], ["ItemName", a]);
        }
        if (a) {
          if ((i = this.NXu.get(s)) && !i.IsDestroyOrDestroying) {
            i.Destroy();
          }
          this.NXu.delete(s);
        }
        if (r) {
          UiManager_1.UiManager.CloseView(r);
          this.sS1.delete(r);
        }
        ModelManager_1.ModelManager.CommonQteModel?.ClearPreloadCache(s);
      }
    });
    var t = o.Config;
    if (t) {
      if (t.ExtraConfig.IsBlockFightInput) {
        this.kfc("CommonQteView");
      }
      this.PlayQteAudio(t.AudioConfig.AudioEventStart);
      this.AddExtraEffect(t.ExtraConfig);
      this.SetQteTimeDilation(t.BaseConfig.TimeDilation);
    }
    InputManager_1.InputManager.PauseImmersiveMouseMode("Qte");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteStart, this.nx.HandleId);
    return true;
  }
  static StartQteGroup(t, e = undefined, i = undefined, o = 0, s = undefined) {
    let r = undefined;
    if (this.IsInQte()) {
      r = "当前存在执行中的Qte, 无法开始新的Qte";
    } else if (this.wfc) {
      r = "Qte预加载中, 无法开始新的Qte";
    }
    if (r) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, r, ["HandleId", this.nx?.HandleId], ["QteGroupId", t], ["Source", o]);
      }
    } else {
      e = ModelManager_1.ModelManager.CommonQteModel?.CreateQteGroupContext(t, e, i, o, s);
      if (e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用QteGroup开始", ["HandleId", e.HandleId], ["QteGroupId", e.QteGroupId], ["Source", o]);
        }
        if (this.Had(e)) {
          return e;
        } else {
          return undefined;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用QteGroup开始失败, 获取context为空", ["QteGroupId", t]);
      }
    }
  }
  static Had(r) {
    const a = r.ContextMap;
    if (!a || a.size === 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "QteGroup中不存在Context", ["HandleId", r.HandleId], ["QteGroupId", r.QteId]);
      }
      return false;
    }
    ModelManager_1.ModelManager.CommonQteModel?.SetCurrentCommonQte(r);
    this.zEl = true;
    this.nx = r;
    this.PreloadQteRes([...a.keys()], r.HandleId, true).then(t => {
      let e = true;
      if (t) {
        for (var [i, o] of a.entries()) {
          var s;
          if (ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteItemName(i)) {
            if (s = this.NXu?.get(i)) {
              o.Resource = ModelManager_1.ModelManager.CommonQteModel?.GetQteResource(i);
              o.UiActor = s.GetRootActor();
              s.SetQteContext(o);
              s.PlayQteStart();
              this.NXu?.delete(i);
            } else {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("CommonQte", 67, "找不到对应的Item UI", ["QteId", i]);
              }
              e = false;
            }
          } else {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("CommonQte", 67, "找不到对应的ItemName", ["QteId", i]);
            }
            e = false;
          }
        }
      } else {
        e = false;
      }
      if (!e) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "Qte组预加载失败, 停止当前Qte", ["HandleId", r.HandleId], ["QteGroupId", r.QteId], ["Success", t]);
        }
        this.JEl();
      }
    });
    var t = r.GetConfig();
    if (t) {
      if (t.ExtraConfig.IsBlockFightInput) {
        this.kfc("CommonQteView");
      }
      this.PlayQteAudio(t.AudioConfig.AudioEventStart);
      this.AddExtraEffect(t.ExtraConfig);
    }
    this.SetQteTimeDilation(r.GroupConfig.TimeDilation);
    InputManager_1.InputManager.PauseImmersiveMouseMode("Qte");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteStart, this.nx.HandleId);
    return true;
  }
  static SetExpiredTimer(t) {
    var e;
    if (t.Source !== 2 && t.Source !== 3) {
      this.Md_();
      e = t.IsPermanent ? MAX_EXPIRED_TIME : t.Duration + EXTRA_EXPIRED_TIME;
      this.Ed_ = TimerSystem_1.TimerSystem.Delay(() => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用Qte超时, 强制结束", ["HandleId", t.HandleId], ["QteId", t.QteId]);
        }
        if (t.IsFail()) {
          this.JEl();
        } else {
          t.QteFail();
        }
      }, MathUtils_1.MathUtils.Clamp(e, TimerSystem_1.MIN_TIME, TimerSystem_1.MAX_TIME));
    }
  }
  static StopQte(t) {
    if (t === this.nx?.HandleId) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "停止QTE", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId]);
      }
      this.JEl();
    }
  }
  static StopCurrentQte() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "停止当前QTE", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId]);
    }
    this.JEl();
  }
  static WaitQteEnd(t) {
    if (t === this.nx?.HandleId) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "等待结束QTE", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId]);
      }
      this.ilu();
    }
  }
  static ilu() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 39, "通用Qte等待结束", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId], ["State", this.nx?.State]);
    }
    if (this.nx?.Config && this.nx.IsPendingSuccess()) {
      this.PlayQteAudio(this.nx.Config.AudioConfig.AudioEventPendingSuccess);
    }
  }
  static JEl() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "通用Qte结束", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId], ["State", this.nx?.State]);
    }
    this.ResetQteTimeDilation();
    var t = this.nx?.GetConfig();
    if (t) {
      if (this.nx?.IsSuccess()) {
        this.PlayQteAudio(t.AudioConfig.AudioEventSuccess);
      } else if (this.nx?.IsFail()) {
        this.PlayQteAudio(t.AudioConfig.AudioEventFail);
      }
    }
    InputManager_1.InputManager.ResumeImmersiveMouseMode("Qte");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteEnd, this.nx?.HandleId);
    ModelManager_1.ModelManager.CommonQteModel?.ClearQteHandleId();
    if (this.nx instanceof CommonQteGroupContext_1.CommonQteGroupContext) {
      t = this.nx.ContextMap;
      if (t) {
        for (const e of t.values()) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteEnd, e.HandleId);
          ModelManager_1.ModelManager.CommonQteModel?.ClearQteHandleId(e.HandleId);
        }
      }
    }
    this.ClearQte();
  }
  static PauseQte(t) {
    if (this.nx && t === this.nx.HandleId && this.Ed_ && !this.Ed_.IsPause()) {
      this.Ed_.Pause();
    }
  }
  static ResumeQte(t) {
    if (this.nx && t === this.nx.HandleId) {
      if (this.Ed_ && this.Ed_.IsPause()) {
        this.Ed_.Resume();
      }
      this.SetQteTimeDilation(this.nx.Config.BaseConfig.TimeDilation);
      this.QY1();
    }
  }
  static IsInQte() {
    return this.zEl;
  }
  static IsPreloading() {
    return this.wfc;
  }
  static ClearQte() {
    this.Dfc();
    this.RemoveExtraEffect();
    this.Md_();
    this.zEl = false;
    this.wfc = false;
    this.yVu = false;
    this.nx?.Clear();
    this.nx = undefined;
    this.ClearPreloadQteRes();
  }
  static Md_() {
    if (this.Ed_) {
      TimerSystem_1.TimerSystem.Remove(this.Ed_);
    }
    this.Ed_ = undefined;
  }
  static SetQteTimeDilation(t) {
    if (!!this.IsInQte() && !ModelManager_1.ModelManager.GameModeModel?.IsMulti) {
      if (t === 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用Qte时停系数不能为0");
        }
      } else if (ModelManager_1.ModelManager.TeleportModel?.IsTeleport) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "当前处于传送状态, 无法设置Qte时停");
        }
      } else if (Time_1.Time.TimeDilation !== 0) {
        this.yVu = true;
        GameModeController_1.GameModeController.SetTimeDilation(t);
      }
    }
  }
  static ResetQteTimeDilation() {
    if (this.yVu) {
      this.yVu = false;
      GameModeController_1.GameModeController.SetTimeDilation(1);
    }
  }
  static AddExtraEffect(e) {
    if (e.HideAllBattleUi) {
      this.SIl = true;
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(6, [20]);
    } else {
      this.SIl = false;
      var i = e.HideUIElement.Num();
      if (i > 0) {
        var o = [];
        for (let t = 0; t < i; t++) {
          o.push(e.HideUIElement.Get(t));
        }
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(6, o, false);
        this.yIl = o;
      } else {
        this.yIl = undefined;
      }
    }
  }
  static RemoveExtraEffect() {
    var t;
    if (this.SIl) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(6);
      this.SIl = false;
    } else if (t = this.yIl) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(6, t, true);
      this.yIl = undefined;
    }
    this.Tod();
    this.bod();
  }
  static Tod() {
    if (this.Rod) {
      TimerSystem_1.TimerSystem.Remove(this.Rod);
      this.Rod = undefined;
    }
    if (this.wod) {
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(this.wod);
      this.wod = undefined;
    }
    if (this.Lod !== -1) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Lod, "[CommonQteController.RemoveScreenEffect]", true);
      this.Lod = -1;
    }
  }
  static bod(t = true) {
    if (this.Pod) {
      TimerSystem_1.TimerSystem.Remove(this.Pod);
      this.Pod = undefined;
    }
    if (this.pYi) {
      Global_1.Global.CharacterCameraManager.StopCameraShake(this.pYi, t);
      this.pYi = undefined;
    }
  }
  static PlayScreenEffect() {
    if (this.nx && !this.IsPlayingScreenEffect()) {
      const i = this.nx.Resource?.ScreenEffect1;
      var t;
      var e;
      if (i) {
        this.Aod = 1;
        this.wod = i;
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(i);
        if (i.Loop === 0) {
          t = (i.Start + i.End) * TimeUtil_1.TimeUtil.InverseMillisecond;
          this.Rod = TimerSystem_1.TimerSystem.Delay(() => {
            ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(i);
            this.wod = undefined;
            this.Rod = undefined;
          }, MathUtils_1.MathUtils.Clamp(t, TimerSystem_1.MIN_TIME, TimerSystem_1.MAX_TIME));
        }
      } else if ((t = this.nx.Resource?.ScreenEffect2) && (e = ModelManager_1.ModelManager.CommonQteModel?.GetQteScreenEffectPath(this.nx.QteId, 2)) && (this.Aod = 2, this.Lod = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, Transform_1.Transform.Create().ToUeTransform(), e, "[CommonQteController.PlayScreenEffect]", undefined, 3, undefined), t.LoopTime === 0)) {
        e = (t.StartTime + t.EndTime) * TimeUtil_1.TimeUtil.InverseMillisecond;
        this.Rod = TimerSystem_1.TimerSystem.Delay(() => {
          EffectSystem_1.EffectSystem.StopEffectById(this.Lod, "[CommonQteController.ScreenEffectTimer]", true);
          this.Lod = -1;
          this.Rod = undefined;
        }, MathUtils_1.MathUtils.Clamp(e, TimerSystem_1.MIN_TIME, TimerSystem_1.MAX_TIME));
      }
    }
  }
  static IsPlayingScreenEffect() {
    if (this.Aod === 1) {
      return this.wod !== undefined;
    } else {
      return this.Aod === 2 && this.Lod !== -1;
    }
  }
  static PlayCameraShake() {
    var t;
    if (this.nx && !this.pYi && (t = this.nx.Resource?.CameraShake) && (this.pYi = Global_1.Global.CharacterCameraManager.StartMatineeCameraShake(t), this.pYi)) {
      t = this.pYi.OscillatorTimeRemaining * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.Pod = TimerSystem_1.TimerSystem.Delay(() => {
        Global_1.Global.CharacterCameraManager.StopCameraShake(this.pYi, false);
        this.pYi = undefined;
        this.Pod = undefined;
      }, MathUtils_1.MathUtils.Clamp(t, TimerSystem_1.MIN_TIME, TimerSystem_1.MAX_TIME));
    }
  }
  static PlayExtraEffect(t) {
    if (this.nx && t === this.nx.HandleId) {
      this.PlayScreenEffect();
      this.PlayCameraShake();
    }
  }
  static StopExtraEffect(t) {
    if (this.nx && t === this.nx.HandleId) {
      this.Tod();
      this.bod(false);
    }
  }
  static PlayQteAudio(t, e) {
    if (t = t && (0, AudioSystem_1.parseAudioEventPath)(t.ToAssetPathName())) {
      if (e) {
        return AudioSystem_1.AudioSystem.PostEvent(t, e);
      } else {
        return AudioSystem_1.AudioSystem.PostEvent(t);
      }
    } else {
      return AudioSystem_1.INVALID_AUDIO_EVENT_VALUE;
    }
  }
  static SeekAudio(t, e, i, o) {
    if (e &&= (0, AudioSystem_1.parseAudioEventPath)(e.ToAssetPathName())) {
      AudioSystem_1.AudioSystem.SeekOnEvent(e, t, {
        Actor: i,
        Handle: o
      });
    }
  }
  static StopQteAudio(t, e) {
    if (t !== AudioSystem_1.INVALID_AUDIO_EVENT_VALUE) {
      AudioSystem_1.AudioSystem.ExecuteAction(t, 0, {
        TransitionDuration: e
      });
    }
  }
  static async PreloadQteRes(t, e = -1, i = false) {
    if (t.length === 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载列表为空, 不需要预加载");
      }
    } else {
      if (this.nx && e !== this.nx.HandleId) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载失败, 当前有正在进行的Qte", ["HandleId", this.nx.HandleId], ["PreloadHandleId", e], ["qteIdList", t]);
        }
        return false;
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CommonQte", 67, "通用Qte预加载开始", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
      }
      this.wfc = true;
      var o = new Set();
      var s = new Map();
      for (const c of t) {
        var r = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteViewName(c);
        let t = undefined;
        if (!r) {
          t = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteItemName(c);
        }
        if (r && !i) {
          o.add(r);
        } else if (t) {
          s.set(c, t);
        }
      }
      var a = Array.from(o);
      var n = [];
      for (const M of a) {
        if (UiManager_1.UiManager.IsViewOpen(M)) {
          n.push(UiManager_1.UiManager.CloseViewAsync(M));
        }
      }
      await Promise.allSettled(n);
      var m = Info_1.Info.IsBuildDevelopmentOrDebug;
      var h = [];
      for (const u of a) {
        h.push(UiManager_1.UiManager.OpenViewAsync(u));
      }
      var _ = await Promise.allSettled(h);
      for (let t = 0; t < _.length; t++) {
        var l = a[t];
        var d = _[t];
        if (d.status === "fulfilled" && d.value !== undefined && l !== undefined && (d = d.value, this.sS1.set(l, UiManager_1.UiManager.GetView(d)), m)) {
          this.CommonQteViewMapDebug ||= new Map();
          this.CommonQteViewMapDebug.set(l, UiManager_1.UiManager.GetView(d));
        }
      }
      var Q;
      var C;
      var v = [];
      for ([Q, C] of s.entries()) {
        var f = ModelManager_1.ModelManager.CommonQteModel?.CreateCommonQteItem(C);
        if (f && (f.SetPreloadQte(Q), this.NXu.set(Q, f), v.push(f.CreateByResourceIdAsync(C)), m)) {
          this.CommonQteItemMapDebug ||= new Map();
          this.CommonQteItemMapDebug.set(Q, f);
        }
      }
      await Promise.allSettled(v);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CommonQte", 67, "通用Qte预加载界面完成", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
      }
      var g = [];
      for (const S of t) {
        for (const I of ModelManager_1.ModelManager.CommonQteModel.LoadQteResource(S)) {
          g.push(I);
        }
      }
      await Promise.all(g);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CommonQte", 67, "通用Qte预加载全部完成", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
      }
      this.wfc = false;
    }
    return true;
  }
  static ClearPreloadQteRes() {
    if (this.sS1) {
      for (var [t] of this.sS1) {
        UiManager_1.UiManager.CloseView(t);
      }
    }
    this.sS1.clear();
    if (this.NXu) {
      for (const e of this.NXu.values()) {
        if (!e.IsDestroyOrDestroying) {
          e.Destroy();
        }
      }
    }
    this.NXu.clear();
    ModelManager_1.ModelManager.CommonQteModel?.ClearPreloadCache();
    this.CommonQteItemMapDebug?.clear();
    this.CommonQteViewMapDebug?.clear();
  }
  static kfc(t) {
    if (!this.fk1) {
      this.fk1 = t;
      ModelManager_1.ModelManager.InputDistributeModel?.AddNotAllowFightInputViewName(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddNotAllowFightInputViewName);
    }
  }
  static Dfc() {
    if (this.fk1) {
      ModelManager_1.ModelManager.InputDistributeModel?.RemoveNotAllowFightInputViewName(this.fk1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveNotAllowFightInputViewName);
      this.fk1 = undefined;
    }
  }
  static QY1() {
    if (!!this.fk1 && !ModelManager_1.ModelManager.InputDistributeModel?.HasNotAllowFightInputViewIsOpen(this.fk1)) {
      ModelManager_1.ModelManager.InputDistributeModel?.AddNotAllowFightInputViewName(this.fk1);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddNotAllowFightInputViewName);
    }
  }
}
exports.CommonQteController = CommonQteController;
(_a = CommonQteController).nx = undefined;
CommonQteController.zEl = false;
CommonQteController.SIl = false;
CommonQteController.yIl = undefined;
CommonQteController.Ed_ = undefined;
CommonQteController.wfc = false;
CommonQteController.sS1 = new Map();
CommonQteController.NXu = new Map();
CommonQteController.fk1 = undefined;
CommonQteController.yVu = false;
CommonQteController.Aod = 0;
CommonQteController.wod = undefined;
CommonQteController.Lod = -1;
CommonQteController.Rod = undefined;
CommonQteController.pYi = undefined;
CommonQteController.Pod = undefined;
CommonQteController.CommonQteViewMapDebug = undefined;
CommonQteController.CommonQteItemMapDebug = undefined;
CommonQteController.V3u = () => {
  if (_a.IsInQte() && _a.nx?.IsActive() && _a.nx?.IsPending()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "传送状态结束, 尝试恢复Qte时停", ["QteId", _a.nx.QteId]);
    }
    _a.SetQteTimeDilation(_a.nx.Config.BaseConfig.TimeDilation);
  }
}; //# sourceMappingURL=CommonQteController.js.map