"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameAudioModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const EntityCooldownProbability_1 = require("./EntityCooldownProbability");
const VehicleAudioEventInfo_1 = require("./VehicleAudioEventInfo");
class GameAudioModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Uq1 = undefined;
    this.u_l = new Map();
  }
  get Bq1() {
    if (!this.Uq1) {
      this.Uq1 = new VehicleAudioEventInfo_1.VehicleAudioEventInfo();
      this.Uq1.Init();
    }
    return this.Uq1;
  }
  CheckTimeOutCooldownRecords() {
    var t = [];
    for (const o of this.u_l) {
      if (o[1].CheckTimeOutCooldownRecords()) {
        o[1].Clear();
        t.push(o[0]);
      }
    }
    for (const e of t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 记录的实体上所有AudioEvent都一定时间未使用过，删除该条记录", ["EntityId", e]);
      }
      this.u_l.delete(e);
    }
  }
  CheckAudioProbabilityInfo(t, o, e, i = true, r = true, n = true) {
    if (!e) {
      return true;
    }
    var s = EntitySystem_1.EntitySystem.GetComponent(t, 308)?.GetMorphData()?.ModelId ?? 0;
    if (n && s && !ControllerHolder_1.ControllerHolder.GameAudioController.CheckMorphAudioPlay(s, o)) {
      return false;
    }
    if (!e.TagProbability || e.TagProbability.Num() === 0) {
      if (e.DefaultCooldownTime === 0) {
        return EntityCooldownProbability_1.EntityCooldownProbability.GetProbability(e.DefaultProbability);
      }
      if (e.DefaultProbability === 0) {
        return false;
      }
    }
    n = this.kq1(t, s);
    if (!this.u_l.has(n)) {
      const d = new EntityCooldownProbability_1.EntityCooldownProbability();
      d.Init(t, s);
      t = d.CheckPlayAudio(o, e, i, r);
      if (t) {
        this.u_l.set(n, d);
      }
      return t;
    }
    const d = this.u_l.get(n);
    return d.CheckPlayAudio(o, e, i, r);
  }
  UpdateAudioCooldownRecord(t, o, e, i, r = true) {
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 308)?.GetMorphData()?.ModelId ?? 0;
    var t = this.kq1(t, n);
    this.u_l.get(t).UpdateCooldownRecord(o, e, i, r);
  }
  kq1(t, o) {
    let e = t;
    return e = o && ControllerHolder_1.ControllerHolder.GameAudioController.HasMorphAudioConfig(o) ? o : e;
  }
  AddAllGondolaMusic(t) {
    this.Bq1.AddAllGondolaMusic(t);
  }
  StopAllGondolaMusic() {
    this.Bq1.StopAllGondolaMusic();
  }
  GondolaGetOnAudioEvent(t) {
    this.Bq1.GondolaGetOnAudioEvent(t);
  }
  RegisterDriveAudioEvent(t, o) {
    this.Bq1.RegisterDriveAudioEvent(t, o);
  }
  RemoveDriveAudioEvent() {
    this.Bq1.RemoveDriveAudioEvent();
  }
  PlayRideSharingPlotAudio(t) {
    return this.Bq1.PlayRideSharingPlotAudio(t);
  }
  CheckRideSharingState() {
    return this.Bq1.CheckRideSharingState();
  }
  RegisterFishingAudioEvent() {
    this.Bq1.RegisterFishingAudioEvent();
  }
  RemoveFishingAudioEvent() {
    this.Bq1.RemoveFishingAudioEvent();
  }
  PlayFishingAudio(t) {
    return this.Bq1.PlayFishingAudio(t);
  }
  RegisterMotorDriveAudioEvent(t, o) {
    this.Bq1.RegisterMotorDriveAudioEvent(t, o);
  }
  RemoveMotorDriveAudioEvent() {
    this.Bq1.RemoveMotorDriveAudioEvent();
  }
  PlayMotorPlotAudio(t) {
    return this.Bq1.PlayMotorPlotAudioDefault(t);
  }
  CheckMotorState() {
    return this.Bq1.CheckMotorState();
  }
}
exports.GameAudioModel = GameAudioModel;
//# sourceMappingURL=GameAudioModel.js.map