"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdQualityView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TrapDefenseBdBuffItem_1 = require("./TrapDefenseBdBuffItem");
class TrapDefenseBdQualityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PopupCaption = undefined;
    this.BdData = undefined;
    this.LayoutBdBuff = undefined;
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBdQuality;
    this.OnClickBtnSure = () => {
      this.CloseMe();
    };
    this.CreateItemBdBuff = () => {
      var e = new TrapDefenseBdBuffItem_1.TrapDefenseBdBuffItem();
      e.OnSelectBuffItemCallback = this.OnSelectBdBuffItem;
      return e;
    };
    this.OnSelectBdBuffItem = e => {
      this.ViewModel.SetCurSelectBdBuffData(e);
      e = e.GetStrengthenBeforeConfig();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Desc, ...e.DescArgs);
    };
    this.OnBtnHelp = () => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdBdSum();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.OnBtnClose = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UILayoutBase], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.OnClickBtnSure]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(2));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(this.OnBtnHelp);
    var e = this.GetLayoutBase(7);
    var t = this.GetItem(8)?.GetOwner();
    this.LayoutBdBuff = new GenericLayout_1.GenericLayout(e, this.CreateItemBdBuff, t);
  }
  OnStart() {
    var e = {
      UiText: this.GetText(9),
      ViewType: 0,
      ReportType: 9
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    if (this.ViewModel.CurSelectBdData) {
      this.UpdateData(this.ViewModel.CurSelectBdData);
    }
  }
  OnBeforeDestroy() {
    this.ViewModel.OnViewClose();
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(9));
  }
  UpdateData(e) {
    this.BdData = e;
    var t = this.GetTexture(3);
    this.SetTextureByPath(e.Config.Icon, t);
    this.GetText(4).ShowTextNew(e.Config.Name);
    this.SetNewQualityMode(this.ViewModel.IsNewQualityMode);
    this.UpdateBdBuffQuality();
  }
  SetNewQualityMode(e) {
    this.GetItem(5)?.SetUIActive(e);
  }
  UpdateBdBuffQuality() {
    var e = this.ViewModel.ShowQuality;
    var e = this.BdData.GetQualityBuffDataList(e);
    var t = e.length > 0;
    this.GetItem(7)?.SetUIActive(t);
    if (t) {
      const i = this.GetSelectGridIndex(e);
      this.LayoutBdBuff.RefreshByData(e, () => {
        this.LayoutBdBuff.SelectGridProxy(Math.max(i, 0));
      });
    }
  }
  GetSelectGridIndex(e) {
    if (this.ViewModel.CurSelectBdBuffData) {
      return e.findIndex(e => e.Id === this.ViewModel.CurSelectBdBuffData.Id);
    } else {
      return this.LayoutBdBuff.GetSelectedGridIndex();
    }
  }
}
exports.TrapDefenseBdQualityView = TrapDefenseBdQualityView;
//# sourceMappingURL=TrapDefenseBdQualityView.js.map