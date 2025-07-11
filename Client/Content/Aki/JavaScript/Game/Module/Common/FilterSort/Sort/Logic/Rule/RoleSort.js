"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const RoleDefine_1 = require("../../../../../RoleUi/RoleDefine");
const CommonSort_1 = require("./CommonSort");
class RoleSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.oRt = (e, t, i) => {
      e = e.GetLevelData();
      t = t.GetLevelData();
      if (e.GetLevel() !== t.GetLevel()) {
        return (t.GetLevel() - e.GetLevel()) * (i ? -1 : 1);
      } else if (e.GetBreachLevel() !== t.GetBreachLevel()) {
        return (t.GetBreachLevel() - e.GetBreachLevel()) * (i ? -1 : 1);
      } else {
        return undefined;
      }
    };
    this.KDt = (e, t, i) => {
      e = e.GetRoleConfig().QualityId;
      t = t.GetRoleConfig().QualityId;
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.XRt = (e, t, i) => {
      var r = e;
      var s = t;
      let h = -1;
      let o = -1;
      var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      for (let e = 0; e < n.length; e++) {
        var a = n[e];
        if (r.GetDataId() === a.GetConfigId) {
          h = e;
        }
        if (s.GetDataId() === a.GetConfigId) {
          o = e;
        }
      }
      e = n[h] !== undefined;
      t = n[o] !== undefined;
      if (e || t) {
        if (e != t) {
          return (t ? 1 : 0) - (e ? 1 : 0);
        } else {
          return h - o;
        }
      }
    };
    this.$Rt = (e, t, i) => {
      if (e.GetRoleConfig().Priority !== t.GetRoleConfig().Priority) {
        return (t.GetRoleConfig().Priority - e.GetRoleConfig().Priority) * (i ? -1 : 1);
      }
    };
    this.YRt = (e, t, i) => {
      e = e.GetResonanceData();
      t = t.GetResonanceData();
      e = e.GetResonantChainGroupIndex();
      t = t.GetResonantChainGroupIndex();
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.JRt = (e, t, i) => {
      e = e.GetResonanceData();
      t = t.GetResonanceData();
      e = e.GetResonanceIncreaseLevel();
      t = t.GetResonanceIncreaseLevel();
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.zRt = (e, t, i) => {};
    this.ZRt = (e, t, i) => {
      var e = e.GetFavorData();
      var t = t.GetFavorData();
      var r = e.GetFavorLevel();
      var s = t.GetFavorLevel();
      if (e && t) {
        if (r !== s) {
          return (s - r) * (i ? -1 : 1);
        } else if ((s = e.GetFavorExp()) !== (r = t.GetFavorExp())) {
          return (r - s) * (i ? -1 : 1);
        } else {
          return undefined;
        }
      }
    };
    this.eUt = (e, t, i) => {
      e = e.GetRoleCreateTime();
      t = t.GetRoleCreateTime();
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.tUt = (e, t, i) => {
      e = e.GetAttributeData();
      t = t.GetAttributeData();
      e = e.GetAttrValueById(RoleDefine_1.HP_ATTR_ID);
      t = t.GetAttrValueById(RoleDefine_1.HP_ATTR_ID);
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.iUt = (e, t, i) => {
      e = e.GetAttributeData();
      t = t.GetAttributeData();
      e = e.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID);
      t = t.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID);
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.bua = (e, t, i) => {
      var r;
      var s = ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList.includes(e.GetRoleId()) && e.GetLevelData().GetLevel() !== 0;
      if (s !== (ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList.includes(t.GetRoleId()) && t.GetLevelData().GetLevel() !== 0) || (s = ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList.includes(e.GetRoleId())) !== ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList.includes(t.GetRoleId())) {
        if (s) {
          return -1;
        } else {
          return 1;
        }
      } else if ((s = e.GetLevelData().GetLevel()) !== (r = t.GetLevelData().GetLevel())) {
        if (r < s) {
          return -1;
        } else {
          return 1;
        }
      } else if ((r = e.GetRoleConfig().QualityId) !== (s = t.GetRoleConfig().QualityId)) {
        if (s < r) {
          return -1;
        } else {
          return 1;
        }
      } else {
        s = e.GetRoleId();
        if ((r = t.GetRoleId()) < s) {
          return -1;
        } else if (s < r) {
          return 1;
        } else {
          return 0;
        }
      }
    };
    this.GQ_ = (e, t, i) => {
      e = ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(e.GetRoleId());
      if (e !== ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(t.GetRoleId())) {
        if (e) {
          return -1;
        } else {
          return 1;
        }
      }
    };
    this.oUt = (e, t, i) => {
      e = e.GetAttributeData();
      t = t.GetAttributeData();
      e = e.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID);
      t = t.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID);
      if (e !== t) {
        return (t - e) * (i ? -1 : 1);
      }
    };
    this.rUt = (e, t, i) => {
      var r = ModelManager_1.ModelManager.RoleSelectModel;
      var e = e.GetDataId();
      var t = t.GetDataId();
      var e = r.GetRoleIndex(e);
      var r = r.GetRoleIndex(t);
      if (e <= 0 || r <= 0) {
        return (r ? 1 : 0) - (e ? 1 : 0);
      } else if (e !== r) {
        return e - r;
      } else {
        return undefined;
      }
    };
    this.nUt = (e, t, i) => {
      e = e.IsTrialRole();
      t = t.IsTrialRole();
      if (e !== t) {
        return ((t ? 1 : 0) - (e ? 1 : 0)) * (i ? -1 : 1);
      }
    };
    this.sUt = (e, t, i) => {
      var r = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
      return (ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(e.GetRoleId(), r) - ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(t.GetRoleId(), r)) * (i ? -1 : 1);
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
  }
}
exports.RoleSort = RoleSort;
//# sourceMappingURL=RoleSort.js.map