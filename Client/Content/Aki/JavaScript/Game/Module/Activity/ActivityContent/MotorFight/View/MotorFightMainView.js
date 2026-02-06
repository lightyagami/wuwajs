"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightMainView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const MotorFightLevelListPanel_1 = require("./Item/MotorFightLevelListPanel");
class MotorFightMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dcg = undefined;
    this.ScrollView = undefined;
    this.lqe = undefined;
    this.iPu = undefined;
    this.Tcg = undefined;
    this.bcg = undefined;
    this.s6e = undefined;
    this.hMg = () => new MotorFightLevelListPanel_1.MotorFightLevelListPanel();
    this.AMo = () => {
      this.CloseMe();
    };
    this.QEu = () => {
      UiManager_1.UiManager.OpenView("MotorFightHandBookView", this.dcg);
    };
    this.Rcg = () => {
      UiManager_1.UiManager.OpenView("MotorFightTalentTreeView", this.dcg);
    };
    this.Lcg = () => {
      UiManager_1.UiManager.OpenView("MotorFightRankView", this.dcg);
    };
    this.g6e = () => {
      UiManager_1.UiManager.OpenView("MotorFightRewardView", this.dcg);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIItem], [5, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.IsNeedShowMotorFightMainView = false;
    await ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestLastSavedLevelData();
    this.dcg = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.AMo);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.hMg, undefined, true);
    var t = this.dcg.GetLevelTreeList();
    await this.ScrollView.RefreshByDataAsync(t, true);
    let i = t.findIndex(t => {
      for (const i of t) {
        if (!i.IsFinished) {
          return true;
        }
      }
      return false;
    });
    i = i === -1 ? t.length - 1 : i;
    this.ScrollView.LateScrollTo(this.ScrollView.GetItemByIndex(i), () => {
      var t = this.ScrollView?.GetScrollItemByIndex(i);
      if (t &&= t.GetLevelNavigationItem()) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(t, true);
      }
    });
    this.iPu = new ButtonItem_1.ButtonItem(this.GetItem(3));
    this.iPu.SetFunction(this.QEu);
    this.Tcg = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.Tcg.SetFunction(this.Rcg);
    this.bcg = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.bcg.SetFunction(this.Lcg);
    this.s6e = new ButtonItem_1.ButtonItem(this.GetItem(5));
    this.s6e.SetFunction(this.g6e);
  }
  OnBeforeShow() {
    var t = this.dcg.GetLevelTreeList();
    this.ScrollView?.RefreshByData(t);
    this.iPu?.SetRedDotVisible(this.dcg.IsHandBookHasRedDot());
    this.Tcg?.SetRedDotVisible(this.dcg.IsTalentTreeHasRedDot());
    this.s6e?.SetRedDotVisible(this.dcg.IsTaskHasRedDot());
    this.s6e?.SetLocalTextNew("PrefabTextItem_391372407_Text", this.dcg.GetFinishedTaskNum(), this.dcg.GetTotalTaskNum());
    this.bcg?.SetUiActive(this.dcg.IsEndlessLevelUnlock());
    this.bcg?.SetRedDotVisible(false);
    this.GetButton(7)?.RootUIComp.SetUIActive(this.dcg.HasLastSavedLevelData());
    this.GetItem(8)?.SetUIActive(!this.dcg.HasLastSavedLevelData());
    this.GetItem(9)?.SetUIActive(this.dcg.HasLastSavedLevelData());
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t[0] === "sword_first" && (t = this.ScrollView?.GetGenericLayout()?.GetLayoutItemByIndex(0)?.GuideGetLevelItem(0))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.MotorFightMainView = MotorFightMainView;
//# sourceMappingURL=MotorFightMainView.js.map