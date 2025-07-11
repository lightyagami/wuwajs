"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceElementModel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const ColorUtils_1 = require("../../Utils/ColorUtils");
class TraceElementModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.JJo = undefined;
    this.uoe = undefined;
    this.CommonStartLocation = Vector_1.Vector.Create();
    this.CommonEndLocation = Vector_1.Vector.Create();
    this.CommonHitLocation = Vector_1.Vector.Create();
    this.xEr = undefined;
    this.wEr = undefined;
    this._d1 = undefined;
    this.ShowDebugTrace = false;
  }
  OnClear() {
    if (this._d1) {
      for (const e of this._d1.values()) {
        e.Dispose();
      }
      this._d1.clear();
      this._d1 = undefined;
    }
    if (this.JJo) {
      this.JJo.Dispose();
      this.JJo = undefined;
    }
    if (this.xEr) {
      this.xEr.Dispose();
      this.xEr = undefined;
    }
    if (this.wEr) {
      this.wEr.Dispose();
      this.wEr = undefined;
    }
    return true;
  }
  GetActorTrace() {
    if (!this.JJo) {
      this.zJo();
    }
    return this.JJo;
  }
  ClearActorTrace() {
    if (this.JJo) {
      this.JJo.WorldContextObject = undefined;
      this.JJo.ActorsToIgnore.Empty();
    }
  }
  zJo() {
    var e = UE.NewObject(UE.TraceSphereElement.StaticClass());
    e.bIsSingle = false;
    e.bIgnoreSelf = true;
    e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(e, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(e, ColorUtils_1.ColorUtils.LinearRed);
    this.JJo = e;
  }
  GetLineTrace() {
    if (!this.uoe) {
      this.BEr();
    }
    return this.uoe;
  }
  ClearLineTrace() {
    if (this.uoe) {
      this.uoe.WorldContextObject = undefined;
      this.uoe.ActorsToIgnore.Empty();
    }
  }
  BEr() {
    var e = UE.NewObject(UE.TraceLineElement.StaticClass());
    e.bIsSingle = true;
    e.bIgnoreSelf = true;
    e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(e, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(e, ColorUtils_1.ColorUtils.LinearRed);
    this.uoe = e;
  }
  GetBoxTrace() {
    if (!this.xEr) {
      this.bEr();
    }
    return this.xEr;
  }
  ClearBoxTrace() {
    if (this.xEr) {
      this.xEr.WorldContextObject = undefined;
      this.xEr.ActorsToIgnore.Empty();
    }
  }
  bEr() {
    var e = UE.NewObject(UE.TraceBoxElement.StaticClass());
    e.bIsSingle = true;
    e.bIgnoreSelf = true;
    e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(e, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(e, ColorUtils_1.ColorUtils.LinearRed);
    this.xEr = e;
  }
  GetCapsuleTrace() {
    if (!this.wEr) {
      this.qEr();
    }
    return this.wEr;
  }
  ClearCapsuleTrace() {
    if (this.wEr) {
      this.wEr.WorldContextObject = undefined;
      this.wEr.ActorsToIgnore.Empty();
    }
  }
  qEr() {
    var e = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
    e.bIsSingle = true;
    e.bIgnoreSelf = true;
    e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(e, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(e, ColorUtils_1.ColorUtils.LinearRed);
    this.wEr = e;
  }
  cd1(e, t, r, i) {
    if (this._d1 === undefined) {
      this._d1 = new Map();
    }
    if (!this._d1.has(e)) {
      o = UE.NewObject(e);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(o, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(o, ColorUtils_1.ColorUtils.LinearRed);
      this._d1.set(e, o);
    }
    var o = this._d1.get(e);
    o.ClearCacheData(true);
    o.ActorsToIgnore.Empty();
    o.bIsSingle = r;
    o.bIgnoreSelf = i;
    o.WorldContextObject = t;
    if (this.ShowDebugTrace) {
      o.SetDrawDebugTrace(2);
    }
    return o;
  }
  GetTraceTypeElement(e, t, r, i = true, o = true) {
    e = this.cd1(e, r, i, o);
    e.SetTraceTypeQuery(t);
    return e;
  }
  GetObjectTypeElement(e, t, r, i = true, o = true) {
    var e = this.cd1(e, r, i, o);
    var s = UE.NewArray(UE.BuiltinByte);
    if (t instanceof Array) {
      for (const n of t) {
        s.Add(n);
      }
    } else {
      s.Add(t);
    }
    e.SetObjectTypesQuery((0, puerts_1.$ref)(s));
    return e;
  }
}
exports.TraceElementModel = TraceElementModel;
//# sourceMappingURL=TraceElementModel.js.map