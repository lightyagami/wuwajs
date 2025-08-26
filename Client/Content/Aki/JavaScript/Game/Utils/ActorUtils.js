"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorUtils = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const ModelManager_1 = require("../Manager/ModelManager");
class ActorUtils {
  static LoadActorByModelConfig(e, o) {
    var t = e.蓝图?.ToAssetPathName();
    if (t && t.length && t !== "None") {
      t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e.蓝图.ToAssetPathName(), UE.Class);
      if (t?.IsValid()) {
        let e = undefined;
        if ((e = t.IsChildOf(UE.TsBaseItem_C.StaticClass()) ? ActorSystem_1.ActorSystem.Get(t, o, undefined) : ActorSystem_1.ActorSystem.Spawn(t, o, undefined))?.IsValid()) {
          e.SetActorHiddenInGame(true);
          e.SetActorTickEnabled(false);
          e.SetActorEnableCollision(false);
        }
        return e;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[ActorUtils.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。", ["ModelId", e.ID]);
    }
  }
  static LoadActorByPath(e, o, t) {
    if (e && e.length && e !== "None") {
      var r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.Class);
      if (r?.IsValid()) {
        let e = undefined;
        if ((e = r.IsChildOf(UE.TsBaseItem_C.StaticClass()) ? ActorSystem_1.ActorSystem.Get(r, o, undefined) : ActorSystem_1.ActorSystem.Spawn(r, o, undefined))?.IsValid()) {
          e.SetActorHiddenInGame(true);
          e.SetActorTickEnabled(false);
          e.SetActorEnableCollision(false);
        }
        return e;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 7, "[ActorUtils.LoadActorByPath] 加载Actor失败，因为模型的蓝图没有设置。", ["Path", e], ["EntityConfigId", t]);
    }
  }
  static LoadAndChangeMeshAnim(e, o, t) {
    var o = o.ToAssetPathName();
    if (o?.length && o !== "None" && (o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.SkeletalMesh)) && e.SkeletalMesh !== o) {
      e.SetSkeletalMesh(o);
    }
    var o = t.ToAssetPathName();
    if (o?.length && o !== "None" && (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.Class)) && e.AnimClass !== t) {
      e.SetAnimClass(t);
    }
  }
  static GetEntityByActor(e, o = true) {
    if (UE.KuroStaticLibrary.IsImplementInterface(e?.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      e = e;
      return ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e.GetEntityId());
    }
    if (o && Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 4, "[WorldBridge.GetEntityByActor] Actor未实现接口CreatureInterface");
    }
  }
  static TryGetBoneSocket(e, o) {
    if (e?.IsValid()) {
      e = e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
      if (e?.IsValid()) {
        o = FNameUtil_1.FNameUtil.GetDynamicFName(o);
        if (o && (e.DoesSocketExist(o) || e.GetBoneIndex(o) !== CommonDefine_1.INDEX_NONE)) {
          return o;
        }
      }
    }
  }
}
exports.ActorUtils = ActorUtils;
//# sourceMappingURL=ActorUtils.js.map