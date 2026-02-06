"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillAimisi = exports.AIMISI_MORPH_EXPLORE_SKILL_ID = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const RouletteController_1 = require("../../../../../../Module/Roulette/RouletteController");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds");
const SpecialSkillMorphBase_1 = require("./SpecialSkillMorphBase");
const AIMISI_SPECIAL_CONFIG = "/Game/Aki/Character/Role/FemaleM/Aimisi/Data/DA_AimisiSpecialConfig.DA_AimisiSpecialConfig";
exports.AIMISI_MORPH_EXPLORE_SKILL_ID = 121001;
class SpecialSkillAimisi extends SpecialSkillMorphBase_1.SpecialSkillMorphBase {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.epm = undefined;
    this.tpm = undefined;
    this.xie = (e, i) => {
      e = e.Entity?.Id === this.SpecialSkillComponent.Entity.Id;
      if (i?.Entity?.Id === this.SpecialSkillComponent.Entity.Id) {
        this.t4g("Aimisi下场", true);
      } else if (e) {
        this.i4g("Aimisi上场", true);
      }
    };
    this.OnCharacterMorphTypeChanged = (e, i, t) => {
      this.RefreshNoUpdateMeshes(i);
      if (i !== 0) {
        this.i4g("Aimisi切换到形态二");
      } else {
        this.t4g("Aimisi恢复到形态一");
      }
    };
    this.ipm = (e, i) => {
      if (this.epm?.合轴技能?.Contains(e)) {
        const t = this.AnimComp.MontageGetPosition();
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.tpm.Entity, true, "SpecialSkillAimisi.OnCharBeforeInterrupt", true);
        e = this.tpm.Entity.GetComponent(222);
        if (this.MorphComp?.GetMorphType() === 0) {
          e?.RemoveBuff(CharacterBuffIds_1.buffId.Morph1, -1, "艾弥斯伴生物形态设置");
        } else {
          e?.AddBuff(CharacterBuffIds_1.buffId.Morph1, {
            InstigatorId: this.EIe.GetCreatureDataId(),
            Reason: "艾弥斯伴生物形态设置"
          });
        }
        this.tpm.Entity.GetComponent(3)?.SetActorLocationAndRotation(this.ActorComp.ActorLocation, this.ActorComp.ActorRotation, "SpecialSkillAimisi.SetActorLocationAndRotation");
        this.tpm.Entity.GetComponent(42)?.BeginSkillAsync(i).then(e => {
          if (e) {
            this.tpm.Entity.GetComponent(188)?.MontageSetPosition(t);
          }
        });
      }
    };
  }
  get MorphBuffsConfigKey() {
    return "AimisiMorphBuffs";
  }
  get MorphCueIdConfigKey() {
    return "AimisiMorphCues";
  }
  get ResetMorphSkillsConfigKey() {
    return "AimisiResetMorphSkills";
  }
  get NotResetMorphSkillsConfigKey() {
    return "AimisiNotResetMorphSkills";
  }
  get ChangeRoleResetMorphTagsConfigKey() {
    return "AimisiChangeRoleResetMorphTags";
  }
  get Morph0SubMeshConfigKey() {
    return "AimisiMorph0SubMeshList";
  }
  get Morph1SubMeshConfigKey() {
    return "AimisiMorph1SubMeshList";
  }
  OnStart() {
    super.OnStart();
    this.AnimComp = this.SpecialSkillComponent.Entity.GetComponent(188);
    this.EIe = this.SpecialSkillComponent.Entity.GetComponent(0);
    this.BuffComp?.SetDeferredCueCreationEnable(true);
    EventSystem_1.EventSystem.AddWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharBeforeInterruptWithTarget, this.ipm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    ResourceSystem_1.ResourceSystem.LoadAsync(AIMISI_SPECIAL_CONFIG, UE.BP_AimisiSpecialConfig_C, e => {
      if (e?.IsValid) {
        this.epm = e;
      }
    });
    this.tpm = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.SpecialSkillComponent.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, 1);
    if (!this.tpm?.Valid) {
      CombatLog_1.CombatLog.Error("Skill", this.SpecialSkillComponent.Entity, "无法找到艾弥斯伴生物");
    }
  }
  OnEnd() {
    super.OnEnd();
    this.BuffComp?.SetDeferredCueCreationEnable(false);
    EventSystem_1.EventSystem.RemoveWithTarget(this.SpecialSkillComponent.Entity, EventDefine_1.EEventName.CharBeforeInterruptWithTarget, this.ipm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
  }
  i4g(e, i = false) {
    var t = ModelManager_1.ModelManager.ExploreModel;
    if (t && (i || this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) && (i = this.MorphComp?.GetMorphType()) !== undefined && i !== 0) {
      if (t.CheckNeedChangeSkill(exports.AIMISI_MORPH_EXPLORE_SKILL_ID, 1)) {
        RouletteController_1.RouletteController.ExploreSkillSetRequest(exports.AIMISI_MORPH_EXPLORE_SKILL_ID, undefined, true);
      }
      t.SetExploreSkillId(exports.AIMISI_MORPH_EXPLORE_SKILL_ID, 1, e);
    }
  }
  t4g(e, i = false) {
    var t = ModelManager_1.ModelManager.ExploreModel;
    if (t && (i || this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id)) {
      t.ResetExplodeSkillId(1, e);
      i = t.GetTopLayerExplodeSkillId();
      RouletteController_1.RouletteController.ExploreSkillSetRequest(i, undefined, true);
    }
  }
}
exports.SpecialSkillAimisi = SpecialSkillAimisi;
//# sourceMappingURL=SpecialSkillAimisi.js.map