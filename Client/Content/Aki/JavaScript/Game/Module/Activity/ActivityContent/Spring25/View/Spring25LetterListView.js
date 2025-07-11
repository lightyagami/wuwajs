"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spring25LetterListView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller");
class Spring25LetterListView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ujr = undefined;
    this.mFi = undefined;
    this.JGl = () => {
      this.CloseMe();
    };
    this.lkl = () => {
      this.OpenParam = ModelManager_1.ModelManager.Spring25Model.BuildLetterListViewData();
      this.skl();
      this.ujr.LiteReplayAsync("Switch");
    };
    this.fva = () => new TabItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.JGl]];
  }
  async OnBeforeStartAsync() {
    this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem());
    this.mFi = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.fva);
    return Promise.resolve();
  }
  OnStart() {
    this.skl();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.Spring25CloseLetterList);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.Spring25SelectLetter, this.lkl);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.Spring25SelectLetter, this.lkl);
  }
  skl() {
    var e = this.OpenParam;
    this.mFi.RefreshByData(e.TabDataList);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e.InfoTextId);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(4), e.TitleTextId);
    var e = this.GetScrollViewWithScrollbar(5);
    e.ScrollToTop((0, puerts_1.$ref)(new UE.Vector2D(e.ContentUIItem.RelativeLocation)), this.GetText(1));
  }
}
exports.Spring25LetterListView = Spring25LetterListView;
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eZs = undefined;
    this.hkl = () => {
      if (this.eZs !== undefined) {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleLetterClickInLetterListView(this.eZs.SignId);
      }
    };
    this.$$a = () => this.eZs !== undefined && !this.eZs.IsChosen;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hkl]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.$$a);
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0)?.CanExecuteChange.Unbind();
  }
  Refresh(e, t, i) {
    this.eZs = e;
    var r = this.GetTexture(1);
    this.TrySetTextureByPath(e.TexturePath, r);
    var r = this.GetText(2);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(r, e.DescriptionTextId);
    this.GetExtendToggle(0)?.SetToggleStateForce(e.IsChosen ? 1 : 0);
    this.GetItem(3)?.SetUIActive(e.IsNew);
  }
}
//# sourceMappingURL=Spring25LetterListView.js.map