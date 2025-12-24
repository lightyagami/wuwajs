"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        a = (r < 3 ? h(a) : r > 3 ? h(i, e, a) : h(i, e)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCameraDisplayComponent = exports.SceneSubCamera = exports.CameraAberrationView = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const PriorityQueue_1 = require("../../Core/Container/PriorityQueue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
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
const DEFAULT_CAMER_FOV = 75;
const MINI_CAMER_FOV = 15;
class CameraAberrationView {
  constructor() {
    this.Camera = undefined;
    this.BasicLocation = Vector_1.Vector.Create();
    this.FadeInTime = 0.5;
    this.FadeOutTime = 0.5;
    this.SceneCameraFadeOutTime = 0.5;
    this.BJd = DEFAULT_CAMER_FOV;
    this.kJd = false;
    this.qJd = false;
    this.OJd = Vector_1.Vector.Create();
    this.GJd = 0;
    this.FJd = DEFAULT_CAMER_FOV;
    this.NJd = 0;
    this.Iii = 0;
    this.VJd = undefined;
    this.jJd = false;
    this.HJd = 0;
    this.cie = Rotator_1.Rotator.Create();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
  }
  CameraAberrationView(t, i, e, s) {
    this.BasicLocation.DeepCopy(t);
    this.FadeInTime = i;
    this.FadeOutTime = e;
    this.SceneCameraFadeOutTime = s;
    this.HJd = Math.max(this.FadeOutTime - this.SceneCameraFadeOutTime, 0);
  }
  Set(t, i, e, s) {
    this.BasicLocation.DeepCopy(t);
    this.FadeInTime = i;
    this.FadeOutTime = e;
    this.SceneCameraFadeOutTime = s;
    this.HJd = Math.max(this.FadeOutTime - this.SceneCameraFadeOutTime, 0);
    return this;
  }
  EnablePerspectiveToOrthographicView(t, i = undefined) {
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 57, "[正交镜头]启动正交镜头，从透视过渡到正交", ["FadeInTime", this.FadeInTime], ["BasicLocation", this.BasicLocation]);
      }
      this.Camera = t;
      this.BJd = this.Camera.GetCineCameraComponent().FieldOfView;
      this.kJd = true;
      this.OJd.DeepCopy(this.Camera.D_K2_GetActorLocation());
      this.cz.DeepCopy(this.BasicLocation);
      this.cz.SubtractionEqual(this.OJd);
      this.GJd = this.cz.Size();
      this.FJd = this.BJd;
      this.NJd = this.GJd * Math.tan(this.FJd * 0.5 * MathUtils_1.MathUtils.DegToRad);
      this.Iii = 0;
      this.VJd = i;
      this.jJd = false;
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS 1200");
    }
  }
  EnableOrthographicToPerspectiveToView(t, i = undefined) {
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 57, "[正交镜头]启动正交镜头，从正交过渡到透视1", ["FadeOutTime", this.FadeOutTime], ["BasicLocation", this.BasicLocation]);
      }
      this.Camera = t;
      this.qJd = true;
      this.OJd.DeepCopy(this.Camera.D_K2_GetActorLocation());
      this.cz.DeepCopy(this.BasicLocation);
      this.cz.SubtractionEqual(this.OJd);
      this.GJd = this.cz.Size();
      this.FJd = this.Camera.GetCineCameraComponent().FieldOfView;
      this.NJd = this.GJd * Math.tan(this.FJd * 0.5 * MathUtils_1.MathUtils.DegToRad);
      this.Iii = 0;
      this.VJd = i;
      this.jJd = false;
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.TargetFPS -1");
    }
  }
  Update(t) {
    var i;
    var e;
    var s;
    if (this.kJd) {
      this.Iii = Math.min(this.Iii + t, this.FadeInTime);
      s = MathUtils_1.MathUtils.IsNearlyZero(this.FadeInTime) ? 1 : this.Iii / this.FadeInTime;
      i = MathUtils_1.MathUtils.Lerp(this.FJd, MINI_CAMER_FOV, s);
      e = this.NJd / Math.tan(i * 0.5 * MathUtils_1.MathUtils.DegToRad);
      this.cie.DeepCopy(this.Camera.K2_GetActorRotation());
      this.cie.Vector(this.cz);
      this.fz.DeepCopy(this.OJd);
      this.fz.SubtractionEqual(this.cz.MultiplyEqual(e - this.GJd));
      this.Camera.D_K2_SetActorLocation(this.fz.ToUeVector(), false, undefined, false);
      this.Camera.GetCineCameraComponent().SetFieldOfView(i);
      this.Camera.GetCineCameraComponent().FocusSettings.ManualFocusDistance = e;
      if (s >= 1 || this.Camera.GetCineCameraComponent().FieldOfView <= MINI_CAMER_FOV) {
        this.kJd = false;
        this.VJd?.();
      }
    } else if (this.qJd && (this.Iii = Math.min(this.Iii + t, this.FadeOutTime), i = MathUtils_1.MathUtils.IsNearlyZero(this.FadeOutTime) ? 1 : this.Iii / this.FadeOutTime, e = MathUtils_1.MathUtils.Lerp(this.FJd, this.BJd, i), s = this.NJd / Math.tan(e * 0.5 * MathUtils_1.MathUtils.DegToRad), this.cie.DeepCopy(this.Camera.K2_GetActorRotation()), this.cie.Vector(this.cz), this.fz.DeepCopy(this.OJd), this.fz.SubtractionEqual(this.cz.MultiplyEqual(s - this.GJd)), this.Camera.D_K2_SetActorLocation(this.fz.ToUeVector(), false, undefined, false), this.Camera.GetCineCameraComponent().SetFieldOfView(e), this.Camera.GetCineCameraComponent().FocusSettings.ManualFocusDistance = s, this.Iii > this.HJd && !this.jJd && (this.jJd = true, this.VJd?.()), i >= 1 || this.Camera.GetCineCameraComponent().FieldOfView >= this.BJd)) {
      this.qJd = false;
    }
  }
}
exports.CameraAberrationView = CameraAberrationView;
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
    this.IsCameraAberrationEnable = false;
    this.CameraAberrationView = undefined;
  }
  Clear() {
    if (this.Camera?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("SceneSubCamera.Clear", this.Camera);
      this.Camera = undefined;
    }
  }
  CopyData(t) {
    if (t?.Camera?.IsValid()) {
      this.Camera.D_K2_SetActorTransform(new UE.TransformDouble(t.Camera.K2_GetActorRotation(), t.Camera.D_K2_GetActorLocation(), new UE.VectorDouble(1, 1, 1)), false, undefined, true);
      this.FadeIn = t.FadeIn;
      this.FadeOut = t.FadeOut;
      this.IsKeepUi = t.IsKeepUi;
    }
  }
}
(exports.SceneSubCamera = SceneSubCamera).Compare = (t, i) => {
  let e = t.Type - i.Type;
  if (e === 0) {
    e--;
  }
  return e;
};
let SceneCameraDisplayComponent = class SceneCameraDisplayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.uxr = undefined;
    this.cxr = undefined;
    this.mxr = undefined;
    this.dxr = undefined;
    this.Cxr = 0;
    this.zQu = 1;
    this.OnModeChanged = (t, i) => {
      if (t === 3 && this.IsIdle()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Camera", 45, "SceneCameraDisplayComponent退出Scene相机");
        }
        CameraController_1.CameraController.ExitCameraMode(3, 1, 0, 0, () => {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Shadow.EnableCSMStable 1");
        });
        this.ClearRemovedSceneCamera();
      } else if (i === 3 && t !== i) {
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
    this.MEu = (t, i) => {
      TimerSystem_1.TimerSystem.Next(() => {
        this.zQu = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
      });
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
    this.zQu = 1;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSwitchSelfCenteredMode, this.MEu);
    return true;
  }
  OnChangeTimeDilation(t) {
    if (this.uxr?.IsValid()) {
      this.uxr.CustomTimeDilation = t;
    }
  }
  GetUnBoundSceneCamera(t) {
    var i;
    if (!this.cxr.Empty) {
      if (this.dxr.IsBinding) {
        (i = new SceneSubCamera()).Camera = CameraController_1.CameraController.SpawnCineCamera();
        i.Type = t;
        this.cxr.Push(i);
        return i;
      } else {
        this.gxr();
        this.dxr.Type = t;
        this.dxr.IsBinding = true;
        this.cxr.Update(this.dxr);
        return this.dxr;
      }
    }
  }
  RemoveBoundSceneCamera(t) {
    if (!this.cxr.Empty && t) {
      t.IsBinding = false;
      if (this.dxr === t) {
        this.gxr();
        this.cxr.Update(this.dxr);
      } else {
        this.cxr.Remove(t);
        this.mxr.push(t);
        if (this.IsIdle()) {
          this.dxr.CopyData(t);
        }
      }
    }
  }
  IsIdle() {
    return !this.cxr.Empty && this.cxr.Top === this.dxr && !this.dxr.IsBinding;
  }
  ClearRemovedSceneCamera() {
    for (const t of this.mxr) {
      t.Clear();
    }
    this.mxr.length = 0;
  }
  UpdateViewTarget(t) {
    if (t !== undefined) {
      CameraController_1.CameraController.SetViewTarget(this.CurSceneSubCamera.Camera, "SceneCamera.UpdateViewTarget", t, 0, undefined, true, true);
    } else {
      CameraController_1.CameraController.SetViewTarget(this.CurSceneSubCamera.Camera, "SceneCamera.UpdateViewTarget2", this.CurSceneSubCamera.FadeIn, this.CurSceneSubCamera.FadeInFunc, this.CurSceneSubCamera.FadeInExp, true, true);
    }
  }
  EnableExtraCameraAction() {
    this.EnablePerspectiveToOrthographicView();
  }
  EnablePerspectiveToOrthographicView(t = undefined) {
    if (this.CurSceneSubCamera.IsCameraAberrationEnable && this.CurSceneSubCamera.CameraAberrationView) {
      this.CurSceneSubCamera.CameraAberrationView.EnablePerspectiveToOrthographicView(this.CurSceneSubCamera.Camera, t);
    }
  }
  EnableOrthographicToPerspectiveView(t = undefined) {
    if (this.CurSceneSubCamera.IsCameraAberrationEnable && this.CurSceneSubCamera.CameraAberrationView) {
      this.CurSceneSubCamera.IsCameraAberrationEnable = false;
      this.CurSceneSubCamera.CameraAberrationView.EnableOrthographicToPerspectiveToView(this.CurSceneSubCamera.Camera, t);
    } else {
      t?.();
    }
  }
  OnAfterTick(t) {
    t = t * MathUtils_1.MathUtils.MillisecondToSecond * this.zQu;
    if (this.CurSceneSubCamera?.CameraAberrationView) {
      this.CurSceneSubCamera.CameraAberrationView.Update(t);
    }
  }
  gxr() {
    this.dxr.IsBinding = false;
    this.dxr.Camera.CameraComponent.bConstrainAspectRatio = false;
    this.dxr.Type = 2;
    this.dxr.IsKeepUi = true;
  }
  SetUiActive(t) {
    if (t) {
      if (this.Cxr > 0) {
        this.Cxr--;
      }
    } else {
      this.Cxr++;
    }
    if ((this.Cxr === 0 || !t) && (!(this.Cxr > 1) || !!t)) {
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Pop, t);
      UiLayer_1.UiLayer.SetLayerActive(UiLayerType_1.ELayerType.Float, t);
      if (t) {
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
  OnEnd() {
    this.zQu = 1;
    return true;
  }
};
SceneCameraDisplayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(7)], SceneCameraDisplayComponent);
exports.SceneCameraDisplayComponent = SceneCameraDisplayComponent; //# sourceMappingURL=SceneCameraDisplayComponent.js.map