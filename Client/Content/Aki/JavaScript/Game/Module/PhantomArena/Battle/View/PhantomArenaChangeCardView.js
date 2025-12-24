"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChangeCardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomArenaReplaceCard_1 = require("../Card/PhantomArenaReplaceCard");
const PhantomArenaBattleTips_1 = require("./Panel/PhantomArenaBattleTips");
class PhantomArenaChangeCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this._U1 = undefined;
    this.Qi1 = new Set();
    this.uU1 = -1;
    this.Ki1 = () => {
      var e = new PhantomArenaReplaceCard_1.PhantomArenaReplaceCard();
      e.ClickCallback = this.Ui1;
      return e;
    };
    this.qAt = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleDealCardReplace(Array.from(this.Qi1));
    };
    this.Xi1 = () => {
      this.cU1();
    };
    this.Ui1 = (e, t) => {
      if (t) {
        this.Qi1.add(e);
      } else {
        this.Qi1.delete(e);
      }
      this.dU1(e);
    };
    this.Yi1 = () => {
      this.CloseMe(() => {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.SwitchPhantomArenaBattleViewState(3);
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.qAt], [3, this.Xi1]];
  }
  async rU1() {
    this._U1 = new PhantomArenaBattleTips_1.PhantomArenaBattleTips();
    await this._U1.CreateByActorAsync(this.GetItem(4).GetOwner());
  }
  async dAn() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Ki1, this.GetItem(1)?.GetOwner());
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ReplaceCardData.GetReplaceCardDataList();
    await this.Layout.RefreshByDataAsync(e, true);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.rU1(), this.dAn()]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReplaceCardFinish, this.Yi1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReplaceCardFinish, this.Yi1);
  }
  dU1(e) {
    var t;
    if (this.uU1 !== e) {
      if (this.uU1 !== -1) {
        this.Layout.GetLayoutItemByKey(this.uU1)?.SetSelectState(false);
      }
      if (t = this.Layout.GetLayoutItemByKey(e)) {
        t.SetSelectState(true);
        this._U1.RefreshTips(t.Card.Data, false);
        this._U1.SetTipsActive(true);
      }
      this.uU1 = e;
    }
  }
  cU1() {
    if (this.uU1 !== -1) {
      this.Layout.GetLayoutItemByKey(this.uU1)?.SetSelectState(false);
      this.uU1 = -1;
      this._U1.SetTipsActive(false);
    }
  }
  GetExtraResourceId(e) {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      return "UiView_CardChage";
    } else {
      return "UiView_CardChageNew";
    }
  }
}
exports.PhantomArenaChangeCardView = PhantomArenaChangeCardView;
//# sourceMappingURL=PhantomArenaChangeCardView.js.map