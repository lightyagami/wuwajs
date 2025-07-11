"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewDetailView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestReviewDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PRr = undefined;
    this.z$1 = undefined;
    this.J$1 = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(this.PRr.Id);
      if (e) {
        this.Z$1(e);
      }
    };
    this.eW1 = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.GetSuccessorNodeByNodeId(this.PRr.Id);
      if (e) {
        this.Z$1(e);
      }
    };
    this.pFe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIDraggableComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIScrollViewComponent], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[2, this.J$1], [3, this.eW1], [4, this.pFe]];
  }
  async OnBeforeStartAsync() {
    this.PRr = this.OpenParam;
    this.z$1 = new QuestReviewDetailImageItem(this.PRr);
    await this.z$1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Z$1(this.PRr);
  }
  async Z$1(e) {
    this.PRr = e;
    this.PRr.HasRedDot = false;
    await this.z$1.RefreshAsync(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Desc);
    var i = ModelManager_1.ModelManager.QuestReviewModel.GetSuccessorNodeByNodeId(e.Id);
    var t = ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(i?.Id ?? 0);
    var s = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(e.Id);
    var a = ModelManager_1.ModelManager.QuestReviewModel.IsNodeVisible(s?.Id ?? 0);
    this.GetButton(2).RootUIComp.SetUIActive(s !== undefined && a);
    this.GetButton(3).RootUIComp.SetUIActive(i !== undefined && t);
    this.GetItem(9).SetUIActive(!!e.Brief);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Brief);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.TitleId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenQuestReviewDetail, e.Id);
  }
}
exports.QuestReviewDetailView = QuestReviewDetailView;
class QuestReviewDetailImageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.PRr = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await this.RefreshAsync(this.PRr);
  }
  async RefreshAsync(e) {
    await this.SetTextureAsync(e.ImageLarge, this.GetTexture(1));
  }
}
//# sourceMappingURL=QuestReviewDetailView.js.map