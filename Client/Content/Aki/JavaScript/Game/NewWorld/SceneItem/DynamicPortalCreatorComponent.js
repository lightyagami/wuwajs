"use strict";

var DynamicPortalCreatorComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, i) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        s = (n < 3 ? r(s) : n > 3 ? r(e, o, s) : r(e, o)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicPortalCreatorComponent = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
let DynamicPortalCreatorComponent = DynamicPortalCreatorComponent_1 = class DynamicPortalCreatorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Lo = undefined;
    this.Xln = undefined;
    this.jla = [];
    this.Wla = undefined;
    this.Qla = t => {
      t = t.BulletId;
      return this.jla.includes(t);
    };
    this.Kla = t => {
      var e = Protocol_1.Aki.Protocol.Jha.create();
      e.F4n = MathUtils_1.MathUtils.NumberToLong(this.EIe.GetCreatureDataId());
      e.Mjn = t.BulletId;
      e.ila = true;
      Net_1.Net.Call(24103, e, t => {
        switch (t?.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrPortalCreatorActive:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 16316);
        }
      });
    };
  }
  OnInitData(t) {
    t = t.GetParam(DynamicPortalCreatorComponent_1)[0];
    this.Lo = t;
    if (this.Lo.Model.Type === "Bullet") {
      this.Wla = this.Lo.Model;
      this.jla.push(this.Wla.TypeA.BulletId);
      this.jla.push(this.Wla.TypeB.BulletId);
    }
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    if (this.Lo.Model.Type === "Bullet") {
      this.Xln = this.Entity.GetComponent(155);
    }
    return true;
  }
  OnActivate() {
    if (this.Lo.Model.Type === "Bullet") {
      this.$la();
    }
  }
  OnEnd() {
    if (this.Lo.Model.Type === "Bullet") {
      this.Xla();
    }
    return true;
  }
  GetPortalRenderConfig() {
    return this.Lo?.Model.RenderConfig;
  }
  $la() {
    if (this.Xln !== undefined) {
      this.Xln.AddComponentHitCondition(this, this.Qla);
      EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Kla);
    }
  }
  Xla() {
    if (this.Xln !== undefined && (this.Xln.RemoveComponentHitCondition(this, this.Qla), EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Kla))) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Kla);
    }
  }
};
DynamicPortalCreatorComponent = DynamicPortalCreatorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(229)], DynamicPortalCreatorComponent);
exports.DynamicPortalCreatorComponent = DynamicPortalCreatorComponent; //# sourceMappingURL=DynamicPortalCreatorComponent.js.map