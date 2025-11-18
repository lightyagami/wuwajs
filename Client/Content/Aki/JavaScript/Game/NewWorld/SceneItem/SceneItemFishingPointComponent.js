"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, i);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, n, r) : s(t, n)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemFishingPointComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
let SceneItemFishingPointComponent = class SceneItemFishingPointComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.FP_ = undefined;
    this._H_ = e => {
      this.FP_?.EnableHeadInfo(e);
    };
  }
  OnStart() {
    var e;
    this.EIe = this.Entity.GetComponent(0);
    this.FP_ = this.Entity.GetComponent(82);
    if (this.EIe.GetBaseInfo()?.Category?.FishingMechanismType !== "FishingPoint") {
      this.gn_(true);
    } else {
      e = this.EIe.GetPbDataId();
      if (e = ModelManager_1.ModelManager.FishingModel.GetFishingPointDataByPbEntityId(e)) {
        this.gn_(e.CurrentCount > 0);
      } else {
        this.gn_(false);
      }
    }
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.DriveFishingShipStateChanged, this._H_)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this._H_);
    }
    return true;
  }
  RefreshFishingPoint(e) {
    this.gn_(e.CurrentCount > 0);
  }
  gn_(e) {
    if (e) {
      this.Entity.EnableByKey(3);
      e = ModelManager_1.ModelManager.FishingModel.GetShipData().IsShipDriving();
      this._H_(e);
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.DriveFishingShipStateChanged, this._H_)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this._H_);
      }
    } else {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.DriveFishingShipStateChanged, this._H_)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this._H_);
      }
      this.Entity.DisableByKey(3);
      this._H_(false);
    }
  }
};
SceneItemFishingPointComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(281)], SceneItemFishingPointComponent);
exports.SceneItemFishingPointComponent = SceneItemFishingPointComponent; //# sourceMappingURL=SceneItemFishingPointComponent.js.map