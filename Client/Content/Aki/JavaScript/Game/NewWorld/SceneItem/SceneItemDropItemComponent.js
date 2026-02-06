"use strict";

var SceneItemDropItemComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var a;
  var r = arguments.length;
  var n = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (a = t[s]) {
        n = (r < 3 ? a(n) : r > 3 ? a(e, i, n) : a(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemDropItemComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RewardController_1 = require("../../Module/Reward/RewardController");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const FIX_SPAWN_TRACE_HEIGHT = -60;
const PROFILE_KEY = "SceneItemDropItemComponent_FixBornLocation";
const LINEARDAMPING = 0;
const ANGULARDAMPING = 0;
const CHECK_WATER_OFFSET_Z = 10;
const COLLISION_PROFILE_NAME = new UE.FName("DropItem");
const PICKUP_AUDIO_EVENT_NAME = "play_ui_fb_pickup";
const PHYSICAL_MATERIAL_PATH = "/Game/Aki/Scene/PhysMaterial/PM_DropItem.PM_DropItem";
const PARABOLIC_EFFECT = "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Xingxing_001.DA_Fx_Xingxing_001";
const BORN_EFFECTS = ["/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_001.DA_Fx_UI_Sence_Diaoluo_001", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_002.DA_Fx_UI_Sence_Diaoluo_002", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_003.DA_Fx_UI_Sence_Diaoluo_003", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_004.DA_Fx_UI_Sence_Diaoluo_004", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Diaoluo_005.DA_Fx_UI_Sence_Diaoluo_005"];
const TRAIL_EFFECTS = ["/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_001.DA_Fx_UI_Sence_Trail_001", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_002.DA_Fx_UI_Sence_Trail_002", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_003.DA_Fx_UI_Sence_Trail_003", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_004.DA_Fx_UI_Sence_Trail_004", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Trail_005.DA_Fx_UI_Sence_Trail_005"];
const DESTROY_EFFECTS = ["/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_001.DA_Fx_UI_Sence_Xiaosan_001", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_002.DA_Fx_UI_Sence_Xiaosan_002", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_003.DA_Fx_UI_Sence_Xiaosan_003", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_004.DA_Fx_UI_Sence_Xiaosan_004", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_UI_Sence_Xiaosan_005.DA_Fx_UI_Sence_Xiaosan_005"];
class DropItemData {
  constructor() {
    this.ItemType = 0;
    this.ConfigId = 0;
    this.Config = undefined;
    this.ItemCount = 0;
    this.ShowPlanId = 0;
    this.AdsorptionType = undefined;
    this.StartSpeed = -0;
    this.RotationProtectTime = -0;
    this.AdsorptionTime = 0;
    this.AdsorptionProtectTime = 0.2;
    this.DropState = 0;
    this.MeshIsInited = false;
    this.DropFinished = false;
    this.BornEffectPath = "";
    this.TailEffectPath = "";
    this.DestroyEffectPath = "";
  }
}
let SceneItemDropItemComponent = SceneItemDropItemComponent_1 = class SceneItemDropItemComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Ovr = undefined;
    this.Hte = undefined;
    this.Jdn = false;
    this.zdn = false;
    this.Zdn = 0;
    this.fGt = undefined;
    this.eCn = undefined;
    this.tCn = undefined;
    this.iCn = undefined;
    this.oCn = Vector_1.Vector.Create();
    this.KHr = t => {
      if (this.fGt && !this.fGt.DropFinished && this.fGt.MeshIsInited) {
        t = t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
        this.CheckDropRotation(t);
        this.rCn(t);
      }
    };
    this.nCn = () => {
      if (!(this.Hte.StaticMesh.GetComponentVelocity().Z >= 0)) {
        this.fGt.DropState = 1;
        this.oCn.DeepCopy(this.Hte.ActorLocationProxy);
        this.Hte.StaticMesh.SetNotifyRigidBodyCollision(false);
      }
    };
    this.sCn = () => {
      var t = this.Hte.StaticMesh.GetComponentVelocity();
      var e = ConfigManager_1.ConfigManager.RewardConfig.GetFallToGroundSpeed();
      if (!!this.aCn() || !(this.oCn.DeepCopy(this.Hte.ActorLocationProxy), t.Size() >= Math.pow(e, 2))) {
        this.Hte.StaticMesh.SetSimulatePhysics(false);
        this.Hte.StaticMesh.SetUseCCD(false);
        if (EffectSystem_1.EffectSystem.IsValid(this.Zdn)) {
          EffectSystem_1.EffectSystem.StopEffectById(this.Zdn, "[SceneItemDropItemComponent.DownProcess]", true);
        }
        this.Zdn = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, this.fGt.BornEffectPath, "[SceneItemDropItemComponent.DownProcess]", new EffectContext_1.EffectContext(this.Entity.Id));
        if (EffectSystem_1.EffectSystem.IsValid(this.Zdn)) {
          EffectSystem_1.EffectSystem.GetEffectActor(this.Zdn)?.K2_AttachToComponent(this.Hte.StaticMesh, FNameUtil_1.FNameUtil.EMPTY, 2, 1, 0, true);
        }
        this.fGt.DropState = 2;
      }
    };
    this.hCn = t => {
      if (this.fGt.AdsorptionType === 0) {
        this.fGt.DropState = 4;
      } else {
        this.fGt.AdsorptionProtectTime -= t;
        if (!(this.fGt.AdsorptionProtectTime > 0)) {
          this.lCn();
          this.fGt.DropState = 3;
        }
      }
    };
    this._Cn = t => {
      this.fGt.AdsorptionTime += t;
      var e;
      var i;
      var o = ConfigManager_1.ConfigManager.RewardConfig.GetMaxAdsorption();
      if (this.fGt.AdsorptionTime > o) {
        this.uCn();
      } else if (o = Global_1.Global.BaseCharacter) {
        e = SceneItemDropItemComponent_1.cz;
        (i = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(o.CharacterActorComponent.ActorLocationProxy);
        i.Subtraction(this.Hte.ActorLocationProxy, e);
        o = e.SizeSquared();
        i = ConfigManager_1.ConfigManager.RewardConfig.GetPickUpInBagRange();
        if (o < Math.pow(i, 2)) {
          this.uCn();
        } else if (o > Math.pow(this.fGt.StartSpeed * t, 2)) {
          e.Normalize();
          e.MultiplyEqual(this.fGt.StartSpeed * t);
          e.AdditionEqual(this.Hte.ActorLocationProxy);
          this.Hte.StaticMesh.D_K2_SetWorldLocation(e.ToUeVector(), false, undefined, false);
          i = ConfigManager_1.ConfigManager.RewardConfig.GetDropItemAcceleration();
          this.fGt.StartSpeed = this.fGt.StartSpeed + i;
        }
      }
    };
    this.cCn = () => {
      var t;
      var e;
      var i = Global_1.Global.BaseCharacter;
      if (i && (t = SceneItemDropItemComponent_1.cz, (e = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(i.CharacterActorComponent.ActorLocationProxy), e.Subtraction(this.Hte.ActorLocationProxy, t), i = ConfigManager_1.ConfigManager.RewardConfig.GetDropItemPickUpRange(), t.SizeSquared() > Math.pow(i, 2))) {
        this.uCn();
      }
    };
    this.iXm = () => {
      this.FixBornLocation();
    };
  }
  get DropItemConfig() {
    return this.fGt;
  }
  OnClear() {
    if (EffectSystem_1.EffectSystem.IsValid(this.Zdn)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Zdn, "[SceneItemDropItemComponent.OnClear]", true);
      this.Zdn = 0;
    }
    if (this.iCn) {
      TimerSystem_1.TimerSystem.Remove(this.iCn);
      this.iCn = undefined;
    }
    if (this.tCn) {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.DropItemStarted, this.tCn)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DropItemStarted, this.tCn);
      }
      this.tCn = undefined;
    }
    return true;
  }
  OnInitData() {
    this.Ovr = this.Entity.GetComponent(0);
    var t = this.Ovr.ComponentDataMap.get("Mys");
    return !!t && (this.pie(t.Mys), !!this.fGt) && (this.mCn(t.Mys) && (this.Jdn = true), true);
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(214);
    this.InitDropStateFunction();
    return true;
  }
  OnActivate() {
    this.zdn = this.fGt?.ItemType !== 17;
    if (this.Jdn) {
      this.dCn();
      this.Hte?.Owner?.SetActorHiddenInGame(false);
    }
    if (this.zdn && !Info_1.Info.EnableForceTick && this.Active) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
    EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionShowCompleted, this.iXm);
  }
  OnEnable() {
    if (this.zdn && !Info_1.Info.EnableForceTick && this.Entity?.IsInit) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnDisable(t) {
    if (this.zdn && !Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
  }
  OnEnd() {
    if (this.zdn && !Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
    return true;
  }
  pie(t) {
    var e = t.L8n;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (i) {
      var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
      if (o === 17 || i.Mesh) {
        this.fGt = new DropItemData();
        this.fGt.ItemType = o;
        this.fGt.ConfigId = e;
        this.fGt.Config = i;
        this.fGt.ItemCount = t.n9n;
        this.fGt.ShowPlanId = t.W9n;
        var a = ConfigManager_1.ConfigManager.RewardConfig;
        var t = a.GetDropShowPlan(t.W9n);
        this.fGt.AdsorptionType = t?.Adsorption;
        this.fGt.StartSpeed = a.GetSpeed();
        this.fGt.RotationProtectTime = a.GetDropRotationProtectTime();
        switch (o) {
          case 13:
            var r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(i.QualityId);
            this.fGt.BornEffectPath = r.AbyssSpecialEffects;
            this.fGt.TailEffectPath = r.AbyssTailEffects;
            this.fGt.DestroyEffectPath = r.AbyssDissipateEffects;
            break;
          case 17:
            r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryQuality(i.QualityId);
            this.fGt.BornEffectPath = r.SpecialEffects;
            break;
          default:
            r = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.QualityId).Id - 1;
            this.fGt.BornEffectPath = BORN_EFFECTS[r];
            this.fGt.TailEffectPath = TRAIL_EFFECTS[r];
            this.fGt.DestroyEffectPath = DESTROY_EFFECTS[r];
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 10, "掉落配置查询Mesh字段配置为空", ["道具id", e]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 10, "掉落配置查询数据为空", ["道具id", e]);
    }
  }
  mCn(t) {
    if (this.fGt?.ItemType !== 17) {
      if (!t.A5n) {
        return true;
      }
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.A5n);
      if (!t) {
        return true;
      }
      if (t.Entity.GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        return true;
      }
      var e = CommonParamById_1.configCommonParamById.GetFloatConfig("drop_item_show_time");
      if (e) {
        this.iCn = TimerSystem_1.TimerSystem.Delay(() => {
          this.iCn = undefined;
          this.CCn();
        }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
      const i = t.Id;
      this.tCn = t => {
        if (i === t) {
          this.CCn();
        }
      };
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DropItemStarted, this.tCn);
    }
    return false;
  }
  CCn() {
    if (this.iCn) {
      TimerSystem_1.TimerSystem.Remove(this.iCn);
      this.iCn = undefined;
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.DropItemStarted, this.tCn)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DropItemStarted, this.tCn);
      this.tCn = undefined;
    }
    if (!this.Jdn) {
      this.Jdn = true;
      if (this.zdn && (this.dCn(), this.Entity?.IsInit) && this.Hte?.Owner) {
        this.Hte.Owner.SetActorHiddenInGame(false);
      }
    }
  }
  dCn() {
    this.Khn();
    this.gCn();
    this.fCn();
  }
  pCn() {
    var t = (0, puerts_1.$ref)(undefined);
    this.Hte.Owner.GetActorBounds(false, undefined, t);
    var t = (0, puerts_1.$unref)(t);
    var e = this.Hte.ActorLocationProxy;
    var i = ConfigManager_1.ConfigManager.RewardConfig.GetDropChestOffsetZ();
    var t = t.Size();
    var o = ModelManager_1.ModelManager.RewardModel.CheckGroundHit(e, t, i);
    var a = MathUtils_1.MathUtils.CommonTempVector;
    a.FromUeVector(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 7, "掉落初始位置修正前", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["EntityId", this.Entity.Id], ["Location", a], ["Radius", t]);
    }
    if (o && (a.Z += i, this.Hte.SetActorLocation(a.ToUeVector(), this.constructor.name, false), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("World", 7, "掉落初始位置修正后", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["EntityId", this.Entity.Id], ["Location", a], ["zOffset", i]);
    }
  }
  Khn() {
    if (this.fGt?.Config?.Mesh) {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.fGt.Config.Mesh, UE.Object, (t, e) => {
        var i = this.Hte?.StaticMesh;
        if (i?.IsValid() && t?.IsValid()) {
          this.pCn();
          this.fGt.MeshIsInited = true;
          if (t instanceof UE.StaticMesh) {
            i.SetStaticMesh(t);
            i.SetReceivesDecals(false);
          }
          i.SetLinearDamping(LINEARDAMPING);
          i.SetAngularDamping(ANGULARDAMPING);
          i.SetEnableGravity(true);
          (t = MathUtils_1.MathUtils.CommonTempVector).Set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
          i.SetCenterOfMass(t.ToUeVectorOld(), FNameUtil_1.FNameUtil.EMPTY);
          i.SetCollisionEnabled(2);
          i.SetSimulatePhysics(true);
          i.SetCollisionProfileName(COLLISION_PROFILE_NAME);
          t = this.Ovr.GetRotation().Yaw;
          t = this.GetRandomForce(t);
          i.AddImpulse(t.ToUeVectorOld(), FNameUtil_1.FNameUtil.EMPTY, true);
          i.BodyInstance.bLockXRotation = true;
          i.BodyInstance.bLockYRotation = true;
          i.SetConstraintMode(6);
          i.SetUseCCD(true);
        }
      });
      ResourceSystem_1.ResourceSystem.LoadAsync(PHYSICAL_MATERIAL_PATH, UE.PhysicalMaterial, (t, e) => {
        var i = this.Hte?.StaticMesh;
        if (i?.IsValid() && t?.IsValid() && t instanceof UE.PhysicalMaterial) {
          t.Restitution = ConfigManager_1.ConfigManager.RewardConfig.GetRestitution();
          t.Friction = ConfigManager_1.ConfigManager.RewardConfig.GetFriction();
          i.SetPhysMaterialOverride(t);
        }
      });
    }
  }
  gCn() {
    var t = this.Hte.StaticMesh.D_GetRelativeTransform();
    this.Zdn = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, t, PARABOLIC_EFFECT, "[SceneItemDropItemComponent.InitEffects]");
    if (EffectSystem_1.EffectSystem.IsValid(this.Zdn)) {
      EffectSystem_1.EffectSystem.GetEffectActor(this.Zdn)?.K2_AttachToComponent(this.Hte.StaticMesh, FNameUtil_1.FNameUtil.EMPTY, 2, 0, 0, true);
    }
  }
  fCn() {
    var t;
    var e = this.Entity.GetComponent(209);
    if (e &&= e.GetInteractController()) {
      (t = new LevelGameplayActionsDefine_1.ActionPickupDropItem()).EntityId = this.Entity.Id;
      e.AddClientInteractOption(t);
    }
  }
  OnForceTick(t) {
    this.KHr(t);
  }
  InitDropStateFunction() {
    this.eCn = new Map();
    this.eCn.set(0, this.nCn);
    this.eCn.set(1, this.sCn);
    this.eCn.set(2, this.hCn);
    this.eCn.set(3, this._Cn);
    this.eCn.set(4, this.cCn);
  }
  GetRandomForce(t) {
    var e;
    var i;
    var o;
    var a = this.fGt.ShowPlanId;
    var a = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(a);
    if (a) {
      (e = MathUtils_1.MathUtils.CommonTempRotator).Pitch = 0;
      i = a.Angle[0];
      o = a.Angle[1];
      e.Roll = MathUtils_1.MathUtils.GetRandomRange(i, o);
      i = a.VerticalAngle[0];
      o = a.VerticalAngle[1];
      e.Yaw = MathUtils_1.MathUtils.GetRandomRange(i, o);
      e.Yaw += t;
      i = Vector_1.Vector.Create(Vector_1.Vector.UpVectorProxy);
      e.Quaternion().RotateVector(i, i);
      o = a.Force[0];
      t = a.Force[1];
      return i.MultiplyEqual(Math.random() * (t - o) + o);
    } else {
      return Vector_1.Vector.UpVectorProxy;
    }
  }
  rCn(t) {
    var e;
    this.Hte.SetActorLocation(this.Hte.StaticMesh.D_K2_GetComponentLocation());
    if (this.vCn()) {
      this.uCn();
    } else if (e = this.eCn.get(this.fGt.DropState)) {
      e(t);
    }
  }
  lCn() {
    this.Hte.StaticMesh.SetCollisionEnabled(0);
    if (EffectSystem_1.EffectSystem.IsValid(this.Zdn)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Zdn, "[SceneItemDropItemComponent.CreateAutoAttachEffect]", true);
    }
    this.Zdn = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, this.fGt.TailEffectPath, "[SceneItemDropItemComponent.CreateAutoAttachEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
    EffectSystem_1.EffectSystem.GetEffectActor(this.Zdn)?.K2_AttachToComponent(this.Hte.StaticMesh, FNameUtil_1.FNameUtil.EMPTY, 2, 1, 0, true);
  }
  CheckDropRotation(t) {
    if (this.fGt.RotationProtectTime > 0 && (this.fGt.RotationProtectTime -= t, this.fGt.RotationProtectTime <= 0)) {
      this.Hte.StaticMesh.SetConstraintMode(0);
    }
  }
  vCn() {
    var t;
    var e = Global_1.Global.BaseCharacter;
    return !!e && !(e = e.CharacterActorComponent.ActorLocation, t = ConfigManager_1.ConfigManager.RewardConfig.GetHeightProtect(), Math.abs(e.Z - this.Hte.ActorLocationProxy.Z) < t) && !(this.Hte.StaticMesh.GetComponentVelocity().Z > 0);
  }
  aCn() {
    var t = this.Hte.ActorLocationProxy;
    var e = (0, puerts_1.$ref)(undefined);
    this.Hte.Owner.GetActorBounds(false, undefined, e);
    var e = (0, puerts_1.$unref)(e);
    return !!ModelManager_1.ModelManager.RewardModel.CheckWaterHit(this.oCn, t, CHECK_WATER_OFFSET_Z, e.Size()) && (this.fGt.DropFinished = true, this.fGt.DropState = 5, (t = this.Hte.StaticMesh).SetCollisionEnabled(0), t.SetConstraintMode(6), t.SetEnableGravity(false), t.SetSimulatePhysics(false), t.SetUseCCD(false), true);
  }
  DestroyWithEffect() {
    var t;
    if (this.fGt?.ItemType === 17) {
      this.Entity.GetComponent(144).HandleDestroyState();
    } else {
      this.Hte.StaticMesh.SetCollisionEnabled(0);
      ModelManager_1.ModelManager.InteractionModel.HandleInteractionHint(false, this.Hte.Entity.Id);
      if (EffectSystem_1.EffectSystem.IsValid(this.Zdn)) {
        EffectSystem_1.EffectSystem.StopEffectById(this.Zdn, "[SceneItemDropItemComponent.DestroyWithEffect]", true);
        this.Zdn = 0;
      }
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, this.fGt.DestroyEffectPath, "[SceneItemDropItemComponent.DestroyWithEffect]", new EffectContext_1.EffectContext(this.Entity.Id));
      EffectSystem_1.EffectSystem.GetEffectActor(t)?.K2_AttachToComponent(this.Hte.StaticMesh, FNameUtil_1.FNameUtil.EMPTY, 2, 1, 0, true);
      AudioSystem_1.AudioSystem.PostEvent(PICKUP_AUDIO_EVENT_NAME);
      this.Entity.Disable("[SceneItemDropItemComponent.DestroyWithEffect] 播放销毁特效");
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    }
  }
  uCn() {
    this.fGt.DropState = 5;
    RewardController_1.RewardController.PickUpFightDrop(this.Ovr.GetCreatureDataId(), this.Ovr.GetPbDataId());
    this.fGt.DropFinished = true;
  }
  FixBornLocation() {
    var t;
    var e;
    return !!Global_1.Global.BaseCharacter && !!Global_1.Global.BaseCharacter.CapsuleComponent && !(t = ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.Ovr.GetEntityType()), !(e = this.rXm(-3000 + FIX_SPAWN_TRACE_HEIGHT, t))[0]) && !(this.Hte?.SetActorLocation(e[1].ToUeVector(), "SceneItemDropItemComponent.FixBornLocation"), t && Log_1.Log.CheckInfo() && Log_1.Log.Info("Entity", 18, "[SceneItemDropItemComponent.FixBornLocation] 实体地面修正:后", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["PbDataId", this.Ovr.GetPbDataId()], ["K2_GetActorLocation", this.Hte?.Owner?.D_K2_GetActorLocation()]), 0);
  }
  rXm(t, e = true) {
    var i;
    var o;
    var a;
    if (this.Hte?.Valid) {
      i = this.Hte.ActorLocationProxy;
      ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.Reset();
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.Reset();
      o = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
      a = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
      this.Hte.ActorUpProxy.Multiply(-FIX_SPAWN_TRACE_HEIGHT, o);
      this.Hte.ActorUpProxy.Multiply(t, a);
      o.AdditionEqual(i);
      a.AdditionEqual(i);
      return this.FixBornLocationInternal(i, o, a, false, e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 18, "[SceneItemDropItemComponent.FixBornLocation] ActorComp为空。", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["PbDataId", this.Ovr.GetPbDataId()]);
      }
      return [false, undefined];
    }
  }
  FixBornLocationInternal(t, e, i, a, r = true) {
    if (r && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 18, "[SceneItemDropItemComponent.FixBornLocation] 实体地面修正:前", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["PbDataId", this.Ovr.GetPbDataId()], ["K2_GetActorLocation", this.Hte?.Owner?.D_K2_GetActorLocation()], ["ActorLocationProxy", t], ["InitLocation", this.Ovr.GetInitLocation()], ["射线开始位置", e], ["射线结束位置", i]);
    }
    var o = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
    o.WorldContextObject = this.Hte?.Owner;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, i);
    o.ActorsToIgnore.Empty();
    for (const c of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      o.ActorsToIgnore.Add(c);
    }
    var n = TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY);
    var s = o.HitResult;
    if (r && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 18, "[SceneItemDropItemComponent.FixBornLocation] 实体地面修正:检测地面结果", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["PbDataId", this.Ovr.GetPbDataId()], ["isHit", n], ["hitResult.bBlockingHit", s.bBlockingHit], ["allowStartPenetrating", a], ["hitResult.bStartPenetrating", s.bStartPenetrating]);
    }
    if (n && s.bBlockingHit) {
      if (!a && s.bStartPenetrating) {
        return [false, undefined];
      }
      var _ = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      let e = "";
      var h = s.Actors.Num();
      let i = -1;
      let o = "";
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, _);
      for (let t = 0; t < h; ++t) {
        var m = s.Actors.Get(t);
        if (m?.IsValid() && (e += m.GetName() + ", ", !m.IsA(UE.Character.StaticClass()))) {
          if (!a && s.TimeArray.Get(t) < MathUtils_1.MathUtils.SmallNumber) {
            if (r && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Entity", 18, "[SceneItemDropItemComponent.FixBornLocation] 实体地面修正:起始碰撞", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["PbDataId", this.Ovr.GetPbDataId()], ["isHit", n], ["hitResult.bBlockingHit", s.bBlockingHit], ["allowStartPenetrating", a], ["hitResult.bStartPenetrating", s.bStartPenetrating], ["hitResult.time", s.TimeArray.Get(t)]);
            }
            return [false, undefined];
          }
          i = t;
          o = m.GetName();
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, t, _);
          break;
        }
      }
      if (r && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 18, "[SceneItemDropItemComponent.FixBornLocation] 实体地面修正:射线碰到地面", ["CreatureDataId", this.Ovr.GetCreatureDataId()], ["PbDataId", this.Ovr.GetPbDataId()], ["Actors", e], ["HitLocationIndex", i], ["HitLocationName", o], ["经过修正的位置", _]);
      }
      ModelManager_1.ModelManager.TraceElementModel.ClearLineTrace();
      return [true, _];
    }
    ModelManager_1.ModelManager.TraceElementModel.ClearLineTrace();
    return [false, undefined];
  }
};
SceneItemDropItemComponent.cz = Vector_1.Vector.Create();
SceneItemDropItemComponent = SceneItemDropItemComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(160)], SceneItemDropItemComponent);
exports.SceneItemDropItemComponent = SceneItemDropItemComponent; //# sourceMappingURL=SceneItemDropItemComponent.js.map