"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var s;
  var n = arguments.length;
  var r = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (n < 3 ? s(r) : n > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiDangoOddsComponent = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const RacingBetsOddsItem_1 = require("../../../RacingBets/View/Item/RacingBetsOddsItem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDangoOddsComponent = class UiDangoOddsComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.UiModelActorComponent = undefined;
    this.UiModelDataComponent = undefined;
    this.UiOddsItem = undefined;
    this.bDc = Vector_1.Vector.Create(0, 0, 120);
    this.xzi = Vector_1.Vector.Create(0, 0, 120);
    this.Fwr = () => {
      this.Fjs();
    };
  }
  OnInit() {
    this.UiOddsItem = new RacingBetsOddsItem_1.RacingBetsOddsItem();
    this.UiOddsItem.CreateByResourceIdAsync("UiItem_RoleBetNum", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop));
    this.NeedTick = true;
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
  }
  OnTick(e) {
    this.Fjs();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelLoadComplete, this.Fwr);
    this.UiOddsItem.Destroy();
  }
  Fjs() {
    var e;
    var t;
    if (this.UiModelActorComponent) {
      e = this.UiModelActorComponent.GetActor();
      t = this.UiModelActorComponent.Actor.GetActorScale3D().Z;
      this.bDc.Multiply(t, this.xzi);
      t = UiModelUtil_1.UiModelUtil.GetActorLguiPos(e, this.xzi);
      this.UiOddsItem.SetItemOffset(t);
    }
  }
  SetOffset(e) {
    this.bDc.Z = e;
  }
  Refresh(e, t, i) {
    this.UiOddsItem.RefreshUi(e, t, i);
  }
  SetVisible(e) {
    this.UiOddsItem.SetVisible(e);
  }
};
UiDangoOddsComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(26)], UiDangoOddsComponent);
exports.UiDangoOddsComponent = UiDangoOddsComponent; //# sourceMappingURL=UiDangoOddsComponent.js.map