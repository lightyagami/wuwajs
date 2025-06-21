"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TermExplanationView = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  TermExplanationDefine_1 = require("../TermExplanationDefine");
class TermExplanationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.xqe = void 0, this.Er1 = () => new ExplanationItem, this.pFe = () => {
      this.CloseMe()
    }, this.e41 = () => {
      var e = this.GetScrollViewWithScrollbar(2);
      e.ContentUIItem.SetBubbleUpToParent(!1), e.SetRayCastTargetForScrollView(!1)
    }, this.Eji = () => {
      var e = this.OpenParam,
        e = e.HyperLinkList.indexOf(e.FocusedHyperLink),
        e = (this.xqe.SelectGridProxy(e), this.GetScrollViewWithScrollbar(2));
      e.ContentUIItem.SetBubbleUpToParent(!0), e.SetRayCastTargetForScrollView(!0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [5, this.pFe],
      [6, this.pFe]
    ]
  }
  async OnBeforeStartAsync() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewBeforeStart, this.GetViewId());
    var e = this.GetScrollViewWithScrollbar(2),
      e = (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(e, this.Er1), this.OpenParam);
    await this.xqe.RefreshByDataAsync(e.HyperLinkList)
  }
  OnBeforeShow() {
    this.e41()
  }
  OnAfterShow() {
    var e, t = this.OpenParam,
      i = this.GetScrollViewWithScrollbar(2);
    t?.FocusedHyperLink && (t = this.xqe.GetItemByIndex(t.HyperLinkList.indexOf(t.FocusedHyperLink)), e = (0, puerts_1.$ref)(new UE.Vector2D(i.ContentUIItem.RelativeLocation)), i.ScrollToTop(e, t, !0), i.Tweener?.OnStartCallBack.Bind(this.e41), i.Tweener?.OnCompleteCallBack.Bind(this.Eji), i.Tweener || this.Eji())
  }
  OnBeforeDestroy() {
    var e = this.GetScrollViewWithScrollbar(2);
    e && e.Tweener?.OnCompleteCallBack.Unbind()
  }
  OnAfterDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTermExplanationViewClosed)
  }
  GetTipItem() {
    return this.GetItem(7)
  }
}
exports.TermExplanationView = TermExplanationView;
class ExplanationItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.SPe = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText]
    ]
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem())
  }
  OnSelected(e) {
    this.SPe.PlayLevelSequenceByName("SelectIn")
  }
  Refresh(e, t, i) {
    var r, e = Number(e);
    e && !isNaN(e) && (r = `Term${e}_` + TermExplanationDefine_1.TERM_TEXT_ID_SUFFIX_TITLE, e = `Term${e}_` + TermExplanationDefine_1.TERM_TEXT_ID_SUFFIX_DESC, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e), t ? this.SPe.PlayLevelSequenceByName("SelectIn") : this.SPe.PlayLevelSequenceByName("SelectOut"))
  }
  Clear() {
    this.SPe.StopCurrentSequence(), this.SPe.PlayLevelSequenceByName("SelectOut")
  }
}
//# sourceMappingURL=TermExplanationView.js.map