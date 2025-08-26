"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var r;
  var o = arguments.length;
  var n = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, s);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (r = e[h]) {
        n = (o < 3 ? r(n) : o > 3 ? r(t, i, n) : r(t, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDriveVehicleComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const BasePlatform_1 = require("../../../Common/BasePlatform");
const VehicleConfig_1 = require("../../../Vehicle/Common/VehicleConfig");
const VehicleController_1 = require("../../../Vehicle/Controller/VehicleController");
const CharacterActionComponent_1 = require("../../Common/Component/Action/CharacterActionComponent");
const CharacterDriveVehicleComponent_1 = require("../../Common/Component/CharacterDriveVehicleComponent");
const STAND_UP_EXIT_DELAY_TIME = 1700;
let RoleDriveVehicleComponent = class RoleDriveVehicleComponent extends CharacterDriveVehicleComponent_1.CharacterDriveVehicleComponent {
  constructor() {
    super(...arguments);
    this.ParaglidingDelayHandle = undefined;
    this.PlatformActorToIgnore = undefined;
    this.GuaranteeBounceSkillEndHandle = undefined;
    this.SwimDelayHandle = undefined;
    this.OnParaglidingDelayFinish = () => {
      var e;
      if (this.Entity?.Valid) {
        this.ParaglidingDelayHandle = undefined;
        this.TagComp?.RemoveTag(-1747001544);
        e = this.ActorComp.CreatureData.GetPlayerId();
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
          ParamType: 2,
          IsControl: true
        })?.EntityHandle?.Entity?.GetComponent(179)?.TrySetGlide();
      }
    };
    this.GuaranteeBounceSkillEnd = () => {
      if (this.Entity?.Valid && (this.GuaranteeBounceSkillEndHandle = undefined, EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd))) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd);
        this.RestoreSwimAndCollision();
      }
    };
    this.OnBounceSkillEnd = (e, t) => {
      if (t === CharacterActionComponent_1.LEAVE_VEHICLE_BOUNCE_SKILL_ID && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd), this.GuaranteeBounceSkillEndHandle)) {
        TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle);
        this.GuaranteeBounceSkillEndHandle = undefined;
        this.RestoreSwimAndCollision();
      }
    };
  }
  OnPostActivate() {
    VehicleController_1.VehicleController.OnCharacterActivate(this.Entity);
  }
  OnTick(e) {
    var t;
    if (!this.IsOnVehicle) {
      t = this.ActorComp.Actor.BasedMovement;
      if (BasePlatform_1.BasePlatformController.GetBasePlatformByBasedMovementInfo(t) instanceof BasePlatform_1.VehicleBasePlatform) {
        this.SetWaterEffect(false);
      } else {
        this.SetWaterEffect(true);
      }
    }
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd);
    }
    if (this.ParaglidingDelayHandle) {
      TimerSystem_1.TimerSystem.Remove(this.ParaglidingDelayHandle);
    }
    this.ParaglidingDelayHandle = undefined;
    if (this.GuaranteeBounceSkillEndHandle) {
      TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle);
    }
    this.GuaranteeBounceSkillEndHandle = undefined;
    return super.OnEnd();
  }
  LeaveVehiclePerform(e) {
    switch (e.ExitType) {
      case 0:
        super.LeaveVehiclePerform(e);
        this.JumpToAirAndParagliding(e);
        break;
      case 2:
        this.TagComp.AddTag(-1266260958);
        InputDistributeController_1.InputDistributeController.RefreshInputTag();
        TimerSystem_1.TimerSystem.Delay(() => {
          super.LeaveVehiclePerform(e);
          InputDistributeController_1.InputDistributeController.RefreshInputTag();
        }, STAND_UP_EXIT_DELAY_TIME);
        break;
      default:
        super.LeaveVehiclePerform(e);
    }
  }
  async JumpToAirAndParagliding(e) {
    var t;
    var i;
    var s;
    var r;
    var o = e.PassengerEntity?.GetComponent(2);
    if (o && (o.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[RoleDriveVehicleComponent.JumpToAirAndParagliding]"
    }), o = e.VehicleEntity?.GetComponent(234)) && (r = (o.Config?.BounceTime ?? VehicleConfig_1.DEFAULT_BOUNCE_TIME) * MathUtils_1.MathUtils.MillisecondToSecond, s = o.Config?.BounceHeight ?? VehicleConfig_1.DEFAULT_BOUNCE_HEIGHT, t = o.Config?.BounceCurve ?? VehicleConfig_1.DEFAULT_BOUNCE_CURVE, i = this.Entity.GetComponent(29), o?.GetVehicleVelocity(this.TmpVector1), this.TmpVector1.MultiplyEqual(r * 0.5), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.TmpVector1), await i?.StartBounceWithHorizontalOffset(s, this.TmpVector1, r, t)) && this.Entity?.Valid) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd);
      if (o.VehicleType === "NpcVehicle") {
        i = e.VehicleEntity?.GetComponent(3);
        this.PlatformActorToIgnore = i?.Actor;
      } else {
        s = e.VehicleEntity?.GetComponent(235);
        this.PlatformActorToIgnore = s?.Actor.PlatformActor;
      }
      if (this.PlatformActorToIgnore?.IsValid()) {
        this.ActorComp?.Actor.IgnoreActorWhenMoving(this.PlatformActorToIgnore, true, true);
      }
      r = o.Config?.ParaglidingDelayTime ?? VehicleConfig_1.PARAGLIDING_DELAY_MILISECONDS;
      this.TagComp?.AddTag(-1747001544);
      this.ParaglidingDelayHandle = TimerSystem_1.TimerSystem.Delay(this.OnParaglidingDelayFinish, r);
      this.GuaranteeBounceSkillEndHandle = TimerSystem_1.TimerSystem.Delay(this.GuaranteeBounceSkillEnd, r);
    }
  }
  RestoreSwimAndCollision() {
    if (this.Entity?.Valid && this.PlatformActorToIgnore?.IsValid()) {
      this.ActorComp?.Actor.IgnoreActorWhenMoving(this.PlatformActorToIgnore, false, true);
      this.PlatformActorToIgnore = undefined;
    }
  }
  ChangeCurrentState() {
    this.Entity.GetComponent(40)?.EndOwnerAndFollowSkills();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, 2);
    this.TagComp?.RemoveTag(-1523054094);
    var e = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
    this.TagComp.AddTag(this.GetBodyTagFromBodyType(e));
    this.TagComp.AddTag(525255941);
    this.TagComp?.AddTag(464607714);
    if (this.SwimDelayHandle) {
      TimerSystem_1.TimerSystem.Remove(this.SwimDelayHandle);
      this.SwimDelayHandle = undefined;
    }
    this.TagComp?.AddTag(-1697149502);
    super.ChangeCurrentState();
  }
  RestoreState() {
    super.RestoreState();
    if (this.VehicleInfo?.ExitType === 2) {
      this.ActorComp.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterDriveVehicleComponent.RestoreState]"
      });
      --this.ActorComp.MoveComp.GroundedTimeUe;
    }
    if (this.SwimDelayHandle) {
      TimerSystem_1.TimerSystem.Remove(this.SwimDelayHandle);
      this.SwimDelayHandle = undefined;
    }
    if (this.VehicleInfo?.ExitType !== 0) {
      this.TagComp.RemoveTag(464607714);
    } else {
      this.SwimDelayHandle = TimerSystem_1.TimerSystem.Delay(() => {
        this.TagComp.RemoveTag(464607714);
        this.SwimDelayHandle = undefined;
      }, VehicleConfig_1.PARAGLIDING_DELAY_MILISECONDS);
    }
    var e = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
    this.TagComp.RemoveTag(this.GetBodyTagFromBodyType(e));
    this.TagComp.RemoveTag(525255941);
    this.TagComp.RemoveTag(-1697149502);
  }
  GetBodyTagFromBodyType(e) {
    switch (e) {
      case "FemaleS":
        return 1790413286;
      case "FemaleM":
        return -1826297010;
      case "FemaleXL":
        return -113743209;
      case "FemaleMS":
        return -271538568;
      case "MaleS":
        return 1260157389;
      case "MaleM":
        return -1568691815;
      case "MaleXL":
        return -1152048753;
      default:
        return;
    }
  }
};
RoleDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(231)], RoleDriveVehicleComponent);
exports.RoleDriveVehicleComponent = RoleDriveVehicleComponent; //# sourceMappingURL=RoleDriveVehicleComponent.js.map