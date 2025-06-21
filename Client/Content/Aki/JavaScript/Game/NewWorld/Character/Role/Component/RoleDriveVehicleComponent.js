"use strict";
var __decorate = this && this.__decorate || function(e, t, i, r) {
  var s, n = arguments.length,
    o = n < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, r);
  else
    for (var h = e.length - 1; 0 <= h; h--)(s = e[h]) && (o = (n < 3 ? s(o) : 3 < n ? s(t, i, o) : s(t, i)) || o);
  return 3 < n && o && Object.defineProperty(t, i, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleDriveVehicleComponent = void 0;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  BasePlatform_1 = require("../../../Common/BasePlatform"),
  VehicleConfig_1 = require("../../../Vehicle/Common/VehicleConfig"),
  VehicleController_1 = require("../../../Vehicle/Controller/VehicleController"),
  CharacterActionComponent_1 = require("../../Common/Component/Action/CharacterActionComponent"),
  CharacterDriveVehicleComponent_1 = require("../../Common/Component/CharacterDriveVehicleComponent"),
  STAND_UP_EXIT_DELAY_TIME = 1700;
let RoleDriveVehicleComponent = class RoleDriveVehicleComponent extends CharacterDriveVehicleComponent_1.CharacterDriveVehicleComponent {
  constructor() {
    super(...arguments), this.ParaglidingDelayHandle = void 0, this.PlatformActorToIgnore = void 0, this.GuaranteeBounceSkillEndHandle = void 0, this.OnParaglidingDelayFinish = () => {
      var e;
      this.Entity?.Valid && (this.ParaglidingDelayHandle = void 0, this.TagComp?.RemoveTag(-1747001544), e = this.ActorComp.CreatureData.GetPlayerId(), ((ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
        ParamType: 2,
        IsControl: !0
      })?.EntityHandle?.Entity)?.GetComponent(178))?.TrySetGlide())
    }, this.GuaranteeBounceSkillEnd = () => {
      this.Entity?.Valid && (this.GuaranteeBounceSkillEndHandle = void 0, EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd)) && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd), this.RestoreSwimAndCollision())
    }, this.OnBounceSkillEnd = (e, t) => {
      t === CharacterActionComponent_1.LEAVE_VEHICLE_BOUNCE_SKILL_ID && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd), this.GuaranteeBounceSkillEndHandle) && (TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle), this.GuaranteeBounceSkillEndHandle = void 0, this.RestoreSwimAndCollision())
    }
  }
  OnPostActivate() {
    VehicleController_1.VehicleController.OnCharacterActivate(this.Entity)
  }
  OnTick(e) {
    var t;
    this.IsOnVehicle || (t = this.ActorComp.Actor.BasedMovement, BasePlatform_1.BasePlatformController.GetBasePlatformByBasedMovementInfo(t) instanceof BasePlatform_1.VehicleBasePlatform ? this.SetWaterEffect(!1) : this.SetWaterEffect(!0))
  }
  OnEnd() {
    return EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd), this.ParaglidingDelayHandle && TimerSystem_1.TimerSystem.Remove(this.ParaglidingDelayHandle), this.ParaglidingDelayHandle = void 0, this.GuaranteeBounceSkillEndHandle && TimerSystem_1.TimerSystem.Remove(this.GuaranteeBounceSkillEndHandle), this.GuaranteeBounceSkillEndHandle = void 0, super.OnEnd()
  }
  LeaveVehiclePerform(e) {
    switch (e.ExitType) {
      case 0:
        super.LeaveVehiclePerform(e), this.JumpToAirAndParagliding(e);
        break;
      case 2:
        this.TagComp.AddTag(-1266260958), InputDistributeController_1.InputDistributeController.RefreshInputTag(), TimerSystem_1.TimerSystem.Delay(() => {
          super.LeaveVehiclePerform(e), InputDistributeController_1.InputDistributeController.RefreshInputTag()
        }, STAND_UP_EXIT_DELAY_TIME);
        break;
      default:
        super.LeaveVehiclePerform(e)
    }
  }
  async JumpToAirAndParagliding(e) {
    var t, i, r, s, n = e.PassengerEntity?.GetComponent(2);
    n && (n.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[RoleDriveVehicleComponent.JumpToAirAndParagliding]"
    }), n = e.VehicleEntity?.GetComponent(233)) && (s = (n.Config?.BounceTime ?? VehicleConfig_1.DEFAULT_BOUNCE_TIME) * MathUtils_1.MathUtils.MillisecondToSecond, r = n.Config?.BounceHeight ?? VehicleConfig_1.DEFAULT_BOUNCE_HEIGHT, t = n.Config?.BounceCurve ?? VehicleConfig_1.DEFAULT_BOUNCE_CURVE, i = this.Entity.GetComponent(29), n?.GetVehicleVelocity(this.TmpVector1), this.TmpVector1.MultiplyEqual(.5 * s), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.TmpVector1), await i?.StartBounceWithHorizontalOffset(r, this.TmpVector1, s, t)) && this.Entity?.Valid && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, this.OnBounceSkillEnd), "NpcVehicle" === n.VehicleType ? (i = e.VehicleEntity?.GetComponent(3), this.PlatformActorToIgnore = i?.Actor) : (r = e.VehicleEntity?.GetComponent(234), this.PlatformActorToIgnore = r?.Actor.PlatformActor), this.PlatformActorToIgnore?.IsValid() && this.ActorComp?.Actor.IgnoreActorWhenMoving(this.PlatformActorToIgnore, !0, !0), s = n.Config?.ParaglidingDelayTime ?? VehicleConfig_1.PARAGLIDING_DELAY_MILISECONDS, this.TagComp?.AddTag(-1747001544), this.ParaglidingDelayHandle = TimerSystem_1.TimerSystem.Delay(this.OnParaglidingDelayFinish, s), this.GuaranteeBounceSkillEndHandle = TimerSystem_1.TimerSystem.Delay(this.GuaranteeBounceSkillEnd, s))
  }
  RestoreSwimAndCollision() {
    this.Entity?.Valid && (this.TagComp?.RemoveTag(464607714), this.PlatformActorToIgnore?.IsValid()) && (this.ActorComp?.Actor.IgnoreActorWhenMoving(this.PlatformActorToIgnore, !1, !0), this.PlatformActorToIgnore = void 0)
  }
  ChangeCurrentState() {
    this.Entity.GetComponent(40)?.EndOwnerAndFollowSkills(), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, 2), this.TagComp?.RemoveTag(-1523054094);
    var e = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
    this.TagComp.AddTag(this.GetBodyTagFromBodyType(e)), this.TagComp.AddTag(525255941), this.TagComp?.AddTag(464607714), super.ChangeCurrentState()
  }
  RestoreState() {
    super.RestoreState(), 2 === this.VehicleInfo?.ExitType && (this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 1,
      Context: "[CharacterDriveVehicleComponent.RestoreState]"
    }), --this.ActorComp.MoveComp.GroundedTimeUe), 0 !== this.VehicleInfo?.ExitType && this.TagComp.RemoveTag(464607714);
    var e = this.ActorComp.CreatureData.GetRoleConfig()?.RoleBody;
    this.TagComp.RemoveTag(this.GetBodyTagFromBodyType(e)), this.TagComp.RemoveTag(525255941)
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
        return
    }
  }
};
RoleDriveVehicleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(230)], RoleDriveVehicleComponent), exports.RoleDriveVehicleComponent = RoleDriveVehicleComponent;
//# sourceMappingURL=RoleDriveVehicleComponent.js.map