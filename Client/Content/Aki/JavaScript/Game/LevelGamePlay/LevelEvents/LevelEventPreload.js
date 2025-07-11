"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPreload = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const WAITE_ENTITY_PRELOAD_TIME = 60000;
class LevelEventPreload extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, r) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, r) {
    var o;
    if (e.PreloadObjectType.Type === "PreloadFlows") {
      o = e.PreloadObjectType.FlowData;
      ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(o.FlowListName, o.FlowId, o.StateId);
      this.FinishExecute(true);
    } else if (e.PreloadObjectType.Type === "PreloadPhantomCharacterForSkill" || e.PreloadObjectType.Type === "PreloadTrialCharacterForSkill") {
      this.ZE1(e);
    }
  }
  ZE1(e) {
    var e = e.PreloadObjectType;
    var r = e.Type;
    var o = [];
    if (r === "PreloadTrialCharacterForSkill") {
      for (const t of e.CharacterGroupNew) {
        o.push(t.CharacterId);
      }
    } else if (r === "PreloadPhantomCharacterForSkill") {
      r = e.Id;
      e = PhantomFormationById_1.configPhantomFormationById.GetConfig(r);
      if (e) {
        for (const n of e.Roles) {
          o.push(n);
        }
      }
    }
    var a = [];
    for (const i of o) {
      var l = ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(i);
      if (l) {
        a.push(l[0]);
      }
    }
    if (a.length <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[PreloadRole] 无预加载实体", ["RoleIdList", o]);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 48, "[PreloadRole] 开始等待实体加载", ["CreatureDataIdList", a]);
      }
      WaitEntityTask_1.WaitEntityTask.Create("LevelEventPreloadRole.ExecuteNew", a, e => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Event", 48, "[PreloadRole] 实体加载结束", ["Result", e]);
        }
        this.FinishExecute(true);
      }, WAITE_ENTITY_PRELOAD_TIME);
    }
  }
}
exports.LevelEventPreload = LevelEventPreload;
//# sourceMappingURL=LevelEventPreload.js.map