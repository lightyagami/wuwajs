"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalCardComponent = undefined;
const UE = require("ue");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalCardItem_1 = require("./PersonalCardItem");
class PersonalCardComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, r) {
    super();
    this.xqe = undefined;
    this.L0 = false;
    this.bha = undefined;
    this.P7e = undefined;
    this.uHt = () => {
      var e;
      if (!this.L0) {
        this.uGe(this.bha);
        e = this.fwd();
        this.xqe.RefreshByData(e);
        this.xqe.SelectGridProxy(0);
        this.xqe.ScrollToGridIndex(0);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(this.xqe.GetGridByDisplayIndex(0), true);
      }
    };
    this.OnClickConfirm = () => {
      PersonalController_1.PersonalController.SendChangeCardRequest(this.bha.CardId);
    };
    this.qha = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.bha.CardId);
    };
    this.Y5i = () => {
      var e = new PersonalCardItem_1.PersonalCardItem();
      e.SetToggleCallBack(this.J5i);
      return e;
    };
    this.J5i = (e, t) => {
      this.bha = t;
      var r = this.p5i.CardDataList;
      var i = r.length;
      for (let e = 0; e < i; e++) {
        var s = r[e];
        if (s.CardId === t.CardId && s.IsUnLock && !s.IsRead) {
          PersonalController_1.PersonalController.SendReadCardRequest(t.CardId);
          break;
        }
      }
      if (!this.L0) {
        this.uGe(t);
      }
      this.RefreshCardInfo(t);
      this.xqe.SelectGridProxy(e);
    };
    this.L0 = t;
    this.p5i = r;
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    if (!this.L0) {
      this.BtnBindInfo = [[7, this.qha]];
    }
  }
  OnStart() {
    this.xqe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Y5i);
    this.AddEventListener();
  }
  async OnBeforeShowAsyncImplement() {
    var e = this.fwd();
    await this.xqe.RefreshByDataAsync(e);
    if (e.length > 0) {
      this.bha = e[0];
      this.xqe.SelectGridProxy(0);
      this.xqe.ScrollToGridIndex(0);
      this.RefreshCardInfo(this.bha);
      this.uGe(this.bha);
    }
    this.GetItem(6).SetUIActive(e.length > 0);
  }
  OnShowUiTabViewFromToggle() {}
  fwd() {
    var t = [...this.p5i.GetCardList(true)];
    var r = t.findIndex(e => e.CardId === this.p5i.CurCardId);
    if (!(r <= 0) && !(t.length <= r)) {
      var e = t[r];
      for (let e = r; e > 0; e--) {
        t[e] = t[e - 1];
      }
      t[0] = e;
    }
    return t;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCardChange, this.uHt);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCardChange, this.uHt);
  }
  SetRefreshConfirmBtn(e) {
    this.P7e = e;
  }
  RefreshCardInfo(e) {
    e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e.CardId);
    this.SetTextureByPath(e.CardPath, this.GetTexture(2));
    this.GetText(3).ShowTextNew(e.Title);
    this.GetText(4).ShowTextNew(e.AttributesDescription);
    this.GetText(5).ShowTextNew(e.Tips);
  }
  uGe(e) {
    var t = this.p5i.CurCardId;
    var r = e.IsUnLock;
    var r = t !== e.CardId && r;
    if (this.P7e) {
      this.P7e(r, t === e.CardId);
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.PersonalCardComponent = PersonalCardComponent;
//# sourceMappingURL=PersonalCardComponent.js.map