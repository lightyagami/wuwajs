"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuffExecutionClass = exports.getBuffEffectClass = undefined;
const ExtraEffectAbnormal_1 = require("./ExtraEffectAbnormal");
const ExtraEffectAddBattleFlag_1 = require("./ExtraEffectAddBattleFlag");
const ExtraEffectAddBuffOnChangeTeam_1 = require("./ExtraEffectAddBuffOnChangeTeam");
const ExtraEffectAddBuffTrigger_1 = require("./ExtraEffectAddBuffTrigger");
const ExtraEffectAddBulletTrigger_1 = require("./ExtraEffectAddBulletTrigger");
const ExtraEffectAddSkillLimitCount_1 = require("./ExtraEffectAddSkillLimitCount");
const ExtraEffectAttributeEvent_1 = require("./ExtraEffectAttributeEvent");
const ExtraEffectBehaviorControl_1 = require("./ExtraEffectBehaviorControl");
const ExtraEffectBuffCopy_1 = require("./ExtraEffectBuffCopy");
const ExtraEffectBuffTransfer_1 = require("./ExtraEffectBuffTransfer");
const ExtraEffectDamageAccumulation_1 = require("./ExtraEffectDamageAccumulation");
const ExtraEffectDamageAugment_1 = require("./ExtraEffectDamageAugment");
const ExtraEffectDamageFilter_1 = require("./ExtraEffectDamageFilter");
const ExtraEffectDamageImmune_1 = require("./ExtraEffectDamageImmune");
const ExtraEffectDamageModifier_1 = require("./ExtraEffectDamageModifier");
const ExtraEffectDamageShare_1 = require("./ExtraEffectDamageShare");
const ExtraEffectDamageTransferRecipients_1 = require("./ExtraEffectDamageTransferRecipients");
const ExtraEffectDestroyBullet_1 = require("./ExtraEffectDestroyBullet");
const ExtraEffectFormationAttribute_1 = require("./ExtraEffectFormationAttribute");
const ExtraEffectLevelBuff_1 = require("./ExtraEffectLevelBuff");
const ExtraEffectMisc_1 = require("./ExtraEffectMisc");
const ExtraEffectModifyCd_1 = require("./ExtraEffectModifyCd");
const ExtraEffectRemoveBuff_1 = require("./ExtraEffectRemoveBuff");
const ExtraEffectShieldToAttribute_1 = require("./ExtraEffectShieldToAttribute");
const ExtraEffectSkillLimitCount_1 = require("./ExtraEffectSkillLimitCount");
const ExtraEffectSnapModifier_1 = require("./ExtraEffectSnapModifier");
const ExtraEffectSnapReplacer_1 = require("./ExtraEffectSnapReplacer");
const ExtraEffectSyncGameplayCue_1 = require("./ExtraEffectSyncGameplayCue");
const ExtraExecutionEffect_1 = require("./ExtraExecutionEffect");
function getBuffEffectClass(e) {
  switch (e) {
    case 1:
      return ExtraEffectSnapModifier_1.CommonSnapshotModify;
    case 18:
      return ExtraEffectDamageShare_1.DamageShare;
    case 12:
      return ExtraEffectDamageModifier_1.DamageModifier;
    case 6:
      return ExtraEffectAttributeEvent_1.AttributeEventEffects;
    case 7:
      return ExtraEffectSkillLimitCount_1.ExtraEffectSkillLimitCount;
    case 8:
      return ExtraEffectLevelBuff_1.ExtraEffectLevelBuff;
    case 9:
      return ExtraEffectDamageAugment_1.DamageAugment;
    case 10:
      return ExtraEffectBehaviorControl_1.ExtraEffectBehaviorControl;
    case 2:
      return ExtraEffectAddBuffTrigger_1.AddBuffTrigger;
    case 3:
      return ExtraEffectAddBulletTrigger_1.AddBulletTrigger;
    case 19:
      return ExtraEffectDamageAccumulation_1.DamageAccumulation;
    case 20:
      return ExtraEffectDamageImmune_1.DamageImmune;
    case 21:
      return ExtraEffectRemoveBuff_1.RemoveBuff;
    case 25:
      return ExtraEffectAddBuffOnChangeTeam_1.AddBuffOnChangeTeam;
    case 22:
      return ExtraEffectDamageFilter_1.DamageFilter;
    case 11:
      return ExtraEffectMisc_1.ShieldEffect;
    case 14:
      return ExtraEffectMisc_1.LockValue;
    case 16:
      return ExtraEffectMisc_1.LockLowerBound;
    case 15:
      return ExtraEffectMisc_1.LockUpperBound;
    case 17:
      return ExtraEffectMisc_1.TimeScaleEffect;
    case 27:
      return ExtraEffectSnapReplacer_1.SnapReplacer;
    case 31:
      return ExtraEffectFormationAttribute_1.SetFormationAttributeRate;
    case 32:
      return ExtraEffectFormationAttribute_1.ModifyFormationAttributeIncreaseRate;
    case 33:
      return ExtraEffectFormationAttribute_1.ModifyFormationAttributeDecreaseRate;
    case 35:
      return ExtraEffectMisc_1.AddPassiveSkill;
    case 36:
      return ExtraEffectMisc_1.FrozenEffect;
    case 37:
      return ExtraEffectSnapModifier_1.DamageAmplifyOnHit;
    case 38:
      return ExtraEffectSnapModifier_1.DamageAmplifyOnBeHit;
    case 41:
      return ExtraEffectMisc_1.AddBuffToVision;
    case 44:
      return ExtraEffectMisc_1.ModifyToughReduce;
    case 45:
      return ExtraEffectShieldToAttribute_1.ConvertShieldAttribute;
    case 46:
      return ExtraEffectSnapModifier_1.ShieldSnapshotModify;
    case 50:
      return ExtraEffectFormationAttribute_1.FormationLockUpperBound;
    case 51:
      return ExtraEffectFormationAttribute_1.FormationLockLowerBound;
    case 53:
      return ExtraEffectAddBuffOnChangeTeam_1.BindBuffToTeam;
    case 55:
      return ExtraEffectAttributeEvent_1.AttributeConvert;
    case 1003:
      return ExtraEffectAbnormal_1.AbnormalIce;
    case 1004:
      return ExtraEffectAbnormal_1.AbnormalFire;
    case 1006:
      return ExtraEffectAbnormal_1.AbnormalDark;
    case 1101:
      return ExtraEffectMisc_1.PreventReduceStack;
    case 70:
      return ExtraEffectMisc_1.ExtraEffectModifyBuffMaxStack;
    case 49:
      return ExtraEffectModifyCd_1.ModifyCd;
    case 59:
      return ExtraEffectDestroyBullet_1.ExtraEffectDestroyBullet;
    case 62:
      return ExtraEffectFormationAttribute_1.ModifyFormationAttributeMax;
    case 60:
      return ExtraEffectMisc_1.ModifyBuffDurationOrPeriod;
    case 63:
      return ExtraEffectSnapModifier_1.ModifyDamageElement;
    case 68:
      return ExtraEffectMisc_1.ModifyBuffDurationOrPeriodByInstigator;
    case 71:
      return ExtraEffectAddSkillLimitCount_1.ExtraEffectAddSkillLimitCount;
    case 72:
      return ExtraEffectMisc_1.AdditionBulletSize;
    case 73:
      return ExtraEffectMisc_1.AdditionBulletDuration;
    case 74:
      return ExtraEffectMisc_1.AdditionBulletInterval;
    case 76:
      return ExtraEffectAddBattleFlag_1.AddBattleFlag;
    case 77:
      return ExtraEffectDamageTransferRecipients_1.DamageTransferRecipients;
    case 80:
      return ExtraEffectBuffCopy_1.ExtraEffectBuffCopy;
    case 81:
      return ExtraEffectMisc_1.BuffOverStackCompensation;
    case 82:
      return ExtraEffectBuffTransfer_1.ExtraEffectBuffTransfer;
    case 103:
      return ExtraEffectMisc_1.ModifyBuffTimeScale;
    case 83:
      return ExtraEffectMisc_1.ForeverTimeScaleEffect;
    case 85:
      return ExtraEffectMisc_1.SyncTimeScaleEffect;
    case 87:
      return ExtraEffectMisc_1.SpecialEnergyModifier;
    case 89:
      return ExtraEffectSyncGameplayCue_1.SyncGameplayCue;
    case 108:
      return ExtraEffectMisc_1.DynamicModifyBuffStackEffect;
    case 91:
      return ExtraEffectMisc_1.BindBuffToVehicleEffect;
    default:
      return;
  }
}
function getBuffExecutionClass(e) {
  switch (e) {
    case 4:
      return ExtraExecutionEffect_1.DamageExecution;
    case 5:
      return ExtraExecutionEffect_1.ExecuteBulletOrBuff;
    case 28:
      return ExtraExecutionEffect_1.ExecuteAddBuffByStackCount;
    case 29:
      return ExtraExecutionEffect_1.ExecuteAddBulletByStackCount;
    case 75:
      return ExtraExecutionEffect_1.ExecuteAddBulletByTagStackCount;
    case 13:
      return ExtraExecutionEffect_1.CdReduceExecution;
    case 101:
      return ExtraExecutionEffect_1.ReviveExecution;
    case 24:
      return ExtraExecutionEffect_1.AddBuffToAdjacentRoleExecution;
    case 26:
      return ExtraExecutionEffect_1.ExtendBuffDurationExecution;
    case 30:
      return ExtraExecutionEffect_1.PhantomAssistExecution;
    case 34:
      return ExtraExecutionEffect_1.ModifyFormationAttributeExecution;
    case 102:
      return ExtraExecutionEffect_1.AddEnergyExecution;
    case 52:
      return ExtraExecutionEffect_1.QteExecution;
    case 58:
      return ExtraExecutionEffect_1.PeriodAddBuffToAdjacentEntity;
    case 1102:
      return ExtraEffectAbnormal_1.ConvertAbnormalLight;
    case 65:
      return ExtraExecutionEffect_1.ConvertBuffToAnother;
    case 67:
      return ExtraExecutionEffect_1.InvokePeriod;
    case 69:
      return ExtraExecutionEffect_1.StartBattleQte;
    case 1001:
      return ExtraEffectAbnormal_1.AbnormalWind;
    case 1005:
      return ExtraEffectAbnormal_1.AbnormalLight;
    case 79:
      return ExtraExecutionEffect_1.ChangeBuffStackCount;
    case 84:
      return ExtraExecutionEffect_1.ModifyFuLuoLuoSpecialEnergy;
    case 88:
      return ExtraExecutionEffect_1.ModifySlotSpecialEnergy;
    case 104:
      return ExtraExecutionEffect_1.RemoveBuffByFilter;
    case 1002:
      return ExtraEffectAbnormal_1.AbnormalThunder;
    case 90:
      return ExtraExecutionEffect_1.ModifyTeamMemberBuff;
    case 106:
      return ExtraExecutionEffect_1.BuffMapper;
    case 123:
      return ExtraExecutionEffect_1.AdjacentBuffStackToAttribute;
    default:
      return;
  }
}
exports.getBuffEffectClass = getBuffEffectClass;
exports.getBuffExecutionClass = getBuffExecutionClass; //# sourceMappingURL=ExtraEffectDefine.js.map