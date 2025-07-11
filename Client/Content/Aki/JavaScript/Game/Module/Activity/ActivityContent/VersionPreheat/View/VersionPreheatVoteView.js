"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionPreheatVoteView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class VersionPreheatVoteView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.rul = undefined;
    this.oul = undefined;
    this.s4e = undefined;
    this.Y_l = () => {
      this.CloseMe();
    };
    this.z_l = () => {
      this.CloseMe();
    };
    this.sul = e => {
      this.rul.RefreshToggle(e);
      this.oul.RefreshToggle(!e);
    };
    this.a4e = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this.Y_l]];
  }
  async OnBeforeStartAsync() {
    this.rul = new VersionPreheatToggleItem();
    await this.rul.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.oul = new VersionPreheatToggleItem();
    await this.oul.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.a4e);
    this.RefreshExternal(this.OpenParam);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VersionPreheatRewardResponse, this.z_l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VersionPreheatOnClickVote, this.sul);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VersionPreheatRewardResponse, this.z_l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VersionPreheatOnClickVote, this.sul);
  }
  RefreshExternal(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleTextId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.ContentTextId);
    this.GetItem(0)?.SetUIActive(e.CrestIndex === 0);
    this.GetItem(1)?.SetUIActive(e.CrestIndex === 1);
    this.rul.RefreshExternal(e.LeftToggleData);
    this.oul.RefreshExternal(e.RightToggleData);
    this.s4e.RefreshByData(e.ItemListData);
    if (e.IsLeftChosen === undefined) {
      this.rul.RefreshToggleDirectly(false);
      this.oul.RefreshToggleDirectly(false);
    } else {
      this.sul(e.IsLeftChosen);
    }
  }
}
exports.VersionPreheatVoteView = VersionPreheatVoteView;
class VersionPreheatToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._9a = undefined;
    this.p9a = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VersionPreheatOnClickVote, this._9a.ClickPassData);
      var e = this._9a;
      e.ClickFunc(e.Id, e.ClickPassData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.p9a]];
  }
  RefreshExternal(e) {
    this._9a = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.ContentTextId);
    this.GetExtendToggle(0).SetToggleState(0);
  }
  RefreshToggle(e) {
    var t = this.GetExtendToggle(0);
    t.SetToggleState(e ? 1 : 0);
    t.IsSelfInteractive = false;
  }
  RefreshToggleDirectly(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
  }
}
//# sourceMappingURL=VersionPreheatVoteView.js.map