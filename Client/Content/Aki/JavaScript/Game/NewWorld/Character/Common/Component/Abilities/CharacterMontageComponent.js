"use strict";
var __decorate = this && this.__decorate || function(e, t, o, r) {
  var n, s = arguments.length,
    i = s < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, o, r);
  else
    for (var a = e.length - 1; 0 <= a; a--)(n = e[a]) && (i = (s < 3 ? n(i) : 3 < s ? n(t, o, i) : n(t, o)) || i);
  return 3 < s && i && Object.defineProperty(t, o, i), i
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterMontageComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  BaseMontageComponent_1 = require("./BaseMontageComponent");
let CharacterMontageComponent = class CharacterMontageComponent extends BaseMontageComponent_1.BaseMontageComponent {
  constructor() {
    super(...arguments), this.AnimationComponent = void 0, this.MorphComponent = void 0, this.$Rc = !1
  }
  OnStart() {
    return this.AnimationComponent = this.Entity.CheckGetComponent(177), !!super.OnStart()
  }
  GetMainAnimInstance() {
    return this.AnimationComponent.MainAnimInstance
  }
  AddMontage(e, t, o) {
    if (this.$Rc) {
      this.MorphComponent = this.MorphComponent ?? this.Entity.GetComponent(279);
      var r = this.MorphComponent;
      if (r?.IsMorphMontage(o)) return t ? (r.AddMontage(e, t, o), void UE.KuroStaticLibrary.SetMontageANIndex(t)) : void(Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "添加的多形态蒙太奇不存在", ["Name", e]))
    }
    super.AddMontage(e, t, o)
  }
  GetMontageByName(t, o = !0, r = !1) {
    if (o && this.$Rc) {
      o = this.MorphComponent;
      if (o && o.IsMorphing()) {
        let e = o.GetMontageByName(t);
        return e = !e && r ? super.GetMontageByName(t) : e
      }
    }
    return super.GetMontageByName(t)
  }
  GetMontagePathByName(t, o = !0, r = !1) {
    if (o && this.$Rc) {
      o = this.MorphComponent;
      if (o && o.IsMorphing()) {
        let e = o.GetMontagePathByName(t);
        return e = !e && r ? super.GetMontagePathByName(t) : e
      }
    }
    return super.GetMontagePathByName(t)
  }
  SetHasMorphMontage(e) {
    this.$Rc = e
  }
};
CharacterMontageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(25)], CharacterMontageComponent), exports.CharacterMontageComponent = CharacterMontageComponent;
//# sourceMappingURL=CharacterMontageComponent.js.map