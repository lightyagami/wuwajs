"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleSkillInputById_1 = require("../../../Core/Define/ConfigQuery/RoleSkillInputById");
const SkillById_1 = require("../../../Core/Define/ConfigQuery/SkillById");
const SkillBySkillGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillBySkillGroupId");
const SkillConditionById_1 = require("../../../Core/Define/ConfigQuery/SkillConditionById");
const SkillDescriptionById_1 = require("../../../Core/Define/ConfigQuery/SkillDescriptionById");
const SkillDescriptionBySkillLevelGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillDescriptionBySkillLevelGroupId");
const SkillInputById_1 = require("../../../Core/Define/ConfigQuery/SkillInputById");
const SkillLevelBySkillLevelGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillLevelBySkillLevelGroupId");
const SkillLevelBySkillLevelGroupIdAndSkillId_1 = require("../../../Core/Define/ConfigQuery/SkillLevelBySkillLevelGroupIdAndSkillId");
const SkillTreeById_1 = require("../../../Core/Define/ConfigQuery/SkillTreeById");
const SkillTreeByNodeGroup_1 = require("../../../Core/Define/ConfigQuery/SkillTreeByNodeGroup");
const SkillTreeByNodeGroupAndNodeIndex_1 = require("../../../Core/Define/ConfigQuery/SkillTreeByNodeGroupAndNodeIndex");
const SkillTypeById_1 = require("../../../Core/Define/ConfigQuery/SkillTypeById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RoleSkillConfig extends ConfigBase_1.ConfigBase {
  GetSkillConfigById(e) {
    var l = SkillById_1.configSkillById.GetConfig(e);
    if (l === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 10, "当前选中的技能配置为空", ["id", e]);
    }
    return l;
  }
  GetSkillLevelConfigByGroupIdAndLevel(e, l) {
    var i = SkillLevelBySkillLevelGroupIdAndSkillId_1.configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig(e, l);
    if (i === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 10, "技能配置为空", ["skillLevelGroupId", e], ["level", l]);
    }
    return i;
  }
  GetSkillLevelConfigList(e) {
    return SkillLevelBySkillLevelGroupId_1.configSkillLevelBySkillLevelGroupId.GetConfigList(e);
  }
  GetSkillTypeNameLocalText(e) {
    e = SkillTypeById_1.configSkillTypeById.GetConfig(e);
    if (e) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TypeName);
    }
  }
  GetSkillList(e) {
    return SkillBySkillGroupId_1.configSkillBySkillGroupId.GetConfigList(e);
  }
  GetSkillTreeNode(e) {
    var l = SkillTreeById_1.configSkillTreeById.GetConfig(e);
    if (l === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "技能树配置为空，Id = ", ["nodeId", e]);
    }
    return l;
  }
  GetSkillTreeNodeListByGroupId(e) {
    return SkillTreeByNodeGroup_1.configSkillTreeByNodeGroup.GetConfigList(e);
  }
  GetSkillTreeNodeByGroupIdAndIndex(e, l) {
    var i = SkillTreeByNodeGroupAndNodeIndex_1.configSkillTreeByNodeGroupAndNodeIndex.GetConfig(e, l);
    if (i === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "技能树配置为空，NodeGroup = " + e + ", NodeIndex = " + l);
    }
    return i;
  }
  GetSkillTreeNodeByGroupIdAndSkillId(e, l) {
    e = this.GetSkillTreeNodeListByGroupId(e);
    if (e !== undefined) {
      return e.find(e => e.SkillId === l);
    }
  }
  GetSkillConditionById(e) {
    var l = SkillConditionById_1.configSkillConditionById.GetConfig(e);
    if (l === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "技能条件配置为空，Id = ", ["skillConditionId", e]);
    }
    return l;
  }
  GetRoleSkillTreeConsume(e, l) {
    e = this.GetSkillTreeNode(e);
    if (e) {
      var i = e.SkillId;
      if (!i || i === 0) {
        return e.Consume;
      }
      e = this.GetSkillConfigById(i);
      if (e) {
        i = e.SkillLevelGroupId;
        if (i && i !== 0) {
          return this.GetSkillLevelConfigByGroupIdAndLevel(i, l)?.Consume;
        }
      }
    }
  }
  GetRoleSkillDescriptionConfigById(e) {
    var l = SkillDescriptionById_1.configSkillDescriptionById.GetConfig(e);
    if (l === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "技能描述配置为空，Id = ", ["id", e]);
    }
    return l;
  }
  GetAllRoleSkillDescConfigByGroupId(e) {
    var l = SkillDescriptionBySkillLevelGroupId_1.configSkillDescriptionBySkillLevelGroupId.GetConfigList(e);
    if (l === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 37, "技能描述配置为空", ["GroupId", e]);
    }
    return l;
  }
  GetSkillInputConfigById(e) {
    var l = SkillInputById_1.configSkillInputById.GetConfig(e);
    if (l === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Role", 43, "技能出招表配置为空，Id = ", ["skillInputId", e]);
    }
    return l;
  }
  GetRoleSkillInputConfigById(e) {
    return RoleSkillInputById_1.configRoleSkillInputById.GetConfig(e);
  }
  GetRoleSkillMaxLevelBySkillNodeId(e) {
    e = this.GetSkillTreeNode(e).SkillId;
    if (e && e > 0) {
      return this.GetSkillConfigById(e)?.MaxSkillLevel;
    }
  }
}
exports.RoleSkillConfig = RoleSkillConfig;
//# sourceMappingURL=RoleSkillConfig.js.map