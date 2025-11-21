"use strict";

var SceneItemCurveControlComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, r) {
  var n;
  var i = arguments.length;
  var C = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    C = Reflect.decorate(t, e, o, r);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (n = t[l]) {
        C = (i < 3 ? n(C) : i > 3 ? n(e, o, C) : n(e, o)) || C;
      }
    }
  }
  if (i > 3 && C) {
    Object.defineProperty(e, o, C);
  }
  return C;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemCurveControlComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../Global");
const CurveControlFactory_1 = require("../../CurveControl/CurveControlFactory");
const STEP_TIME = 0.05;
let SceneItemCurveControlComponent = SceneItemCurveControlComponent_1 = class SceneItemCurveControlComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.nb1 = undefined;
    this.Hte = undefined;
    this.l_l = true;
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemCurveControlComponent_1)[0];
    this.Hte = this.Entity.GetComponent(1);
    this.nb1 = CurveControlFactory_1.CurveControlFactory.CreateCurveControl(t.CurveControlConfig?.Type);
    if (this.nb1) {
      this.nb1.Init(this.Entity, t);
      this.DisableByKey(6, false);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItemCurveControl", 31, "[CurveControl] CreateCurveControl Failed", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
  OnTick(t) {
    if (this.l_l) {
      this.l_l = false;
    } else if (this.nb1) {
      if (!this.nb1.Tick(t)) {
        this.DisableByKey(6, false);
        this.l_l = true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItemCurveControl", 31, "[CurveControl] OnTick Failed", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
      }
      this.DisableByKey(6, false);
      this.l_l = true;
    }
  }
  StartPerformance(t) {
    var e;
    var o;
    var r;
    if (this.nb1) {
      if (r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
        if (r = r.GetComponent(176)) {
          e = r.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_SpecialEnergy2Max);
          o = r.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_SpecialEnergy1Max) / e * STEP_TIME;
          r = r.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_SpecialEnergy3Max) / e * STEP_TIME - o;
          this.nb1.SetAllTime((o - t) * MathUtils_1.MathUtils.SecondToMillisecond, r * MathUtils_1.MathUtils.SecondToMillisecond, MathUtils_1.MathUtils.SecondToMillisecond * 2.5);
          this.nb1.Start();
          this.EnableByKey(6);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItemCurveControl", 31, "attrComp is null");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItemCurveControl", 31, "curCharEntity is null");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItemCurveControl", 31, "[CurveControl] StartPerformance Failed", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  StopPerformance() {
    if (this.nb1 && !this.nb1.IsStop()) {
      this.nb1.Stop();
    }
  }
};
SceneItemCurveControlComponent = SceneItemCurveControlComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(299)], SceneItemCurveControlComponent);
exports.SceneItemCurveControlComponent = SceneItemCurveControlComponent; //# sourceMappingURL=SceneItemCurveControlComponent.js.map