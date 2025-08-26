"use strict";

var __decorate = this && this.__decorate || function (e, o, n, t) {
  var r;
  var a = arguments.length;
  var c = a < 3 ? o : t === null ? t = Object.getOwnPropertyDescriptor(o, n) : t;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    c = Reflect.decorate(e, o, n, t);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (r = e[i]) {
        c = (a < 3 ? r(c) : a > 3 ? r(o, n, c) : r(o, n)) || c;
      }
    }
  }
  if (a > 3 && c) {
    Object.defineProperty(o, n, c);
  }
  return c;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTerrainDataComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityDataBaseComponent_1 = require("./FloroRanchEntityDataBaseComponent");
let FloroRanchTerrainDataComponent = class FloroRanchTerrainDataComponent extends FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent {
  constructor() {
    super(...arguments);
    this.TerrainData = undefined;
  }
  RefreshEntityData(e) {
    if (e.h5n !== Protocol_1.Aki.Protocol.dou.Proto_Terrain) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchTerrainDataComponent刷新数据类型错误", ["EntityType", e.h5n]);
      }
    } else {
      e = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchTerrain(e.s5n);
      this.TerrainData = e;
    }
  }
  Info() {
    return "Name:" + this.TerrainData.Name;
  }
  DebugInfo() {
    return "" + this.TerrainData.Name;
  }
};
FloroRanchTerrainDataComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(2)], FloroRanchTerrainDataComponent);
exports.FloroRanchTerrainDataComponent = FloroRanchTerrainDataComponent; //# sourceMappingURL=FloroRanchTerrainDataComponent.js.map