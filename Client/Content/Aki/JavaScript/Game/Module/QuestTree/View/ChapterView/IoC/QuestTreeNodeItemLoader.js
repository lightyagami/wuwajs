"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeItemLoader = exports.QuestTreeNodeItemBase = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class QuestTreeNodeItemBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.HierarchyIndex = 0;
    this.Loader = undefined;
  }
  Init(e) {
    this.Loader = e;
  }
  GetAdditionalHeight() {
    return 0;
  }
  UpdateDataList(e) {}
  LocateSelf() {
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelChapter.LocatingHelper?.LocateToNode(this.GetRootItem(), true);
  }
}
exports.QuestTreeNodeItemBase = QuestTreeNodeItemBase;
class QuestTreeNodeItemLoader {
  constructor() {
    this.fTd = new Map();
  }
  RegisterNodeType(e, t) {
    this.fTd.set(e, t);
  }
  async LoadNodeItem(e, t) {
    if (e.State !== 0) {
      var r = this.fTd.get(e.Config.NodeType);
      if (r) {
        (r = new r()).Init(this);
        await r.CreateSelf(t);
        r.UpdateData(e);
        return r;
      }
    }
  }
  async LoadNodeContainer(e, t) {
    var r = this.fTd.get(4);
    if (r) {
      (r = new r()).Init(this);
      await r.CreateSelf(t);
      r.UpdateDataList?.(e);
      return r;
    }
  }
  CreateLogicalNodeItem(e) {
    var e = this.fTd.get(e);
    if (e) {
      (e = new e()).Init(this);
      return e;
    }
  }
}
exports.QuestTreeNodeItemLoader = QuestTreeNodeItemLoader;
//# sourceMappingURL=QuestTreeNodeItemLoader.js.map