"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletTraceElementPool = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
class BulletTraceElementPool {
  static GetTraceBoxElement(e, t, r) {
    return this.Ljo(UE.TraceBoxElement.StaticClass(), this.Djo, e, t, r);
  }
  static GetTraceLineElement(e, t, r) {
    return this.Ljo(UE.TraceLineElement.StaticClass(), this.Rjo, e, t, r);
  }
  static GetTraceSphereElement(e, t, r) {
    return this.Ljo(UE.TraceSphereElement.StaticClass(), this.Ujo, e, t, r);
  }
  static Ljo(e, t, r, l, a) {
    if (t.length > 0) {
      const n = t.pop();
      var t = UE.NewArray(UE.BuiltinByte);
      var t = (0, puerts_1.$ref)(t);
      n.SetObjectTypesQuery(t);
      for (let e = 0, t = r.Num(); e < t; e++) {
        var o = r.Get(e);
        if (!a?.has(o)) {
          n.AddObjectTypeQuery(o);
        }
      }
      if (Info_1.Info.IsBuildDevelopmentOrDebug && (t = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l), n.SetDrawDebugTrace(t ? 2 : 0), t)) {
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(n, ColorUtils_1.ColorUtils.LinearGreen);
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(n, ColorUtils_1.ColorUtils.LinearRed);
      }
      return n;
    }
    const n = this.Ajo(e, r, a);
    if (Info_1.Info.IsBuildDevelopmentOrDebug && (t = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l), n.SetDrawDebugTrace(t ? 2 : 0), t)) {
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(n, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(n, ColorUtils_1.ColorUtils.LinearRed);
    }
    return n;
  }
  static RecycleTraceBoxElement(e) {
    if (e) {
      e.ClearCacheData();
      this.Djo.push(e);
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
  static Ajo(e, r, l, t = false) {
    var a = UE.NewObject(e);
    a.WorldContextObject = GlobalData_1.GlobalData.World;
    for (let e = 0, t = r.Num(); e < t; e++) {
      var o = r.Get(e);
      if (!l?.has(o)) {
        a.AddObjectTypeQuery(o);
      }
    }
    a.bTraceComplex = false;
    a.bIgnoreSelf = true;
    a.bIsSingle = t;
    return a;
  }
  static NewTraceElementByTraceChannel(e, t, r = false) {
    e = UE.NewObject(e);
    e.WorldContextObject = GlobalData_1.GlobalData.World;
    e.SetTraceTypeQuery(t);
    e.bTraceComplex = false;
    e.bIgnoreSelf = true;
    e.bIsSingle = r;
    return e;
  }
  static Clear() {
    this.Djo.length = 0;
    this.Rjo.length = 0;
    this.Ujo.length = 0;
  }
}
(exports.BulletTraceElementPool = BulletTraceElementPool).Djo = new Array();
BulletTraceElementPool.Rjo = new Array();
BulletTraceElementPool.Ujo = new Array(); //# sourceMappingURL=BulletTraceElementPool.js.map