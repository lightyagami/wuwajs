"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillData = exports.ERoleSkillReferenceType = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BaseAbilityComponent_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/BaseAbilityComponent");
const RoleModuleDataBase_1 = require("./RoleModuleDataBase");
var ERoleSkillReferenceType;
(function (e) {
  e[e.SkillInfo = 0] = "SkillInfo";
  e[e.Buff = 1] = "Buff";
  e[e.Damage = 2] = "Damage";
})(ERoleSkillReferenceType = exports.ERoleSkillReferenceType ||= {});
class RoleSkillData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments);
    this.RoleSkillMap = new Map();
    this.RoleUpgradeSkillMap = new Map();
    this.RoleSkillReferenceMap = new Map();
    this.SkillNodeDataMap = new Map();
    this.z1o = new Map();
    this.Z1o = [];
  }
  GetSkillNodeLevel(e) {
    let r = 0;
    var t = e.NodeType;
    if (t === 2 || t === 1) {
      t = e.SkillId;
      r = this.GetSkillLevel(t);
    } else if (this.IsSkillTreeNodeActive(e.Id)) {
      r = 1;
    }
    return r;
  }
  GetSkillLevel(e) {
    return this.RoleSkillMap.get(e) ?? 0;
  }
  SetSkillLevel(e, r) {
    this.RoleSkillMap.set(e, r);
    if (r > 0 && (r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e).UpgradeSkillId) > 0) {
      this.RoleUpgradeSkillMap.set(r, e);
    }
  }
  GetAllSkillLevel() {
    return Array.from(this.RoleSkillMap.values());
  }
  GetSkillList() {
    var e;
    if (this.Z1o.length > 0) {
      return this.Z1o;
    } else {
      e = this.GetRoleConfig().SkillId;
      (e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e))).sort((e, r) => e.SortIndex - r.SortIndex);
      this.e_o(e);
      return e;
    }
  }
  e_o(r) {
    var t = r.length;
    for (let e = 0; e < t; e++) {
      var i = r[e];
      this.Z1o.push(i);
      this.z1o.set(i.Id, i);
    }
  }
  GetSkillConfigFromCache(e) {
    if (this.z1o.size === 0) {
      this.GetSkillList();
    }
    return this.z1o.get(e);
  }
  IsHasSkill(e) {
    return this.RoleSkillMap.has(e);
  }
  GetReferenceList(e, r) {
    var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e);
    switch (r) {
      case ERoleSkillReferenceType.SkillInfo:
        return t.SkillInfoList;
      case ERoleSkillReferenceType.Buff:
        return t.BuffList;
      case ERoleSkillReferenceType.Damage:
        return t.DamageList;
      default:
        return [];
    }
  }
  GetDefaultSkillLevel(e) {
    switch (e) {
      case ERoleSkillReferenceType.SkillInfo:
        return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
      case ERoleSkillReferenceType.Buff:
      case ERoleSkillReferenceType.Damage:
      default:
        return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
    }
  }
  SetSkillReferenceMapBySkillId(r) {
    for (const i in ERoleSkillReferenceType) {
      if (!isNaN(Number(i))) {
        let e = this.RoleSkillReferenceMap.get(Number(i));
        if (!e) {
          e = new Map();
          this.RoleSkillReferenceMap.set(Number(i), e);
        }
        for (const l of this.GetReferenceList(r, Number(i))) {
          var t = e.get(l);
          if (t) {
            if (t !== r && Log_1.Log.CheckError()) {
              Log_1.Log.Error("Role", 43, "技能表里的这个ID不能对应多个技能", ["ID", l]);
            }
          } else {
            e.set(l, r);
          }
        }
      }
    }
  }
  GetReferencedSkillLevel(e, r) {
    e = this.RoleSkillReferenceMap.get(r)?.get(e);
    if (e) {
      return this.GetSkillLevel(e);
    } else {
      return this.GetDefaultSkillLevel(r);
    }
  }
  SetSkillNodeStateData(e) {
    this.SkillNodeDataMap = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillTreeRefresh);
  }
  GetSkillNodeStateData() {
    return this.SkillNodeDataMap;
  }
  GetSkillTreeNodeState(e, r) {
    var t = e.SkillId;
    if (t && t > 0 && e.NodeType !== 3) {
      return this.GetSkillTreeSkillNodeState(e, r);
    } else {
      return this.GetSkillTreeAttributeNodeState(e, r);
    }
  }
  GetSkillTreeSkillNodeState(e, r) {
    var t = e.SkillId;
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t);
    if (this.GetSkillLevel(t) === i.MaxSkillLevel) {
      return 3;
    } else if (!this.GetSkillTreeUnsatisfiedCondition(e) && (t = this.GetRoleSkillTreeNodeUnlockConditionId(e), ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(t.toString(), undefined, true, r))) {
      return 2;
    } else {
      return 1;
    }
  }
  GetSkillTreeAttributeNodeState(e, r) {
    if (this.IsSkillTreeNodeActive(e.Id)) {
      return 3;
    } else if (this.GetSkillTreeUnsatisfiedCondition(e) || (e = this.GetRoleSkillTreeNodeUnlockConditionId(e)) > 0 && !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(e.toString(), undefined, true, r)) {
      return 1;
    } else {
      return 2;
    }
  }
  GetUnlockConditionTextId(e) {
    var r = this.GetSkillTreeUnsatisfiedCondition(e);
    if (r) {
      return r.Description;
    } else if ((r = this.GetRoleSkillTreeNodeUnlockConditionId(e)) && r > 0) {
      return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(r);
    } else {
      return undefined;
    }
  }
  GetRoleSkillTreeNodeUnlockConditionId(e) {
    var r;
    var t = e.SkillId;
    if (t && t > 0) {
      r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t);
      t = this.GetSkillLevel(t);
      return ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigByGroupIdAndLevel(r.SkillLevelGroupId, t + 1).Condition;
    } else {
      return e.UnLockCondition;
    }
  }
  IsSkillTreeNodeActive(e) {
    e = this.GetSkillNodeStateData().get(e);
    return !!e && e.IsActive;
  }
  GetSkillTreeUnsatisfiedCondition(r) {
    var t = r.Condition;
    var i = t.length;
    for (let e = 0; e < i; e++) {
      var l = t[e];
      var n = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConditionById(l);
      var o = r.NodeGroup;
      if (n) {
        if (n.ConditionType === 1) {
          for (var [a, s] of n.ConditionParam) {
            a = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(o, a);
            if (this.GetSkillNodeLevel(a) < s) {
              return n;
            }
          }
        } else if (n.ConditionType === 2) {
          var f = r.ParentNodes.length;
          for (let e = 0; e < f; e++) {
            var u = r.ParentNodes[e];
            var u = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(o, u);
            if (this.GetSkillNodeLevel(u) === 0) {
              return n;
            }
          }
        }
      }
    }
  }
  IsSkillTreeNodeConsumeSatisfied(e) {
    var r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
    var r = this.GetSkillNodeLevel(r);
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(e, r + 1);
    if (e) {
      for (var [t, i] of e) {
        if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) < i) {
          return false;
        }
      }
    }
    return true;
  }
  GetSkillIdAfterUpgrade(e) {
    return this.RoleUpgradeSkillMap.get(e) ?? 0;
  }
  HasAnySkillUpgrade() {
    return this.RoleUpgradeSkillMap.size > 0;
  }
}
exports.RoleSkillData = RoleSkillData;
//# sourceMappingURL=RoleSkillData.js.map