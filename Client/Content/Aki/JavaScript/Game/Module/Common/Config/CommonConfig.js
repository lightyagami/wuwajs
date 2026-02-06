"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConfig = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ElementInfoById_1 = require("../../../../Core/Define/ConfigQuery/ElementInfoById");
const LongPressConfigById_1 = require("../../../../Core/Define/ConfigQuery/LongPressConfigById");
const QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll");
const QualityInfoById_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class CommonConfig extends ConfigBase_1.ConfigBase {
  GetSelectablePropItemTickMaxTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("additem_accumulate_initialtime");
  }
  GetSelectablePropItemTickMinTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("additem_accumulate_mintime");
  }
  GetSelectablePropItemTickIntervalTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("additem_accumulate_deltaspeed");
  }
  GetAutoAttachVelocityTime() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("AutoAttachVelocityTime");
  }
  GetAutoAttachInertiaTime() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("AutoAttachInertiaTime");
  }
  GetNetGoodSprite() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetGood");
  }
  GetNetMiddleSprite() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetMiddle");
  }
  GetNetBadSprite() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetBad");
  }
  GetNetGoodSpriteMobile() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetGoodMobile");
  }
  GetNetMiddleSpriteMobile() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetMiddleMobile");
  }
  GetNetBadSpriteMobile() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetBadMobile");
  }
  GetItemQualityList() {
    var e = ConfigCommon_1.ConfigCommon.ToList(QualityInfoAll_1.configQualityInfoAll.GetConfigList());
    e.sort((e, o) => e.Id - o.Id);
    return e;
  }
  GetItemQualityById(e) {
    return QualityInfoById_1.configQualityInfoById.GetConfig(e);
  }
  GetElementConfig(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e);
  }
  GetLongPressConfig(e) {
    return LongPressConfigById_1.configLongPressConfigById.GetConfig(e);
  }
  GetDebugGmViewPath(e) {
    if (e === "GmView") {
      if (Info_1.Info.IsInTouch()) {
        return CommonParamById_1.configCommonParamById.GetStringConfig("GmViewPath");
      } else {
        return CommonParamById_1.configCommonParamById.GetStringConfig("GmPcViewPath");
      }
    } else if (e === "LoginDebugView") {
      if (Info_1.Info.IsInTouch()) {
        return CommonParamById_1.configCommonParamById.GetStringConfig("GmLoginViewPath");
      } else {
        return CommonParamById_1.configCommonParamById.GetStringConfig("GmPcLoginViewPath");
      }
    } else {
      return undefined;
    }
  }
  GetNewMailGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("NewMailGap");
  }
  GetPingUnChangeValue() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PingUnChangeValue");
  }
  GetBetaBlockRecharge() {
    return CommonParamById_1.configCommonParamById.GetBoolConfig("BlockPay");
  }
  GetPioneerFlag() {
    return CommonParamById_1.configCommonParamById.GetBoolConfig("PioneerFlag");
  }
  GetShareGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("ShareGap");
  }
  GetIosReviewShieldMenuArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("BlockOnIosCheckServer");
  }
  GetKoShopRuleUrl() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("KoShopRuleUrl");
  }
  GetReviewCd() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("ReviewCd");
  }
  OpenReviewDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("OpenReviewDelay");
  }
  GetPlayPointTrackRange() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("PlayPointTrackExtraRadius") ?? 0;
  }
  GetDiceItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoMonopolyDiceItemId") ?? 0;
  }
  GetDangoMonopolyRangeSpeed() {
    return CommonParamById_1.configCommonParamById.GetFloatArrayConfig("DangoMonopolySpeed") ?? [1, 2];
  }
  GetAutoOpenNoticePatchSize() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("AutoOpenNotifyPatchSize") ?? 0;
  }
  GetGameIntroductionUrl() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("GameIntroductionUrl") ?? "";
  }
  GetGameIntroductionGlobalUrl() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("GameIntroductionGlobalUrl") ?? "";
  }
  GetGuideMainlandLinkUrl() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("GuideMainlandLink") ?? "";
  }
  GetGuideOverseaLinkUrl() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("GuideOverseaLink") ?? "";
  }
  GetPhantomArenaBattleSpeed() {
    return CommonParamById_1.configCommonParamById.GetFloatArrayConfig("PhantomArenaBattleSpeed") ?? [1, 1.5, 2];
  }
  GetGiftMaxNineNineNine() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("GiftMaxNineNineNine") ?? 0;
  }
  GetPioneerPkgIdList() {
    return CommonParamById_1.configCommonParamById.GetStringArrayConfig("PioneerPkgIdList") ?? [];
  }
}
exports.CommonConfig = CommonConfig;
//# sourceMappingURL=CommonConfig.js.map