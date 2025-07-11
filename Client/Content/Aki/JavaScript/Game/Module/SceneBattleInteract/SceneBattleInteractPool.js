"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneBattleInteractPool = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../GlobalData");
class SceneBattleInteractPool {
  static GetTraceCapsuleElement(e) {
    return this.Ljo(UE.TraceCapsuleElement.StaticClass(), this.SU1, e);
  }
  static GetTraceLineElement(e) {
    return this.Ljo(UE.TraceLineElement.StaticClass(), this.Rjo, e);
  }
  static GetTraceSphereElement(e) {
    return this.Ljo(UE.TraceSphereElement.StaticClass(), this.Ujo, e);
  }
  static Ljo(e, t, a, r = false) {
    if (t.length > 0) {
      (t = t.pop()).SetTraceTypeQuery(a);
    } else {
      (t = UE.NewObject(e)).WorldContextObject = GlobalData_1.GlobalData.World;
      t.SetTraceTypeQuery(a);
      t.bTraceComplex = false;
      t.bIgnoreSelf = true;
    }
    t.bIsSingle = r;
    return t;
  }
  static RecycleTraceCapsuleElement(e) {
    if (e) {
      e.ClearCacheData();
      this.SU1.push(e);
    }
  }
  static RecycleTraceLineElement(e) {
    if (e) {
      e.ClearCacheData();
      this.Rjo.push(e);
    }
  }
  static RecycleTraceSphereElement(e) {
    if (e) {
      e.ClearCacheData();
      this.Ujo.push(e);
    }
  }
  static Clear() {
    this.SU1.length = 0;
    this.Rjo.length = 0;
    this.Ujo.length = 0;
  }
}
(exports.SceneBattleInteractPool = SceneBattleInteractPool).SU1 = new Array();
SceneBattleInteractPool.Rjo = new Array();
SceneBattleInteractPool.Ujo = new Array(); //# sourceMappingURL=SceneBattleInteractPool.js.map