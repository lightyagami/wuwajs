"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeChapterGroupItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const QuestTreeDefine_1 = require("../../QuestTreeDefine");
const QuestTreeChapterItem_1 = require("./QuestTreeChapterItem");
class QuestTreeChapterGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ypt = [];
    this.Ryd = [];
    this.Lyd = [];
    this.wyd = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
  }
  OnStart() {
    this.Ryd = [this.GetItem(6), this.GetItem(7), this.GetItem(8), this.GetItem(9), this.GetItem(10)];
    this.Lyd = [this.GetItem(1), this.GetItem(2), this.GetItem(3), this.GetItem(4), this.GetItem(5)];
    this.wyd = [];
    for (let e = 0; e < QuestTreeDefine_1.QUEST_TREE_VIEW_CHAPTER_GROUP_LENGTH; e++) {
      this.wyd.push(new QuestTreeChapterItem_1.QuestTreeChapterItem());
    }
  }
  Refresh(e, t, s) {
    this.fLc(e);
  }
  async RefreshAsync(e) {
    await this.fLc(e);
  }
  async fLc(e) {
    if (e.length !== 0 && !(e.length > QuestTreeDefine_1.QUEST_TREE_VIEW_CHAPTER_GROUP_LENGTH)) {
      this.ypt = e;
      var t = [];
      for (let e = 0; e < QuestTreeDefine_1.QUEST_TREE_VIEW_CHAPTER_GROUP_LENGTH; e++) {
        var s;
        var r = this.ypt[e];
        if (r) {
          s = this.wyd[e];
          t.push(s.LoadOrRefresh(r, this.Ryd[e]));
          this.Lyd[e].SetUIActive(true);
        } else {
          this.Lyd[e].SetUIActive(false);
        }
      }
      await Promise.all(t);
    }
  }
}
exports.QuestTreeChapterGroupItem = QuestTreeChapterGroupItem;
//# sourceMappingURL=QuestTreeChapterGroupItem.js.map