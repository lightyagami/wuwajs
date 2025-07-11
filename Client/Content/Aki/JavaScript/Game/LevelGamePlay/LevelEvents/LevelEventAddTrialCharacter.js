"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventAddTrialCharacter = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddTrialCharacter extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.vLe = false;
    this.MLe = undefined;
  }
  ExecuteInGm(e, r) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, r) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 48, "[AddTrialEvent] 开始");
    }
    this.vLe = e.AutoChange ?? false;
    var t = e.ActiveRange;
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (t && o) {
      var i = Vector_1.Vector.Create();
      i.FromConfigVector(t.CheckPoint);
      var t = t.CheckEnterRange;
      var o = o.CheckGetComponent(3).ActorLocationProxy;
      if (Vector_1.Vector.DistSquared(o, i) > t * t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 48, "[AddTrialEvent] 当前角色不在试用范围内，完成");
        }
        this.FinishExecute(true);
        return;
      }
    }
    this.MLe = [];
    o = e.CharacterGroupNew;
    if (o) {
      for (const n of o) {
        this.MLe.push(n.CharacterId);
      }
    } else {
      for (const a of e.CharacterGroup) {
        this.MLe.push(a);
      }
    }
    if (this.MLe.length <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[AddTrialEvent] 无试用角色id，完成");
      }
      this.FinishExecute(true);
    } else if (this.ELe()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[AddTrialEvent] 开始时编队已完成");
      }
      this.FinishExecute(true);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 48, "[AddTrialEvent] 编队未完成，开始等待");
    }
  }
  OnTick(e) {
    if (this.ELe()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[AddTrialEvent] 编队完成");
      }
      this.FinishExecute(true);
    }
  }
  ELe() {
    if (this.MLe && !(this.MLe.length <= 0)) {
      if (!ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) {
        return false;
      }
      for (const r of this.MLe) {
        if (!this.tPr(r)) {
          return false;
        }
      }
      var e;
      if (!!this.vLe && !(e = this.tPr(this.MLe[0])).IsControl()) {
        ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(e.GetCreatureDataId());
      }
    }
    return true;
  }
  tPr(e) {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var r = t.GetConfigId;
      if (!(r <= RoleDefine_1.ROBOT_DATA_MIN_ID)) {
        r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(r);
        if (r && r.GroupId === e) {
          return t;
        }
      }
    }
  }
}
exports.LevelEventAddTrialCharacter = LevelEventAddTrialCharacter;
//# sourceMappingURL=LevelEventAddTrialCharacter.js.map