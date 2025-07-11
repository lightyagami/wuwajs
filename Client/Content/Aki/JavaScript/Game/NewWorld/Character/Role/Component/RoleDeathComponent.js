"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var n = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        n = (r < 3 ? o(n) : r > 3 ? o(e, i, n) : o(e, i)) || n;
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
exports.RoleDeathComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const TeleportController_1 = require("../../../../Module/Teleport/TeleportController");
const BaseDeathComponent_1 = require("../../Common/Component/Abilities/BaseDeathComponent");
const CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const RoleAudioController_1 = require("../RoleAudioController");
let RoleDeathComponent = class RoleDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.u1t = undefined;
    this.Xte = undefined;
    this.tRr = undefined;
    this.m1t = undefined;
    this.HBr = undefined;
    this.$te = undefined;
    this.KIu = undefined;
    this.bin = false;
    this.Plr = [];
    this.OnDeathEnded = () => {
      var t;
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true);
      if (this.m1t && this.m1t.HasBuffAuthority()) {
        this.m1t.TriggerEvents(14, this.m1t, {});
        for (const i of e.values()) {
          if (this.Entity.Id !== i.Id && i.Valid) {
            if (!(t = i.Entity.GetComponent(191)).IsDead()) {
              t.m1t?.TriggerEvents(15, this.m1t, {});
            }
          }
        }
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadEnd);
      if (this.IsDead()) {
        ModelManager_1.ModelManager.SceneTeamModel.RoleDeathEnded(this.Entity.Id);
      }
    };
    this.qin = () => {
      if (!this.IsDead()) {
        this.RemoveMaterials();
      }
    };
    this.DrowningPunishment = () => {
      this.m1t.AddBuff(CharacterBuffIds_1.buffId.AfterDrownRecoverStrength, {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "溺水蒙太奇后添加"
      });
      this.Xte.RemoveTag(191377386);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnRoleDrown, false);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrown, false);
      if (!ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
        t = ModelManager_1.ModelManager.FormationDataModel.GetLastPositionOnLand();
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          this.bin = true;
          e = new Protocol_1.Aki.Protocol.Ne_();
          if (t) {
            (i = Protocol_1.Aki.Protocol.Gks.create()).X = t.X;
            i.Y = t.Y;
            i.Z = t.Z;
            e.vcu = i;
          }
          CombatMessage_1.CombatNet.Send(24873, this.Entity, e);
        } else if (t) {
          TeleportController_1.TeleportController.TeleportToPositionNoLoading(t.ToUeVector(), undefined, "DrowningPunishment").finally(this.qin);
        }
      }
      this.HBr.ResetCharState();
      var t;
      var e;
      var i = this.Entity.CheckGetComponent(191);
      if (i.IsDead()) {
        i.OnDeathEnded();
      }
    };
  }
  OnInit() {
    this.n$t = this.Entity.GetComponent(3);
    this.u1t = this.Entity.CheckGetComponent(0);
    this.Xte = this.Entity.GetComponent(205);
    this.tRr = this.Entity.GetComponent(40);
    this.m1t = this.Entity.GetComponent(174);
    this.HBr = this.Entity.GetComponent(175);
    this.$te = this.Entity.GetComponent(173);
    this.KIu = this.Entity.GetComponent(279);
    return true;
  }
  OnStart() {
    return !!super.OnStart() && (this.u1t.GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead && this.ExecuteDeath(undefined), true);
  }
  OnClear() {
    this.Plr.splice(0, this.Plr.length);
    return !(this.bin = false);
  }
  ExecuteDeath(t) {
    if (!super.ExecuteDeath(t)) {
      return false;
    }
    this.m1t?.RemoveBuffByEffectType(36, "实体死亡移除冰冻buff");
    this.Xte?.AddTag(1008164187);
    this.tRr?.StopAllSkills("RoleDeathComponent.ExecuteDeath");
    if (this.HBr?.Valid && this.Entity.IsInit) {
      this.HBr.ResetCharState();
      switch (this.HBr.PositionState) {
        case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
          var e = this.HBr.MoveState;
          if (e === CharacterUnifiedStateTypes_1.ECharMoveState.Glide) {
            this.Entity.GetComponent(59)?.ExitGlideState();
          } else if (e === CharacterUnifiedStateTypes_1.ECharMoveState.Soar) {
            this.Entity.GetComponent(59)?.ExitSoarState();
          }
          break;
        case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
          this.Entity.GetComponent(3)?.Actor.KuroSetMovementMode({
            Mode: 3,
            CustomMode: 0,
            Context: "[RoleDeathComponent.ExecuteDeath]"
          });
      }
      this.HBr.ExitHitState("角色死亡");
    }
    this.m1t?.RemoveAllDurationBuffs("实体死亡清理持续型buff");
    this.$te?.ClearSpecialEnergy();
    this.PlayDeathAnimation(t);
    this.PlayDeathAudio();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnRoleDead, this.Entity.Id);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf);
    return true;
  }
  PlayDeathAudio() {
    if (this.Entity) {
      RoleAudioController_1.RoleAudioController.OnPlayerDies(this.Entity);
    }
  }
  PlayDeathAnimation(t) {
    if (!this.Xte?.HasTag(191377386)) {
      if (!ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim && !this.Xte?.HasTag(-1943786195) && this.MontageComponent?.Valid && this.Entity.IsInit && this.Entity.Active) {
        if (this.HBr.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
          this.PlayDeathMontageWithType(1, this.OnDeathEnded, t);
        } else {
          this.PlayDeathMontageWithType(0, this.OnDeathEnded, t);
        }
      } else {
        this.OnDeathEnded();
      }
    }
  }
  GetDeathMontage(t) {
    let e = undefined;
    var i;
    return e = (e = this.KIu && this.KIu.IsMorphing() && (i = this.GetDeathMontageName(t)) ? this.KIu.GetMontageByName(i) : e) || super.GetDeathMontage(t);
  }
  ExecuteRevive() {
    var t;
    if (this.IsDeadInternal) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 19, "[DeathComponent]执行角色复活逻辑", ["Entity", this.Entity.toString()], ["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()]);
      }
      this.IsDeadInternal = false;
      this.Xte?.RemoveTag(1008164187);
      this.RemoveMaterials();
      if (this.n$t?.IsAutonomousProxy) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRevive, this.Entity);
        this.HBr.TryClearInFightTags();
        this.HBr.RefreshFightState(FormationDataController_1.FormationDataController.GlobalIsInFight);
      }
      t = this.n$t?.Owner;
      GlobalData_1.GlobalData.BpEventManager.当有角色复活时.Broadcast(t);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 19, "实体重复复活", ["entityId", this.Entity.Id]);
    }
  }
  AddMaterialHandle(t) {
    this.Plr.push(t);
  }
  RemoveMaterials() {
    var t = this.n$t?.Actor.CharRenderingComponent;
    if (t) {
      for (const e of this.Plr) {
        t.RemoveMaterialControllerData(e);
      }
    }
  }
  static DrownNotify(t, e) {
    t = t?.CheckGetComponent(191);
    if (t && (t.PlayDeathMontageWithType(1), t.m1t?.HasBuffAuthority())) {
      t.m1t.RemoveBuffByEffectType(36, "溺水移除冰冻buff");
    }
  }
  Drowning() {
    var t;
    var e;
    if (!this.IsDrowning()) {
      this.Entity.CheckGetComponent(205).AddTag(191377386);
      t = (e = this.Entity.CheckGetComponent(173)).GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
      this.m1t.AddBuff(CharacterBuffIds_1.buffId.DrownPunishment, {
        InstigatorId: this.m1t.CreatureDataId,
        Reason: "溺水流程添加"
      });
      e = e.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
      this.PlayDeathMontageWithType(1, this.DrowningPunishment);
      if (this.m1t?.HasBuffAuthority()) {
        this.m1t.RemoveBuffByEffectType(36, "溺水移除冰冻buff");
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrownInjure, t > 0 && e <= 0);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnRoleDrown, true);
    CombatMessage_1.CombatNet.Send(27386, this.Entity, {});
  }
  IsDrowning() {
    return this.Xte?.HasTag(191377386) ?? false;
  }
  ResetDrowning() {
    if (this.bin) {
      this.qin();
      this.bin = false;
    }
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("VFn", true)], RoleDeathComponent, "DrownNotify", null);
RoleDeathComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(191)], RoleDeathComponent);
exports.RoleDeathComponent = RoleDeathComponent; //# sourceMappingURL=RoleDeathComponent.js.map