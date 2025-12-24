"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorGeCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKeyTarget = "";
    this.Checks = undefined;
    this.Logic = 0;
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsChecks = undefined;
    this.TsLogic = undefined;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsChecks = undefined;
    this.TsLogic = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKeyTarget = this.BlackboardKeyTarget;
      this.TsChecks = new Map();
      var t = this.Checks.Num();
      if (t > 0) {
        for (let r = 0; r < t; r++) {
          var e = this.Checks.GetKey(r);
          var i = this.Checks.Get(e);
          this.TsChecks.set(e, i);
        }
      }
      this.TsLogic = this.Logic;
    }
  }
  PerformConditionCheckAI(r, t) {
    var e = r.AiController;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", r.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    let i = e.CharActorComp;
    if (this.TsBlackboardKeyTarget) {
      r = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(e.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyTarget);
      if (!r) {
        return false;
      }
      e = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(r);
      if (!e) {
        return false;
      }
      i = e;
    }
    var o = i.Entity.CheckGetComponent(183);
    if (!o) {
      return false;
    }
    if (this.TsLogic === 1) {
      for (var [s, h] of this.TsChecks) {
        if (o.GetBuffTotalStackById(Number(s)) > 0 === h) {
          return true;
        }
      }
      return false;
    }
    for (let r = 0; r < this.Checks.Num(); ++r) {
      var l = this.Checks.GetKey(r);
      var a = this.Checks.Get(l);
      if (o.GetBuffTotalStackById(Number(l)) > 0 !== a) {
        return false;
      }
    }
    return true;
  }
}
exports.default = TsDecoratorGeCheck;
//# sourceMappingURL=TsDecoratorGeCheck.js.map