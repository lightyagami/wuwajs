"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovingShotManager = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SequenceDefine_1 = require("./Sequence/SequenceDefine");
class CameraSequencePlayer {
  constructor() {
    this.lYi = undefined;
    this._Yi = ResourceSystem_1.ResourceSystem.InvalidId;
    this.sye = false;
    this.uYi = false;
    this.cYi = t => {
      var i;
      var s;
      this._Yi = ResourceSystem_1.ResourceSystem.InvalidId;
      if (t && ObjectUtils_1.ObjectUtils.IsValid(t)) {
        i = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
        this.lYi = i;
        this.lYi.SetSequence(t);
        if (this.uYi) {
          t = ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera.D_GetTransform();
          this.lYi.bOverrideInstanceData = true;
          s = this.lYi.DefaultInstanceData;
          t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(t);
          s.TransformOrigin = t;
        }
        s = UE.NewArray(UE.Actor);
        t = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera;
        s.Add(t);
        t.ResetSeqCineCamSetting();
        this.lYi.SetBindingByTag(SequenceDefine_1.CAMERA_TAG, s, false, true);
        i.SequencePlayer.OnStop.Add(this.mYi);
        i.SequencePlayer.Play();
      }
    };
    this.mYi = () => {
      this.Stop();
    };
  }
  Play(t, i) {
    if (this.sye) {
      this.Stop();
    }
    this.sye = true;
    this.uYi = i;
    this._Yi = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, this.cYi);
  }
  Stop() {
    if (this.sye) {
      this.sye = false;
      if (this._Yi !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this._Yi);
        this._Yi = ResourceSystem_1.ResourceSystem.InvalidId;
      }
      if (this.lYi) {
        this.lYi.SequencePlayer.OnStop.Clear();
        this.lYi.SequencePlayer.Stop();
        this.lYi.ResetBindings();
        ActorSystem_1.ActorSystem.Put("CameraSequencePlayer.Stop", this.lYi);
      }
      this.lYi = undefined;
    }
  }
}
class CameraParam {
  constructor() {
    this.Aperture = undefined;
    this.FocalLength = 0;
    this.FocusDistance = 0;
    this.FocalRegion = 0;
  }
  get ApertureEnable() {
    return this.Aperture !== undefined;
  }
  get FocalLengthEnable() {
    return this.FocalLength !== undefined && this.FocalLength !== 0;
  }
  get FocusDistanceEnable() {
    return this.FocusDistance !== undefined;
  }
  get FocalRegionEnable() {
    return this.FocalRegion !== undefined;
  }
}
class CameraCurvePlayer {
  constructor() {
    this.dYi = undefined;
    this.fDe = undefined;
    this.Qih = new CameraParam();
    this.Kih = new CameraParam();
    this.CYi = Transform_1.Transform.Create();
    this.gYi = 0;
    this.zZt = 0;
    this.sye = false;
  }
  Play(t) {
    if (this.sye) {
      this.Stop();
    }
    this.sye = true;
    this.dYi = PublicUtil_1.PublicUtil.CreateTransformFromConfig(t.Start.Pos, t.Start.Rot, Vector_1.Vector.OneVectorProxy);
    this.fDe = PublicUtil_1.PublicUtil.CreateTransformFromConfig(t.End.Pos, t.End.Rot, Vector_1.Vector.OneVectorProxy);
    this.gYi = t.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.CYi.SetScale3D(Vector_1.Vector.OneVectorProxy);
    this.Qih.Aperture = t.Start.Aperture;
    this.Qih.FocalLength = t.Start.FocalLength;
    this.Qih.FocusDistance = t.Start.FocusDistance;
    this.Qih.FocalRegion = t.Start.FocalRegion;
    this.Kih.Aperture = t.End.Aperture;
    this.Kih.FocalLength = t.End.FocalLength;
    this.Kih.FocusDistance = t.End.FocusDistance;
    this.Kih.FocalRegion = t.End.FocalRegion;
    var t = ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera;
    var i = t.CameraComponent;
    t.D_K2_SetActorTransform(this.dYi.ToUeTransform(), false, undefined, true);
    if (this.Qih.ApertureEnable) {
      i.CurrentAperture = this.Qih.Aperture;
    }
    if (this.Qih.FocalLengthEnable) {
      i.CurrentFocalLength = this.Qih.FocalLength;
    }
    if (this.Qih.FocusDistanceEnable) {
      i.FocusSettings.ManualFocusDistance = this.Qih.FocusDistance;
    }
    if (this.Qih.FocalRegionEnable) {
      i.CurrentFocalRegion = this.Qih.FocalRegion;
    }
  }
  Stop() {
    if (this.sye) {
      this.zZt = 0;
      this.gYi = 0;
      this.dYi = undefined;
      this.fDe = undefined;
      this.CYi.Reset();
      this.sye = false;
    }
  }
  OnTick(t) {
    var i;
    var s;
    var e;
    var h;
    if (this.sye) {
      i = (h = ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.DisplayComponent.CineCamera).CameraComponent;
      this.zZt += t;
      if (this.zZt > this.gYi) {
        h.D_K2_SetActorTransform(this.fDe.ToUeTransform(), false, undefined, true);
        if (this.Kih.ApertureEnable) {
          i.CurrentAperture = this.Kih.Aperture;
        }
        if (this.Kih.FocalLengthEnable) {
          i.CurrentFocalLength = this.Kih.FocalLength;
        }
        if (this.Kih.FocusDistanceEnable) {
          i.FocusSettings.ManualFocusDistance = this.Kih.FocusDistance;
        }
        if (this.Kih.FocalRegionEnable) {
          i.CurrentFocalRegion = this.Kih.FocalRegion;
        }
        this.Stop();
      } else {
        t = this.zZt / this.gYi;
        t = MathUtils_1.MathUtils.GetCubicValue(t);
        s = this.CYi.GetLocation();
        e = this.CYi.GetRotation();
        Vector_1.Vector.Lerp(this.dYi.GetLocation(), this.fDe.GetLocation(), t, s);
        Quat_1.Quat.Slerp(this.dYi.GetRotation(), this.fDe.GetRotation(), t, e);
        h.D_K2_SetActorTransform(this.CYi.ToUeTransform(), false, undefined, true);
        if (this.Qih.ApertureEnable && this.Kih.ApertureEnable) {
          i.CurrentAperture = MathUtils_1.MathUtils.Lerp(this.Qih.Aperture, this.Kih.Aperture, t);
        }
        if (this.Qih.FocalLengthEnable && this.Kih.FocalLengthEnable) {
          s = MathUtils_1.MathUtils.Lerp(this.Qih.FocalLength, this.Kih.FocalLength, t);
          i.CurrentFocalLength = s;
        }
        if (this.Qih.FocusDistanceEnable && this.Kih.FocusDistanceEnable) {
          e = MathUtils_1.MathUtils.Lerp(this.Qih.FocusDistance, this.Kih.FocusDistance, t);
          i.FocusSettings.ManualFocusDistance = e;
        }
        if (this.Qih.FocalRegionEnable && this.Kih.FocalRegionEnable) {
          h = MathUtils_1.MathUtils.Lerp(this.Qih.FocalRegion, this.Kih.FocalRegion, t);
          i.CurrentFocalRegion = h;
        }
      }
    }
  }
}
class CameraShakePlayer {
  constructor() {
    this.fYi = ResourceSystem_1.ResourceSystem.InvalidId;
    this.pYi = undefined;
    this.sye = false;
  }
  Play(t) {
    if (this.sye) {
      this.Stop();
    }
    this.sye = true;
    this.fYi = ResourceSystem_1.ResourceSystem.LoadAsync(t.CameraShakeBp + "_C", UE.Class, t => {
      this.fYi = ResourceSystem_1.ResourceSystem.InvalidId;
      if (t?.IsValid()) {
        this.pYi = Global_1.Global.CharacterCameraManager.StartMatineeCameraShake(t);
      }
    });
  }
  Stop() {
    if (this.sye && (this.sye = false, this.fYi !== ResourceSystem_1.ResourceSystem.InvalidId && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.fYi), this.fYi = ResourceSystem_1.ResourceSystem.InvalidId), this.pYi)) {
      Global_1.Global.CharacterCameraManager.StopCameraShake(this.pYi);
      this.pYi = undefined;
    }
  }
}
class MovingShotManager {
  constructor() {
    this.$pt = new CameraSequencePlayer();
    this.vYi = new CameraCurvePlayer();
    this.MYi = new CameraShakePlayer();
  }
  Play(t) {
    this.Stop();
    switch (t.Type) {
      case IAction_1.EShowTalkCameraMotionType.Preset:
        var i = t;
        if (!StringUtils_1.StringUtils.IsEmpty(i.Sequence)) {
          this.$pt.Play(i.Sequence, true);
        }
        if (i.CamShake) {
          this.MYi.Play(i.CamShake);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "剧情预设运镜开始", ["path", i.Sequence], ["shake", i.CamShake?.CameraShakeBp]);
        }
        break;
      case IAction_1.EShowTalkCameraMotionType.Tween:
        i = t;
        this.vYi.Play(i);
        if (i.CamShake) {
          this.MYi.Play(i.CamShake);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "剧情插值运镜开始", ["shake", i.CamShake?.CameraShakeBp]);
        }
    }
  }
  Stop() {
    this.$pt.Stop();
    this.vYi.Stop();
    this.MYi.Stop();
  }
  OnTick(t) {
    this.vYi.OnTick(t);
  }
}
exports.MovingShotManager = MovingShotManager;
//# sourceMappingURL=MovingShotManager.js.map