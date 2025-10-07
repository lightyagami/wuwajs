"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillBehaviorBatchBulletTask = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletUtil_1 = require("../BulletUtil");
const BulletPool_1 = require("../Model/BulletPool");
class BatchBulletPositionCircle {
  constructor() {
    this.AngleInterval = 0;
    this.Center = undefined;
    this.Clockwise = true;
    this.Forward = Vector_1.Vector.Create();
    this.Radius = 0;
    this.BeginAngle = 0;
    this.BeginRotator = 1;
    this.DistToTarget = 0;
    this.StartPos = undefined;
  }
  IsDestroyOnEnd() {
    return false;
  }
  IsSummonChildBullet() {
    return false;
  }
  GetDelay() {
    return 0;
  }
  OnBreak() {}
  OnEnd() {}
  async Load() {}
  static Create(t, i) {
    var s = new BatchBulletPositionCircle();
    s.FromUeConfig(t, i);
    return s;
  }
  FromUeConfig(t, i) {
    this.AngleInterval = t.GetBlackboard(i.AngleIntervalKey, 0);
    this.Center = t.GetBlackboard(i.CenterKey);
    this.Clockwise = i.Clockwise;
    t.GetBlackboard(i.ForwardKey).Vector(this.Forward);
    this.Radius = t.GetBlackboard(i.RadiusKey);
    this.BeginAngle = i.BeginAngle;
    this.BeginRotator = i.BeginRotator;
    this.DistToTarget = t.GetBlackboard(i.DistToTarget, 0);
    this.StartPos = t.GetBlackboard(i.StartPosKey);
  }
  ToTransform(t) {
    var i = Transform_1.Transform.Create();
    i.SetLocation(this.Center);
    var s = Vector_1.Vector.Create();
    var t = this.BeginAngle + t * this.AngleInterval * (this.Clockwise ? 1 : -1);
    this.Forward.RotateAngleAxis(t, Vector_1.Vector.UpVectorProxy, s);
    s.MultiplyEqual(this.Radius);
    i.GetLocation().AdditionEqual(s);
    if (this.BeginRotator === 1) {
      this.Forward.RotateAngleAxis(t + 90, Vector_1.Vector.UpVectorProxy, s);
      t = Rotator_1.Rotator.Create();
      s.Rotation(t);
      t.Quaternion(i.GetRotation());
    } else if (this.BeginRotator === 2) {
      t = Rotator_1.Rotator.Create();
      s.Normalize();
      s.Rotation(t);
      t.Quaternion(i.GetRotation());
    }
    return i;
  }
  ToTargetLocation(t) {
    var i;
    if (t && this.DistToTarget) {
      i = Vector_1.Vector.Create();
      t.GetRotation().GetForwardVector(i);
      i.MultiplyEqual(this.DistToTarget);
      if (this.StartPos) {
        i.AdditionEqual(this.StartPos);
      } else {
        i.AdditionEqual(t.GetLocation());
      }
      return i;
    }
  }
}
class BatchBulletPositionDotMatrix {
  constructor() {
    this.Center = undefined;
    this.PositionOffset = undefined;
    this.PositionOffsetScale = 0;
    this.Rotator = undefined;
    this.RotatorOffset = undefined;
    this.BeginRotator = 1;
  }
  OnBreak() {}
  OnEnd() {}
  async Load() {}
  GetDelay() {
    return 0;
  }
  IsDestroyOnEnd() {
    return false;
  }
  IsSummonChildBullet() {
    return false;
  }
  static Create(t, i) {
    var s = new BatchBulletPositionDotMatrix();
    s.FromUeConfig(t, i);
    return s;
  }
  FromUeConfig(t, i) {
    this.Center = t.GetBlackboard(i.CenterKey);
    this.PositionOffset = new Array();
    var s = i.PositionOffset;
    var e = s.Num();
    for (let t = 0; t < e; t++) {
      this.PositionOffset.push(Vector_1.Vector.Create(s.Get(t)));
    }
    this.PositionOffsetScale = i.PositionOffsetScale;
    this.Rotator = t.GetBlackboard(i.RotatorKey);
    this.RotatorOffset = Rotator_1.Rotator.Create(i.RotatorOffset);
    this.BeginRotator = i.BeginRotator;
  }
  ToTransform(t) {
    var i;
    var s;
    if (!(this.PositionOffset.length <= t)) {
      (i = Transform_1.Transform.Create()).SetLocation(this.Center);
      i.SetRotation(this.Rotator.Quaternion());
      t = this.PositionOffset[t];
      s = Vector_1.Vector.Create();
      t.Multiply(this.PositionOffsetScale, s);
      i.TransformPosition(s, s);
      i.SetLocation(s);
      if (this.BeginRotator === 1) {
        s.SubtractionEqual(this.Center);
        s.Normalize();
        t = Rotator_1.Rotator.Create();
        s.Rotation(t);
        MathUtils_1.MathUtils.ComposeRotator(t, this.RotatorOffset, i.GetRotation());
      }
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 20, "批量生成子弹失败，生成子弹数量超出 位置偏移 数量");
    }
  }
  ToTargetLocation(t) {}
}
class BatchBulletPositionSpline {
  constructor() {
    this.lcu = undefined;
    this.md = undefined;
    this.zie = undefined;
    this.il = undefined;
    this.wXt = undefined;
    this.hwe = undefined;
    this.r1t = 0;
    this._cu = 0;
    this.ucu = 0;
    this.Nfd = undefined;
    this.Vfd = undefined;
    this.jfd = undefined;
    this.Hfd = undefined;
    this.nx = undefined;
    this.mcu = false;
    this.zDl = false;
  }
  static Create(t, i, s) {
    var e = new BatchBulletPositionSpline();
    e.fcu(t, i);
    e.ucu = s.GetInterval();
    e.nx = s;
    return e;
  }
  fcu(t, i) {
    this.lcu = i.SplineClass.ToAssetPathName();
    this.il = t.GetBlackboard(i.StartKey);
    if (StringUtils_1.StringUtils.IsBlank(i.EndKey)) {
      this.hwe = t.GetBlackboard(i.RotatorKey);
    } else {
      this.wXt = t.GetBlackboard(i.EndKey);
    }
    this.r1t = t.GetBlackboard(i.DurationKey);
    this._cu = i.Delay;
    this.Nfd = i.EffectOfEnd.ToAssetPathName();
    this.Vfd = i.BulletIdOfEnd;
    this.mcu = i.DestroyAllOnEnd;
    this.Hfd = i.BulletIdOnBreak;
    this.jfd = i.EffectOnBreak.ToAssetPathName();
    this.zDl = i.DestroySummonBullet;
  }
  async Load() {
    return new Promise(e => {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.lcu, UE.Class, t => {
        var i = Transform_1.Transform.Create();
        var s = BulletPool_1.BulletPool.CreateVector();
        if (this.wXt) {
          this.wXt.Subtraction(this.il, s);
          MathUtils_1.MathUtils.LookRotationForwardFirst(s, Vector_1.Vector.UpVectorProxy, i.GetRotation());
        } else {
          i.SetRotation(this.hwe.Quaternion());
        }
        i.SetLocation(this.il);
        this.md = ActorSystem_1.ActorSystem.Get(t, i.ToUeTransform());
        this.zie = this.md.Spline;
        if (this.wXt) {
          t = this.zie.GetNumberOfSplinePoints() - 1;
          i = this.zie.D_GetLocationAtSplinePoint(t, 0).SizeSquared();
          t = Vector_1.Vector.DistSquared(this.il, this.wXt);
          t = Math.sqrt(t / i);
          s.FromUeVector(Vector_1.Vector.OneVectorProxy);
          s.MultiplyEqual(t);
          this.md.D_SetActorScale3D(s.ToUeVector());
        }
        BulletPool_1.BulletPool.RecycleVector(s);
        this.zie.Duration = this.r1t;
        e();
      });
    });
  }
  OnBreak() {
    this.$fd(this.jfd, this.Hfd);
  }
  OnEnd() {
    this.$fd(this.Nfd, this.Vfd);
  }
  $fd(t, i) {
    var s;
    var e = StringUtils_1.StringUtils.IsBlank(t);
    var r = StringUtils_1.StringUtils.IsBlank(i);
    if ((!e || !r) && !(s = this.zie?.D_GetTransformAtTime(this.r1t, 1, true), e || (e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, s, t, "样条批量子弹末尾特效"), EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, e, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation)), r)) {
      t = this.nx.GetOwner();
      e = this.nx.GetSkillId();
      r = (r = this.nx.GetSkillComponent()?.GetSkill(e))?.SkillBehaviorAnimNotifyMessageId || r?.MNc;
      BulletUtil_1.BulletUtil.CreateBulletFromAN(t, i, s, e, false, r);
    }
    ActorSystem_1.ActorSystem.Put("样条曲线批量子弹", this.md);
    this.md = undefined;
    this.zie = undefined;
  }
  ToTransform(t) {
    t = this._cu + this.ucu * t;
    t = this.zie.D_GetTransformAtTime(t, 1, true, true);
    return Transform_1.Transform.Create(t);
  }
  ToTargetLocation(t) {}
  GetDelay() {
    return this._cu;
  }
  IsDestroyOnEnd() {
    return this.mcu;
  }
  IsSummonChildBullet() {
    return this.zDl;
  }
}
class SkillBehaviorBatchBulletTask {
  constructor() {
    this.xe = undefined;
    this.ZZt = 0;
    this.Vso = 0;
    this.bjo = undefined;
    this.EQ_ = false;
    this.IQ_ = 0;
    this.Xte = undefined;
    this.tRr = undefined;
    this.OQt = undefined;
    this.wmo = 0;
    this.Hhc = false;
    this.B7o = 0;
    this.TQ_ = undefined;
    this.TDe = undefined;
    this.IO = (t = 0) => {
      if (this.bQ_()) {
        var i = this.oZo(this.B7o);
        if (i) {
          this.TQ_.push(i);
          if (this.EQ_) {
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(i, 0);
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletLiveRatio(i, 0);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "批量生成子弹失败");
        }
        this.B7o++;
        if (this.EQ_ && this.B7o >= this.Vso) {
          for (let t = 0; t < this.Vso; t++) {
            var s = this.TQ_[t];
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(s, 1);
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletLiveRatio(s, 1);
          }
          this.bjo.OnEnd();
        }
      } else {
        if (!this.TDe?.Remove()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "停止批量生成子弹失败");
          }
        }
        this.bjo.OnBreak();
        if (this.bjo.IsDestroyOnEnd()) {
          for (let t = 0; t < this.Vso; t++) {
            ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(this.TQ_[t], this.bjo.IsSummonChildBullet());
          }
        } else if (this.EQ_) {
          for (let t = 0; t < this.Vso; t++) {
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(this.TQ_[t], 1);
          }
        }
      }
    };
  }
  GetInterval() {
    return this.ZZt;
  }
  GetSkillComponent() {
    return this.tRr;
  }
  GetOwner() {
    return this.OQt;
  }
  GetSkillId() {
    return this.wmo;
  }
  static Create(t, i, s) {
    var i = ResourceSystem_1.ResourceSystem.Load(i.ToAssetPathName(), UE.DAC_BatchCreateBullet_C);
    var e = i.Base;
    var r = new SkillBehaviorBatchBulletTask();
    r.wmo = s;
    r.OQt = t.GetComponent(3)?.Actor;
    if (StringUtils_1.NONE_STRING !== e.ContinueWithTag.TagName) {
      r.Xte = t.GetComponent(206);
    }
    r.tRr = t.GetComponent(39);
    r.Hhc = e.StopOnSkillEnd;
    var s = t.GetComponent(282);
    r.IQ_ = e.ContinueWithTag.TagId;
    r.xe = new Array();
    var h = e.Id.Num();
    for (let t = 0; t < h; t++) {
      r.xe.push(e.Id.Get(t));
    }
    r.ZZt = e.Interval;
    r.Vso = e.Number;
    if (i.BeginPos === 0) {
      t = i;
      r.bjo = BatchBulletPositionDotMatrix.Create(s, t.Shape);
    } else if (i.BeginPos === 1) {
      t = i;
      r.bjo = BatchBulletPositionCircle.Create(s, t.Shape);
      if ((t = r.bjo).AngleInterval === 0) {
        t.AngleInterval = MathCommon_1.MathCommon.RoundAngle / r.Vso;
      }
    } else if (i.BeginPos === 2) {
      t = i;
      r.bjo = BatchBulletPositionSpline.Create(s, t.Shape, r);
    }
    r.EQ_ = e.StartMoving === 1;
    return r;
  }
  async StartAsync() {
    var t = new Array();
    t.push(this.bjo.Load());
    var i = this.bjo.GetDelay() * MathUtils_1.MathUtils.SecondToMillisecond;
    if (i > 0) {
      t.push(this.Delay(i));
    }
    await Promise.all(t);
    this.il();
  }
  async Delay(i) {
    return new Promise(t => {
      TimerSystem_1.TimerSystem.Delay(() => {
        t();
      }, i);
    });
  }
  il() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "开始批量生成子弹");
    }
    if (this.bjo.GetDelay() > 0 && !this.bQ_()) {
      this.bjo.OnBreak();
    } else {
      this.TQ_ = new Array();
      if (this.ZZt > 0) {
        this.IO();
        this.TDe = TimerSystem_1.TimerSystem.Loop(this.IO, this.ZZt * MathUtils_1.MathUtils.SecondToMillisecond, this.Vso - 1, 1, undefined, "[批量生成子弹]");
      } else {
        for (let t = 0; t < this.Vso && (!this.Xte || this.Xte.HasTag(this.IQ_)) && (this.wmo === 0 || !this.Hhc || this.tRr.CurrentSkill && this.tRr.CurrentSkill.SkillId === this.wmo); t++) {
          var i = this.oZo(t);
          if (i) {
            this.TQ_.push(i);
          }
        }
      }
    }
  }
  oZo(t) {
    var i;
    var s;
    var e = this.xe[t % this.xe.length];
    var t = this.bjo.ToTransform(t);
    if (t) {
      i = (i = this.tRr?.GetSkill(this.wmo))?.SkillBehaviorAnimNotifyMessageId || i?.MNc;
      s = this.bjo.ToTargetLocation(t);
      return BulletUtil_1.BulletUtil.CreateBulletFromAN(this.OQt, e, t.ToUeTransform(), this.wmo, false, i, s?.ToUeVector());
    } else {
      return 0;
    }
  }
  bQ_() {
    return (!this.Xte || !!this.Xte.HasTag(this.IQ_)) && (!this.Hhc || !!this.tRr.CurrentSkill && this.tRr.CurrentSkill.SkillId === this.wmo);
  }
}
exports.SkillBehaviorBatchBulletTask = SkillBehaviorBatchBulletTask;
//# sourceMappingURL=SkillBehaviorBatchBulletTask.js.map