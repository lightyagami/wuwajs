"use strict";

var __decorate = this && this.__decorate || function (t, e, o, n) {
  var r;
  var c = arguments.length;
  var i = c < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(t, e, o, n);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (r = t[s]) {
        i = (c < 3 ? r(i) : c > 3 ? r(e, o, i) : r(e, o)) || i;
      }
    }
  }
  if (c > 3 && i) {
    Object.defineProperty(e, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPartScanComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
let CharacterPartScanComponent = class CharacterPartScanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ljr = undefined;
    this.n$t = undefined;
    this._jr = undefined;
  }
  OnInit() {
    this.ljr = this.Entity.GetComponent(74);
    this.n$t = this.Entity.GetComponent(3);
    this._jr = this.n$t.Actor.CharRenderingComponent;
    return true;
  }
  ShowScanEffect() {
    if (this.ljr.IsMultiPart) {
      for (const e of this.ljr.Parts) {
        var t;
        if (e?.ScanEffect && e?.ScanEffect !== "None" && (t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.GameInstance, new UE.TransformDouble(), e.ScanEffect, "[CharacterPartScanComponent.ShowScanEffect]", new EffectContext_1.EffectContext(this.Entity.Id)), EffectSystem_1.EffectSystem.IsValid(t)) && (t = EffectSystem_1.EffectSystem.GetEffectActor(t))?.IsValid()) {
          t.K2_AttachToComponent(this.n$t.Actor.Mesh, e.ScanEffectSocketName, 0, 0, 0, false);
        }
        if (e.ScanMaterialEffect && this._jr && this._jr.CheckInit()) {
          this._jr.AddMaterialControllerData(e.ScanMaterialEffect);
        }
      }
    }
  }
};
CharacterPartScanComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(75)], CharacterPartScanComponent);
exports.CharacterPartScanComponent = CharacterPartScanComponent; //# sourceMappingURL=CharacterPartScanComponent.js.map