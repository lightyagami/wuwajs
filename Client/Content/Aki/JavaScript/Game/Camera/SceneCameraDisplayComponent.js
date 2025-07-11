"use strict";

var __decorate = this && this.__decorate || function (e, t, i, r) {
  var n;
  var s = arguments.length;
  var a = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, i, r);
  } else {
    for (var o = e.length - 1; o >= 0; o--) {
      if (n = e[o]) {
        a = (s < 3 ? n(a) : s > 3 ? n(t, i, a) : n(t, i)) || a;
      }
    }
  }
  if (s > 3 && a) {
    Object.defineProperty(t, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCameraDisplayComponent = exports.SceneSubCamera = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const PriorityQueue_1 = require("../../Core/Container/PriorityQueue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const UiTimeDilation_1 = require("../Ui/Base/UiTimeDilation");
const UiLayerType_1 = require("../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine");
const UiLayer_1 = require("../Ui/UiLayer");
const CameraController_1 = require("./CameraController");
class SceneSubCamera {
  constructor() {
    this.Type = 2;
    this.Camera = undefined;
    this.FadeIn = -0;
    this.FadeInFunc = 0;
    this.FadeInExp = 0;
    this.FadeOut = -0;
    this.FadeOutFunc = 0;
    this.FadeOutExp = 0;
    this.IsBinding = false;
    this.IsKeepUi = false;
  }
  Clear() {
    if (this.Camera?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("SceneSubCamera.Clear", this.Camera);
      this.Camera = undefined;
    }
  }
  CopyData(e) {
    if (e?.Camera?.IsValid()) {
      this.Camera.D_K2_SetActorTransform(new UE.TransformDouble(e.Camera.K2_GetActorRotation(), e.Camera.D_K2_GetActorLocation(), new UE.VectorDouble(1, 1, 1)), false, undefined, true);
      this.FadeIn = e.FadeIn;
      this.FadeOut = e.FadeOut;
      this.IsKeepUi = e.IsKeepUi;
    }
  }
}
(exports.SceneSubCamera = SceneSubCamera).Compare = (e, t) => {
  let i = e.Type - t.Type;
  if (i === 0) {
    i--;
  }
  return i;
};
let SceneCameraDisplayComponent = class SceneCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.uxr = undefined;
    this.cxr = undefined;
    this.mxr = undefined;
    this.dxr = undefined;
    this.Cxr = 0;
    this.OnModeChanged = (e, t) => {
      if (e === 3 && this.IsIdle()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Camera", 45, "SceneCameraDisplayComponent退出Scene相机");
        }
        CameraController_1.CameraController.ExitCameraMode(3, 1, 0, 0, () => {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.EnableCSMStable 1");
        });
        this.ClearRemovedSceneCamera();
      } else if (t === 3 && e !== t) {
        this.ClearRemovedSceneCamera();
      }
    };
    this.nye = () => {
      this.dxr.Camera = CameraController_1.CameraController.SpawnCineCamera();
      this.uxr = this.dxr.Camera;
      if (CameraController_1.CameraController.Model.CameraMode === 3) {
        CameraController_1.CameraController.SetViewTarget(this.uxr, "SceneCamera.OnWorldDone");
      }
    };
    this.uMe = () => {
      if (this.dxr) {
        ActorSystem_1.ActorSystem.Put("SceneCameraDisplayComponent.OnClearWorld", this.uxr);
        this.dxr.Camera = undefined;
        this.uxr = undefined;
      }
      this.Cxr = 0;
      this.ClearRemovedSceneCamera();
    };
  }
  get CineCamera() {
    return this.cxr.Top.Camera;
  }
  get CurSceneSubCamera() {
    return this.cxr?.Top;
  }
  get DefaultSceneSubCamera() {
    return this.dxr;
  }
  OnInit() {
    this.cxr = new PriorityQueue_1.PriorityQueue(SceneSubCamera.Compare);
    this.mxr = new Array();
    this.dxr = new SceneSubCamera();
    this.dxr.Camera = CameraController_1.CameraController.SpawnCineCamera();
    this.dxr.Type = 2;
    this.cxr.Push(this.dxr);
    this.uxr = this.dxr.Camera;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    this.Ore();
    return !!this.uxr;
  }
  Ore() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CameraModeChanged, this.OnModeChanged)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraModeChanged, this.OnModeChanged);
    }
  }
  kre() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CameraModeChanged, this.OnModeChanged)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraModeChanged, this.OnModeChanged);
    }
  }
  OnClear() {
    if (this.uxr) {
      ActorSystem_1.ActorSystem.Put("SceneCameraDisplayComponent.OnClear", this.uxr);
      this.uxr = undefined;
    }
    this.kre();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    return true;
  }
  OnChangeTimeDilation(e) {
    if (this.uxr?.IsValid()) {
      this.uxr.CustomTimeDilation = e;
    }
  }
  GetUnBoundSceneCamera(e) {
    var t;
    if (!this.cxr.Empty) {
      if (this.dxr.IsBinding) {
        (t = new SceneSubCamera()).Camera = CameraController_1.CameraController.SpawnCineCamera();
        t.Type = e;
        this.cxr.Push(t);
        return t;
      } else {
        this.gxr();
        this.dxr.Type = e;
        this.dxr.IsBinding = true;
        this.cxr.Update(this.dxr);
        return this.dxr;
      }
    }
  }
  RemoveBoundSceneCamera(e) {
    if (!this.cxr.Empty && e) {
      e.IsBinding = false;
      if (this.dxr === e) {
        this.gxr();
        this.cxr.Update(this.dxr);
      } else {
        this.cxr.Remove(e);
        this.mxr.push(e);
        if (this.IsIdle()) {
          this.dxr.CopyData(e);
        }
      }
    }
  }
  IsIdle() {
    return !this.cxr.Empty && this.cxr.Top === this.dxr && !this.dxr.IsBinding;
  }
  ClearRemovedSceneCamera() {
    for (const e of this.mxr) {
      e.Clear();
    }
    this.mxr.length = 0;
  }
  UpdateViewTarget(e) {
    if (e !== undefined) {
      CameraController_1.CameraController.SetViewTarget(this.CurSceneSubCamera.Camera, "SceneCamera.UpdateViewTarget", e, 0, undefined, true, true);
    } else {
      CameraController_1.CameraController.SetViewTarget(this.CurSceneSubCamera.Camera, "SceneCamera.UpdateViewTarget2", this.CurSceneSubCamera.FadeIn, this.CurSceneSubCamera.FadeInFunc, this.CurSceneSubCamera.FadeInExp, true, true);
    }
  }
  gxr() {
    this.dxr.IsBinding = false;
    this.dxr.Camera.CameraComponent.bConstrainAspectRatio = false;
    this.dxr.Type = 2;
    this.dxr.IsKeepUi = true;
  }
  SetUiActive(e) {
    if (e) {
      if (this.Cxr > 0) {
        this.Cxr--;
      }
    } else {
      this.Cxr++;
    }
    if ((this.Cxr === 0 || !e) && (!(this.Cxr > 1) || !!e)) {
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, e);
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, e);
      if (e) {
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(2);
        ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("SceneCameraDisplayComponent.SetUiActive");
      } else {
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(2);
        ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag);
        UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("SceneCameraDisplayComponent.SetUiActive");
      }
    }
  }
};
SceneCameraDisplayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(7)], SceneCameraDisplayComponent);
exports.SceneCameraDisplayComponent = SceneCameraDisplayComponent; //# sourceMappingURL=SceneCameraDisplayComponent.js.map