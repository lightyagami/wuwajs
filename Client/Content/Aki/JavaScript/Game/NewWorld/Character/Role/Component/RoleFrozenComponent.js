"use strict";

var RoleFrozenComponent_1;
var __decorate = this && this.__decorate || function (e, o, t, n) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, o, t, n);
  } else {
    for (var C = e.length - 1; C >= 0; C--) {
      if (i = e[C]) {
        s = (r < 3 ? i(s) : r > 3 ? i(o, t, s) : i(o, t)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(o, t, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFrozenComponent = undefined;
const UE = require("ue");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const BaseFrozenComponent_1 = require("../../Common/Component/Abilities/BaseFrozenComponent");
const GameplayCueController_1 = require("../../Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const CustomMovementDefine_1 = require("../../Common/Component/Move/CustomMovementDefine");
const FROZEN_CUE_ID = 1003;
const CANCEL_FROZEN_CUE_ID = 100302;
let RoleFrozenComponent = RoleFrozenComponent_1 = class RoleFrozenComponent extends BaseFrozenComponent_1.BaseFrozenComponent {
  constructor() {
    super(...arguments);
    this.MoveForbidHandle = undefined;
    this.AnimForbidHandle = undefined;
    this.AbilityForbidHandle = undefined;
    this.SkillForbidHandle = undefined;
    this.FrozenCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE;
    this.IsFrozenInternal = false;
  }
  IsFrozen() {
    return this.IsFrozenInternal;
  }
  SetFrozen(e) {
    if (this.IsFrozenInternal !== e) {
      this.IsFrozenInternal = e;
      var o = this.Entity.GetComponent(178);
      var t = this.Entity.GetComponent(114);
      var n = this.Entity.GetComponent(18);
      var i = this.Entity.GetComponent(40);
      const s = this.Entity.GetComponent(21);
      var r = this.Entity.GetComponent(205)?.TagContainer;
      if (this.Entity.GetComponent(113).Frozen = e) {
        this.MoveForbidHandle = this.MoveForbidHandle ?? o?.Disable("RoleFrozen");
        this.AnimForbidHandle = this.AnimForbidHandle ?? t?.Disable("RoleFrozen");
        this.AbilityForbidHandle = this.AbilityForbidHandle ?? n?.Disable("RoleFrozen");
        this.SkillForbidHandle = this.SkillForbidHandle ?? i?.Disable("RoleFrozen");
        if (this.FrozenCueHandle === GameplayCueController_1.INVALID_CUE_HANDLE) {
          this.FrozenCueHandle = s.AddCue(FROZEN_CUE_ID);
        }
        if (r) {
          r.AddExactTag(6, -752177221);
          r.AddExactTag(6, 1098729489);
          r.AddExactTag(6, -8769906);
          r.AddExactTag(6, -1927813876);
          r.AddExactTag(6, 477750727);
          r.AddExactTag(6, 1448371427);
          r.AddExactTag(6, 930178923);
          r.AddExactTag(6, -291592299);
        }
        this.ChangeMovementModeInFrozen(o);
        if (this.ActorComponent && (RoleFrozenComponent_1.TmpVector.DeepCopy(this.ActorComponent.ActorVelocityProxy), RoleFrozenComponent_1.TmpVector.Z > 0)) {
          RoleFrozenComponent_1.TmpVector.Z = 0;
          o.SetForceSpeed(RoleFrozenComponent_1.TmpVector);
        }
      } else {
        if (this.MoveForbidHandle !== undefined) {
          o?.Enable(this.MoveForbidHandle, "[RoleFrozenComponent.SetFrozen] this.MoveForbidHandle !== undefined");
          this.MoveForbidHandle = undefined;
        }
        if (this.AnimForbidHandle !== undefined) {
          t?.Enable(this.AnimForbidHandle, "[RoleFrozenComponent.SetFrozen] this.AnimForbidHandle !== undefined");
          this.AnimForbidHandle = undefined;
        }
        if (this.AbilityForbidHandle !== undefined) {
          n?.Enable(this.AbilityForbidHandle, "[RoleFrozenComponent.SetFrozen] this.AbilityForbidHandle !== undefined");
          this.AbilityForbidHandle = undefined;
        }
        if (this.SkillForbidHandle !== undefined) {
          i?.Enable(this.SkillForbidHandle, "[RoleFrozenComponent.SetFrozen] this.SkillForbidHandle !== undefined");
          this.SkillForbidHandle = undefined;
        }
        s.RemoveCueByHandle(this.FrozenCueHandle);
        this.FrozenCueHandle = s.AddCue(CANCEL_FROZEN_CUE_ID, {
          EndCallback: () => {
            s.RemoveCueByHandle(this.FrozenCueHandle);
            this.FrozenCueHandle = GameplayCueController_1.INVALID_CUE_HANDLE;
          }
        });
        if (r) {
          r.RemoveTag(6, -752177221);
          r.RemoveTag(6, 1098729489);
          r.RemoveTag(6, -8769906);
          r.RemoveTag(6, -1927813876);
          r.RemoveTag(6, 477750727);
          r.RemoveTag(6, 1448371427);
          r.RemoveTag(6, 930178923);
          r.RemoveTag(6, -291592299);
        }
        if ((e = this.Entity.GetComponent(177)) && (o = e.MainAnimInstance, UE.KuroStaticLibrary.IsObjectClassByName(o, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE))) {
          o.冰冻结束事件();
        }
      }
    }
  }
  ChangeMovementModeInFrozen(e) {
    var o;
    var t;
    if (e.CharacterMovement) {
      o = e.CharacterMovement.MovementMode;
      t = e.CharacterMovement.CustomMovementMode;
      if (o !== 1 && o !== 3 && (o !== 6 || t !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM)) {
        e.ActorComp?.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[RoleFrozenComponent.ChangeMovementModeInFrozen]"
        });
      }
    }
  }
};
RoleFrozenComponent.TmpVector = Vector_1.Vector.Create();
RoleFrozenComponent = RoleFrozenComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(192)], RoleFrozenComponent);
exports.RoleFrozenComponent = RoleFrozenComponent; //# sourceMappingURL=RoleFrozenComponent.js.map