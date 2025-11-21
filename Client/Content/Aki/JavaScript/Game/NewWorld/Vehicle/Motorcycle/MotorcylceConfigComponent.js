"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, o, n) : s(e, o)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleConfigComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const baseName = new UE.FName("Base");
let MotorcycleConfigComponent = class MotorcycleConfigComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lie = undefined;
    this.ACd = undefined;
    this.hId = undefined;
    this.DCd = new Map();
    this.xCd = new Set();
    this.UCd = (0, puerts_1.$ref)(undefined);
    this.EGd = UE.NewArray(UE.BuiltinInt);
    this.UWi = (t, e) => {
      var o;
      if (this.ACd) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Movement", 6, "MotorConfig AddTagListen", ["tag", t], ["tagExist", e]);
        }
        if (e) {
          if (!this.xCd.has(t)) {
            this.xCd.add(t);
            e = this.DCd.get(t);
            this.ACd.GetConfigDataByKeyName(e, this.UCd);
            o = (0, puerts_1.$unref)(this.UCd);
            this.ConvertVarNames(o.VarNames, this.EGd);
            this.hId.AddSubConfigByNumber(e, o.Priority, this.EGd, o.Configs);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Movement", 6, "MotorConfig AddSubConfig", ["tag", t], ["keyName", e]);
            }
          }
        } else if (this.xCd.delete(t) && (o = this.DCd.get(t), this.hId.RemoveSubConfig(o), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Movement", 6, "MotorConfig RemoveSubConfig", ["tag", t], ["keyName", o]);
        }
      }
    };
  }
  OnStart() {
    this.Lie = this.Entity.GetComponent(245);
    if (!this.Lie) {
      return false;
    }
    this.ACd = this.Entity.GetComponent(238)?.Actor;
    if (!this.ACd.GetConfigDataNameTagMap) {
      return false;
    }
    var t = (0, puerts_1.$ref)(undefined);
    this.ACd.GetConfigDataNameTagMap(t);
    var e = (0, puerts_1.$unref)(t);
    var o = e.Num();
    this.hId = this.ACd.VehicleMovementComponent.MotorConfigHelper;
    if (!this.hId) {
      this.hId = UE.NewObject(UE.KuroConfigHelper.StaticClass(), this.ACd.VehicleMovementComponent, "MotorConfigHelper");
      this.ACd.VehicleMovementComponent.MotorConfigHelper = this.hId;
    }
    for (let t = 0; t < o; ++t) {
      var i;
      var s = e.GetKey(t);
      var r = e.Get(s);
      if (s.op_Equality(baseName)) {
        this.ACd.GetConfigDataByKeyName(s, this.UCd);
        i = (0, puerts_1.$unref)(this.UCd);
        this.hId.InitBase(this.ACd.VehicleMovementComponent, i.Configs);
      } else if (r && r.TagName !== "None" && (this.DCd.set(r.TagId, s), this.Lie.HasTag(r.TagId) && this.UWi(r.TagId, true), this.Lie.AddTagAddOrRemoveListener(r.TagId, this.UWi), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Movement", 6, "MotorConfig AddTagListen", ["tag", r.TagId], ["keyName", s]);
      }
    }
    return true;
  }
  OnEnd() {
    for (var [t] of this.DCd) {
      this.Lie.RemoveTagAddOrRemoveListener(t, this.UWi);
    }
    return true;
  }
  ConvertVarNames(e, o) {
    o.Empty();
    var i = e.Num();
    for (let t = 0; t < i; ++t) {
      o.Add(e.Get(t));
    }
  }
};
MotorcycleConfigComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(255)], MotorcycleConfigComponent);
exports.MotorcycleConfigComponent = MotorcycleConfigComponent; //# sourceMappingURL=MotorcylceConfigComponent.js.map