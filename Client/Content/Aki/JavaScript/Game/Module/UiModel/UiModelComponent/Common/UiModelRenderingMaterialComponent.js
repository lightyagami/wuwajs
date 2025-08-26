"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var n;
  var r = arguments.length;
  var o = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, s);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        o = (r < 3 ? n(o) : r > 3 ? n(t, i, o) : n(t, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelRenderingMaterialComponent = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRenderingMaterialComponent = class UiModelRenderingMaterialComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ActorComponent = undefined;
    this.UiModelDataComponent = undefined;
    this.tBr = new Map();
    this.iBr = 0;
    this.oBr = new Set();
    this.OnModelLoadComplete = () => {
      this.m8();
    };
  }
  get rKt() {
    return this.iBr++;
  }
  OnInit() {
    this.ActorComponent = this.Owner.CheckGetComponent(1);
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnModelLoadComplete);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.OnModelLoadComplete);
    for (const t of this.tBr.values()) {
      var e = t.HandleId;
      if (e && e !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
      }
    }
    this.tBr.clear();
    this.ActorComponent.CharRenderingComponent?.ResetAllRenderingState();
  }
  SetRenderingMaterial(e) {
    var t = this.rKt;
    var e = {
      EffectId: e,
      HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
      RenderingId: ResourceSystem_1.ResourceSystem.InvalidId
    };
    this.tBr.set(t, e);
    this.oBr.add(t);
    this.m8();
    return t;
  }
  AddRenderingMaterialByData(e) {
    var t = this.rKt;
    var e = {
      MaterialAssetData: e,
      HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
      RenderingId: ResourceSystem_1.ResourceSystem.InvalidId
    };
    this.tBr.set(t, e);
    this.oBr.add(t);
    this.m8();
    return t;
  }
  AddRenderingMaterialWithAnimObject(e, t) {
    var i = this.rKt;
    var e = {
      MaterialAssetData: e,
      HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
      RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
      WithAnimObject: true,
      AnimMeshComp: t
    };
    this.tBr.set(i, e);
    this.oBr.add(i);
    this.m8();
    return i;
  }
  m8() {
    if (this.UiModelDataComponent?.GetModelLoadState() === 2) {
      for (const e of this.oBr) {
        this.rBr(e);
      }
      this.oBr.clear();
    }
  }
  rBr(e) {
    const t = this.tBr.get(e);
    const i = this.ActorComponent.CharRenderingComponent;
    if (t.EffectId) {
      e = EffectUtil_1.EffectUtil.GetEffectPath(t.EffectId);
      t.HandleId = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Object, e => {
        t.RenderingId = i.AddMaterialControllerData(e);
      });
    }
    if (t.MaterialAssetData) {
      if (t.WithAnimObject) {
        t.RenderingId = i.AddMaterialControllerDataWithAnimObject(t.MaterialAssetData, t.AnimMeshComp, undefined);
      } else {
        t.RenderingId = i.AddMaterialControllerData(t.MaterialAssetData);
      }
    }
  }
  RemoveRenderingMaterial(e) {
    var t;
    var i = this.tBr.get(e);
    if (i) {
      if ((t = i.HandleId) && t !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
      }
      if ((t = i.RenderingId) && t !== ResourceSystem_1.ResourceSystem.InvalidId) {
        this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerData(t);
      }
      this.tBr.delete(e);
    }
  }
  RemoveRenderingMaterialWithEnding(e) {
    var t;
    var i = this.tBr.get(e);
    if (i) {
      if ((t = i.HandleId) && t !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
      }
      if ((t = i.RenderingId) && t !== ResourceSystem_1.ResourceSystem.InvalidId) {
        this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(t);
      }
      this.tBr.delete(e);
    }
  }
};
UiModelRenderingMaterialComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(5)], UiModelRenderingMaterialComponent);
exports.UiModelRenderingMaterialComponent = UiModelRenderingMaterialComponent; //# sourceMappingURL=UiModelRenderingMaterialComponent.js.map