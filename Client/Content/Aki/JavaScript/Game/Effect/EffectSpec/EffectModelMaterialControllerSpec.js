"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelMaterialControllerSpec = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../GlobalData");
const CharRenderingComponent_1 = require("../../Render/Character/Manager/CharRenderingComponent");
const SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelMaterialControllerSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.RenderActor = undefined;
    this.RenderComp = undefined;
    this.MaterialControllerHandle = undefined;
    this.MaterialControllerGroupHandle = undefined;
  }
  GetOrCreateRenderingComponent() {
    var e = this.Handle?.GetContext();
    if (e?.EntityId) {
      var t = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(3)?.Owner;
      if (t instanceof TsBaseCharacter_1.default) {
        return t.CharRenderingComponent;
      }
    }
    if (e?.SourceObject instanceof TsBaseCharacter_1.default) {
      return e.SourceObject.CharRenderingComponent;
    }
    let i = undefined;
    if (e) {
      if (e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext) {
        i = e.SkeletalMeshComp;
      } else if (e.SourceObject instanceof UE.SkeletalMeshComponent) {
        i = e.SourceObject;
      }
    }
    if (i = i === undefined && (t = this.Handle.GetSureEffectActor()?.RootComponent?.GetAttachParent()) && t.IsA(UE.SkeletalMeshComponent.StaticClass()) ? t : i) {
      if ((e = i.GetOwner()) instanceof TsBaseCharacter_1.default) {
        return e.CharRenderingComponent;
      } else {
        if (!(t = e.GetComponentByClass(CharRenderingComponent_1.default.StaticClass()))) {
          this.RenderActor = UE.KuroRenderingRuntimeBPPluginBPLibrary.D_SpawnActorFromClass(i, UE.BP_MaterialControllerRenderActor_C.StaticClass(), new UE.TransformDouble());
          t = this.RenderActor.CharRenderingComponent;
          if (GlobalData_1.GlobalData.IsUiSceneOpen) {
            t.Init(5);
          } else {
            t.Init(7);
          }
          t.SetLogicOwner(e);
          t.AddComponentByCase(0, i);
        }
        return t;
      }
    } else {
      return undefined;
    }
  }
  OnInit() {
    if (!this.EffectModel.MaterialControllerData && !this.EffectModel.MaterialControllerGroupData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 25, "EffectModelMaterialController未配置材质控制器或材质控制器组", ["EffectModelData", this.EffectModel.GetName()]);
      }
    }
    return true;
  }
  OnPlay() {
    this.MaterialControllerHandle = undefined;
    this.MaterialControllerGroupHandle = undefined;
    this.RenderComp = this.GetOrCreateRenderingComponent();
    if (!this.RenderComp) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 25, "EffectModelMaterialController播放失败，找不到渲染组件或骨骼网格体", ["EffectModelData", this.EffectModel.GetName()]);
      }
    }
    if (this.EffectModel.MaterialControllerData) {
      this.MaterialControllerHandle = this.RenderComp?.AddMaterialControllerData(this.EffectModel.MaterialControllerData);
    }
    if (this.EffectModel.MaterialControllerGroupData) {
      this.MaterialControllerGroupHandle = this.RenderComp?.AddMaterialControllerData(this.EffectModel.MaterialControllerGroupData);
    }
  }
  OnTick(e) {}
  OnStop() {
    if (this.MaterialControllerHandle) {
      this.RenderComp?.RemoveMaterialControllerData(this.MaterialControllerHandle);
      this.MaterialControllerHandle = undefined;
    }
    if (this.MaterialControllerGroupHandle) {
      this.RenderComp?.RemoveMaterialControllerData(this.MaterialControllerGroupHandle);
      this.MaterialControllerGroupHandle = undefined;
    }
    if (this.RenderActor) {
      this.RenderComp.Destroy();
      this.RenderActor.K2_DestroyActor();
      this.RenderActor = undefined;
    }
    this.RenderComp = undefined;
  }
}
exports.EffectModelMaterialControllerSpec = EffectModelMaterialControllerSpec;
//# sourceMappingURL=EffectModelMaterialControllerSpec.js.map