"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchGroupData = exports.AchievementSearchData = exports.AchievementGroupData = exports.AchievementCategoryData = exports.AchievementData = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class AchievementData {
  constructor(t) {
    this.xe = t;
    this._be = undefined;
    this.gbe = 0;
    this.ube = -1;
    this.cbe = new Array();
    this.mbe = false;
    this.dbe = undefined;
    this.Cbe = undefined;
    this.nba = "-1";
    this.gbe = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementNextLink(this.xe);
  }
  SetLastLink(t) {
    this.ube = t;
  }
  Phrase(t) {
    this._be = t.rvs;
    this.mbe = t.ovs;
    this.dbe = t.nvs.tvs;
    this.Cbe = t.nvs.ivs;
    this.lYd();
    this.sba();
  }
  sba() {
    var t = this.GetThirdPartyTrophyId();
    if (this.GetFinishState() !== 0 && t !== "-1") {
      ControllerHolder_1.ControllerHolder.KuroSdkController.UnlockSdkTrophy(t);
    }
  }
  GetId() {
    return this.xe;
  }
  lYd() {
    if (this.nba === "-1") {
      this.nba = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn ? ConfigManager_1.ConfigManager.AchievementConfig.GetThirdPartyTrophyId(this.xe).toString() : ConfigManager_1.ConfigManager.AchievementConfig.GetExternalTrophyId(this.xe);
    }
  }
  GetThirdPartyTrophyId() {
    return this.nba;
  }
  RedPoint() {
    return this.GetFinishState() === 1 && !!this.GetShowState();
  }
  GetIconPath() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementIcon(this.xe);
  }
  IfSingleAchievement() {
    return this.gbe === -1;
  }
  GetShowState() {
    if (this.Cbe === undefined) {
      return false;
    }
    if (this.GetHiddenState() && this.GetFinishState() === 0) {
      return false;
    }
    if (this.ube !== -1 && ModelManager_1.ModelManager.AchievementModel.GetAchievementData(this.ube).GetFinishState() !== 2) {
      return false;
    }
    return this.GetFinishState() !== 2 || !(this.gbe > 0);
  }
  GetHiddenState() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementHiddenState(this.xe);
  }
  GetReplaceDesc(t) {
    let e = this.GetDesc();
    var r = new StringBuilder_1.StringBuilder();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("TutorialSearchColor");
    r.Append("<color=");
    r.Append(i?.toLowerCase() + ">");
    r.Append(t);
    r.Append("</color>");
    var i = "" + t;
    return e = e.replace(i, r.ToString());
  }
  GetReplaceTitle(t) {
    let e = this.GetTitle();
    var r = new StringBuilder_1.StringBuilder();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("TutorialSearchColor");
    r.Append("<color=");
    r.Append(i?.toLowerCase() + ">");
    r.Append(t);
    r.Append("</color>");
    var i = "" + t;
    return e = e.replace(i, r.ToString());
  }
  GetDesc() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementDesc(this.xe);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementTitle(this.xe);
  }
  GetMaxStar() {
    if (this.IfSingleAchievement()) {
      const e = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.xe);
      return e;
    }
    let t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(this.xe);
    while (t?.gbe) {
      t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(t?.gbe);
    }
    const e = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(t.GetId());
    return e;
  }
  GetFinishedStar() {
    var t;
    var e;
    if (this.GetShowState()) {
      t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.xe);
      if (this.IfSingleAchievement()) {
        if (this.GetFinishState() === 2 || this.GetFinishState() === 1) {
          return t;
        } else {
          return 0;
        }
      } else {
        e = this.fbe();
        if (this.GetFinishState() === 2 || this.GetFinishState() === 1) {
          return t + e;
        } else if (this.GetFinishState() === 0) {
          return e;
        } else {
          return (t - 1 >= 0 ? t - 1 : 0) + e;
        }
      }
    } else {
      return 0;
    }
  }
  fbe() {
    let t = 0;
    let e = this.ube;
    while (e !== -1) {
      var r = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e);
      t += ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(e);
      e = r.ube;
    }
    return t;
  }
  GetAchievementShowStar() {
    var t;
    if (this.GetShowState()) {
      t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.xe);
      if (this.IfSingleAchievement() || this.GetFinishState() === 2 || this.GetFinishState() === 1) {
        return t;
      } else if (t - 1 >= 0) {
        return t - 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  GetAchievementConfigStar() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.GetId());
  }
  GetCurrentProgress() {
    return this.dbe;
  }
  GetMaxProgress() {
    return this.Cbe;
  }
  GetRewards() {
    if (this.cbe.length === 0) {
      this.cbe = new Array();
      var t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementReward(this.xe);
      if (t) {
        for (var [e, r] of t) {
          e = [{
            IncId: 0,
            ItemId: e
          }, r];
          this.cbe.push(e);
        }
      }
    }
    return this.cbe;
  }
  GetAllFinishState() {
    return (this.gbe === 0 || this.gbe === -1) && this.GetFinishState() === 1;
  }
  GetNextLink() {
    return this.gbe;
  }
  GetIfLastAchievement() {
    return !!this.IfSingleAchievement() || this.gbe === 0;
  }
  CanShowStarState() {
    return this.GetFinishState() === 2 || this.GetFinishState() === 1;
  }
  GetFinishState() {
    if (this.mbe) {
      return 2;
    } else if (this._be > 0) {
      return 1;
    } else {
      return 0;
    }
  }
  GetFinishSort() {
    if (this.GetFinishState() === 2) {
      return 0;
    } else if (this.GetFinishState() === 1) {
      return 2;
    } else {
      return 1;
    }
  }
  GetFinishTime() {
    return this._be;
  }
  GetGroupId() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroup(this.xe);
  }
}
exports.AchievementData = AchievementData;
class AchievementCategoryData {
  constructor(t) {
    this.xe = t;
  }
  GetId() {
    return this.xe;
  }
  GetFunctionType() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(this.xe);
  }
  GetOrignalTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryOriginalTitle(this.xe);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTitle(this.xe);
  }
  GetTexture() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTexture(this.xe);
  }
  GetSprite() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategorySprite(this.xe);
  }
  GetAchievementCategoryProgress() {
    let t = 0;
    let e = 0;
    for (const i of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(this.xe)) {
      for (const n of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(i.GetId(), false)) {
        var r = n.GetFinishState();
        if ((!n.GetHiddenState() || r !== 0) && n.GetMaxProgress() !== undefined) {
          t++;
          if (r !== 0) {
            e++;
          }
        }
      }
    }
    return Math.round(e * 100 / t) + "%";
  }
}
exports.AchievementCategoryData = AchievementCategoryData;
class AchievementGroupData {
  constructor(t) {
    this.xe = t;
    this.mbe = false;
    this._be = 0;
    this.cbe = new Array();
    this.pbe = false;
    this.vbe = false;
  }
  Phrase(t) {
    this.mbe = t.ovs;
    this._be = t.rvs;
    this.vbe = true;
  }
  GetId() {
    return this.xe;
  }
  GetSort() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSort(this.xe);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupTitle(this.xe);
  }
  GetTexture() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupIcon(this.xe);
  }
  GetSmallIcon() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSmallIcon(this.xe);
  }
  GetBackgroundIcon() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupBackgroundIcon(this.xe);
  }
  GetCategory() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupCategory(this.xe);
  }
  GetFinishTime() {
    return this._be;
  }
  GetShowState() {
    return !!this.vbe && !!ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupEnable(this.xe);
  }
  GetRewards() {
    if (!this.pbe) {
      this.cbe = new Array();
      var t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupReward(this.xe);
      if (t) {
        for (var [e, r] of t) {
          e = [{
            IncId: 0,
            ItemId: e
          }, r];
          this.cbe.push(e);
        }
      }
      this.pbe = true;
    }
    return this.cbe;
  }
  SmallItemRedPoint() {
    return !!this.RedPoint() || ModelManager_1.ModelManager.AchievementModel.GetGroupAchievementsIsRedDot(this.xe);
  }
  RedPoint() {
    return this.GetFinishState() === 1 && !!this.GetShowState() && !(this.GetRewards().length <= 0);
  }
  GetCurrentProgress() {
    var t = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(this.xe);
    let e = 0;
    t.forEach(t => {
      if (t.GetFinishState() !== 0) {
        e++;
      }
    });
    return e;
  }
  GetMaxProgress() {
    var t = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(this.xe);
    let e = 0;
    t.forEach(t => {
      if (t.GetShowState()) {
        e++;
      }
    });
    return e;
  }
  GetFinishState() {
    if (this.mbe) {
      return 2;
    } else if (this._be > 0) {
      return 1;
    } else {
      return 0;
    }
  }
  GetAchievementGroupProgress() {
    let t = 0;
    let e = 0;
    for (const i of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(this.xe, false)) {
      var r = i.GetFinishState();
      if ((!i.GetHiddenState() || r !== 0) && i.GetMaxProgress() !== undefined) {
        t++;
        if (r !== 0) {
          e++;
        }
      }
    }
    return Math.round(e * 100 / t) + "%";
  }
}
exports.AchievementGroupData = AchievementGroupData;
class AchievementSearchData {
  constructor() {
    this.AchievementCategoryData = undefined;
    this.AchievementSearchGroupData = undefined;
    this.AchievementData = undefined;
  }
}
exports.AchievementSearchData = AchievementSearchData;
class AchievementSearchGroupData {
  constructor() {
    this.AchievementGroupData = undefined;
    this.AchievementDataLength = 0;
  }
}
exports.AchievementSearchGroupData = AchievementSearchGroupData;
//# sourceMappingURL=AchievementData.js.map