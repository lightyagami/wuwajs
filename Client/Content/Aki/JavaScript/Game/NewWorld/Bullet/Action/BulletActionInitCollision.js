"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionInitCollision = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const CombatLog_1 = require("../../../Utils/CombatLog");
const BulletConstant_1 = require("../BulletConstant");
const BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionInitCollision extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.CollisionInfo = undefined;
  }
  Clear() {
    super.Clear();
    this.CollisionInfo = undefined;
  }
  OnExecute() {
    this.CollisionInfo = this.BulletInfo.CollisionInfo;
    var t = this.BulletInfo.BulletDataMain;
    this.CollisionInfo.StageInterval = 1;
    this.CollisionInfo.AllowedEnergy = true;
    var i = t.Base.CollisionActiveDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.CollisionInfo.ActiveDelayMs = i > 0 ? i : 0;
    this.CollisionInfo.ActiveLengthMs = t.Base.CollisionActiveDuration * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.CollisionInfo.IsPassDelay = this.CollisionInfo.ActiveDelayMs <= 0;
    this.CollisionInfo.IntervalMs = t.Base.Interval * TimeUtil_1.TimeUtil.InverseMillisecond;
    var i = this.BulletInfo.AdditionInfo;
    if (i?.Valid) {
      this.CollisionInfo.IntervalMs *= i.IntervalScale;
    }
    this.CollisionInfo.IsProcessOpen = this.CollisionInfo.IsPassDelay;
    this.CollisionInfo.FinalScale.FromUeVector(t.Scale.SizeScale);
    this.CollisionInfo.DamageId = t.Base.DamageId;
    this.CollisionInfo.BeHitEffect = t.Base.BeHitEffect;
    this.CollisionInfo.WeaknessBeHitEffect = t.Base.HitEffectWeakness;
    this.CollisionInfo.NeedHitObstacles = t.Logic.DestroyOnHitObstacle || this.BulletInfo.ChildInfo?.HaveSpecialChildrenBullet || t.Render.EffectOnHit.has(2) || this.BulletInfo.ActionLogicComponent.ObstaclesDetect;
    if (Info_1.Info.IsPlayInEditor && this.CollisionInfo.NeedHitObstacles && t.Base.IsOversizeForTrace) {
      CombatLog_1.CombatLog.Error("Bullet", undefined, "子弹尺寸过大，不会开启射线检测, 请用子弹检测工具查看具体原因", ["BulletId", this.BulletInfo.BulletRowName]);
    }
    this.k5o(t.Base.Shape, this.BulletInfo.BaseSize);
    if (this.BulletInfo.CloseCollision || t.Base.Shape === 4) {
      this.BulletInfo.IsCollisionRelativeLocationZero = true;
    } else {
      this.F5o();
      if (this.BulletInfo.IsCollisionRelativeRotationModify) {
        if (this.CollisionInfo.CollisionComponent) {
          this.CollisionInfo.CollisionComponent.K2_SetRelativeRotation(t.Base.Rotator.ToUeRotator(), false, undefined, true);
        } else if (this.CollisionInfo.RegionComponent) {
          this.CollisionInfo.RegionComponent.K2_SetRelativeRotation(t.Base.Rotator.ToUeRotator(), false, undefined, true);
        }
      }
      this.CollisionInfo.HasObstaclesCollision = t.Obstacle.Radius > 0;
      this.V5o();
    }
    this.CollisionInfo.LastFramePosition.FromUeVector(this.BulletInfo.GetCollisionLocation(false));
    if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "BulletActionInitCollision", ["Bullet", this.BulletInfo?.BulletRowName], ["Location", this.CollisionInfo.LastFramePosition]);
    }
    if (this.CollisionInfo.ActiveDelayMs <= 0) {
      this.CollisionInfo.IsStartup = true;
    }
  }
  k5o(t, i) {
    switch (t) {
      case 0:
        this.H5o();
        break;
      case 1:
        this.j5o();
        break;
      case 2:
        this.W5o();
        break;
      case 3:
        this.K5o();
        break;
      case 4:
        this.Q5o();
        break;
      case 6:
        this.X5o(UE.KuroRegionBoxComponent.StaticClass());
        this.BulletInfo.CloseCollision = i.X <= 0 || i.Y <= 0 || i.Z <= 0;
        break;
      case 7:
        this.BulletInfo.CloseCollision = i.X <= 0;
        break;
      case 8:
        this.X5o(UE.KuroRegionSectorComponent.StaticClass());
        this.BulletInfo.CloseCollision = i.X <= 0 || i.Z <= 0;
        break;
      case 9:
        this.X5o(UE.KuroRegionCylinderComponent.StaticClass());
        this.BulletInfo.CloseCollision = i.X <= 0 || i.Z <= 0;
    }
  }
  H5o() {
    var t = this.BulletInfo.BulletDataMain;
    var i = this.BulletInfo.Actor;
    var s = this.BulletInfo.BaseSize;
    var l = i.GetComponentByClass(UE.BoxComponent.StaticClass());
    var e = l ?? i.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true);
    this.BulletInfo.CloseCollision = s.X <= 0 || s.Y <= 0 || s.Z <= 0;
    var s = e;
    this.CollisionInfo.CollisionComponent = s;
    if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(this.BulletInfo.Attacker.Id)) {
      s.LineThickness = 5;
      s.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow;
    }
    s.SetCollisionProfileName(t.Logic.ProfileName);
    this.SetCollisionIgnoreChannels(s);
    if (!l) {
      if (GlobalData_1.GlobalData.IsPlayInEditor && BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor) {
        this.CollisionInfo.CollisionComponent.CreationMethod = 3;
      }
      i.FinishAddComponent(s, false, MathUtils_1.MathUtils.DefaultTransform);
    }
  }
  j5o() {
    var t = this.BulletInfo.BulletDataMain;
    var i = this.BulletInfo.Actor;
    var s = this.BulletInfo.BaseSize;
    var l = i.GetComponentByClass(UE.SphereComponent.StaticClass());
    var e = l ?? i.AddComponentByClass(UE.SphereComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true);
    this.BulletInfo.CloseCollision = s.X <= 0;
    var s = e;
    (this.CollisionInfo.CollisionComponent = s).SetCollisionProfileName(t.Logic.ProfileName);
    this.SetCollisionIgnoreChannels(s);
    if (!l) {
      if (GlobalData_1.GlobalData.IsPlayInEditor && BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor) {
        this.CollisionInfo.CollisionComponent.CreationMethod = 3;
      }
      i.FinishAddComponent(s, false, MathUtils_1.MathUtils.DefaultTransform);
    }
  }
  W5o() {
    var t = this.BulletInfo.BulletDataMain;
    var i = this.BulletInfo.Actor;
    var s = this.BulletInfo.BaseSize;
    this.BulletInfo.CloseCollision = s.X <= 0 || s.Z <= 0;
    var s = i.GetComponentByClass(UE.BoxComponent.StaticClass());
    var l = s ?? i.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true);
    this.CollisionInfo.CollisionComponent = l;
    if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(this.BulletInfo.Attacker.Id)) {
      l.LineThickness = 2;
      l.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow;
    }
    l.SetCollisionProfileName(t.Logic.ProfileName);
    this.SetCollisionIgnoreChannels(l);
    if (!s) {
      if (GlobalData_1.GlobalData.IsPlayInEditor && BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor) {
        this.CollisionInfo.CollisionComponent.CreationMethod = 3;
      }
      i.FinishAddComponent(l, false, MathUtils_1.MathUtils.DefaultTransform);
    }
  }
  K5o() {
    var t = this.BulletInfo.BulletDataMain;
    var i = this.BulletInfo.Actor;
    var s = this.BulletInfo.BaseSize;
    this.BulletInfo.CloseCollision = s.X <= 0 || s.Z <= 0;
    var s = i.GetComponentByClass(UE.BoxComponent.StaticClass());
    var l = s ?? i.AddComponentByClass(UE.BoxComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, true);
    this.CollisionInfo.CollisionComponent = l;
    if (ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(this.BulletInfo.Attacker.Id)) {
      l.LineThickness = 2;
      l.ShapeColor = ColorUtils_1.ColorUtils.ColorYellow;
    }
    l.SetCollisionProfileName(t.Logic.ProfileName);
    this.SetCollisionIgnoreChannels(l);
    if (!s) {
      if (GlobalData_1.GlobalData.IsPlayInEditor && BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor) {
        this.CollisionInfo.CollisionComponent.CreationMethod = 3;
      }
      i.FinishAddComponent(l, false, MathUtils_1.MathUtils.DefaultTransform);
    }
  }
  Q5o() {
    var t = this.BulletInfo.BulletDataMain;
    var i = this.BulletInfo.RayInfo;
    i.Speed = this.BulletInfo.Size.X / TimeUtil_1.TimeUtil.InverseMillisecond;
    i.BlockByCharacter = t.Base.SpecialParams.get(1) !== "f";
  }
  X5o(t) {
    var i = this.BulletInfo.Actor;
    var s = GlobalData_1.GlobalData.IsPlayInEditor && BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor;
    var l = i.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass());
    var e = l ?? i.AddComponentByClass(UE.KuroRegionDetectComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, s);
    this.CollisionInfo.RegionDetectComponent = e;
    var h = i.GetComponentByClass(t);
    var t = h ?? i.AddComponentByClass(t, false, MathUtils_1.MathUtils.DefaultTransform, s);
    this.CollisionInfo.RegionComponent = t;
    e.RegionMap.Set(BulletConstant_1.BulletConstant.RegionKey, t);
    if (s) {
      if (!l) {
        e.CreationMethod = 3;
        i.FinishAddComponent(e, false, MathUtils_1.MathUtils.DefaultTransform);
      }
      if (!h) {
        t.CreationMethod = 3;
        i.FinishAddComponent(t, false, MathUtils_1.MathUtils.DefaultTransform);
      }
    }
  }
  F5o() {
    var t = this.BulletInfo.BulletDataMain;
    var i = this.CollisionInfo.CollisionComponent;
    var s = this.CollisionInfo.RegionComponent;
    var l = this.CollisionInfo.CenterLocalLocation;
    l.FromUeVector(t.Base.CenterOffset);
    var e = t.Base.Shape;
    if (e === 7) {
      if (!l.IsZero()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Bullet", 17, "出于性能考虑，大球体的中心位置偏移不会生效");
        }
        l.Reset();
      }
      this.BulletInfo.IsCollisionRelativeLocationZero = true;
    } else {
      e = this.BulletInfo.Size;
      if (t.Base.Shape !== 2) {
        if (l.IsZero()) {
          this.BulletInfo.IsCollisionRelativeLocationZero = true;
        } else if (i) {
          i.D_K2_SetRelativeLocation(l.ToUeVector(), false, undefined, true);
        } else if (s) {
          s.D_K2_SetRelativeLocation(l.ToUeVector(), false, undefined, true);
        }
      } else if (e.Y >= 360) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "扇形子弹的角度超过360！请使用柱形", ["ID", this.BulletInfo.BulletRowName]);
        }
        e.Y = 360;
      } else if (e.Y <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "扇形子弹的角度小于0！请检查", ["ID", this.BulletInfo.BulletRowName]);
        }
        e.Y = 90;
      }
      if (i) {
        BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(t.Base.Shape, i, e, l, t.Base.Rotator);
      } else if (s) {
        BulletCollisionUtil_1.BulletCollisionUtil.UpdateRegionExtend(t.Base.Shape, s, e);
      }
    }
  }
  V5o() {
    this.BulletInfo.Actor.SetActorHiddenInGame(false);
    var i = this.CollisionInfo?.CollisionComponent;
    if (i) {
      i.bAsyncOverlap = true;
      i.bKuroOverlapNotify = false;
      i.bReceivedAsyncOverlapResult = false;
      var s = this.CollisionInfo.NeedHitObstacles;
      var l = this.BulletInfo.BulletDataMain.Base.IsOversizeForTrace;
      let t = false;
      if (t = !this.CollisionInfo.HasObstaclesCollision && s ? !l : !l && this.BulletInfo.ActorComponent.NeedDetach) {
        i.SetCollisionProfileName(BulletConstant_1.BulletConstant.ProfileNameOnlyBullet);
      }
      this.BulletInfo.Actor.SetActorEnableCollision(true);
    }
  }
  SetCollisionIgnoreChannels(t) {
    for (const i of this.CollisionInfo.IgnoreChannels) {
      t.SetCollisionResponseToChannel(i, 0);
    }
  }
}
exports.BulletActionInitCollision = BulletActionInitCollision;
//# sourceMappingURL=BulletActionInitCollision.js.map