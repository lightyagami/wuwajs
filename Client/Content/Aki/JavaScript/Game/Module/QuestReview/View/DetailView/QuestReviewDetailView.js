"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestReviewDetailView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestReviewDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.PRr = void 0, this.m$1 = void 0, this.f$1 = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(this.PRr.Id);
      e && this.g$1(e)
    }, this.C$1 = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.GetSuccessorNodeByNodeId(this.PRr.Id);
      e && this.g$1(e)
    }, this.pFe = () => {
      this.CloseMe()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIDraggableComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIScrollViewComponent],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.f$1],
      [3, this.C$1],
      [4, this.pFe]
    ]
  }
  async OnBeforeStartAsync() {
    this.PRr = this.OpenParam, this.m$1 = new QuestReviewDetailImageItem(this.PRr), await this.m$1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), await this.g$1(this.PRr)
  }
  async g$1(e) {
    this.PRr = e, this.PRr.HasRedDot = !1, await this.m$1.RefreshAsync(e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Desc);
    var i = ModelManager_1.ModelManager.QuestReviewModel.GetSuccessorNodeByNodeId(e.Id),
      t = ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(i?.Id ?? 0),
      s = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(e.Id),
      a = ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(s?.Id ?? 0);
    this.GetButton(2).RootUIComp.SetUIActive(void 0 !== s && a), this.GetButton(3).RootUIComp.SetUIActive(void 0 !== i && t), this.GetItem(9).SetUIActive(!!e.Brief), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Brief), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.TitleId), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenQuestReviewDetail, e.Id)
  }
}
exports.QuestReviewDetailView = QuestReviewDetailView;
class QuestReviewDetailImageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.PRr = e
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture]
    ]
  }
  async OnBeforeStartAsync() {
    await this.RefreshAsync(this.PRr)
  }
  async RefreshAsync(e) {
    await this.SetTextureAsync(e.ImageLarge, this.GetTexture(1))
  }
}
//# sourceMappingURL=QuestReviewDetailView.js.map