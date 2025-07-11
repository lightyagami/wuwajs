"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        r = (s < 3 ? o(r) : s > 3 ? o(t, i, r) : o(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleEyeHighLightComponent = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleEyeHighLightComponent = class UiRoleEyeHighLightComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.OnRoleMeshLoadComplete = () => {
      this.DisableEyeHighLight();
    };
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnRoleMeshLoadComplete);
  }
  DisableEyeHighLight() {
    var e = [new UE.FName("MI_Eyes"), new UE.FName("MI_Eye")];
    var t = new UE.FName("LightDisableSwitch");
    var i = this.n$t.MainMeshComponent;
    this.cBr(i, e, t);
  }
  cBr(e, t, i) {
    for (const s of t) {
      var n;
      var o = e.GetMaterialIndex(s);
      if (!(o < 0)) {
        n = e.GetMaterial(o);
        e.CreateDynamicMaterialInstance(o, n)?.SetScalarParameterValue(i, 0);
      }
    }
  }
};
UiRoleEyeHighLightComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(19)], UiRoleEyeHighLightComponent);
exports.UiRoleEyeHighLightComponent = UiRoleEyeHighLightComponent; //# sourceMappingURL=UiRoleEyeHighLightComponent.js.map