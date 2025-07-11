"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
class TopPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.n6t = undefined;
    this.CloseCallback = undefined;
    this.jso = () => {
      this.CloseCallback?.();
    };
    this.Blo = e => {
      ModelManager_1.ModelManager.RoguelikeModel.UpdateDescModel(e === 1);
    };
    this.blo = () => {
      RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIExtendToggle], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText]];
    this.BtnBindInfo = [[1, this.jso], [2, this.Blo], [4, this.blo]];
  }
  OnStart() {
    this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.n6t.SetCloseBtnActive(false);
    this.n6t.SetHelpBtnActive(false);
  }
  OnBeforeShow() {
    this.RefreshTabBtn();
  }
  RefreshTabBtn() {
    var e = ModelManager_1.ModelManager.RoguelikeModel.GetDescModel() === 0 ? 1 : 0;
    this.GetExtendToggle(2)?.SetToggleState(e, true);
  }
  OnBeforeDestroy() {
    this.CloseCallback = undefined;
  }
  RefreshTitle(e) {
    this.n6t.SetTitleByTextIdAndArgNew(e);
  }
  async RefreshCurrency(e) {
    return this.n6t.SetCurrencyItemList(e);
  }
  RefreshSelectTipsText(e, t = false, ...i) {
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e, ...i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e, ...i);
    }
  }
  EmptySelectTipsText() {
    this.GetText(5).SetText("");
  }
  GetCostItemByIndex(e) {
    var t = this.n6t?.GetCurrencyItemList();
    if (t && t.length > e) {
      return t[e].GetRootItem();
    }
  }
}
exports.TopPanel = TopPanel;
//# sourceMappingURL=TopPanel.js.map