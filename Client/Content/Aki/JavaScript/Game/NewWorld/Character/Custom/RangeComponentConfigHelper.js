"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeComponentConfigHelper = undefined;
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
class CompConfig {
  constructor() {
    this.NeedReqEntityAccessRange = false;
    this.NeedReqPlayerAccessRange = false;
    this.NeedPendingEmitEvent = false;
    this.NeedDisablePassiveCollision = false;
    this.NeedUseFullCollisionPreset = false;
  }
}
class RangeComponentConfigHelper {
  constructor() {
    this.Bql = new Map();
    this.bql = t => {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "TriggerComponent");
      return !!t && (!t.Match.OnlyPlayer || !!t.ChangeRoleTrigger || !!t.Match.AllCharacter || !!t.Match.Categories?.length);
    };
    this.Deg = t => {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "ClientTriggerComponent");
      if (!t) {
        return false;
      }
      var o = t.TriggerMatch.EntityMatch;
      switch (o.Type) {
        case "AllCharacter":
        case "DynamicEntityMatch":
          return true;
        case "Player":
          return !!o.ChangeRoleTrigger;
        default:
          return false;
      }
    };
  }
  static get Instance() {
    if (this.cj === undefined) {
      this.cj = new RangeComponentConfigHelper();
      this.cj.Init();
    }
    return this.cj;
  }
  get CompConfig() {
    return this.Bql;
  }
  qql(t, o, n) {
    let e = this.Bql.get(t);
    if (!e) {
      e = new CompConfig();
      this.Bql.set(t, e);
    }
    e.NeedReqEntityAccessRange = o;
    e.NeedReqPlayerAccessRange = n;
  }
  Gql(t, o) {
    let n = this.Bql.get(t);
    if (!n) {
      n = new CompConfig();
      this.Bql.set(t, n);
    }
    n.NeedPendingEmitEvent = o;
  }
  QKl(t, o, n) {
    let e = this.Bql.get(t);
    if (!e) {
      e = new CompConfig();
      this.Bql.set(t, e);
    }
    e.NeedDisablePassiveCollision = o;
    e.NeedUseFullCollisionPreset = n;
  }
  Init() {
    this.kql();
    this.Oql();
    this.KKl();
  }
  kql() {
    this.qql("TrampleComponent", true, false);
    this.qql("EffectAreaComponent", false, true);
    this.qql("SkyboxComponent", false, false);
    this.qql("ProgressBarControlComponent", false, false);
    this.qql("EntityStateAudioComponent", false, false);
    this.qql("TriggerComponent", this.bql, true);
    this.qql("ClientTriggerComponent", false, false);
    this.qql("AirPassageComponent", false, true);
    this.qql("PortalComponent", false, true);
    this.qql("LocationSafetyComponent", false, false);
    this.qql("FanComponent", false, false);
    this.qql("BeamCastComponent", false, false);
    this.qql("MonitorComponent", false, false);
    this.qql("LiftComponent", false, false);
    this.qql("ExploreSkillInteractComponent", false, false);
    this.qql("BuffProducerComponent", false, false);
    this.qql("BuffConsumerComponent", false, false);
    this.qql("SceneItemAiComponent", false, false);
    this.qql("AiAlertNotifyComponent", false, false);
    this.qql("ConveyorBeltComponent", false, false);
    this.qql("SceneBulletComponent", false, false);
    this.qql("ItemFoundation2", false, false);
    this.qql("EntityCustomAudioComponent", false, false);
  }
  Oql() {
    this.Gql("TrampleComponent", false);
    this.Gql("EffectAreaComponent", false);
    this.Gql("SkyboxComponent", false);
    this.Gql("ProgressBarControlComponent", false);
    this.Gql("EntityStateAudioComponent", false);
    this.Gql("TriggerComponent", false);
    this.Gql("ClientTriggerComponent", false);
    this.Gql("AirPassageComponent", false);
    this.Gql("PortalComponent", false);
    this.Gql("LocationSafetyComponent", false);
    this.Gql("FanComponent", false);
    this.Gql("BeamCastComponent", true);
    this.Gql("MonitorComponent", false);
    this.Gql("LiftComponent", false);
    this.Gql("ExploreSkillInteractComponent", false);
    this.Gql("BuffProducerComponent", false);
    this.Gql("BuffConsumerComponent", false);
    this.Gql("SceneItemAiComponent", false);
    this.Gql("AiAlertNotifyComponent", false);
    this.Gql("ConveyorBeltComponent", false);
    this.Gql("SceneBulletComponent", false);
    this.Gql("ItemFoundation2", false);
    this.Gql("EntityCustomAudioComponent", false);
  }
  KKl() {
    this.QKl("TrampleComponent", false, true);
    this.QKl("EffectAreaComponent", false, false);
    this.QKl("SkyboxComponent", false, false);
    this.QKl("ProgressBarControlComponent", false, true);
    this.QKl("EntityStateAudioComponent", false, false);
    this.QKl("TriggerComponent", false, this.bql);
    this.QKl("ClientTriggerComponent", false, this.Deg);
    this.QKl("AirPassageComponent", false, false);
    this.QKl("PortalComponent", false, false);
    this.QKl("LocationSafetyComponent", false, false);
    this.QKl("FanComponent", true, true);
    this.QKl("BeamCastComponent", false, true);
    this.QKl("MonitorComponent", true, false);
    this.QKl("LiftComponent", true, true);
    this.QKl("ExploreSkillInteractComponent", false, false);
    this.QKl("BuffProducerComponent", false, false);
    this.QKl("BuffConsumerComponent", false, false);
    this.QKl("SceneItemAiComponent", false, false);
    this.QKl("AiAlertNotifyComponent", false, true);
    this.QKl("ConveyorBeltComponent", false, true);
    this.QKl("SceneBulletComponent", false, true);
    this.QKl("ItemFoundation2", false, true);
    this.QKl("EntityCustomAudioComponent", false, false);
    this.QKl("SceneItemMovementComponent", true, false);
    this.QKl("RotatorComponent2", true, false);
    this.QKl("AttachTargetComponent", true, false);
    this.QKl("PerformanceOptimizationComponent", true, true);
  }
}
(exports.RangeComponentConfigHelper = RangeComponentConfigHelper).cj = undefined;
//# sourceMappingURL=RangeComponentConfigHelper.js.map