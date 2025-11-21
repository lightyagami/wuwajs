"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTechDetailPanel = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FloroRanchController_1 = require("../../FloroRanchController");
class FloroRanchTechDetailPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.zFu = undefined;
    this.UnlockSuccessCallback = e => {};
    this.YUu = () => {
      if (ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetTechnologyCoinNum() < this.Data.Cost) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_200003_Text");
      } else {
        FloroRanchController_1.FloroRanchController.RequestUnlockTechPoint(this.Data.Id, e => {
          this.Refresh(this.Data);
          this.UnlockSuccessCallback?.(this.Data.Des);
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [2, UE.UIText], [4, UE.UIItem], [3, UE.UIText], [1, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UISprite]];
  }
  OnStart() {
    var e = {
      UiText: this.GetText(2),
      ViewType: 1,
      AttachDirection: 1,
      AttachItem: this.GetRootItem(),
      Style: 2,
      ReportType: 8
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
    this.zFu = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.zFu.SetFunction(this.YUu);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(2));
  }
  Refresh(e) {
    this.Data = e;
    this.SetSpriteByPath(e.Icon, this.GetSprite(1), false);
    var t = this.GetSprite(1);
    t.SetChangeColor(!e.IsUnLock, t.changeColor);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Des);
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var r = t.GetTechnologyCoinNum();
    var i = this.GetText(3);
    i.SetText(e.Cost.toString());
    i.SetChangeColor(r < e.Cost, i.changeColor);
    this.GetItem(7).SetUIActive(!e.IsUnLock);
    var i = t.IsPreNodeAllUnlock(e);
    this.zFu?.SetUiActive(!e.IsUnLock && i);
    this.zFu?.SetRedDotVisible(r >= e.Cost && !e.IsUnLock && i);
    this.GetItem(6).SetUIActive(!i);
    this.GetItem(5).SetUIActive(e.IsUnLock);
    this.GetSprite(8)?.SetUIActive(e.IsUnLock);
    this.GetSprite(9)?.SetUIActive(!e.IsUnLock);
  }
}
exports.FloroRanchTechDetailPanel = FloroRanchTechDetailPanel;
//# sourceMappingURL=FloroRanchTechDetailPanel.js.map