"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ButtonAndCostItem_1 = require("../../Common/Button/ButtonAndCostItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TrapDefenseBdBuffSelectBdItem_1 = require("./TrapDefenseBdBuffSelectBdItem");
const TrapDefenseBdSumBuffDescPanel_1 = require("./TrapDefenseBdSumBuffDescPanel");
const TrapDefenseBtnTagTips_1 = require("./TrapDefenseBtnTagTips");
const TrapDefenseGoldCostItem_1 = require("./TrapDefenseGoldCostItem");
class TrapDefenseBdBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PopupCaption = undefined;
    this.LayoutBd = undefined;
    this.BdBuffPanelList = [];
    this.BtnAndCostItem = undefined;
    this.BtnItem = undefined;
    this.BtnTagTips = undefined;
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModeBdBuffSelect;
    this.RefreshBuffCostId = undefined;
    this.RefreshBuffCostNum = undefined;
    this.RefreshBuffMaxTimes = undefined;
    this.GoldCostItem = undefined;
    this.OnClickBtnBdSum = () => {
      this.ViewModel.Model.OpenViewBdSum(true, 0);
    };
    this.CreateItemBd = () => {
      var t = new TrapDefenseBdBuffSelectBdItem_1.TrapDefenseBdBuffSelectBdItem();
      t.ClickCallBack = this.OnClickBdItem;
      return t;
    };
    this.OnClickBdItem = t => {
      this.ViewModel.Model.OpenViewBdSum(true, 0, t.Id);
    };
    this.OnCanSelectBdBuff = () => true;
    this.OnSelectBdBuff = t => {
      this.ViewModel.SetSelectBuff(t);
      this.UpdateCost();
      this.UpdateBuffPanelSelectState();
      this.CheckBdActiveNewQuality();
      this.UpdateSureBtnEnable();
      this.LayoutBd.RefreshWithoutDataSync();
    };
    this.OnBtnClose = () => {
      if (this.ViewModel.BdBuffDataList.length <= 0) {
        this.CloseMe();
      }
    };
    this.OnBtnHelp = () => {
      var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdBdBuffSelect();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
    };
    this.OnClickBtnSure = () => {
      if (this.ViewModel.BdBuffDataList.length <= 0) {
        this.CloseMe();
      } else {
        this.SureBuffSelect();
      }
    };
    this.OnClickRefreshBuff = () => {
      this.ViewModel.RequestUpdateBdBuffList().then(t => {
        if (t) {
          this.UpdateCostNum();
          this.UpdateData();
          this.PlaySequence("Start");
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILayoutBase], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[2, this.OnClickBtnBdSum]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.RefreshBuffCostId = this.ViewModel.GetRefreshBuffCostId();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(this.OnBtnHelp);
    await this.InitGoldCostItem();
    var t = this.GetLayoutBase(1);
    this.LayoutBd = new GenericLayout_1.GenericLayout(t, this.CreateItemBd);
    await Promise.all([this.CreateBdBuffPanel(3), this.CreateBdBuffPanel(4), this.CreateBdBuffPanel(5)]);
    var t = this.GetItem(6);
    this.BtnAndCostItem = new ButtonAndCostItem_1.ButtonAndCostItem();
    await this.BtnAndCostItem.Init(t);
    this.BtnAndCostItem.SetFunction(this.OnClickRefreshBuff);
    var t = this.GetItem(7);
    this.BtnItem = new ButtonItem_1.ButtonItem(t);
    this.BtnItem.SetFunction(this.OnClickBtnSure);
    var t = this.GetItem(8);
    this.BtnTagTips = new TrapDefenseBtnTagTips_1.TrapDefenseBtnTagTips();
    await this.BtnTagTips.Init(t);
  }
  async InitGoldCostItem() {
    this.GoldCostItem = new TrapDefenseGoldCostItem_1.TrapDefenseGoldCostItem();
    await this.GoldCostItem.Init(this.PopupCaption.GetCostContent());
    this.GoldCostItem.ShowWithoutText(this.RefreshBuffCostId);
  }
  async CreateBdBuffPanel(t) {
    var t = this.GetItem(t);
    var e = new TrapDefenseBdSumBuffDescPanel_1.TrapDefenseBdSumBuffDescPanel();
    this.BdBuffPanelList.push(e);
    await e.Init(t);
    e.OnCanClickCallback = this.OnCanSelectBdBuff;
    e.OnSelectCallback = this.OnSelectBdBuff;
  }
  OnStart() {
    this.BtnItem.SetActive(true);
    this.BtnAndCostItem.SetActive(true);
    var t = this.ViewModel.GetRefreshBuffCostIconPath(this.RefreshBuffCostId);
    this.BtnAndCostItem.UpdateCostIcon(t);
    this.UpdateCostNum();
  }
  UpdateCostNum() {
    this.RefreshBuffCostNum = this.ViewModel.RefreshBuffCostNum;
    this.BtnAndCostItem.UpdateCostNum(this.RefreshBuffCostNum);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {}
  OnAfterDestroy() {
    this.ViewModel.OnViewClose();
  }
  UpdateData() {
    this.LayoutBd.RefreshByData(this.ViewModel.GetShowBdDataList(), undefined, true);
    const i = this.ViewModel.BdBuffDataList;
    const s = this.ViewModel.CurSelectBdBuffData;
    this.BdBuffPanelList.forEach((t, e) => {
      e = i[e];
      t.SetActive(!!e);
      if (e) {
        t.UpdateDataSelectMode(e);
        t.SetSelect(e === s);
      }
    });
    this.UpdateCost();
    this.CheckBdActiveNewQuality();
    this.UpdateSureBtnEnable();
  }
  UpdateCost() {
    this.RefreshBuffMaxTimes = this.ViewModel.MaxRefreshCount;
    var t = this.ViewModel.RemainRefreshCount;
    this.BtnAndCostItem.SetLocalTextNew("TrapDefense_BdBuffSelect_RefreshDesc", t, this.RefreshBuffMaxTimes);
    this.BtnAndCostItem.UpdateCostColor(!this.ViewModel.RefreshBuffIsEnoughCost());
    this.BtnAndCostItem.SetEnableClick(t > 0);
    this.BtnAndCostItem.SetActive(this.RefreshBuffMaxTimes > 0);
  }
  CheckBdActiveNewQuality() {
    this.BtnTagTips.SetActive(false);
  }
  UpdateSureBtnEnable() {
    var t = !!this.ViewModel.CurSelectBdBuffData || this.ViewModel.BdBuffDataList.length <= 0;
    this.BtnItem?.SetEnableClick(t);
  }
  UpdateBuffPanelSelectState() {
    const e = this.ViewModel.CurSelectBdBuffData;
    this.BdBuffPanelList.forEach(t => {
      t.SetSelect(e === t.BdBuffData);
    });
  }
  async SureBuffSelect() {
    if (await this.ViewModel.RequestSureBuffSelect()) {
      await this.CheckPlayUpStageEffect();
      this.CloseMe();
      if (this.ViewModel.CurSelectBdBuffData?.IsStrengthenFinish()) {
        this.ViewModel.Model.OpenViewBdBuffStrengthen(this.ViewModel.CurSelectBdBuffData.Id, false);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseBdBuffSelectAfterTips");
      }
    }
  }
  async CheckPlayUpStageEffect() {
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
    const e = [];
    this.LayoutBd.GetLayoutItemList().forEach(t => {
      e.push(t.CheckPlayUpStageEffect());
    });
    await Promise.all(e);
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length <= 0) && t[0] === "BdList" && !(t.length < 2) && (t = parseInt(t[1]), !isNaN(t) && !(t < 0) && !(t >= this.LayoutBd.GetDatas().length)) && (t = this.LayoutBd.GetItemByIndex(t))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.TrapDefenseBdBuffSelectView = TrapDefenseBdBuffSelectView;
//# sourceMappingURL=TrapDefenseBdBuffSelectView.js.map