"use strict";

var __decorate = this && this.__decorate || function (o, e, t, n) {
  var a;
  var r = arguments.length;
  var c = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    c = Reflect.decorate(o, e, t, n);
  } else {
    for (var l = o.length - 1; l >= 0; l--) {
      if (a = o[l]) {
        c = (r < 3 ? a(c) : r > 3 ? a(e, t, c) : a(e, t)) || c;
      }
    }
  }
  if (r > 3 && c) {
    Object.defineProperty(e, t, c);
  }
  return c;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchToyDataComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityDataBaseComponent_1 = require("./FloroRanchEntityDataBaseComponent");
let FloroRanchToyDataComponent = class FloroRanchToyDataComponent extends FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent {
  constructor() {
    super(...arguments);
    this.ToyData = undefined;
  }
  RefreshEntityData(o) {
    var e;
    if (o.h5n !== Protocol_1.Aki.Protocol.Nru.Ncu) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchToyDataComponent刷新数据类型错误", ["EntityType", o.h5n]);
      }
    } else if ((e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()) !== undefined) {
      e = e.GetFloroRanchToyData(o.s5n);
      this.ToyData = e;
    }
  }
  Info() {
    return "Name:" + this.ToyData.Name;
  }
  DebugInfo() {
    return this.ToyData.Id + ":" + this.ToyData.Name;
  }
};
FloroRanchToyDataComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(3)], FloroRanchToyDataComponent);
exports.FloroRanchToyDataComponent = FloroRanchToyDataComponent; //# sourceMappingURL=FloroRanchToyDataComponent.js.map