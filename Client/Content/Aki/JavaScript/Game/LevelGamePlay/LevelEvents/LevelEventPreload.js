"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventPreload = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  PhantomFormationById_1 = require("../../../Core/Define/ConfigQuery/PhantomFormationById"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  WAITE_ENTITY_PRELOAD_TIME = 6e4;
class LevelEventPreload extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, r) {
    this.FinishExecute(!0)
  }
  ExecuteNew(e, r) {
    var o;
    "PreloadFlows" === e.PreloadObjectType.Type ? (o = e.PreloadObjectType.FlowData, ControllerHolder_1.ControllerHolder.PreloadControllerNew.PreloadPlot(o.FlowListName, o.FlowId, o.StateId), this.FinishExecute(!0)) : "PreloadPhantomCharacterForSkill" !== e.PreloadObjectType.Type && "PreloadTrialCharacterForSkill" !== e.PreloadObjectType.Type || this.LE1(e)
  }
  LE1(e) {
    var e = e.PreloadObjectType,
      r = e.Type,
      o = [];
    if ("PreloadTrialCharacterForSkill" === r)
      for (const t of e.CharacterGroupNew) o.push(t.CharacterId);
    else if ("PreloadPhantomCharacterForSkill" === r) {
      r = e.Id, e = PhantomFormationById_1.configPhantomFormationById.GetConfig(r);
      if (e)
        for (const n of e.Roles) o.push(n)
    }
    var a = [];
    for (const i of o) {
      var l = ModelManager_1.ModelManager.SceneTeamModel.GetPreloadEntityData(i);
      l && a.push(l[0])
    }
    a.length <= 0 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 48, "[PreloadRole] 无预加载实体", ["RoleIdList", o]), this.FinishExecute(!0)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 48, "[PreloadRole] 开始等待实体加载", ["CreatureDataIdList", a]), WaitEntityTask_1.WaitEntityTask.Create("LevelEventPreloadRole.ExecuteNew", a, e => {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 48, "[PreloadRole] 实体加载结束", ["Result", e]), this.FinishExecute(!0)
    }, WAITE_ENTITY_PRELOAD_TIME))
  }
}
exports.LevelEventPreload = LevelEventPreload;
//# sourceMappingURL=LevelEventPreload.js.map