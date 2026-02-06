"use strict";

var TriggerComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var i = arguments.length;
  var s = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const RangeComponentMessageManager_1 = require("../RangeComponentMessageManager");
let TriggerComponent = TriggerComponent_1 = class TriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.vtn = undefined;
    this.Lo = undefined;
    this.HYo = 0;
    this.ful = (e, t, o, n) => {
      if (n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNotOpen || n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNoPermission || n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractMultiGameMode) {
        LevelGamePlayController_1.LevelGamePlayController.ShowFakeErrorCodeTips();
      }
    };
  }
  get Actions() {
    if (this.Lo?.ClientPrePerformance) {
      return this.Lo?.Actions.filter(e => e.Name !== "PlayEffect");
    } else {
      return this.Lo?.Actions;
    }
  }
  get ExitActions() {
    if (this.Lo?.ClientPrePerformance) {
      return this.Lo?.ExitConfig?.Actions.filter(e => e.Name !== "PlayEffect");
    } else {
      return this.Lo?.ExitConfig?.Actions;
    }
  }
  OnInitData(e) {
    var e = e.GetParam(TriggerComponent_1)[0];
    var e = e || undefined;
    var t = this.Entity.GetComponent(132);
    if (t && !t.LogicRange) {
      t.SetLogicRange(300);
    }
    this.Lo = e;
    this.EIe = this.Entity.GetComponent(0);
    this.HYo = this.EIe.GetPbDataId();
    return true;
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(91);
    if (this.vtn) {
      if (this.Lo?.OnlineDisableTip && !RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.HasMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trigger, this.ful)) {
        RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.RegisterMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trigger, this.ful);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[TriggerComponent] RangeComp缺失", ["ConfigId", this.HYo]);
      }
      return false;
    }
  }
  OnEnd() {
    this.Lo = undefined;
    if (RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.HasMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trigger, this.ful)) {
      RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.UnRegisterMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trigger, this.ful);
    }
    return true;
  }
  CreateTriggerContext(e) {
    return LevelGeneralContextDefine_1.TriggerContext.Create(this.Entity.Id, e);
  }
};
TriggerComponent = TriggerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(92)], TriggerComponent);
exports.TriggerComponent = TriggerComponent; //# sourceMappingURL=TriggerComponent.js.map