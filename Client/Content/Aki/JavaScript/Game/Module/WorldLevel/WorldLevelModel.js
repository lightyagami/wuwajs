"use strict";

var __decorate = this && this.__decorate || function (e, r, t, o) {
  var l;
  var n = arguments.length;
  var i = n < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, r, t, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (l = e[s]) {
        i = (n < 3 ? l(i) : n > 3 ? l(r, t, i) : l(r, t)) || i;
      }
    }
  }
  if (n > 3 && i) {
    Object.defineProperty(r, t, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevelModel = undefined;
const Descriptors_1 = require("../../../Core/CrossDataSource/Descriptors");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
let WorldLevelModel = class WorldLevelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.OriginWorldLevelInner = 0;
    this.CurWorldLevelInner = 0;
    this.LastChangeWorldLevelTimeStamp = 0;
    this.SexInner = 0;
    this.WorldLevelChangeTarget = 0;
  }
  get WorldLevelMultilingualText() {
    return ConfigManager_1.ConfigManager.TextConfig.GetTextById("WorldLevel") ?? "";
  }
  get CurWorldLevel() {
    return this.CurWorldLevelInner;
  }
  set CurWorldLevel(e) {
    if (this.CurWorldLevelInner !== e) {
      this.CurWorldLevelInner = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CurWorldLevelChange);
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncWorldLevelChangeEvent);
    }
  }
  get OriginWorldLevel() {
    return this.OriginWorldLevelInner;
  }
  set OriginWorldLevel(e) {
    var r = e > this.OriginWorldLevelInner;
    this.OriginWorldLevelInner = e;
    if (r) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OriginWorldLevelUp);
      EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsSyncOriginWorldLevelUpEvent);
    }
  }
  get Sex() {
    return this.SexInner;
  }
  set Sex(e) {
    this.SexInner = e;
  }
  OnInit() {
    return !(this.LastChangeWorldLevelTimeStamp = 0);
  }
  OnClear() {
    return true;
  }
};
__decorate([(0, Descriptors_1.CSharpField)("OriginWorldLevelInner")], WorldLevelModel.prototype, "OriginWorldLevelInner", undefined);
__decorate([(0, Descriptors_1.CSharpField)("CurWorldLevelInner")], WorldLevelModel.prototype, "CurWorldLevelInner", undefined);
__decorate([(0, Descriptors_1.CSharpField)("LastChangeWorldLevelTimeStamp")], WorldLevelModel.prototype, "LastChangeWorldLevelTimeStamp", undefined);
__decorate([(0, Descriptors_1.CSharpField)("SexInner")], WorldLevelModel.prototype, "SexInner", undefined);
__decorate([(0, Descriptors_1.CSharpField)("WorldLevelChangeTarget")], WorldLevelModel.prototype, "WorldLevelChangeTarget", undefined);
WorldLevelModel = __decorate([(0, Descriptors_1.CSharpDataSingletonProxy)("", "WorldLevelModel")], WorldLevelModel);
exports.WorldLevelModel = WorldLevelModel; //# sourceMappingURL=WorldLevelModel.js.map