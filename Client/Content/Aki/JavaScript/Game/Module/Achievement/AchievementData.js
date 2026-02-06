"use strict";

var __decorate = this && this.__decorate || function (e, t, r, i) {
  var a;
  var s = arguments.length;
  var n = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, r, i);
  } else {
    for (var o = e.length - 1; o >= 0; o--) {
      if (a = e[o]) {
        n = (s < 3 ? a(n) : s > 3 ? a(t, r, n) : a(t, r)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementSearchGroupData = exports.AchievementSearchData = exports.AchievementGroupData = exports.AchievementCategoryData = exports.AchievementData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Descriptors_1 = require("../../../Core/CrossDataSource/Descriptors");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
let AchievementData = class AchievementData {
  constructor(e) {
    this.FinishTime = undefined;
    this.gbe = 0;
    this.ube = -1;
    this.cbe = new Array();
    this.HasGetRewardState = false;
    this.CurrentProgress = undefined;
    this.MaxProgress = undefined;
    this.Id = 0;
    this.nba = "-1";
    this.Id = e;
    this.gbe = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementNextLink(this.Id);
  }
  SetLastLink(e) {
    this.ube = e;
  }
  Phrase(e) {
    this.FinishTime = e.rvs;
    this.HasGetRewardState = e.ovs;
    this.CurrentProgress = e.nvs.tvs;
    this.MaxProgress = e.nvs.ivs;
    this.NYd();
    this.sba();
  }
  sba() {
    var e = this.GetThirdPartyTrophyId();
    if (this.GetFinishState() !== 0 && e !== "-1") {
      ControllerHolder_1.ControllerHolder.KuroSdkController.UnlockSdkTrophy(e);
    }
  }
  GetId() {
    return this.Id;
  }
  NYd() {
    if (this.nba === "-1") {
      if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
        this.nba = ConfigManager_1.ConfigManager.AchievementConfig.GetThirdPartyTrophyId(this.Id).toString();
      } else if (Info_1.Info.IsIosPlatform()) {
        this.nba = ConfigManager_1.ConfigManager.AchievementConfig.GetExternalTrophyId(this.Id);
      } else {
        this.nba = ConfigManager_1.ConfigManager.AchievementConfig.GetGPExternalTrophyId(this.Id);
      }
    }
  }
  GetThirdPartyTrophyId() {
    return this.nba;
  }
  RedPoint() {
    return this.GetFinishState() === 1 && !!this.GetShowState();
  }
  GetIconPath() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementIcon(this.Id);
  }
  IfSingleAchievement() {
    return this.gbe === -1;
  }
  GetShowState() {
    if (this.MaxProgress === undefined) {
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
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementHiddenState(this.Id);
  }
  GetReplaceDesc(e) {
    let t = this.GetDesc();
    var r = new StringBuilder_1.StringBuilder();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("TutorialSearchColor");
    r.Append("<color=");
    r.Append(i?.toLowerCase() + ">");
    r.Append(e);
    r.Append("</color>");
    var i = "" + e;
    return t = t.replace(i, r.ToString());
  }
  GetReplaceTitle(e) {
    let t = this.GetTitle();
    var r = new StringBuilder_1.StringBuilder();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("TutorialSearchColor");
    r.Append("<color=");
    r.Append(i?.toLowerCase() + ">");
    r.Append(e);
    r.Append("</color>");
    var i = "" + e;
    return t = t.replace(i, r.ToString());
  }
  GetDesc() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementDesc(this.Id);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementTitle(this.Id);
  }
  GetMaxStar() {
    if (this.IfSingleAchievement()) {
      const t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.Id);
      return t;
    }
    let e = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(this.Id);
    while (e?.gbe) {
      e = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e?.gbe);
    }
    const t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(e.GetId());
    return t;
  }
  GetFinishedStar() {
    var e;
    var t;
    if (this.GetShowState()) {
      e = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.Id);
      if (this.IfSingleAchievement()) {
        if (this.GetFinishState() === 2 || this.GetFinishState() === 1) {
          return e;
        } else {
          return 0;
        }
      } else {
        t = this.fbe();
        if (this.GetFinishState() === 2 || this.GetFinishState() === 1) {
          return e + t;
        } else if (this.GetFinishState() === 0) {
          return t;
        } else {
          return (e - 1 >= 0 ? e - 1 : 0) + t;
        }
      }
    } else {
      return 0;
    }
  }
  fbe() {
    let e = 0;
    let t = this.ube;
    while (t !== -1) {
      var r = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(t);
      e += ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(t);
      t = r.ube;
    }
    return e;
  }
  GetAchievementShowStar() {
    var e;
    if (this.GetShowState()) {
      e = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(this.Id);
      if (this.IfSingleAchievement() || this.GetFinishState() === 2 || this.GetFinishState() === 1) {
        return e;
      } else if (e - 1 >= 0) {
        return e - 1;
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
    return this.CurrentProgress;
  }
  GetMaxProgress() {
    return this.MaxProgress;
  }
  GetRewards() {
    if (this.cbe.length === 0) {
      this.cbe = new Array();
      var e = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementReward(this.Id);
      if (e) {
        for (var [t, r] of e) {
          t = [{
            IncId: 0,
            ItemId: t
          }, r];
          this.cbe.push(t);
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
    if (this.HasGetRewardState) {
      return 2;
    } else if (this.FinishTime > 0) {
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
    return this.FinishTime;
  }
  GetGroupId() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroup(this.Id);
  }
};
__decorate([(0, Descriptors_1.CSharpField)("FinishTime")], AchievementData.prototype, "FinishTime", undefined);
__decorate([(0, Descriptors_1.CSharpField)("HasGetRewardState")], AchievementData.prototype, "HasGetRewardState", undefined);
__decorate([(0, Descriptors_1.CSharpField)("CurrentProgress")], AchievementData.prototype, "CurrentProgress", undefined);
__decorate([(0, Descriptors_1.CSharpField)("MaxProgress")], AchievementData.prototype, "MaxProgress", undefined);
__decorate([(0, Descriptors_1.CSharpDataUid)()], AchievementData.prototype, "Id", undefined);
AchievementData = __decorate([(0, Descriptors_1.CSharpDataProxy)("", "AchievementData")], AchievementData);
exports.AchievementData = AchievementData;
let AchievementCategoryData = class AchievementCategoryData {
  constructor(e) {
    this.Id = 0;
    this.Id = e;
  }
  GetId() {
    return this.Id;
  }
  GetFunctionType() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(this.Id);
  }
  GetOrignalTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryOriginalTitle(this.Id);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTitle(this.Id);
  }
  GetTexture() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTexture(this.Id);
  }
  GetSprite() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategorySprite(this.Id);
  }
  GetAchievementCategoryProgress() {
    let e = 0;
    let t = 0;
    for (const i of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(this.Id)) {
      for (const a of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(i.GetId(), false)) {
        var r = a.GetFinishState();
        if ((!a.GetHiddenState() || r !== 0) && a.GetMaxProgress() !== undefined) {
          e++;
          if (r !== 0) {
            t++;
          }
        }
      }
    }
    return Math.round(t * 100 / e) + "%";
  }
};
__decorate([(0, Descriptors_1.CSharpDataUid)()], AchievementCategoryData.prototype, "Id", undefined);
AchievementCategoryData = __decorate([(0, Descriptors_1.CSharpDataProxy)("", "AchievementCategoryData")], AchievementCategoryData);
exports.AchievementCategoryData = AchievementCategoryData;
let AchievementGroupData = class AchievementGroupData {
  constructor(e) {
    this.Id = 0;
    this.HasGetRewardState = false;
    this.FinishTime = 0;
    this.cbe = new Array();
    this.pbe = false;
    this.IfUnLock = false;
    this.Id = e;
  }
  Phrase(e) {
    this.HasGetRewardState = e.ovs;
    this.FinishTime = e.rvs;
    this.IfUnLock = true;
  }
  GetId() {
    return this.Id;
  }
  GetSort() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSort(this.Id);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupTitle(this.Id);
  }
  GetTexture() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupIcon(this.Id);
  }
  GetSmallIcon() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSmallIcon(this.Id);
  }
  GetBackgroundIcon() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupBackgroundIcon(this.Id);
  }
  GetCategory() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupCategory(this.Id);
  }
  GetFinishTime() {
    return this.FinishTime;
  }
  GetShowState() {
    return !!this.IfUnLock && !!ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupEnable(this.Id);
  }
  GetRewards() {
    if (!this.pbe) {
      this.cbe = new Array();
      var e = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupReward(this.Id);
      if (e) {
        for (var [t, r] of e) {
          t = [{
            IncId: 0,
            ItemId: t
          }, r];
          this.cbe.push(t);
        }
      }
      this.pbe = true;
    }
    return this.cbe;
  }
  SmallItemRedPoint() {
    return !!this.RedPoint() || ModelManager_1.ModelManager.AchievementModel.GetGroupAchievementsIsRedDot(this.Id);
  }
  RedPoint() {
    return this.GetFinishState() === 1 && !!this.GetShowState() && !(this.GetRewards().length <= 0);
  }
  GetCurrentProgress() {
    var e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(this.Id);
    let t = 0;
    e.forEach(e => {
      if (e.GetFinishState() !== 0) {
        t++;
      }
    });
    return t;
  }
  GetMaxProgress() {
    var e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(this.Id);
    let t = 0;
    e.forEach(e => {
      if (e.GetShowState()) {
        t++;
      }
    });
    return t;
  }
  GetFinishState() {
    if (this.HasGetRewardState) {
      return 2;
    } else if (this.FinishTime > 0) {
      return 1;
    } else {
      return 0;
    }
  }
  GetAchievementGroupProgress() {
    let e = 0;
    let t = 0;
    for (const i of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(this.Id, false)) {
      var r = i.GetFinishState();
      if ((!i.GetHiddenState() || r !== 0) && i.GetMaxProgress() !== undefined) {
        e++;
        if (r !== 0) {
          t++;
        }
      }
    }
    return Math.round(t * 100 / e) + "%";
  }
};
__decorate([(0, Descriptors_1.CSharpDataUid)()], AchievementGroupData.prototype, "Id", undefined);
__decorate([(0, Descriptors_1.CSharpField)("HasGetRewardState")], AchievementGroupData.prototype, "HasGetRewardState", undefined);
__decorate([(0, Descriptors_1.CSharpField)("FinishTime")], AchievementGroupData.prototype, "FinishTime", undefined);
__decorate([(0, Descriptors_1.CSharpField)("IfUnLock")], AchievementGroupData.prototype, "IfUnLock", undefined);
AchievementGroupData = __decorate([(0, Descriptors_1.CSharpDataProxy)("", "AchievementGroupData")], AchievementGroupData);
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