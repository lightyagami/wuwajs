"use strict";

var __decorate = this && this.__decorate || function (o, e, t, a) {
  var n;
  var r = arguments.length;
  var i = r < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, t) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(o, e, t, a);
  } else {
    for (var l = o.length - 1; l >= 0; l--) {
      if (n = o[l]) {
        i = (r < 3 ? n(i) : r > 3 ? n(e, t, i) : n(e, t)) || i;
      }
    }
  }
  if (r > 3 && i) {
    Object.defineProperty(e, t, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardDataComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchEvolveData_1 = require("../../Data/FloroRanchEvolveData");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityDataBaseComponent_1 = require("./FloroRanchEntityDataBaseComponent");
let FloroRanchCardDataComponent = class FloroRanchCardDataComponent extends FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent {
  constructor() {
    super(...arguments);
    this.CardData = undefined;
    this.EvolveData = undefined;
  }
  RefreshEntityData(o) {
    var e;
    if (o.h5n !== Protocol_1.Aki.Protocol.Nru.hxs) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchCardDataComponent刷新数据类型错误", ["EntityType", o.h5n]);
      }
    } else if ((e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()) !== undefined) {
      e = e.GetFloroRanchCardData(o.s5n);
      this.CardData = e;
      this.RefreshEvolveData(o.Obu);
    }
  }
  RefreshEvolveData(o) {
    if (this.EvolveData) {
      this.EvolveData.Refresh(o);
    } else if (o) {
      this.EvolveData = new FloroRanchEvolveData_1.FloroRanchEvolveData(o);
    }
  }
  EvolveDataValid() {
    return this.EvolveData !== undefined && this.EvolveData.IsValid;
  }
  Info() {
    return this.CardData.Id + ":" + this.CardData.Name;
  }
  DebugInfo() {
    return this.CardData.Id + ":" + this.CardData.Name;
  }
};
FloroRanchCardDataComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(1)], FloroRanchCardDataComponent);
exports.FloroRanchCardDataComponent = FloroRanchCardDataComponent; //# sourceMappingURL=FloroRanchCardDataComponent.js.map