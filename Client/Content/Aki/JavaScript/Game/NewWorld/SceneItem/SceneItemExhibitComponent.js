"use strict";

var SceneItemExhibitComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, o) {
  var s;
  var n = arguments.length;
  var r = n < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (n < 3 ? s(r) : n > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemExhibitComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const ExhibitPhantomById_1 = require("../../../Core/Define/ConfigQuery/ExhibitPhantomById");
const ExhibitWeaponTransformById_1 = require("../../../Core/Define/ConfigQuery/ExhibitWeaponTransformById");
const WeaponSkinById_1 = require("../../../Core/Define/ConfigQuery/WeaponSkinById");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../Core/Utils/ModelUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const MeshStreamDefine_1 = require("../../Module/MeshStream/MeshStreamDefine");
const MeshStreamTaskContext_1 = require("../../Module/MeshStream/MeshStreamTaskContext");
const UiModelResourcesManager_1 = require("../../Module/UiComponent/UiModelResourcesManager");
const EXHIBIT_ACTOR_REFERENCE_KEY = "Model";
let SceneItemExhibitComponent = SceneItemExhibitComponent_1 = class SceneItemExhibitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.CreatureDataComp = undefined;
    this.StateComponent = undefined;
    this.ExhibitData = undefined;
    this.rlg = undefined;
    this.j7l = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    this.wDg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    this.CharRenderingComponent = undefined;
    this.SkeletonComponentList = [];
    this.Lwg = false;
    this.nBr = 0;
    this.hwe = Rotator_1.Rotator.Create();
    this.tat = StringUtils_1.EMPTY_STRING;
    this.j$o = Transform_1.Transform.Create();
    this.c2g = -1;
    this.wAm = () => {
      this.nlg();
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemExhibitComponent_1)[0];
    this.ExhibitData = e;
    if (!this.ExhibitData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 58, "SceneItemExhibitComponent ExhibitData is undefined");
      }
    }
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(214);
    this.CreatureDataComp = this.Entity.GetComponent(0);
    this.StateComponent = this.Entity.GetComponent(144);
    return true;
  }
  OnActivate() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.wAm);
  }
  nlg() {
    var e;
    var t;
    var i = (this.ActorComp?.GetInteractionMainActor()).GetActorByKey(EXHIBIT_ACTOR_REFERENCE_KEY);
    if (i) {
      if ((e = this.ExhibitData.ExhibitConfig.ActiveEffect) !== undefined) {
        this.tat = e.Path;
        t = Vector_1.Vector.Create(e.Offset.X ?? 0, e.Offset.Y ?? 0, e.Offset.Z ?? 0);
        this.j$o.SetLocation(this.ActorComp.Owner.D_K2_GetActorLocation());
        this.j$o.GetLocation().Addition(t, this.j$o.GetLocation());
        this.j$o.SetScale3D(Vector_1.Vector.Create(e.Scale, e.Scale, e.Scale));
      }
      i.SetActorTickEnabled(true);
      i.PrimaryActorTick.bCanEverTick = true;
      this.rlg = i;
      if (this.CreatureDataComp.ExhibitionItemId <= 0) {
        this.HideSkeletalMeshComponent();
      } else {
        this.RefreshSkeletalMeshComponent(this.CreatureDataComp.ExhibitionItemId, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 58, "SceneItemExhibitComponent exhibitActor is undefined");
    }
  }
  OnTick(e) {
    if (this.rlg && this.Lwg && this.nBr !== 0) {
      e = this.nBr * e;
      this.hwe.Yaw = e;
      this.rlg.K2_AddActorLocalRotation(this.hwe.ToUeRotator(), false, undefined, false);
    }
  }
  OnDeactivate() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.wAm);
  }
  OnEnd() {
    this.Bwr(this.SkeletonComponentList, this.rlg);
    this.CharRenderingComponent?.K2_DestroyComponent(this.rlg);
    this.d2g();
    return true;
  }
  d2g() {
    if (!(this.c2g <= 0)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.c2g, "SceneItemExhibitComponent", true);
      this.c2g = -1;
    }
  }
  RefreshSkeletalMeshComponent(e, t = false) {
    if (!!this.ExhibitData && (this.CreatureDataComp.ExhibitionItemId !== e || !!t)) {
      this.CharRenderingComponent ||= this.Rwr();
      this.CreatureDataComp.ExhibitionItemId = e;
      this.d2g();
      if (this.ExhibitData.ExhibitConfig.Type === "Weapon") {
        this.slg(e);
      } else if (this.ExhibitData.ExhibitConfig.Type === "Phantom") {
        this.alg(e);
        this.SetExhibitShowEffect(true);
      }
    }
  }
  HideSkeletalMeshComponent() {
    if (this.ExhibitData.ExhibitConfig.Type === "Phantom") {
      this.SetExhibitShowEffect(false);
    }
    this.CreatureDataComp.ExhibitionItemId = 0;
    this.Lwg = false;
    this.Zht();
    this._lg();
    if (this.SkeletonComponentList.length !== 0) {
      for (const e of this.SkeletonComponentList) {
        e.SetHiddenInGame(true);
      }
    }
  }
  Rwr() {
    var e = this.rlg.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    e.Init(3);
    e.SetComponentTickEnabled(true);
    if (Info_1.Info.IsPlayInEditor) {
      UE.LGUIBPLibrary.AddInstanceComponent(this.rlg, e);
    }
    return e;
  }
  slg(t) {
    this.Lwg = false;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t);
    let i = [];
    let o = [];
    if (e === 2) {
      var s = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t);
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "WeaponConfig is undefined", ["id", t]);
        }
        return;
      }
      i = s.Models;
      o = s.StandAnim;
    } else {
      if (e !== 10) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "Invalid ItemType", ["id", t], ["itemType", e]);
        }
        return;
      }
      s = WeaponSkinById_1.configWeaponSkinById.GetConfig(t);
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "WeaponSkinConfig is undefined", ["id", t]);
        }
        return;
      }
      i = s.Models;
      o = s.StandAnim;
    }
    this.rlg.SetActorHiddenInGame(true);
    this.CharRenderingComponent?.ResetAllRenderingState();
    this.Zht();
    this._lg();
    if (i.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 58, "ModelIdList is empty", ["id", t]);
      }
    } else if (o.length <= 0) {
      this.hlg(i, () => {
        this.rlg.SetActorHiddenInGame(false);
        this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
        this.j7l = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
        this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
        this.llg(t, []);
      });
    } else {
      this.PDg(o, e => {
        this.hlg(i, () => {
          this.rlg.SetActorHiddenInGame(false);
          this.rlg.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, false);
          this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
          this.j7l = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
          this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
          this.llg(t, e);
        });
      });
    }
  }
  PDg(t, i) {
    const o = [];
    if (t.length <= 0) {
      i(o);
    }
    this.ADg(t[0], e => {
      o[0] = e;
      if (t.length === o.length) {
        i(o);
      }
    });
    if (t.length > 1) {
      this.DDg(t[1], e => {
        o[1] = e;
        if (t.length === o.length) {
          i(o);
        }
      });
    }
  }
  llg(e, t) {
    if (this.SkeletonComponentList.length !== 0) {
      var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e);
      var i = ExhibitWeaponTransformById_1.configExhibitWeaponTransformById.GetConfig(i.TransformId);
      var o = this.Udg(i, this.SkeletonComponentList.length > 1);
      if (o.length !== this.SkeletonComponentList.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "WeaponLoadComplete transformList length not equal SkeletonComponentList length", ["itemId", e]);
        }
      } else {
        for (var [s, n] of this.SkeletonComponentList.entries()) {
          n.K2_SetRelativeTransform(o[s].ToUeTransformOld(), false, undefined, false);
          n.SetAnimationMode(1);
          if (t.length > s) {
            n.PlayAnimation(t[s], true);
          }
        }
        this.Lwg = true;
        this.nBr = i.RotateTime ? MathCommon_1.MathCommon.RoundAngle / i.RotateTime : 0;
      }
    }
  }
  alg(e) {
    if (this.ExhibitData) {
      this.rlg.SetActorHiddenInGame(true);
      const t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e);
      this.Zht();
      this._lg();
      this.ADg(t.StandAnim, e => {
        this.hlg([t.MeshId], () => {
          this.rlg.SetActorHiddenInGame(false);
          this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
          this.j7l = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
          this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
          this.clg(e);
        });
      });
    }
  }
  clg(e) {
    var t;
    var i;
    if (this.SkeletonComponentList.length !== 0) {
      t = this.SkeletonComponentList[0];
      i = this.m2g(this.CreatureDataComp.ExhibitionItemId);
      t.K2_SetRelativeTransform(i.ToUeTransformOld(), false, undefined, false);
      t.SetAnimationMode(1);
      t.PlayAnimation(e, true);
    }
  }
  hlg(e, a) {
    const _ = [];
    for (const i of e) {
      var t = ModelUtil_1.ModelUtil.GetModelConfig(i).网格体.ToAssetPathName();
      if (!t || StringUtils_1.StringUtils.IsEmpty(t)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "SceneItemExhibitComponent meshPath is empty", ["modelId", i]);
        }
      } else {
        _.push(t);
      }
    }
    this._lg();
    this.j7l = UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(_, (e, t) => {
      var i = [];
      for (const r of _) {
        var o = t?.get(r);
        if (o) {
          i.push(o);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 58, "SceneItemExhibitComponent LoadUiModelResources mesh is undefined", ["meshPath", r]);
        }
      }
      this.dlg();
      this.Bwr(this.SkeletonComponentList, this.rlg);
      this.mlg(this.rlg, i);
      var s = new MeshStreamTaskContext_1.MeshStreamTaskContext();
      var n = UE.NewArray(UE.SkeletalMesh);
      for (const h of i) {
        n.Add(h);
      }
      s.SkeletalMeshes = n;
      s.OnTaskFinish = a;
      this.qpd = ControllerHolder_1.ControllerHolder.MeshStreamController.AddMeshStreamTask(s);
    });
  }
  mlg(e, t) {
    for (const o of t) {
      var i = e.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      i.SetSkeletalMesh(o);
      i.bConsiderAllBodiesForBounds = true;
      i.KuroMaterialControllerUpdateGroupMode = 1;
      i.SetHiddenInGame(false);
      i.SetComponentTickEnabled(true);
      this.xdg(i);
      if (Info_1.Info.IsPlayInEditor) {
        UE.LGUIBPLibrary.AddInstanceComponent(e, i);
      }
      this.SkeletonComponentList.push(i);
    }
  }
  xdg(e) {
    if (this.ExhibitData.ExhibitConfig.Type === "Weapon") {
      this.CharRenderingComponent.AddComponent("WeaponCase0", e);
    } else if (this.ExhibitData.ExhibitConfig.Type === "Phantom") {
      this.CharRenderingComponent.AddComponent("CharacterMesh0", e);
    }
  }
  Bwr(e, t) {
    e.forEach(e => {
      e.K2_DestroyComponent(t);
      if (Info_1.Info.IsPlayInEditor) {
        UE.LGUIBPLibrary.RemoveInstanceComponent(t, e);
      }
    });
    e.length = 0;
  }
  _lg() {
    if (this.olg !== UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.olg);
      this.olg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    }
    if (this.wDg !== UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.wDg);
      this.wDg = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    }
    if (this.j7l !== UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue) {
      UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(this.j7l);
      this.j7l = UiModelResourcesManager_1.UiModelResourcesManager.InvalidValue;
    }
    this.dlg();
  }
  Zht() {
    for (const e of this.SkeletonComponentList) {
      e.Stop();
    }
  }
  dlg() {
    if (this.qpd !== MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID) {
      ControllerHolder_1.ControllerHolder.MeshStreamController.RemoveMeshStreamTask(this.qpd);
      this.qpd = MeshStreamDefine_1.INVALID_MESH_STREAM_TASK_ID;
    }
  }
  ADg(t, i) {
    this.olg = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, e => {
      if (e) {
        i(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 58, "SceneItemExhibitComponent LoadAnimByModelId animAsset is undefined", ["standAnim", t]);
      }
    }, 100, "Ui.PhantomUi");
  }
  DDg(t, i) {
    this.wDg = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, e => {
      if (e) {
        i(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 58, "SceneItemExhibitComponent LoadSecondAnimByModelId animAsset is undefined", ["secondAnim", t]);
      }
    }, 100, "Ui.PhantomUi");
  }
  Udg(e, t) {
    var i = [];
    var o = Vector_1.Vector.Create(e.Location.X, e.Location.Y, e.Location.Z);
    var s = Rotator_1.Rotator.Create(e.Rotation.Y, e.Rotation.Z, e.Rotation.X);
    var n = Vector_1.Vector.Create(e.Size, e.Size, e.Size);
    var s = Transform_1.Transform.Create(s.Quaternion(), o, n);
    i.push(s);
    if (t) {
      o = Vector_1.Vector.Create(e.ScabbardOffset.X, e.ScabbardOffset.Y, e.ScabbardOffset.Z);
      s = Rotator_1.Rotator.Create(e.ScabbardRotationOffset.Y, e.ScabbardRotationOffset.Z, e.ScabbardRotationOffset.X);
      t = Transform_1.Transform.Create(s.Quaternion(), o, n);
      i.push(t);
    }
    return i;
  }
  m2g(e) {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(e);
    var e = ExhibitPhantomById_1.configExhibitPhantomById.GetConfig(e.MonsterId);
    var t = Vector_1.Vector.Create(e.Location[0], e.Location[1], e.Location[2]);
    var i = Rotator_1.Rotator.Create(e.Rotator[0], e.Rotator[1], e.Rotator[2]);
    var e = Vector_1.Vector.Create(e.Zoom[0], e.Zoom[1], e.Zoom[2]);
    return Transform_1.Transform.Create(i.Quaternion(), t, e);
  }
  SetExhibitShowEffect(e) {
    if (e) {
      if (!(this.c2g > 0)) {
        if (this.tat) {
          this.c2g = EffectSystem_1.EffectSystem.SpawnEffect(this.ActorComp.Owner, this.j$o.ToUeTransform(), this.tat, "SceneItemExhibitComponent");
        }
      }
    } else {
      this.d2g();
    }
  }
  GetExhibitConfig() {
    if (this.ExhibitData) {
      return this.ExhibitData.ExhibitConfig;
    }
  }
  GetItemId() {
    return this.CreatureDataComp.ExhibitionItemId;
  }
};
SceneItemExhibitComponent = SceneItemExhibitComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(344)], SceneItemExhibitComponent);
exports.SceneItemExhibitComponent = SceneItemExhibitComponent; //# sourceMappingURL=SceneItemExhibitComponent.js.map