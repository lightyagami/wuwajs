"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessHelperView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../../Ui/Common/PopupCaptionItem");
const ScrollingTipsController_1 = require("../../../../../../ScrollingTips/ScrollingTipsController");
const ActivityMoonChasingController_1 = require("../../../Activity/ActivityMoonChasingController");
const BusinessHelperPanel_1 = require("./BusinessHelperPanel");
const BusinessHelperViewController_1 = require("./BusinessHelperViewController");
const BusinessInteractivePanel_1 = require("./BusinessInteractivePanel");
class BusinessHelperView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.HelperPanel = undefined;
    this.InteractivePanel = undefined;
    this.aOn = new BusinessHelperViewController_1.BusinessHelperViewController();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [3, UE.UIItem], [4, UE.SpineSkeletonAnimationComponent], [5, UE.UIItem], [2, UE.UIItem]];
  }
  async D1a() {
    this.HelperPanel = new BusinessHelperPanel_1.BusinessHelperPanel();
    this.HelperPanel.RegisterViewController(this.aOn);
    await this.HelperPanel.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  async A1a() {
    this.InteractivePanel = new BusinessInteractivePanel_1.BusinessInteractivePanel();
    this.InteractivePanel.RegisterViewController(this.aOn);
    await this.InteractivePanel.CreateByActorAsync(this.GetItem(2).GetOwner());
  }
  async U3e() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(this.aOn.BackToLastState);
    this.CaptionItem.SetHelpCallBack(this.aOn.OpenHelpView);
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    await Promise.all([this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon8"), this.CaptionItem.SetCurrencyItemList([e])]);
  }
  async OnBeforeStartAsync() {
    this.aOn.RegisterView(this);
    await Promise.all([this.U3e(), this.D1a(), this.A1a()]);
  }
  OnBeforeShow() {
    this.aOn.Show();
    ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenTipsShopView, this.aOn.RefreshInteractivePanel);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenTipsShopView, this.aOn.RefreshInteractivePanel);
  }
  async RefreshSpine(e) {
    var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(e);
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(e);
    await this.SetSpineAssetByPath(e.SpineAtlas, e.SpineSkeletonData, this.GetSpine(4));
    this.GetSpine(4).SetAnimation(0, "idle", true);
    this.GetItem(5).SetUIActive(!i.IsOwn);
    var e = this.GetItem(3);
    e.SetChangeColor(!i.IsOwn, e.changeColor);
  }
  SkipToHelpPanel() {
    this.HelperPanel?.SetActive(true);
    this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon8");
    this.PlaySequenceAsync("SwitchOut", true).finally(() => {
      this.InteractivePanel?.SetActive(false);
    });
  }
  SkipToInteractivePanel() {
    this.InteractivePanel?.SetActive(true);
    this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon1");
    this.PlaySequenceAsync("SwitchIn", true).finally(() => {
      this.HelperPanel?.SetActive(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoonChasingOnOpenInteractive);
    });
  }
  RefreshInteractivePanel() {
    this.InteractivePanel?.Refresh();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 1)) {
      switch (e[0]) {
        case "Helper":
        case "HelperFirst":
          return this.HelperPanel?.GetGuideUiItemAndUiItemForShowEx(e);
        case "Interactive":
          return this.InteractivePanel?.GetGuideUiItemAndUiItemForShowEx(e);
        default:
          return;
      }
    }
  }
  ShowView(e) {
    if (ModelManager_1.ModelManager.MoonChasingModel.CheckRoleFosterTipsRedDotState()) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Moonfiesta_HeartFullTip");
    }
    if (!e) {
      this.HelperPanel?.SetActive(true);
    }
  }
}
exports.BusinessHelperView = BusinessHelperView;
//# sourceMappingURL=BusinessHelperView.js.map