"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var r;
  var s = arguments.length;
  var i = s < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, o, t, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        i = (s < 3 ? r(i) : s > 3 ? r(o, t, i) : r(o, t)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(o, t, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbFloorComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const RbBaseComponent_1 = require("./RbBaseComponent");
let RbFloorComponent = class RbFloorComponent extends RbBaseComponent_1.RbBaseComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    if (!this.EIe) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RbItemComp] CreatureDataComp is null");
      }
      return false;
    }
    var e = this.EIe?.RbFloorInfo?.Zmf;
    if (e) {
      for (const o of e) {
        this.OccupiedCellIndex.push(new SceneItemJigsawBaseComponent_1.JigsawIndex(o.iPs, o.rPs));
      }
    }
    return true;
  }
};
RbFloorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(332)], RbFloorComponent);
exports.RbFloorComponent = RbFloorComponent; //# sourceMappingURL=RbFloorComponent.js.map