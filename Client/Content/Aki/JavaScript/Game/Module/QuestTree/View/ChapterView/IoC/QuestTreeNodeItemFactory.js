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
    this.qRd = undefined;
  }
  static get Instance() {
    if (!QuestTreeNodeItemFactory.GRd) {
      QuestTreeNodeItemFactory.GRd = new QuestTreeNodeItemFactory();
      QuestTreeNodeItemFactory.GRd.InitializeLoader();
    }
    return QuestTreeNodeItemFactory.GRd;
  }
  InitializeLoader() {
    this.qRd = new QuestTreeNodeItemLoader_1.QuestTreeNodeItemLoader();
    this.qRd.RegisterNodeType(1, QuestTreePictureNodeItem_1.QuestTreePictureNodeItem);
    this.qRd.RegisterNodeType(2, QuestTreeTextNodeItem_1.QuestTreeTextNodeItem);
    this.qRd.RegisterNodeType(3, QuestTreeSeriesNodeItem_1.QuestTreeSeriesNodeItem);
    this.qRd.RegisterNodeType(4, QuestTreeNodeContainer_1.QuestTreeNodeContainer);
  }
  async CreateAndLoadNode(e, t) {
    return await this.qRd.LoadNodeItem(e, t);
  }
  CreateLogicalNodeItem(e) {
    return this.qRd.CreateLogicalNodeItem(e);
  }
}
(exports.QuestTreeNodeItemFactory = QuestTreeNodeItemFactory).GRd = undefined;
//# sourceMappingURL=QuestTreeNodeItemFactory.js.map