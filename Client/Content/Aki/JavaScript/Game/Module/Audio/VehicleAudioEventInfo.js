"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.VehicleAudioEventInfo = void 0;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  GongduolaPassengerVoiceConfigByRoleIdAndTriggerType_1 = require("../../../Core/Define/ConfigQuery/GongduolaPassengerVoiceConfigByRoleIdAndTriggerType"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  VehicleModel_1 = require("../../NewWorld/Vehicle/Model/VehicleModel");
class VehicleAudioEventInfo {
  constructor() {
    this.o6l = 0, this.n6l = 0, this.Xbl = 0, this.Ybl = 0, this.G2l = 0, this.jbl = 0, this.Wbl = 0, this.Qbl = !1, this.s6l = 0, this.a6l = 0, this.h6l = 0, this.l6l = 0, this._6l = void 0, this.Cjo = e => {
      e.FlowIncId === this._6l?.PlotHandle?.Handle && (this._6l.PlotHandle = void 0, Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉与角色共乘剧情播放结束")
    }, this.c6l = !1, this.y5_ = 0, this.S5_ = 0, this.M5_ = 0, this.E5_ = 0, this.iQ_ = !1, this.I5_ = void 0, this.T5_ = !1
  }
  Init() {
    return this.o6l = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRideSharingAudioCoolDown") ?? 0, this.n6l = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRideSharingPlotCoolDown") ?? 0, !0
  }
  AddAllGondolaMusic(e) {
    this.Xbl = this.sq1(), this.Ybl = this.aq1(), this.G2l = this.AddGondolaSlowToFastSound(e)
  }
  StopAllGondolaMusic() {
    this.w2l(), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.Xbl), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.Ybl), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.G2l)
  }
  sq1() {
    const e = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaKeepDriveAudio");
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaKeepDriveSpeed"),
      o = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaKeepDriveDuration"),
      i = new VehicleModel_1.KeepDrivingDurationAtSpeed([i, MathUtils_1.MathUtils.MaxFloat], o, () => !this.Qbl, () => {
        this.Qbl || (this.Qbl = !0, 0 !== this.Wbl && (AudioSystem_1.AudioSystem.ExecuteAction(this.Wbl, 0), this.Wbl = 0), this.jbl = AudioSystem_1.AudioSystem.PostEvent(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 播放船歌", ["Name", e]))
      });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0
  }
  aq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaStopDriveSpeed"),
      i = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaStopDriveDuration"),
      e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, e], i, () => this.Qbl, () => {
        this.Qbl && this.w2l()
      });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  w2l() {
    this.Qbl = !1;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaStopDriveAudio");
    0 !== this.jbl && (AudioSystem_1.AudioSystem.ExecuteAction(this.jbl, 0, {
      TransitionDuration: 3500
    }), this.jbl = 0), this.Wbl = AudioSystem_1.AudioSystem.PostEvent(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 停止船歌", ["Name", e])
  }
  AddGondolaSlowToFastSound(i) {
    const o = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaSlowToFastSoundEvent");
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaSoundSpeedDivide"),
      t = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaSlowToFastSoundCoolDown"),
      e = new VehicleModel_1.PlayDrivingSoundOnReachSpeed([e, MathUtils_1.MathUtils.MaxFloat], t, void 0, () => {
        var e = i?.GetComponent(1);
        e ? (AudioSystem_1.AudioSystem.PostEvent(o, e.Owner), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 从慢速到快速播放音效", ["Name", o], ["Owner", e.Owner?.GetName()])) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉从慢速到快速播放音效失败,没有Actor", ["Entity", i?.Id])
      });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  GondolaGetOnAudioEvent(e) {
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaGetOnAudioEvent"),
      o = e?.GetComponent(1);
    o ? (AudioSystem_1.AudioSystem.PostEvent(i, o.Owner), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 贡多拉上下船播放音效", ["Name", i], ["Owner", o.Owner?.GetName()])) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉从慢速到快速播放音效失败,没有Actor", ["Entity", e?.Id])
  }
  RegisterDriveAudioEvent(e, i) {
    this._6l && this.RemoveDriveAudioEvent(), this._6l = {
      RoleId: e,
      RoleCreatureId: i,
      PassengerId: 0,
      PassengerActor: void 0
    }, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发与角色共乘", ["roleId", this._6l.RoleId], ["roleCreatureId", this._6l.RoleCreatureId]), this.s6l = this.hq1(), this.a6l = this.lq1(), this.h6l = this._q1(), this.l6l = this.uq1()
  }
  RemoveDriveAudioEvent() {
    this._6l && (ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.s6l), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.a6l), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.h6l), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.l6l), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo), this.u6l(MathUtils_1.MathUtils.MaxFloat, this._6l), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 退出与角色共乘", ["roleId", this._6l?.RoleId], ["roleCreatureId", this._6l?.RoleCreatureId]), this._6l = void 0)
  }
  PlayRideSharingPlotAudio(e) {
    return !!(ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.size && this._6l?.PassengerActor?.Owner || (this.d6l(), this._6l?.PassengerActor)) && this.cq1(e, this._6l)
  }
  d6l() {
    var e, i;
    this._6l && (i = (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this._6l.RoleCreatureId))?.Entity?.GetComponent(1), e?.Entity && i ? (this._6l.PassengerActor = i, this._6l.PassengerId = e.Entity.Id) : (Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[Vehicle.Audio] 贡多拉与角色共乘语音事件播放,没有乘客实体", ["roleId", this._6l.RoleId], ["roleCreatureId", this._6l.RoleCreatureId]), this._6l = void 0))
  }
  CheckRideSharingState() {
    return !!ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing && !(!ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size || !this._6l || !this._6l.PassengerActor && (this.d6l(), !this._6l?.PassengerActor))
  }
  hq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRoleAudioKeepMove"),
      e = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => this.CheckRideSharingState(), () => {
        this.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.KeepMoving)
      }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  lq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRoleAudioIdle"),
      e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 1], e, () => this.CheckRideSharingState(), () => {
        this.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.StayIdle)
      }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  _q1() {
    const e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRoleAudioStopMove");
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => !this.c6l, () => {
      this.c6l || (this.c6l = !0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 达成持续移动N秒", ["Time", e]))
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0
  }
  uq1() {
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 0], 0, () => this.c6l, () => {
      this.c6l && (this.c6l = !1, this.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.StopMoving))
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  RegisterFishingAudioEvent() {
    this.I5_ = {
      RoleId: IAction_1.ESpecificVehicleRoleType.FishingBoat,
      PassengerId: Global_1.Global.BaseCharacter?.EntityId ?? 0,
      PassengerActor: Global_1.Global.BaseCharacter?.CharacterActorComponent
    }, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发捕鱼语音事件添加"), this.iQ_ = this.rQ_(), this.y5_ = this.dq1(), this.S5_ = this.mq1(), this.M5_ = this.fq1(), this.E5_ = this.gq1()
  }
  RemoveFishingAudioEvent() {
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.y5_), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.S5_), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.M5_), ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.E5_), this.u6l(MathUtils_1.MathUtils.MaxFloat, this.I5_), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 退出捕鱼，移除语音事件"), this.I5_ = void 0
  }
  PlayFishingAudio(e) {
    return !!(this.I5_ && Global_1.Global.BaseCharacter?.CharacterActorComponent && this.iQ_) && this.cq1(e, this.I5_)
  }
  dq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaFishingAudioKeepMove"),
      e = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => this.iQ_, () => {
        this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.KeepMoving)
      }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  mq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaFishingAudioIdle"),
      e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 1], e, () => this.iQ_, () => {
        this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.StayIdle)
      }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  fq1() {
    const e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaFishingAudioStopMove");
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => !this.T5_ && this.iQ_, () => {
      this.T5_ || (this.T5_ = !0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 达成持续移动N秒", ["Time", e]))
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0
  }
  gq1() {
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 0], 0, () => this.T5_ && this.iQ_, () => {
      this.T5_ && (this.T5_ = !1, this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.StopMoving))
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0
  }
  rQ_() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("FishingVoiceCondition");
    return ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.toString(), void 0, !1)
  }
  cq1(e, i) {
    var o, t, r;
    return !!i.PassengerActor?.Owner && !(!(o = this.m6l(i.RoleId, e)) || (t = o.PlotFlow && 3 === o.PlotFlow.length, 0 === (r = this.C6l(t, o)).length ? (Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[Vehicle.Audio] 贡多拉角色语音播放失败，没有对应Event配置", ["roleId", i.RoleId], ["type", this.g6l(e)], ["PlotFlow", o.PlotFlow], ["Voice", o.Voice]), 1) : this.u6l(o.Priority, i) ? ModelManager_1.ModelManager.GameAudioModel.CheckAudioProbabilityInfo(i.PassengerId, r, {
      DefaultCooldownTime: t ? this.o6l : this.n6l,
      DefaultProbability: 1
    }, !0, !0, !1) ? (t ? this.f6l(o, i) : this.p6l(o, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉与角色语音播放", ["Event", r], ["roleId", i.RoleId], ["type", this.g6l(e)]), 0) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉角色语音播放CD中"), 1) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发贡多拉角色语音失败，当前正在播放的共乘语音优先级大于或等于触发语音", ["roleId", i.RoleId], ["type", this.g6l(e)]), 1)))
  }
  u6l(e, i) {
    let o = !0;
    return i?.AudioHandle && (i.AudioHandle.Priority < e ? (AudioSystem_1.AudioSystem.ExecuteAction(i.AudioHandle.Handle, 0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 打断当前正在播放优先级更低的语音"), i.AudioHandle = void 0) : o = !1), i?.PlotHandle && (i.PlotHandle.Priority < e ? (ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("退出贡多拉停止角色贡多拉剧情", i.PlotHandle.Handle, !1), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 打断当前正在播放优先级更低的剧情"), i.PlotHandle = void 0) : o = !1), !!o
  }
  m6l(e, i) {
    var o = GongduolaPassengerVoiceConfigByRoleIdAndTriggerType_1.configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.GetConfigList(e, i);
    if (o && 0 !== o.length) return o[0];
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉与角色共乘语音播放失败，没有对应配置", ["roleId", e], ["type", this.g6l(i)])
  }
  C6l(e, i) {
    let o = "";
    if (e)
      for (const t of i.PlotFlow) o += t;
    else i.Voice && 0 < i.Voice.length && (o = i.Voice);
    return o
  }
  f6l(e, i) {
    i.PlotHandle = {
      Priority: e.Priority,
      Handle: 0
    }, i.PlotHandle.Handle = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(e.PlotFlow[0], parseInt(e.PlotFlow[1]), parseInt(e.PlotFlow[2]))
  }
  p6l(o, t) {
    t.AudioHandle = {
      Priority: o.Priority,
      Handle: 0
    }, t.AudioHandle.Handle = AudioSystem_1.AudioSystem.PostEvent(o.Voice, t.PassengerActor.Owner, {
      CallbackMask: 1,
      CallbackHandler: (e, i) => {
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 语音播放完成回调", ["Event", o.Voice]), t && (t.AudioHandle = void 0)
      }
    })
  }
  g6l(e) {
    switch (e) {
      case IAction_1.EGondolaVoiceTriggeredType.FindTreasure:
        return "找到海上宝箱";
      case IAction_1.EGondolaVoiceTriggeredType.InviteRole:
        return "邀请角色上船";
      case IAction_1.EGondolaVoiceTriggeredType.KeepMoving:
        return "保持移动N秒";
      case IAction_1.EGondolaVoiceTriggeredType.OpenCompass:
        return "打开指南针";
      case IAction_1.EGondolaVoiceTriggeredType.StayIdle:
        return "保持静止N秒";
      case IAction_1.EGondolaVoiceTriggeredType.StopMoving:
        return "移动N秒后停止移动";
      case IAction_1.EGondolaVoiceTriggeredType.NearFishingPoint:
        return "靠近捕鱼点";
      default:
        return "到特定区域/未知"
    }
  }
}
exports.VehicleAudioEventInfo = VehicleAudioEventInfo;
//# sourceMappingURL=VehicleAudioEventInfo.js.map