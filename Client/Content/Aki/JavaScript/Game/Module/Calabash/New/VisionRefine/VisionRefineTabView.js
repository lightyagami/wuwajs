"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashDefine_1 = require("../../CalabashDefine");
const VisionRefineAttributeItem_1 = require("./VisionRefineAttributeItem");
const VisionRefineAttributePanelLite_1 = require("./VisionRefineAttributePanelLite");
const VisionRefineChoosePanel_1 = require("./VisionRefineChoosePanel");
const VisionRefineCostItem_1 = require("./VisionRefineCostItem");
const VisionRefineInvalidTips_1 = require("./VisionRefineInvalidTips");
const VisionRefineMaterialItem_1 = require("./VisionRefineMaterialItem");
const VisionRefineRefineTab_1 = require("./VisionRefineRefineTab");
const VisionRefineSlotItem_1 = require("./VisionRefineSlotItem");
const VisionRefineSubResultView_1 = require("./VisionRefineSubResultView");
class VisionRefineTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.sAg = undefined;
    this.aAg = undefined;
    this.k1c = undefined;
    this.fRg = undefined;
    this.gRg = undefined;
    this.lqe = undefined;
    this.F1c = undefined;
    this.sBc = undefined;
    this.AOg = undefined;
    this.DOg = new Map();
    this.pRg = new Set();
    this.j1c = false;
    this.U1a = undefined;
    this.vRg = 0;
    this.yRg = undefined;
    this.SRg = undefined;
    this.MRg = undefined;
    this.ERg = undefined;
    this.H1c = () => {
      return new VisionRefineMaterialItem_1.VisionRefineMaterialItem();
    };
    this.TRg = () => new VisionRefineRefineTab_1.VisionRefineRefineTab();
    this.bRg = () => {
      var i = new VisionRefineAttributeItem_1.VisionRefineAttributeItem();
      i.OnSelectedCallback = this.RRg;
      i.OnDeselectedCallback = this.LRg;
      return i;
    };
    this.wRg = () => {
      var i = new VisionRefineSlotItem_1.VisionRefineSlotItem(this.PRg);
      i.OnGetMainPropItemIdCallback = this.ARg;
      i.OnIsShouldElementItemDownCallback = this.Ykg;
      return i;
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
      this.pRg.clear();
      this.Y1c();
    };
    this.DRg = i => {
      this.Y1c();
    };
    this.p5t = i => {
      this.CRg = i;
      this.Y1c();
      this.iuc();
    };
    this.oAg = () => {
      var i = [];
      var t = this.k1c?.CurrentSelectedList;
      if (t !== undefined) {
        for (const s of t) {
          var e = s.GetUniqueId();
          var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e);
          if (e !== undefined) {
            e = e.GetPhantomFirstMainProp().Yws;
            i.push(e);
          }
        }
      }
      return i;
    };
    this.URg = () => {
      this.gRg.RefreshItemSwitch(undefined);
      this.Y1c();
    };
    this.ARg = () => this.CRg?.PropItemId;
    this.Ykg = () => true;
    this.z1c = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(262);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.J1c = () => {
      this.k1c?.ShowTipsComponent(undefined);
      if (this.vRg === 0) {
        if (this.hAg !== undefined && this.hAg.IsSingleMode) {
          if (this.sBc !== 2) {
            return;
          }
        } else if (this.sBc !== 1) {
          this.z3e(1);
          return;
        }
        if (this.k1c?.CurrentSelectedList === undefined || this.k1c.CurrentSelectedList.length === 0) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_CHOSEN_LACK_TIP_TEXT_ID);
        } else {
          var t = this.xRg;
          if (t === undefined || t.length === 0) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_MAIN_NON_VALID_TIP_TEXT_ID);
          } else if (this.H_1() && this.$_1()) {
            if (this.hAg && this.hAg.IsSingleMode) {
              let i = undefined;
              for (const e of t) {
                i = e.GetUniqueId();
              }
              if (i !== undefined) {
                ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomPolishRequest(i, this.CRg.PropItemId);
                this.CRg = undefined;
              }
            } else {
              ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomBatchPolishRequest(t.map(i => i.GetUniqueId()), this.CRg.PropItemId);
            }
          }
        }
      } else if (this.vRg === 1) {
        if (this.q1c) {
          if (this.H_1()) {
            let i = undefined;
            var t = [];
            var s = this.pRg.size;
            var h = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineSubMaterialCost(s);
            let e = 0;
            h?.forEach((i, t) => {
              e = i;
            });
            if (this.pRg.size <= 0) {
              i = 447;
              t.push(e.toString());
            } else {
              i = 450;
              t.push(s.toString(), e.toString());
            }
            h = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i);
            h.TextArgs = t;
            h.FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomVicePolishRequest(this.q1c.GetUniqueId(), [...this.pRg]);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(h);
          }
        } else if (this.sBc === 0) {
          this.z3e(1);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_CHOSEN_LACK_TIP_TEXT_ID);
        }
      }
    };
    this.BRg = () => {
      this.k1c?.ShowTipsComponent(undefined);
      this.k1c?.ClearCurrentCostMultiChoose();
      this.CRg = undefined;
      this.Y1c();
      this.iuc();
    };
    this.kRg = i => {
      if (!i || this.sBc !== 1) {
        if (!i) {
          this.k1c.ClearSelection();
        }
        if (this.sBc !== 1) {
          this.z3e(1);
        }
      }
    };
    this.qRg = () => {
      if (this.sBc !== 1) {
        this.z3e(1);
      }
    };
    this.PRg = (i, t) => {
      t = this.k1c?.CurrentSelectedList?.[t];
      if (i) {
        this.k1c.ShowTipsComponent(t);
      } else if (!i) {
        if (t !== undefined) {
          this.k1c?.RefreshSelectionByItemData(t);
          this.k1c?.ShowTipsComponent(undefined);
        }
      }
    };
    this.ouc = () => {
      this.z3e(0);
    };
    this.suc = () => {
      if (this.k1c !== undefined) {
        this.k1c?.ShowTipsComponent(undefined);
        var s;
        var h;
        var n = this.k1c.CurrentCostType;
        if (n !== undefined) {
          let t = 0;
          switch (n) {
            case 2:
              t = 1;
              break;
            case 1:
              t = 3;
              break;
            case 0:
              t = 4;
          }
          let e = undefined;
          let i = false;
          if (this.hAg !== undefined && this.hAg.IsSingleMode) {
            e = this.hAg.UniqueId;
            i = true;
          } else {
            let i = undefined;
            for (const o of ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList()) {
              if (!(o.GetConfig().QualityId < 5)) {
                var r = o.GetConfig().Rarity;
                if (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(r).Cost === t) {
                  i = o;
                  break;
                }
              }
            }
            if (i !== undefined) {
              e = i.GetUniqueId();
            }
          }
          if (e !== undefined) {
            n = this.p5t;
            h = this.oAg;
            s = this.CRg;
            h = {
              GetSelectedPropItemIdList: h,
              Callback: n,
              DataConfirmed: i,
              IncId: e,
              SelectAttribute: s
            };
            UiManager_1.UiManager.OpenView("VisionRefineAttributeSelectView", h);
          }
        }
      }
    };
    this.RRg = i => {
      this.k1c?.ShowTipsComponent(undefined);
      if (this.pRg.size === 4) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_SUB_LOCK_ALL_TIP_TEXT_ID);
        return false;
      }
      this.pRg.add(i);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineSubMaterialCost(this.pRg.size);
      if (i !== undefined) {
        this.RGt(i);
      }
      return true;
    };
    this.LRg = i => {
      this.k1c?.ShowTipsComponent(undefined);
      if (this.pRg.size === 0) {
        return false;
      }
      this.pRg.delete(i);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineSubMaterialCost(this.pRg.size);
      if (i !== undefined) {
        this.RGt(i);
      }
      return true;
    };
    this.rki = () => {
      if (this.sBc !== 1) {
        this.z3e(1);
      }
    };
    this.I3a = i => {
      this.k1c?.OnItemFuncValueChange(i);
      this.Y1c();
    };
    this.huc = i => {
      var t;
      var i = {
        Response: i,
        ResponseBatch: undefined,
        ShowTips: true,
        PropIndexId: this.CRg?.PropIndexId
      };
      if (this.hAg && (t = this.hAg).ResultShowTips !== undefined) {
        i.ShowTips = t.ResultShowTips;
      }
      UiManager_1.UiManager.OpenView("VisionRefineResultView", i, (i, t) => {
        if (i) {
          UiManager_1.UiManager.GetView(t).OnCloseCallback = this.hBc;
          if (!this.hAg || !this.hAg.IsSingleMode) {
            this.k1c?.ClearSelection();
            this.z3e(0);
            this.GetItem(3)?.SetAlpha(1);
          }
          this.CRg = undefined;
        }
      });
    };
    this.hBc = i => {
      if (!!i && (!this.hAg || !this.hAg.IsSingleMode)) {
        this.z3e(1);
      }
    };
    this.ORg = i => {
      i = {
        Response: undefined,
        ResponseBatch: i,
        ShowTips: false,
        PropIndexId: this.CRg?.PropIndexId
      };
      UiManager_1.UiManager.OpenView("VisionRefineResultView", i, (i, t) => {
        if (i) {
          this.CRg = undefined;
          this.k1c?.ClearCurrentCostMultiChoose();
        }
      });
    };
    this.GRg = i => {
      const t = this.q1c.GetUniqueId();
      var e = new VisionRefineSubResultView_1.VisionRefineBatchResultViewData();
      e.LeftAttrList = this.FRg();
      e.RightAttrList = this.NRg(i);
      e.OnClickCancel = async () => {
        await ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomVicePolishAckRequest(t, false);
      };
      e.OnClickConfirm = async () => {
        await ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomVicePolishAckRequest(t, true);
        this.pRg?.clear();
      };
      e.UniqueId = t;
      UiManager_1.UiManager.OpenView("VisionRefineSubResultView", e);
    };
    this.VRg = (i, t) => {
      if (t) {
        this.pRg.clear();
      }
    };
  }
  get CRg() {
    var i;
    if (this.hAg !== undefined && this.hAg.IsSingleMode) {
      return this.AOg;
    } else if ((i = this.k1c?.CurrentCostType) !== undefined) {
      return this.DOg.get(i);
    } else {
      return undefined;
    }
  }
  set CRg(i) {
    var t;
    if (this.hAg !== undefined && this.hAg.IsSingleMode) {
      this.AOg = i;
    } else if ((t = this.k1c?.CurrentCostType) !== undefined) {
      if (i === undefined) {
        this.DOg.delete(t);
      } else {
        this.DOg.set(t, i);
      }
    }
  }
  get q1c() {
    if (this.vRg !== 0) {
      return this.k1c?.GetSelection();
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Calabash", 64, "只有辅音洗练才有单选逻辑");
    }
  }
  get xRg() {
    var i = this.k1c?.CurrentSelectedList;
    if (i === undefined) {
      return undefined;
    } else {
      return i.filter(i => {
        return this.CRg === undefined || (i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i.GetUniqueId())) !== undefined && this.CRg.PropItemId !== i.GetPhantomFirstMainProp().Yws;
      });
    }
  }
  get hAg() {
    if (this.ExtraParams !== undefined) {
      return this.ExtraParams;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIVerticalLayout], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIGridLayout], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIButtonComponent], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem]];
    this.BtnBindInfo = [[5, this.z1c], [2, this.J1c], [19, this.BRg]];
  }
  async OnBeforeStartAsync() {
    this.GetButton(5)?.RootUIComp.SetUIActive(false);
    this.sAg = new VisionRefineSlotItem_1.VisionRefineSlotItem(this.qRg);
    await this.sAg.CreateThenShowByActorAsync(this.GetItem(22).GetOwner());
    this.aAg = new VisionRefineSlotItem_1.VisionRefineSlotItem(this.kRg);
    await this.aAg.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.k1c = new VisionRefineChoosePanel_1.VisionRefineChoosePanel();
    this.k1c.CurrentRefineType = this.vRg;
    this.k1c.OnClickCloseCallBack = this.ouc;
    this.k1c.OnChangeCallBack = this.X1c;
    this.k1c.OnChangeMultiCallback = this.DRg;
    this.k1c.OnCostTabChangeCallback = this.URg;
    this.k1c.OnGetMainPropItemIdCallback = this.ARg;
    await this.k1c.CreateByResourceIdAsync("UiItem_VisionRefineListCost", this.GetItem(0));
    this.fRg = new VisionRefineAttributePanelLite_1.VisionRefineAttributePanelLite();
    this.fRg.BindClickCallBack(this.suc);
    await this.fRg.CreateThenShowByActorAsync(this.GetItem(23).GetOwner());
    this.fRg.RefreshTitle(CalabashDefine_1.VISION_REFINE_ATTRIBUTE_PANEL_TITLE_TEXT_ID);
    this.gRg = new VisionRefineAttributePanelLite_1.VisionRefineAttributePanelLite();
    this.gRg.BindClickCallBack(this.suc);
    await this.gRg.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.gRg.RefreshTitle(CalabashDefine_1.VISION_REFINE_ATTRIBUTE_PANEL_TITLE_TEXT_ID);
    this.F1c = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.H1c);
    this.U1a = new VisionRefineCostItem_1.VisionRefineCostItem();
    await this.U1a.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    this.yRg = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.TRg);
    await this.yRg.RefreshByDataAsync(this.HRg());
    this.SRg = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(13), this.bRg);
    this.MRg = new GenericLayout_1.GenericLayout(this.GetGridLayout(16), this.wRg);
    await this.MRg.RefreshByDataAsync(this.$Rg());
    this.ERg = new VisionRefineInvalidTips_1.VisionRefineInvalidTips();
    await this.ERg.CreateByActorAsync(this.GetItem(20).GetOwner());
  }
  OnStart() {
    this.eId(false);
    var i = this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer();
    if (i) {
      i.BindSequenceStartEvent(this.$1c);
      i.BindSequenceCloseEvent(this.W1c);
    }
    this.z3e(0);
    this.UOg();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineResult, this.huc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineBatchMainResult, this.ORg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineSubPreviewResult, this.GRg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineSubResult, this.VRg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
  }
  OnShowUiTabViewFromToggle() {
    if (this.hAg !== undefined) {
      var i = this.hAg;
      if (i.UniqueId) {
        var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i.UniqueId);
        if (t === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Calabash", 64, "当前声骸没有对应背包数据", ["uid", i.UniqueId]);
          }
          return;
        }
        this.k1c?.SetSelectionDummy(t);
        this.k1c?.SetSelection(t);
      }
      if (this.hAg.RefineType !== undefined) {
        this.vRg = this.hAg.RefineType;
        this.k1c.CurrentRefineType = this.hAg.RefineType;
      }
      this.z3e(i.ViewState, true);
    }
  }
  OnBeforeShow() {
    this.j1c = false;
    if (this.vRg !== 1) {
      this.k1c?.RemoveInvalidSelections();
    }
    this.Y1c();
    this.iuc();
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRefineRedDot(false);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineResult, this.huc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineBatchMainResult, this.ORg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineSubPreviewResult, this.GRg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineSubResult, this.VRg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
  }
  iuc() {
    var i;
    if (this.hAg === undefined || !this.hAg.IsSingleMode) {
      this.j1c = true;
      i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
      this.k1c.RefreshList(i);
    }
  }
  z3e(i, t = false) {
    if (this.sBc !== i || t) {
      this.k1c?.SetActive(i === 1);
      this.F1c?.SetActive(i !== 2);
      this.U1a?.SetActive(i === 2);
      this.yRg?.SetActive(i !== 1);
      if (i !== 1) {
        this.yRg?.RefreshByDataAsync(this.HRg());
      }
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
      this.k1c?.ShowTipsComponent(undefined);
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
      this.eId(false);
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
      this.eId(false);
    }
  }
  cBc(i) {
    this.eId(true, i === 0);
    if (i === 0) {
      this.UiViewSequence.PlaySequence("SwitchC_2");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView);
    } else if (i === 1) {
      this.UiViewSequence.AddSequenceFinishEvent("SwitchB_1", this.K1c);
      this.UiViewSequence.PlaySequence("SwitchB_1");
      this.k1c.UiViewSequence.PlaySequence("SwitchB");
    }
  }
  lAg() {
    let i = true;
    var t;
    if (this.hAg && (t = this.hAg).SlotInteractive !== undefined) {
      i = t.SlotInteractive;
    }
    (this.vRg === 0 ? this.sAg : this.aAg).SetBtnInteractive(i);
  }
  Y1c() {
    this.WRg();
    this.QRg();
    this._Ag();
    this.ITt();
  }
  ITt() {
    var i;
    if (this.hAg && this.hAg.IsSingleMode) {
      i = this.Jkg();
      this.hAg.CurrencyChangeCallback?.(i);
      this.k1c?.RefreshCurrency(undefined);
    } else {
      i = this.Jkg();
      this.k1c?.RefreshCurrency(i);
    }
  }
  Jkg() {
    const e = [];
    switch (this.vRg) {
      case 0:
        var i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialDefaultCost();
        if (i) {
          i.forEach((i, t) => {
            e.push(t);
          });
        }
        break;
      case 1:
        i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineSubMaterialDefaultCost();
        if (i) {
          i.forEach((i, t) => {
            e.push(t);
          });
        }
    }
    return e;
  }
  _Ag() {
    if (this.vRg === 0) {
      var t = this.k1c?.CurrentSelectedList;
      if (t === undefined || t.length === 0) {
        this.ERg?.SetUiActive(false);
        this.GetButton(2)?.RootUIComp.SetUIActive(true);
        return;
      }
      let i = 0;
      for (const s of t) {
        var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s.GetUniqueId());
        if (e && e.GetVisionIfCanRefine(this.vRg)) {
          i += 1;
        }
      }
      if (i === 0) {
        this.ERg?.SetUiActive(true);
        this.ERg?.RefreshExternalByData({
          LockDescriptionTextId: CalabashDefine_1.VISION_REFINE_MAIN_INVALID_REASON_TEXT_ID,
          LockDescriptionTextArgs: undefined
        });
        this.GetButton(2)?.RootUIComp.SetUIActive(false);
      } else {
        this.ERg?.SetUiActive(false);
        this.GetButton(2)?.RootUIComp.SetUIActive(true);
      }
    } else if (this.vRg === 1) {
      if (this.q1c === undefined) {
        this.ERg?.SetUiActive(false);
        this.GetButton(2)?.RootUIComp.SetUIActive(true);
      } else {
        t = !(t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.q1c.GetUniqueId())) || !t.GetVisionIfCanRefine(this.vRg);
        this.ERg?.SetUiActive(t);
        this.GetButton(2)?.RootUIComp.SetUIActive(!t);
        if (t) {
          this.ERg?.RefreshExternalByData({
            LockDescriptionTextId: CalabashDefine_1.VISION_REFINE_SUB_INVALID_REASON_TEXT_ID,
            LockDescriptionTextArgs: undefined
          });
        }
      }
    }
  }
  WRg() {
    if (this.vRg !== 0) {
      this.GetItem(21)?.SetUIActive(false);
      this.GetItem(15)?.SetUIActive(false);
      this.fRg?.SetActive(false);
    } else {
      this.GetItem(21)?.SetUIActive(this.sBc !== 1);
      this.GetItem(15)?.SetUIActive(this.sBc === 1);
      this.gRg?.SetActive(this.sBc === 1);
      if (this.sBc === 1) {
        this.gRg?.RefreshItemSwitch(this.CRg);
      }
      var i = this.sBc === 2 && this.hAg !== undefined;
      this.fRg?.SetActive(i);
      this.fRg?.RefreshInteractive(true);
      if (i) {
        this.fRg?.RefreshItemSwitch(this.CRg);
        if ((i = this.hAg?.UniqueId) !== undefined && (!(i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i)) || !i.GetVisionIfCanRefine(this.vRg))) {
          this.fRg?.RefreshInteractive(false);
        }
      }
      this.MRg?.SetActive(this.sBc === 1);
      if (this.sBc === 1) {
        var i = this.MRg?.GetLayoutItemList();
        if (i !== undefined) {
          for (var [t, e] of i.entries()) {
            var s = this.k1c.CurrentSelectedList;
            if (s !== undefined && t < s.length) {
              s = s[t].GetUniqueId();
              t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(s);
              s = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(s);
              e.RefreshByData(s, false, t.GetCost());
              e.SetBtnInteractive(true);
            } else {
              e.SetBtnInteractive(false);
              e.RefreshEmpty();
            }
          }
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), CalabashDefine_1.VISION_REFINE_SELECTED_TEXT_ID, this.k1c?.CurrentSelectedList?.length ?? 0, 10);
      }
      this.lAg();
      if (this.sBc === 2 && this.hAg !== undefined) {
        i = this.hAg.UniqueId;
        this.uAg(i, true);
      } else {
        this.uAg(undefined, true);
      }
      this.GetItem(3)?.SetUIActive(this.sBc === 0);
      this.GetItem(8)?.SetUIActive(this.sBc !== 0);
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialDefaultCost();
      if (this.sBc === 0) {
        const n = new Array();
        i.forEach((i, t) => {
          t = {
            ItemId: t,
            IncId: 0,
            Count: 0,
            SelectedCount: 0
          };
          n.push(t);
        });
        this.F1c.RefreshByData(n);
      } else {
        var h = this.xRg;
        if (h) {
          if ((h = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionListRefineMainMaterialCost(h.map(i => i.GetUniqueId()))) === undefined) {
            this.RGt(new Map([...i].map(([i]) => [i, 0])));
          } else {
            this.RGt(h);
          }
        }
      }
    }
  }
  QRg() {
    if (this.vRg !== 1) {
      this.GetItem(11)?.SetUIActive(false);
    } else {
      this.GetItem(11)?.SetUIActive(true);
      this.lAg();
      var t = this.sBc === 0 && !this.q1c;
      this.GetItem(3)?.SetUIActive(t);
      this.GetItem(8)?.SetUIActive(!t);
      let i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineSubMaterialDefaultCost();
      if (this.q1c) {
        i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineSubMaterialCost(this.pRg.size);
      }
      if (t) {
        const e = new Array();
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
      } else if (i) {
        this.RGt(i);
      } else {
        this.GetItem(8)?.SetUIActive(false);
      }
      var t = this.sBc === 1 || this.q1c !== undefined;
      this.GetItem(12)?.SetUIActive(t);
      if (this.q1c === undefined) {
        this.pRg.clear();
      }
      if (t) {
        this.SRg?.RefreshByData(this.jRg());
      }
      if (this.q1c) {
        t = this.q1c.GetUniqueId();
        this.uAg(t, this.sBc === 2);
      } else {
        this.aAg.RefreshEmpty();
      }
    }
  }
  uAg(i, t) {
    var e;
    var s = this.vRg === 0 ? this.sAg : this.aAg;
    if (i === undefined) {
      s.RefreshEmpty();
    } else {
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i);
      i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i);
      s.RefreshByData(i, t, e.GetCost());
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
  OnClickCloseRoot() {
    return this.sBc === 2 && (this.z3e(1), true);
  }
  H_1() {
    if (this.vRg === 0) {
      var i = this.xRg;
      if (i === undefined) {
        return false;
      }
      var t = [];
      for (const e of i) {
        t.push(e.GetUniqueId());
      }
      if (ModelManager_1.ModelManager.PhantomBattleModel.IsVisionListRefineMainMaterialEnough(t)) {
        return true;
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_MATERIAL_LACK_TIP_TEXT_ID);
        return false;
      }
    }
    return this.vRg === 1 && ((i = this.pRg.size) >= 5 ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_SUB_LOCK_ALL_TIP_TEXT_ID), false) : !!ModelManager_1.ModelManager.PhantomBattleModel.IsVisionRefineSubMaterialEnough(i) || (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_MATERIAL_LACK_TIP_TEXT_ID), false));
  }
  $_1() {
    return !!this.CRg || (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_MAIN_NOT_CHOOSE_ATTRIBUTE_TIP_TEXT_ID), false);
  }
  eId(i, t) {
    if (this.GetItem(7).bIsUIActive !== i) {
      if (this.hAg) {
        var e = this.hAg;
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
  HRg() {
    var i = [];
    for (const [e, s] of CalabashDefine_1.visionRefineRefineMap) {
      var t = new VisionRefineRefineTab_1.VisionRefineRefineTabData();
      t.IsChosen = e === this.vRg;
      t.RefineType = e;
      t.TabTextId = s;
      t.OnClick = () => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Calabash", 64, "点击主音辅音tab", ["type", e]);
        }
        this.KRg(e);
        this.vRg = e;
        this.k1c.CurrentRefineType = e;
        this.Y1c();
        this.iuc();
      };
      t.CanChangeExecute = i => i !== this.vRg;
      i.push(t);
    }
    return i;
  }
  KRg(i) {
    if (this.yRg !== undefined) {
      for (const t of this.yRg.GetLayoutItemList()) {
        if (t.CheckChosen(i)) {
          t.OnSelected(false);
        } else {
          t.OnDeselected(false);
        }
      }
    }
  }
  jRg() {
    var t = [];
    if (this.q1c === undefined) {
      var e = new VisionRefineAttributeItem_1.VisionRefineAttributeItemData();
      for (let i = 0; i < 5; i++) {
        e.NameTextId = CalabashDefine_1.VISION_REFINE_UNSELECTED_TEXT_ID;
        e.CanInteractive = false;
        e.ForceCheckboxActive = false;
        t.push(e);
      }
    } else {
      var i = this.q1c.GetUniqueId();
      var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(i)?.GetEquipmentViewPreviewData();
      for (let i = 0; i < 5; i++) {
        var h = new VisionRefineAttributeItem_1.VisionRefineAttributeItemData();
        if (s !== undefined && s[i] !== undefined && s[i].PhantomSubProp !== undefined) {
          h.NameTextId = s[i].GetSubPropName();
          h.NumberText = s[i].GetAttributeValueString();
          h.IsChosen = this.pRg.has(i);
          var n = s[i].PhantomSubProp.Yws;
          const r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(n);
          h.IsRecommend = !!this.hAg?.RecommendRefineSubList && this.hAg.RecommendRefineSubList.find(i => i.GetAttrId() === r.PropId && i.GetAddType() === r.AddType) !== undefined;
          h.CanInteractive = s.length === 5;
          h.ForceCheckboxActive = true;
        } else {
          h.NameTextId = CalabashDefine_1.VISION_REFINE_NON_UPGRADE_TEXT_ID;
          h.CanInteractive = false;
          h.ForceCheckboxActive = false;
        }
        t.push(h);
      }
    }
    return t;
  }
  FRg() {
    return ControllerHolder_1.ControllerHolder.CalabashController.BuildRefineSubVerticalLeftDataByUid(this.q1c?.GetUniqueId(), this.pRg, this.hAg?.RecommendRefineSubList);
  }
  NRg(i) {
    return ControllerHolder_1.ControllerHolder.CalabashController.BuildRefineSubVerticalRightDataByUid(this.q1c?.GetUniqueId(), i.Wws, this.pRg, this.hAg?.RecommendRefineSubList);
  }
  $Rg() {
    var t = [];
    for (let i = 0; i < 10; i++) {
      t.push(new VisionRefineSlotItem_1.VisionRefineSlotItemData());
    }
    return t;
  }
  UOg() {
    this.AOg = undefined;
    this.DOg.clear();
  }
}
exports.VisionRefineTabView = VisionRefineTabView;
//# sourceMappingURL=VisionRefineTabView.js.map