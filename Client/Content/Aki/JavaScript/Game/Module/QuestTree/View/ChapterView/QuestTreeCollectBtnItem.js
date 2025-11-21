"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeCollectBtnItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class QuestTreeCollectBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Pe = e;
    this.rKd = () => {
      var e = this.Pe.GetAcceptableNodeList();
      if (e.length !== 0) {
        ControllerHolder_1.ControllerHolder.QuestTreeController.OpenAvailableListView(e);
        this.GetItem(2).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rKd]];
  }
  OnStart() {
    this.Refresh();
  }
  Refresh() {
    var e = this.Pe.GetAcceptableNodeList().some(e => e.HasNewTag());
    this.GetItem(2).SetUIActive(e);
  }
}
exports.QuestTreeCollectBtnItem = QuestTreeCollectBtnItem;
//# sourceMappingURL=QuestTreeCollectBtnItem.js.map