"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, o);
  } else {
    for (var _ = e.length - 1; _ >= 0; _--) {
      if (i = e[_]) {
        r = (s < 3 ? i(r) : s > 3 ? i(t, n, r) : i(t, n)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiDangoCollisionComponent = undefined;
const ue_1 = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const DANGO_COLLISION_SIZE = 35;
let UiDangoCollisionComponent = class UiDangoCollisionComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.UiModelActorComponent = undefined;
    this.CollisionComponent = undefined;
    this.Fwr = () => {
      this.SDc();
    };
  }
  OnInit() {
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  SDc() {
    this.CollisionComponent = this.UiModelActorComponent.Actor.AddComponentByClass(ue_1.BoxComponent.StaticClass(), true, this.UiModelActorComponent.Actor.GetTransform(), false);
    this.CollisionComponent.SetTickableWhenPaused(true);
    var e = DANGO_COLLISION_SIZE;
    this.CollisionComponent.SetBoxExtent(new ue_1.Vector(e, e, e), false);
    var t = this.UiModelActorComponent.Actor.D_K2_GetActorLocation();
    var n = this.UiModelActorComponent.Actor.GetActorScale3D().Z;
    t.Z += e * n;
    this.CollisionComponent.D_K2_SetWorldLocation(t, false, undefined, false);
    this.CollisionComponent.SetCollisionEnabled(1);
    this.CollisionComponent.SetCollisionObjectType(3);
    this.CollisionComponent.SetCollisionResponseToAllChannels(2);
    if (Info_1.Info.IsPlayInEditor) {
      ue_1.LGUIBPLibrary.AddInstanceComponent(this.UiModelActorComponent.Actor, this.CollisionComponent);
    }
  }
};
UiDangoCollisionComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(29)], UiDangoCollisionComponent);
exports.UiDangoCollisionComponent = UiDangoCollisionComponent; //# sourceMappingURL=UiDangoCollisionComponent.js.map