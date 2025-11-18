"use strict";

var SceneItemResetPositionComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var n = arguments.length;
  var r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        r = (n < 3 ? o(r) : n > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemResetPositionComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const TRIGGER_COMPONENT_TAG = new UE.FName("TriggerComponent");
let SceneItemResetPositionComponent = SceneItemResetPositionComponent_1 = class SceneItemResetPositionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.fMn = undefined;
    this.Jll = false;
    this.Sen = undefined;
    this.wS = undefined;
    this.pMn = undefined;
    this.Lo = undefined;
    this.vMn = undefined;
    this.EIe = undefined;
    this.MMn = false;
    this.Een = undefined;
    this.OnRemoveEntity = (t, e) => {
      var i = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
      if (this.EIe.GetPbDataId() === i) {
        this.MMn = true;
      } else if (this.wS.includes(i)) {
        this.vMn.push(i);
        EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      }
    };
    this.GUe = (t, e, i) => {
      var s = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
      if (this.wS?.includes(s) && (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity) || EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity), this.vMn.includes(s))) {
        e = this.vMn.indexOf(s);
        this.vMn.splice(e, 1);
      }
    };
    this.rtn = (t, e) => {
      var i;
      if (!this.MMn) {
        if ((e = this.ftn(e))?.Valid && (!(i = e.Entity.GetComponent(206)) || i.IsReadyForOverlap && i.Active) && this.wS && (i = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0, this.wS.includes(i)) && !this.vMn.includes(i)) {
          LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(e, undefined, this.Entity.GetComponent(0).GetCreatureDataId());
        }
      }
    };
    this.itn = (t, e, i, s) => {
      var o;
      if (!this.MMn) {
        if ((e = this.ftn(e))?.Valid && (!(o = e.Entity.GetComponent(206)) || o.IsReadyForOverlap && o.Active) && this.wS && (o = e.Entity.GetComponent(0)?.GetPbDataId() ?? 0, this.wS.includes(o)) && !this.vMn.includes(o)) {
          LevelGamePlayController_1.LevelGamePlayController.OnManipulatableItemExitAreaInternal(e, undefined, this.Entity.GetComponent(0).GetCreatureDataId());
        }
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemResetPositionComponent_1)[0];
    this.wS = t.EntityIds;
    this.Lo = t;
    this.vMn = [];
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    this.pMn = this.EIe.D_GetTransform();
    var t = this.Entity.GetComponent(1);
    if (t) {
      this.Jll = true;
      this.fMn = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.pMn);
      this.fMn?.K2_AttachToActor(t.Owner, undefined, 1, 1, 1, false);
    }
    return this.Koh();
  }
  Koh() {
    const e = this.Lo.Range;
    if (e.Type === "Box") {
      this._tn(e);
    } else if (e.Type === "Sphere") {
      this.utn(e);
    } else if (e.Type === "Volume") {
      this.mtn(e);
    }
    if (this.fMn) {
      if (e.Type === "Volume") {
        this.fMn.OnActorEndOverlap.Add(this.rtn);
      } else {
        if (!this.Sen) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneGameplay", 29, "[SceneItemResetPositionComponent] TriggerComponent创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()]);
          }
          return false;
        }
        this.Sen.OnComponentEndOverlap.Add(this.itn);
      }
      this.mSe();
    } else {
      if (e.Type !== "Volume") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 29, "[SceneItemResetPositionComponent] TriggerItem创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()]);
        }
        return false;
      }
      {
        const i = t => {
          if (t?.toString() === e.VolumeKey) {
            t = this.Een.GetKuroTriggerVolume(FNameUtil_1.FNameUtil.GetDynamicFName(e.VolumeKey));
            this.Jll = false;
            this.fMn = t;
            this.fMn.OnActorEndOverlap.Add(this.rtn);
            this.mSe();
            this.Een.OnTriggerVolumeAddToSubsystem.Remove(i);
          }
        };
        this.Een.OnTriggerVolumeAddToSubsystem.Add(i);
      }
    }
    return true;
  }
  OnClear() {
    this.dSe();
    if (this.Jll && this.fMn?.IsValid()) {
      this.fMn.K2_DetachFromActor();
      ActorSystem_1.ActorSystem.Put("SceneItemResetPositionComponent.OnClear", this.fMn);
    }
    this.Jll = false;
    return !(this.fMn = undefined);
  }
  mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    for (const i of this.wS) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
      if (t) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
      }
    }
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.EIe.GetPbDataId());
    EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
  }
  dSe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  _tn(t) {
    var e;
    var i;
    if (!this.fMn) {
      this.Jll = true;
      this.fMn = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.pMn);
    }
    this.Sen = this.fMn?.D_AddComponentByClass(UE.BoxComponent.StaticClass(), false, this.pMn, false);
    if (this.Sen && (this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, false), this.Sen?.D_SetBoxExtent(new UE.VectorDouble(t.Size.X, t.Size.Y, t.Size.Z), true), i = Vector_1.Vector.Create(this.pMn.GetLocation()), e = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z), i.AdditionEqual(e), this.Sen.D_K2_SetWorldLocation(i.ToUeVector(), false, undefined, false), t.Rotator)) {
      e = Rotator_1.Rotator.Create(this.pMn.GetRotation().Rotator());
      i = Rotator_1.Rotator.Create(t.Rotator.Y, t.Rotator.Z, t.Rotator.X);
      e.AdditionEqual(i);
      this.Sen.K2_SetRelativeRotation(e.ToUeRotator(), false, undefined, false);
    }
  }
  utn(t) {
    var e;
    if (!this.fMn) {
      this.Jll = true;
      this.fMn = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.pMn);
    }
    this.Sen = this.fMn?.D_AddComponentByClass(UE.SphereComponent.StaticClass(), false, this.pMn, false);
    if (this.Sen) {
      this.Sen.SetCollisionProfileName(TRIGGER_COMPONENT_TAG, false);
      this.Sen?.SetSphereRadius(t.Radius, true);
      e = Vector_1.Vector.Create(this.pMn.GetLocation());
      t = Vector_1.Vector.Create(t.Center.X, t.Center.Y, t.Center.Z);
      e.AdditionEqual(t);
      this.Sen.D_K2_SetWorldLocation(e.ToUeVector(), false, undefined, false);
    }
  }
  mtn(t) {
    this.Een = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass());
    t = this.Een.GetKuroTriggerVolume(FNameUtil_1.FNameUtil.GetDynamicFName(t.VolumeKey));
    if (t) {
      this.Jll = false;
      this.fMn = t;
    }
  }
  ftn(t) {
    if (UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass())) {
      return ActorUtils_1.ActorUtils.GetEntityByActor(t);
    }
  }
};
SceneItemResetPositionComponent = SceneItemResetPositionComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(169)], SceneItemResetPositionComponent);
exports.SceneItemResetPositionComponent = SceneItemResetPositionComponent; //# sourceMappingURL=SceneItemResetPositionComponent.js.map