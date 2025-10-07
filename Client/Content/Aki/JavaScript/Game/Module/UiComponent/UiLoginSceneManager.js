"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiLoginSceneManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../Camera/CameraController");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const MeshStreamTaskContext_1 = require("../MeshStream/MeshStreamTaskContext");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const UiSceneRoleActorManager_1 = require("./UiSceneRoleActorManager");
const SEQUENCE_CAMERA_TAG = new UE.FName("SequenceCamera");
const CINEMATIC_TICK_TAG = new UE.FName("CinematicTick");
const SPOT_LIGHT1_TAG = new UE.FName("SpotLight1");
const SPOT_LIGHT2_TAG = new UE.FName("SpotLight2");
class UiLoginSceneManager {
  static GetRoleObserver(e) {
    let n = UiLoginSceneManager.ZPo.get(e);
    if (!n && GlobalData_1.GlobalData.World) {
      n = UiSceneRoleActorManager_1.UiSceneRoleActorManager.CreateUiSceneRoleActor(0);
      UiLoginSceneManager.ZPo.set(e, n);
    }
    return n;
  }
  static exo() {
    for (const n of this.bwa) {
      ControllerHolder_1.ControllerHolder.MeshStreamController.RemoveMeshStreamTask(n);
    }
    for (var [, e] of UiLoginSceneManager.ZPo) {
      e = e.GetRoleActorIndex();
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(e);
    }
    UiLoginSceneManager.txo = [];
    UiLoginSceneManager.ZPo.clear();
  }
  static InitCinematicTick() {
    UiLoginSceneManager.ixo = ActorSystem_1.ActorSystem.Get(UE.BP_Cinematics_Tick_C.StaticClass(), new UE.TransformDouble());
    UiLoginSceneManager.oxo = ActorSystem_1.ActorSystem.Get(UE.SpotLight.StaticClass(), new UE.TransformDouble());
    UiLoginSceneManager.rxo = ActorSystem_1.ActorSystem.Get(UE.SpotLight.StaticClass(), new UE.TransformDouble());
  }
  static nxo() {
    var e = ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles();
    var n = e[LoginDefine_1.ELoginSex.Girl];
    var e = e[LoginDefine_1.ELoginSex.Boy];
    UiLoginSceneManager.ixo.UISceneRole_2 = this.sxo(e);
    UiLoginSceneManager.ixo.UISceneRole = this.sxo(n);
    UiLoginSceneManager.ixo.Is_Tick = 1;
  }
  static sxo(e) {
    return UiLoginSceneManager.ZPo.get(e).Model?.CheckGetComponent(1)?.MainMeshComponent;
  }
  static axo() {
    if (UiLoginSceneManager.ixo) {
      ActorSystem_1.ActorSystem.Put("UiLoginSceneManager.DestroyCinematicTick1", UiLoginSceneManager.ixo);
      UiLoginSceneManager.ixo = undefined;
    }
    if (UiLoginSceneManager.oxo) {
      ActorSystem_1.ActorSystem.Put("UiLoginSceneManager.DestroyCinematicTick2", UiLoginSceneManager.oxo);
      UiLoginSceneManager.oxo = undefined;
    }
    if (UiLoginSceneManager.rxo) {
      ActorSystem_1.ActorSystem.Put("UiLoginSceneManager.DestroyCinematicTick3", UiLoginSceneManager.rxo);
      UiLoginSceneManager.rxo = undefined;
    }
  }
  static InitRoleObservers(e) {
    UiLoginSceneManager.VO_ = e;
    UiLoginSceneManager.exo();
    var e = ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles();
    var n = e[LoginDefine_1.ELoginSex.Girl];
    UiLoginSceneManager.hxo(n, "GirlCase");
    var n = e[LoginDefine_1.ELoginSex.Boy];
    UiLoginSceneManager.hxo(n, "BoyCase");
  }
  static hxo(i, a) {
    const r = UiLoginSceneManager.GetRoleObserver(i);
    const o = r.Model;
    var e = o.CheckGetComponent(14);
    const g = () => {
      o.CheckGetComponent(18).SetActive(true);
    };
    e?.LoadModelByRoleConfigId(i, -1, false, () => {
      var e = o.CheckGetComponent(18).GetHuluHandle().Model.CheckGetComponent(2).GetModelAllMesh();
      var n = new MeshStreamTaskContext_1.MeshStreamTaskContext();
      n.SkeletalMeshes = e;
      n.OnTaskFinish = g;
      var e = ControllerHolder_1.ControllerHolder.MeshStreamController.AddMeshStreamTask(n);
      this.bwa.push(e);
      UiModelUtil_1.UiModelUtil.SetVisible(o, true);
      o.CheckGetComponent(16)?.SetState(11);
      n = r.Model?.CheckGetComponent(1);
      n?.SetTransformByTag(a);
      n.MainMeshComponent.KuroLodMask = 1;
      n.MainMeshComponent.KuroAnimInstanceLod = 1;
      UiLoginSceneManager.txo.push(i);
      if (UiLoginSceneManager.txo.length >= 2) {
        UiLoginSceneManager.nxo();
        UiLoginSceneManager.VO_?.();
        UiLoginSceneManager.VO_ = undefined;
      }
    });
  }
  static PlayRoleMontage(e, n) {
    UiLoginSceneManager.GetRoleObserver(e).Model?.CheckGetComponent(16)?.SetState(n);
  }
  static SetRoleRenderingMaterial(e, n) {
    e = UiLoginSceneManager.GetRoleObserver(e);
    return UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e.Model, n) ?? 0;
  }
  static RemoveRoleRenderingMaterial(e, n) {
    e = UiLoginSceneManager.GetRoleObserver(e);
    UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(e.Model, n);
  }
  static RemoveRoleRenderingMaterialWithEnding(e, n) {
    UiLoginSceneManager.GetRoleObserver(e).Model?.CheckGetComponent(5)?.RemoveRenderingMaterialWithEnding(n);
  }
  static SetHuluRenderingMaterial(e, n) {
    e = UiLoginSceneManager.GetRoleObserver(e).Model.CheckGetComponent(18).GetHuluHandle();
    return UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e.Model, n);
  }
  static RemoveHuluRenderingMaterialWithEnding(e, n) {
    UiLoginSceneManager.GetRoleObserver(e).Model.CheckGetComponent(18).GetHuluHandle().Model.CheckGetComponent(5).RemoveRenderingMaterialWithEnding(n);
  }
  static SetBurstEyeMaterialId(e) {
    this.lxo = e;
  }
  static GetBurstEyeMaterialId() {
    return this.lxo;
  }
  static LoadSequenceAsync(e, a = undefined, r = false, o = undefined) {
    const g = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    ResourceSystem_1.ResourceSystem.LoadAsync(g, UE.LevelSequence, e => {
      var n;
      var i;
      if (e?.IsValid()) {
        if (o) {
          o?.();
        }
        n = (0, puerts_1.$ref)(undefined);
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), n);
        (e = (0, puerts_1.$unref)(n)).ResetBindings();
        if ((n = e.GetSequence()).HasBindingTag(SEQUENCE_CAMERA_TAG, true)) {
          i = CameraController_1.CameraController.WidgetCamera.GetComponent(12).CineCamera;
          e.AddBindingByTag(SEQUENCE_CAMERA_TAG, i);
        }
        if (UiLoginSceneManager.ixo && n.HasBindingTag(CINEMATIC_TICK_TAG, true)) {
          e.AddBindingByTag(CINEMATIC_TICK_TAG, UiLoginSceneManager.ixo);
        }
        if (UiLoginSceneManager.oxo && n.HasBindingTag(SPOT_LIGHT1_TAG, true)) {
          e.AddBindingByTag(SPOT_LIGHT1_TAG, UiLoginSceneManager.oxo);
        }
        if (UiLoginSceneManager.rxo && n.HasBindingTag(SPOT_LIGHT2_TAG, true)) {
          e.AddBindingByTag(SPOT_LIGHT2_TAG, UiLoginSceneManager.rxo);
        }
        if (a) {
          e.SequencePlayer.OnFinished.Add(a);
        }
        if (r) {
          e.SequencePlayer.PlayReverse();
        } else {
          e.SequencePlayer.Play();
        }
        if (this._xo) {
          this._xo.SequencePlayer.StopAtCurrentTime();
          this.uxo();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiLoginSceneManager", 10, "登录场景Sequence异步加载失败", ["path", g]);
        }
        if (o) {
          o?.();
        }
        a?.();
      }
    });
  }
  static PlayLoginLoopSequence() {
    const i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("LevelSequence_Login");
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, e => {
      var n;
      if (e?.IsValid()) {
        n = (0, puerts_1.$ref)(undefined);
        UE.LevelSequencePlayer.CreateLevelSequencePlayer(GlobalData_1.GlobalData.World, e, new UE.MovieSceneSequencePlaybackSettings(), n);
        UiLoginSceneManager._xo = (0, puerts_1.$unref)(n);
        UiLoginSceneManager._xo.ResetBindings();
        e = CameraController_1.CameraController.WidgetCamera.GetComponent(12).CineCamera;
        UiLoginSceneManager._xo.AddBindingByTag(SEQUENCE_CAMERA_TAG, e);
        UiLoginSceneManager._xo.SequencePlayer.PlayLooping();
        CameraController_1.CameraController.EnterCameraMode(2);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiLoginSceneManager", 10, "播放进入循环缓动镜头");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiLoginSceneManager", 10, "登录场景Sequence异步加载失败", ["path", i]);
      }
    });
  }
  static uxo() {
    var e;
    var n = UE.GameplayStatics.GetPlayerController(GlobalData_1.GlobalData.World, 0);
    if (n) {
      e = CameraController_1.CameraController.WidgetCamera.GetComponent(12).CineCamera;
      n.SetViewTargetWithBlend(e, 0.5, 0, 0, true, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiLoginSceneManager", 10, "[BlendCameraSequence]混合相机动画失败");
    }
  }
  static Destroy() {
    UiLoginSceneManager.exo();
    UiLoginSceneManager.axo();
    if (UiLoginSceneManager._xo) {
      UiLoginSceneManager._xo.K2_DestroyActor();
      UiLoginSceneManager._xo = undefined;
    }
  }
}
(exports.UiLoginSceneManager = UiLoginSceneManager).ZPo = new Map();
UiLoginSceneManager.ixo = undefined;
UiLoginSceneManager.oxo = undefined;
UiLoginSceneManager.rxo = undefined;
UiLoginSceneManager.lxo = 0;
UiLoginSceneManager.txo = [];
UiLoginSceneManager.bwa = [];
UiLoginSceneManager.VO_ = undefined;
UiLoginSceneManager._xo = undefined; //# sourceMappingURL=UiLoginSceneManager.js.map