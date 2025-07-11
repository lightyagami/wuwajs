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
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalCardItem_1 = require("./PersonalCardItem");
class PersonalCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.L0 = true;
    this.bha = undefined;
    this.p5i = undefined;
    this.lqe = undefined;
    this.uHt = () => {
      var e;
      var i;
      if (!this.L0) {
        e = this.p5i.CurCardId;
        i = PersonalController_1.PersonalController.CheckCardIsUnLock(this.bha.CardId);
        this.GetButton(9).RootUIComp.SetUIActive(e !== this.bha.CardId && i);
      }
    };
    this.p5t = () => {
      PersonalController_1.PersonalController.SendChangeCardRequest(this.bha.CardId);
      UiManager_1.UiManager.CloseView("PersonalEditView");
      UiManager_1.UiManager.CloseView("PersonalOptionView");
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.qha = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.bha.CardId);
    };
    this.Y5i = () => {
      var e = new PersonalCardItem_1.PersonalCardItem();
      e.SetToggleCallBack(this.Oha);
      e.SetNeedShowRedDot(false);
      return e;
    };
    this.Oha = (e, i) => {
      this.bha = i;
      var t;
      var r;
      var s = this.p5i.CardDataList;
      var o = s.length;
      for (let e = 0; e < o; e++) {
        var n = s[e];
        if (n.CardId === i.CardId && n.IsUnLock && !n.IsRead) {
          PersonalController_1.PersonalController.SendReadCardRequest(i.CardId);
          break;
        }
      }
      if (!this.L0) {
        t = this.p5i.CurCardId;
        r = PersonalController_1.PersonalController.CheckCardIsUnLock(i.CardId);
        this.GetButton(9).RootUIComp.SetUIActive(t !== this.bha.CardId && r);
      }
      this.RefreshCardInfo(i);
      this.xqe.SelectGridProxy(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [9, UE.UIButtonComponent], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.p5t], [8, this.qha]];
  }
  OnStart() {
    var e;
    this.p5i = this.OpenParam;
    if (this.p5i) {
      e = this.p5i.GetCardList(false);
      this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Y5i);
      this.xqe.RefreshByData(e);
      if (e.length > 0) {
        this.bha = e[0];
        this.RefreshCardInfo(this.bha);
        this.xqe.SelectGridProxy(0);
      }
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
      this.lqe.SetCloseCallBack(this.Jvt);
      this.GetItem(6).SetUIActive(e.length > 0);
      if (!this.L0) {
        this.GetButton(9).RootUIComp.SetUIActive(false);
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
  RefreshCardInfo(e) {
    e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e.CardId);
    this.SetTextureByPath(e.CardPath, this.GetTexture(2));
    this.GetText(3).ShowTextNew(e.Title);
    this.GetText(4).ShowTextNew(e.AttributesDescription);
    this.GetText(5).ShowTextNew(e.Tips);
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