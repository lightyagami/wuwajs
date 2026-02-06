"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var n = arguments.length;
  var h = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        h = (n < 3 ? r(h) : n > 3 ? r(e, i, h) : r(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleStrengthComponent = exports.STRENGTH_TOLERANCE = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../Module/Abilities/FormationAttributeController");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
exports.STRENGTH_TOLERANCE = 0.01;
let RoleStrengthComponent = class RoleStrengthComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.$zo = undefined;
    this.Xte = undefined;
    this.HBr = undefined;
    this.u1t = undefined;
    this.drn = -0;
    this.Crn = -0;
    this.grn = (t, e) => {
      if (this.u1t?.GetPlayerId() === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() && e) {
        switch (this.HBr.PositionState) {
          case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
            if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) {
              this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
            }
            this.EmptyStrengthPunish();
            return;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Floating:
          case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
            this.EmptyStrengthPunish();
            return;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
            var i;
            if (this.HBr.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Glide && (i = this.Entity.GetComponent(64)).Valid) {
              i.ExitGlideState("Strength");
            }
            this.EmptyStrengthPunish();
            return;
          case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
            this.Qhc();
        }
      }
    };
    this.Qhc = () => {
      if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water && !this.Xte?.HasTag(400631093) && ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id === this.Entity.Id) {
        if (FormationAttributeController_1.FormationAttributeController.GetValue(1) < exports.STRENGTH_TOLERANCE) {
          this.Entity.CheckGetComponent(203)?.Drowning();
        }
      }
    };
    this.QTl = (t, e) => {
      if (this.u1t?.GetPlayerId() === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() && e && this.HBr?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
        this.Entity.GetComponent(64)?.ExitSoarState(3, "Strength");
      }
    };
    this.Wqr = (t, e) => {
      if (this.HBr.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Water && this.Hte.IsMoveAutonomousProxy) {
        this.NewMoveStateStrengthDecrease(e);
      }
    };
    this.frn = t => {
      this.$zo.RemoveBuffByHandle(this.drn);
      if (t !== 0) {
        this.UpdateStrengthDecrease(t);
      }
    };
    this.Kqr = (t, e) => {
      var i = FormationAttributeController_1.FormationAttributeController.GetValue(1);
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
        this.$zo.RemoveBuffByHandle(this.drn);
      }
      if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Water && i < exports.STRENGTH_TOLERANCE) {
        this.Qhc();
      }
      this.prn();
      switch (e) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          if (this.$zo?.HasBuffAuthority()) {
            this.$zo.AddBuff(CharacterBuffIds_1.buffId.AirStrengthDecreaseRetain, {
              InstigatorId: this.$zo.CreatureDataId,
              Reason: "进入空中状态"
            });
          }
          this.gd_(CharacterBuffIds_1.buffId.AirStrengthRecoverForbidden);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
        case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
          this.gd_(CharacterBuffIds_1.buffId.WaterClimbStrengthForbidden);
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Ground:
          this.prn();
      }
    };
    this.Nkr = t => {};
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.$zo = this.Entity.CheckGetComponent(185);
    this.Xte = this.Entity.CheckGetComponent(217);
    this.HBr = this.Entity.CheckGetComponent(186);
    this.u1t = this.Entity.CheckGetComponent(0);
    this.Crn = -1;
    this.vrn();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.Wqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.Kqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharSwimStrengthChanged, this.frn);
    FormationAttributeController_1.FormationAttributeController.AddThresholdListener(1, this.grn, 0, 0, "Strength.RoleStrengthComponent");
    FormationAttributeController_1.FormationAttributeController.AddThresholdListener(10, this.QTl, 0, 0, "Strength.RoleStrengthComponent");
    this.Xte?.AddTagAddOrRemoveListener(400631093, this.Qhc);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.Nkr);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.Wqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.Kqr);
    FormationAttributeController_1.FormationAttributeController.RemoveThresholdListener(1, this.grn);
    FormationAttributeController_1.FormationAttributeController.RemoveThresholdListener(10, this.QTl);
    this.Xte?.RemoveTagAddOrRemoveListener(400631093, this.Qhc);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.Nkr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharSwimStrengthChanged, this.frn);
    return true;
  }
  vrn() {}
  EmptyStrengthPunish() {
    if (this.$zo.HasBuffAuthority() && this.$zo.GetBuffTotalStackById(CharacterBuffIds_1.buffId.EmptyStrengthPunish) < 1) {
      this.$zo.AddBuff(CharacterBuffIds_1.buffId.EmptyStrengthPunish, {
        InstigatorId: this.$zo.CreatureDataId,
        Reason: "体力耗尽"
      });
    }
    this.Xte?.RemoveTag(388142570);
  }
  UpdateStrengthDecrease(t) {
    this.drn = this.$zo.AddBuffLocal(t, {
      InstigatorId: this.$zo.CreatureDataId,
      Reason: "RoleStrengthComponent.UpdateStrengthDecrease"
    });
  }
  gd_(t) {
    this.Crn = this.$zo.AddBuffLocal(t, {
      InstigatorId: this.$zo.CreatureDataId,
      Reason: "RoleStrengthComponent.ToggleStrengthForbiddenGe"
    });
  }
  prn() {
    this.$zo.RemoveBuffByHandle(this.Crn, -1);
  }
  NewMoveStateStrengthDecrease(t) {
    this.$zo.RemoveBuffByHandle(this.drn);
    switch (t) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
        this.UpdateStrengthDecrease(CharacterBuffIds_1.buffId.SprintCost);
        return;
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        this.UpdateStrengthDecrease(CharacterBuffIds_1.buffId.FastClimbCost);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        this.$zo.AddBuff(CharacterBuffIds_1.buffId.GlideCoolDown, {
          InstigatorId: this.$zo.CreatureDataId,
          Reason: "进入滑翔状态"
        });
        this.UpdateStrengthDecrease(CharacterBuffIds_1.buffId.GlideCost);
    }
  }
};
RoleStrengthComponent.ForbidStrengthRecoveryTimeExtra = 0.5;
RoleStrengthComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(108)], RoleStrengthComponent);
exports.RoleStrengthComponent = RoleStrengthComponent; //# sourceMappingURL=RoleStrengthComponent.js.map