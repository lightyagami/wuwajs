"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeItemFactory = undefined;
const QuestTreeNodeContainer_1 = require("../QuestTreeNodeContainer");
const QuestTreePictureNodeItem_1 = require("../QuestTreePictureNodeItem");
const QuestTreeSeriesNodeItem_1 = require("../QuestTreeSeriesNodeItem");
const QuestTreeTextNodeItem_1 = require("../QuestTreeTextNodeItem");
const QuestTreeNodeItemLoader_1 = require("./QuestTreeNodeItemLoader");
class QuestTreeNodeItemFactory {
  constructor() {
    this.dTd = undefined;
  }
  static get Instance() {
    if (!QuestTreeNodeItemFactory.mTd) {
      QuestTreeNodeItemFactory.mTd = new QuestTreeNodeItemFactory();
      QuestTreeNodeItemFactory.mTd.InitializeLoader();
    }
    return QuestTreeNodeItemFactory.mTd;
  }
  InitializeLoader() {
    this.dTd = new QuestTreeNodeItemLoader_1.QuestTreeNodeItemLoader();
    this.dTd.RegisterNodeType(1, QuestTreePictureNodeItem_1.QuestTreePictureNodeItem);
    this.dTd.RegisterNodeType(2, QuestTreeTextNodeItem_1.QuestTreeTextNodeItem);
    this.dTd.RegisterNodeType(3, QuestTreeSeriesNodeItem_1.QuestTreeSeriesNodeItem);
    this.dTd.RegisterNodeType(4, QuestTreeNodeContainer_1.QuestTreeNodeContainer);
  }
  async CreateAndLoadNode(e, t) {
    return await this.dTd.LoadNodeItem(e, t);
  }
  CreateLogicalNodeItem(e) {
    return this.dTd.CreateLogicalNodeItem(e);
  }
}
(exports.QuestTreeNodeItemFactory = QuestTreeNodeItemFactory).mTd = undefined;
//# sourceMappingURL=QuestTreeNodeItemFactory.js.map