"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (o = e[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiDecorationLoadComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const MeshStreamDefine_1 = require("../../../MeshStream/MeshStreamDefine");
const MeshStreamTaskContext_1 = require("../../../MeshStream/MeshStreamTaskContext");
const UiModelResourcesManager_1 = require("../../../UiComponent/UiModelResourcesManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDecorationLoadComponent = class UiDecorationLoadComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.UiModelActorComponent = undefined;
    this.UiModelDataComponent = undefined;
    this.UiAttachActorComponent = undefined;
    this.zY1 = ResourceSystem_1.ResourceSystem.InvalidId;
    this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    this.ResourceLoadCache = undefined;
    this.MeshArray = UE.NewArray(UE.SkeletalMesh);
    this.MeshStreamTaskId = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    this.PartIndex = 0;
    this.LoadFinishCallBack = undefined;
    this.OnPostLoadAnimClass = (s, e, o, t, r = 0) => {
      const h = this.GetMainMeshPath();
      var i = [];
      if (h && !StringUtils_1.StringUtils.IsEmpty(h)) {
        i.push(h);
      }
      UiModelUtil_1.UiModelUtil.CheckPathListAndAdd(i, t);
      this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(i, (e, t) => {
        this.DestroyLoadMesh();
        this.ResourceLoadCache = t;
        var t = UE.NewArray(UE.SkeletalMesh);
        var i = this.GetLoadedResource(h);
        t.Add(i);
        this.UiModelActorComponent?.ChangeMesh(i, s, undefined, undefined, r);
        if (o) {
          (i = new MeshStreamTaskContext_1.MeshStreamTaskContext()).SkeletalMeshes = t;
          i.OnTaskFinish = () => {
            this.FinishLoad();
            var e = this.UiModelDataComponent?.GetLoadingVisible() ?? true;
            this.UiModelDataComponent?.SetVisible(e);
            this.UiModelDataComponent?.ClearLoadingVisible();
          };
          this.MeshStreamTaskId = ControllerHolder_1.ControllerHolder.MeshStreamController.AddMeshStreamTask(i);
        } else {
          this.FinishLoad();
          this.MeshArray.Empty();
        }
      });
    };
  }
  OnInit() {
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
    this.UiModelDataComponent = this.Owner.CheckGetComponent(0);
  }
  OnEnd() {
    this.CancelLoad();
    this.DestroyLoadMesh();
  }
  GetDecorationConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(29, e.toString());
  }
  GetMainMeshPath() {
    return this.GetDecorationConfig(this.UiModelDataComponent.ModelConfigId).SkeletalMesh.ToAssetPathName();
  }
  GetAnimClassPath() {
    return this.GetDecorationConfig(this.UiModelDataComponent.ModelConfigId).AnimBlueprint.ToAssetPathName();
  }
  IsSetMasterFollow() {
    return this.GetDecorationConfig(this.UiModelDataComponent.ModelConfigId).SetMasterFollow;
  }
  GetAttachSocketName(e) {
    return this.GetDecorationConfig(this.UiModelDataComponent.ModelConfigId).AttachSocket.Get(e ?? 0);
  }
  GetAttachTransform(e) {
    return this.GetDecorationConfig(this.UiModelDataComponent.ModelConfigId).AttachTrans.Get(e ?? 0);
  }
  SetAttachActorComponent(e) {
    this.UiAttachActorComponent = e;
  }
  LoadModelByModelId(e, t, i = false, s, o) {
    if (e === this.UiModelDataComponent.ModelConfigId && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 43, "重复加载模型", ["modelId", e]);
    }
    this.UiModelDataComponent.ModelConfigId = e;
    this.PartIndex = t;
    this.LoadFinishCallBack = s;
    this.LoadModel(i, o);
  }
  LoadModel(i, s, o = 0) {
    if (this.UiModelDataComponent?.GetModelLoadState() === 1 && (this.CancelLoad(), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("Character", 43, "取消上一个模型加载");
    }
    this.UiModelDataComponent?.ClearLoadingVisible();
    if (i) {
      this.UiModelDataComponent?.SetVisible(false);
    }
    this.UiModelDataComponent?.SetModelLoadState(1);
    var e = this.GetAnimClassPath();
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      this.OnPostLoadAnimClass(undefined, e, i, s, o);
    } else {
      this.zY1 = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e, t) => {
        this.zY1 = ResourceSystem_1.ResourceSystem.InvalidId;
        this.OnPostLoadAnimClass(e, t, i, s, o);
      }, 100, "Ui.UiSceneModel");
    }
  }
  FinishLoad() {
    this.UiModelDataComponent?.SetModelLoadState(2);
    var e = this.UiModelDataComponent?.GetDitherEffectValue() ?? 1;
    this.UiModelDataComponent?.SetDitherEffect(e);
    var e = this.GetAttachSocketName(this.PartIndex);
    var t = this.UiAttachActorComponent.MainMeshComponent;
    this.UiModelActorComponent.Actor.K2_AttachToComponent(t, e, 2, 2, 2, false);
    this.UiModelActorComponent.Actor.K2_SetActorRelativeTransform(this.GetAttachTransform(this.PartIndex), false, undefined, false);
    this.LoadFinishCallBack?.();
  }
  CancelLoad() {
    if (this.UiModelDataComponent?.GetModelLoadState() === 1 && (UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(this.LoadHandleId), this.LoadHandleId = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue, this.DestroyLoadMesh(), this.zY1 !== ResourceSystem_1.ResourceSystem.InvalidId)) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zY1);
      this.zY1 = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    this.ResourceLoadCache = undefined;
    this.UiModelDataComponent?.SetModelLoadState(0);
  }
  GetLoadedResource(e) {
    if (this.ResourceLoadCache) {
      return this.ResourceLoadCache.get(e);
    }
  }
  DestroyLoadMesh() {
    if (this.MeshStreamTaskId !== MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID) {
      ControllerHolder_1.ControllerHolder.MeshStreamController.RemoveMeshStreamTask(this.MeshStreamTaskId);
      this.MeshStreamTaskId = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    }
  }
};
UiDecorationLoadComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(38)], UiDecorationLoadComponent);
exports.UiDecorationLoadComponent = UiDecorationLoadComponent; //# sourceMappingURL=UIDecorationLoadComponent.js.map