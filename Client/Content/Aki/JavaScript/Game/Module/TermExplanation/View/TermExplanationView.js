"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TermExplanationView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const TermConfigById_1 = require("../../../../Core/Define/ConfigQuery/TermConfigById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TermExplanationDefine_1 = require("../TermExplanationDefine");
class TermExplanationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.jr1 = () => new ExplanationItem();
    this.pFe = () => {
      this.CloseMe();
    };
    this.x41 = () => {
      var e = this.GetScrollViewWithScrollbar(2);
      e.ContentUIItem.SetBubbleUpToParent(false);
      e.SetRayCastTargetForScrollView(false);
    };
    this.Eji = () => {
      var e = this.OpenParam;
      var e = e.HyperLinkList.indexOf(e.FocusedHyperLink);
      this.xqe.SelectGridProxy(e);
      var e = this.GetScrollViewWithScrollbar(2);
      e.ContentUIItem.SetBubbleUpToParent(true);
      e.SetRayCastTargetForScrollView(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[5, this.pFe], [6, this.pFe]];
  }
  async OnBeforeStartAsync() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewBeforeStart, this.GetViewId());
    var e = this.GetScrollViewWithScrollbar(2);
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.jr1);
    var e = this.OpenParam;
    await this.xqe.RefreshByDataAsync(e.HyperLinkList);
  }
  OnBeforeShow() {
    this.x41();
  }
  OnAfterShow() {
    var e;
    var t = this.OpenParam;
    var i = this.GetScrollViewWithScrollbar(2);
    if (t?.FocusedHyperLink) {
      t = this.xqe.GetItemByIndex(t.HyperLinkList.indexOf(t.FocusedHyperLink));
      e = (0, puerts_1.$ref)(new UE.Vector2D(i.ContentUIItem.RelativeLocation));
      i.ScrollToTop(e, t, true);
      i.Tweener?.OnStartCallBack.Bind(this.x41);
      i.Tweener?.OnCompleteCallBack.Bind(this.Eji);
      if (!i.Tweener) {
        this.Eji();
      }
    }
  }
  OnBeforeDestroy() {
    var e = this.GetScrollViewWithScrollbar(2);
    if (e) {
      e.Tweener?.OnCompleteCallBack.Unbind();
    }
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewClosed);
  }
  GetTipItem() {
    return this.GetItem(7);
  }
}
exports.TermExplanationView = TermExplanationView;
class ExplanationItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  OnSelected(e) {
    this.SPe.PlayLevelSequenceByName("SelectIn");
  }
  Refresh(e, t, i) {
    var r;
    var s;
    var e = Number(e);
    if (e && !isNaN(e) && (r = TermConfigById_1.configTermConfigById.GetConfig(e))) {
      r = r.Placeholder.length === 0 ? [] : r.Placeholder;
      s = `Term${e}_${TermExplanationDefine_1.TERM_TEXT_ID_SUFFIX_TITLE}`;
      e = `Term${e}_${TermExplanationDefine_1.TERM_TEXT_ID_SUFFIX_DESC}`;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s, ...r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...r);
      if (t) {
        this.SPe.PlayLevelSequenceByName("SelectIn");
      } else {
        this.SPe.PlayLevelSequenceByName("SelectOut");
      }
    }
  }
  Clear() {
    this.SPe.StopCurrentSequence();
    this.SPe.PlayLevelSequenceByName("SelectOut");
  }
}
//# sourceMappingURL=TermExplanationView.js.map