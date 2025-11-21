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
    this.E6d = undefined;
    this.p5i = undefined;
    this.lqe = undefined;
    this.uHt = () => {
      var t = this.fwd();
      this.xqe.RefreshByData(t);
      this.xqe.SelectGridProxy(0);
      this.xqe.ScrollToGridIndex(0);
      this.I6d(this.E6d);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.xqe.GetGridByDisplayIndex(0), true);
    };
    this.p5t = () => {
      PersonalController_1.PersonalController.SendChangeCardRequest(this.E6d.CardId);
      UiManager_1.UiManager.CloseView("PersonalEditView");
      UiManager_1.UiManager.CloseView("PersonalOptionView");
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.qha = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.E6d.CardId);
    };
    this.Y5i = () => {
      var t = new PersonalCardItem_1.PersonalCardItem();
      t.SetToggleCallBack(this.Oha);
      t.SetNeedShowRedDot(false);
      t.SetIsOtherCardItem(this.p5i?.IsOtherData ?? false);
      return t;
    };
    this.Oha = (t, e) => {
      this.E6d = e;
      var i = this.p5i.CardDataList;
      var r = i.length;
      for (let t = 0; t < r; t++) {
        var s = i[t];
        if (s.CardId === this.E6d.CardId && s.IsUnLock && !s.IsRead) {
          PersonalController_1.PersonalController.SendReadCardRequest(this.E6d.CardId);
          break;
        }
      }
      this.xqe.SelectGridProxy(t);
      this.RefreshCardInfo(this.E6d);
      this.I6d(this.E6d);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [9, UE.UIButtonComponent], [8, UE.UIButtonComponent], [10, UE.UIInteractionGroup]];
    this.BtnBindInfo = [[8, this.qha]];
  }
  OnStart() {
    var t;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
    this.lqe.SetCloseCallBack(this.Jvt);
    this.p5i = this.OpenParam;
    if (this.p5i) {
      this.m8t = new ButtonItem_1.ButtonItem(this.GetButton(9).RootUIComp);
      this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Y5i);
      t = this.fwd();
      this.GetItem(6).SetUIActive(t.length > 0);
      this.xqe.RefreshByData(t);
      if (t.length > 0) {
        this.xqe.SelectGridProxy(0);
        this.E6d = t[0];
        this.RefreshCardInfo(this.E6d);
      }
      if (this.p5i.IsOtherData) {
        this.m8t.SetUiActive(false);
      } else {
        this.m8t.SetUiActive(true);
        this.I6d(this.E6d);
        this.m8t.SetFunction(this.p5t);
      }
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
  RefreshCardInfo(t) {
    t = BackgroundCardById_1.configBackgroundCardById.GetConfig(t.CardId);
    this.SetTextureByPath(t.CardPath, this.GetTexture(2));
    this.GetText(3).ShowTextNew(t.Title);
    this.GetText(4).ShowTextNew(t.AttributesDescription);
    this.GetText(5).ShowTextNew(t.Tips);
  }
  I6d(t) {
    var e = t.CardId === this.p5i.CurCardId;
    var t = t.IsUnLock && !e;
    this.m8t.SetEnableClick(t);
    this.GetInteractionGroup(10).SetInteractable(t);
    var t = e ? "Text_InUse_Text" : "ConfirmBox_173_ButtonText_1";
    this.m8t.SetLocalTextNew(t);
  }
  fwd() {
    var e = [...this.p5i.GetCardList(true)];
    var i = e.findIndex(t => t.CardId === this.p5i.CurCardId);
    if (!(i <= 0) && !(e.length <= i)) {
      var t = e[i];
      for (let t = i; t > 0; t--) {
        e[t] = e[t - 1];
      }
      e[0] = t;
    }
    return e;
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