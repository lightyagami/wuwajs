"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonQteController = void 0;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GameModeController_1 = require("../../../World/Controller/GameModeController"),
  EXTRA_EXPIRED_TIME = 5e3,
  MAX_EXPIRED_TIME = 6e4;
class CommonQteController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportAfterComplete, this.ggu), !0
  }
  static OnClear() {
    return EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportAfterComplete, this.ggu), !0
  }
  static OnLeaveLevel() {
    return this.qFt(), !0
  }
  static OnChangeMode() {
    return this.qFt(), !0
  }
  static qFt() {
    this.IsInQte() && this.ResetQteTimeDilation(), this.ClearQte(), this.ClearPreloadQteRes()
  }
  static StartQte(t, e = void 0, i = void 0, o = 0) {
    let s = void 0;
    if (this.IsInQte() ? s = "当前存在执行中的Qte, 无法开始新的Qte" : this.wfc && (s = "Qte预加载中, 无法开始新的Qte"), s) Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, s, ["HandleId", this.nx?.HandleId], ["QteId", t], ["Source", o]);
    else {
      e = ModelManager_1.ModelManager.CommonQteModel?.CreateQteContext(t, e, i, o);
      if (e) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte开始", ["HandleId", e.HandleId], ["QteId", t], ["Source", o]), this.elc(e) ? e : void 0;
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte开始失败, 获取context为空", ["QteId", t])
    }
  }
  static elc(i) {
    ModelManager_1.ModelManager.CommonQteModel?.SetCurrentCommonQte(i);
    var t = i.QteId;
    this.zEl = !0, this.nx = i;
    const o = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteViewName(t);
    return this.PreloadQteRes([t], i.HandleId).then(t => {
      if (t && o) {
        var e = this.ky1?.get(o);
        if (e) return e.SetQteContext(i), e.PlayQteStart(), void this.ky1?.delete(o)
      }
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "打开Qte界面失败, 停止当前Qte", ["HandleId", i.HandleId], ["QteId", i.QteId], ["ViewName", "CommonQteView"], ["Success", t]), this.JEl()
    }), o && this.kfc(o), this.PlayQteAudio(i.Config.AudioConfig.AudioEventStart), this.AddExtraEffect(i.Config.ExtraConfig), this.SetQteTimeDilation(i.Config.BaseConfig.TimeDilation), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteStart, this.nx.HandleId), !0
  }
  static SetExpiredTimer(t) {
    this.Md_();
    var e = t.IsPermanent ? MAX_EXPIRED_TIME : t.Duration + EXTRA_EXPIRED_TIME;
    this.Ed_ = TimerSystem_1.TimerSystem.Delay(() => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte超时, 强制结束", ["HandleId", t.HandleId], ["QteId", t.QteId]), t.IsFail() ? this.JEl() : t.QteFail()
    }, e)
  }
  static StopQte(t) {
    t === this.nx?.HandleId && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "停止QTE", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId]), this.JEl())
  }
  static StopCurrentQte() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "停止当前QTE", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId]), this.JEl()
  }
  static WaitQteEnd(t) {
    t === this.nx?.HandleId && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "等待结束QTE", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId]), this.Nou())
  }
  static Nou() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 39, "通用Qte等待结束", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId], ["State", this.nx?.State]), this.nx?.Config && this.nx.IsPendingSuccess() && this.PlayQteAudio(this.nx.Config.AudioConfig.AudioEventPendingSuccess)
  }
  static JEl() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte结束", ["HandleId", this.nx?.HandleId], ["QteId", this.nx?.QteId], ["State", this.nx?.State]), this.ResetQteTimeDilation(), this.nx?.Config && (this.nx.IsSuccess() ? this.PlayQteAudio(this.nx.Config.AudioConfig.AudioEventSuccess) : this.nx.IsFail() && this.PlayQteAudio(this.nx.Config.AudioConfig.AudioEventFail)), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CommonQteEnd, this.nx?.HandleId), ModelManager_1.ModelManager.CommonQteModel?.ClearQteHandleId(), this.ClearQte()
  }
  static PauseQte(t) {
    this.nx && t === this.nx.HandleId && this.Ed_ && !this.Ed_.IsPause() && this.Ed_.Pause()
  }
  static ResumeQte(t) {
    this.nx && t === this.nx.HandleId && (this.Ed_ && this.Ed_.IsPause() && this.Ed_.Resume(), this.SetQteTimeDilation(this.nx.Config.BaseConfig.TimeDilation), this.RX1())
  }
  static IsInQte() {
    return this.zEl
  }
  static IsPreloading() {
    return this.wfc
  }
  static ClearQte() {
    this.Dfc(), this.RemoveExtraEffect(), this.Md_(), this.zEl = !1, this.wfc = !1, this.Egu = !1, this.nx?.Clear(), this.nx = void 0, this.ky1?.clear()
  }
  static Md_() {
    this.Ed_ && TimerSystem_1.TimerSystem.Remove(this.Ed_), this.Ed_ = void 0
  }
  static SetQteTimeDilation(t) {
    !this.IsInQte() || ModelManager_1.ModelManager.GameModeModel?.IsMulti || (0 === t ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte时停系数不能为0") : ModelManager_1.ModelManager.TeleportModel?.IsTeleport ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "当前处于传送状态, 无法设置Qte时停") : 0 !== Time_1.Time.TimeDilation && (this.Egu = !0, GameModeController_1.GameModeController.SetTimeDilation(t)))
  }
  static ResetQteTimeDilation() {
    this.Egu && (this.Egu = !1, GameModeController_1.GameModeController.SetTimeDilation(1))
  }
  static AddExtraEffect(e) {
    if (e.HideAllBattleUi) this.SIl = !0, ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(6, [20]);
    else {
      this.SIl = !1;
      var i = e.HideUIElement.Num();
      if (0 < i) {
        var o = [];
        for (let t = 0; t < i; t++) o.push(e.HideUIElement.Get(t));
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(6, o, !1), this.yIl = o
      } else this.yIl = void 0
    }
  }
  static RemoveExtraEffect() {
    var t;
    this.SIl ? (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(6), this.SIl = !1) : (t = this.yIl) && (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(6, t, !0), this.yIl = void 0)
  }
  static PlayQteAudio(t) {
    t && (t = (0, AudioSystem_1.parseAudioEventPath)(t.ToAssetPathName())) && AudioSystem_1.AudioSystem.PostEvent(t)
  }
  static async PreloadQteRes(t, e = -1) {
    if (0 === t.length) Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载列表为空, 不需要预加载");
    else {
      if (this.nx && e !== this.nx.HandleId) return Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载失败, 当前有正在进行的Qte", ["HandleId", this.nx.HandleId], ["PreloadHandleId", e], ["qteIdList", t]), !1;
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载开始", ["HandleId", this.nx?.HandleId], ["qteIdList", t]), this.wfc = !0, this.ky1 || (this.ky1 = new Map);
      var i = new Set;
      for (const l of t) {
        var o = ModelManager_1.ModelManager.CommonQteModel?.GetCommonQteViewName(l);
        o && i.add(o)
      }
      var s = Array.from(i),
        r = [];
      for (const Q of s) UiManager_1.UiManager.IsViewOpen(Q) && r.push(UiManager_1.UiManager.CloseViewAsync(Q));
      await Promise.allSettled(r);
      var a = [];
      for (const g of s) a.push(UiManager_1.UiManager.OpenViewAsync(g));
      var n = await Promise.allSettled(a);
      for (let t = 0; t < n.length; t++) {
        var _ = s[t],
          h = n[t];
        "fulfilled" === h.status && void 0 !== h.value && void 0 !== _ && (h = h.value, this.ky1.set(_, UiManager_1.UiManager.GetView(h)))
      }
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载界面完成", ["HandleId", this.nx?.HandleId], ["qteIdList", t]);
      var m, d = [];
      for (const v of t) ModelManager_1.ModelManager.CommonQteModel?.GetQteIcon(v) || (m = ModelManager_1.ModelManager.CommonQteModel?.GetQteIconPath(v)) && d.push(ModelManager_1.ModelManager.CommonQteModel.LoadQteIcon(v, m));
      await Promise.all(d), Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte预加载全部完成", ["HandleId", this.nx?.HandleId], ["qteIdList", t]), this.wfc = !1
    }
    return !0
  }
  static ClearPreloadQteRes() {
    if (this.ky1)
      for (var [t] of this.ky1) UiManager_1.UiManager.CloseView(t);
    this.ky1?.clear(), this.ky1 = void 0, ModelManager_1.ModelManager.CommonQteModel?.ClearPreloadCache()
  }
  static kfc(t) {
    this.qB1 || (this.qB1 = t, ModelManager_1.ModelManager.InputDistributeModel?.AddNotAllowFightInputViewName(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddNotAllowFightInputViewName))
  }
  static Dfc() {
    this.qB1 && (ModelManager_1.ModelManager.InputDistributeModel?.RemoveNotAllowFightInputViewName(this.qB1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveNotAllowFightInputViewName), this.qB1 = void 0)
  }
  static RX1() {
    !this.qB1 || ModelManager_1.ModelManager.InputDistributeModel?.HasNotAllowFightInputViewIsOpen(this.qB1) || (ModelManager_1.ModelManager.InputDistributeModel?.AddNotAllowFightInputViewName(this.qB1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddNotAllowFightInputViewName))
  }
}
exports.CommonQteController = CommonQteController, (_a = CommonQteController).nx = void 0, CommonQteController.zEl = !1, CommonQteController.SIl = !1, CommonQteController.yIl = void 0, CommonQteController.Ed_ = void 0, CommonQteController.wfc = !1, CommonQteController.ky1 = void 0, CommonQteController.qB1 = void 0, CommonQteController.Egu = !1, CommonQteController.ggu = () => {
  _a.IsInQte() && _a.nx?.IsActive() && _a.nx?.IsPending() && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "传送状态结束, 尝试恢复Qte时停", ["QteId", _a.nx.QteId]), _a.SetQteTimeDilation(_a.nx.Config.BaseConfig.TimeDilation))
};
//# sourceMappingURL=CommonQteController.js.map