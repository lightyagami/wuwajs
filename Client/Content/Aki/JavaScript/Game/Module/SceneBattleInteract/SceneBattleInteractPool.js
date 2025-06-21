"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneBattleInteractPool = void 0;
const UE = require("ue"),
  GlobalData_1 = require("../../GlobalData");
class SceneBattleInteractPool {
  static GetTraceCapsuleElement(e) {
    return this.Ljo(UE.TraceCapsuleElement.StaticClass(), this.KD1, e)
  }
  static GetTraceLineElement(e) {
    return this.Ljo(UE.TraceLineElement.StaticClass(), this.Rjo, e)
  }
  static GetTraceSphereElement(e) {
    return this.Ljo(UE.TraceSphereElement.StaticClass(), this.Ujo, e)
  }
  static Ljo(e, t, a, r = !1) {
    return 0 < t.length ? (t = t.pop()).SetTraceTypeQuery(a) : ((t = UE.NewObject(e)).WorldContextObject = GlobalData_1.GlobalData.World, t.SetTraceTypeQuery(a), t.bTraceComplex = !1, t.bIgnoreSelf = !0), t.bIsSingle = r, t
  }
  static RecycleTraceCapsuleElement(e) {
    e && (e.ClearCacheData(), this.KD1.push(e))
  }
  static RecycleTraceLineElement(e) {
    e && (e.ClearCacheData(), this.Rjo.push(e))
  }
  static RecycleTraceSphereElement(e) {
    e && (e.ClearCacheData(), this.Ujo.push(e))
  }
  static Clear() {
    this.KD1.length = 0, this.Rjo.length = 0, this.Ujo.length = 0
  }
}(exports.SceneBattleInteractPool = SceneBattleInteractPool).KD1 = new Array, SceneBattleInteractPool.Rjo = new Array, SceneBattleInteractPool.Ujo = new Array;
//# sourceMappingURL=SceneBattleInteractPool.js.map