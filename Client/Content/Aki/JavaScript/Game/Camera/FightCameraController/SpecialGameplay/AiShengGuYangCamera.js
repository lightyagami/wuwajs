"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiShengGuYangCamera = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Time_1 = require("../../../../Core/Common/Time");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const GameSplineUtils_1 = require("../../../LevelGamePlay/Common/GameSplineUtils");
const TsGameSplineActor_1 = require("../../../LevelGamePlay/Common/TsGameSplineActor");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MOVE_SPLINE_PB_DATA_ID = 118003752;
class AiShengGuYangCamera {
  constructor() {
    this.Ic = undefined;
    this.qce = undefined;
    this.Lie = undefined;
    this.Gce = undefined;
    this.Nce = undefined;
    this.Oce = undefined;
    this.kce = undefined;
    this.Fce = undefined;
    this.Vce = undefined;
    this.Hce = 0;
    this.jce = Vector_1.Vector.Create();
    this.Wce = Vector_1.Vector.Create();
    this.Kce = Vector_1.Vector.Create();
    this.Qce = 1;
    this.Xce = false;
    this.$ce = 0;
    this.Yce = 0;
    this.Jce = 0;
    this.zce = Vector_1.Vector.Create();
    this.Zce = Vector_1.Vector.Create();
    this.eme = Vector_1.Vector.Create();
    this.tme = Vector_1.Vector.Create();
    this.ime = Vector_1.Vector.Create();
    this.ome = 0;
    this.rme = Vector_1.Vector.Create();
    this.nme = 0;
    this.sme = Vector_1.Vector.Create();
    this.ame = 0;
    this.hme = 0;
    this.lme = true;
    this._me = 0;
    this.ume = 0;
    this.cme = 0;
    this.mme = 0;
    this.dme = 0;
    this.Cme = true;
    this.gme = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.pz = Vector_1.Vector.Create();
    this.fme = Rotator_1.Rotator.Create();
    this.pme = Rotator_1.Rotator.Create();
    this.vme = Rotator_1.Rotator.Create();
    this.Mme = Transform_1.Transform.Create(Quat_1.Quat.Create(), Vector_1.Vector.ZeroVectorProxy, Vector_1.Vector.OneVectorProxy);
  }
  get Hh() {
    if (this.Ic?.IsValid()) {
      return this.Ic.CameraComponent;
    } else {
      return undefined;
    }
  }
  OnInit(t) {
    this.Ic = t;
    this.Eme();
  }
  Update(t) {
    if (!this.qce?.IsValid()) {
      this.Eme();
    }
    if (this.qce?.IsValid() && this.Lie?.Valid && this.Gce?.Valid && this.Nce?.Valid && this.kce?.IsValid() && this.Oce?.IsValid() && this.Fce?.IsValid() && this.Vce?.IsValid() && this.Ic?.IsValid() && this.Hh?.IsValid()) {
      this.Xce = !!this.Lie.HasTag(1100468875);
      this.Nce.GetMoveVector(this.jce);
      this.Kce.Set(1200, 1200, 0);
      if (this.Xce) {
        this.Hh.SetFieldOfView(120);
        this.$ce = 4500;
        this.Jce = this.Yce >= 2300 ? this.$ce * 1.05 : this.$ce * 0.3;
      } else {
        this.$ce = 2500;
        this.Jce = this.Yce >= 2300 ? this.$ce * 1.05 : this.$ce * 0.3;
        this.Hh.SetFieldOfView(105);
      }
      if (Math.abs(this.Wce.X) === this.Kce.X) {
        if ((this.Wce.X > 0 && this.jce.X <= -0.5 || this.Wce.X < 0 && this.jce.X >= 0.5) && (i = this.Wce.X > 0 ? this.Wce.X - 70 : this.Wce.X + 70, Math.abs(i) < this.Kce.X)) {
          this.Wce.X = MathUtils_1.MathUtils.InterpTo(this.Wce.X, i, t, 10);
        }
      } else if (Math.abs(this.Wce.X) < this.Kce.X) {
        i = this.jce.X >= 0.5 ? this.Wce.X + 70 : this.Wce.X - 70;
        if ((this.jce.X >= 0.5 || this.jce.X <= -0.5) && Math.abs(i) < this.Kce.X) {
          this.Wce.X = MathUtils_1.MathUtils.InterpTo(this.Wce.X, i, t, 10);
        }
      } else {
        this.Wce.X = this.Wce.X > 0 ? this.Kce.X : -this.Kce.X;
      }
      if (Math.abs(this.Wce.Y) === this.Kce.Y) {
        if ((this.Wce.Y > 0 && this.jce.Y <= -0.5 || this.Wce.Y < 0 && this.jce.Y >= 0.5) && (i = this.Wce.Y > 0 ? this.Wce.Y - 70 : this.Wce.Y + 70, Math.abs(i) < this.Kce.Y)) {
          this.Wce.Y = MathUtils_1.MathUtils.InterpTo(this.Wce.Y, i, t, 10);
        }
      } else if (Math.abs(this.Wce.Y) < this.Kce.Y) {
        i = this.jce.Y >= 0.5 ? this.Wce.Y + 70 : this.Wce.Y - 70;
        if ((this.jce.Y >= 0.5 || this.jce.Y <= -0.5) && Math.abs(i) < this.Kce.Y) {
          this.Wce.Y = MathUtils_1.MathUtils.InterpTo(this.Wce.Y, i, t, 10);
        }
      } else {
        this.Wce.Y = this.Wce.Y > 0 ? this.Kce.Y : -this.Kce.Y;
      }
      if (this.Cme) {
        this.zce.FromUeVector(this.kce.D_GetLocationAtDistanceAlongSpline(this.ome, 1));
        this.tme.FromUeVector(this.kce.GetDirectionAtDistanceAlongSpline(this.ome, 0));
        this.tme.Multiply(200, this.ime);
        this.ime.AdditionEqual(this.zce);
        this.Cme = false;
        this.gme.FromUeVector(this.qce.D_K2_GetActorLocation());
        this.fz.FromUeVector(this.qce.GetActorForwardVector());
        this.fz.MultiplyEqual(-1300);
        this.gme.AdditionEqual(this.fz);
        this.fz.FromUeVector(this.qce.GetActorUpVector());
        this.fz.MultiplyEqual(250);
        this.gme.AdditionEqual(this.fz);
        this.Ic.D_K2_SetActorLocationAndRotation(this.gme.ToUeVector(), this.qce.K2_GetActorRotation(), false, undefined, false);
        this.gme.FromUeVector(this.qce.D_K2_GetActorLocation());
        this.fz.FromUeVector(this.qce.GetActorForwardVector());
        this.fz.MultiplyEqual(-1100);
        this.gme.AdditionEqual(this.fz);
        this.fz.FromUeVector(this.qce.GetActorUpVector());
        this.fz.MultiplyEqual(150);
        this.gme.AdditionEqual(this.fz);
        this.Fce.D_K2_SetActorLocationAndRotation(this.gme.ToUeVector(), this.qce.K2_GetActorRotation(), false, undefined, false);
      }
      this.ome = this.Hce + this.$ce * t;
      this.zce.FromUeVector(this.kce.D_GetLocationAtDistanceAlongSpline(this.ome, 1));
      this.Zce.FromUeVector(this.kce.GetUpVectorAtDistanceAlongSpline(this.ome, 0));
      this.eme.FromUeVector(this.kce.GetRightVectorAtDistanceAlongSpline(this.ome, 0));
      this.tme.FromUeVector(this.kce.GetDirectionAtDistanceAlongSpline(this.ome, 0));
      this.tme.Multiply(200, this.ime);
      this.ime.AdditionEqual(this.zce);
      this.Zce.Multiply(this.Wce.X, this.gme);
      this.eme.Multiply(this.Wce.Y, this.fz);
      this.gme.Addition(this.fz, this.rme);
      this.gme.FromUeVector(this.qce.D_K2_GetActorLocation());
      this.fz.FromUeVector(this.Ic.D_K2_GetActorLocation());
      this.Yce = Vector_1.Vector.Dist(this.gme, this.fz);
      this.ime.Addition(this.rme, this.fz);
      this.nme = Vector_1.Vector.Dist(this.gme, this.fz);
      this.Zce.Multiply(MathUtils_1.MathUtils.RangeClamp(this.Wce.X, -1200, 1200, -600, 600), this.gme);
      this.eme.Multiply(MathUtils_1.MathUtils.RangeClamp(this.Wce.Y, -1200, 1200, -600, 600), this.fz);
      this.gme.AdditionEqual(this.fz);
      this.fz.FromUeVector(this.kce.D_GetLocationAtDistanceAlongSpline(this.ome + 2000, 1));
      this.gme.Addition(this.fz, this.sme);
      if (this.ome >= this.mme) {
        this.Qce++;
        this.mme = this.kce.GetDistanceAlongSplineAtSplinePoint(this.Qce);
      }
      if (!this.Xce) {
        var i = this.ame === 1 ? 100 : 200;
        var s = this.ame === 3 ? 300 : 400;
        if (this.nme < i) {
          this.ame = 1;
        } else if (this.nme < s) {
          this.ame = 2;
        } else {
          this.ame = 3;
        }
        switch (this.hme) {
          case 0:
            if (this.Yce <= 1000) {
              this.hme = 1;
              this.Jce = this.$ce * 0.85;
            } else if (this.Yce < 1500) {
              this.hme = 2;
              this.Jce = this.$ce - 10;
            } else {
              this.hme = 3;
              this.Jce = this.$ce * 1.1;
            }
            break;
          case 1:
            if (this.Yce >= 1100) {
              this.hme = 2;
              this.Jce = this.$ce - 100;
            }
            break;
          case 2:
            if (this.Yce <= 900) {
              this.hme = 1;
              this.Jce = this.$ce * 0.85;
            } else if (this.Yce >= 1500) {
              this.hme = 3;
              this.Jce = this.$ce * 1.2;
            }
            break;
          case 3:
            if (this.Yce <= 1300) {
              this.hme = 2;
              this.Jce = this.$ce - 1;
            }
        }
      }
      if (MathUtils_1.MathUtils.IsNearlyZero(this.jce.Y)) {
        if (this.lme && Time_1.Time.Now - this._me > 1000) {
          this.lme = false;
        } else {
          this.gme.FromUeVector(this.qce.GetActorForwardVector());
          this.gme.Z = 0;
          this.gme.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
          this.fz.FromUeVector(this.kce.GetDirectionAtDistanceAlongSpline(this.ome + 1000, 0));
          this.fz.Z = 0;
          this.fz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
          i = Math.acos(MathUtils_1.MathUtils.Clamp(this.gme.DotProduct(this.fz), -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
          i = MathUtils_1.MathUtils.Clamp(i, -25, 25);
          this.ume = this.Sme(Vector_1.Vector.ZeroVectorProxy, this.fz, this.gme) ? -i : i;
          s = MathUtils_1.MathUtils.RangeClamp(this.ume, -25, 25, 0, 790);
          this.cme = MathUtils_1.MathUtils.InterpTo(this.cme, s, t, 5);
        }
      } else {
        this.gme.FromUeVector(this.Ic.D_K2_GetActorLocation());
        this.fz.FromUeVector(this.qce.D_K2_GetActorLocation());
        this.fz.SubtractionEqual(this.gme);
        this.fz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
        this.fz.Z = 0;
        this.fz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
        this.sme.Subtraction(this.gme, this.pz);
        this.pz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
        this.pz.Z = 0;
        this.pz.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
        i = Math.acos(MathUtils_1.MathUtils.Clamp(this.fz.DotProduct(this.pz), -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
        i = MathUtils_1.MathUtils.Clamp(i, -25, 25);
        this.ume = this.Sme(Vector_1.Vector.ZeroVectorProxy, this.fz, this.pz) ? -i : i;
        this.lme = true;
        this._me = Time_1.Time.Now;
        s = MathUtils_1.MathUtils.RangeClamp(this.ume, -25, 25, 0, 790);
        this.cme = MathUtils_1.MathUtils.InterpTo(this.cme, s, t, 3);
      }
      this.gme.FromUeVector(this.qce.D_K2_GetActorLocation());
      this.fz.FromUeVector(this.qce.GetActorForwardVector());
      this.fz.MultiplyEqual(-1100);
      this.gme.AdditionEqual(this.fz);
      this.fz.FromUeVector(this.qce.GetActorUpVector());
      this.fz.MultiplyEqual(250);
      this.gme.AdditionEqual(this.fz);
      this.fz.FromUeVector(this.Fce.D_K2_GetActorLocation());
      MathUtils_1.MathUtils.VectorInterpTo(this.fz, this.gme, t, this.Jce, this.pz);
      this.fme.FromUeRotator(this.Fce.K2_GetActorRotation());
      this.pme.FromUeRotator(UE.KismetMathLibrary.D_FindLookAtRotation(this.Fce.D_K2_GetActorLocation(), this.sme.ToUeVector()));
      MathUtils_1.MathUtils.RotatorInterpConstantTo(this.fme, this.pme, t, 60, this.vme);
      this.Fce.D_K2_SetActorLocationAndRotation(this.pz.ToUeVector(), this.vme.ToUeRotator(), false, undefined, false);
      this.fme.FromUeRotator(this.Ic.K2_GetActorRotation());
      MathUtils_1.MathUtils.RotatorInterpConstantTo(this.fme, this.pme, t, 60, this.vme);
      this.dme = MathUtils_1.MathUtils.InterpTo(this.dme, this.cme, t, 6);
      this.Ic.D_K2_SetActorLocationAndRotation(this.Vce.D_GetLocationAtDistanceAlongSpline(this.dme, 1), this.vme.ToUeRotator(), false, undefined, false);
      this.fme.Set(0, 0, this.kce.GetRollAtDistanceAlongSpline(this.ome, 0) * 0.9);
      this.Hh.K2_SetRelativeRotation(this.fme.ToUeRotator(), false, undefined, false);
      this.Hce = this.ome;
    }
  }
  OnDestroy() {
    if (this.Oce) {
      ActorSystem_1.ActorSystem.Put("AiShengGuYangCamera.OnDestroy1", this.Oce);
      this.kce = undefined;
      this.Oce = undefined;
    }
    if (this.Fce) {
      ActorSystem_1.ActorSystem.Put("AiShengGuYangCamera.OnDestroy2", this.Fce);
      this.Vce = undefined;
      this.Fce = undefined;
    }
    this.Ic = undefined;
    this.qce = undefined;
    this.Lie = undefined;
    this.Gce = undefined;
    this.Nce = undefined;
  }
  Eme() {
    var t;
    var i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (i?.Valid && (t = i.Entity?.GetComponent(3)?.Actor) instanceof TsBaseCharacter_1.default && ((this.qce = t).KuroSetMovementMode({
      Mode: 5,
      CustomMode: 0,
      Context: "[AiShengGuYangCamera.OnInitInternal]"
    }), this.Gce = i.Entity?.GetComponent(45), this.Gce?.Valid && (this.Gce.CanMoveFromInput = false), this.Lie = i.Entity?.GetComponent(205), this.Lie?.Valid) && (this.Nce = i.Entity?.GetComponent(62), this.Nce?.Valid) && (this.Mme.Set(Vector_1.Vector.ZeroVectorProxy, Quat_1.Quat.Create(), Vector_1.Vector.OneVectorProxy), this.Fce?.IsValid() || (this.Fce = ActorSystem_1.ActorSystem.Get(UE.CommonEffectMoveSpline2_C.StaticClass(), this.Mme.ToUeTransform(), undefined), this.Vce = this.Fce.KuroMoveSpline), this.Oce?.IsValid() || (this.Oce = ActorSystem_1.ActorSystem.Get(TsGameSplineActor_1.default.StaticClass(), this.Mme.ToUeTransform(), undefined)), !this.kce?.IsValid()) && this.Oce.IsValid()) {
      this.kce = GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(MOVE_SPLINE_PB_DATA_ID, this.Oce);
    }
  }
  Sme(t, i, s) {
    var s = UE.KismetMathLibrary.D_FindLookAtRotation(t.ToUeVector(), s.ToUeVector());
    var s = Vector_1.Vector.Create(UE.KismetMathLibrary.GetRightVector(s));
    var h = Vector_1.Vector.Create();
    i.Subtraction(t, h);
    h.Normalize();
    return Math.acos(MathUtils_1.MathUtils.Clamp(s.DotProduct(h), -1, 1)) * MathUtils_1.MathUtils.RadToDeg > 90;
  }
}
exports.AiShengGuYangCamera = AiShengGuYangCamera;
//# sourceMappingURL=AiShengGuYangCamera.js.map