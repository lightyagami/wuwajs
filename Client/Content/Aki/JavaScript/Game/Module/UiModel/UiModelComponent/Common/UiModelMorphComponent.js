"use strict";
var __decorate = this && this.__decorate || function(e, o, t, i) {
  var s, r = arguments.length,
    h = r < 3 ? o : null === i ? i = Object.getOwnPropertyDescriptor(o, t) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) h = Reflect.decorate(e, o, t, i);
  else
    for (var n = e.length - 1; 0 <= n; n--)(s = e[n]) && (h = (r < 3 ? s(h) : 3 < r ? s(o, t, h) : s(o, t)) || h);
  return 3 < r && h && Object.defineProperty(o, t, h), h
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UiModelMorphComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelMorphComponent = class UiModelMorphComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments), this.MorphType = 0, this.IsEnableMorphInternal = !1, this.MorphDataMap = void 0, this.MorphIdMap = void 0, this.UiModelDataComponent = void 0, this.UiModelActorComponent = void 0
  }
  OnStart() {
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0), this.UiModelActorComponent = this.Owner.CheckGetComponent(1)
  }
  OnEnd() {
    this.MorphType = 0, this.MorphDataMap = void 0, this.MorphIdMap = void 0, this.UiModelDataComponent = void 0, this.UiModelActorComponent = void 0, this.IsEnableMorphInternal = !1
  }
  GetMorphType() {
    return this.MorphType
  }
  SetMorphType(e) {
    var o;
    return this.IsEnableMorphInternal ? this.MorphType === e ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiModelMorph", 78, "当前形态与目标形态相同", ["morphType", e], ["this.MorphType", this.MorphType]), !1) : (this.MorphType = e, !!this.MorphDataMap && ((o = this.MorphDataMap?.get(e)) ? (this.UiModelActorComponent?.ChangeMesh(o.MainSkeletalMesh, o.AnimClass, o.ChildSkeletalMesh), EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetMorphTypeComplete), !0) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiModelMorph", 78, "[UiModelMorphComponent]初始化获取morphData有误", ["MorphType", e]), !1))) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiModelMorph", 78, "该角色不支持多形态", ["roleId", this.UiModelDataComponent.ModelConfigId]), !1)
  }
  GetCurrentMorphData() {
    return this.MorphDataMap?.get(this.MorphType)
  }
  PreloadMorphId() {
    this.MorphIdMap = void 0, this.IsEnableMorphInternal = !1
  }
  PreloadMorphData() {
    if (this.PreloadMorphId(), this.MorphIdMap) {
      this.MorphDataMap && (this.MorphDataMap.clear(), this.MorphDataMap = void 0);
      var o, t, i = new Map;
      for ([o, t] of this.MorphIdMap.entries())
        if (void 0 !== t.MainMeshPath && !StringUtils_1.StringUtils.IsEmpty(t.MainMeshPath) && void 0 !== t.AnimPath && !StringUtils_1.StringUtils.IsEmpty(t.AnimPath)) {
          var s = t.MainMeshPath,
            r = t.AnimPath,
            h = t.ChildMeshPathList,
            n = ResourceSystem_1.ResourceSystem.GetLoadedAsset(s, UE.SkeletalMesh),
            s = (n || Log_1.Log.CheckError() && Log_1.Log.Error("UiModelMorph", 78, "[UiRoleMorphComponent]获取mainMesh失败", ["MainMeshPath", s]), ResourceSystem_1.ResourceSystem.GetLoadedAsset(r, UE.Class));
          s || Log_1.Log.CheckError() && Log_1.Log.Error("UiModelMorph", 78, "[UiRoleMorphComponent]获取animClass失败", ["AnimClassPath", r]);
          let e = void 0;
          if (h) {
            e = [];
            for (const p of h) {
              var l = ResourceSystem_1.ResourceSystem.GetLoadedAsset(p, UE.SkeletalMesh);
              l ? e.push(l) : Log_1.Log.CheckError() && Log_1.Log.Error("UiModelMorph", 78, "[UiRoleMorphComponent]获取childMesh失败", ["ChildMeshPath", p])
            }
          }
          r = {
            MainSkeletalMesh: n,
            AnimClass: s,
            ChildSkeletalMesh: e,
            RoleBody: t.RoleBody
          };
          i.set(o, r)
        } this.MorphDataMap = i, this.MorphType = 0
    }
  }
  GetAllMorphPathList() {}
  GetSpecialMorphIdList() {}
  ClearData() {
    this.MorphDataMap && this.MorphDataMap.clear(), this.MorphIdMap && this.MorphIdMap.clear(), this.MorphDataMap = void 0, this.MorphIdMap = void 0
  }
};
UiModelMorphComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(12)], UiModelMorphComponent), exports.UiModelMorphComponent = UiModelMorphComponent;
//# sourceMappingURL=UiModelMorphComponent.js.map