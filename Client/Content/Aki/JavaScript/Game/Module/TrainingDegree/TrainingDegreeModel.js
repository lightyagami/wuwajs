"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainingDegreeModel = exports.TrainingData = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const QualityInfoAll_1 = require("../../../Core/Define/ConfigQuery/QualityInfoAll");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const MAX_ROLE_SIZE = 3;
const MIN_PROCESS = 0.2;
class TrainingData {
  constructor() {
    this.NameId = "";
    this.FillAmount = -0;
    this.TipsId = "";
    this.Icon = "";
    this.BgColor = "";
    this.TrainingType = 0;
  }
}
exports.TrainingData = TrainingData;
class TrainingDegreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.yRo = -0;
    this.IRo = undefined;
    this.TRo = new Map();
  }
  OnInit() {
    this.yRo = CommonParamById_1.configCommonParamById.GetFloatConfig("RoleTrainingDegreeNormal");
    this.IRo = CommonParamById_1.configCommonParamById.GetIntArrayConfig("TrainingDegreeSkillTypes");
    for (const e of QualityInfoAll_1.configQualityInfoAll.GetConfigList()) {
      this.TRo.set(e.Id, e.TrainingWeight);
    }
    return true;
  }
  OnClear() {
    this.IRo = undefined;
    this.TRo.clear();
    return true;
  }
  GetTrainingDataList() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var r = this.LRo();
      var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleTrainingDegreeConfig(r);
      if (r) {
        let e = true;
        var a = new Array();
        for (const D of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          var n = D.GetConfigId;
          var n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
          if (n) {
            a.push(n);
            if (!n.IsTrialRole()) {
              e = false;
            }
          }
        }
        if (!e) {
          var o = [];
          var i = [];
          var t = [];
          var l = [];
          var s = this.IRo.length;
          for (const R of a) {
            var g = this.TRo.get(R.GetRoleConfig().QualityId) ?? 1;
            o.push(R.GetLevelData().GetLevel() * g);
            let e = 0;
            var M = R.GetSkillData();
            for (const E of M.GetSkillList()) {
              if (this.IRo.includes(E.SkillType)) {
                e += M.GetSkillLevel(E.Id);
              }
            }
            i.push(e / s);
            var _;
            var g = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(R.GetDataId());
            let r = 0;
            if (g) {
              _ = this.TRo.get(g.GetWeaponConfig().QualityId) ?? 1;
              r = g.GetLevel() * _;
            }
            t.push(r);
            g = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(R.GetRoleId());
            l.push(g.GetAverageEquipLevel());
          }
          var f;
          var v;
          var d;
          var h;
          var C;
          var I = r.RoleLevel;
          var u = r.SkillLevel;
          var m = r.WeaponLevel;
          var r = r.EquipLevel;
          var c = new Array();
          for ([f, v, d, h, C] of [["ReviveTrainingItemRoleLevel", o, I, "SP_IconDeathLevel", 0], ["ReviveTrainingItemWeaponLevel", t, m, "SP_IconDeathWeapon", 1], ["ReviveTrainingItemEquipLevel", l, r, "SP_IconDeathVision", 2], ["ReviveTrainingItemSkillLevel", i, u, "SP_IconDeathTree", 3]]) {
            if (!(d <= 0)) {
              var T = v.length;
              if (T > MAX_ROLE_SIZE) {
                v.sort((e, r) => r - e);
                v.splice(MAX_ROLE_SIZE, T - MAX_ROLE_SIZE);
              }
              let e = 0;
              for (const p of v) {
                e += p;
              }
              e /= MAX_ROLE_SIZE;
              var T = new TrainingData();
              T.Icon = h;
              T.NameId = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(f);
              var S = e / d;
              T.FillAmount = S;
              T.TrainingType = C;
              c.push(T);
            }
          }
          if (!(c.length <= 0)) {
            let e = c[0];
            for (const L of c) {
              if (L.FillAmount < e.FillAmount) {
                e = L;
              }
            }
            if (e.FillAmount < this.yRo) {
              e.TipsId = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ReviveTrainingItemBad");
              e.BgColor = "6a2e2b";
            }
            for (const y of c) {
              y.FillAmount = MathUtils_1.MathUtils.Clamp(y.FillAmount, MIN_PROCESS, 1);
            }
          }
          return c;
        }
      }
    }
  }
  LRo() {
    var e;
    var r = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var a = ConfigManager_1.ConfigManager.WorldLevelConfig.GetWorldLevelConfig(r);
    if (a) {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        if (e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon) {
          if ((e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(e.Id, r)) > 0) {
            return e;
          } else {
            return a.TrainingLevel;
          }
        } else {
          return 1;
        }
      } else {
        return a.TrainingLevel;
      }
    } else {
      return 1;
    }
  }
}
exports.TrainingDegreeModel = TrainingDegreeModel;
//# sourceMappingURL=TrainingDegreeModel.js.map