"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeNodeContainer = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const QuestTreeNodeItemLoader_1 = require("./IoC/QuestTreeNodeItemLoader");
const HIERARCHY_START_INDEX = 2;
class QuestTreeNodeItemPool {
  constructor(t, s) {
    this.dTd = t;
    this.QDa = s;
    this.RUe = new Map();
    this.vTd = new Map();
    this.yTd = [];
    this.sPd = new Map();
    for (let t = 0; t < 5; t++) {
      this.RUe.set(t, []);
      this.vTd.set(t, 0);
    }
  }
  async RefreshByData(t) {
    this.STd();
    let s = HIERARCHY_START_INDEX;
    for (const n of t) {
      var e = n.Config.NodeType;
      var i = this.RUe.get(e);
      var h = this.vTd.get(e);
      this.vTd.set(e, h + 1);
      if (h >= i.length) {
        this.yTd.push([n, s]);
      } else {
        (e = i[h]).UpdateData(n);
        e?.GetRootItem()?.SetHierarchyIndex(s);
        this.sPd.set(n, e);
      }
      ++s;
    }
    await this.MTd();
    for (var [r, o] of this.RUe) {
      var a = this.vTd.get(r);
      for (let t = 0; t < a; t++) {
        o[t]?.SetUiActive(true);
      }
    }
  }
  ClearPool() {
    this.RUe.clear();
    this.vTd.clear();
    this.yTd.length = 0;
  }
  GetItemByData(t) {
    return this.sPd.get(t);
  }
  async MTd() {
    var t = [];
    for (const s of this.yTd) {
      t.push(this.ETd(s));
    }
    await Promise.all(t);
    this.yTd.length = 0;
  }
  async ETd(t) {
    var [t, s] = t;
    var e = await this.dTd.LoadNodeItem(t, this.QDa);
    if (e) {
      e?.GetRootItem()?.SetHierarchyIndex(s);
      this.RUe.get(t.Config.NodeType).push(e);
      this.sPd.set(t, e);
    }
  }
  STd() {
    this.sPd.clear();
    this.RUe.forEach((t, s) => {
      t.forEach(t => {
        t.SetUiActive(false);
      });
      this.vTd.set(s, 0);
    });
  }
}
class QuestTreeNodeContainer extends QuestTreeNodeItemLoader_1.QuestTreeNodeItemBase {
  constructor() {
    super(...arguments);
    this.ITd = undefined;
    this.Loader = undefined;
    this.Pe = [];
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.tPd = new UE.Margin(0, 0, 0, 0);
    this.Type = 4;
    this.HierarchyIndex = 0;
    this.J_ = () => {
      var t = this.GetAdditionalHeight();
      this.tPd.Bottom = t;
      this.GetVerticalLayout(0).SetPadding(this.tPd);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.ITd = new QuestTreeNodeItemPool(this.Loader, this.GetItem(2));
    this.sKe = TickSystem_1.TickSystem.Add(this.J_, "QuestTreePictureNodeItem", 0, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
  }
  OnBeforeDestroy() {
    this.ITd.ClearPool();
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  Refresh(t, s, e) {
    this.RefreshAsync(t);
  }
  async RefreshAsync(t) {
    this.Pe = t;
    await this.ITd.RefreshByData(t);
    var s = t[0];
    let e = t.length > 1 && !!s.NextQuestNode;
    for (const i of t) {
      if (i.State !== 4) {
        e = false;
        break;
      }
    }
    this.GetItem(3).SetUIActive(e && s.Config.NodeType === 1);
    this.GetItem(4).SetUIActive(e && s.Config.NodeType !== 1);
    t = this.GetAdditionalHeight();
    this.tPd.Bottom = t;
    this.GetVerticalLayout(0).SetPadding(this.tPd);
  }
  UpdateData(t) {}
  UpdateDataList(t) {}
  async CreateSelf(t) {
    await this.CreateThenShowByResourceIdAsync("PnlBranchBtmLayoutIItem", t);
  }
  GetAdditionalHeight() {
    var t = this.ITd.GetItemByData(this.Pe[0]);
    if (t) {
      t = t.GetAdditionalHeight() - this.GetItem(2).GetHeight();
      return Math.max(t, 0);
    } else {
      return 0;
    }
  }
}
exports.QuestTreeNodeContainer = QuestTreeNodeContainer;
//# sourceMappingURL=QuestTreeNodeContainer.js.map