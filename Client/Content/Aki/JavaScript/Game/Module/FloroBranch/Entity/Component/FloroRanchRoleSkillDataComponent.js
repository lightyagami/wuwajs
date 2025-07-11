"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var a;
  var r = arguments.length;
  var l = r < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, o, t, n);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (a = e[i]) {
        l = (r < 3 ? a(l) : r > 3 ? a(o, t, l) : a(o, t)) || l;
      }
    }
  }
  if (r > 3 && l) {
    Object.defineProperty(o, t, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRoleSkillDataComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchComponentDefine_1 = require("../FloroRanchComponentDefine");
const FloroRanchEntityDataBaseComponent_1 = require("./FloroRanchEntityDataBaseComponent");
let FloroRanchRoleSkillDataComponent = class FloroRanchRoleSkillDataComponent extends FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent {
  constructor() {
    super(...arguments);
    this.SkillData = undefined;
    this.CanUseCount = 0;
    this.CurDayCanUseNum = 0;
  }
  RefreshEntityData(e) {
    var o;
    if (e.sku) {
      o = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      this.SkillData = o.GetFloroRanchSkillData(e.sku.r5n);
      this.CanUseCount = e.sku.oku;
      this.CurDayCanUseNum = e.sku.nku;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, this.constructor.name + " RefreshEntityData failed, Proto_SkillData is undefined");
    }
  }
  CanUseSkill() {
    return this.CanUseCount > 0 && this.CurDayCanUseNum > 0;
  }
  Info() {
    return `SkillId: ${this.SkillData.Id}, SkillName: ${this.SkillData.GetRealName()}`;
  }
  DebugInfo() {
    return this.SkillData.GetRealName();
  }
};
FloroRanchRoleSkillDataComponent = __decorate([(0, FloroRanchComponentDefine_1.RegisterFloroRanchEntityComponent)(4)], FloroRanchRoleSkillDataComponent);
exports.FloroRanchRoleSkillDataComponent = FloroRanchRoleSkillDataComponent; //# sourceMappingURL=FloroRanchRoleSkillDataComponent.js.map