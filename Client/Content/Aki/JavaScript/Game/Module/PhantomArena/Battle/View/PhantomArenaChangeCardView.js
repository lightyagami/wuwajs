"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChangeCardView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  PhantomArenaReplaceCard_1 = require("../Card/PhantomArenaReplaceCard"),
  PhantomArenaBattleTips_1 = require("./Panel/PhantomArenaBattleTips");
class PhantomArenaChangeCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Layout = void 0, this.BD1 = void 0, this.Li1 = new Set, this.kD1 = -1, this.Ri1 = () => {
      var e = new PhantomArenaReplaceCard_1.PhantomArenaReplaceCard;
      return e.ClickCallback = this.mi1, e
    }, this.qAt = () => {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleDealCardReplace(Array.from(this.Li1))
    }, this.wi1 = () => {
      this.OD1()
    }, this.mi1 = (e, t) => {
      t ? this.Li1.add(e) : this.Li1.delete(e), this.qD1(e)
    }, this.Ai1 = () => {
      this.CloseMe(() => {
        ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.SwitchPhantomArenaBattleViewState(3)
      })
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.qAt],
      [3, this.wi1]
    ]
  }
  async LD1() {
    this.BD1 = new PhantomArenaBattleTips_1.PhantomArenaBattleTips, await this.BD1.CreateByActorAsync(this.GetItem(4).GetOwner())
  }
  async dAn() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Ri1, this.GetItem(1)?.GetOwner());
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ReplaceCardData.GetReplaceCardDataList();
    await this.Layout.RefreshByDataAsync(e, !0)
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.LD1(), this.dAn()])
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReplaceCardFinish, this.Ai1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReplaceCardFinish, this.Ai1)
  }
  qD1(e) {
    var t;
    this.kD1 !== e && (-1 !== this.kD1 && this.Layout.GetLayoutItemByKey(this.kD1)?.SetSelectState(!1), (t = this.Layout.GetLayoutItemByKey(e)) && (t.SetSelectState(!0), this.BD1.RefreshTips(t.Card.Data), this.BD1.SetTipsActive(!0)), this.kD1 = e)
  }
  OD1() {
    -1 !== this.kD1 && (this.Layout.GetLayoutItemByKey(this.kD1)?.SetSelectState(!1), this.kD1 = -1, this.BD1.SetTipsActive(!1))
  }
}
exports.PhantomArenaChangeCardView = PhantomArenaChangeCardView;
//# sourceMappingURL=PhantomArenaChangeCardView.js.map