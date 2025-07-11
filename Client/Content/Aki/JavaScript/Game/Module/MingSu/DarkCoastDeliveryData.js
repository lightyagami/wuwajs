"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryData = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const DarkCoastDeliveryLevelData_1 = require("./DarkCoastDeliveryLevelData");
const MingSuController_1 = require("./MingSuController");
const MingSuInstance_1 = require("./MingSuInstance");
class DarkCoastDeliveryData extends MingSuInstance_1.MingSuInstance {
  constructor(e) {
    super(e);
    this.dQa = [];
    this.DragonPoolConfig.DarkCoastDeliveryList.forEach((e, t) => {
      var e = ConfigManager_1.ConfigManager.CollectItemConfig.GetDarkCoastDeliveryById(e);
      if (e !== undefined) {
        e = new DarkCoastDeliveryLevelData_1.DarkCoastDeliveryLevelData(e, this.DragonPoolConfig.Goal[t], this.DragonPoolConfig.DropIds[t]);
        this.dQa.push(e);
      }
    });
  }
  SetDragonPoolLevel(t) {
    super.SetDragonPoolLevel(t);
    this.dQa.forEach(e => {
      e.SetIsUnLockState(t);
    });
  }
  SetLevelGainList(t) {
    this.dQa.forEach(e => {
      e.SetReceiveRewardState(t >= e.Id);
    });
  }
  RefreshLevelDataState(e, t) {
    for (const i of e) {
      var r = this.GetLevelData(i);
      if (r) {
        r.SetDefeatedGuardState(true);
      }
    }
    for (const o of t) {
      var a = this.GetLevelData(o);
      if (a) {
        a.SetReceivedGuardRewardState(true);
      }
    }
  }
  GetLevelData(t) {
    return this.dQa.find(e => e.Id === t);
  }
  GetLevelDataList() {
    return this.dQa;
  }
  GetCurLevelTexturePath() {
    return this.GetLevelTexturePath(this.DragonPoolLevel);
  }
  GetLevelTexturePath(e) {
    e = this.GetLevelData(e);
    if (e !== undefined) {
      return e.Config.LevelTexture;
    } else {
      return CommonParamById_1.configCommonParamById.GetStringConfig("DarkShoreDefaultLevel");
    }
  }
  GetActivityRewardViewData() {
    return {
      DataPageList: [{
        DataList: this.CQa()
      }],
      Source: "DarkCoastDelivery"
    };
  }
  CQa() {
    var e = [];
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DarkShoreRewardGet");
    var r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DarkShoreRewardNotAchieved");
    for (const n of this.dQa) {
      var a = n.GetRewardItems();
      var i = n.GetDarkCoastDeliveryRewardState();
      var o = i === 1 ? t : r;
      var a = {
        RewardList: a,
        NameText: StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DarkCoastDelivery_Reward"), n.Id.toString()),
        RewardState: i,
        RewardButtonRedDot: i === 1,
        RewardButtonText: o,
        ClickFunction: () => {
          MingSuController_1.MingSuController.SendMingSuHandRewardRequest(this.DragonPoolId);
        }
      };
      e.push(a);
    }
    return e;
  }
  GetRewardRedDotState() {
    for (const e of this.dQa) {
      if (e.GetDarkCoastDeliveryRewardState() === 1) {
        return true;
      }
    }
    return false;
  }
}
exports.DarkCoastDeliveryData = DarkCoastDeliveryData;
//# sourceMappingURL=DarkCoastDeliveryData.js.map