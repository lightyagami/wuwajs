"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, i);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        s = (r < 3 ? o(s) : r > 3 ? o(t, n, s) : o(t, n)) || s;
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
exports.UiDangoMaterialChangeComponent = undefined;
const UE = require("ue");
const ue_1 = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const SELECT_MATERIAL_PATH = "/Game/Aki/Character/NPC/Tuanzi/HYtuanzi_jinxi/Model/MI_Tuanzi_Stroke_90001.MI_Tuanzi_Stroke_90001";
let UiDangoMaterialChangeComponent = class UiDangoMaterialChangeComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.UiModelActorComponent = undefined;
    this.MDc = undefined;
    this.EDc = new Map();
    this.IDc = [new UE.FName("OL_Hair"), new UE.FName("OL_Face"), new UE.FName("OL_Item")];
    this.Fwr = () => {
      this.TDc();
    };
  }
  OnInit() {
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
    ResourceSystem_1.ResourceSystem.LoadAsync(SELECT_MATERIAL_PATH, ue_1.MaterialInstance, e => {
      if (e && e.IsValid()) {
        this.MDc = e;
      }
    });
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  TDc() {
    this.EDc.clear();
    var e = this.UiModelActorComponent.MainMeshComponent;
    for (const i of this.IDc) {
      var t;
      var n = e.GetMaterialIndex(i);
      if (!(n < 0)) {
        if (t = e.GetMaterial(n)) {
          this.EDc.set(n, t);
        }
      }
    }
  }
  ReplaceSelectMaterial(e) {
    var t = this.UiModelActorComponent.CharRenderingComponent;
    if (e) {
      t.SetMaterialReplaceV2(this.MDc, 0, 3, 17);
    } else {
      t.RemoveExternalMaterialReplaceV2(0, 3, 17);
    }
  }
};
UiDangoMaterialChangeComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(30)], UiDangoMaterialChangeComponent);
exports.UiDangoMaterialChangeComponent = UiDangoMaterialChangeComponent; //# sourceMappingURL=UiDangoMaterialChangeComponent.js.map