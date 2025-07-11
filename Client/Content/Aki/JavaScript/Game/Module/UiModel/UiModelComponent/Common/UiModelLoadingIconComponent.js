"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var d = e.length - 1; d >= 0; d--) {
      if (n = e[d]) {
        r = (s < 3 ? n(r) : s > 3 ? n(t, i, r) : n(t, i)) || r;
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
exports.UiModelLoadingIconComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelLoadingIconComponent = class UiModelLoadingIconComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.UiModelActorComponent = undefined;
    this.UiModelDataComponent = undefined;
    this.LoadingItem = undefined;
    this.eBr = () => {
      this.NeedTick = true;
      this.Fjs();
      this.LoadingItem.SetLoadingActive(true);
    };
    this.Fwr = () => {
      this.NeedTick = false;
      this.LoadingItem.SetLoadingActive(false);
    };
  }
  OnInit() {
    this.LoadingItem = new RoleModelLoadingItem_1.RoleModelLoadingItem();
    this.LoadingItem.CreateByResourceIdAsync("UiItem_Loading_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop));
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.eBr);
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  OnTick(e) {
    this.Fjs();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.BeforeUiModelLoadStart, this.eBr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
    this.LoadingItem.Destroy();
  }
  SetLoadingOpen(e) {
    this.LoadingItem.SetLoadingOpen(e);
  }
  SetLoadingActive(e) {
    this.LoadingItem.SetLoadingActive(e);
  }
  Fjs() {
    var e;
    if (this.UiModelDataComponent?.GetLoadingIconFollowState() && this.UiModelActorComponent) {
      e = UiModelUtil_1.UiModelUtil.GetActorLguiPos(this.UiModelActorComponent.GetActor());
      this.LoadingItem.SetIconPosition(e);
    }
  }
};
UiModelLoadingIconComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(3)], UiModelLoadingIconComponent);
exports.UiModelLoadingIconComponent = UiModelLoadingIconComponent; //# sourceMappingURL=UiModelLoadingIconComponent.js.map