"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IVar_1 = require("../../../../../../UniverseEditor/Interface/IVar");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorVarCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckType = 0;
    this.SourceVarContext = undefined;
    this.TargetVarContext = undefined;
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsSourceVarContext = undefined;
    this.TsTargetVarContext = undefined;
    this.Entity = undefined;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsSourceVarContext = undefined;
    this.TsTargetVarContext = undefined;
    this.Entity = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckType = this.CheckType;
      this.TsSourceVarContext = this.SourceVarContext;
      this.TsTargetVarContext = this.TargetVarContext;
    }
  }
  PerformConditionCheckAI(e, r) {
    var t = e.AiController;
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    this.Entity = t.CharActorComp?.Entity;
    if (!this.TsSourceVarContext || !this.TsTargetVarContext) {
      return false;
    }
    if (this.TsSourceVarContext.Type === "" || this.TsTargetVarContext.Type === "") {
      return false;
    }
    if (this.TsSourceVarContext.Type !== this.TsTargetVarContext.Type) {
      return false;
    }
    var s = this.GetVarValue(this.TsSourceVarContext);
    var a = this.GetVarValue(this.TsTargetVarContext);
    if (s === undefined || a === undefined) {
      return false;
    }
    switch (this.TsCheckType) {
      case 0:
        return s === a;
      case 1:
        return s !== a;
      case 2:
        return s < a;
      case 3:
        return s <= a;
      case 4:
        return a < s;
      case 5:
        return a <= s;
      default:
        return false;
    }
  }
  GetVarValue(e) {
    switch (e.VarRefSource) {
      case "Constant":
        return this.ParseConstantValue(e);
      case "Global":
        return ModelManager_1.ModelManager.WorldModel?.GetWorldState(e.Key);
      case "Other":
        return this.ParseOtherValue(e);
      case "Self":
        return this.ParseSelfValue(e);
    }
  }
  GetClientValue(e, r) {
    switch (r.Type) {
      case "Boolean":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(e.Id, r.Key);
      case "Float":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetFloatValueByEntity(e.Id, r.Key);
      case "Int":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(e.Id, r.Key);
      case "String":
        return ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(e.Id, r.Key);
      default:
        return;
    }
  }
  ParseConstantValue(e) {
    switch (e.Type) {
      case "Boolean":
        return e.BoolValue;
      case "Float":
        return e.FloatValue;
      case "Int":
        return e.IntValue;
      case "String":
        return e.StringValue;
      default:
        return;
    }
  }
  ParseSelfValue(e) {
    if (e.IsClientVariable) {
      return this.GetClientValue(this.Entity, e);
    } else {
      e = this.Entity?.GetComponent(0)?.GetEntityVar(e.Key);
      return this.ParseValue(e);
    }
  }
  ParseOtherValue(e) {
    var r = e.Key;
    var t = e.RefId;
    switch (e.VarRefType) {
      case "Entity":
        var s = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t);
        if (s) {
          if (e.IsClientVariable) {
            return this.GetClientValue(s.Entity, e);
          } else {
            s = s.Entity?.GetComponent(0);
            return this.ParseValue(s?.GetEntityVar(r));
          }
        }
        break;
      case "Quest":
        s = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t)?.Tree;
        return this.ParseValue(s?.GetTreeVarByKey(r));
      case "LevelPlay":
        s = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(t)?.Tree;
        return this.ParseValue(s?.GetTreeVarByKey(r));
      default:
        return;
    }
  }
  ParseValue(e) {
    if (e) {
      switch ((0, IVar_1.getVarTypeByIndex)(e.iTs)) {
        case "Boolean":
          return e.rTs;
        case "Float":
          return e.sTs;
        case "Int":
          return MathUtils_1.MathUtils.LongToNumber(e.oTs);
        case "String":
          return e.nTs;
        default:
          return;
      }
    }
  }
}
exports.default = TsDecoratorVarCompare;
//# sourceMappingURL=TsDecoratorVarCompare.js.map