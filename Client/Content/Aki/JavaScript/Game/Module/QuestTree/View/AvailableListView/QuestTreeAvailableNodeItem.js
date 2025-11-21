"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeAvailableNodeItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class QuestTreeAvailableNodeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.zNd = () => {
      if (UiManager_1.UiManager.IsViewOpen("QuestTreeChapterView")) {
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.SelectData(this.Pe);
      } else {
        ControllerHolder_1.ControllerHolder.QuestTreeController.OpenChapterView(this.Pe.ChapterId, this.Pe.Id);
      }
      ControllerHolder_1.ControllerHolder.QuestTreeController.OpenNodeDetailView(this.Pe);
      UiManager_1.UiManager.CloseView("QuestTreeAvailableListView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UISprite], [6, UE.UIText], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, this.zNd]];
  }
  Refresh(e, r, t) {
    this.Pe = e;
    this.SetSpriteByPath(e.TypeIconPath, this.GetSprite(7), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Config.Name);
    this.GetSprite(0).SetUIActive(e.Type === 2);
    this.GetSprite(1).SetUIActive(e.Type === 9);
    this.GetItem(8).SetUIActive(e.HasNewTag());
    this.GetSprite(5).SetUIActive(false);
    this.GetText(6).SetUIActive(false);
    this.GetButton(3).GetRootComponent().SetUIActive(true);
    e.RemoveNewTag();
  }
}
exports.QuestTreeAvailableNodeItem = QuestTreeAvailableNodeItem;
//# sourceMappingURL=QuestTreeAvailableNodeItem.js.map