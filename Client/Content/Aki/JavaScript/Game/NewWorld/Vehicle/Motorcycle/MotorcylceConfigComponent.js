"use strict";

var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(i, e, n) : s(i, e)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(i, e, n);
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
  constructor(t, i, e, o) {
    this.Name = t;
    this.Lo = i;
    this.Lie = e;
    this.oLf = o;
    this.cSa = false;
    this.mQt = new Array();
    this.nLf = UE.NewArray(UE.BuiltinInt);
    var s = i.ActivateTags.GameplayTags;
    for (let t = s.Num() - 1; t >= 0; --t) {
      this.mQt.push(s.Get(t).TagId);
    }
    MotorConfigParams.ConvertVarNames(i.VarNames, this.nLf);
  }
  static ConvertVarNames(i, e) {
    e.Empty();
    var o = i.Num();
    for (let t = 0; t < o; ++t) {
      e.Add(i.Get(t));
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
      this.oLf.AddSubConfigByNumber(this.Name, this.Lo.Priority, this.nLf, this.Lo.Configs);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "MotorConfig AddTagListen", ["Name", this.Name]);
      }
    }
  }
  Inactivate() {
    if (this.cSa && (this.cSa = false, this.oLf.RemoveSubConfig(this.Name), Log_1.Log.CheckInfo())) {
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
    this.sLf = new Map();
    this.UCd = (0, puerts_1.$ref)(undefined);
    this.UWi = (t, i) => {
      if (this.ACd) {
        t = this.sLf.get(t);
        if (t) {
          if (i) {
            for (const e of t) {
              e.TryActivate();
            }
          } else {
            for (const o of t) {
              o.Inactivate();
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
    var e = (0, puerts_1.$unref)(i);
    var o = e.Num();
    this.sLf.clear();
    for (let t = 0; t < o; ++t) {
      var s = e.Get(t);
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
            if (a = this.sLf.get(c.TagId)) {
              a.push(n);
            } else {
              this.sLf.set(c.TagId, [n]);
            }
          }
        }
        n.TryActivate();
      }
    }
    for ([t] of this.sLf) {
      this.Lie.AddTagAddOrRemoveListener(t, this.UWi);
    }
    var i = this.Entity.GetComponent(246)?.Config?.Asset;
    if (i &&= i.ConfigDataTable) {
      this.ACd.VehicleMovementComponent.MotorConfigDataTable = i;
    }
    return true;
  }
  OnEnd() {
    for (var [t] of this.sLf) {
      this.Lie.RemoveTagAddOrRemoveListener(t, this.UWi);
    }
    return true;
  }
};
MotorcycleConfigComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(268)], MotorcycleConfigComponent);
exports.MotorcycleConfigComponent = MotorcycleConfigComponent; //# sourceMappingURL=MotorcylceConfigComponent.js.map