"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var n = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        n = (h < 3 ? o(n) : h > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemVehicleComponent = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const DELTA_TIME = 200;
const SPEED_MOVE_DISTANCE_TOLERENCE = 1000;
const CENTIMETER_TO_METER = 0.01;
const CHANGE_VEHICLE_SPEED_TOLERENCE = 50;
const CHANGE_MONTAGE_RATE_TOLERENCE = 0.1;
class SceneItemVehicleFeature {
  constructor(t, e) {
    this.VehicleComp = undefined;
    this.ActorComp = undefined;
    this.ActorComp = t;
    this.VehicleComp = e;
  }
}
class MontageConfig extends SceneItemVehicleFeature {
  constructor() {
    super(...arguments);
    this.Lie = undefined;
    this.wO_ = undefined;
  }
  Init(t) {
    t = t.MovePerformConfig?.VehicleMontagePlayConfigs;
    if (t) {
      this.wO_ = new Map();
      this.Lie = this.ActorComp?.Entity.GetComponent(206);
      for (const i of t) {
        var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.TargetState);
        if (e) {
          this.wO_.set(e, {
            MontageRange: [i.MinMontageSpeedFactor, i.MaxMontageSpeedFactor],
            SpeedRange: [i.MinVehicleSpeed, i.MaxVehicleSpeed],
            LastRate: 1
          });
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 42, "[SceneItemVehicle] 机关载具设置移动表现，不存在目标状态Tag", ["EntityId", this.ActorComp?.Entity.Id], ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()], ["TargetState", i.TargetState]);
        }
      }
      return this.wO_.size > 0;
    }
    return false;
  }
  Update(t) {
    if (this.Lie && this.VehicleComp?.AnimInstance && this.wO_ && this.wO_.size !== 0) {
      for (const i of this.wO_) {
        var e;
        if (this.Lie.HasTag(i[0]) && (e = MathUtils_1.MathUtils.RangeClamp(t, i[1].SpeedRange[0], i[1].SpeedRange[1], i[1].MontageRange[0], i[1].MontageRange[1]), Math.abs(e - i[1].LastRate) > CHANGE_MONTAGE_RATE_TOLERENCE)) {
          this.VehicleComp.AnimInstance.Montage_SetPlayRate(this.VehicleComp.AnimInstance.GetCurrentActiveMontage(), e);
        }
      }
    }
  }
  Clear() {
    if (this.VehicleComp?.AnimInstance && this.wO_ && this.wO_.size !== 0) {
      this.VehicleComp.AnimInstance.Montage_SetPlayRate(this.VehicleComp.AnimInstance.GetCurrentActiveMontage(), 1);
      this.wO_.clear();
    }
  }
}
class GameplayCueConfig extends SceneItemVehicleFeature {
  constructor() {
    super(...arguments);
    this.RO_ = undefined;
    this.AO_ = undefined;
    this.ph_ = undefined;
  }
  Init(t) {
    t = t.MovePerformConfig?.PlayerSpeedEffectConfigs;
    if (t) {
      this.ph_ = this.ActorComp?.Entity.GetComponent(239);
      if (!this.ph_) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 42, "[SceneItemVehicle] 机关载具没有VehicleSceneItemPerformComponent", ["EntityId", this.ActorComp?.Entity.Id], ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()]);
        }
        return false;
      }
      this.RO_ = [];
      for (const e of t) {
        this.RO_.push({
          SpeedRange: [e.MinVehicleSpeed, e.MaxVehicleSpeed],
          GameplayCueIdList: e.GameplayCueIds,
          InRange: false,
          GameplayCueHandleList: []
        });
      }
      return this.RO_.length > 0;
    }
    return false;
  }
  Update(t) {
    if (this.RO_ && this.RO_.length !== 0) {
      if (this.ph_ && this.ph_.PassengerInfoMap.size === 0) {
        this.aZ_();
      } else if (this.ph_ && this.AO_ && this.AO_.length !== 0) {
        for (const i of this.AO_) {
          if (i.Valid) {
            for (const s of this.RO_) {
              if (MathUtils_1.MathUtils.InRangeArray(t, s.SpeedRange) && !s.InRange) {
                s.InRange = true;
                s.GameplayCueHandleList.length = 0;
                for (const o of s.GameplayCueIdList) {
                  var e = i.AddCue(o);
                  s.GameplayCueHandleList.push(e);
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("SceneItem", 42, "[SceneItemVehicle] 载具移动满足速度区间添加特效", ["Passenger", i.Entity.Id], ["特效Id", o], ["Speed", t]);
                  }
                }
              }
              if (!MathUtils_1.MathUtils.InRangeArray(t, s.SpeedRange) && s.InRange) {
                for (const h of s.GameplayCueHandleList) {
                  i.RemoveCueByHandle(h);
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("SceneItem", 42, "[SceneItemVehicle] 载具移动不满足速度区间移除特效", ["Passenger", i.Entity.Id], ["特效Id", h], ["Speed", t]);
                  }
                }
                s.InRange = false;
                s.GameplayCueHandleList.length = 0;
              }
            }
          }
        }
      } else {
        this.hZ_();
      }
    }
  }
  hZ_() {
    if (this.ph_ && this.ph_.PassengerInfoMap.size !== 0) {
      if (this.AO_) {
        this.AO_.length = 0;
      } else {
        this.AO_ = [];
      }
      for (const e of this.ph_.PassengerInfoMap) {
        var t;
        if (e[1].IsRolePassenger() && (t = e[1].PassengerEntity?.GetComponent(226))) {
          this.AO_.push(t);
        }
      }
    }
  }
  aZ_() {
    if (this.RO_ && this.RO_.length !== 0 && this.AO_ && this.AO_.length !== 0) {
      for (const t of this.AO_) {
        if (t.Valid) {
          for (const e of this.RO_) {
            for (const i of e.GameplayCueHandleList) {
              t.RemoveCueByHandle(i);
            }
            e.InRange = false;
            e.GameplayCueHandleList.length = 0;
          }
        }
      }
    }
  }
  Clear() {
    this.aZ_();
  }
}
class AudioConfig extends SceneItemVehicleFeature {
  constructor() {
    super(...arguments);
    this.TEn = 0;
    this.Ivo = undefined;
  }
  Init(t) {
    var e;
    var t = t.AudioConfigs;
    return !!t && !!(e = (0, AudioSystem_1.parseAudioEventPath)(t.AudioEvent)) && (this.Ivo = {
      SpeedRange: [t.MinVehicleSpeed, t.MaxVehicleSpeed],
      Event: e,
      AudioHandle: 0
    }, true);
  }
  Update(t) {
    if (this.Ivo && this.ActorComp?.Owner) {
      this.PO_(t);
      this.TEn = t;
    }
  }
  PO_(t) {
    if (!(Math.abs(this.TEn - t) < CHANGE_VEHICLE_SPEED_TOLERENCE) || this.TEn !== 0 && t === 0) {
      AudioSystem_1.AudioSystem.SetRtpcValue("vehicle_speed", MathUtils_1.MathUtils.Clamp(t * CENTIMETER_TO_METER, this.Ivo.SpeedRange[0], this.Ivo.SpeedRange[1]), {
        Actor: this.ActorComp.Owner
      });
      if (t === 0) {
        this.gTt();
      } else if (this.Ivo.AudioHandle === 0 && (this.Ivo.AudioHandle = AudioSystem_1.AudioSystem.PostEvent(this.Ivo.Event, this.ActorComp.Owner), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[SceneItemVehicle] 载具音效开启", ["EntityId", this.ActorComp.Entity.Id], ["PbDataId", this.ActorComp.CreatureData?.GetPbDataId()], ["Name", this.Ivo.Event]);
      }
    }
  }
  Clear() {
    this.gTt();
  }
  gTt() {
    if (this.Ivo && this.Ivo.AudioHandle !== 0 && (AudioSystem_1.AudioSystem.ExecuteAction(this.Ivo.AudioHandle, 0), this.Ivo.AudioHandle = 0, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[SceneItemVehicle] 载具音效停止", ["EntityId", this.ActorComp?.Entity.Id], ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()], ["Name", this.Ivo.Event]);
    }
  }
}
let SceneItemVehicleComponent = class SceneItemVehicleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Ovr = undefined;
    this.Hte = undefined;
    this.Ist = 0;
    this.mie = 0;
    this.wZt = [];
    this.tZl = undefined;
    this.iZl = undefined;
    this.Wnr = Vector_1.Vector.Create();
  }
  OnStart() {
    this.Ovr = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(203);
    this.aGe();
    return true;
  }
  OnTick(t) {
    if (!MathUtils_1.MathUtils.IsNearlyZero(t) && this.Hte && (this.mie += t, !(this.mie < DELTA_TIME))) {
      var t = this.Hte.ActorLocationProxy;
      if (this.Wnr.IsNearlyZero()) {
        this.Wnr.DeepCopy(t);
      }
      var e = Vector_1.Vector.Dist(this.Wnr, t);
      if (e < SPEED_MOVE_DISTANCE_TOLERENCE) {
        this.Ist = e / this.mie * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      }
      for (const i of this.wZt) {
        i.Update(this.Ist);
      }
      this.Wnr.DeepCopy(t);
      this.mie = 0;
    }
  }
  OnEnd() {
    for (const t of this.wZt) {
      t.Clear();
    }
    this.Ist = 0;
    this.wZt.length = 0;
    this.Wnr.Reset();
    return true;
  }
  aGe() {
    var t = this.Ovr?.GetPbEntityInitData();
    if (t?.ComponentsData) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      if (t?.VehicleFeatures) {
        for (const e of t.VehicleFeatures) {
          switch (e.Type) {
            case 1:
              this.XZ(e);
              this.xO_(e);
              break;
            case 4:
              this.UO_(e);
          }
        }
      }
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetUseBoundsCalculateDistance(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, true);
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetUsePerformanceActorCalculateBounds(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 42, "[SceneItemVehicle] PbEntityInitData.ComponentsData is undefined", ["EntityId", this.Entity.Id], ["PbDataId", this.Ovr?.GetPbDataId()]);
    }
  }
  XZ(t) {
    var e;
    if (t.MovePerformConfig?.VehicleMontagePlayConfigs && (e = new MontageConfig(this.Hte, this)).Init(t)) {
      this.wZt.push(e);
    }
  }
  xO_(t) {
    var e;
    if (t.MovePerformConfig?.PlayerSpeedEffectConfigs && (e = new GameplayCueConfig(this.Hte, this)).Init(t)) {
      this.wZt.push(e);
    }
  }
  UO_(t) {
    var e;
    if (t.AudioConfigs && (e = new AudioConfig(this.Hte, this)).Init(t)) {
      this.wZt.push(e);
    }
  }
  get SkeletonMeshComponent() {
    if (!this.tZl) {
      var t = this.Hte?.GetReferenceActor("SkeletalMeshActor");
      if (!t) {
        return;
      }
      if (t instanceof UE.SkeletalMeshActor) {
        this.tZl = t.GetSkeletalMeshComponent();
      }
    }
    return this.tZl;
  }
  get AnimInstance() {
    this.iZl ||= this.SkeletonMeshComponent?.GetAnimInstance();
    return this.iZl;
  }
  GetStaticMeshVehicleSeats(t) {
    return this.Hte?.GetReferenceActor(t)?.RootComponent;
  }
};
SceneItemVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(275)], SceneItemVehicleComponent);
exports.SceneItemVehicleComponent = SceneItemVehicleComponent; //# sourceMappingURL=SceneItemVehicleComponent.js.map