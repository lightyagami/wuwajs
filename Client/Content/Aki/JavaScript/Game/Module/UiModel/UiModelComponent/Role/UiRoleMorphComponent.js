"use strict";
var __decorate = this && this.__decorate || function(e, t, o, i) {
  var r, n = arguments.length,
    s = n < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, i);
  else
    for (var l = e.length - 1; 0 <= l; l--)(r = e[l]) && (s = (n < 3 ? r(s) : 3 < n ? r(t, o, s) : r(t, o)) || s);
  return 3 < n && s && Object.defineProperty(t, o, s), s
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiRoleMorphComponent = void 0;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelUtil_1 = require("../../UiModelUtil"),
  UiModelMorphComponent_1 = require("../Common/UiModelMorphComponent");
let UiRoleMorphComponent = class UiRoleMorphComponent extends UiModelMorphComponent_1.UiModelMorphComponent {
  constructor() {
    super(...arguments), this.pBr = void 0
  }
  OnStart() {
    super.OnStart(), this.pBr = this.Owner.CheckGetComponent(13)
  }
  OnEnd() {
    super.OnEnd(), this.pBr = void 0
  }
  PreloadMorphId() {
    this.MorphIdMap = UiModelUtil_1.UiModelUtil.GetRoleMorphConfigMap(this.pBr.RoleConfigId, this.pBr.RoleSkinId), this.IsEnableMorphInternal = 0 !== this.MorphIdMap?.size
  }
  GetAllMorphPathList() {
    if (this.PreloadMorphId(), this.MorphIdMap && 0 !== this.MorphIdMap.size) {
      var e = [];
      for (const t of this.MorphIdMap.values()) t.MainMeshPath && !StringUtils_1.StringUtils.IsEmpty(t.MainMeshPath) && e.push(t.MainMeshPath), t.AnimPath && !StringUtils_1.StringUtils.IsEmpty(t.AnimPath) && e.push(t.AnimPath), t.ChildMeshPathList && 0 < t.ChildMeshPathList.length && e.push(...t.ChildMeshPathList);
      return e
    }
  }
  GetSpecialMorphIdList() {
    var e = UiModelUtil_1.UiModelUtil.GetRoleMorphConfigMap(this.pBr.RoleConfigId, this.pBr.RoleSkinId);
    if (e && 0 !== e.size) {
      var t, o, i = [];
      for ([t, o] of e.entries()) 0 !== t && i.push(o);
      return i
    }
  }
};
UiRoleMorphComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(15)], UiRoleMorphComponent), exports.UiRoleMorphComponent = UiRoleMorphComponent;
//# sourceMappingURL=UiRoleMorphComponent.js.map