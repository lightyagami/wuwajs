"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var r;
  var n = arguments.length;
  var s = n < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, i);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (r = e[l]) {
        s = (n < 3 ? r(s) : n > 3 ? r(t, o, s) : r(t, o)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiRoleMorphComponent = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelMorphComponent_1 = require("../Common/UiModelMorphComponent");
let UiRoleMorphComponent = class UiRoleMorphComponent extends UiModelMorphComponent_1.UiModelMorphComponent {
  constructor() {
    super(...arguments);
    this.pBr = undefined;
  }
  OnStart() {
    super.OnStart();
    this.pBr = this.Owner.CheckGetComponent(13);
  }
  OnEnd() {
    super.OnEnd();
    this.pBr = undefined;
  }
  PreloadMorphId() {
    this.MorphIdMap = UiModelUtil_1.UiModelUtil.GetRoleMorphConfigMap(this.pBr.RoleConfigId, this.pBr.RoleSkinId);
    this.IsEnableMorphInternal = this.MorphIdMap?.size !== 0;
  }
  GetAllMorphPathList() {
    this.PreloadMorphId();
    if (this.MorphIdMap && this.MorphIdMap.size !== 0) {
      var e = [];
      for (const t of this.MorphIdMap.values()) {
        if (t.MainMeshPath && !StringUtils_1.StringUtils.IsEmpty(t.MainMeshPath)) {
          e.push(t.MainMeshPath);
        }
        if (t.AnimPath && !StringUtils_1.StringUtils.IsEmpty(t.AnimPath)) {
          e.push(t.AnimPath);
        }
        if (t.ChildMeshPathList && t.ChildMeshPathList.length > 0) {
          e.push(...t.ChildMeshPathList);
        }
      }
      return e;
    }
  }
  GetSpecialMorphIdList() {
    var e = UiModelUtil_1.UiModelUtil.GetRoleMorphConfigMap(this.pBr.RoleConfigId, this.pBr.RoleSkinId);
    if (e && e.size !== 0) {
      var t;
      var o;
      var i = [];
      for ([t, o] of e.entries()) {
        if (t !== 0) {
          i.push(o);
        }
      }
      return i;
    }
  }
};
UiRoleMorphComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(15)], UiRoleMorphComponent);
exports.UiRoleMorphComponent = UiRoleMorphComponent; //# sourceMappingURL=UiRoleMorphComponent.js.map