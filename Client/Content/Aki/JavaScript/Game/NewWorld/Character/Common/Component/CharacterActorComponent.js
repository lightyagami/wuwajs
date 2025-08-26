"use strict";

var CharacterActorComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        h = (r < 3 ? o(h) : r > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterActorComponent = exports.LockOnConfig = exports.LockOnPart = exports.FIX_SPAWN_TRACE_HEIGHT = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const JsModelManager_1 = require("../../../../../Core/Model/JsModelManager");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const AoiController_1 = require("../../../../World/Controller/AoiController");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const AimPartUtils_1 = require("../../../Common/AimPartUtils");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
const RoleTriggerController_1 = require("../../Role/RoleTriggerController");
const FunctionRequestProxy_1 = require("./Actor/FunctionRequestProxy");
const BaseCharacterComponent_1 = require("./BaseCharacterComponent");
const CharacterLockOnComponent_1 = require("./LockOn/CharacterLockOnComponent");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const INIT_LOCATION_KEY = "InitLocation";
const MAX_NO_ROTATER_ANGLE = 10;
const PHYSIC_STREAMING_CHECK_PERIOD = 500;
const PHYSIC_STREAMING_CHECK_RANGE = 1000;
exports.FIX_SPAWN_TRACE_HEIGHT = -60;
const FIX_SWITCH_SPAWN_TRACE_HEIGHT = -80;
const oldLockOnPartNames = [new UE.FName("ViceAimingCase0"), new UE.FName("ViceAimingCase1"), new UE.FName("ViceAimingCase2"), new UE.FName("ViceAimingCase3"), new UE.FName("ViceAimingCase4"), new UE.FName("ViceAimingCase5"), new UE.FName("ViceAimingCase6"), new UE.FName("ViceAimingCase7"), new UE.FName("ViceAimingCase8"), new UE.FName("ViceAimingCase9")];
class LockOnPart {
  constructor(t) {
    this.BoneName = FNameUtil_1.FNameUtil.NONE;
    this.BoneNameString = "";
    this.SoftLockValid = true;
    this.HardLockValid = true;
    this.AimPartBoneName = "";
    this.EnablePartName = "";
    if (t instanceof UE.SLockOnPart) {
      this.BoneNameString = t.BoneName;
      this.BoneName = new UE.FName(this.BoneNameString);
      this.SoftLockValid = t.SoftLockValid;
      this.HardLockValid = t.HardLockValid;
      this.AimPartBoneName = t.AimPartBoneName;
      this.EnablePartName = t.EnablePartName;
    } else {
      this.BoneNameString = t.toString();
      this.BoneName = t;
      this.SoftLockValid = true;
      this.HardLockValid = true;
      this.AimPartBoneName = this.BoneNameString;
      this.EnablePartName = "";
    }
  }
}
exports.LockOnPart = LockOnPart;
class LockOnConfig {
  constructor(t) {
    this.IsOpened = false;
    this.Distance = 0;
    this.UpDistance = 0;
    this.DownDistance = 0;
    this.IsOpened = t.IsOpened;
    this.Distance = t.Distance;
    this.UpDistance = t.UpDistance;
    this.DownDistance = t.DownDistance;
  }
}
exports.LockOnConfig = LockOnConfig;
let CharacterActorComponent = CharacterActorComponent_1 = class CharacterActorComponent extends BaseCharacterComponent_1.BaseCharacterComponent {
  constructor() {
    super(...arguments);
    this.Oea = undefined;
    this.V2r = Vector_1.Vector.Create(0, 0, 0);
    this.H2r = Rotator_1.Rotator.Create(0, 0, 0);
    this.j2r = Vector_1.Vector.Create(1, 0, 0);
    this.UseControllerRotation = false;
    this.NewestInputFacingType = 0;
    this.OverrideTurnSpeed = 0;
    this.DisableKey = undefined;
    this.W2r = Vector_1.Vector.Create(0, 0, 0);
    this.IsRoleAndCtrlByMe = false;
    this.IsSummonsAndCtrlByMe = false;
    this.Q2r = Vector_1.Vector.Create(0, 0, 0);
    this.X2r = true;
    this.$2r = false;
    this.Y2r = false;
    this.J2r = 0;
    this.z2r = true;
    this.rDn = 3;
    this.NNn = undefined;
    this.poa = undefined;
    this.kNn = false;
    this.Lz = Vector_1.Vector.Create();
    this.IsChangingMeshAnim = false;
    this.ShowDebug = false;
    this.Z2r = undefined;
    this.IsPartHitInternal = false;
    this.eFr = false;
    this.NeedFixBornLocation = true;
    this.ReplaceEffectMap = new Map();
    this.ReplaceMontageMap = new Map();
    this.v9e = () => {
      if (!!this.CreatureDataInternal && !this.CreatureDataInternal.GetRemoveState()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()]);
        }
      }
    };
    this.iFr = () => {
      if (!this.eFr && this.NeedFixBornLocation) {
        this.eFr = true;
        this.oFr();
      }
    };
    this.rFr = new Map();
    this.nFr = new Map();
    this.sFr = undefined;
    this.AimParts = new Map();
    this.LockOnParts = new Map();
    this.LockOnConfig = undefined;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.StartDitherValue = 0;
    this.aFr = new Map();
    this.nDn = [false, 0];
    this.DisableMeshCollisionEnabledHandle = undefined;
    this.hFr = undefined;
    this.DisableMeshCollisionObjectTypeHandle = undefined;
    this.MeshHandleForCollisionType = undefined;
    this.q61 = () => {
      this.G61();
    };
    this.FNn = t => {
      if (t === 1 && this.kNn) {
        this.Entity.UnregisterFromGameBudgetController();
        this.VNn(this.ActorLocation);
      } else if (t === 4 && this.NNn) {
        TimerSystem_1.TimerSystem.Remove(this.NNn);
        this.NNn = undefined;
        if (this.kNn) {
          this.dFr();
        } else {
          this.HNn();
        }
      }
    };
  }
  get EnableVoxelDetection() {
    return this.z2r;
  }
  SetEnableVoxelDetection(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "设置是否检测体素", ["", t], ["Reason", e]);
    }
    this.z2r = t;
  }
  get IsBoss() {
    return this.$2r;
  }
  get InputDirectProxy() {
    return this.V2r;
  }
  get InputDirect() {
    return this.V2r.ToUeVector();
  }
  get InputRotatorProxy() {
    if (this.NewestInputFacingType === 2) {
      if (!this.MoveComp || this.MoveComp.IsStandardGravity) {
        this.H2r.Set(Math.asin(this.j2r.Z) * MathUtils_1.MathUtils.RadToDeg, MathUtils_1.MathUtils.GetAngleByVector2D(this.j2r), 0);
      } else {
        this.MoveComp.GravityDirect.Multiply(-1, CharacterActorComponent_1.Lz);
        MathUtils_1.MathUtils.LookRotationForwardFirst(this.j2r, CharacterActorComponent_1.Lz, CharacterActorComponent_1.az);
        CharacterActorComponent_1.az.Rotator(this.H2r);
      }
      this.NewestInputFacingType = 0;
    }
    return this.H2r;
  }
  get InputFacingProxy() {
    var t;
    var e;
    if (this.NewestInputFacingType === 1) {
      if (!this.MoveComp || this.MoveComp.IsStandardGravity) {
        t = this.H2r.Pitch * MathUtils_1.MathUtils.DegToRad;
        this.j2r.Z = Math.sin(t);
        t = Math.cos(t);
        e = this.H2r.Yaw * MathUtils_1.MathUtils.DegToRad;
        this.j2r.X = Math.cos(e) * t;
        this.j2r.Y = Math.sin(e) * t;
      } else {
        this.H2r.Quaternion(CharacterActorComponent_1.az);
        CharacterActorComponent_1.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.j2r);
      }
      this.NewestInputFacingType = 0;
    }
    return this.j2r;
  }
  HasMesh() {
    return !!this.SkeletalMesh?.SkeletalMesh;
  }
  get IsPartHit() {
    return this.IsPartHitInternal;
  }
  get DefaultController() {
    return this.Oea;
  }
  SetInputDirect(t, e = false) {
    if (MathUtils_1.MathUtils.IsValidVector(t)) {
      CharacterActorComponent_1.Lz.DeepCopy(t);
      if (this.MoveComp?.HasInputMoveLimit()) {
        this.MoveComp.GetFixInputMoveDirection(t, CharacterActorComponent_1.Lz);
      }
      if (e) {
        if (!this.MoveComp || this.MoveComp.IsStandardGravity) {
          this.V2r.DeepCopy(CharacterActorComponent_1.Lz);
          this.V2r.Z = 0;
        } else {
          Vector_1.Vector.VectorPlaneProject(CharacterActorComponent_1.Lz, this.MoveComp.GravityDirect, this.V2r);
        }
      } else {
        this.V2r.DeepCopy(CharacterActorComponent_1.Lz);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 6, "SetInputDirect has NaN", ["x", t.X], ["y", t.Y], ["z", t.Z]);
    }
  }
  SetInputDirectByNumber(t, e, i) {
    if (MathUtils_1.MathUtils.IsValidNumbers(t, e, i)) {
      this.V2r.X = t;
      this.V2r.Y = e;
      this.V2r.Z = i;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 6, "SetInputDirect has NaN", ["x", t], ["y", e], ["z", i]);
    }
  }
  SetInputRotator(t) {
    this.SetInputRotatorByNumber(t.Pitch, t.Yaw, t.Roll);
  }
  SetInputRotatorByNumber(t, e, i) {
    this.H2r.Pitch = t;
    this.H2r.Yaw = e;
    this.H2r.Roll = i;
    this.NewestInputFacingType = 1;
  }
  SetInputFacing(t, e = false) {
    this.j2r.DeepCopy(t);
    if (e) {
      if (!this.MoveComp || this.MoveComp.IsStandardGravity) {
        this.j2r.Z = 0;
      } else {
        Vector_1.Vector.VectorPlaneProject(this.j2r, this.MoveComp.GravityDirect, CharacterActorComponent_1.Lz);
        this.j2r.DeepCopy(CharacterActorComponent_1.Lz);
      }
    }
    if (!this.j2r.Normalize()) {
      this.j2r.DeepCopy(this.ActorForwardProxy);
    }
    this.NewestInputFacingType = 2;
  }
  SetOverrideTurnSpeed(t) {
    this.OverrideTurnSpeed = t;
  }
  OnInitData() {
    super.OnInitData();
    this.Z2r = new FunctionRequestProxy_1.FunctionRequestProxy();
    this.DisableMeshCollisionEnabledHandle = new BaseActorComponent_1.DisableEntityHandle("SetMeshCollisionEnabled");
    this.DisableMeshCollisionObjectTypeHandle = new BaseActorComponent_1.DisableEntityHandle("SetMeshCollisionObjectType");
    return !!this.InitCreatureData();
  }
  static m6(t) {
    this.d6 ||= new Map();
    let e = this.d6.get(t);
    if (!e) {
      e = Stats_1.Stat.Create(t);
      this.d6.set(t, e);
    }
    return e;
  }
  OnInit() {
    var t = Stats_1.Stat.Enable ? CharacterActorComponent_1.m6("CharacterActorComponent.SuperInit") : undefined;
    t?.Start();
    super.OnInit();
    t?.Stop();
    this.EntityType = this.CreatureData.GetEntityType();
    this.SubEntityType = this.CreatureData.GetSubEntityType();
    var t = Stats_1.Stat.Enable ? CharacterActorComponent_1.m6("CharacterActorComponent.GetModelConfig") : undefined;
    t?.Start();
    var e = this.CreatureDataInternal.GetModelId();
    t?.Stop();
    var t = Stats_1.Stat.Enable ? CharacterActorComponent_1.m6("CharacterActorComponent.InitActorNew") : undefined;
    t?.Start();
    var i = this.InitActorNew(e);
    t?.Stop();
    if (!i || !UE.KismetSystemLibrary.IsValid(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[CharacterActorComponent.OnInit] 加载actor失败。", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", e], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
    if (!i.IsA(UE.TsBaseCharacter_C.StaticClass())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 6, "[CharacterActorComponent.OnInit] Actor不是TsBaseCharacter", ["Name", i.GetName()], ["Class", i.GetClass().GetName()], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", e], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
    var s = i;
    s.SetPrimitiveBlueprintTypeName(new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId));
    this.SetCamp(s);
    s.CharacterActorComponent = this;
    s.SetEntityId(this.Entity.Id);
    var t = Stats_1.Stat.Enable ? CharacterActorComponent_1.m6("CharacterActorComponent.InitDefaultController") : undefined;
    t?.Start();
    this.InitDefaultController(i);
    t?.Stop();
    var t = Stats_1.Stat.Enable ? CharacterActorComponent_1.m6("CharacterActorComponent.InitOther") : undefined;
    t?.Start();
    this.ActorInternal = i;
    this.ActorInternal.OnDestroyed.Add(this.v9e);
    this.IsRoleAndCtrlByMe = false;
    var o = s.Mesh;
    switch (this.EntityType) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.CreatureDataInternal.GetPlayerId()) {
          s.RenderType = 0;
          this.IsRoleAndCtrlByMe = true;
        } else {
          s.RenderType = 1;
        }
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        s.RenderType = 3;
        var r = this.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
        for (let t = 0; t < r.Num(); t++) {
          var h = r.Get(t);
          h.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(true);
          h.SetSkeletalMeshScreenSizeCullRatio(0.001);
        }
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        s.RenderType = 2;
        if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.CreatureDataInternal.GetSummonerPlayerId()) {
          this.IsSummonsAndCtrlByMe = true;
        }
        if (!o || this.CreatureData.GetBaseInfo()?.Category.MonsterMatchType !== 0 && this.CreatureData.GetPbDataId() !== 611000008 && this.CreatureData.GetPbDataId() !== 611000009 && this.CreatureData.GetPbDataId() !== 611000010) {
          if (!o) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 24, "[CharacterActorComponent.OnInit] Monster Actor.Mesh不是SkeletalMeshComponent", ["Name", i.GetName()], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", e]);
            }
          }
        } else {
          o.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(true);
          o.SetSkeletalMeshScreenSizeCullRatio(0.004);
        }
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        s.RenderType = 4;
        if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.CreatureDataInternal.GetSummonerPlayerId()) {
          this.IsSummonsAndCtrlByMe = true;
        }
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Animal:
        if (o) {
          o.SetEnableOverrideSkeletalMeshScreenSizeCullRatio(true);
          o.SetSkeletalMeshScreenSizeCullRatio(0.005);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 24, "[CharacterActorComponent.OnInit] Animal Actor.Mesh不是SkeletalMeshComponent", ["Name", i.GetName()], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", e]);
        }
        break;
      default:
        s.RenderType = 7;
    }
    this.SetActorVisible(false, "[CharacterActorComponent.OnInit] 默认隐藏");
    this.SetCollisionEnable(false, "[CharacterActorComponent.OnInit] 默认关闭碰撞");
    this.SetTickEnable(false, "[CharacterActorComponent.OnInit] 默认关闭Tick");
    this.Actor.CharacterMovement?.SetKuroOnlyTickOutside(true);
    s.FightManager = GlobalData_1.GlobalData.BpFightManager;
    s.CharRenderingComponent.Init(s.RenderType);
    if (s.RenderType === 3) {
      s.CharRenderingComponent.UpdateNpcDitherComponent();
    }
    s.AutoPossessAI = 3;
    this.SetInputFacing(this.ActorForwardProxy);
    var a = this.CreatureDataInternal.GetInitLocation();
    if (a) {
      this.SetInitLocation(a);
    } else {
      this.SetInitLocation(this.ActorLocation);
    }
    this.InitSizeInternal();
    t?.Stop();
    return true;
  }
  GetReplaceEffect(t) {
    return this.ReplaceEffectMap.get(t);
  }
  SetReplaceEffect(t) {
    this.ReplaceEffectMap = t;
  }
  GetReplaceMontage(t) {
    return this.ReplaceMontageMap.get(t);
  }
  SetReplaceMontage(t) {
    this.ReplaceMontageMap = t;
  }
  InitDefaultController(t) {
    this.Oea = t.GetController();
    if (this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Player && this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Vision && this.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      if (this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Animal) {
        this.SetDefaultMovementMode(t);
      }
    } else if (this.DefaultController) {
      if (!(this.DefaultController instanceof UE.AIController)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 57, "Character初始化的默认Controller基类为非AiController", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["DefaultController", this.DefaultController]);
        }
      }
      if (this.DefaultController instanceof UE.PlayerController) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 57, "Character初始化的默认Controller基类为PlayerController,下场的人将会导致Movement不执行", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()]);
        }
        if (this.DefaultController.Pawn === t) {
          this.DefaultController.Pawn.DetachFromControllerPendingDestroy();
        }
        this.Oea = undefined;
        this.CreateDefaultController(t);
      }
    } else {
      this.CreateDefaultController(t);
    }
  }
  SetDefaultMovementMode(t) {
    t.CharacterMovement.SetDefaultMovementMode();
  }
  CreateDefaultController(t) {
    t.AIControllerClass = UE.KuroAIController.StaticClass();
    t.SpawnDefaultController();
    this.Oea = t.GetController();
  }
  SetActorRotation(t, e, i = false) {
    if (MathUtils_1.MathUtils.IsValidRotator(t)) {
      e = super.SetActorRotation(t, e, i);
      this.CachedActorRotation.DeepCopy(t);
      this.CachedRotationTime = Time_1.Time.Frame;
      this.CachedActorRotation.Quaternion(this.CachedActorQuat);
      return e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 30, "SetActorRotation NaN");
      }
      return false;
    }
  }
  SetActorRotationWithPriority(t, e, i, s = false, o = false) {
    var r = new FunctionRequestProxy_1.FunctionRequestWithPriority();
    r.ModuleName = e;
    r.Priority = i;
    return !!this.Z2r.DecideCall(r) && (this.ShowDebug && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 57, "[CharacterActorComponent.SetActorRotationWithPriority] 修改Rotation", ["EntityId", this.Entity.Id], ["module", e], ["rotation", t], ["oldRotation", this.ActorRotationProxy]), s && EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.RequestClearMeshRotationBuffer), this.SetActorRotation(t, e, o), true);
  }
  SetActorLocation(t, e, i = true) {
    if (this.IsRoleAndCtrlByMe && (CharacterActorComponent_1.Lz.FromUeVector(t), CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy), Math.abs(CharacterActorComponent_1.Lz.X) < MathUtils_1.MathUtils.SmallNumber) && Math.abs(CharacterActorComponent_1.Lz.Y) < MathUtils_1.MathUtils.SmallNumber && Math.abs(CharacterActorComponent_1.Lz.Z - 50) < MathUtils_1.MathUtils.SmallNumber && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "向上移动了50厘米", ["Actor", this.Actor.GetName()], ["NewLocation", t]);
    }
    return super.SetActorLocation(t, e, i);
  }
  TeleportTo(t, e, i) {
    if (this.IsRoleAndCtrlByMe && (CharacterActorComponent_1.Lz.FromUeVector(t), CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy), Math.abs(CharacterActorComponent_1.Lz.X) < MathUtils_1.MathUtils.SmallNumber) && Math.abs(CharacterActorComponent_1.Lz.Y) < MathUtils_1.MathUtils.SmallNumber && Math.abs(CharacterActorComponent_1.Lz.Z - 50) < MathUtils_1.MathUtils.SmallNumber && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "向上移动了50厘米", ["Actor", this.Actor.GetName()], ["NewLocation", t]);
    }
    return super.TeleportTo(t, e, i);
  }
  SetActorLocationAndRotation(t, e, i, s = false, o = undefined) {
    let r = false;
    var h;
    if (MathUtils_1.MathUtils.IsValidVector(t) && MathUtils_1.MathUtils.IsValidRotator(e)) {
      if (this.IsRoleAndCtrlByMe && (CharacterActorComponent_1.Lz.FromUeVector(t), CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy), Math.abs(CharacterActorComponent_1.Lz.X) < MathUtils_1.MathUtils.SmallNumber) && Math.abs(CharacterActorComponent_1.Lz.Y) < MathUtils_1.MathUtils.SmallNumber && Math.abs(CharacterActorComponent_1.Lz.Z - 50) < MathUtils_1.MathUtils.SmallNumber && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "向上移动了50厘米", ["Actor", this.Actor.GetName()], ["NewLocation", t]);
      }
      r = !o || ((h = new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName = i, h.Priority = o, this.Z2r.DecideCall(h)) ? super.SetActorLocationAndRotation(t, e, i, s) : super.SetActorLocation(t, i, s);
      this.CachedActorRotation.DeepCopy(e);
      this.CachedRotationTime = Time_1.Time.Frame;
      this.CachedActorRotation.Quaternion(this.CachedActorQuat);
      this.OnTeleport();
      return r;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 30, "SetActorLocationAndRotation NaN");
      }
      return false;
    }
  }
  SetActorTransform(t, e, i = true, s = undefined) {
    var o;
    if (this.IsRoleAndCtrlByMe && (CharacterActorComponent_1.Lz.FromUeVector(t.GetLocation()), CharacterActorComponent_1.Lz.SubtractionEqual(this.ActorLocationProxy), Math.abs(CharacterActorComponent_1.Lz.X) < MathUtils_1.MathUtils.SmallNumber) && Math.abs(CharacterActorComponent_1.Lz.Y) < MathUtils_1.MathUtils.SmallNumber && Math.abs(CharacterActorComponent_1.Lz.Z - 50) < MathUtils_1.MathUtils.SmallNumber && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "向上移动了50厘米", ["Actor", this.Actor.GetName()], ["NewLocation", t]);
    }
    if (s) {
      (o = new FunctionRequestProxy_1.FunctionRequestWithPriority()).ModuleName = e;
      o.Priority = s;
      if (!this.Z2r.DecideCall(o)) {
        t.SetRotation(this.ActorRotation.Quaternion());
      }
    }
    return super.SetActorTransform(t, e, i);
  }
  SetActorTransformExceptMesh(t, e, i = true, s) {
    this.CachedDesiredActorLocation.FromUeVector(t.GetLocation());
    this.IsChangingLocation = true;
    t = this.Actor.SetActorTransformExceptSkelMesh(t, i, undefined, true, true);
    this.IsChangingLocation = false;
    this.CheckIsForbidSettingLocAndRot(true, true);
    if (this.DebugMovementComp) {
      this.DebugMovementComp.MarkDebugRecord(e + ".SetActorTransformExceptMesh", 1);
    }
    this.ResetTransformCachedTime();
    this.OnTeleport();
    return t;
  }
  SetActorLocationAndRotationExceptMesh(t, e, i, s = true, o) {
    this.CachedDesiredActorLocation.FromUeVector(t);
    this.IsChangingLocation = true;
    t = this.Actor.SetActorLocationAndRotationExceptSkelMesh(t, e, s, undefined, true, true);
    this.IsChangingLocation = false;
    this.CheckIsForbidSettingLocAndRot(true, true);
    if (this.DebugMovementComp) {
      this.DebugMovementComp.MarkDebugRecord(i + ".SetActorLocationAndRotationExceptMesh", 1);
    }
    this.ResetTransformCachedTime();
    return t;
  }
  KuroMoveAlongFloor(t, e, i = "unknown") {
    if (!this.CheckIsForbidSettingLocAndRot(true)) {
      this.Actor.CharacterMovement.KuroMoveAlongFloor(t, e);
      this.ResetLocationCachedTime();
      if (this.DebugMovementComp) {
        this.DebugMovementComp.MarkDebugRecord(i + ".KuroMoveAlongFloor", 1);
      }
    }
  }
  AddActorWorldOffset(t, e = "unknown", i = true) {
    if (!this.CheckIsForbidSettingLocAndRot(true)) {
      if (i) {
        this.Actor.CharacterMovement.D_MoveAdjust(t);
        this.ResetLocationCachedTime();
        if (this.DebugMovementComp) {
          this.DebugMovementComp.MarkDebugRecord(e + ".AddActorWorldOffset", 1);
        }
      } else {
        super.AddActorWorldOffset(t, e, i);
      }
    }
  }
  AddActorWorldOffsetWithReset(t, e = "unknown", i = true) {
    if (!this.CheckIsForbidSettingLocAndRot(true)) {
      if (i) {
        if (this.DebugMovementComp) {
          this.DebugMovementComp.MarkDebugRecord(e + ".AddActorWorldOffsetWithReset", 1);
        }
        this.Actor.CharacterMovement.D_MoveAdjust(t);
        this.ResetLocationCachedTime();
      } else {
        super.AddActorWorldOffset(t, e, i);
      }
    }
  }
  OnStart() {
    super.OnStart();
    AoiController_1.AoiController.AddMonsterSizeTag(this.Entity);
    var t;
    var e = this.Actor;
    this.DebugMovementComp = this.Entity.GetComponent(30);
    if (e) {
      GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor);
      this.uFr();
      e.SetPrimitiveEntityType(RenderConfig_1.RenderConfig.GetEntityRenderPriority(this.IsBoss, this.EntityType));
      if (GlobalData_1.GlobalData.IsPlayInEditor && (t = e.TsCharacterDebugComponent)) {
        t.DebugCreatureId = this.CreatureDataInternal.GetOwnerId();
        t.DebugEntityId = this.Entity.Id;
      }
      this.cFr();
      if (ModelManager_1.ModelManager.SundryModel.RoleMoveDebugLogOn && this.IsRoleAndCtrlByMe) {
        e.RootComponent.bKuroMoveDebugLog = true;
      }
      CameraController_1.CameraController.LoadCharacterCameraConfig(e.DtCameraConfig);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FixBornLocation, this.iFr);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[CharacterActorComponent.OnInit] 加载actor失败。", ["EntityId", this.Entity.Id], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PlayerId", this.CreatureDataInternal.GetPlayerId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0).ActorVisible;
    this.SetActorVisible(t, "[CharacterActorComponent.OnActivate] Visible");
    this.SetCollisionEnable(t, "[CharacterActorComponent.OnActivate] Visible");
    this.SetTickEnable(true, "[CharacterActorComponent.OnActivate] Visible");
    super.OnActivate();
    this.mFr();
    ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(this.CreatureDataInternal, this.ActorInternal);
    this.ClearInput();
    this.Entity.IsEncloseSpace = ControllerHolder_1.ControllerHolder.WorldController.IsEncloseSpace(this.CreatureData.GetPbDataId(), this.ActorLocation, this.EntityType, this.CreatureData.GetEntityConfigType(), this.IsSummonsAndCtrlByMe);
    if (this.Entity.IsEncloseSpace) {
      if (ModelManager_1.ModelManager.WorldModel?.CurEnvironmentInfo.jNn === 3) {
        this.VNn(this.ActorLocation);
      } else {
        this.HNn();
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEncloseSpaceTypeChange, this.FNn);
    } else {
      this.HNn();
    }
    if (this.CreatureData.PbHackedByEntities) {
      ControllerHolder_1.ControllerHolder.FollowShooterHackController.AddRelationship(this.CreatureData.PbHackedByEntities, this.CreatureData.GetCreatureDataId());
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBasePlatformChanged, this.q61);
  }
  OnTick(t) {
    super.OnTick(t);
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && (this.Y2r || this.IsAutonomousProxy && !this.IsMoveAutonomousProxy) && (this.J2r -= t * MathUtils_1.MathUtils.MillisecondToSecond, this.J2r <= 0)) {
      this.ResetMoveControlled("控制超时");
    }
    this.Actor.DitherEffectController?.Update(t);
  }
  OnEnd() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnEndPlay, this.Entity);
    GlobalData_1.GlobalData.BpFightManager.删除Debug的对象(this.Actor);
    if (this.ActorInternal?.IsValid() && (this.ActorInternal.OnDestroyed.Remove(this.v9e), this.ActorInternal instanceof TsBaseCharacter_1.default)) {
      if (this.ActorInternal.Controller?.IsValid() && this.ActorInternal.Controller.Pawn === this.ActorInternal) {
        if (this.ActorInternal.Controller === Global_1.Global.CharacterController) {
          this.ActorInternal.Controller.UnPossess();
        } else {
          this.ActorInternal.DetachFromControllerPendingDestroy();
        }
      }
      this.ActorInternal.DitherEffectController?.Clear();
      this.ActorInternal.DitherEffectController = undefined;
      this.ActorInternal.CharacterActorComponent = undefined;
    }
    this.IsInSequenceBinding = false;
    CameraController_1.CameraController.UnloadCharacterCameraConfig(this.Actor.DtCameraConfig);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.CharBasePlatformChanged, this.q61)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBasePlatformChanged, this.q61);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FixBornLocation, this.iFr);
    if (this.Entity.IsEncloseSpace) {
      if (this.NNn) {
        TimerSystem_1.TimerSystem.Remove(this.NNn);
        this.NNn = undefined;
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEncloseSpaceTypeChange, this.FNn);
    }
    this.Actor.CharRenderingComponent?.Destroy();
    return true;
  }
  OnClear() {
    super.OnClear();
    TimerSystem_1.TimerSystem.Next(() => {
      if (this.Actor?.IsValid()) {
        this.Actor.Mesh?.SetSkeletalMesh(this.ClassDefaultObject.Mesh.SkeletalMesh);
        this.Actor.Mesh?.SetAnimClass(this.ClassDefaultObject.Mesh.AnimClass);
      }
    });
    this.SetInputDirectByNumber(0, 0, 0);
    this.SetInputFacing(Vector_1.Vector.ForwardVectorProxy);
    this.DisableMeshCollisionEnabledHandle.Clear();
    this.DisableMeshCollisionObjectTypeHandle.Clear();
    return !(this.poa = undefined);
  }
  OnEnable() {
    this.OnSetActorActive(true);
    this.ResetAllCachedTime();
  }
  OnDisable(t) {
    this.OnSetActorActive(false, t);
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(123)?.CurrentTimeScale ?? 1;
    this.ActorInternal.CustomTimeDilation = t * e;
  }
  dFr() {
    if (this.ActorInternal) {
      if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
        if (this.Entity.GameBudgetManagedToken !== undefined) {
          cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, this.ActorInternal);
          this.G61();
        } else {
          this.Entity.RegisterToGameBudgetController(this.ActorInternal);
          this.Entity.GetComponent(122)?.RegisterPerceptionEvent();
        }
        if (this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player || this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Vision || this.IsSummonsAndCtrlByMe) {
          cpp_1.FKuroGameBudgetAllocatorInterface.SetActorCavernMode(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, 3);
        } else {
          cpp_1.FKuroGameBudgetAllocatorInterface.SetActorCavernMode(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, this.Entity.IsEncloseSpace ? 2 : 1);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 24, "[CharacterActorComponent.OnActivate] 没有找到Actor", ["EntityId", this.Entity.Id], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PlayerId", this.CreatureDataInternal.GetPlayerId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
    }
    JsModelManager_1.JsModelManager.UpdateEntityActor(this.Entity.Id, this.ActorInternal);
  }
  OnSetActorActive(e, t) {
    super.OnSetActorActive(e, t);
    if (e) {
      this.MoveComp?.StopMove(!e);
    }
    if (this.Actor?.IsValid()) {
      var t = this.Actor.GetComponentByClass(UE.NavigationInvokerComponent.StaticClass());
      if (t) {
        t.SetActive(e);
      }
      var t = (0, puerts_1.$ref)(undefined);
      this.Actor.GetAttachedActors(t, true);
      var i = (0, puerts_1.$unref)(t);
      for (let t = 0; t < i.Num(); ++t) {
        i.Get(t).SetActorHiddenInGame(!e);
      }
      t = this.Actor.DitherEffectController;
      if (t) {
        if (e) {
          t.SetIsDisable(false, 1);
        } else {
          t.SetIsDisable(true);
        }
      }
      this.SetActorXRayState(false);
    }
  }
  gFr(t) {
    var e = CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer();
    e.Pawn = e.GameTraceChannel5 = e.GameTraceChannel8 = 1;
    this.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.Bullet, 1);
    this.Actor.CapsuleComponent.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.BulletSpecial, 1);
    if (t) {
      this.Actor.CapsuleComponent.KuroAddPassiveProxyChannel(QueryTypeDefine_1.KuroCollisionChannel.Bullet);
      this.Actor.CapsuleComponent.KuroAddPassiveProxyChannel(QueryTypeDefine_1.KuroCollisionChannel.BulletSpecial);
    }
    this.IsPartHitInternal = t;
    this.fFr(this.Actor.CapsuleComponent);
    this.Actor.Mesh.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.PhysicsBody);
    this.Actor.Mesh.SetCollisionResponseToChannels(e);
  }
  TeleportAndFindStandLocation(t) {
    if (!this.FixBornLocation("传送到目前位置", true, t, true)) {
      this.TeleportTo(t.ToUeVector(), this.ActorRotationProxy.ToUeRotator(), "传送到目前位置失败,直接设置位置");
    }
  }
  oFr() {
    switch (this.Actor.CharacterMovement.DefaultLandMovementMode) {
      case 1:
      case 2:
      case 0:
      case 3:
        this.FixBornLocation("实体初始化.地面修正");
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 18, "[CharacterActorComponent.FixBornLocationByMovementMode] 实体地面修正:当前处于不可修正的移动状态", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["MovementMode", this.Actor.CharacterMovement.MovementMode]);
        }
    }
  }
  FixBornLocation(t = "unknown.FixBornLocation", e = true, i = undefined, s = false, o = false, r = true) {
    let h = false;
    switch (this.Actor.CharacterMovement.MovementMode) {
      case 1:
      case 2:
      case 0:
      case 3:
        break;
      case 6:
        if (this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE && this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI && this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE && this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL) {
          h = true;
        }
        break;
      default:
        h = true;
    }
    if (h) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:无需修正", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["MovementMode", this.Actor.CharacterMovement.MovementMode], ["Context", t]);
      }
      return false;
    } else {
      return !!(i = this.FixActorLocation(exports.FIX_SPAWN_TRACE_HEIGHT, e, i, t, r, o))[0] && (s ? this.TeleportTo(i[1].ToUeVector(), this.ActorRotationProxy.ToUeRotator(), t) : this.SetActorLocation(i[1].ToUeVector(), t, false), e && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:后", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()], ["Context", t]), true);
    }
  }
  FixSwitchLocation(t = "unknown.FixSwitchLocation", e = true, i = false) {
    i = this.FixActorLocation(FIX_SWITCH_SPAWN_TRACE_HEIGHT, e, undefined, t, false, i);
    return !!i[0] && (this.SetActorLocation(i[1].ToUeVector(), t, false), e && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixSwitchLocation] 实体地面修正:后", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()], ["Context", t]), true);
  }
  RestoreDefaultController() {
    if (!this.DefaultController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "[CharacterActorComponent.RestoreDefaultController] 没有DefaultController,将导致这个实体部分功能失效比如移动,查看OnStart 有无正常初始化DefaultController", ["Id", this.Entity.Id]);
      }
    }
    this.DefaultController.Possess(this.Actor);
  }
  get ActorVelocityProxy() {
    if (this.CachedVelocityTime < Time_1.Time.Frame) {
      this.CachedVelocityTime = Time_1.Time.Frame;
      this.W2r.DeepCopy(this.Actor.D_GetVelocity());
    }
    return this.W2r;
  }
  SetActorVelocity(t) {
    var e;
    if (this.Actor.RootComponent) {
      if (MathUtils_1.MathUtils.IsValidVector(t)) {
        e = t.ToUeVectorOld();
        this.Actor.RootComponent.ComponentVelocity = e;
        if (this.Actor.CharacterMovement) {
          this.Actor.CharacterMovement.Velocity = e;
        }
        this.W2r.DeepCopy(t);
        this.Entity.GetComponent(114)?.CacheVelocityInfo("SetActorVelocity");
        if (GravityUtils_1.GravityUtils.GetZnInGravityForActor(this, t) < -10000 && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 6, "1117317 Bug追踪，设置速度", ["Name", this.Actor.GetName()], ["Velocity", t]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Set Invalid Velocity", ["v", t]);
      }
    }
  }
  get IsActorMoveInfoCache() {
    return !(this.CachedLocationTime < Time_1.Time.Frame) && !(this.CachedRotationTime < Time_1.Time.Frame) && !(this.CachedVelocityTime < Time_1.Time.Frame);
  }
  get ActorVelocity() {
    return this.ActorVelocityProxy.ToUeVectorOld();
  }
  get DefaultRadius() {
    return this.DefaultRadiusInternal;
  }
  get DefaultHalfHeight() {
    return this.DefaultHalfHeightInternal;
  }
  get IsDefaultCapsule() {
    return this.X2r;
  }
  GetRadius() {
    return this.RadiusInternal;
  }
  get FloorLocation() {
    this.Q2r.FromUeVector(this.ActorLocationProxy);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this, this.Q2r, -this.ScaledHalfHeight);
    return this.Q2r;
  }
  SetRadiusAndHalfHeight(t, e, i = true, s = false) {
    var o = this.HalfHeightInternal;
    var r = this.Radius;
    var h = this.Actor.CharacterMovement?.MovementMode;
    this.X2r = t === this.DefaultRadius && e === this.DefaultHalfHeight;
    this.RadiusInternal = t;
    this.HalfHeightInternal = e;
    this.Actor.CapsuleComponent.SetCapsuleRadius(t, i);
    this.Actor.CapsuleComponent.SetCapsuleHalfHeight(e, i);
    RoleTriggerController_1.RoleTriggerController.UpdateRoleTriggerHalfHeightAndRadius(t, e, i);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.Entity, t, e);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterCapsuleChanged, this.Entity, t, e);
    if (!!s && (o !== e || r !== t) && (h === 1 || h === 2 || h === 0)) {
      i = Math.min(0, e - o);
      if ((s = this.FixActorLocation(i)) && s[0] && (this.SetActorLocation(s[1].ToUeVector(), "修改胶囊体后地面修正", false), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Entity", 67, "[CharacterActorComponent.SetRadiusAndHalfHeight] 地面修正:后", ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()]);
      }
    }
  }
  ResetCapsuleRadiusAndHeight(e = false) {
    this.SetRadiusAndHalfHeight(this.DefaultRadiusInternal, this.DefaultHalfHeightInternal, true, e);
    this.X2r = true;
    if (!e) {
      let t = false;
      switch (this.Actor.CharacterMovement.MovementMode) {
        case 1:
        case 2:
        case 0:
        case 3:
          break;
        case 6:
          if (this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE && this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI && this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE && this.Actor.CharacterMovement.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL) {
            t = true;
          }
          break;
        default:
          t = true;
      }
      var i;
      var s;
      if (t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:无需修正", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["MovementMode", this.Actor.CharacterMovement.MovementMode]);
        }
      } else {
        e = this.ActorLocationProxy;
        (i = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation).Set(e.X, e.Y, e.Z + Math.max(0, this.ScaledHalfHeight - this.ScaledRadius));
        (s = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation).Set(e.X, e.Y, e.Z - Math.max(0, this.ScaledHalfHeight - this.ScaledRadius));
        this.FixBornLocationInternal(e, i, s, true, true, "CharacterActorComponent.ResetCapsuleRadiusAndHeight");
      }
    }
  }
  SetDefaultRadiusAndHalfHeight(t, e) {
    this.DefaultRadiusInternal = t;
    this.DefaultHalfHeightInternal = e;
    this.X2r = t === this.RadiusInternal && e === this.HalfHeightInternal;
  }
  ChangeMeshAnim(t, e) {
    ControllerHolder_1.ControllerHolder.CreatureController.ChangeMeshAnim(this.Actor.Mesh, t, e);
    this.Actor.CharRenderingComponent.Init(this.Actor.RenderType);
    this.IsChangingMeshAnim = true;
    TimerSystem_1.TimerSystem.Next(() => {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharChangeMeshAnim);
      this.IsChangingMeshAnim = false;
    });
  }
  IsWorldOwner() {
    return !!this.CreatureDataInternal && ModelManager_1.ModelManager.CreatureModel.GetWorldOwner() === this.CreatureDataInternal.GetPlayerId();
  }
  IsMyRoleAndCtrlByMe() {
    return !!this.CreatureDataInternal && this.IsRoleAndCtrlByMe && !this.CreatureDataInternal.IsAutoRole();
  }
  IsMySummonsAndCtrlByMe() {
    if (this.IsSummonsAndCtrlByMe) {
      var t = this.CreatureDataInternal?.GetSummonerId();
      if (t && t !== 0) {
        t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity?.GetComponent(3);
        if (t) {
          return t.IsMyRoleAndCtrlByMe();
        }
      }
    }
    return false;
  }
  GetSummonerId() {
    var t = this.CreatureDataInternal?.GetSummonerId();
    if (t && t !== 0) {
      t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t)?.Entity;
      if (t) {
        return t.Id;
      }
    }
    return 0;
  }
  ClearInput(t = false, e = true) {
    var i;
    this.SetInputDirect(Vector_1.Vector.ZeroVector);
    this.SetInputFacing(this.ActorForwardProxy);
    this.SetOverrideTurnSpeed(0);
    if (Info_1.Info.AxisInputOptimize && ((i = this.Entity.GetComponent(62)) && (i.ClearInputAxis(false, t), i.InterruptAutoMoving("ActorComp.ClearInput")), e)) {
      ModelManager_1.ModelManager.InputModel?.TemporaryClearAxisValues();
    }
  }
  cFr() {
    var t = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(this.Actor.GetClass());
    const e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(t);
    const _ = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e)?.PartHitEffect.ToAssetPathName();
    let C = _ !== undefined && _.length > 0 && _ !== "None";
    if (C) {
      ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.BP_PartHitEffect_C, t => {
        if (this.Actor?.IsValid()) {
          CharacterActorComponent_1.pFr.Start();
          this.sFr = t;
          if ((C = this.sFr?.IsValid() ?? false) && this.Actor) {
            let e = this.sFr.PartCollision.Num();
            for (let t = 0; t < e; t++) {
              var i = this.sFr.PartCollision.Get(t);
              this.rFr.set(i.BoneName, i);
            }
            C = false;
            e = this.Actor.Mesh.GetNumChildrenComponents();
            for (let t = 0; t < e; t++) {
              var s;
              var o = this.Actor.Mesh.GetChildComponent(t);
              var r = o.GetName();
              if (o.IsA(UE.CapsuleComponent.StaticClass()) || o.IsA(UE.BoxComponent.StaticClass())) {
                s = this.rFr.get(r);
                this.nFr.set(r, o);
                if (s) {
                  C = true;
                  o.bGenerateOverlapEvents = true;
                  this.SetPartPassiveCollision(o, false);
                  this.SetPartCollisionSwitch(r, s.IsBlockPawn, s.IsBulletDetect, s.IsBlockCamera);
                } else if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("Character", 20, "部位缺少配置", ["PartHitEffect路径", _], ["Component Name", r]);
                }
              } else if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Character", 20, "部位组件不是碰撞体类型", ["Component Name", r]);
              }
            }
            e = this.sFr.AimParts.Num();
            this.AimParts.clear();
            for (let t = 0; t < e; ++t) {
              var h = new AimPartUtils_1.AimPart(this);
              h.Init(this.sFr.AimParts.Get(t));
              this.AimParts.set(h.BoneNameString, h);
            }
            e = this.sFr.LockOnParts.Num();
            this.LockOnParts.clear();
            for (let t = 0; t < e; ++t) {
              var a = new LockOnPart(this.sFr.LockOnParts.Get(t));
              this.LockOnParts.set(a.BoneNameString, a);
            }
            for (const c of oldLockOnPartNames) {
              var n;
              if (!this.LockOnParts.get(c.toString())) {
                if (this.Actor.Mesh.DoesSocketExist(c)) {
                  n = new LockOnPart(c);
                  this.LockOnParts.set(n.BoneNameString, n);
                }
              }
            }
            this.StartHideDistance = this.sFr.StartHideDistance;
            this.CompleteHideDistance = this.sFr.CompleteHideDistance;
            this.StartDitherValue = this.sFr.StartDitherValue;
            this.LockOnConfig = new LockOnConfig(this.sFr.LockOnConfig);
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 20, "没配置PartHit", ["BP路径", e], ["Actor是否为空", this.Actor === undefined]);
          }
          this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0;
          this.gFr(C);
          CharacterActorComponent_1.pFr.Stop();
        }
      });
    } else {
      this.Actor.CapsuleComponent.CanCharacterStepUpOn = 0;
      this.gFr(C);
    }
  }
  GetBoneLocation(t) {
    var e = this.nFr.get(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 20, "GetBoneLocation", ["Character", this.Actor.GetName()], ["Bone", t]);
      }
    }
    return e.D_K2_GetComponentLocation();
  }
  CFr() {
    var t = this.CreatureDataInternal.GetModelConfig();
    if (t && t?.IsHiddenWithCamera) {
      this.Actor.CharRenderingComponent.SetCapsuleDither(1);
    }
  }
  SetMoveControlled(t, e = 2, i = "") {
    this.Y2r = true;
    this.J2r = e;
    if (this.IsMoveAutonomousProxy !== t) {
      this.SetMoveAutonomous(t, i);
      this.Entity.GetComponent(50)?.ClearOrders();
    }
  }
  ResetMoveControlled(t = "") {
    this.Y2r = false;
    this.J2r = 0;
    this.SetMoveAutonomous(this.IsAutonomousProxy, t);
  }
  SetAutonomous(t, e = undefined) {
    CombatLog_1.CombatLog.Info("Control", this.Entity, "设置逻辑主控", ["v", t]);
    super.SetAutonomous(t, e);
  }
  SetMoveAutonomous(t, e = "") {
    CombatLog_1.CombatLog.Info("Control", this.Entity, "设置移动主控", [e, t]);
    var e = this.Y2r;
    super.SetMoveAutonomous(t);
    var i = this.Entity.GetComponent(178);
    if (i) {
      i.MainAnimInstance?.SetStateMachineNetMode(!t);
      i.SpecialAnimInstance?.SetStateMachineNetMode(!t);
    }
    if (t !== e) {
      if (this.IsAutonomousProxy) {
        if (i = this.MoveComp) {
          i.StopAllAddMove();
          i.SetAddMoveOffset(undefined);
          i.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
        }
        this.Entity.GetComponent(68)?.ClearReplaySamples();
      }
      this.Entity.GetComponent(50)?.ClearOrders();
    }
  }
  GetMapPartCollision() {
    return this.nFr;
  }
  GetPartHitConf(t) {
    return this.rFr.get(t);
  }
  uFr() {
    var t;
    if (this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Monster && !!(t = this.Entity.GetComponent(0)?.GetBaseInfo()?.Category?.MonsterMatchType) && (t === 3 || t === 2)) {
      this.$2r = true;
    }
  }
  SetPartPassiveCollision(t, e = true) {
    t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = true;
    t.KuroSetPassiveCollision(true, e);
  }
  IsPartComponentEnable(t) {
    return !this.aFr.has(t) || this.aFr.get(t);
  }
  SetPartCollisionSwitch(t, e, i, s) {
    var o;
    var r = this.nFr.get(t);
    if (r?.IsValid()) {
      this.fFr(r);
      (o = CollisionUtils_1.CollisionUtils.GetCollisionResponseContainer()).Pawn = o.GameTraceChannel5 = o.GameTraceChannel8 = e ? 2 : 1;
      o.Camera = s ? 2 : 1;
      o.GameTraceChannel6 = o.GameTraceChannel16 = i ? 1 : 0;
      this.aFr.set(t, i);
      r.SetCollisionResponseToChannels(o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 20, "碰撞体不存在", ["name", t], ["character name", this.Actor.GetName()]);
    }
  }
  GetPartConf(t) {
    return this.rFr.get(t);
  }
  mFr() {
    var t = this.Entity.GetComponent(0)?.GetEntityType();
    if (Protocol_1.Aki.Protocol.kks.Proto_Monster === t) {
      var e = this.Entity.GetComponent(206);
      if (this.LockOnConfig?.IsOpened) {
        CharacterLockOnComponent_1.CharacterLockOnComponent.EnhancedEntityIds.add(this.Entity.Id);
        for (const s of CharacterLockOnComponent_1.lockOnEnhancedTags) {
          e?.AddTag(s);
        }
      }
      t = this.Entity.GetComponent(0)?.GetMonsterComponent()?.InitGasTag;
      if (t && t.length > 0) {
        for (const o of t) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o);
          if (i) {
            e?.AddTag(i);
          }
        }
      }
    }
  }
  fFr(t) {
    if (this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player || this.Entity.GetComponent(0)?.GetEntityCamp() === 0) {
      t.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer);
    } else if (this.Entity.GetComponent(0)?.GetEntityCamp() === 1) {
      t.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.PawnMonster);
    } else {
      t.SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.Pawn);
    }
  }
  SetInitLocation(t) {
    BlackboardController_1.BlackboardController.SetVectorValueByEntity(this.Entity.Id, INIT_LOCATION_KEY, t.X, t.Y, t.Z);
  }
  GetInitLocation() {
    return BlackboardController_1.BlackboardController.GetVectorValueByEntity(this.Entity.Id, INIT_LOCATION_KEY);
  }
  get WanderDirectionType() {
    var t;
    if (this.rDn === 3) {
      t = this.Entity.GetComponent(179)?.MovementData;
      this.rDn = t?.WanderDirection ?? 0;
    }
    return this.rDn;
  }
  GetWanderDirection(t, e, i) {
    this.Lz.DeepCopy(t);
    if (i === 1) {
      this.Lz.MultiplyEqual(-1);
    }
    if (this.WanderDirectionType === 2 && !(t = MathUtils_1.MathUtils.WrapAngle(MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) - this.ActorRotationProxy.Yaw), Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE)) {
      this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
      if (e.Y > 0) {
        this.Lz.MultiplyEqual(-1);
      }
    }
    return this.Lz;
  }
  GetNearestDirection(t, e) {
    this.Lz.DeepCopy(t);
    if (this.WanderDirectionType === 2) {
      t = MathUtils_1.MathUtils.WrapAngle(MathUtils_1.MathUtils.GetAngleByVector2D(this.Lz) - this.ActorRotationProxy.Yaw);
      if (Math.abs(Math.abs(t) - 90) < MAX_NO_ROTATER_ANGLE) {
        return this.ActorForwardProxy;
      }
    }
    switch (e) {
      case 0:
        break;
      case 1:
        this.Lz.UnaryNegation(this.Lz);
        break;
      case 2:
        this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
        break;
      case 3:
        this.Lz.MultiplyEqual(-1);
        this.Lz.CrossProduct(this.ActorUpProxy, this.Lz);
    }
    return this.Lz;
  }
  InputWanderDirection(t, e) {
    if (t.IsNearlyZero()) {
      this.SetInputDirect(Vector_1.Vector.ZeroVector);
    } else if (this.WanderDirectionType === 0) {
      this.SetInputDirect(t);
    } else {
      let t = true;
      if (Time_1.Time.Now - this.nDn[1] < CommonDefine_1.MILLIONSECOND_PER_SECOND) {
        t = this.nDn[0];
      } else {
        if (this.WanderDirectionType === 1) {
          t = e.X > 0;
        } else {
          if (this.WanderDirectionType !== 2) {
            return;
          }
          t = e.Y > 0;
        }
        if (this.nDn[0] !== t) {
          this.nDn[0] = t;
          this.nDn[1] = Time_1.Time.Now;
        }
      }
      switch (this.WanderDirectionType) {
        case 1:
          if (t) {
            this.SetInputDirect(this.ActorForwardProxy);
          } else {
            this.Lz.DeepCopy(this.ActorForwardProxy);
            this.Lz.MultiplyEqual(-1);
            this.SetInputDirect(this.Lz);
          }
          break;
        case 2:
          if (t) {
            this.SetInputDirect(this.ActorRightProxy);
          } else {
            this.Lz.DeepCopy(this.ActorRightProxy);
            this.Lz.MultiplyEqual(-1);
            this.SetInputDirect(this.Lz);
          }
      }
    }
  }
  SetOtherMeshCollisionEnabled(t, e) {
    e = this.DisableMeshCollisionEnabledHandle.Disable(e, this.constructor.name);
    if (this.ActorInternal?.IsValid()) {
      this.Actor.Mesh.SetCollisionEnabled(t);
    }
    return e;
  }
  ResetMeshEnableCollision(t) {
    t = this.DisableMeshCollisionEnabledHandle.Enable(t, this.constructor.name);
    if (t && this.ActorInternal?.IsValid() && this.Actor.Mesh.GetCollisionEnabled() !== 0) {
      this.Actor.Mesh.SetCollisionEnabled(0);
    }
    return t;
  }
  SetMeshCollisionEnabled(t, e) {
    if (t !== 0) {
      return !this.hFr && (this.hFr = this.SetOtherMeshCollisionEnabled(t, e), true);
    } else {
      return !!this.hFr && !(this.ResetMeshEnableCollision(this.hFr), this.hFr = undefined);
    }
  }
  SetOtherMeshCollisionObjectType(t, e) {
    e = this.DisableMeshCollisionObjectTypeHandle.Disable(e, this.constructor.name);
    if (this.ActorInternal?.IsValid()) {
      this.Actor.Mesh.SetCollisionObjectType(t);
    }
    return e;
  }
  ResetMeshCollisionObjectType(t) {
    t = this.DisableMeshCollisionObjectTypeHandle.Enable(t, this.constructor.name);
    if (t && this.ActorInternal?.IsValid() && this.Actor.Mesh.GetCollisionObjectType() !== 2) {
      this.Actor.Mesh.SetCollisionObjectType(2);
    }
    return t;
  }
  SetMeshCollisionObjectType(t, e) {
    if (t !== 2) {
      return !this.MeshHandleForCollisionType && (this.MeshHandleForCollisionType = this.SetOtherMeshCollisionObjectType(t, e), true);
    } else {
      return !!this.MeshHandleForCollisionType && !(this.ResetMeshCollisionObjectType(this.MeshHandleForCollisionType), this.MeshHandleForCollisionType = undefined);
    }
  }
  G61() {
    var t;
    var e;
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && this.Entity.GameBudgetConfig && this.Entity.GameBudgetManagedToken) {
      t = this.Entity.GetComponent(176)?.IsInFighting;
      e = !!this.Entity.GetComponent(179)?.BasePlatform;
      cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, t || e);
    }
  }
  GetSocketTransform(t) {
    if (!this.Entity.IsInit) {
      return this.CreatureData.D_GetTransform();
    }
    if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
      var e = this.Actor;
      if (e.Mesh.DoesSocketExist(t)) {
        return e.Mesh.D_GetSocketTransform(t, 0);
      }
    }
    return this.ActorTransform;
  }
  GetSocketLocation(t) {
    if (!this.Entity.IsInit) {
      return this.CreatureData.GetLocation();
    }
    if (!FNameUtil_1.FNameUtil.IsNothing(t)) {
      var e = this.Actor.Mesh;
      if (e.DoesSocketExist(t)) {
        return e.D_GetSocketLocation(t);
      }
    }
    return this.ActorLocation;
  }
  SetActorXRayState(e) {
    if (this.IsRoleAndCtrlByMe) {
      this.Actor.Mesh?.SetRenderInKuroXRayPass(e);
      this.poa?.forEach(t => {
        t?.SetRenderInKuroXRayPass(e);
      });
    }
  }
  SetActorXRayColor(e) {
    if (this.IsRoleAndCtrlByMe) {
      this.Actor.Mesh?.SetKuroXRayColor(e);
      this.poa?.forEach(t => {
        t?.SetKuroXRayColor(e);
      });
    }
  }
  SetSceneTrailState(t) {
    if (this.SkeletalMesh) {
      this.SkeletalMesh.SetRenderKuroTrail(t);
    }
  }
  AddExtraSkeletalMeshComponent(t) {
    this.poa ||= [];
    this.poa.push(t);
  }
  GetExtraSkeletalMeshComponent() {
    return this.poa;
  }
  VNn(t) {
    if (GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings().bEnableWorldPartition) {
      if (t) {
        const e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass());
        t = new UE.WorldPartitionStreamingQuerySource(t.op_ToVector(), PHYSIC_STREAMING_CHECK_RANGE, false, false, undefined, false, true, undefined);
        const i = UE.NewArray(UE.WorldPartitionStreamingQuerySource);
        i.Add(t);
        if (this.NNn) {
          TimerSystem_1.TimerSystem.Remove(this.NNn);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 7, "等待物理流送(开始)", ["PbDataId:", this.CreatureData.GetPbDataId()]);
        }
        this.NNn = TimerSystem_1.TimerSystem.Forever(() => {
          if (e.IsStreamingCompletedWithPhysicsReady(1, i) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("World", 7, "等待物理流送(结束)", ["PbDataId:", this.CreatureData?.GetPbDataId()]), this.Entity?.Valid)) {
            TimerSystem_1.TimerSystem.Remove(this.NNn);
            this.NNn = undefined;
            if (this.kNn) {
              this.dFr();
            } else {
              this.HNn();
            }
          }
        }, PHYSIC_STREAMING_CHECK_PERIOD);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 7, "[WaitForPhysicStreaming]location参数无效,无法生成实体", ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
    } else {
      this.HNn();
    }
  }
  RefreshCurrentFloor() {
    var t = (0, puerts_1.$ref)(this.Actor.CharacterMovement.CurrentFloor);
    this.Actor.CharacterMovement.D_K2_FindFloor(this.ActorLocation, t);
    var t = (0, puerts_1.$unref)(t);
    this.Actor.CharacterMovement.CurrentFloor = t;
  }
  HNn() {
    this.dFr();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Entity.Id, this.Actor.CharacterMovement.DefaultLandMovementMode, this.Actor.CharacterMovement.MovementMode, 0, 0);
    let t = this.NeedFixBornLocation;
    if ((t = ModelManager_1.ModelManager.GameModeModel.InstanceType !== Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance || ModelManager_1.ModelManager.GameModeModel.RenderAssetDone ? t : false) && (this.eFr = true, this.oFr(), this.IsRoleAndCtrlByMe)) {
      this.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterActorComponent.CharacterReady]"
      });
    }
    var e = this.Entity.GetComponent(47);
    if (e) {
      e.SetLoadCompletePlayer(ModelManager_1.ModelManager.CreatureModel.GetPlayerId());
    }
    if (this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player || this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
      this.SetSceneTrailState(true);
    }
    this.CFr();
    this.kNn = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharBornFinished, this.Entity.Id);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBornFinished, this.Entity.Id);
  }
};
CharacterActorComponent.az = Quat_1.Quat.Create();
CharacterActorComponent.pFr = Stats_1.Stat.Create("OnHitEffectLoaded");
CharacterActorComponent.d6 = undefined;
CharacterActorComponent.Lz = Vector_1.Vector.Create();
CharacterActorComponent = CharacterActorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(3)], CharacterActorComponent);
exports.CharacterActorComponent = CharacterActorComponent; //# sourceMappingURL=CharacterActorComponent.js.map