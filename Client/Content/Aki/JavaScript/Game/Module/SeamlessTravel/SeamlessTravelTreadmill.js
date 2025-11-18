"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelTreadmill = exports.DEFAULT_SEAMLESS_TRANSITION_HEIGHT = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const DEFAULT_FLOOR_MESH_PATH = "/Engine/BasicShapes/Plane.Plane";
const floorMeshMaterialOffsetParam = new UE.FName("Offset");
const floorMeshMaterialAlphaParam = new UE.FName("Alpha");
const DEFAULT_APPEAR_ALPHA_DELTA = 0.5;
const DEFAULT_DISAPPEAR_ALPHA_DELTA = 0.5;
const DEFAULT_FLOOR_SCALE_X = 100;
const DEFAULT_FLOOR_SCALE_Y = 100;
const DEFAULT_FLOOR_SCALE_Z = 1;
exports.DEFAULT_SEAMLESS_TRANSITION_HEIGHT = 2000000;
class FloorMaterialParams {
  constructor(t) {
    this.Offset = new UE.LinearColor(0, 0, 0, 0);
    this.Alpha = 0;
    this.AlphaDelta = 0;
    this.OQt = undefined;
    this.Y0e = undefined;
    this.OnAppearStartHandle = undefined;
    this.OnAppearEndHandle = undefined;
    this.OnDisappearStartHandle = undefined;
    this.OnDisappearEndHandle = undefined;
    this.OQt = t;
  }
  Bind(t) {
    if (!!t.IsValid() && !this.Y0e) {
      this.Y0e = t;
    }
  }
  Reset() {
    this.Offset.R = 0;
    this.Offset.G = 0;
    this.Alpha = 0;
    this.AlphaDelta = 0;
    this.OnAppearStartHandle = undefined;
    this.OnAppearEndHandle = undefined;
    this.OnDisappearStartHandle = undefined;
    this.OnDisappearEndHandle = undefined;
  }
  Update(t) {
    if (this.OQt.IsInit && (this.AlphaDelta !== 0 && (this.OnAppearStartHandle && this.Alpha === 0 && this.AlphaDelta > 0 ? this.OnAppearStartHandle() : this.OnDisappearStartHandle && this.Alpha === 1 && this.AlphaDelta < 0 && this.OnDisappearStartHandle(), t = this.AlphaDelta * t * MathUtils_1.MathUtils.MillisecondToSecond, this.Alpha = MathUtils_1.MathUtils.Clamp(this.Alpha + t, 0, 1), this.Y0e?.SetScalarParameterValue(floorMeshMaterialAlphaParam, this.Alpha), this.Alpha <= 0 || this.Alpha >= 1) && (this.OnAppearEndHandle && this.Alpha === 1 && this.AlphaDelta > 0 ? this.OnAppearEndHandle() : this.OnDisappearEndHandle && this.Alpha === 0 && this.AlphaDelta < 0 && this.OnDisappearEndHandle(), this.AlphaDelta = 0), this.IsVisible())) {
      this.Y0e?.SetVectorParameterValue(floorMeshMaterialOffsetParam, this.Offset);
    }
  }
  IsVisible() {
    return this.Alpha > 0;
  }
}
class SeamlessTravelTreadmill {
  constructor() {
    this.ActorComp = undefined;
    this.Context = undefined;
    this.Floor = undefined;
    this.FloorExtend = Vector_1.Vector.Create();
    this.FloorMatParams = undefined;
    this.IsInitInternal = false;
    this.IsLockMove = false;
    this.IsActiveInternal = false;
    this.LockOnLocation = Vector_1.Vector.Create();
    this.LockOnGravityDirect = Vector_1.Vector.Create();
    this.LocationDelta = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpTransform = Transform_1.Transform.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
  }
  get IsInit() {
    return this.IsInitInternal;
  }
  get IsActive() {
    return this.IsActiveInternal;
  }
  Init(t, s) {
    this.ActorComp = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (this.ActorComp) {
      this.IsActiveInternal = false;
      this.Context = t;
      if (this.IsInit) {
        s(true);
      } else {
        this.LoadFloor(s);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Teleport", 50, "[万向跑步机]初始化失败，无效的ActorComp", ["ActorName", Global_1.Global.BaseCharacter?.GetName()]);
    }
  }
  Tick(t) {
    if (this.IsInit && this.Floor?.IsValid() && this.ActorComp?.Valid && this.IsActive) {
      this.ActorComp.ActorLocationProxy.Subtraction(this.LockOnLocation, this.LocationDelta);
      this.UpdateFloorMatUV(this.LocationDelta);
      this.LockActorMove();
      this.FloorMatParams?.Update(t);
    }
  }
  Destroy() {
    if (this.Floor?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("SeamlessTravelTreadmill.Destroy", this.Floor);
    }
    this.ActorComp = undefined;
    this.Context = undefined;
    this.Floor = undefined;
    this.FloorExtend.Reset();
    this.FloorMatParams = undefined;
    this.IsLockMove = false;
    this.IsActiveInternal = false;
    this.LockOnLocation.Reset();
    this.LocationDelta.Reset();
    this.TmpVector.Reset();
    this.TmpTransform.Reset();
    this.TmpQuat.Reset();
    this.TmpRotator.Reset();
  }
  Reset() {
    this.ActorComp = undefined;
    this.IsLockMove = false;
    this.IsActiveInternal = false;
    if (this.FloorMatParams) {
      this.FloorMatParams.Reset();
    }
    this.LockOnLocation.Reset();
    this.LocationDelta.Reset();
    this.TmpVector.Reset();
    this.TmpTransform.Reset();
    this.TmpQuat.Reset();
    this.TmpRotator.Reset();
  }
  GetInitFloorTransform(t) {
    this.LockOnGravityDirect.Multiply(this.ActorComp.ScaledHalfHeight + this.FloorExtend.Z, this.TmpVector);
    this.TmpVector.AdditionEqual(this.LockOnLocation);
    t.SetLocation(this.TmpVector);
    this.TmpVector.Set(DEFAULT_FLOOR_SCALE_X, DEFAULT_FLOOR_SCALE_Y, DEFAULT_FLOOR_SCALE_Z);
    if (this.Context.FloorParams?.FloorScale) {
      this.TmpVector.DeepCopy(this.Context.FloorParams?.FloorScale);
    }
    t.SetScale3D(this.TmpVector);
    var s = Quat_1.Quat.Create();
    Quat_1.Quat.FindBetween(Vector_1.Vector.DownVectorProxy, this.LockOnGravityDirect, this.TmpQuat);
    this.TmpQuat.Multiply(Rotator_1.Rotator.ZeroRotatorProxy.Quaternion(), s);
    t.SetRotation(s);
  }
  HandleFalseInit(t) {
    t(false);
    this.IsInitInternal = true;
  }
  LoadFloor(h) {
    const e = this.Context.FloorParams?.FloorMeshPath ?? DEFAULT_FLOOR_MESH_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.StaticMesh, t => {
      var s;
      var i;
      if (t?.IsValid() && this.ActorComp?.Actor?.IsValid() && (this.GetInitFloorTransform(this.TmpTransform), this.Floor = ActorSystem_1.ActorSystem.Get(UE.StaticMeshActor.StaticClass(), this.TmpTransform.ToUeTransform(), this.ActorComp.Actor), this.Floor?.IsValid())) {
        if (GlobalData_1.GlobalData.IsPlayInEditor) {
          this.Floor.SetActorLabel("SeamlessTravelTreadmillFloor");
        }
        s = this.TmpTransform.GetScale3D();
        i = t.GetBounds();
        this.FloorExtend.X = i.BoxExtent.X * s.X;
        this.FloorExtend.Y = i.BoxExtent.Y * s.Y;
        this.FloorExtend.Z = i.BoxExtent.Z;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 50, "[万向跑步机]加载地板Mesh", ["Bound", this.FloorExtend], ["Path", e]);
        }
        this.Floor.StaticMeshComponent.SetMobility(2);
        this.Floor.StaticMeshComponent.SetStaticMesh(t);
        this.Floor.StaticMeshComponent.SetEnableGravity(false);
        this.LoadFloorMaterial(h);
        if (!this.Context.FloorParams) {
          this.Floor.SetActorHiddenInGame(true);
        }
      } else {
        this.HandleFalseInit(h);
      }
    }, 100, "SeamlessTravel");
  }
  LoadFloorMaterial(s) {
    if (this.Context.FloorParams?.FloorMaterialPath) {
      this.FloorMatParams = new FloorMaterialParams(this);
      const i = this.Context.FloorParams?.FloorMaterialPath;
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.MaterialInstance, t => {
        if (t?.IsValid() && this.Floor?.IsValid() && (this.Floor.StaticMeshComponent.SetMaterial(0, t), (t = this.Floor.StaticMeshComponent.CreateDynamicMaterialInstance(0, t))?.IsValid())) {
          s(true);
          this.IsInitInternal = true;
          this.FloorMatParams.Bind(t);
          this.Floor.StaticMeshComponent.SetMaterial(0, t);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Character", 50, "[万向跑步机]加载地板材质", ["Path", i]);
          }
        } else {
          this.HandleFalseInit(s);
        }
      }, 100, "SeamlessTravel.Treadmill");
    } else {
      this.HandleFalseInit(s);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 50, "[万向跑步机]没有配置材质，不加载");
      }
    }
  }
  UpdateFloorMatUV(t) {
    var s;
    var i;
    if (this.IsLockMove && this.FloorMatParams) {
      s = this.FloorExtend.X * 2;
      i = this.FloorExtend.Y * 2;
      this.GetInitFloorTransform(this.TmpTransform);
      this.TmpTransform.GetRotation().Inverse(this.TmpQuat);
      this.TmpQuat.RotateVector(t, this.TmpVector);
      this.FloorMatParams.Offset.R += this.TmpVector.X % s / s;
      this.FloorMatParams.Offset.G += this.TmpVector.Y % i / i;
    }
  }
  LockActorMove() {
    var t;
    if (this.ActorComp && this.IsLockMove) {
      this.ActorComp.MoveComp?.SetGravityDirectWithoutRotate(this.LockOnGravityDirect);
      this.ActorComp.ActorLocationProxy.Subtraction(this.LockOnLocation, this.TmpVector);
      t = Vector_1.Vector.DotProduct(this.TmpVector, this.LockOnGravityDirect);
      this.LockOnGravityDirect.Multiply(t, this.TmpVector);
      this.TmpVector.AdditionEqual(this.LockOnLocation);
      this.ActorComp.SetActorLocation(this.TmpVector.ToUeVector(), "万向跑步机锁定位置");
    }
  }
  AppearEffect(s) {
    if (this.FloorMatParams) {
      let t = DEFAULT_APPEAR_ALPHA_DELTA;
      if (this.Context.FloorParams?.FloorAppearTime) {
        t = 1 / this.Context.FloorParams.FloorAppearTime;
      }
      this.FloorMatParams.OnAppearEndHandle = s;
      this.FloorMatParams.AlphaDelta = t;
      this.IsActiveInternal = true;
    } else {
      s();
    }
  }
  DisappearEffect(s) {
    if (this.FloorMatParams) {
      let t = DEFAULT_DISAPPEAR_ALPHA_DELTA;
      if (this.Context.FloorParams?.FloorDisappearTime) {
        t = 1 / this.Context.FloorParams.FloorDisappearTime;
      }
      this.FloorMatParams.OnDisappearEndHandle = () => {
        s();
        this.IsActiveInternal = false;
      };
      this.FloorMatParams.AlphaDelta = -t;
    } else {
      s();
    }
  }
  EnableLockMove(t) {
    this.IsLockMove = t;
  }
  ResetLockOnLocation(t, s) {
    if (this.ActorComp && (t ? this.LockOnLocation.DeepCopy(t) : this.LockOnLocation.DeepCopy(this.ActorComp.ActorLocationProxy), s ? this.LockOnGravityDirect.DeepCopy(s) : this.LockOnGravityDirect.DeepCopy(this.ActorComp.ActorGravityDirectProxy), this.Floor?.IsValid() && (this.GetInitFloorTransform(this.TmpTransform), this.Floor.D_K2_SetActorTransform(this.TmpTransform.ToUeTransform(), false, undefined, true)), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Movement", 50, "[万向跑步机]重置Lock位置", ["LockLocation", this.LockOnLocation], ["FloorMeshLocation", this.Floor?.D_K2_GetActorLocation()]);
    }
  }
  GetLockOnLocation(t) {
    t.DeepCopy(this.LockOnLocation);
  }
  GetFloorActor() {
    if (this.Floor?.IsValid()) {
      return this.Floor;
    }
  }
}
exports.SeamlessTravelTreadmill = SeamlessTravelTreadmill;
//# sourceMappingURL=SeamlessTravelTreadmill.js.map