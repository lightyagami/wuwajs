"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GameAudioModel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  EntityCooldownProbability_1 = require("./EntityCooldownProbability"),
  VehicleAudioEventInfo_1 = require("./VehicleAudioEventInfo");
class GameAudioModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.rq1 = void 0, this.u_l = new Map
  }
  get oq1() {
    return this.rq1 || (this.rq1 = new VehicleAudioEventInfo_1.VehicleAudioEventInfo, this.rq1.Init()), this.rq1
  }
  CheckTimeOutCooldownRecords() {
    var e = [];
    for (const o of this.u_l) o[1].CheckTimeOutCooldownRecords() && (o[1].Clear(), e.push(o[0]));
    for (const t of e) Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 42, "[EntityCooldownProbability] 记录的实体上所有AudioEvent都一定时间未使用过，删除该条记录", ["EntityId", t]), this.u_l.delete(t)
  }
  CheckAudioProbabilityInfo(e, o, t, i = !0, r = !0, n = !0) {
    if (!t) return !0;
    var s = EntitySystem_1.EntitySystem.GetComponent(e, 279)?.GetMorphData()?.ModelId ?? 0;
    if (n && s && !ControllerHolder_1.ControllerHolder.GameAudioController.CheckMorphAudioPlay(s, o)) return !1;
    if (!t.TagProbability || 0 === t.TagProbability.Num()) {
      if (0 === t.DefaultCooldownTime) return EntityCooldownProbability_1.EntityCooldownProbability.GetProbability(t.DefaultProbability);
      if (0 === t.DefaultProbability) return !1
    }
    n = this.nq1(e, s);
    if (!this.u_l.has(n)) {
      const d = new EntityCooldownProbability_1.EntityCooldownProbability;
      d.Init(e, s);
      e = d.CheckPlayAudio(o, t, i, r);
      return e && this.u_l.set(n, d), e
    }
    const d = this.u_l.get(n);
    return d.CheckPlayAudio(o, t, i, r)
  }
  UpdateAudioCooldownRecord(e, o, t, i, r = !0) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 279)?.GetMorphData()?.ModelId ?? 0,
      e = this.nq1(e, n);
    this.u_l.get(e).UpdateCooldownRecord(o, t, i, r)
  }
  nq1(e, o) {
    let t = e;
    return t = o && ControllerHolder_1.ControllerHolder.GameAudioController.HasMorphAudioConfig(o) ? o : t
  }
  AddAllGondolaMusic(e) {
    this.oq1.AddAllGondolaMusic(e)
  }
  StopAllGondolaMusic() {
    this.oq1.StopAllGondolaMusic()
  }
  GondolaGetOnAudioEvent(e) {
    this.oq1.GondolaGetOnAudioEvent(e)
  }
  RegisterDriveAudioEvent(e, o) {
    this.oq1.RegisterDriveAudioEvent(e, o)
  }
  RemoveDriveAudioEvent() {
    this.oq1.RemoveDriveAudioEvent()
  }
  PlayRideSharingPlotAudio(e) {
    return this.oq1.PlayRideSharingPlotAudio(e)
  }
  CheckRideSharingState() {
    return this.oq1.CheckRideSharingState()
  }
  RegisterFishingAudioEvent() {
    this.oq1.RegisterFishingAudioEvent()
  }
  RemoveFishingAudioEvent() {
    this.oq1.RemoveFishingAudioEvent()
  }
  PlayFishingAudio(e) {
    return this.oq1.PlayFishingAudio(e)
  }
}
exports.GameAudioModel = GameAudioModel;
//# sourceMappingURL=GameAudioModel.js.map