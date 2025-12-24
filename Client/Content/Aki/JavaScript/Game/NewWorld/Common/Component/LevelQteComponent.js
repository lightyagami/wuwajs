"use strict";

var LevelQteComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var l = arguments.length;
  var i = l < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, r);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        i = (l < 3 ? n(i) : l > 3 ? n(t, o, i) : n(t, o)) || i;
      }
    }
  }
  if (l > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelQteComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController");
const LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CommonQteController_1 = require("../../../Module/Qte/CommonQte/CommonQteController");
let LevelQteComponent = LevelQteComponent_1 = class LevelQteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.wxl = undefined;
    this.Bxl = undefined;
    this.$El = () => {
      let e = this.Bxl = undefined;
      let t = undefined;
      if (this.wxl?.Type === "SingleBtn" && (e = this.wxl.SuccessCallback.Actions, t = this.wxl.SuccessCallback.SendSelfEvent, e && LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(e, this.UUe()), t)) {
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(this.EIe.GetCreatureDataId(), t);
      }
    };
    this.bxl = () => {
      let e = this.Bxl = undefined;
      let t = undefined;
      if (this.wxl?.Type === "SingleBtn" && (e = this.wxl.FailureCallback.Actions, t = this.wxl.FailureCallback.SendSelfEvent, e && LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(e, this.UUe()), t)) {
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(this.EIe.GetCreatureDataId(), t);
      }
    };
  }
  OnInitData(e) {
    e = e.GetParam(LevelQteComponent_1)[0];
    this.wxl = e.QteConfig;
    this.EIe = this.Entity.GetComponent(0);
    return true;
  }
  OnEnd() {
    if (this.Bxl?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.Bxl.HandleId);
    }
    return true;
  }
  StartQte(e = false) {
    if (this.Bxl?.IsActive() && e) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.Bxl.HandleId);
    }
    if (this.wxl?.Type === "SingleBtn") {
      this.Bxl = ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(this.wxl.QteId, this.$El, this.bxl, 1);
      if (this.Bxl) {
        return true;
      }
    }
    return false;
  }
  StopQte() {
    if (this.Bxl?.IsActive()) {
      CommonQteController_1.CommonQteController.StopQte(this.Bxl.HandleId);
    }
  }
  IsQteActive() {
    return this.Bxl?.IsActive() ?? false;
  }
  UUe() {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
    e.ClientExecuteActions = true;
    return e;
  }
};
LevelQteComponent = LevelQteComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(292)], LevelQteComponent);
exports.LevelQteComponent = LevelQteComponent; //# sourceMappingURL=LevelQteComponent.js.map