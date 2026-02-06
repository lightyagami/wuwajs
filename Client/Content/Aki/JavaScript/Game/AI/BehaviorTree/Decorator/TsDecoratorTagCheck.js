"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorTagCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKeyTarget = "";
    this.Checks = undefined;
    this.Logic = 0;
    this.DebugLog = false;
    this.IsInitTsVariables = false;
    this.TsCheckTags = undefined;
    this.TsCheckTagValues = undefined;
    this.TsLogic = undefined;
    this.TsBlackBoardKeyTarget = "";
    this.TsDebugLog = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckTags = undefined;
    this.TsCheckTagValues = undefined;
    this.TsLogic = undefined;
    this.TsBlackBoardKeyTarget = "";
    this.TsDebugLog = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsLogic = this.Logic;
      this.TsBlackBoardKeyTarget = this.BlackboardKeyTarget;
      this.TsDebugLog = this.DebugLog;
      this.TsCheckTags = new Array();
      this.TsCheckTagValues = new Array();
      for (let t = this.Checks.Num() - 1; t >= 0; --t) {
        var e = this.Checks.GetKey(t);
        var r = this.Checks.Get(e);
        this.TsCheckTags.push(e?.TagId);
        this.TsCheckTagValues.push(r);
      }
    }
  }
  PerformConditionCheckAI(t, e) {
    var r = t.AiController;
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    if (!r.CharActorComp) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()], ["Id", t.GetEntity().Id]);
      }
      return false;
    }
    this.InitTsVariables();
    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BehaviorTree", 6, "TagCheck", ["controller", t?.GetName()]);
    }
    let i = r.CharActorComp.Entity;
    if (this.TsBlackBoardKeyTarget) {
      t = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(i.Id, this.TsBlackBoardKeyTarget);
      if (!t) {
        if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. Blackboard1");
        }
        return false;
      }
      if (!(i = EntitySystem_1.EntitySystem.Get(t))?.Valid) {
        if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. Blackboard2");
        }
        return false;
      }
    }
    var o = i.GetComponent(217);
    if (this.TsLogic === 1) {
      for (let t = this.TsCheckTags.length - 1; t >= 0; --t) {
        var s = this.TsCheckTags[t];
        var h = this.TsCheckTagValues[t];
        if (o?.HasTag(s) === h) {
          if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("BehaviorTree", 6, "TagCheck true. Or", ["tag", s]);
          }
          return true;
        }
      }
      if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. Or", ["tagCount", this.TsCheckTags?.length]);
      }
      return false;
    }
    for (let t = this.TsCheckTags.length - 1; t >= 0; --t) {
      var a = this.TsCheckTags[t];
      var l = this.TsCheckTagValues[t];
      if (o?.HasTag(a) !== l) {
        if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. And", ["tag", a]);
        }
        return false;
      }
    }
    if (this.TsDebugLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BehaviorTree", 6, "TagCheck true. And", ["tagCount", this.TsCheckTags?.length]);
    }
    return true;
  }
}
exports.default = TsDecoratorTagCheck;
//# sourceMappingURL=TsDecoratorTagCheck.js.map