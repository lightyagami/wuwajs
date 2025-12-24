"use strict";

var __decorate = this && this.__decorate || function (o, t, e, r) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(o, t, e, r);
  } else {
    for (var c = o.length - 1; c >= 0; c--) {
      if (i = o[c]) {
        s = (n < 3 ? i(s) : n > 3 ? i(t, e, s) : i(t, e)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, e, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleOutlookComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MotorStickerById_1 = require("../../../../Core/Define/ConfigQuery/MotorStickerById");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
class StickerParams {
  constructor(o, t = 0) {
    this.StickerId = 0;
    this.PdHandle = 0;
    this.StickerId = o;
    this.PdHandle = t;
  }
}
let MotorcycleOutlookComponent = class MotorcycleOutlookComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.CurrentStickers = new Array();
    this.CharRenderComp = undefined;
  }
  OnStart() {
    var o = this.Entity.GetComponent(247);
    if (o) {
      this.CharRenderComp = o.Actor.CharRenderingComponent;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Motor", 6, "EquipMotor OnStart");
      }
      this.EquipMotor(o.CreatureData.MotorOutlookInfo);
    }
    return true;
  }
  EquipMotor(t) {
    if (t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Motor", 6, "EquipMotor Sticker", ["length", t.S0f.length]);
      }
      for (let o = 0; o < t.S0f.length; ++o) {
        if (this.CurrentStickers.length <= o) {
          this.CurrentStickers.push(new StickerParams(0));
        }
        var e;
        var r;
        var i = this.CurrentStickers[o];
        var n = t.S0f[o];
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Motor", 6, "EquipMotor Sticker", ["Index", o], ["From", i.StickerId], ["To", n]);
        }
        if (i.StickerId !== n && (i.PdHandle && (this.CharRenderComp?.RemoveMaterialControllerData(i.PdHandle), i.PdHandle = 0), i.StickerId = n)) {
          if ((e = MotorStickerById_1.configMotorStickerById.GetConfig(n))?.MaterialDA) {
            if (r = ResourceSystem_1.ResourceSystem.Load(e.MaterialDA, UE.PD_CharacterControllerData_C)) {
              i.PdHandle = this.CharRenderComp?.AddMaterialControllerData(r) ?? 0;
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Motor", 6, "Motor CharCtrl not found.", ["Path", e?.MaterialDA]);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 6, "Motor stickerId not found.", ["Id", n]);
          }
        }
      }
      for (let o = t.S0f.length; o < this.CurrentStickers.length; ++o) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Motor", 6, "EquipMotor Clear", ["Index", o]);
        }
        var s = this.CurrentStickers[o];
        if (s.PdHandle) {
          this.CharRenderComp?.RemoveMaterialControllerData(s.PdHandle);
          s.PdHandle = 0;
        }
        s.StickerId = 0;
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Motor", 6, "EquipMotor Clear All");
      }
      for (const o of this.CurrentStickers) {
        if (o.PdHandle) {
          this.CharRenderComp?.RemoveMaterialControllerData(o.PdHandle);
          o.PdHandle = 0;
        }
        o.StickerId = 0;
      }
    }
    return true;
  }
};
MotorcycleOutlookComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(269)], MotorcycleOutlookComponent);
exports.MotorcycleOutlookComponent = MotorcycleOutlookComponent; //# sourceMappingURL=MotorcycleOutlookComponent.js.map