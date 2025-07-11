"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraAnimation = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
class UiCameraAnimation {
  constructor() {
    this.eAo = undefined;
    this.tAo = undefined;
    this.iAo = 0;
    this.I1e = undefined;
    this.oAo = undefined;
    this.qae = undefined;
    this.rAo = undefined;
    this.nAo = undefined;
    this.sAo = undefined;
    this.aAo = undefined;
    this.hAo = -0;
    this.fwl = -0;
    this.lAo = undefined;
    this._Ao = new Map();
    this.uAo = -0;
    this.cAo = undefined;
    this.mAo = undefined;
    this.dAo = undefined;
    this.CAo = undefined;
    this.gAo = () => {
      this.fAo();
    };
  }
  async AsyncPlayUiCameraAnimation(i, t, s) {
    this.pAo();
    this.PlayUiCameraAnimation(i, t, s);
    return this.vAo().Promise;
  }
  pAo() {
    this.cAo ||= new CustomPromise_1.CustomPromise();
  }
  vAo() {
    return this.cAo;
  }
  async WaitCameraAnimationFinished() {
    this.pAo();
    return this.vAo().Promise;
  }
  PlayUiCameraAnimation(i, t, s) {
    this.ResetUiCameraBlendAnimation();
    if (t.CanApplyAnimationHandle()) {
      if (this.MAo(i, s, t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CameraAnimation", 58, "播放界面摄像机动画------开始", ["fromHandleName", i.ToString()], ["toHandleName", t.ToString()], ["blendDataName", s], ["timeLength", this.uAo]);
        }
        this.eAo.Deactivate();
        UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(Vector_1.Vector.ZeroVectorDouble);
        this.eAo.SetWidgetCameraAttachToAnimationActor();
        if (this.uAo <= 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("CameraAnimation", 58, "播放界面摄像机动画时间<=0，会立马结束动画", ["timeLength", this.uAo]);
          }
          this.EAo();
        } else {
          this.SAo();
          this.yAo(this.tAo.LevelSequence, this.tAo.PlayRate, this.tAo.bReverse);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "刷新动画数据失败", ["fromHandleName", i.ToString()], ["toHandleName", t.ToString()], ["blendDataName", s]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "无法播放镜头动画：原因是找不到对应插槽或骨骼模型为空", ["toHandleData", t.ToString()]);
    }
  }
  MAo(i, t, s) {
    this.mAo = i;
    this.dAo = s;
    this.eAo = UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle();
    this.tAo = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationBlendData(t);
    return !!this.eAo && !!this.tAo && !!this.mAo && (i = UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure, s = UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent, this.IAo(i.GetActorLocation(), i.GetActorRotation(), i.GetSpringArmLength(), i.GetSpringRelativeLocation(), i.GetSpringRelativeRotation(), s.GetFieldOfView(), s.GetManualFocusDistance(), s.GetCurrentAperture(), s.GetPostProcessBlendWeight(), this.tAo.Time), true);
  }
  IAo(i, t, s, a, e, h, r, o, n, m) {
    this.I1e = i;
    this.oAo = t;
    this.qae = s;
    this.rAo = a;
    this.nAo = e;
    this.sAo = h;
    this.aAo = r;
    this.hAo = o;
    this.lAo = n;
    this.uAo = m;
  }
  StopUiCameraAnimation() {
    var i;
    if (this.dAo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CameraAnimation", 58, "播放界面摄像机动画------停止", ["fromHandleName", this.mAo?.ToString()], ["toHandleName", this.dAo?.ToString()]);
      }
      if (this.cAo) {
        i = {
          FinishType: 1,
          FromHandleData: this.mAo,
          ToHandleData: this.dAo
        };
        this.cAo.SetResult(i);
        this.cAo = undefined;
      }
      this.fAo(true, 1);
      this.ResetUiCameraBlendAnimation();
    }
  }
  EAo() {
    var i;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CameraAnimation", 58, "播放界面摄像机动画------完成", ["fromHandleName", this.mAo.ToString()], ["toHandleName", this.dAo?.ToString()]);
    }
    if (this.cAo) {
      i = {
        FinishType: 0,
        FromHandleData: this.mAo,
        ToHandleData: this.dAo
      };
      this.cAo.SetResult(i);
      this.cAo = undefined;
    }
    this.fAo();
    this.ResetUiCameraBlendAnimation();
  }
  ResetUiCameraBlendAnimation() {
    this.tAo = undefined;
    this.eAo = undefined;
    this.mAo = undefined;
    this.dAo = undefined;
    this.I1e = undefined;
    this.oAo = undefined;
    this.qae = undefined;
    this.rAo = undefined;
    this.nAo = undefined;
    this.sAo = undefined;
    this.aAo = undefined;
    this.lAo = undefined;
    this.iAo = 0;
    this.uAo = 0;
    this.CAo = undefined;
    this._Ao.clear();
  }
  yAo(i, t, s) {
    var a;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(i)) {
      this.fAo(true, 1);
      (a = UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent).AddUiCameraSequenceFinishedCallback(this.gAo);
      a.LoadAndPlayUiCameraSequence(i, t, s);
    }
  }
  fAo(i = true, t = 0) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent?.DestroyUiCameraSequence(i, t);
  }
  Tick(i) {
    if (this.tAo && this.eAo) {
      this.iAo += i / TimeUtil_1.TimeUtil.InverseMillisecond;
      if (this.iAo >= this.uAo) {
        this.EAo();
      } else if (this.dAo) {
        i = this.dAo.GetUiCameraAnimationConfig();
        this.TAo(i.LocationType);
        this.LAo();
        this.DAo(this.dAo.GetTargetArmLength());
        this.RAo(this.dAo.GetTargetArmOffsetLocation());
        this.UAo(this.dAo.GetTargetArmOffsetRotation());
        this.AAo(this.dAo.GetTargetFieldOfView());
        this.PAo(this.dAo.GetTargetFocalDistance());
        this.xAo(this.dAo.GetTargetAperture());
        this.vwl(this.dAo.GetTargetFocalRegion());
        this.wAo(this.dAo.GetTargetPostProcessBlendWeight());
      }
    }
  }
  IsPlaying() {
    return this.iAo < this.uAo;
  }
  TAo(i) {
    var t = this.dAo.GetTargetLocation();
    if (t) {
      this.BAo(t, i !== 0);
    }
  }
  LAo() {
    var i = this.dAo.GetTargetRotation();
    if (i) {
      this.bAo(i);
    }
  }
  BAo(i, t) {
    var s = this.qAo(1);
    if (s !== undefined) {
      i = UE.KismetMathLibrary.D_VLerp(this.I1e, i, s);
      if (t) {
        this.eAo.SetUiCameraAnimationRelativeLocation(i);
      } else {
        this.eAo.SetUiCameraAnimationLocation(i);
      }
    }
  }
  bAo(i) {
    var t = this.qAo(2);
    if (t) {
      i = UE.KismetMathLibrary.RLerp(this.oAo, i, t, true);
      this.eAo.SetUiCameraAnimationRotation(i);
    }
  }
  DAo(i) {
    var t = this.qAo(3);
    if (t) {
      i = MathUtils_1.MathUtils.Lerp(this.qae, i, t);
      this.eAo.SetSpringArmLength(i);
    }
  }
  RAo(i) {
    var t = this.qAo(4);
    if (t) {
      i = UE.KismetMathLibrary.D_VLerp(this.rAo, i, t);
      this.eAo.SetSpringArmRelativeLocation(i);
    }
  }
  UAo(i) {
    var t = this.qAo(5);
    if (t) {
      i = UE.KismetMathLibrary.RLerp(this.nAo, i, t, true);
      this.eAo.SetSprintArmRelativeRotation(i);
    }
  }
  AAo(i) {
    var t = this.qAo(6);
    if (t) {
      i = MathUtils_1.MathUtils.Lerp(this.sAo, i, t);
      this.eAo.SetCameraFieldOfView(i);
    }
  }
  PAo(i) {
    var t = this.qAo(7);
    if (t) {
      i = MathUtils_1.MathUtils.Lerp(this.aAo, i, t);
      this.eAo.SetCameraFocalDistance(i);
    }
  }
  xAo(i) {
    var t = this.qAo(9);
    if (t) {
      i = MathUtils_1.MathUtils.Lerp(this.hAo, i, t);
      this.eAo.SetCameraAperture(i);
    }
  }
  vwl(i) {
    var t = this.qAo(10);
    if (t) {
      i = MathUtils_1.MathUtils.Lerp(this.fwl, i, t);
      this.eAo.SetCameraFocalRegion(i);
    }
  }
  wAo(i) {
    var t = this.qAo(8);
    if (t) {
      i = MathUtils_1.MathUtils.Lerp(this.lAo, i, t);
      this.eAo.SetCameraPostProcessBlendWeight(i);
    }
  }
  qAo(i) {
    return this.GetCurveFloatValue(i, this.iAo);
  }
  SAo() {
    var i;
    if (!this.CAo?.IsValid()) {
      i = this.tAo?.CommonCurve;
      if (UE.KismetSystemLibrary.IsValidSoftObjectReference(i)) {
        i = i.ToAssetPathName();
        if (!StringUtils_1.StringUtils.IsEmpty(i)) {
          ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, i => {
            this.CAo = i;
          });
        }
      }
    }
    if (this._Ao.size <= 0) {
      var t = this.tAo?.CurveMap;
      var s = t.GetMaxIndex();
      for (let i = 0; i < s; i++) {
        const e = t.GetKey(i).valueOf();
        var a = t.Get(e);
        if (UE.KismetSystemLibrary.IsValidSoftObjectReference(a)) {
          a = a.ToAssetPathName();
          if (!StringUtils_1.StringUtils.IsEmpty(a)) {
            ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.CurveFloat, i => {
              this._Ao.set(e, i);
            });
          }
        }
      }
    }
  }
  GetCurveFloat(i) {
    i = this._Ao.get(i);
    return i || this.CAo;
  }
  GetCurveFloatValue(i, t) {
    if (t > this.GetTimeLength) {
      return 1;
    } else if (i = this.GetCurveFloat(i)) {
      i = i.GetFloatValue(t);
      return Math.min(i, 1);
    } else {
      return undefined;
    }
  }
  get GetTimeLength() {
    return this.uAo;
  }
}
exports.UiCameraAnimation = UiCameraAnimation;
//# sourceMappingURL=UiCameraAnimation.js.map