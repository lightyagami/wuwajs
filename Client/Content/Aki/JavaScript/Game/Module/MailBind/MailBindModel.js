"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailBindModel = undefined;
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
class MailBindModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nil = false;
    this.sil = false;
    this.tEt = -0;
  }
  UpdateByProtoMailBindInfo(e) {
    this.nil = e.$b_;
    this.sil = e.Wb_;
    this.tEt = MathUtils_1.MathUtils.LongToNumber(e.Qb_) / 1000;
  }
  GetIsBind() {
    return this.nil;
  }
  GetIsReward() {
    return this.sil;
  }
  GetCloseTime() {
    return this.tEt;
  }
  GetState() {
    if (this.sil) {
      return 2;
    } else if (this.nil) {
      return 1;
    } else {
      return 0;
    }
  }
  GetRemainTimeText(e) {
    var t;
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    var e = Math.max(e - i, 1);
    var i = this.GetTimeTypeData(e);
    if (i[0] === 0) {
      return ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour");
    } else {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
      e = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1]).CountDownText ?? "";
      return StringUtils_1.StringUtils.Format(t, e);
    }
  }
  GetTimeTypeData(e) {
    if (e > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (e > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 2];
    } else {
      return [0, 0];
    }
  }
  CheckMailBindRedDot() {
    var e;
    return !this.GetIsReward() && (!!this.GetIsBind() || !(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MailBindNextShowRedDotTime)) || e <= TimeUtil_1.TimeUtil.GetServerTimeStamp());
  }
  CheckGlobalMailBindOpen() {
    return !!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() && !FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() && (!this.GetIsReward() || !(TimeUtil_1.TimeUtil.GetServerTime() > this.GetCloseTime()));
  }
}
exports.MailBindModel = MailBindModel;
//# sourceMappingURL=MailBindModel.js.map