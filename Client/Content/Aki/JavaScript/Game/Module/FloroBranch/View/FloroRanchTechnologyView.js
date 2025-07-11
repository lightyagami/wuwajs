"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTechnologyView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchCurrencyData_1 = require("../Data/FloroRanchCurrencyData");
const FloroRanchCurrencyItem_1 = require("./Item/FloroRanchCurrencyItem");
const FloroRanchTechDetailPanel_1 = require("./Item/FloroRanchTechDetailPanel");
const FloroRanchTechGridPanel_1 = require("./Item/FloroRanchTechGridPanel");
const FloroRanchUnlockSuccessPanel_1 = require("./Item/FloroRanchUnlockSuccessPanel");
class FloroRanchTechnologyView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.yUu = [];
    this.CurSelectNode = undefined;
    this.TechDetailPanel = undefined;
    this.UnlockSuccessPanel = undefined;
    this.TechnologyCoinData = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(4);
    this.U1a = undefined;
    this.ScrollView = undefined;
    this.Aku = e => {
      this.UnlockSuccessPanel?.RefreshPanel(e);
      this.ScrollView?.RefreshByData(this.yUu);
      this.SUu();
    };
    this.MUu = e => {
      if (this.CurSelectNode) {
        this.CurSelectNode.SetToggleState(0);
      }
      this.CurSelectNode = e;
      this.CurSelectNode.SetToggleState(1);
      this.TechDetailPanel.Refresh(e.Data);
      this.TechDetailPanel.SetUiActive(true);
      this.GetItem(7)?.SetUIActive(true);
    };
    this.pFe = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchDataRedDot);
      this.CloseMe();
    };
    this.EUu = () => {
      var e = new FloroRanchTechGridPanel_1.FloroRanchTechGridPanel();
      e.OnSelectTechNode = this.MUu;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.pFe]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.TechDetailPanel = new FloroRanchTechDetailPanel_1.FloroRanchTechDetailPanel();
    this.TechDetailPanel.UnlockSuccessCallback = this.Aku;
    e.push(this.TechDetailPanel.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.UnlockSuccessPanel = new FloroRanchUnlockSuccessPanel_1.FloroRanchUnlockSuccessPanel();
    e.push(this.UnlockSuccessPanel.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.U1a = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    e.push(this.U1a.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.EUu, this.GetItem(5).GetOwner());
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.yUu = this.CNe.GetTechnologyTreeList();
    e.push(this.ScrollView.RefreshByDataAsync(this.yUu));
    await Promise.all(e);
    this.SUu();
    this.GetItem(8)?.SetUIActive(false);
    this.TechDetailPanel?.SetUiActive(false);
    this.GetItem(7)?.SetUIActive(false);
  }
  SUu() {
    var e = this.CNe.GetTechnologyCoinNum();
    this.TechnologyCoinData.SetAmount(e);
    this.U1a?.SetCurrencyData(this.TechnologyCoinData);
  }
  TrySelectTechNode(e) {
    if (!this.CurSelectNode) {
      this.CurSelectNode = e;
      this.MUu(e);
    }
  }
}
exports.FloroRanchTechnologyView = FloroRanchTechnologyView;
//# sourceMappingURL=FloroRanchTechnologyView.js.map