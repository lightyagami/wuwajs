"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharExtraMesh = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderDataManager_1 = require("../../../Data/RenderDataManager");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class ExtraMeshInfo {
  constructor(e, t, r) {
    this.Name = "";
    this.SourceComponent = undefined;
    this.Component = undefined;
    this.UsageCount = 0;
    this.SourceComponent = e;
    this.Component = t;
    this.Name = r;
    t.K2_AttachToComponent(e, undefined, 0, 0, 0, false);
    t.SetSkeletalMesh(e.SkeletalMesh);
    t.SetVisibility(false);
    t.SetComponentTickEnabled(false);
    t.SetCollisionEnabled(0);
    var s = this.Component.GetNumMaterials();
    for (let e = 0; e < s; ++e) {
      this.Component.SetMaterial(e, RenderDataManager_1.RenderDataManager.Get().GetEmptyMaterial());
    }
  }
  AddUsage() {
    if (this.UsageCount === 0) {
      this.Component.SetVisibility(true);
      this.Component.SetComponentTickEnabled(true);
      this.Component.SetMasterPoseComponent(this.SourceComponent);
    }
    ++this.UsageCount;
  }
  RemoveUsage() {
    if (this.UsageCount <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 25, "ExtraMeshInfo UsageCount计数错误", ["Name", this.Name], ["UsageCount", this.UsageCount]);
      }
    } else {
      --this.UsageCount;
      if (this.UsageCount === 0) {
        this.Component.SetVisibility(false);
        this.Component.SetComponentTickEnabled(false);
        this.Component.SetMasterPoseComponent(undefined);
      }
    }
  }
}
class CharExtraMesh extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.ExtraMeshes = new Map();
  }
  Start() {
    this.OnInitSuccess();
  }
  EnsureExtraMesh(e) {
    var t;
    var r;
    var s;
    if (!this.ExtraMeshes.has(e)) {
      if (s = this.RenderComponent.GetSkeletalMeshComponent(RenderConfig_1.RenderConfig.MaterialControlBodyCaseArray[0])) {
        t = RenderConfig_1.RenderConfig.GenerateExtraMeshName(e);
        r = this.GetRenderingComponent().GetCachedOwner().AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, undefined, false, new UE.FName(t));
        s = new ExtraMeshInfo(s, r, t);
        this.ExtraMeshes.set(e, s);
        this.RenderComponent?.AddComponentWithEmptyMaterial(s.Name, r);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 25, "EnsureExtraMesh未找到源骨骼网格体组件", ["SourceSkeletalName", e]);
      }
    }
  }
  AddExtraSkeletalMeshUsage(e) {
    if (this.ExtraMeshes.has(e)) {
      this.ExtraMeshes.get(e).AddUsage();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 25, "找不到ExtraMesh", ["SourceSkeletalName", e]);
    }
  }
  RemoveExtraSkeletalMeshUsage(e) {
    if (this.ExtraMeshes.has(e)) {
      this.ExtraMeshes.get(e).RemoveUsage();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 25, "找不到ExtraMesh", ["SourceSkeletalName", e]);
    }
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdExtraMesh;
  }
  GetStatName() {
    return "CharExtraMesh";
  }
}
exports.CharExtraMesh = CharExtraMesh;
//# sourceMappingURL=CharExtraMesh.js.map