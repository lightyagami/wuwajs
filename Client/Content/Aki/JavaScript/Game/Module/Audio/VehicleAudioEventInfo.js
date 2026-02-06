"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleAudioEventInfo = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const GongduolaPassengerVoiceConfigById_1 = require("../../../Core/Define/ConfigQuery/GongduolaPassengerVoiceConfigById");
const GongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType_1 = require("../../../Core/Define/ConfigQuery/GongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const VehicleModel_1 = require("../../NewWorld/Vehicle/Model/VehicleModel");
const SECOND_TO_MS = 1000;
class VehicleAudioEventInfo {
  constructor() {
    this.o6l = 0;
    this.n6l = 0;
    this.Xbl = 0;
    this.Ybl = 0;
    this.G2l = 0;
    this.jbl = 0;
    this.Wbl = 0;
    this.Qbl = false;
    this.s6l = 0;
    this.a6l = 0;
    this.h6l = 0;
    this.l6l = 0;
    this._6l = undefined;
    this.Cjo = e => {
      if (e.FlowIncId === this._6l?.PlotHandle?.Handle && (this._6l.PlotHandle = undefined, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉与角色共乘剧情播放结束");
      }
    };
    this.c6l = false;
    this.y5_ = 0;
    this.S5_ = 0;
    this.M5_ = 0;
    this.E5_ = 0;
    this.iQ_ = false;
    this.I5_ = undefined;
    this.T5_ = false;
    this.CZm = 0;
    this.pZm = undefined;
    this.vZm = e => {
      if (e.FlowIncId === this.pZm?.PlotHandle?.Handle && (this.pZm.PlotHandle = undefined, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 摩托车角色共乘剧情播放结束");
      }
    };
  }
  Init() {
    this.o6l = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRideSharingAudioCoolDown") ?? 0;
    this.n6l = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRideSharingPlotCoolDown") ?? 0;
    return true;
  }
  AddAllGondolaMusic(e) {
    this.Xbl = this.Oq1();
    this.Ybl = this.qq1();
    this.G2l = this.AddGondolaSlowToFastSound(e);
  }
  StopAllGondolaMusic() {
    this.w2l();
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.Xbl);
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.Ybl);
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.G2l);
  }
  Oq1() {
    const e = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaKeepDriveAudio");
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaKeepDriveSpeed");
    var o = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaKeepDriveDuration");
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed([i, MathUtils_1.MathUtils.MaxFloat], o, () => !this.Qbl, () => {
      if (!this.Qbl) {
        this.Qbl = true;
        if (this.Wbl !== 0) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.Wbl, 0);
          this.Wbl = 0;
        }
        this.jbl = AudioSystem_1.AudioSystem.PostEvent(e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 播放船歌", ["Name", e]);
        }
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  qq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaStopDriveSpeed");
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaStopDriveDuration");
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, e], i, () => this.Qbl, () => {
      if (this.Qbl) {
        this.w2l();
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  w2l() {
    this.Qbl = false;
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaStopDriveAudio");
    if (this.jbl !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.jbl, 0, {
        TransitionDuration: 3500
      });
      this.jbl = 0;
    }
    this.Wbl = AudioSystem_1.AudioSystem.PostEvent(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 停止船歌", ["Name", e]);
    }
  }
  AddGondolaSlowToFastSound(i) {
    const o = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaSlowToFastSoundEvent");
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaSoundSpeedDivide");
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaSlowToFastSoundCoolDown");
    var e = new VehicleModel_1.PlayDrivingSoundOnReachSpeed([e, MathUtils_1.MathUtils.MaxFloat], t, undefined, () => {
      var e = i?.GetComponent(1);
      if (e) {
        AudioSystem_1.AudioSystem.PostEvent(o, e.Owner);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 从慢速到快速播放音效", ["Name", o], ["Owner", e.Owner?.GetName()]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉从慢速到快速播放音效失败,没有Actor", ["Entity", i?.Id]);
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  GondolaGetOnAudioEvent(e) {
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("GondolaGetOnAudioEvent");
    var o = e?.GetComponent(1);
    if (o) {
      AudioSystem_1.AudioSystem.PostEvent(i, o.Owner);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 贡多拉上下船播放音效", ["Name", i], ["Owner", o.Owner?.GetName()]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 贡多拉从慢速到快速播放音效失败,没有Actor", ["Entity", e?.Id]);
    }
  }
  RegisterDriveAudioEvent(e, i) {
    if (this._6l) {
      this.RemoveDriveAudioEvent();
    }
    this._6l = {
      RoleId: e,
      RoleCreatureId: i,
      PassengerId: 0,
      PassengerActor: undefined
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发与角色共乘", ["roleId", this._6l.RoleId], ["roleCreatureId", this._6l.RoleCreatureId]);
    }
    this.s6l = this.Gq1();
    this.a6l = this.Fq1();
    this.h6l = this.Nq1();
    this.l6l = this.Vq1();
  }
  RemoveDriveAudioEvent() {
    if (this._6l) {
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.s6l);
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.a6l);
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.h6l);
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.l6l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
      this.u6l(MathUtils_1.MathUtils.MaxFloat, this._6l);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 退出与角色共乘", ["roleId", this._6l?.RoleId], ["roleCreatureId", this._6l?.RoleCreatureId]);
      }
      this._6l = undefined;
    }
  }
  PlayRideSharingPlotAudio(e) {
    return (!!ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.size && !!this._6l?.PassengerActor?.Owner || !!(this.d6l(), this._6l?.PassengerActor)) && this.jq1(e, this._6l, "Gongduola");
  }
  d6l() {
    var e;
    var i;
    if (this._6l) {
      i = (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this._6l.RoleCreatureId))?.Entity?.GetComponent(1);
      if (e?.Entity && i) {
        this._6l.PassengerActor = i;
        this._6l.PassengerId = e.Entity.Id;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[Vehicle.Audio] 贡多拉与角色共乘语音事件播放,没有乘客实体", ["roleId", this._6l.RoleId], ["roleCreatureId", this._6l.RoleCreatureId]);
        }
        this._6l = undefined;
      }
    }
  }
  CheckRideSharingState() {
    return !!ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing && !!ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size && !!this._6l && (!!this._6l.PassengerActor || !(this.d6l(), !this._6l?.PassengerActor));
  }
  Gq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRoleAudioKeepMove");
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => this.CheckRideSharingState(), () => {
      this.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.KeepMoving);
    }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  Fq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRoleAudioIdle");
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 1], e, () => this.CheckRideSharingState(), () => {
      this.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.StayIdle);
    }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  Nq1() {
    const e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaRoleAudioStopMove");
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => !this.c6l, () => {
      if (!this.c6l) {
        this.c6l = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 达成持续移动N秒", ["Time", e]);
        }
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  Vq1() {
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 0], 0, () => this.c6l, () => {
      if (this.c6l) {
        this.c6l = false;
        this.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.StopMoving);
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  RegisterFishingAudioEvent() {
    this.I5_ = {
      RoleId: IAction_1.ESpecificVehicleRoleType.FishingBoat,
      PassengerId: Global_1.Global.BaseCharacter?.EntityId ?? 0,
      PassengerActor: Global_1.Global.BaseCharacter?.CharacterActorComponent
    };
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发捕鱼语音事件添加");
    }
    this.iQ_ = this.rQ_();
    this.y5_ = this.Hq1();
    this.S5_ = this.$q1();
    this.M5_ = this.Wq1();
    this.E5_ = this.Qq1();
  }
  RemoveFishingAudioEvent() {
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.y5_);
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.S5_);
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.M5_);
    ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.E5_);
    this.u6l(MathUtils_1.MathUtils.MaxFloat, this.I5_);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 退出捕鱼，移除语音事件");
    }
    this.I5_ = undefined;
  }
  PlayFishingAudio(e) {
    return !!this.I5_ && !!Global_1.Global.BaseCharacter?.CharacterActorComponent && !!this.iQ_ && this.jq1(e, this.I5_, "FishingBoat");
  }
  Hq1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaFishingAudioKeepMove");
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => this.iQ_, () => {
      this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.KeepMoving);
    }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  $q1() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaFishingAudioIdle");
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 1], e, () => this.iQ_, () => {
      this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.StayIdle);
    }, Math.max(e, this.n6l));
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  Wq1() {
    const e = CommonParamById_1.configCommonParamById.GetIntConfig("GondolaFishingAudioStopMove");
    var i = new VehicleModel_1.KeepDrivingDurationAtSpeed([1, MathUtils_1.MathUtils.MaxFloat], e, () => !this.T5_ && this.iQ_, () => {
      if (!this.T5_) {
        this.T5_ = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 达成持续移动N秒", ["Time", e]);
        }
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  Qq1() {
    var e = new VehicleModel_1.KeepDrivingDurationAtSpeed([0, 0], 0, () => this.T5_ && this.iQ_, () => {
      if (this.T5_) {
        this.T5_ = false;
        this.PlayFishingAudio(IAction_1.EGondolaVoiceTriggeredType.StopMoving);
      }
    });
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(e) ?? 0;
  }
  rQ_() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("FishingVoiceCondition");
    return ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.toString(), undefined, false);
  }
  RegisterMotorDriveAudioEvent(e, i) {
    if (this.pZm) {
      this.RemoveMotorDriveAudioEvent();
    }
    this.pZm = {
      RoleId: e,
      RoleCreatureId: i,
      PassengerId: 0,
      PassengerActor: undefined
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.vZm);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发与角色共乘", ["roleId", this.pZm.RoleId], ["roleCreatureId", this.pZm.RoleCreatureId]);
    }
    this.CZm = this.yZm(e);
  }
  RemoveMotorDriveAudioEvent() {
    if (this.pZm) {
      ModelManager_1.ModelManager.VehicleModel.RemoveKeepDrivingInfo(this.CZm);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.vZm);
      this.u6l(MathUtils_1.MathUtils.MaxFloat, this.pZm);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 退出摩托车与角色共乘", ["roleId", this.pZm?.RoleId], ["roleCreatureId", this.pZm?.RoleCreatureId]);
      }
      this.pZm = undefined;
    }
  }
  PlayMotorPlotAudioDefault(e) {
    return (!!ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.size && !!this.pZm?.PassengerActor?.Owner || !!(this.SZm(), this.pZm?.PassengerActor)) && this.jq1(e, this.pZm, "Motorcycle");
  }
  PlayMotorPlotAudio(e, i) {
    return (!!ModelManager_1.ModelManager.VehicleModel?.RideSharingInfoMap.size && !!this.pZm?.PassengerActor?.Owner || !!(this.SZm(), this.pZm?.PassengerActor)) && this.MZm(e, i, this.pZm);
  }
  SZm() {
    var e;
    var i;
    if (this.pZm) {
      i = (e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.pZm.RoleCreatureId))?.Entity?.GetComponent(1);
      if (e?.Entity && i) {
        this.pZm.PassengerActor = i;
        this.pZm.PassengerId = e.Entity.Id;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 42, "[Vehicle.Audio] 摩托车角色共乘语音事件播放,没有乘客实体", ["roleId", this.pZm.RoleId], ["roleCreatureId", this.pZm.RoleCreatureId]);
        }
        this.pZm = undefined;
      }
    }
  }
  CheckMotorState() {
    return !!ModelManager_1.ModelManager.VehicleModel.IsReadyRiderSharing && !!ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.size && !!this.pZm && (!!this.pZm.PassengerActor || !(this.SZm(), !this.pZm?.PassengerActor));
  }
  yZm(e) {
    const i = new VehicleModel_1.KeepDrivingAtSpeedCondition([1, MathUtils_1.MathUtils.MaxFloat], () => this.CheckMotorState(), e => {
      if (this.PlayMotorPlotAudio(e, IAction_1.EGondolaVoiceTriggeredType.KeepMovingByCustomSec)) {
        i.SetConditionTriggered(e);
      }
    }, this.n6l);
    e = this.GetPassengerPlotAudioConfigList(e, IAction_1.EGondolaVoiceTriggeredType.KeepMovingByCustomSec, "Motorcycle");
    if (!e || e.length < 1) {
      return 0;
    }
    for (const o of e) {
      i.AddCondition({
        Id: o.Id,
        Duration: o.ConditionParam[0] * SECOND_TO_MS,
        Weather: o.TriggerWeatherIds,
        Time: o.TriggerTimePeriod,
        Triggered: false
      });
    }
    return ModelManager_1.ModelManager.VehicleModel?.AddKeepDrivingInfo(i) ?? 0;
  }
  jq1(e, i, o) {
    return !!i.PassengerActor?.Owner && !!(o = this.GetPassengerPlotAudioConfigList(i.RoleId, e, o)) && !(o.length < 1) && (o = o[0], this.EZm(o, e, i));
  }
  MZm(e, i, o) {
    return !!o.PassengerActor?.Owner && !!(e = this.GetPassengerPlotAudioConfigById(e)) && this.EZm(e, i, o);
  }
  EZm(e, i, o) {
    var t = e.PlotFlow && e.PlotFlow.length === 3;
    var r = this.C6l(t, e);
    if (r.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Vehicle.Audio] 共乘角色语音播放失败，没有对应Event配置", ["roleId", o.RoleId], ["type", this.g6l(i)], ["PlotFlow", e.PlotFlow], ["Voice", e.Voice]);
      }
      return false;
    } else if (this.u6l(e.Priority, o)) {
      if (ModelManager_1.ModelManager.GameAudioModel.CheckAudioProbabilityInfo(o.PassengerId, r, {
        DefaultCooldownTime: t ? this.o6l : this.n6l,
        DefaultProbability: 1
      }, true, true, false)) {
        if (t) {
          this.f6l(e, o);
        } else {
          this.p6l(e, o);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 共乘角色语音播放", ["Event", r], ["roleId", o.RoleId], ["type", this.g6l(i)]);
        }
        return true;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 共乘角色语音播放CD中");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 触发共乘角色语音失败，当前正在播放的共乘语音优先级大于或等于触发语音", ["roleId", o.RoleId], ["type", this.g6l(i)]);
      }
      return false;
    }
  }
  u6l(e, i) {
    let o = true;
    if (i?.AudioHandle) {
      if (i.AudioHandle.Priority < e) {
        AudioSystem_1.AudioSystem.ExecuteAction(i.AudioHandle.Handle, 0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 打断当前正在播放优先级更低的语音");
        }
        i.AudioHandle = undefined;
      } else {
        o = false;
      }
    }
    if (i?.PlotHandle) {
      if (i.PlotHandle.Priority < e) {
        ControllerHolder_1.ControllerHolder.FlowController.FinishFlow("退出贡多拉停止角色贡多拉剧情", i.PlotHandle.Handle, false);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 打断当前正在播放优先级更低的剧情");
        }
        i.PlotHandle = undefined;
      } else {
        o = false;
      }
    }
    return !!o;
  }
  GetPassengerPlotAudioConfigById(e) {
    var i = GongduolaPassengerVoiceConfigById_1.configGongduolaPassengerVoiceConfigById.GetConfig(e);
    if (i) {
      return i;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 与角色共乘语音播放失败，没有对应配置", ["id", e]);
    }
  }
  GetPassengerPlotAudioConfigList(e, i, o) {
    var t = GongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType_1.configGongduolaPassengerVoiceConfigByRoleIdAndVehicleTriggerType.GetConfigList(e, i, o);
    if (t && t.length !== 0) {
      return t;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 载具角色共乘语音播放失败，没有对应配置", ["roleId", e], ["type", this.g6l(i)], ["vehicle", o]);
    }
  }
  C6l(e, i) {
    let o = "";
    if (e) {
      for (const t of i.PlotFlow) {
        o += t;
      }
    } else if (i.Voice && i.Voice.length > 0) {
      o = i.Voice;
    }
    return o;
  }
  f6l(e, i) {
    i.PlotHandle = {
      Priority: e.Priority,
      Handle: 0
    };
    i.PlotHandle.Handle = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(e.PlotFlow[0], parseInt(e.PlotFlow[1]), parseInt(e.PlotFlow[2]));
  }
  p6l(o, t) {
    t.AudioHandle = {
      Priority: o.Priority,
      Handle: 0
    };
    t.AudioHandle.Handle = AudioSystem_1.AudioSystem.PostEvent(o.Voice, t.PassengerActor.Owner, {
      CallbackMask: 1,
      CallbackHandler: (e, i) => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] 语音播放完成回调", ["Event", o.Voice]);
        }
        if (t) {
          t.AudioHandle = undefined;
        }
      }
    });
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
      case IAction_1.EGondolaVoiceTriggeredType.KeepMovingByCustomSec:
        return "保持移动N秒";
      default:
        return "到特定区域/未知";
    }
  }
}
exports.VehicleAudioEventInfo = VehicleAudioEventInfo;
//# sourceMappingURL=VehicleAudioEventInfo.js.map