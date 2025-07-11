"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var r;
  var i = arguments.length;
  var l = i < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, o, t, n);
  } else {
    for (var p = e.length - 1; p >= 0; p--) {
      if (r = e[p]) {
        l = (i < 3 ? r(l) : i > 3 ? r(o, t, l) : r(o, t)) || l;
      }
    }
  }
  if (i > 3 && l) {
    Object.defineProperty(o, t, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingBoatInputComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine");
const PhotographController_1 = require("../../../Module/Photograph/PhotographController");
const GongduolaInputComponent_1 = require("../Gongduola/GongduolaInputComponent");
let FishingBoatInputComponent = class FishingBoatInputComponent extends GongduolaInputComponent_1.GongduolaInputComponent {
  ExecuteSprint(e) {}
  ExecuteSkill(e) {
    this.WZo(e.IntValue);
  }
  WZo(e) {
    if (e === 210012) {
      PhotographController_1.PhotographController.PhotographFastScreenShot();
    } else {
      this.Entity.GetComponent(39).BeginSkill(e, {
        Reason: "FishingBoatInputComponent.ExecuteSkill"
      });
    }
  }
  ExecuteSkillWithConfirmBox(e, o, t) {
    o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
    if (t > 0) {
      o.ItemIdMap.set(t, 1);
    }
    o.FunctionMap.set(2, () => {
      this.WZo(e);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
  }
};
FishingBoatInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(247)], FishingBoatInputComponent);
exports.FishingBoatInputComponent = FishingBoatInputComponent; //# sourceMappingURL=FishingBoatInputComponent.js.map