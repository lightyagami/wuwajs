"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefensePlayerModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ModelManager_1 = require("../../Manager/ModelManager");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
class TowerDefensePlayerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.TowerDefenseWorldDone = false;
    this.HasInitKSCEntity = false;
    this.PendingRoleHandle = undefined;
    this.PossessedPlayerHandle = undefined;
    this.PendingFollowerCreatureId = undefined;
    this.PendingFollowers = undefined;
    this.PossessedFollowerHandle = undefined;
    this.PossessedFollowerProxies = undefined;
    this.CurrentFollowerProxyId = undefined;
    this.CurrentFollowerEnable = false;
    this.AllSkillId2SkillData = undefined;
    this.BindFollowerSkills = undefined;
    this.SkillId2SkillData = undefined;
    this.ChargeSkill = undefined;
    this.LastSkillChargeFull = false;
    this.ChargeCueHandle = 0;
    this.FollowCueHandle = undefined;
    this.FollowerCdCueHandle = undefined;
    this.FollowerState = 0;
    this.IsInAutoCast = false;
    this.IsInCharge = false;
    this.PsFeedbackId = undefined;
    this.IsInFollowerInit = false;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  OnStart() {
    return true;
  }
  OnStop() {
    this.PendingRoleHandle = undefined;
    this.PossessedPlayerHandle = undefined;
    this.PendingFollowerCreatureId = undefined;
    this.PendingFollowers = undefined;
    this.PossessedFollowerHandle = undefined;
    this.PossessedFollowerProxies = undefined;
    this.CurrentFollowerProxyId = undefined;
    this.CurrentFollowerEnable = false;
    this.BindFollowerSkills = undefined;
    this.SkillId2SkillData = undefined;
    this.ChargeSkill = undefined;
    this.LastSkillChargeFull = false;
    this.ChargeCueHandle = 0;
    this.FollowCueHandle = undefined;
    this.IsInAutoCast = false;
    this.IsInCharge = false;
    this.FollowerCdCueHandle = undefined;
    this.FollowerState = 0;
    this.PsFeedbackId = undefined;
    this.TowerDefenseWorldDone = false;
    this.HasInitKSCEntity = false;
    this.AllSkillId2SkillData = undefined;
    return !(this.IsInFollowerInit = false);
  }
  get PossessedFollowerKscEntity() {
    if (this.PossessedFollowerHandle?.Valid) {
      var s = this.PossessedFollowerHandle.KscEntity;
      if (s) {
        return s;
      }
      KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物类型异常", ["possessed follower", s]);
    } else {
      KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物异常", ["possessed player", this.PossessedPlayerHandle?.KscEntity]);
    }
  }
  get PossessedFollowerEntity() {
    var s = this.PossessedFollowerHandle?.CreatureDataId;
    if (s) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(s);
      if (i) {
        return i.Entity;
      }
    }
    KscLog_1.KscLog.Warn("Common", 84, KscEnv_1.KscEnv.KscWorld, "塔防跟随物实体异常", ["creature Id", s]);
  }
  get PossessedFollowerEnabled() {
    var s = this.PossessedFollowerEntity;
    return !!s && !s.HasDisableKey(2);
  }
  get PossessedFollowerActor() {
    return this.PossessedFollowerEntity?.GetComponent(3)?.Actor;
  }
}
(exports.TowerDefensePlayerModel = TowerDefensePlayerModel).PlayerEntityKey = 1001;
TowerDefensePlayerModel.FollowerEntityKey = 1002; //# sourceMappingURL=TDPlayerModel.js.map