"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardWareHouseView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const FishingDefine_1 = require("../../FishingDefine");
const FishingCurrencyItem_1 = require("../../FishingDock/FishingCurrencyItem");
const DockyardBackpackPanel_1 = require("../Bag/DockyardBackpackPanel");
const DockyardItemListPanel_1 = require("../List/DockyardItemListPanel");
const DockyardQteSkipPanel_1 = require("../Qte/DockyardQteSkipPanel");
const DockyardQuestInfoPanel_1 = require("../Tips/DockyardQuestInfoPanel");
const DockyardTipsPanel_1 = require("../Tips/DockyardTipsPanel");
class DockyardWareHouseView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.HXl = undefined;
    this.jYl = undefined;
    this.WXl = undefined;
    this.ii_ = undefined;
    this.S9_ = undefined;
    this.HLn = undefined;
    this.vQ_ = 1;
    this.oec = false;
    this.nec = 0;
  }
  OnRegisterComponent() {
    this.QXl();
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  QXl() {
    this.HLn = this.OpenParam;
    this.HLn.RegisterView(this);
  }
  async $D_() {
    await new FishingCurrencyItem_1.FishingCurrencyItem().CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem", this.lqe.GetCostContent());
  }
  async zDn() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.HLn.CloseClick);
    this.lqe.SetTitleByTextIdAndArgNew(this.HLn.ViewTitle);
    await this.$D_();
    await this.lqe.SetCurrencyItemList([FishingDefine_1.FISHING_CURRENCY_ITEMID]);
    for (const i of this.lqe.GetCurrencyItemList()) {
      i.SetTextureClickCheckFunction(this.HLn.CheckCurrencyItemClick);
    }
  }
  async $Xl() {
    this.HXl = new DockyardBackpackPanel_1.DockyardBackpackPanel(this.HLn.BackpackPanelModel);
    await this.HXl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  async OYl() {
    this.jYl = new DockyardItemListPanel_1.DockyardItemListPanel();
    await this.jYl.CreateByActorAsync(this.GetItem(2).GetOwner(), this.HLn.ListPanelModel);
    this.AddChild(this.jYl);
  }
  async XXl() {
    this.WXl = new DockyardTipsPanel_1.DockyardTipsPanel();
    await this.WXl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  MQ_() {
    return this.ii_ ?? this.S9_;
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.zDn(), this.$Xl(), this.OYl(), this.XXl(), this.HLn.BeforeStartAsync()]);
    this.HLn.BackpackPanelModel.IsInSelectState = false;
  }
  OnBeforeShow() {
    this.S9_?.Refresh();
  }
  OnTick(i) {
    var t;
    if (this.oec) {
      if (this.vQ_ === 0) {
        t = this.HLn.GetItemBlockData(this.nec);
        this.WXl.Refresh(t);
        this.WXl.SetPanelVisible(true);
        this.MQ_().SetPanelVisible(false);
      } else if (this.vQ_ === 1) {
        this.WXl.SetPanelVisible(false);
        this.MQ_().SetPanelVisible(true);
      }
      this.oec = false;
      this.nec = 0;
    }
  }
  ShowTipsPanel(i) {
    this.oec = true;
    this.vQ_ = 0;
    this.nec = i;
  }
  HideTipsPanel() {
    this.oec = true;
    this.vQ_ = 1;
  }
  GetPanelParentItem() {
    return this.GetItem(4);
  }
  NotifyQuicklySellActive(i) {
    var t = this.MQ_();
    var e = this.vQ_ === 0 ? this.WXl : t;
    if (i) {
      e.SetPanelVisible(false);
      t.LockState = true;
      this.WXl.LockState = true;
    } else {
      t.LockState = false;
      this.WXl.LockState = false;
      e.SetPanelVisible(true);
    }
  }
  async CreateQteSkipPanel() {
    this.ii_ = new DockyardQteSkipPanel_1.DockyardQteSkipPanel();
    await this.ii_.CreateThenShowByResourceIdAsync("PnlNavigationFishNum", this.GetItem(5));
    var i = ModelManager_1.ModelManager.FishingQteModel.GameInfo;
    var [i, t] = [i.CurrentRound, i.MaxRound];
    this.ii_.SetQtePanelText(i, t);
    this.ii_.ContinueFunc = () => {
      this.CloseMe();
    };
    this.ii_.ExitFunc = () => {
      ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(i => {
        if (i) {
          this.CloseMe();
        }
      });
    };
  }
  async CreateQuestPanel(i) {
    this.S9_ = new DockyardQuestInfoPanel_1.DockyardQuestInfoPanel();
    await this.S9_.CreateByResourceIdAsync("PnlNavigationEntrustInfo", this.GetItem(5));
    this.S9_.ExitFunc = () => {
      ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(i => {
        if (i) {
          this.CloseMe();
        }
      });
    };
    this.S9_.SetButtonExitVisible(i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    return this.jYl.GetGuideUiItemAndUiItemForShowEx(i);
  }
}
exports.DockyardWareHouseView = DockyardWareHouseView;
//# sourceMappingURL=DockyardWareHouseView.js.map