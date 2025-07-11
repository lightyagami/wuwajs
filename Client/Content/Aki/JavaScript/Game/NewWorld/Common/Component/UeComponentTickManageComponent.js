"use strict";

var UeComponentTickManageComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, n, s) : i(t, n)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UeComponentTickManageComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let UeComponentTickManageComponent = UeComponentTickManageComponent_1 = class UeComponentTickManageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.vsn = new Array();
    this.LFr = new Array();
  }
  static get Dependencies() {
    return [1];
  }
  OnInitData(e) {
    for (const t of e.GetParam(UeComponentTickManageComponent_1)) {
      if (t instanceof UE.Class) {
        this.vsn.push(t);
      }
    }
    return true;
  }
  OnActivate() {
    const t = this.Entity.GetComponent(1);
    if (this.vsn.length > 0) {
      for (const e of this.vsn) {
        var n = t.Owner.K2_GetComponentsByClass(e);
        var o = n.Num();
        for (let e = 0; e < o; ++e) {
          const t = n.Get(e);
          if (!(t instanceof UE.SkeletalMeshComponent) && !!t.IsComponentTickEnabled()) {
            this.LFr.push(t);
            t.SetComponentTickEnabled(false);
          }
        }
      }
    } else {
      var i = t.Owner.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
      var r = i.Num();
      for (let e = 0; e < r; ++e) {
        const t = i.Get(e);
        if (!(t instanceof UE.SkeletalMeshComponent) && !!t.IsComponentTickEnabled()) {
          this.LFr.push(t);
          t.SetComponentTickEnabled(false);
        }
      }
    }
  }
  OnTick(e) {
    var t = this.Entity.GetComponent(2).Actor.CustomTimeDilation;
    var n = e * MathUtils_1.MathUtils.MillisecondToSecond * t;
    for (const o of this.LFr) {
      o.KuroTickComponentOutside(n);
    }
  }
};
UeComponentTickManageComponent = UeComponentTickManageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(112)], UeComponentTickManageComponent);
exports.UeComponentTickManageComponent = UeComponentTickManageComponent; //# sourceMappingURL=UeComponentTickManageComponent.js.map