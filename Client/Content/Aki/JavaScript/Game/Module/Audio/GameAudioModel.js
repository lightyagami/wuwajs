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
    var e = [];
    for (const o of this.u_l) {
      if (o[1].CheckTimeOutCooldownRecords()) {
        o[1].Clear();
        e.push(o[0]);
      }
    }
    for (const t of e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 记录的实体上所有AudioEvent都一定时间未使用过，删除该条记录", ["EntityId", t]);
      }
      this.u_l.delete(t);
    }
  }
  CheckAudioProbabilityInfo(e, o, t, i = true, r = true, n = true) {
    if (!t) {
      return true;
    }
    var s = EntitySystem_1.EntitySystem.GetComponent(e, 287)?.GetMorphData()?.ModelId ?? 0;
    if (n && s && !ControllerHolder_1.ControllerHolder.GameAudioController.CheckMorphAudioPlay(s, o)) {
      return false;
    }
    if (!t.TagProbability || t.TagProbability.Num() === 0) {
      if (t.DefaultCooldownTime === 0) {
        return EntityCooldownProbability_1.EntityCooldownProbability.GetProbability(t.DefaultProbability);
      }
      if (t.DefaultProbability === 0) {
        return false;
      }
    }
    n = this.kq1(e, s);
    if (!this.u_l.has(n)) {
      const d = new EntityCooldownProbability_1.EntityCooldownProbability();
      d.Init(e, s);
      e = d.CheckPlayAudio(o, t, i, r);
      if (e) {
        this.u_l.set(n, d);
      }
      return e;
    }
    const d = this.u_l.get(n);
    return d.CheckPlayAudio(o, t, i, r);
  }
  UpdateAudioCooldownRecord(e, o, t, i, r = true) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 287)?.GetMorphData()?.ModelId ?? 0;
    var e = this.kq1(e, n);
    this.u_l.get(e).UpdateCooldownRecord(o, t, i, r);
  }
  kq1(e, o) {
    let t = e;
    return t = o && ControllerHolder_1.ControllerHolder.GameAudioController.HasMorphAudioConfig(o) ? o : t;
  }
  AddAllGondolaMusic(e) {
    this.Bq1.AddAllGondolaMusic(e);
  }
  StopAllGondolaMusic() {
    this.Bq1.StopAllGondolaMusic();
  }
  GondolaGetOnAudioEvent(e) {
    this.Bq1.GondolaGetOnAudioEvent(e);
  }
  RegisterDriveAudioEvent(e, o) {
    this.Bq1.RegisterDriveAudioEvent(e, o);
  }
  RemoveDriveAudioEvent() {
    this.Bq1.RemoveDriveAudioEvent();
  }
  PlayRideSharingPlotAudio(e) {
    return this.Bq1.PlayRideSharingPlotAudio(e);
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
  PlayFishingAudio(e) {
    return this.Bq1.PlayFishingAudio(e);
  }
}
exports.GameAudioModel = GameAudioModel;
//# sourceMappingURL=GameAudioModel.js.map