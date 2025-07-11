"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
class TsDecoratorBlackboardValuesCompare extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.StringMap = undefined;
    this.FloatMap = undefined;
    this.IntMap = undefined;
    this.BooleanMap = undefined;
    this.VectorMap = undefined;
    this.IsInitTsVariables = false;
    this.TsStringMap = undefined;
    this.TsFloatMap = undefined;
    this.TsIntMap = undefined;
    this.TsBooleanMap = undefined;
    this.TsVectorMap = undefined;
    this.EntityId = undefined;
    this.TmpVector = undefined;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsStringMap = undefined;
    this.TsFloatMap = undefined;
    this.TsIntMap = undefined;
    this.TsBooleanMap = undefined;
    this.TsVectorMap = undefined;
    this.EntityId = undefined;
    this.TmpVector = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsStringMap = new Map();
      this.TsFloatMap = new Map();
      this.TsIntMap = new Map();
      this.TsBooleanMap = new Map();
      this.TsVectorMap = new Map();
      this.TmpVector = Vector_1.Vector.Create();
      for (let t = 0, r = this.StringMap.Num(); t < r; t++) {
        var i = this.StringMap.GetKey(t);
        var o = this.StringMap.Get(i);
        this.TsStringMap.set(i, o);
      }
      for (let t = 0, r = this.FloatMap.Num(); t < r; t++) {
        var e = this.FloatMap.GetKey(t);
        var s = this.FloatMap.Get(e);
        this.TsFloatMap.set(e, s);
      }
      for (let t = 0, r = this.IntMap.Num(); t < r; t++) {
        var h = this.IntMap.GetKey(t);
        var a = this.IntMap.Get(h);
        this.TsIntMap.set(h, a);
      }
      for (let t = 0, r = this.BooleanMap.Num(); t < r; t++) {
        var l = this.BooleanMap.GetKey(t);
        var n = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, n);
      }
      for (let t = 0, r = this.VectorMap.Num(); t < r; t++) {
        var v = this.VectorMap.GetKey(t);
        var d = this.VectorMap.Get(v);
        var d = Vector_1.Vector.Create(d);
        this.TsVectorMap.set(v, d);
      }
    }
  }
  ExecuteStringMapCompare() {
    for (var [t, r] of this.TsStringMap) {
      if (ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(this.EntityId, t) !== r) {
        return false;
      }
    }
    return true;
  }
  ExecuteFloatMapCompare() {
    for (var [t, r] of this.TsFloatMap) {
      if (ControllerHolder_1.ControllerHolder.BlackboardController.GetFloatValueByEntity(this.EntityId, t) !== r) {
        return false;
      }
    }
    return true;
  }
  ExecuteIntMapCompare() {
    for (var [t, r] of this.TsIntMap) {
      if (ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.EntityId, t) !== r) {
        return false;
      }
    }
    return true;
  }
  ExecuteBooleanMapCompare() {
    for (var [t, r] of this.TsBooleanMap) {
      if (ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(this.EntityId, t) !== r) {
        return false;
      }
    }
    return true;
  }
  ExecuteVectorMapCompare() {
    for (var [t, r] of this.TsVectorMap) {
      t = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(this.EntityId, t);
      if (!t) {
        return false;
      }
      this.TmpVector.FromUeVector(t);
      if (!this.TmpVector.Equals(r)) {
        return false;
      }
    }
    return true;
  }
  PerformConditionCheckAI(t, r) {
    var i = t.AiController;
    if (i) {
      this.InitTsVariables();
      this.EntityId = i.CharActorComp.Entity.Id;
      return this.ExecuteIntMapCompare() && this.ExecuteStringMapCompare() && this.ExecuteBooleanMapCompare() && this.ExecuteFloatMapCompare() && this.ExecuteVectorMapCompare();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
  }
}
exports.default = TsDecoratorBlackboardValuesCompare;
//# sourceMappingURL=TsDecoratorBlackboardValuesCompare.js.map