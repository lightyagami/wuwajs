"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSort = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const RoleDefine_1 = require("../../../../../RoleUi/RoleDefine");
const CommonSort_1 = require("./CommonSort");
class RoleSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.oRt = (e, i, t) => {
      e = e.GetLevelData();
      i = i.GetLevelData();
      if (e.GetLevel() !== i.GetLevel()) {
        return (i.GetLevel() - e.GetLevel()) * (t ? -1 : 1);
      } else if (e.GetBreachLevel() !== i.GetBreachLevel()) {
        return (i.GetBreachLevel() - e.GetBreachLevel()) * (t ? -1 : 1);
      } else {
        return undefined;
      }
    };
    this.KDt = (e, i, t) => {
      e = e.GetRoleConfig().QualityId;
      i = i.GetRoleConfig().QualityId;
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.XRt = (e, i, t) => {
      var r = e;
      var s = i;
      let h = -1;
      let n = -1;
      var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      for (let e = 0; e < o.length; e++) {
        var a = o[e];
        if (r.GetDataId() === a.GetConfigId) {
          h = e;
        }
        if (s.GetDataId() === a.GetConfigId) {
          n = e;
        }
      }
      e = o[h] !== undefined;
      i = o[n] !== undefined;
      if (e || i) {
        if (e != i) {
          return (i ? 1 : 0) - (e ? 1 : 0);
        } else {
          return h - n;
        }
      }
    };
    this.$Rt = (e, i, t) => {
      if (e.GetRoleConfig().Priority !== i.GetRoleConfig().Priority) {
        return (i.GetRoleConfig().Priority - e.GetRoleConfig().Priority) * (t ? -1 : 1);
      }
    };
    this.YRt = (e, i, t) => {
      e = e.GetResonanceData();
      i = i.GetResonanceData();
      e = e.GetResonantChainGroupIndex();
      i = i.GetResonantChainGroupIndex();
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.JRt = (e, i, t) => {
      e = e.GetResonanceData();
      i = i.GetResonanceData();
      e = e.GetResonanceIncreaseLevel();
      i = i.GetResonanceIncreaseLevel();
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.zRt = (e, i, t) => {};
    this.ZRt = (e, i, t) => {
      var e = e.GetFavorData();
      var i = i.GetFavorData();
      var r = e.GetFavorLevel();
      var s = i.GetFavorLevel();
      if (e && i) {
        if (r !== s) {
          return (s - r) * (t ? -1 : 1);
        } else if ((s = e.GetFavorExp()) !== (r = i.GetFavorExp())) {
          return (r - s) * (t ? -1 : 1);
        } else {
          return undefined;
        }
      }
    };
    this.eUt = (e, i, t) => {
      e = e.GetRoleCreateTime();
      i = i.GetRoleCreateTime();
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.tUt = (e, i, t) => {
      e = e.GetAttributeData();
      i = i.GetAttributeData();
      e = e.GetAttrValueById(RoleDefine_1.HP_ATTR_ID);
      i = i.GetAttrValueById(RoleDefine_1.HP_ATTR_ID);
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.iUt = (e, i, t) => {
      e = e.GetAttributeData();
      i = i.GetAttributeData();
      e = e.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID);
      i = i.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID);
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.bua = (e, i, t) => {
      var r;
      var s = ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList.includes(e.GetRoleId()) && e.GetLevelData().GetLevel() !== 0;
      if (s !== (ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList.includes(i.GetRoleId()) && i.GetLevelData().GetLevel() !== 0) || (s = ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList.includes(e.GetRoleId())) !== ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList.includes(i.GetRoleId())) {
        if (s) {
          return -1;
        } else {
          return 1;
        }
      } else if ((s = e.GetLevelData().GetLevel()) !== (r = i.GetLevelData().GetLevel())) {
        if (r < s) {
          return -1;
        } else {
          return 1;
        }
      } else if ((r = e.GetRoleConfig().QualityId) !== (s = i.GetRoleConfig().QualityId)) {
        if (s < r) {
          return -1;
        } else {
          return 1;
        }
      } else {
        s = e.GetRoleId();
        if ((r = i.GetRoleId()) < s) {
          return -1;
        } else if (s < r) {
          return 1;
        } else {
          return 0;
        }
      }
    };
    this.GQ_ = (e, i, t) => {
      e = ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(e.GetRoleId());
      if (e !== ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(i.GetRoleId())) {
        if (e) {
          return -1;
        } else {
          return 1;
        }
      }
    };
    this.oUt = (e, i, t) => {
      e = e.GetAttributeData();
      i = i.GetAttributeData();
      e = e.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID);
      i = i.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID);
      if (e !== i) {
        return (i - e) * (t ? -1 : 1);
      }
    };
    this.rUt = (e, i, t) => {
      var r = ModelManager_1.ModelManager.RoleSelectModel;
      var e = e.GetDataId();
      var i = i.GetDataId();
      var e = r.GetRoleIndex(e);
      var r = r.GetRoleIndex(i);
      if (e <= 0 || r <= 0) {
        return (r ? 1 : 0) - (e ? 1 : 0);
      } else if (e !== r) {
        return e - r;
      } else {
        return undefined;
      }
    };
    this.nUt = (e, i, t) => {
      e = e.IsTrialRole();
      i = i.IsTrialRole();
      if (e !== i) {
        return ((i ? 1 : 0) - (e ? 1 : 0)) * (t ? -1 : 1);
      }
    };
    this.VQd = (e, i, t) => {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId) {
        var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
        var r = [...r.RecommendRoleBottom, ...r.RecommendRole];
        var e = r.includes(e.GetRoleId()) ? 1 : 0;
        var r = r.includes(i.GetRoleId()) ? 1 : 0;
        if (e != r) {
          return (r - e) * (t ? -1 : 1);
        }
      }
    };
    this.sUt = (e, i, t) => {
      var r = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
      return (ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(e.GetRoleId(), r) - ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(i.GetRoleId(), r)) * (t ? -1 : 1);
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.oRt);
    this.SortMap.set(2, this.KDt);
    this.SortMap.set(3, this.XRt);
    this.SortMap.set(4, this.$Rt);
    this.SortMap.set(5, this.YRt);
    this.SortMap.set(6, this.JRt);
    this.SortMap.set(7, this.zRt);
    this.SortMap.set(8, this.ZRt);
    this.SortMap.set(9, this.eUt);
    this.SortMap.set(10, this.tUt);
    this.SortMap.set(11, this.iUt);
    this.SortMap.set(12, this.oUt);
    this.SortMap.set(13, this.rUt);
    this.SortMap.set(14, this.rUt);
    this.SortMap.set(15, this.nUt);
    this.SortMap.set(16, this.sUt);
    this.SortMap.set(17, this.bua);
    this.SortMap.set(18, this.GQ_);
    this.SortMap.set(19, this.VQd);
  }
}
exports.RoleSort = RoleSort;
//# sourceMappingURL=RoleSort.js.map