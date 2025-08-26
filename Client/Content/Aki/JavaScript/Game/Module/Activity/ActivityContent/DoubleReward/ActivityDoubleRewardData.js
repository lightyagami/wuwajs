"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDoubleRewardData = undefined;
const DoubleRewardActivityById_1 = require("../../../../../Core/Define/ConfigQuery/DoubleRewardActivityById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityDoubleRewardData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.MOe = 0;
    this.EOe = undefined;
  }
  PhraseEx(e) {
    var t = this.LeftUpCount;
    this.MOe = e.Nps.Cps;
    if (t !== this.LeftUpCount && this.LeftUpCount === 0) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.UpdateAdventureNewSoundAreaTabRedDot();
    }
  }
  GetExDataRedPointShowState() {
    var e;
    return this.LeftUpCount !== 0 && (e = this.ARn(), ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, e, 0, 0) !== 1);
  }
  GetExDataFinishShowState() {
    return this.LeftUpCount === 0;
  }
  ARn() {
    var e = new Date();
    if (e.getHours() < TimeUtil_1.TimeUtil.CrossDayHour) {
      e.setDate(e.getDate() - 1);
    }
    e.setHours(TimeUtil_1.TimeUtil.CrossDayHour, 0, 0, 0);
    return e.getTime();
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  ReadDailyRedDot() {
    var e = this.ARn();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, e, 0, 0, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
  }
  get LeftUpCount() {
    return this.yOe - this.MOe;
  }
  get yOe() {
    return DoubleRewardActivityById_1.configDoubleRewardActivityById.GetConfig(this.Id).Count;
  }
  get SubType() {
    return DoubleRewardActivityById_1.configDoubleRewardActivityById.GetConfig(this.Id).Type;
  }
  get Prefab() {
    return DoubleRewardActivityById_1.configDoubleRewardActivityById.GetConfig(this.Id).Prefab;
  }
  get AdventureGuideUpList() {
    if (!this.EOe) {
      switch (this.SubType) {
        case 1:
          this.EOe = [19];
          break;
        case 2:
          this.EOe = [4, 19];
          break;
        case 3:
          this.EOe = [22];
          break;
        default:
          this.EOe = [19];
      }
    }
    return this.EOe;
  }
  GetDungeonUpList(e) {
    switch (this.SubType) {
      case 1:
        return [1];
      case 2:
        return [1, 2];
      case 3:
        if (e) {
          return [];
        } else {
          return [3];
        }
    }
    return [];
  }
  GetNumTxtAndParam() {
    return [this.LeftUpCount > 0 ? "Reward_doubling_time" : "Reward_doubling_end", this.LeftUpCount, this.yOe];
  }
  GetFullTipNumTxtAndParam() {
    return [this.LeftUpCount > 0 ? "Reward_doubling_tips" : "Reward_doubling_end_tips", this.LeftUpCount, this.yOe];
  }
  GetFullTip() {
    var e = this.GetFullTipNumTxtAndParam();
    return StringUtils_1.StringUtils.FormatStaticBuilder(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e[0]), e[1], e[2]);
  }
  JumpToDungeon() {
    ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView("NewSoundAreaView", this.AdventureGuideUpList[0]);
  }
}
exports.ActivityDoubleRewardData = ActivityDoubleRewardData;
//# sourceMappingURL=ActivityDoubleRewardData.js.map