"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalCardItem_1 = require("./PersonalCardItem");
class PersonalCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.m8t = undefined;
    this.FFd = undefined;
    this.p5i = undefined;
    this.lqe = undefined;
    this.uHt = () => {
      var e = this.jTd();
      this.xqe.RefreshByData(e);
      this.xqe.SelectGridProxy(0);
      this.xqe.ScrollToGridIndex(0);
      this.NFd(this.FFd);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.xqe.GetGridByDisplayIndex(0), true);
    };
    this.p5t = () => {
      PersonalController_1.PersonalController.SendChangeCardRequest(this.FFd.CardId);
      UiManager_1.UiManager.CloseView("PersonalEditView");
      UiManager_1.UiManager.CloseView("PersonalOptionView");
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.qha = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.FFd.CardId);
    };
    this.Y5i = () => {
      var e = new PersonalCardItem_1.PersonalCardItem();
      e.SetToggleCallBack(this.Oha);
      e.SetNeedShowRedDot(false);
      return e;
    };
    this.Oha = (e, t) => {
      this.FFd = t;
      var i = this.p5i.CardDataList;
      var r = i.length;
      for (let e = 0; e < r; e++) {
        var s = i[e];
        if (s.CardId === this.FFd.CardId && s.IsUnLock && !s.IsRead) {
          PersonalController_1.PersonalController.SendReadCardRequest(this.FFd.CardId);
          break;
        }
      }
      this.xqe.SelectGridProxy(e);
      this.RefreshCardInfo(this.FFd);
      this.NFd(this.FFd);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [9, UE.UIButtonComponent], [8, UE.UIButtonComponent], [10, UE.UIInteractionGroup]];
    this.BtnBindInfo = [[8, this.qha]];
  }
  OnStart() {
    var e;
    this.p5i = this.OpenParam;
    this.m8t = new ButtonItem_1.ButtonItem(this.GetButton(9).RootUIComp);
    this.m8t?.SetFunction(this.p5t);
    if (this.p5i) {
      e = this.jTd();
      this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Y5i);
      this.xqe.RefreshByData(e);
      if (e.length > 0) {
        this.xqe.SelectGridProxy(0);
        this.FFd = e[0];
        this.RefreshCardInfo(this.FFd);
        this.NFd(this.FFd);
      }
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
      this.lqe.SetCloseCallBack(this.Jvt);
      this.GetItem(6).SetUIActive(e.length > 0);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Personal", 58, "PersonalCardView Invalid OpenParam");
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCardChange, this.uHt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCardChange, this.uHt);
  }
  RefreshCardInfo(e) {
    e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e.CardId);
    this.SetTextureByPath(e.CardPath, this.GetTexture(2));
    this.GetText(3).ShowTextNew(e.Title);
    this.GetText(4).ShowTextNew(e.AttributesDescription);
    this.GetText(5).ShowTextNew(e.Tips);
  }
  NFd(e) {
    var t = e.CardId === this.p5i.CurCardId;
    var e = e.IsUnLock && !t;
    this.m8t.SetEnableClick(e);
    this.GetInteractionGroup(10).SetInteractable(e);
    var e = t ? "Text_InUse_Text" : "ConfirmBox_173_ButtonText_1";
    this.m8t.SetLocalTextNew(e);
  }
  jTd() {
    var t = [...this.p5i.GetCardList(true)];
    var i = t.findIndex(e => e.CardId === this.p5i.CurCardId);
    if (!(i <= 0) && !(t.length <= i)) {
      var e = t[i];
      for (let e = i; e > 0; e--) {
        t[e] = t[e - 1];
      }
      t[0] = e;
    }
    return t;
  }
  OnBeforeDestroy() {
    if (this.xqe) {
      this.xqe.ClearGridProxies();
      this.xqe = undefined;
    }
  }
}
exports.PersonalCardView = PersonalCardView;
//# sourceMappingURL=PersonalCardView.js.map