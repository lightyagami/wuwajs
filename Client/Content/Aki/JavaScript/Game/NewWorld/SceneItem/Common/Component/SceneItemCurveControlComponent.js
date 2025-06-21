"use strict";
var SceneItemCurveControlComponent_1, __decorate = this && this.__decorate || function(t, e, o, r) {
  var n, i = arguments.length,
    C = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) C = Reflect.decorate(t, e, o, r);
  else
    for (var l = t.length - 1; 0 <= l; l--)(n = t[l]) && (C = (i < 3 ? n(C) : 3 < i ? n(e, o, C) : n(e, o)) || C);
  return 3 < i && C && Object.defineProperty(e, o, C), C
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneItemCurveControlComponent = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../../Global"),
  CurveControlFactory_1 = require("../../CurveControl/CurveControlFactory"),
  STEP_TIME = .05;
let SceneItemCurveControlComponent = SceneItemCurveControlComponent_1 = class SceneItemCurveControlComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.UT1 = void 0, this.Hte = void 0, this.l_l = !0
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemCurveControlComponent_1)[0];
    return this.Hte = this.Entity.GetComponent(1), this.UT1 = CurveControlFactory_1.CurveControlFactory.CreateCurveControl(t.CurveControlConfig?.Type), this.UT1 ? (this.UT1.Init(this.Entity, t), this.DisableByKey(6, !1), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "[CurveControl] CreateCurveControl Failed", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]), !1)
  }
  OnTick(t) {
    this.l_l ? this.l_l = !1 : this.UT1 ? this.UT1.Tick(t) || (this.DisableByKey(6, !1), this.l_l = !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "[CurveControl] OnTick Failed", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]), this.DisableByKey(6, !1), this.l_l = !0)
  }
  StartPerformance(t) {
    var e, o, r;
    this.UT1 ? (r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) ? (r = r.GetComponent(172)) ? (e = r.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_SpecialEnergy2Max), o = r.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_SpecialEnergy1Max) / e * STEP_TIME, r = r.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_SpecialEnergy3Max) / e * STEP_TIME - o, this.UT1.SetAllTime((o - t) * MathUtils_1.MathUtils.SecondToMillisecond, r * MathUtils_1.MathUtils.SecondToMillisecond, 2.5 * MathUtils_1.MathUtils.SecondToMillisecond), this.UT1.Start(), this.EnableByKey(6)) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "attrComp is null") : Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "curCharEntity is null") : Log_1.Log.CheckError() && Log_1.Log.Error("SceneItemCurveControl", 31, "[CurveControl] StartPerformance Failed", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()])
  }
  StopPerformance() {
    this.UT1 && !this.UT1.IsStop() && this.UT1.Stop()
  }
};
SceneItemCurveControlComponent = SceneItemCurveControlComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(288)], SceneItemCurveControlComponent), exports.SceneItemCurveControlComponent = SceneItemCurveControlComponent;
//# sourceMappingURL=SceneItemCurveControlComponent.js.map