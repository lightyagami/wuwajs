"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericLayoutNew = undefined;
const UE = require("ue");
const UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction");
const InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation");
const LguiUtil_1 = require("../LguiUtil");
class GenericLayoutNew {
  constructor(t, i, e = undefined) {
    this.cGo = undefined;
    this.Kqo = undefined;
    this.xqe = undefined;
    this.SGo = [];
    this.yGo = [];
    this.bxo = undefined;
    this.AQ = new Map();
    this.x5e = new Array();
    this.Qqo = undefined;
    this.IGo = 0;
    this.vK = false;
    this.TGo = undefined;
    this.P7t = true;
    this.LGo = true;
    this.Kqo = t;
    this.Qqo = i;
    this.DGo(e);
    this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(this);
    this.cGo.RegisterAnimController();
  }
  get TempOriginalItem() {
    return this.bxo;
  }
  RGo() {
    for (const t of this.AQ.values()) {
      if (t instanceof UiComponentsAction_1.UiComponentsAction) {
        t?.Destroy();
      }
    }
    this.AQ.clear();
    this.x5e = [];
  }
  DGo(i) {
    if (!this.bxo) {
      let t = undefined;
      (t = i === undefined ? this.GetItemByIndex(0) : i).SetUIActive(false);
      t.SetUIParent(this.UGo());
      this.bxo = t;
      this.TGo = t.displayName;
    }
  }
  SetScrollView(t) {
    this.xqe = t;
    this.LGo = false;
    this.cGo?.RegisterAnimController();
  }
  PreLoadCopyItem(i) {
    for (let t = 0; t < i; ++t) {
      this.AGo().SetUIActive(false);
    }
  }
  GetRootUiItem() {
    return this.Kqo.RootUIComp;
  }
  UGo() {
    return this.GetRootUiItem().GetParentAsUIItem();
  }
  PGo() {
    var t = this.SGo.pop();
    if (t) {
      t.SetUIActive(false);
      this.yGo.push(t);
    }
  }
  AGo() {
    var t = LguiUtil_1.LguiUtil.CopyItem(this.bxo, this.GetRootUiItem());
    this.SGo.push(t);
    return t;
  }
  xGo() {
    var t = this.yGo.pop();
    if (t) {
      t.SetUIActive(true);
      this.SGo.push(t);
    } else {
      this.AGo().SetUIActive(true);
    }
  }
  wGo() {
    if (this.bxo) {
      this.bxo.SetUIActive(true);
      this.bxo.SetUIParent(this.GetRootUiItem());
      this.bxo = undefined;
    }
  }
  ht() {
    for (let t = 0, i = this.yGo.length; t < i; ++t) {
      this.yGo[t].GetOwner().K2_DestroyActor();
    }
    for (let t = 0, i = this.SGo.length; t < i; ++t) {
      this.SGo[t].GetOwner().K2_DestroyActor();
    }
    this.yGo.length = 0;
    this.SGo.length = 0;
    this.ClearGridController();
  }
  ClearGridController() {
    if (this.cGo) {
      this.cGo.Clear();
      this.cGo = undefined;
    }
  }
  SetNeedAnim(t) {
    this.P7t = t;
  }
  RebuildLayoutByDataNew(i, t = undefined) {
    this.DGo(undefined);
    this.RGo();
    var e = i ? i.length : 0;
    var s = t || e;
    var r = this.SGo.length;
    this.IGo = s;
    this.vK = false;
    if (s < this.SGo.length) {
      for (let t = 0; t < s; ++t) {
        this.SGo[t].SetUIActive(true);
      }
      for (let t = s; t < r; ++t) {
        this.PGo();
      }
    } else if (s > this.SGo.length) {
      for (let t = 0; t < r; ++t) {
        this.SGo[t].SetUIActive(true);
      }
      for (let t = 0; t < s - r; ++t) {
        this.xGo();
      }
    }
    let h = 0;
    for (let t = 0; t < s; ++t) {
      this.SGo[t].SetDisplayName(this.TGo + "_" + t);
      var n = t < e ? i[t] : undefined;
      var n = this.Qqo?.(n, this.SGo[t], h);
      if (n) {
        this.AQ.set(n.Key, n.Value);
        this.x5e.push(n.Value);
        h++;
      }
    }
    if (this.cGo && this.P7t) {
      this.cGo.PlayGridAnim(this.IGo);
    }
  }
  GetItemByIndex(t) {
    if (this.Kqo) {
      var i = this.GetRootUiItem().GetAttachUIChildren();
      if (t < i.Num()) {
        return i.Get(t);
      }
    }
  }
  GetLayoutItemByKey(t) {
    return this.AQ.get(t);
  }
  GetLayoutItemMap() {
    return this.AQ;
  }
  GetLayoutItemList() {
    return this.x5e;
  }
  GetLayoutItemByIndex(t) {
    return this.x5e[t];
  }
  ClearChildren() {
    if (!this.vK) {
      this.vK = true;
      this.Kqo.OnLateUpdate.Unbind();
      this.RGo();
      this.ht();
      this.wGo();
    }
  }
  SetActive(t) {
    this.Kqo.RootUIComp.SetUIActive(t);
  }
  GetDisplayGridNum() {
    return this.IGo;
  }
  GetPreservedGridNum() {
    return this.SGo.length;
  }
  GetDisplayGridStartIndex() {
    return 0;
  }
  GetDisplayGridEndIndex() {
    return this.GetDisplayGridNum() - 1;
  }
  GetGridAnimationInterval() {
    return this.Kqo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.Kqo.GetGridAnimationStartTime();
  }
  GetGrid(t) {
    return this.GetItemByIndex(t % this.GetDisplayGridNum());
  }
  GetGridByDisplayIndex(t) {
    return this.GetItemByIndex(t);
  }
  BindLateUpdate(t) {
    this.Kqo.OnLateUpdate.Bind(t);
  }
  UnBindLateUpdate() {
    this.Kqo.OnLateUpdate.Unbind();
  }
  NotifyAnimationStart() {
    this.Kqo.SetInAnimation(true);
  }
  NotifyAnimationEnd() {
    this.Kqo.SetInAnimation(false);
  }
  GetUiAnimController() {
    if (this.LGo) {
      return this.Kqo?.GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    } else {
      return this.xqe?.GetContent()?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    }
  }
}
exports.GenericLayoutNew = GenericLayoutNew;
//# sourceMappingURL=GenericLayoutNew.js.map