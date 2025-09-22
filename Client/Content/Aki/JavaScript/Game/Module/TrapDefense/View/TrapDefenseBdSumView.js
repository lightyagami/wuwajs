"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const ShipTowerTeamTabItem_1 = require("../../ShipTower/View/ShipTowerTeamTabItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseBdSumBdDescPanel_1 = require("./TrapDefenseBdSumBdDescPanel");
const TrapDefenseBdSumBdItem_1 = require("./TrapDefenseBdSumBdItem");
const TrapDefenseBdSumBuffDescPanel_1 = require("./TrapDefenseBdSumBuffDescPanel");
const TrapDefenseBdSumBuffListItem_1 = require("./TrapDefenseBdSumBuffListItem");
class TrapDefenseBdSumView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PopupCaption = undefined;
    this.TabComponent = undefined;
    this.ScrollBd = undefined;
    this.ScrollBdBuff = undefined;
    this.PanelBdDesc = undefined;
    this.PanelBdBuffDesc = undefined;
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBdSum;
    this.TabDataList = undefined;
    this.OnBtnHelp = () => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdBdSum();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.OnBtnClose = () => {
      this.CloseMe();
    };
    this.CreateTabItem = () => new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
    this.OnClickTabItem = e => {
      switch (this.TabDataList[e].TabType) {
        case 0:
          this.ShowBdProgress();
          break;
        case 1:
          this.ShowBdBuffSum();
      }
    };
    this.CreateItemBdScrollItem = () => {
      var e = new TrapDefenseBdSumBdItem_1.TrapDefenseBdSumBdItem();
      e.ClickCallBack = this.OnClickScrollBdItem;
      return e;
    };
    this.OnClickScrollBdItem = e => {
      this.ViewModel.SetSelectBdData(e);
      this.PanelBdDesc.UpdateData(e);
    };
    this.CreateItemBdBuffScrollItem = () => {
      var e = new TrapDefenseBdSumBuffListItem_1.TrapDefenseBdSumBuffListItem();
      e.OnSelectBdBuffItemCallBack = this.OnSelectScrollBdBuffItem;
      e.OnIsShowBdBuffLockStateCallback = this.OnIsShowBdBuffLockState;
      e.OnIsNewTagStateCallback = this.IsBdBuffNewTagState;
      e.OnGetBdBuffConfig = this.OnGetBdBuffConfig;
      return e;
    };
    this.OnSelectScrollBdBuffItem = (e, t) => {
      this.ViewModel.SetSelectBdBuffData(e);
      this.PanelBdBuffDesc.UpdateDataShowMode(e);
      if (this.ViewModel.IsShowBuffLockState(e)) {
        this.PanelBdBuffDesc.UpdateBuffLockShowState();
      }
      if (this.ViewModel.Model.RougeModeData.CheckBdBuffUnlockRedDotState(e)) {
        t.UpdateBuffInfo();
      }
    };
    this.o8u = (e, t) => {
      t.SetIsShowStrengthen(e);
      this.PanelBdBuffDesc.UpdateDataShowMode(t);
      if (this.ViewModel.IsShowBuffLockState(t)) {
        this.PanelBdBuffDesc.UpdateBuffLockShowState();
      }
    };
    this.OnIsShowBdBuffLockState = e => !this.ViewModel.IsInstance && !e.IsUnlock;
    this.IsBdBuffNewTagState = e => this.ViewModel.Model.RougeModeData.GetBdBuffNewTagState(e);
    this.OnGetBdBuffConfig = e => this.ViewModel.IsInstance ? e.BdBuffConfig : e.GetStrengthenBeforeConfig();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(this.OnBtnHelp);
    this.TabComponent = new TabComponent_1.TabComponent(this.GetItem(3), this.CreateTabItem, this.OnClickTabItem, undefined);
    this.TabDataList = this.ViewModel.GetTabList();
    await this.TabComponent.RefreshTabItemByLengthAsync(this.TabDataList.length);
    var e = this.GetScrollViewWithScrollbar(5);
    var t = this.GetItem(6).GetOwner();
    this.ScrollBd = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.CreateItemBdScrollItem, t, true);
    var e = this.GetScrollViewWithScrollbar(8);
    var t = this.GetItem(9).GetOwner();
    this.ScrollBdBuff = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.CreateItemBdBuffScrollItem, t, true);
    var e = this.GetItem(11);
    this.PanelBdDesc = new TrapDefenseBdSumBdDescPanel_1.TrapDefenseBdSumBdDescPanel();
    await this.PanelBdDesc.Init(e);
    var t = this.GetItem(10);
    this.PanelBdBuffDesc = new TrapDefenseBdSumBuffDescPanel_1.TrapDefenseBdSumBuffDescPanel();
    await this.PanelBdBuffDesc.Init(t);
    this.PanelBdBuffDesc.SwitchStrengthenCallback = this.o8u;
  }
  OnStart() {
    this.InitTab();
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {
    this.ViewModel.OnViewClose();
  }
  OnBeforeHide() {
    this.ViewModel.Model.RougeModeData.SaveCacheUnlockBdBuffs();
  }
  ShowBdProgress() {
    this.SetTabItemContentShow(4);
    this.PanelBdBuffDesc.SetActive(false);
    this.PanelBdDesc.SetActive(true);
    var e = this.ViewModel.GetBdListForProgress();
    const t = this.GetSelectBdProgressIndex(e);
    this.ScrollBd.RefreshByData(e, () => {
      this.ScrollBd.SelectGridProxy(Math.max(t, 0));
    }, true);
    this.SetEmptyInfoVisible(e.length <= 0);
  }
  GetSelectBdProgressIndex(e) {
    var t = this.ScrollBd.GetSelectedIndex();
    if (t < 0) {
      const i = this.ViewModel.JumpBdId;
      if (i) {
        return e.findIndex(e => e.Id === i);
      }
    }
    return t;
  }
  ShowBdBuffSum() {
    this.SetTabItemContentShow(7);
    const e = this.ScrollBdBuff.GetSelectedIndex();
    var t = this.ViewModel.GetBdListForBuffSum();
    this.ScrollBdBuff.RefreshByData(t, () => {
      this.ScrollBdBuff.SelectGridProxy(Math.max(e, 0));
    }, true);
    this.PanelBdDesc.SetActive(false);
    this.PanelBdBuffDesc.SetActive(t.length > 0);
    this.SetEmptyInfoVisible(t.length <= 0);
  }
  SetEmptyInfoVisible(e) {
    this.GetItem(12)?.SetUIActive(e);
  }
  SetTabItemContentShow(e) {
    for (const t of [4, 7]) {
      this.GetItem(t)?.SetUIActive(e === t);
    }
  }
  InitTab() {
    var e;
    var t;
    for ([e, t] of this.TabComponent.GetTabItemMap()) {
      t.UpdateName(this.TabDataList[e].TabNameKey);
      if (this.TabDataList[e].TabType !== 1 || this.ViewModel.IsInstance) {
        t.UpdateRedDotVisible(false);
      } else {
        t.BindRedDot("TrapDefenseBdBuffNewUnlock");
      }
    }
    this.TabComponent.SelectToggleByIndex(this.GetJumpTabIndex(), true);
  }
  GetJumpTabIndex() {
    const t = this.ViewModel.JumpTabType;
    if (t) {
      return this.TabDataList.findIndex(e => e.TabType === t);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseBdSumView = TrapDefenseBdSumView;
//# sourceMappingURL=TrapDefenseBdSumView.js.map