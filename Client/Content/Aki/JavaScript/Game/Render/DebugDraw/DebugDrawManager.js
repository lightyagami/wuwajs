"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugDrawManager = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../GlobalData");
const RenderDataManager_1 = require("../Data/RenderDataManager");
class EffectDebugDrawInfo {
  constructor() {
    this.Index = 0;
    this.Type = undefined;
    this.VectorA = undefined;
    this.ColorA = undefined;
    this.NumberA = 0;
    this.BoxA = undefined;
  }
}
class DebugDrawManager {
  constructor() {
    this.DebugDrawMap = undefined;
    this.Counter = 0;
  }
  static EnsureInstance() {
    if (!this.Instance) {
      this.Instance = new DebugDrawManager();
      this.Instance.Counter = 0;
      this.Instance.DebugDrawMap = new Map();
    }
  }
  static AddDebugLineFromPlayer(t, a, e) {
    this.EnsureInstance();
    var i = new EffectDebugDrawInfo();
    i.Index = this.Instance.Counter;
    i.Type = 0;
    i.VectorA = t;
    i.ColorA = a;
    i.NumberA = e;
    this.Instance.DebugDrawMap.set(i.Index, i);
    this.Instance.Counter++;
    return i.Index;
  }
  static AddDebugBox(t, a, e) {
    this.EnsureInstance();
    var i = new EffectDebugDrawInfo();
    i.Index = this.Instance.Counter;
    i.Type = 1;
    i.ColorA = a;
    i.NumberA = e;
    i.BoxA = t;
    this.Instance.DebugDrawMap.set(i.Index, i);
    this.Instance.Counter++;
    return i.Index;
  }
  static RemoveDebugDraw(t) {
    if (this.Instance) {
      this.Instance.DebugDrawMap.delete(t);
    }
  }
  static ClearDebugDraw() {
    if (this.Instance) {
      this.Instance.DebugDrawMap.clear();
    }
  }
  static Initialize() {}
  static Tick(t) {
    if (this.Instance) {
      this.Instance.DebugDrawMap.forEach((t, a) => {
        switch (t.Type) {
          case 0:
            UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, RenderDataManager_1.RenderDataManager.Get().GetCurrentCharacterPosition().ToUeVector(), t.VectorA.ToUeVector(), t.ColorA, 0.01, t.NumberA);
            break;
          case 1:
            UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.BoxA.Min.op_Addition(t.BoxA.Max).op_Division(2)), UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.BoxA.Max.op_Subtraction(t.BoxA.Min).op_Division(2)), t.ColorA, undefined, 0.01, t.NumberA);
        }
      });
    }
  }
  static Destroy() {
    this.Instance &&= undefined;
  }
}
(exports.DebugDrawManager = DebugDrawManager).Instance = undefined;
//# sourceMappingURL=DebugDrawManager.js.map