"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueViewBase = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const SurvivorsRogueResidentWaveTipsPanel_1 = require("../../../../GameMainView/SurvivorsRogue/ChildPanel/SurvivorsRogueResidentWaveTipsPanel");
const SurvivorsRogueRoleStatePanel_1 = require("../../../../GameMainView/SurvivorsRogue/ChildPanel/SurvivorsRogueRoleStatePanel");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SurvivorsRogueCurrencyItem_1 = require("./SurvivorsRogueCurrencyItem");
class SurvivorsRogueViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.Jwd = undefined;
    this.RoleStatePanel = undefined;
    this.fqt = undefined;
    this.JGn = () => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenRogueHelp();
    };
    this.B6e = () => {
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenLeaveInstanceView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[1, this.B6e]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.CaptionItem.SetHelpCallBack(this.JGn);
    this.Jwd = new SurvivorsRogueResidentWaveTipsPanel_1.SurvivorsRogueResidentWaveTipsPanel();
    e.push(this.Jwd.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.RoleStatePanel = new SurvivorsRogueRoleStatePanel_1.SurvivorsRogueRoleStatePanel();
    e.push(this.RoleStatePanel.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
    this.fqt = new SurvivorsRogueCurrencyItem_1.SurvivorsRogueCurrencyItem();
    var e = this.CaptionItem.GetCostContent();
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueCurrencyItemId();
    await this.fqt.Init(e);
    this.fqt.ShowWithoutText(i);
    this.CaptionItem.SetHelpBtnActive(true);
  }
  SetMainTitle(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e, ...i);
  }
  SetMainTitleVisible(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
}
exports.SurvivorsRogueViewBase = SurvivorsRogueViewBase;
//# sourceMappingURL=SurvivorsRogueViewBase.js.map