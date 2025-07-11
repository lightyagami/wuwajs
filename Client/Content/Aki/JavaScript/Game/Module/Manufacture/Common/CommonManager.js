"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardPopViewData = exports.CommonManager = undefined;
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
const CookController_1 = require("../../Cook/CookController");
const ComposeController_1 = require("../Compose/ComposeController");
const ForgingController_1 = require("../Forging/ForgingController");
class CommonManager {
  static SetCurrentSystem(e) {
    CommonManager.PIi = e;
  }
  static GetCurrentSystem() {
    return CommonManager.PIi;
  }
  static CheckIsBuff(e, o) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.CheckIsBuff(e, o);
      case 2:
        return ForgingController_1.ForgingController.CheckIsBuff(e, o);
      default:
        return false;
    }
  }
  static GetInfoText(e) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetComposeInfoText(e);
      case 2:
        return ForgingController_1.ForgingController.GetForgingInfoText(e);
      default:
        return "";
    }
  }
  static GetDefaultRoleText() {
    switch (CommonManager.PIi) {
      case 1:
        return "DefaultComposeHelperText";
      case 2:
        return "DefaultForgingHelperText";
      default:
        return "DefaultHelperText";
    }
  }
  static GetCommonItemList() {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetComposeItemList();
      case 2:
        return ForgingController_1.ForgingController.GetForgingItemList();
    }
  }
  static GetCurrentFixId() {
    return CookController_1.CookController.GetCurrentFixId();
  }
  static CheckCanFix() {
    return CookController_1.CookController.CheckCanFix();
  }
  static SendFixToolRequest() {
    CookController_1.CookController.SendFixToolRequest(CookController_1.CookController.GetCurrentFixId(), CookController_1.CookController.GetCurrentEntityId());
  }
  static GetSelectedLevel() {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetSelectedComposeLevel();
    }
  }
  static SetSelectedLevel(e) {
    if (CommonManager.PIi === 1) {
      ComposeController_1.ComposeController.SetSelectedComposeLevel(e);
    }
  }
  static GetCurrentRewardLevel() {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetRewardLevelInfo().ComposeLevel;
    }
  }
  static GetCurrentRewardTotalProficiency() {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetRewardLevelInfo().TotalProficiency;
    }
  }
  static GetCurrentRewardAddExp() {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetRewardLevelInfo().AddExp;
    }
  }
  static GetComposeLevelByLevel(e) {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetComposeLevelByLevel(e);
    }
  }
  static GetLevelUpgradeTypeTexture(e) {
    if (CommonManager.PIi === 1) {
      return "T_ComposeTypeLevel" + e;
    }
  }
  static GetSumExpByLevel(e) {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetSumExpByLevel(e);
    }
  }
  static GetDropIdByLevel(e) {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetDropIdByLevel(e);
    }
  }
  static GetComposeMaxLevel() {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.GetComposeMaxLevel();
    }
  }
  static SendLevelRewardRequest() {
    if (CommonManager.PIi === 1) {
      ComposeController_1.ComposeController.SendSynthesisLevelRewardRequest();
    }
  }
  static CheckIsBuffEx(e, o) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.CheckIsBuffEx(e, o);
      case 2:
        return ForgingController_1.ForgingController.CheckIsBuffEx(e, o);
      default:
        return false;
    }
  }
  static GetCommonManufactureText(e) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetComposeText(e);
      case 2:
        return ForgingController_1.ForgingController.GetForgingText(e);
    }
  }
  static GetCommonManufactureId(e) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetComposeId(e);
      case 2:
        return ForgingController_1.ForgingController.GetForgingId(e);
    }
  }
  static CheckShowRoleView() {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.CheckShowRoleView();
      case 2:
        return ForgingController_1.ForgingController.CheckShowRoleView();
    }
  }
  static GetMaxCreateCount(e) {
    return (CommonManager.PIi !== 1 ? ForgingController_1.ForgingController : ComposeController_1.ComposeController).GetMaxCreateCount(e);
  }
  static CheckCanManufacture(e) {
    if (CommonManager.PIi === 2) {
      return ForgingController_1.ForgingController.CheckCanForging(e);
    }
  }
  static SendManufacture(e, o) {
    switch (CommonManager.PIi) {
      case 1:
        ComposeController_1.ComposeController.SendManufacture(e, o);
        break;
      case 2:
        ForgingController_1.ForgingController.SendManufacture(e, o);
    }
  }
  static GetCurrentRoleId() {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetCurrentRoleId();
      case 2:
        return ForgingController_1.ForgingController.GetCurrentRoleId();
    }
  }
  static SetCurrentRoleId(e) {
    switch (CommonManager.PIi) {
      case 1:
        ComposeController_1.ComposeController.SetCurrentRoleId(e);
        break;
      case 2:
        ForgingController_1.ForgingController.SetCurrentRoleId(e);
    }
  }
  static GetManufactureRoleId(e) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetComposeRoleId(e);
      case 2:
        return ForgingController_1.ForgingController.GetForgingRoleId(e);
    }
  }
  static GetManufactureMaterialList(e) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetManufactureMaterialList(e);
      case 2:
        return ForgingController_1.ForgingController.GetForgingMaterialList(e);
    }
  }
  static GetHelpRoleItemDataList(e) {
    switch (CommonManager.PIi) {
      case 1:
        return ComposeController_1.ComposeController.GetHelpRoleItemDataList(e);
      case 2:
        return ForgingController_1.ForgingController.GetHelpRoleItemDataList(e);
    }
  }
  static CheckCanShowExpItem() {
    if (CommonManager.PIi === 1) {
      return ComposeController_1.ComposeController.CheckCanShowExpItem();
    }
  }
  static CheckShowAmountItem() {
    switch (CommonManager.PIi) {
      case 1:
        return true;
      case 2:
        return false;
    }
  }
}
exports.CommonManager = CommonManager;
class RewardPopViewData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments);
    this.RewardPopType = undefined;
  }
}
exports.RewardPopViewData = RewardPopViewData;
//# sourceMappingURL=CommonManager.js.map