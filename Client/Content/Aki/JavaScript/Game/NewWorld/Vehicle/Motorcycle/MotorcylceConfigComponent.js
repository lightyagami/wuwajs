"use strict";

var __decorate = this && this.__decorate || function (t, i, o, e) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, o) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, o, e);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(i, o, n) : s(i, o)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(i, o, n);
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
class MotorConfigParams {
  constructor(t, i, o, e) {
    this.Name = t;
    this.Lo = i;
    this.Lie = o;
    this.fBf = e;
    this.cSa = false;
    this.mQt = new Array();
    this.gBf = UE.NewArray(UE.BuiltinInt);
    var s = i.ActivateTags.GameplayTags;
    for (let t = s.Num() - 1; t >= 0; --t) {
      this.mQt.push(s.Get(t).TagId);
    }
    MotorConfigParams.ConvertVarNames(i.VarNames, this.gBf);
  }
  static ConvertVarNames(i, o) {
    o.Empty();
    var e = i.Num();
    for (let t = 0; t < e; ++t) {
      o.Add(i.Get(t));
    }
  }
  TryActivate() {
    if (!this.cSa) {
      for (const t of this.mQt) {
        if (!this.Lie.HasTag(t)) {
          return;
        }
      }
      this.cSa = true;
      this.fBf.AddSubConfigByNumber(this.Name, this.Lo.Priority, this.gBf, this.Lo.Configs);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "MotorConfig AddSubConfig", ["Name", this.Name]);
      }
    }
  }
  Inactivate() {
    if (this.cSa && (this.cSa = false, this.fBf.RemoveSubConfig(this.Name), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Movement", 6, "MotorConfig RemoveSubConfig", ["Name", this.Name]);
    }
  }
}
let MotorcycleConfigComponent = class MotorcycleConfigComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lie = undefined;
    this.ACd = undefined;
    this.hId = undefined;
    this.CBf = new Map();
    this.UCd = (0, puerts_1.$ref)(undefined);
    this.UWi = (t, i) => {
      if (this.ACd) {
        t = this.CBf.get(t);
        if (t) {
          if (i) {
            for (const o of t) {
              o.TryActivate();
            }
          } else {
            for (const e of t) {
              e.Inactivate();
            }
          }
        }
      }
    };
  }
  OnStart() {
    this.Lie = this.Entity.GetComponent(254);
    if (!this.Lie) {
      return false;
    }
    this.ACd = this.Entity.GetComponent(247)?.Actor;
    if (!this.ACd.GetConfigDataNameTagMap) {
      return false;
    }
    this.hId = this.ACd.VehicleMovementComponent.MotorConfigHelper;
    if (!this.hId) {
      this.hId = UE.NewObject(UE.KuroConfigHelper.StaticClass(), this.ACd.VehicleMovementComponent, "MotorConfigHelper");
      this.ACd.VehicleMovementComponent.MotorConfigHelper = this.hId;
    }
    var t;
    var i = (0, puerts_1.$ref)(undefined);
    UE.DataTableFunctionLibrary.GetDataTableRowNames(this.ACd.VehicleMovementComponent?.MotorConfigDataTable, i);
    var o = (0, puerts_1.$unref)(i);
    var e = o.Num();
    this.CBf.clear();
    for (let t = 0; t < e; ++t) {
      var s = o.Get(t);
      this.ACd.GetConfigDataByKeyName(s, this.UCd);
      var r = (0, puerts_1.$unref)(this.UCd);
      if (s.op_Equality(baseName)) {
        this.hId.InitBase(this.ACd.VehicleMovementComponent, r.Configs);
      } else {
        var n = new MotorConfigParams(s, r, this.Lie, this.hId);
        var h = r.ActivateTags.GameplayTags;
        var f = h.Num();
        for (let t = 0; t < f; ++t) {
          var a;
          var c = h.Get(t);
          if (c && c.TagName !== "None") {
            if (a = this.CBf.get(c.TagId)) {
              a.push(n);
            } else {
              this.CBf.set(c.TagId, [n]);
            }
          }
        }
        n.TryActivate();
      }
    }
    for ([t] of this.CBf) {
      this.Lie.AddTagAddOrRemoveListener(t, this.UWi);
    }
    var i = this.Entity.GetComponent(246)?.Config?.Asset;
    if (i &&= i.ConfigDataTable) {
      this.ACd.VehicleMovementComponent.MotorConfigDataTable = i;
    }
    return true;
  }
  OnEnd() {
    for (var [t] of this.CBf) {
      this.Lie.RemoveTagAddOrRemoveListener(t, this.UWi);
    }
    return true;
  }
};
MotorcycleConfigComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(269)], MotorcycleConfigComponent);
exports.MotorcycleConfigComponent = MotorcycleConfigComponent; //# sourceMappingURL=MotorcylceConfigComponent.js.map