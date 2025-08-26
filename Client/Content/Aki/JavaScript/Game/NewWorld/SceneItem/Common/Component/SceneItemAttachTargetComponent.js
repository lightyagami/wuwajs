"use strict";

var SceneItemAttachTargetComponent_1;
var __decorate = this && this.__decorate || function (t, e, n, i) {
  var a;
  var s = arguments.length;
  var o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, n, i);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (a = t[c]) {
        o = (s < 3 ? a(o) : s > 3 ? a(e, n, o) : a(e, n)) || o;
      }
    }
  }
  if (s > 3 && o) {
    Object.defineProperty(e, n, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAttachTargetComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const SceneItemDynamicAttachTargetComponent_1 = require("./SceneItemDynamicAttachTargetComponent");
let SceneItemAttachTargetComponent = SceneItemAttachTargetComponent_1 = class SceneItemAttachTargetComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.EIe = undefined;
    this.oln = undefined;
    this.rln = undefined;
    this.nln = undefined;
    this.Iln = undefined;
    this.zOc = undefined;
  }
  static get Dependencies() {
    return [203, 0];
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemAttachTargetComponent_1)[0];
    this.Lo = t;
    this.EIe = this.Entity.GetComponent(0);
    if (this.Lo?.AttachTarget) {
      this.Iln = new SceneItemDynamicAttachTargetComponent_1.AttachParam();
      switch (this.Lo.PosRule) {
        case "Absolute":
          this.Iln.PosAbsolute = true;
          this.Iln.PosAttachType = 1;
          break;
        case "AlignTarget":
          this.Iln.PosAbsolute = false;
          this.Iln.PosAttachType = 2;
          break;
        default:
          this.Iln.PosAbsolute = false;
          this.Iln.PosAttachType = 3;
      }
      switch (this.Lo.RotRule) {
        case "Absolute":
          this.Iln.RotAbsolute = true;
          this.Iln.RotAttachType = 1;
          break;
        case "AlignTarget":
          this.Iln.RotAbsolute = false;
          this.Iln.RotAttachType = 2;
          break;
        default:
          this.Iln.RotAbsolute = false;
          this.Iln.RotAttachType = 3;
      }
      switch (this.Lo.AttachTarget?.Type) {
        case "Entity":
          this.oln = this.Lo.AttachTarget.EntityId;
          this.rln = this.Lo.AttachTarget.AttachPoint;
          break;
        case "Actor":
          var e = this.Lo.AttachTarget.ActorRef.PathName.split(".");
          if (e.length < 3) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 39, "[SceneItemAttachTargetComponent] Invalid ActorRefConfig", ["PbDataId:", this.EIe?.GetPbDataId()]);
            }
            return false;
          }
          this.nln = e[1] + "." + e[2];
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[SceneItemAttachTargetComponent]附加目标配置无效，请联系对应策划检查配置", ["PbDataId:", this.EIe?.GetPbDataId()]);
    }
    return true;
  }
  OnStart() {
    this.zOc = this.Entity.GetComponent(126);
    return !!this.zOc || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 7, "[SceneItemAttachTargetComponent] Invalid DynamicAttachComp", ["PbDataId:", this.EIe?.GetPbDataId()]), false);
  }
  OnActivate() {
    this.fln();
  }
  OnEnd() {
    this.pln();
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    return true;
  }
  fln() {
    switch (this.Lo?.AttachTarget?.Type) {
      case "Entity":
        this.zOc.RegEntityTarget(this.oln, this.rln, this.Iln, "[SceneItemAttachTargetComponent] HandleTargetAttach");
        break;
      case "Actor":
        this.zOc.RegRefActorTarget(this.nln, this.Iln, "[SceneItemAttachTargetComponent] HandleTargetAttach");
    }
  }
  pln() {
    switch (this.Lo?.AttachTarget?.Type) {
      case "Entity":
      case "Actor":
        this.zOc.UnRegTarget("[SceneItemAttachTargetComponent] HandleTargetDetach");
    }
  }
};
SceneItemAttachTargetComponent = SceneItemAttachTargetComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(125)], SceneItemAttachTargetComponent);
exports.SceneItemAttachTargetComponent = SceneItemAttachTargetComponent; //# sourceMappingURL=SceneItemAttachTargetComponent.js.map