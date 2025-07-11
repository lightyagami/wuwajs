"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardInteractItemBlock = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardInteractItemBlock extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s, h) {
    super();
    this.ItemId = t;
    this.StartPos = i;
    this.RotateType = s;
    this.GridWidth = h;
    this.Sr_ = [];
    this.ValidStartPos = {
      RowIndex: -1,
      ColIndex: -1
    };
    this.R$l = undefined;
    this.ItemData = undefined;
    this.Mr_ = {
      RowIndex: -1,
      ColIndex: -1
    };
    this.GFo = t => {
      if (this.ItemData) {
        this.R$l?.DragClick(this.ItemData, this.StartPos);
      }
    };
    this.Pgt = t => {
      if (this.ItemData) {
        this.R$l?.DragBegin(this.ItemData, this.StartPos);
      }
    };
  }
  OnRegisterComponent() {
    this.R$l = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIDraggableComponent]];
  }
  uYl() {
    var t = this.GetDraggable(2);
    t.OnPointerCancelCallBack.Bind(this.GFo);
    t.OnPointerUpCallBack.Bind(this.GFo);
    t.OnPointerBeginDragCallBack.Bind(this.Pgt);
  }
  Er_() {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(this.ItemId);
    var h = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(t.Shap).FillState;
    this.Mr_.RowIndex = h.length;
    this.Mr_.ColIndex = h[0].ArrayInt.length;
    let e = -1;
    let a = -1;
    let r = -1;
    let n = -1;
    for (let s = 0, t = h.length; s < t; s++) {
      for (let t = 0, i = h[s].ArrayInt.length; t < i; t++) {
        if (h[s].ArrayInt[t] === 1) {
          e = e === -1 ? s : Math.min(e, s);
          a = a === -1 ? s : Math.max(a, s);
          r = r === -1 ? t : Math.min(r, t);
          n = n === -1 ? t : Math.max(n, t);
        }
      }
    }
    this.ValidStartPos.ColIndex = r;
    this.ValidStartPos.RowIndex = e;
    for (let i = 0; i < a - e + 1; i++) {
      this.Sr_[i] = [];
      for (let t = 0; t < n - r + 1; t++) {
        var s = h[i + e].ArrayInt[t + r];
        this.Sr_[i].push(s);
      }
    }
  }
  async CYl() {
    var t = this.GetTexture(0);
    var i = this.GetTexture(1);
    this.Ir_(t);
    this.Ir_(i);
    var s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(this.ItemId);
    await Promise.all([this.SetTextureAsync(s.Pic, t), this.SetTextureAsync(s.Pic, i)]);
  }
  Tr_() {
    var h;
    var e = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(this.Sr_, this.RotateType);
    for (let s = 0, t = e.length; s < t; s++) {
      for (let t = 0, i = e[s].length; t < i; t++) {
        if (e[s][t] === 1) {
          h = this.R$l.GetInteractPosByPos(s + this.StartPos.RowIndex, t + this.StartPos.ColIndex);
          this.R$l.GetInteractGridData(h).SetTargetId(this.ItemId);
        }
      }
    }
  }
  br_() {
    let h = [];
    if (this.ItemData) {
      h = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(this.ItemData.ValidDoublyList, this.RotateType);
    }
    var e = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(this.Sr_, this.RotateType);
    for (let s = 0, t = e.length; s < t; s++) {
      for (let t = 0, i = e[s].length; t < i; t++) {
        var a;
        var r = this.R$l.GetInteractPosByPos(s + this.StartPos.RowIndex, t + this.StartPos.ColIndex);
        var r = this.R$l.GetInteractGridData(r);
        if (h.length > 0) {
          a = h[s][t];
          r.IsFinish = a === 1;
        } else {
          r.IsFinish = false;
        }
      }
    }
  }
  Ir_(t) {
    var i = this.Sr_[0].length * this.GridWidth;
    t.SetWidth(i);
    var i = this.Sr_.length * this.GridWidth;
    t.SetHeight(i);
    var i = DockyardPanelUtil_1.DockyardPanelUtil.CalculateOriginalPivot(this.Mr_.RowIndex, this.Mr_.ColIndex);
    t?.SetPivot(i.ToUeVector2D());
    var i = this.RotateType * -90;
    t.SetUIRelativeRotation(new UE.Rotator(0, i, 0));
  }
  Lr_() {
    var t = (this.ValidStartPos.ColIndex + this.StartPos.ColIndex) * this.GridWidth;
    var i = (this.ValidStartPos.RowIndex + this.StartPos.RowIndex) * this.GridWidth;
    this.RootItem?.SetAnchorOffset(new UE.Vector2D(t, -i));
  }
  Z$l() {
    this.Ar_(false);
  }
  async OnBeforeStartAsync() {
    this.uYl();
    this.Er_();
    this.Tr_();
    this.Lr_();
    await this.CYl();
    this.Z$l();
  }
  Ar_(t) {
    this.GetTexture(1)?.SetUIActive(t);
    this.GetTexture(0)?.SetUIActive(!t);
  }
  SetItemData(t) {
    this.ItemData = t;
    this.br_();
    this.Ar_(t !== undefined);
  }
  CheckIsTarget(t, i, s, h) {
    return this.ItemId === t && i === this.StartPos.RowIndex && s === this.StartPos.ColIndex && h === this.RotateType;
  }
}
exports.DockyardInteractItemBlock = DockyardInteractItemBlock;
//# sourceMappingURL=DockyardInteractItemBlock.js.map