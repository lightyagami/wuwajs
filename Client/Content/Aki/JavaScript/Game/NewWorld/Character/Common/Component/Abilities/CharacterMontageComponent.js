"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var s = arguments.length;
  var i = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        i = (s < 3 ? n(i) : s > 3 ? n(t, o, i) : n(t, o)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterMontageComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const BaseMontageComponent_1 = require("./BaseMontageComponent");
let CharacterMontageComponent = class CharacterMontageComponent extends BaseMontageComponent_1.BaseMontageComponent {
  constructor() {
    super(...arguments);
    this.AnimationComponent = undefined;
    this.MorphComponent = undefined;
    this.$Rc = false;
  }
  OnStart() {
    this.AnimationComponent = this.Entity.CheckGetComponent(178);
    return !!super.OnStart();
  }
  GetMainAnimInstance() {
    return this.AnimationComponent.MainAnimInstance;
  }
  AddMontage(e, t, o) {
    if (this.$Rc) {
      this.MorphComponent = this.MorphComponent ?? this.Entity.GetComponent(282);
      var r = this.MorphComponent;
      if (r?.IsMorphMontage(o)) {
        if (t) {
          r.AddMontage(e, t, o);
          UE.KuroStaticLibrary.SetMontageANIndex(t);
          return;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 67, "添加的多形态蒙太奇不存在", ["Name", e]);
          }
          return;
        }
      }
    }
    super.AddMontage(e, t, o);
  }
  GetMontageByName(t, o = true, r = false) {
    if (o && this.$Rc) {
      o = this.MorphComponent;
      if (o && o.IsMorphing()) {
        let e = o.GetMontageByName(t);
        return e = !e && r ? super.GetMontageByName(t) : e;
      }
    }
    return super.GetMontageByName(t);
  }
  GetMontagePathByName(t, o = true, r = false) {
    if (o && this.$Rc) {
      o = this.MorphComponent;
      if (o && o.IsMorphing()) {
        let e = o.GetMontagePathByName(t);
        return e = !e && r ? super.GetMontagePathByName(t) : e;
      }
    }
    return super.GetMontagePathByName(t);
  }
  SetHasMorphMontage(e) {
    this.$Rc = e;
  }
};
CharacterMontageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(25)], CharacterMontageComponent);
exports.CharacterMontageComponent = CharacterMontageComponent; //# sourceMappingURL=CharacterMontageComponent.js.map