"use strict";

var __decorate = this && this.__decorate || function (e, o, t, i) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, t) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, o, t, i);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (s = e[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(o, t, h) : s(o, t)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(o, t, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelMorphComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelMorphComponent = class UiModelMorphComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.MorphType = 0;
    this.IsEnableMorphInternal = false;
    this.MorphDataMap = undefined;
    this.MorphIdMap = undefined;
    this.UiModelDataComponent = undefined;
    this.UiModelActorComponent = undefined;
  }
  OnStart() {
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0);
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
  }
  OnEnd() {
    this.MorphType = 0;
    this.MorphDataMap = undefined;
    this.MorphIdMap = undefined;
    this.UiModelDataComponent = undefined;
    this.UiModelActorComponent = undefined;
    this.IsEnableMorphInternal = false;
  }
  GetMorphType() {
    return this.MorphType;
  }
  SetMorphType(e) {
    var o;
    if (this.IsEnableMorphInternal) {
      if (this.MorphType === e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiModelMorph", 78, "当前形态与目标形态相同", ["morphType", e], ["this.MorphType", this.MorphType]);
        }
        return false;
      } else {
        this.MorphType = e;
        return !!this.MorphDataMap && ((o = this.MorphDataMap?.get(e)) ? (this.UiModelActorComponent?.ChangeMesh(o.MainSkeletalMesh, o.AnimClass, o.ChildSkeletalMesh), EventSystem_1.EventSystem.EmitWithTarget(this.Owner, EventDefine_1.EEventName.OnUiModelSetMorphTypeComplete), true) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiModelMorph", 78, "[UiModelMorphComponent]初始化获取morphData有误", ["MorphType", e]), false));
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiModelMorph", 78, "该角色不支持多形态", ["roleId", this.UiModelDataComponent.ModelConfigId]);
      }
      return false;
    }
  }
  GetCurrentMorphData() {
    return this.MorphDataMap?.get(this.MorphType);
  }
  PreloadMorphId() {
    this.MorphIdMap = undefined;
    this.IsEnableMorphInternal = false;
  }
  PreloadMorphData() {
    this.PreloadMorphId();
    if (this.MorphIdMap) {
      if (this.MorphDataMap) {
        this.MorphDataMap.clear();
        this.MorphDataMap = undefined;
      }
      var o;
      var t;
      var i = new Map();
      for ([o, t] of this.MorphIdMap.entries()) {
        if (t.MainMeshPath !== undefined && !StringUtils_1.StringUtils.IsEmpty(t.MainMeshPath) && t.AnimPath !== undefined && !StringUtils_1.StringUtils.IsEmpty(t.AnimPath)) {
          var s = t.MainMeshPath;
          var r = t.AnimPath;
          var h = t.ChildMeshPathList;
          var n = ResourceSystem_1.ResourceSystem.GetLoadedAsset(s, UE.SkeletalMesh);
          if (!n) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiModelMorph", 78, "[UiRoleMorphComponent]获取mainMesh失败", ["MainMeshPath", s]);
            }
          }
          var s = ResourceSystem_1.ResourceSystem.GetLoadedAsset(r, UE.Class);
          if (!s) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiModelMorph", 78, "[UiRoleMorphComponent]获取animClass失败", ["AnimClassPath", r]);
            }
          }
          let e = undefined;
          if (h) {
            e = [];
            for (const p of h) {
              var l = ResourceSystem_1.ResourceSystem.GetLoadedAsset(p, UE.SkeletalMesh);
              if (l) {
                e.push(l);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("UiModelMorph", 78, "[UiRoleMorphComponent]获取childMesh失败", ["ChildMeshPath", p]);
              }
            }
          }
          r = {
            MainSkeletalMesh: n,
            AnimClass: s,
            ChildSkeletalMesh: e,
            RoleBody: t.RoleBody
          };
          i.set(o, r);
        }
      }
      this.MorphDataMap = i;
      this.MorphType = 0;
    }
  }
  GetAllMorphPathList() {}
  GetSpecialMorphIdList() {}
  ClearData() {
    if (this.MorphDataMap) {
      this.MorphDataMap.clear();
    }
    if (this.MorphIdMap) {
      this.MorphIdMap.clear();
    }
    this.MorphDataMap = undefined;
    this.MorphIdMap = undefined;
  }
};
UiModelMorphComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(12)], UiModelMorphComponent);
exports.UiModelMorphComponent = UiModelMorphComponent; //# sourceMappingURL=UiModelMorphComponent.js.map