"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteController = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GameModeController_1 = require("../../../World/Controller/GameModeController");
const EXTRA_EXPIRED_TIME = 5000;
const MAX_EXPIRED_TIME = 60000;
class CommonQteController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportAfterComplete, this.QGu);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportAfterComplete, this.QGu);
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
  static qFt() {
    if (this.IsInQte()) {
      this.ResetQteTimeDilation();
    }
    this.ClearQte();
    this.ClearPreloadQteRes();
  }
  static StartQte(t, e = undefined, i = undefined, o = 0) {
    let s = undefined;
    if (this.IsInQte()) {
      s = "当前存在执行中的Qte, 无法开始新的Qte";
    } else if (this.wfc) {
      s = "Qte预加载中, 无法开始新的Qte";
    }
    if (s) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, s, ["HandleId", this.nx?.HandleId], ["QteId", t], ["Source", o]);
      }
    } else {
      e = ModelManager_1.ModelManager.CommonQteModel?.CreateQteContext(t, e, i, o);
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
  static elc(i) {
    ModelManager_1.ModelManager.CommonQteModel?.SetCurrentCommonQte(i);
    var t = i.QteId;
    this.zEl = true;
    this.nx = i;
    const o = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteViewName(t);
    this.PreloadQteRes([t], i.HandleId).then(t => {
      if (t && o) {
        var e = this.sS1?.get(o);
        if (e) {
          e.SetQteContext(i);
          e.PlayQteStart();
          this.sS1?.delete(o);
          return;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "打开Qte界面失败, 停止当前Qte", ["HandleId", i.HandleId], ["QteId", i.QteId], ["ViewName", "CommonQteView"], ["Success", t]);
      }
      this.JEl();
    });
    if (o) {
      this.kfc(o);
    }
    this.PlayQteAudio(i.Config.AudioConfig.AudioEventStart);
    this.AddExtraEffect(i.Config.ExtraConfig);
    this.SetQteTimeDilation(i.Config.BaseConfig.TimeDilation);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteStart, this.nx.HandleId);
    return true;
  }
  static SetExpiredTimer(t) {
    this.Md_();
    var e = t.IsPermanent ? MAX_EXPIRED_TIME : t.Duration + EXTRA_EXPIRED_TIME;
    this.Ed_ = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte超时, 强制结束", ["HandleId", t.HandleId], ["QteId", t.QteId]);
      }
      if (t.IsFail()) {
        this.JEl();
      } else {
        t.QteFail();
      }
    }, e);
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
      this.whu();
    }
  }
  static whu() {
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
    if (this.nx?.Config) {
      if (this.nx.IsSuccess()) {
        this.PlayQteAudio(this.nx.Config.AudioConfig.AudioEventSuccess);
      } else if (this.nx.IsFail()) {
        this.PlayQteAudio(this.nx.Config.AudioConfig.AudioEventFail);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteEnd, this.nx?.HandleId);
    ModelManager_1.ModelManager.CommonQteModel?.ClearQteHandleId();
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
      this.yY1();
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
    this.YFu = false;
    this.nx?.Clear();
    this.nx = undefined;
    this.sS1?.clear();
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
        this.YFu = true;
        GameModeController_1.GameModeController.SetTimeDilation(t);
      }
    }
  }
  static ResetQteTimeDilation() {
    if (this.YFu) {
      this.YFu = false;
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
  }
  static PlayQteAudio(t) {
    if (t &&= (0, AudioSystem_1.parseAudioEventPath)(t.ToAssetPathName())) {
      AudioSystem_1.AudioSystem.PostEvent(t);
    }
  }
  static async PreloadQteRes(t, e = -1) {
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
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载开始", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
      }
      this.wfc = true;
      this.sS1 ||= new Map();
      var i = new Set();
      for (const l of t) {
        var o = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteViewName(l);
        if (o) {
          i.add(o);
        }
      }
      var s = Array.from(i);
      var r = [];
      for (const Q of s) {
        if (UiManager_1.UiManager.IsViewOpen(Q)) {
          r.push(UiManager_1.UiManager.CloseViewAsync(Q));
        }
      }
      await Promise.allSettled(r);
      var a = [];
      for (const g of s) {
        a.push(UiManager_1.UiManager.OpenViewAsync(g));
      }
      var n = await Promise.allSettled(a);
      for (let t = 0; t < n.length; t++) {
        var _ = s[t];
        var h = n[t];
        if (h.status === "fulfilled" && h.value !== undefined && _ !== undefined) {
          h = h.value;
          this.sS1.set(_, UiManager_1.UiManager.GetView(h));
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载界面完成", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
      }
      var m;
      var d = [];
      for (const v of t) {
        if (!ModelManager_1.ModelManager.CommonQteModel?.GetQteIcon(v)) {
          if (m = ModelManager_1.ModelManager.CommonQteModel?.GetQteIconPath(v)) {
            d.push(ModelManager_1.ModelManager.CommonQteModel.LoadQteIcon(v, m));
          }
        }
      }
      await Promise.all(d);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载全部完成", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
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
    this.sS1?.clear();
    this.sS1 = undefined;
    ModelManager_1.ModelManager.CommonQteModel?.ClearPreloadCache();
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
  static yY1() {
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
CommonQteController.sS1 = undefined;
CommonQteController.fk1 = undefined;
CommonQteController.YFu = false;
CommonQteController.QGu = () => {
  if (_a.IsInQte() && _a.nx?.IsActive() && _a.nx?.IsPending()) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "传送状态结束, 尝试恢复Qte时停", ["QteId", _a.nx.QteId]);
    }
    _a.SetQteTimeDilation(_a.nx.Config.BaseConfig.TimeDilation);
  }
}; //# sourceMappingURL=CommonQteController.js.map