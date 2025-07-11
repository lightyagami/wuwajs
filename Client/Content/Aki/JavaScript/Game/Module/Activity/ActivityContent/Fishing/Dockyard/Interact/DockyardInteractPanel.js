"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardInteractPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
const DockyardInteractGrid_1 = require("./DockyardInteractGrid");
const DockyardInteractItemBlock_1 = require("./DockyardInteractItemBlock");
class DockyardInteractPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.NXl = new Set();
    this.V__ = new Set();
    this.Layout = undefined;
    this.AttachItem = undefined;
    this.$$l = {
      RowStartIndex: -1,
      RowEndIndex: -1,
      ColStartIndex: -1,
      ColEndIndex: -1
    };
    this.X$l = {
      RowStartIndex: -1,
      RowEndIndex: -1,
      ColStartIndex: -1,
      ColEndIndex: -1
    };
    this.PanelModel = undefined;
    this.sGe = () => {
      return new DockyardInteractGrid_1.DockyardInteractGrid(this.PanelModel);
    };
    this.PanelModel = t;
    this.PanelModel.InitPanel(this);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIItem]];
  }
  Z$l() {
    this.AttachItem = this.GetItem(2);
  }
  async dAn() {
    var t = this.GetItem(1);
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.sGe, t.GetOwner());
    await this.Layout.RefreshByDataAsync(this.PanelModel.PosDataList);
  }
  async Rr_(t, i, e) {
    var s = {
      ColIndex: i.ArrayInt[0],
      RowIndex: i.ArrayInt[1]
    };
    var i = i.ArrayInt[2];
    var t = new DockyardInteractItemBlock_1.DockyardInteractItemBlock(t, s, i, e);
    t.OpenParam = this.PanelModel;
    this.V__.add(t);
    await t.CreateThenShowByResourceIdAsync("UiItem_InteractionSeaGridIcon", this.GetItem(2));
  }
  async Pr_() {
    var t = this.GetItem(1);
    var i = [];
    for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetFishingDelivery(this.PanelModel.ConfigId).NeedItems) {
      i.push(this.Rr_(e[0], e[1], t.Width));
    }
    await Promise.all(i);
    this.wr_();
  }
  wr_() {
    var t = ModelManager_1.ModelManager.FishingModel.GetDataMapByInteract(this.PanelModel.ConfigId);
    if (t) {
      for (const e of t.values()) {
        var i = this.j__(e.ItemId, e.PosY, e.PosX);
        if (i) {
          i.SetItemData(e);
        }
      }
    }
  }
  async OnBeforeStartAsync() {
    this.Z$l();
    await this.Pr_();
    await this.dAn();
  }
  lXl(t, i) {
    t = this.PanelModel.GetInteractPosByPos(t, i);
    if (t) {
      return this.Layout.GetLayoutItemByKey(t);
    }
  }
  j__(t, i, e) {
    for (const s of this.V__.values()) {
      if (s.ItemId === t && s.StartPos.ColIndex === e && s.StartPos.RowIndex === i) {
        return s;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Dockyard", 10, "查找不到对应的InteractItemBlock", ["ItemId", t], ["RowIndex", i], ["ColIndex", e]);
    }
  }
  cXl(t) {
    var e = t.RowStartIndex >= 0 ? t.RowStartIndex : 0;
    var s = t.RowEndIndex < FishingDefine_1.INTERACT_ROW_COUNT && t.RowEndIndex >= 0 ? t.RowEndIndex : FishingDefine_1.INTERACT_ROW_COUNT - 1;
    var a = t.ColStartIndex >= 0 ? t.ColStartIndex : 0;
    var h = t.ColEndIndex < FishingDefine_1.INTERACT_COL_COUNT && t.ColEndIndex >= 0 ? t.ColEndIndex : FishingDefine_1.INTERACT_COL_COUNT - 1;
    for (let i = e; i <= s; i++) {
      for (let t = a; t <= h; t++) {
        this.lXl(i, t)?.ResetPreviewBg();
      }
    }
  }
  hXl(e, t) {
    this.NXl.clear();
    var s;
    var a = Math.max(t.RowStartIndex, 0);
    var h = Math.min(t.RowEndIndex, FishingDefine_1.INTERACT_ROW_COUNT - 1);
    var n = Math.max(t.ColStartIndex, 0);
    var r = Math.min(t.ColEndIndex, FishingDefine_1.INTERACT_COL_COUNT - 1);
    var o = e.GetItemId();
    var i = e.IsPartOutOfRange(t, FishingDefine_1.INTERACT_ROW_COUNT, FishingDefine_1.INTERACT_COL_COUNT);
    var c = e.IsOutOfRange(t, FishingDefine_1.INTERACT_ROW_COUNT, FishingDefine_1.INTERACT_COL_COUNT);
    this.PanelModel.IsAllMatch = !i && !c;
    this.PanelModel.IsOverlapAnother = !i && !c;
    for (let i = a; i <= h; i++) {
      for (let t = n; t <= r; t++) {
        if (e.IsValidGridPos(i, t) && (s = this.lXl(i, t))) {
          this.NXl.add(s);
          if (s.GetTargetItemId() !== o) {
            this.PanelModel.IsAllMatch = false;
          }
          if (!s.IsFinishInteract) {
            this.PanelModel.IsOverlapAnother = false;
          }
        }
      }
    }
    if (this.PanelModel.IsAllMatch && (i = this.j__(o, t.RowStartIndex, t.ColStartIndex))) {
      this.PanelModel.IsAllMatch = i.RotateType === e.GetData().Rotate;
      this.PanelModel.MatchPos.RowIndex = t.RowStartIndex + i.ValidStartPos.RowIndex;
      this.PanelModel.MatchPos.ColIndex = t.ColStartIndex + i.ValidStartPos.ColIndex;
    }
    this.PanelModel.IsOverlapAnother &&= this.PanelModel.IsAllMatch;
    for (const d of this.NXl) {
      d.RefreshBgSprite(this.PanelModel.IsAllMatch);
    }
  }
  dXl() {
    if (this.PanelModel.IsOutOfRange) {
      this.PanelModel.InSelectItemBlock.ResetToAppropriatePos(FishingDefine_1.INTERACT_ROW_COUNT, FishingDefine_1.INTERACT_COL_COUNT, this.AttachItem);
      this.RefreshAllBackpackGridState();
    }
  }
  nXl(t) {
    var i = t.GetLeftTopPosRangeByPanel(this.AttachItem);
    this.hXl(t, i);
  }
  InitAppropriatePos(t) {
    var i = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(t.PosDoublyList, t.Rotate);
    this.X$l.RowStartIndex = t.PosY;
    this.X$l.RowEndIndex = t.PosY + i.length - 1;
    this.X$l.ColStartIndex = t.PosX;
    this.X$l.ColEndIndex = t.PosX + i[0].length - 1;
  }
  RefreshAllBackpackGridState(t = true) {
    var i = this.PanelModel.InSelectItemBlock.GetLeftTopPosRangeByPanel(this.AttachItem);
    if ((!!this.PanelModel.InSelectItemBlock.IsRangeChange(this.$$l, i) || !t) && !(t = this.PanelModel.InSelectItemBlock.IsOutOfRange(i, FishingDefine_1.INTERACT_ROW_COUNT, FishingDefine_1.INTERACT_COL_COUNT), this.PanelModel.IsOutOfRange && t)) {
      this.PanelModel.IsOutOfRange = t;
      this.cXl(this.$$l);
      this.hXl(this.PanelModel.InSelectItemBlock, i);
    }
    DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(this.$$l, i);
  }
  HandleDragSuccess() {
    DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(this.X$l, this.$$l);
    this.PanelModel.InSelectItemBlock.AdsorbToAppropriatePosByAttachItem(this.X$l.RowStartIndex, this.X$l.ColStartIndex, this.AttachItem);
    this.PanelModel.BackpackPanelModel.Panel.SetButtonsState(true);
  }
  HandleDragFail() {
    this.PanelModel.InSelectItemBlock.AdsorbToAppropriatePosByAttachItem(this.X$l.RowStartIndex, this.X$l.ColStartIndex, this.AttachItem);
    this.RefreshAllBackpackGridState(false);
    this.PanelModel.BackpackPanelModel.Panel.SetButtonsState(true);
    this.PanelModel.BackpackPanelModel?.RefreshPanel(false);
  }
  RotateClick() {
    this.PanelModel.InSelectItemBlock.RotateBlock();
    this.RefreshAllBackpackGridState(false);
    this.dXl();
    this.PanelModel.BackpackPanelModel?.RefreshPanel(false);
  }
  DisableInteractItemBlock(t, i) {
    t = this.j__(t.ItemId, i.RowIndex, i.ColIndex);
    if (t) {
      t.SetItemData(undefined);
    }
  }
  EnableInteractItemBlock(t) {
    var i = this.j__(t.ItemId, this.$$l.RowStartIndex, this.$$l.ColStartIndex);
    if (i) {
      i.SetItemData(t);
    }
  }
  HandleOverlapConfirm() {
    this.nXl(this.PanelModel.InSelectItemBlock);
    this.PanelModel.ChangeShowItemData();
  }
  HandleFinishConfirm() {
    this.nXl(this.PanelModel.InSelectItemBlock);
    this.PanelModel.ChangeShowItemData();
    this.PanelModel.BackpackPanelModel?.Panel.DestroySelectItemBlock();
  }
  GetLeftTopPanelPos(t) {
    if (this.j__(t, this.$$l.RowStartIndex, this.$$l.ColStartIndex)) {
      return {
        RowIndex: this.$$l.RowStartIndex,
        ColIndex: this.$$l.ColStartIndex
      };
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Dockyard", 10, "查找不到对应的InteractItemBlock", ["ItemId", t]);
      }
      return {
        RowIndex: -1,
        ColIndex: -1
      };
    }
  }
  ResetLastBackpackGridShowType() {
    this.cXl(this.$$l);
  }
}
exports.DockyardInteractPanel = DockyardInteractPanel;
//# sourceMappingURL=DockyardInteractPanel.js.map