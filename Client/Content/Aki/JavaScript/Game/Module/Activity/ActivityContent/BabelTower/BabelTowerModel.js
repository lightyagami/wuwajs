"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerModel = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const BabelTowerDifficultyByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDifficultyByActivityId");
const BabelTowerLevelById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerLevelById");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BabelTowerDefine_1 = require("./BabelTowerDefine");
class BabelTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.v_c = undefined;
    this.ItemCountMax = 0;
    this.DeTermSelectInfo = new Map();
    this.DeTermSelectIndex = 0;
    this.LevelChoseHandle = 0;
    this.CurrentSelectLevel = 0;
  }
  get CurrentChallengeInstData() {
    return this.v_c;
  }
  OnInit() {
    this.ItemCountMax = CommonParamById_1.configCommonParamById.GetIntConfig("BabelTowerItemCountMax") ?? 0;
    return true;
  }
  UpdateCurrentChallengeInstDataByNotify(e) {
    this.v_c ||= new BabelTowerDefine_1.BabelTowerInstanceData();
    var r = e.NX_;
    this.v_c.LevelId = e.gG_;
    this.v_c.CurStarNum = e.Whc;
    this.v_c.UseReviveCount = e.zX_;
    this.v_c.RoleCd = r;
    this.v_c.BuffSelection = e.Dks;
    this.v_c.DeTermIdList = e.GX_;
    if (r > 0) {
      ModelManager_1.ModelManager.SceneTeamModel.UpdateChangeRoleCooldown(r);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBabelActivityInstInfoUpdate);
  }
  GetIfLevelTooLow(e, r) {
    let t = 0;
    let o = 0;
    for (const l of r) {
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(l);
      if (a) {
        t += a.GetLevelData().GetLevel();
        o++;
      }
      var a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l);
      if (a) {
        t += a.GetLevelData().GetLevel();
        o++;
      }
    }
    var n = t / o;
    if (n < this.GetRecommendLevel(e) && n != 0) {
      return true;
    }
    for (const s of r) {
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(s);
      if (i) {
        t += i.GetLevelData().GetLevel();
        o++;
      }
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s);
      if (i) {
        t += i.GetLevelData().GetLevel();
        o++;
      }
    }
    n = t / o;
    return n < this.GetRecommendLevel(e) && n != 0;
  }
  GetRecommendLevel(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(e, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
  }
  CalculateDifficultyConfigByStarNum(e, r) {
    var t = BabelTowerDifficultyByActivityId_1.configBabelTowerDifficultyByActivityId.GetConfigList(e);
    for (let e = t.length - 1; e >= 0; e--) {
      var o = t[e];
      if (r >= o.StarNum) {
        return o;
      }
    }
  }
  CoverStarNumToQualityId(e) {
    return e + 2;
  }
  CheckInBattleBabelTower() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && e.InstSubType === 30;
  }
  CheckCanRevive() {
    var e;
    var r = this.CurrentChallengeInstData;
    return !!r && (e = r.LevelId, e = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(e).ReviveStar, r.CurStarNum >= e);
  }
  GetCurStarNum() {
    return this.CurrentChallengeInstData?.CurStarNum ?? 0;
  }
}
exports.BabelTowerModel = BabelTowerModel;
//# sourceMappingURL=BabelTowerModel.js.map