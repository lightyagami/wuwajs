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
    this.qRd = t;
    this.QDa = s;
    this.RUe = new Map();
    this.HRd = new Map();
    this.$Rd = [];
    this.NDd = new Map();
    for (let t = 0; t < 5; t++) {
      this.RUe.set(t, []);
      this.HRd.set(t, 0);
    }
  }
  async RefreshByData(t) {
    this.WRd();
    let s = HIERARCHY_START_INDEX;
    for (const n of t) {
      var e = n.Config.NodeType;
      var i = this.RUe.get(e);
      var h = this.HRd.get(e);
      this.HRd.set(e, h + 1);
      if (h >= i.length) {
        this.$Rd.push([n, s]);
      } else {
        (e = i[h]).UpdateData(n);
        e?.GetRootItem()?.SetHierarchyIndex(s);
        this.NDd.set(n, e);
      }
      ++s;
    }
    await this.QRd();
    for (var [r, o] of this.RUe) {
      var a = this.HRd.get(r);
      for (let t = 0; t < a; t++) {
        o[t]?.SetUiActive(true);
      }
    }
  }
  ClearPool() {
    this.RUe.clear();
    this.HRd.clear();
    this.$Rd.length = 0;
  }
  GetItemByData(t) {
    return this.NDd.get(t);
  }
  async QRd() {
    var t = [];
    for (const s of this.$Rd) {
      t.push(this.KRd(s));
    }
    await Promise.all(t);
    this.$Rd.length = 0;
  }
  async KRd(t) {
    var [t, s] = t;
    var e = await this.qRd.LoadNodeItem(t, this.QDa);
    if (e) {
      e?.GetRootItem()?.SetHierarchyIndex(s);
      this.RUe.get(t.Config.NodeType).push(e);
      this.NDd.set(t, e);
    }
  }
  WRd() {
    this.NDd.clear();
    this.RUe.forEach((t, s) => {
      t.forEach(t => {
        t.SetUiActive(false);
      });
      this.HRd.set(s, 0);
    });
  }
}
class QuestTreeNodeContainer extends QuestTreeNodeItemLoader_1.QuestTreeNodeItemBase {
  constructor() {
    super(...arguments);
    this.XRd = undefined;
    this.Loader = undefined;
    this.Pe = [];
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.kDd = new UE.Margin(0, 0, 0, 0);
    this.Type = 4;
    this.HierarchyIndex = 0;
    this.J_ = () => {
      var t = this.GetAdditionalHeight();
      this.kDd.Bottom = t;
      this.GetVerticalLayout(0).SetPadding(this.kDd);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.XRd = new QuestTreeNodeItemPool(this.Loader, this.GetItem(2));
    this.sKe = TickSystem_1.TickSystem.Add(this.J_, "QuestTreePictureNodeItem", 0, true, undefined, true)?.Id ?? TickSystem_1.TickSystem.InvalidId;
  }
  OnBeforeDestroy() {
    this.XRd.ClearPool();
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
    await this.XRd.RefreshByData(t);
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
    this.kDd.Bottom = t;
    this.GetVerticalLayout(0).SetPadding(this.kDd);
  }
  UpdateData(t) {}
  UpdateDataList(t) {}
  async CreateSelf(t) {
    await this.CreateThenShowByResourceIdAsync("PnlBranchBtmLayoutIItem", t);
  }
  GetAdditionalHeight() {
    var t = this.XRd.GetItemByData(this.Pe[0]);
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