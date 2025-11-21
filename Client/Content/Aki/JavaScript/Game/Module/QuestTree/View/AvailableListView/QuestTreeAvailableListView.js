"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeAvailableListView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const QuestTreeAvailableNodeItem_1 = require("./QuestTreeAvailableNodeItem");
class QuestTreeAvailableListView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.vVt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam ?? [];
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), () => new QuestTreeAvailableNodeItem_1.QuestTreeAvailableNodeItem());
    this.vVt.RefreshByData(e);
  }
}
exports.QuestTreeAvailableListView = QuestTreeAvailableListView;
//# sourceMappingURL=QuestTreeAvailableListView.js.map