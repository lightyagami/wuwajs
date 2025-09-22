"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetNpcGroupPerform = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const HoldingHandsController_1 = require("../../Module/HoldHands/HoldingHandsController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetNpcGroupPerform extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.nx = undefined;
  }
  ExecuteNew(e, r) {
    this.OPt = e;
    this.nx = r;
    var t = this.OPt.PerformType;
    if (t && t.Follower) {
      var o = t.Initiator.Initiator;
      switch (o.Type) {
        case 1:
          if (o.EntityId) {
            this.CreateWaitEntityTask([t.Follower, o.EntityId]);
            this.FinishExecute(true);
            return;
          } else {
            this.FinishExecute(false);
            return;
          }
        case 0:
          this.CreateWaitEntityTask(t.Follower);
          this.FinishExecute(true);
          return;
        default:
          this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    var e = this.OPt;
    var r = this.nx;
    if (e && r) {
      e = this.f7u(e, r);
      this.FinishExecute(e);
    } else {
      this.FinishExecute(false);
    }
  }
  f7u(e, r) {
    var t;
    var o = e.PerformType;
    var s = this.g7u(o.Initiator.Initiator);
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o.Follower);
    if (s) {
      if (a) {
        o = o.Initiator.HandType;
        t = e.IsWaitActionFinish;
        HoldingHandsController_1.HoldingHandsController.RequestHoldHands(e.Key, s, a, o, t, true, "关卡行为");
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 82, "[LevelEventSetNpcGroupPerform] 无法获取牵手目标");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 82, "[LevelEventSetNpcGroupPerform] 无法获取牵手发起者");
      }
      return false;
    }
  }
  g7u(e) {
    switch (e.Type) {
      case 1:
        return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
      case 0:
        return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      default:
        return;
    }
  }
}
exports.LevelEventSetNpcGroupPerform = LevelEventSetNpcGroupPerform;
//# sourceMappingURL=LevelEventSetNpcGroupPerform.js.map