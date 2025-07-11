"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupCaptionItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const CommonCurrencyItemListComponent_1 = require("../../Module/Common/CommonCurrencyItemListComponent");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../Base/UiPanelBase");
const PopupCaptionStateItem_1 = require("./PopupCaptionStateItem");
const PopupCaptionToggleItem_1 = require("./PopupCaptionToggleItem");
class PopupCaptionItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.ucr = undefined;
    this.S1a = undefined;
    this.NUc = undefined;
    this.OnClickCloseBtnCall = () => {};
    this.OnClickHelpBtnCall = () => {};
    this.Jvt = () => {
      if (this.OnClickCloseBtnCall) {
        this.OnClickCloseBtnCall();
      }
    };
    this.pcr = () => {
      if (this.OnClickHelpBtnCall) {
        this.OnClickHelpBtnCall();
      }
    };
    if (t !== undefined) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Jvt], [2, this.pcr]];
  }
  SetCloseBtnActive(t) {
    this.GetButton(3).RootUIComp.SetUIActive(t);
  }
  SetHelpBtnActive(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
  SetCloseCallBack(t) {
    this.OnClickCloseBtnCall = t;
  }
  SetHelpCallBack(t) {
    this.OnClickHelpBtnCall = t;
  }
  SetCloseBtnRaycast(t) {
    this.GetButton(3).RootUIComp.SetRaycastTarget(t);
  }
  SetCloseBtnShowState(t) {
    this.GetButton(3).RootUIComp.SetUIActive(t);
  }
  SetTitle(t) {
    this.GetText(1).SetText(t);
  }
  SetTitleByTextIdAndArg(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), t, e);
  }
  SetTitleByTextIdAndArgNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
  }
  SetTitleByTitleData(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TextId, t.Args);
  }
  SetTitleLocalText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
  async SetTitleIconByResourceId(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    await this.SetSpriteAsync(t, this.GetSprite(0), false);
  }
  SetTitleIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), false);
  }
  SetTitleTextActive(t) {
    this.GetText(1).SetUIActive(t);
  }
  SetTitleIconVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetCurrencyItemVisible(t) {
    this.GetItem(4).SetUIActive(t);
  }
  async SetCurrencyItemList(t) {
    this.ucr ||= new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(this.GetItem(4));
    await this.ucr.SetCurrencyItemList(t);
  }
  GetCurrencyItemList() {
    return this.ucr?.GetCurrencyItemList();
  }
  SetCurrencyItemBtnFunction(e, t) {
    var i = this.ucr?.GetCurrencyItemList()?.find(t => t.ItemId === e);
    if (i) {
      i.SetButtonFunction(t);
    }
  }
  async CreateToggleTab(t) {
    this.S1a = new PopupCaptionToggleItem_1.PopupCaptionToggleItem();
    await this.S1a.CreateByResourceIdAsync("TogTabCName", this.GetItem(5));
    this.S1a.SetClickToggleCallback(t);
  }
  SetToggleName(t) {
    this.S1a?.SetNameText(t);
  }
  SetToggleVisible(t) {
    this.S1a?.SetUiActive(t);
  }
  GetToggleState() {
    if (this.S1a === undefined) {
      return 0;
    } else {
      return this.S1a.GetToggleState();
    }
  }
  GetCostContent() {
    return this.GetItem(4);
  }
  async CreateCaptionStateItem(t) {
    this.NUc = new PopupCaptionStateItem_1.PopupCaptionStateItem();
    await this.NUc.CreateByResourceIdAsync("PnlCaptionStateA", this.GetItem(5));
    this.NUc.BindClick(t);
  }
  SetCaptionStateTip(t) {
    this.NUc?.SetTipsLocalText(t);
  }
  SetCaptionStateActive(t) {
    this.NUc?.SetActive(t);
  }
  SetCaptionChangeColor(t) {
    this.NUc?.SetCaptionChangeColor(t);
  }
  GetToggleRootItem() {
    return this.GetItem(5);
  }
  GetHelpBtn() {
    return this.GetButton(2);
  }
  GetCloseBtn() {
    return this.GetButton(3);
  }
}
exports.PopupCaptionItem = PopupCaptionItem;
//# sourceMappingURL=PopupCaptionItem.js.map