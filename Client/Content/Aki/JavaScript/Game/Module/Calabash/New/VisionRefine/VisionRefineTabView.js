"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const VisionRefineAttributePanel_1 = require("./VisionRefineAttributePanel");
const VisionRefineChoosePanel_1 = require("./VisionRefineChoosePanel");
const VisionRefineCostItem_1 = require("./VisionRefineCostItem");
const VisionRefineMaterialItem_1 = require("./VisionRefineMaterialItem");
const VisionRefineSlotItem_1 = require("./VisionRefineSlotItem");
class VisionRefineTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.B1c = undefined;
    this.k1c = undefined;
    this.G1c = undefined;
    this.lqe = undefined;
    this.F1c = undefined;
    this.sBc = undefined;
    this.IRu = undefined;
    this.j1c = false;
    this.U1a = undefined;
    this.H1c = () => {
      return new VisionRefineMaterialItem_1.VisionRefineMaterialItem();
    };
    this.$1c = i => {
      if (i === "Start" || i === "ShowView" || i === "Sle") {
        UiLayer_1.UiLayer.SetShowMaskLayer("VisionRefineTabView", true);
      }
    };
    this.W1c = i => {
      if (i === "Start" || i === "ShowView" || i === "Sle") {
        UiLayer_1.UiLayer.SetShowMaskLayer("VisionRefineTabView", false);
      }
    };
    this.Q1c = () => {
      this.k1c.SetActive(false);
      this.k1c.UiViewSequence.RemoveSequenceFinishEvent("SwitchB", this.Q1c);
    };
    this.K1c = () => {
      this.k1c.SetActive(false);
      this.UiViewSequence.RemoveSequenceFinishEvent("SwitchB_1", this.K1c);
    };
    this.X1c = i => {
      this.IRu = undefined;
      this.Y1c();
    };
    this.p5t = i => {
      this.IRu = i;
      this.G1c.RefreshItemSwitch(this.IRu);
    };
    this.z1c = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(262);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.J1c = () => {
      if (this.q1c) {
        if (this.sBc !== 2 && this.q1c) {
          if (this.H_1()) {
            this.z3e(2);
          }
        } else if (this.sBc === 2 && this.$_1()) {
          ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomPolishRequest(this.q1c.GetUniqueId(), this.IRu.PropItemId);
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineLackTip");
      }
    };
    this.euc = i => {
      if (i && this.sBc === 1) {
        this.tuc();
      } else {
        if (!i) {
          this.k1c.ClearSelection();
        }
        if (this.sBc !== 1) {
          this.z3e(1);
        }
      }
    };
    this.ouc = () => {
      this.z3e(0);
    };
    this.suc = () => {
      var i = this.q1c;
      var t = this.p5t;
      var i = {
        IncId: i.GetUniqueId(),
        Callback: t
      };
      UiManager_1.UiManager.OpenView("VisionRefineAttributeSelectView", i);
    };
    this.rki = () => {
      if (this.sBc !== 1) {
        this.z3e(1);
      }
    };
    this.I3a = i => {
      this.k1c?.OnItemFuncValueChange(i);
    };
    this.huc = i => {
      var t;
      var i = {
        Response: i,
        ShowTips: true
      };
      if (this.ExtraParams && (t = this.ExtraParams).ResultShowTips !== undefined) {
        i.ShowTips = t.ResultShowTips;
      }
      UiManager_1.UiManager.OpenView("VisionRefineResultView", i, (i, t) => {
        this.k1c?.ClearSelection();
        this.z3e(0);
        this.GetItem(3).SetAlpha(1);
        if (i) {
          UiManager_1.UiManager.GetView(t).OnCloseCallback = this.hBc;
        }
      });
    };
    this.hBc = i => {
      if (i) {
        this.z3e(1);
        this.iuc();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[5, this.z1c], [2, this.J1c]];
  }
  async OnBeforeStartAsync() {
    this.B1c = new VisionRefineSlotItem_1.VisionRefineSlotItem(this.euc);
    await this.B1c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.k1c = new VisionRefineChoosePanel_1.VisionRefineChoosePanel();
    this.k1c.FilterSortGroupId = 40;
    this.k1c.OnClickCloseCallBack = this.ouc;
    this.k1c.OnChangeCallBack = this.X1c;
    var i = this.GetItem(0);
    await this.k1c.CreateByResourceIdAsync("UiItem_VisionRefineList", i);
    this.G1c = new VisionRefineAttributePanel_1.VisionRefineAttributePanel();
    this.G1c.BindClickCallBack(this.suc);
    await this.G1c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.F1c = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.H1c);
    this.U1a = new VisionRefineCostItem_1.VisionRefineCostItem();
    await this.U1a.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  OnStart() {
    this.xSd(false);
    var i = this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer();
    if (i) {
      i.BindSequenceStartEvent(this.$1c);
      i.BindSequenceCloseEvent(this.W1c);
    }
    this.z3e(0);
    this.IRu = undefined;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineResult, this.huc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
  }
  OnBeforeShow() {
    var i;
    var t;
    this.j1c = false;
    if (this.q1c && this.sBc === 0) {
      i = this.q1c.GetUniqueId();
      if (!ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i)) {
        this.k1c.ClearSelection();
        this.k1c.ShowTipsComponent(undefined);
      }
    }
    if (this.ExtraParams) {
      if ((i = this.ExtraParams).UniqueId) {
        t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i.UniqueId);
        this.k1c?.SetSelection(t);
      }
      this.z3e(i.ViewState);
    }
    this.Y1c();
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRefineRedDot(false);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineResult, this.huc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
  }
  iuc() {
    this.j1c = true;
    var i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    this.k1c.RefreshList(i);
  }
  z3e(i) {
    if (this.sBc !== i) {
      this.k1c?.SetActive(i === 1);
      this.G1c?.SetActive(i === 2);
      this.F1c?.SetActive(i !== 2);
      this.U1a?.SetActive(i === 2);
      if (this.sBc !== undefined) {
        switch (i) {
          case 1:
            this.lBc(this.sBc);
            break;
          case 0:
            this._Bc(this.sBc);
            break;
          case 2:
            this.cBc(this.sBc);
        }
      }
      this.sBc = i;
      this.Y1c();
    }
  }
  lBc(i) {
    if (!this.j1c) {
      this.iuc();
    }
    if (i === 0) {
      this.UiViewSequence.PlaySequence("SwitchA_1");
      this.k1c.UiViewSequence.PlaySequence("SwitchA");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView);
    } else if (i === 2) {
      this.UiViewSequence.PlaySequence("SwitchB_2");
      this.k1c.UiViewSequence.PlaySequence("SwitchA");
      this.xSd(false);
    }
  }
  _Bc(i) {
    if (i === 1) {
      this.UiViewSequence.PlaySequence("SwitchA_2");
      this.k1c.UiViewSequence.PlaySequence("SwitchB");
      this.k1c.UiViewSequence.AddSequenceFinishEvent("SwitchB", this.Q1c);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
    } else if (i === 2) {
      this.UiViewSequence.PlaySequence("SwitchC_1");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
      this.xSd(false);
    }
  }
  cBc(i) {
    this.xSd(true, i === 0);
    if (i === 0) {
      this.UiViewSequence.PlaySequence("SwitchC_2");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView);
    } else if (i === 1) {
      this.UiViewSequence.AddSequenceFinishEvent("SwitchB_1", this.K1c);
      this.UiViewSequence.PlaySequence("SwitchB_1");
      this.k1c.UiViewSequence.PlaySequence("SwitchB");
    }
  }
  tuc() {
    var i;
    if (this.q1c) {
      i = this.q1c;
      i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i.GetUniqueId());
      this.k1c.ShowTipsComponent(i);
    }
  }
  USd() {
    let i = true;
    var t;
    if (this.ExtraParams && (t = this.ExtraParams).SlotInteractive !== undefined) {
      i = t.SlotInteractive;
    }
    this.B1c.SetBtnInteractive(i);
  }
  Y1c() {
    this.USd();
    let i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialDefaultCost();
    if (this.q1c) {
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialCost(this.q1c.GetUniqueId());
    }
    const e = new Array();
    var t;
    var s;
    i.forEach((i, t) => {
      t = {
        ItemId: t,
        IncId: 0,
        Count: this.q1c ? i : 0,
        SelectedCount: 0
      };
      e.push(t);
    });
    this.F1c.RefreshByData(e);
    if (this.q1c) {
      s = this.q1c.GetUniqueId();
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(s);
      s = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(s);
      this.B1c.RefreshByData(s, this.sBc === 2, t.GetCost());
      s = t.GetMainPropShowAttributeList(1);
      this.G1c.RefreshItemNow(s);
      this.G1c.RefreshItemSwitch(this.IRu);
      if (i) {
        this.RGt(i);
      }
    } else {
      this.B1c.RefreshEmpty();
    }
  }
  RGt(i) {
    if (i.size === 1) {
      i.forEach((i, t) => {
        this.U1a?.SetCost(t, i);
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 87, "检查数据重构的材料消耗配置，目前只展示一个材料消耗");
    }
  }
  get q1c() {
    return this.k1c?.GetSelection();
  }
  OnClickCloseRoot() {
    return this.sBc === 2 && (this.z3e(1), true);
  }
  H_1() {
    return !!ModelManager_1.ModelManager.PhantomBattleModel.IsVisionRefineMaterialEnough(this.q1c.GetUniqueId()) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineMaterialLack"), false);
  }
  $_1() {
    return !!this.IRu || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("VisionRefineAttributeEmpty"), false);
  }
  xSd(i, t) {
    if (this.GetItem(7).bIsUIActive !== i) {
      if (this.ExtraParams) {
        var e = this.ExtraParams;
        if (e.ActiveCaptionItem !== undefined) {
          this.GetItem(7).SetUIActive(e.ActiveCaptionItem);
          return;
        }
      }
      if (!this.lqe) {
        this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
        this.lqe.SetCloseCallBack(this.rki);
      }
      this.lqe.SetUiActive(i);
      if (i && t) {
        this.UiViewSequence.PlaySequence("CaptionIn");
      }
    }
  }
}
exports.VisionRefineTabView = VisionRefineTabView;
//# sourceMappingURL=VisionRefineTabView.js.map