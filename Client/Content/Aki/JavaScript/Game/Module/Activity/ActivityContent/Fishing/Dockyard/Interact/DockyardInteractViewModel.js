"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardInteractViewModel = undefined;
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
const DockyardInteractBackpackPanelModel_1 = require("./DockyardInteractBackpackPanelModel");
const DockyardInteractPanelModel_1 = require("./DockyardInteractPanelModel");
class DockyardInteractViewModel {
  constructor() {
    this.Yzt = undefined;
    this.ConfigId = -1;
    this.ActionIncId = -1;
    this.IsComplete = false;
    this.BackpackPanelModel = new DockyardInteractBackpackPanelModel_1.DockyardInteractBackpackPanelModel();
    this.InteractPanelModel = new DockyardInteractPanelModel_1.DockyardInteractPanelModel();
    this.JXl = undefined;
    this.CloseClick = () => {
      if (this.BackpackPanelModel.IsInSelectState) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
      } else {
        this.Yzt?.CloseMe();
      }
    };
    this.CheckCurrencyItemClick = () => !this.BackpackPanelModel.IsInSelectState || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit"), false);
  }
  RegisterView(t) {
    this.Yzt = t;
    this.BackpackPanelModel.ConfigId = this.ConfigId;
    this.BackpackPanelModel.RegisterViewModel(this);
    this.InteractPanelModel.ConfigId = this.ConfigId;
    this.InteractPanelModel.RegisterViewModel(this);
    this.BackpackPanelModel.RegisterInteractPanel(this.InteractPanelModel);
    this.InteractPanelModel.RegisterBackpackPanel(this.BackpackPanelModel);
  }
  SetInSelectState(t) {
    if (!t) {
      this.Yzt?.HideTipsPanel();
    }
  }
  ItemBlockClick(t) {
    this.Yzt?.ShowTipsPanel(t);
  }
  DeleteClick() {
    var t = this.TXl();
    var i = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected();
    var t = {
      InteractId: this.ConfigId,
      LeftDataList: t,
      RightDataList: i,
      ActionIncId: this.ActionIncId,
      RemoveIncId: this.BackpackPanelModel.InSelectedBlockId,
      Callback: t => {
        if (t) {
          this.BackpackPanelModel.Panel.DestroySelectItemBlock();
        }
      }
    };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingHandIn(t);
  }
  RotateClick() {
    if (this.BackpackPanelModel.IsOutOfRange) {
      if (!this.InteractPanelModel.IsOutOfRange) {
        this.InteractPanelModel.Panel.RotateClick();
      }
    } else {
      this.BackpackPanelModel.Panel.RotateClick();
    }
  }
  ConfirmClick() {
    var t;
    var i;
    if (this.JXl) {
      if (this.JXl.CanConfirm()) {
        if (this.JXl.IsOverlap()) {
          this.JXl.Panel.HandleOverlapConfirm();
        } else {
          i = this.LXl();
          t = this.qr_();
          i = {
            InteractId: this.ConfigId,
            LeftDataList: i,
            RightDataList: t,
            ActionIncId: this.ActionIncId,
            Callback: (t, i) => {
              this.IsComplete = i;
              if (t) {
                this.JXl?.Panel.HandleFinishConfirm();
              }
              if (i) {
                this.Yzt?.OpenInteractFinishTipsView();
              }
            }
          };
          ControllerHolder_1.ControllerHolder.FishingController.RequestFishingHandIn(i);
        }
      } else {
        this.JXl.ShowScrollingTips();
      }
    }
  }
  HandleDragBegin() {
    if (this.InteractPanelModel.LastCanTickState) {
      this.JXl = this.InteractPanelModel;
    } else if (!this.BackpackPanelModel.IsOutOfRange) {
      this.JXl = this.BackpackPanelModel;
    }
  }
  HandleDragResult() {
    if (this.BackpackPanelModel.IsOutOfRange) {
      if (this.InteractPanelModel.IsOutOfRange) {
        (this.InteractPanelModel.LastCanTickState ? (this.JXl = this.InteractPanelModel, this.InteractPanelModel.Panel) : this.JXl?.Panel).HandleDragFail();
      } else {
        this.JXl = this.InteractPanelModel;
        this.InteractPanelModel.Panel.HandleDragSuccess();
      }
    } else {
      this.JXl = this.BackpackPanelModel;
      this.BackpackPanelModel.Panel.HandleDragSuccess();
    }
  }
  BackpackTick(t) {
    this.InteractPanelModel.Tick(t);
    this.BackpackPanelModel.Tick();
  }
  IsConfirmInteractive() {
    return this.InteractPanelModel.CanConfirm() || !this.BackpackPanelModel.IsSetFail;
  }
  IsConfirmNiagaraActive() {
    return this.InteractPanelModel.CanConfirm() || this.BackpackPanelModel.IsInCanConfirm;
  }
  GetItemBlockDataByIncId(t) {
    return this.BackpackPanelModel.Panel.GetOriginalItemBlockDataByIncId(t);
  }
  LXl() {
    var t;
    var i;
    var e = [];
    for (const r of this.InteractPanelModel.ShowItemMap.values()) {
      var s = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(r.Data, r.Rotate, r.Pos);
      e.push(s);
    }
    if (this.JXl === this.InteractPanelModel) {
      i = this.BackpackPanelModel.Panel.InSelectItemBlock.GetData();
      t = this.JXl.Panel.GetLeftTopPanelPos(i.Data.ItemId);
      i = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(i.Data, i.Rotate, t);
      e.push(i);
    }
    return e;
  }
  qr_() {
    var t = this.BackpackPanelModel.Panel.GetItemBlockDataList();
    if (this.JXl === this.InteractPanelModel) {
      for (const i of t) {
        if (i.b9n === this.BackpackPanelModel.InSelectedBlockId) {
          t.splice(t.indexOf(i), 1);
          break;
        }
      }
    }
    return t;
  }
  TXl() {
    var t;
    var i = [];
    for (const e of this.InteractPanelModel.ShowItemMap.values()) {
      if (e.Data.IncId !== this.BackpackPanelModel.InSelectedBlockId) {
        t = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(e.Data, e.Rotate, e.Pos);
        i.push(t);
      }
    }
    return i;
  }
}
exports.DockyardInteractViewModel = DockyardInteractViewModel;
//# sourceMappingURL=DockyardInteractViewModel.js.map