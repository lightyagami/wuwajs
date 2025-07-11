"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskBlackBoardSetValues extends TsTaskAbortImmediatelyBase_1.default {
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
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsStringMap = undefined;
    this.TsFloatMap = undefined;
    this.TsIntMap = undefined;
    this.TsBooleanMap = undefined;
    this.TsVectorMap = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsStringMap = new Map();
      this.TsFloatMap = new Map();
      this.TsIntMap = new Map();
      this.TsBooleanMap = new Map();
      this.TsVectorMap = new Map();
      for (let t = 0, i = this.StringMap.Num(); t < i; t++) {
        var s = this.StringMap.GetKey(t);
        var e = this.StringMap.Get(s);
        this.TsStringMap.set(s, e);
      }
      for (let t = 0, i = this.FloatMap.Num(); t < i; t++) {
        var o = this.FloatMap.GetKey(t);
        var r = this.FloatMap.Get(o);
        this.TsFloatMap.set(o, r);
      }
      for (let t = 0, i = this.IntMap.Num(); t < i; t++) {
        var h = this.IntMap.GetKey(t);
        var a = this.IntMap.Get(h);
        this.TsIntMap.set(h, a);
      }
      for (let t = 0, i = this.BooleanMap.Num(); t < i; t++) {
        var l = this.BooleanMap.GetKey(t);
        var d = this.BooleanMap.Get(l);
        this.TsBooleanMap.set(l, d);
      }
      for (let t = 0, i = this.VectorMap.Num(); t < i; t++) {
        var v = this.VectorMap.GetKey(t);
        var n = this.VectorMap.Get(v);
        var n = Vector_1.Vector.Create(n);
        this.TsVectorMap.set(v, n);
      }
    }
  }
  ReceiveExecuteAI(t, i) {
    var s = t.AiController;
    if (s) {
      this.InitTsVariables();
      s = s.CharActorComp.Entity.Id;
      this.ExecuteStringMap(s);
      this.ExecuteFloatMap(s);
      this.ExecuteIntMap(s);
      this.ExecuteBooleanMap(s);
      this.ExecuteVectorMap(s);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ExecuteStringMap(t) {
    for (var [i, s] of this.TsStringMap) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(t, i, s);
    }
  }
  ExecuteFloatMap(t) {
    for (var [i, s] of this.TsFloatMap) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetFloatValueByEntity(t, i, s);
    }
  }
  ExecuteIntMap(t) {
    for (var [i, s] of this.TsIntMap) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(t, i, s);
    }
  }
  ExecuteBooleanMap(t) {
    for (var [i, s] of this.TsBooleanMap) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(t, i, s);
    }
  }
  ExecuteVectorMap(t) {
    for (var [i, s] of this.TsVectorMap) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(t, i, s.X, s.Y, s.Z);
    }
  }
}
exports.default = TsTaskBlackBoardSetValues;
//# sourceMappingURL=TsTaskBlackBoardSetValues.js.map