"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeCarryOnView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const UiNavigationNewController_1 = require("../../../UiNavigation/New/UiNavigationNewController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CommonManager_1 = require("../../Common/CommonManager");
const ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem");
const StarLevelComponent_1 = require("../../Common/StarLevelComponent");
const ComposeController_1 = require("../ComposeController");
const ComposeDefine_1 = require("../ComposeDefine");
const ComposeMediumItemGrid_1 = require("../Item/ComposeMediumItemGrid");
const ComposeCircleItem_1 = require("./ComposeCircleItem");
const ComposeExchangeItem_1 = require("./ComposeExchangeItem");
const GAP = 112;
const TIMERGAP = 1000;
const skipViewPrefixMap = new Map([["RoleBreachView", "AutoSynthesis_ResonatorsAscendMaterial_Num"], ["WeaponRootView", "AutoSynthesis_WeaponAscendMaterial_Num"], ["RoleSkillTreeInfoView", "AutoSynthesis_ForteUpgradeMaterial_Num"]]);
class ComposeCarryOnView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ivt = undefined;
    this.WGe = undefined;
    this.vNt = undefined;
    this.MNt = undefined;
    this.EGt = undefined;
    this.BTi = undefined;
    this.SNt = undefined;
    this.IGt = undefined;
    this.ovt = undefined;
    this.bjl = undefined;
    this.Ljl = undefined;
    this.SPe = undefined;
    this.fGt = undefined;
    this.SGt = false;
    this.yGt = 0;
    this.t6 = 1;
    this.xuo = 0;
    this.aTi = [];
    this.hTi = [];
    this.lTi = [];
    this.Tjl = [];
    this.mFi = [];
    this.xjl = false;
    this.hvt = undefined;
    this.Rjl = false;
    this.wjl = 0;
    this.GOe = undefined;
    this.v5l = undefined;
    this.Kti = 0;
    this.L6e = 0;
    this.D8l = [];
    this._um = undefined;
    this.LGt = t => {
      var i;
      this.t6 = t;
      this.DGt();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), "Text_ItemSelectSynthesisQuantityTip_text", this.t6);
      if (this.fGt && this.fGt.MainType === 1) {
        i = ComposeController_1.ComposeController.GetMaxCreateCount(this.fGt.ConfigId, this.fGt);
        this.WGe.SetAddButtonInteractive(t < i);
        this.WGe.SetReduceButtonInteractive(t > 1);
        this.MTi(true);
      }
    };
    this.CanToggleChange = () => {
      var t;
      return !this.ovt.MovingState() && (!!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t);
    };
    this.TGt = () => {
      var t = new ManufactureMaterialItem_1.ManufactureMaterialItem();
      t.BindOnCanExecuteChange(() => false);
      t.BindOnExtendToggleClicked(t => {
        t = t.Data;
        if (this.fGt.MainType === 4) {
          this.Pjl();
        } else {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.L8n);
        }
      });
      t.BindEmptySlotButtonCallback(() => {
        this.Pjl();
      });
      return t;
    };
    this.Ujl = () => {
      var t = new ComposeExchangeItem_1.ComposeExchangeItem();
      t.BindOnExtendToggleClicked(t => {
        var i = t.Data;
        this.Ljl?.SetToggleState(0);
        this.Ljl = t.MediumItemGrid.GetItemGridExtendToggle();
        if (i.UVn <= 1) {
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(i.L8n);
        } else {
          this.wjl = i.L8n;
          this.Djl();
        }
      });
      return t;
    };
    this.FNt = t => {
      var i = t.filter(t => {
        return t.ExistStartTime <= 0 || TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime);
      });
      this.xuo = 0;
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.aTi = i;
          break;
        case 2:
          this.hTi = i;
          break;
        case 3:
          this.lTi = i;
          break;
        case 4:
          this.Tjl = i;
      }
      this.BTi.DeselectCurrentGridProxy();
      this.jNt();
      if (i.length !== 0) {
        this.jTi(true);
      }
    };
    this.cHe = () => {
      var t = new ComposeMediumItemGrid_1.ComposeMediumItemGrid();
      t.BindOnExtendToggleStateChanged(this.HTi);
      return t;
    };
    this.jNt = () => {
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.BTi.RefreshByData(this.aTi);
          break;
        case 2:
          this.BTi.RefreshByData(this.hTi);
          break;
        case 3:
          this.BTi.RefreshByData(this.lTi);
          break;
        case 4:
          this.BTi.RefreshByData(this.Tjl);
      }
    };
    this.qTi = (t = 0) => {
      if (t === 0) {
        this.MNt.SetResultDataDirty();
        this.MNt.UpdateData(23, this.LNt());
        this.vNt.SetActive(true);
        this.vNt.UpdateData(23, this.LNt());
      }
      this.Ivt?.SelectToggleByIndex(t, true);
      this.YGt();
      this.GTi();
    };
    this.GTi = () => {
      this.GetButton(4).GetOwner().GetUIItem().SetUIActive(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === 1);
      var t = CommonManager_1.CommonManager.GetComposeMaxLevel();
      var i = CommonManager_1.CommonManager.GetCurrentRewardLevel();
      this.SNt.ShowLevel(i, t);
      this.QTi();
    };
    this.qdi = () => {
      if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== 4) {
        this.Kti = this.xuo;
        this.GTi();
        this.OTi();
        this.Kti = 0;
      }
    };
    this.HTi = t => {
      var i = t.Data;
      if (i !== this.fGt) {
        this.Rjl = true;
        let t = 0;
        this.BTi.DeselectCurrentGridProxy();
        switch (i.MainType) {
          case 1:
            this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(i.ConfigId).ItemId;
            t = this.aTi.indexOf(i);
            break;
          case 2:
            this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(i.ConfigId).ItemId;
            t = this.hTi.indexOf(i);
            break;
          case 3:
            this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(i.ConfigId).ItemId;
            t = this.lTi.indexOf(i);
            break;
          case 4:
            this.xuo = i.ConfigId;
            t = this.Tjl.indexOf(i);
        }
        if (this.BTi.IsGridDisplaying(t)) {
          if (i.IsNew) {
            ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey, i.ConfigId);
            i.IsNew = false;
          }
          this.BTi.SelectGridProxy(t);
          this.BTi.RefreshGridProxy(t);
          this.RefreshTips(i);
        } else {
          this.Rjl = false;
        }
      }
    };
    this.W7t = () => {
      this.CloseMe();
    };
    this.fqe = (t, i) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = t => {
      this.L6e = Time_1.Time.Now;
      t = this.mFi[t];
      if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== t && (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = t, this.GTi(), this.OTi(), this.SPe?.PlayLevelSequenceByName("Switch"), t !== 4)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, "ComposeCarryOnView");
      }
    };
    this.OTi = () => {
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.vNt.UpdateData(20, this.LNt());
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(20, this.LNt());
          break;
        case 2:
          this.vNt.UpdateData(22, this.LNt());
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(22, this.LNt());
          break;
        case 3:
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(23, this.LNt());
          break;
        case 4:
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(35, this.LNt());
      }
    };
    this.qjl = (t, i, e) => {
      if (t && this.fGt !== t && !this.Rjl && ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === i && (ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = 0, this.fGt = t, this.xjl = false, this.fGt.MainType === 3 && (this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t.ConfigId)?.ItemId ?? 0, this.RefreshPurification(false)), this.fGt.MainType === 4 && (this.xuo = t.ConfigId, this.RefreshExchange(false), this.kjl()), this.ekt(), this.AGt(), this.PGt(), this.Gjl(), this.dal(), this.B8l(), e)) {
        this.CQl();
      }
    };
    this.BNt = () => {
      this.Fjl();
      if (this.bNt()) {
        ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(() => {
          this.NTi();
        });
      } else if (this.NNt()) {
        ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(() => {
          this.OTi();
        });
      }
    };
    this.NTi = () => {
      this.Kti = this.xuo;
      this.OTi();
      this.kjl();
      this.Kti = 0;
    };
    this.$Ge = t => {
      if (t === "CompositeRewardView") {
        this.ChildPopView?.PopItem.SetActive(true);
        this.ChildPopView?.PlayLevelSequenceByName("Start");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
      }
    };
    this.Njl = (t, i) => {
      if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== t) {
        ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = t;
        this.Kti = i;
        this.GTi();
        this.OTi();
        i = this.mFi.indexOf(t);
        this.Ivt?.SelectToggleByIndex(i, true);
        this.xuo = this.Kti;
        this.Kti = 0;
        this.jjl();
      }
    };
    this.yqe = t => {
      var i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(ComposeDefine_1.composeTypeSprite[this.mFi[t]]);
      return new CommonTabData_1.CommonTabData(i, new CommonTabTitleData_1.CommonTabTitleData(ComposeDefine_1.composeTypeName[this.mFi[t]]));
    };
    this.Uye = (t, i, e) => {
      var s = new ComposeCircleItem_1.ComposeCircleItem();
      s.CreateByActorAsync(t);
      s.ButtonFunction = this.qjl;
      s.CheckToggleCanClick = this.RHl;
      s.ItemCurve = this.hvt;
      return s;
    };
    this.RHl = () => !this.ovt.MovingState();
    this.Vjl = () => {
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2;
      UiManager_1.UiManager.OpenView("ComposeLevelView");
    };
    this.L3e = () => {
      if (this.GetButton(24).IsSelfInteractive) {
        this.Rjl = true;
        if (this.fGt.MainType === 4) {
          if (this.wjl) {
            ComposeController_1.ComposeController.SendExchangeRequest(this.fGt.ConfigId, this.wjl, this.t6 * ComposeDefine_1.EXCHANGE_COUNT).finally(() => {
              this.Rjl = false;
            });
            return;
          } else {
            this.Rjl = false;
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ComposeExchangeNotFindItemTips");
            return;
          }
        }
        ComposeController_1.ComposeController.SendManufacture(this.fGt.ConfigId, this.t6).finally(() => {
          this.Rjl = false;
        });
      } else {
        ComposeController_1.ComposeController.PlayCompositeFailDisplay(() => {
          ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
        });
      }
    };
    this.jjl = () => {
      this.GetItem(26)?.SetUIActive(false);
      this.Ivt?.SetCloseBtnShowState(true);
      if (this.wjl) {
        this.EGt?.GetScrollItemByIndex(0)?.SetComposeChangeAble(true);
      }
      this.SPe?.PlayLevelSequenceByName("PopupHide");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIScrollViewWithScrollbarComponent], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIText], [21, UE.UIText], [22, UE.UIText], [23, UE.UIText], [24, UE.UIButtonComponent], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIButtonComponent], [28, UE.UILoopScrollViewComponent], [29, UE.UIItem], [30, UE.UIText], [31, UE.UIText], [32, UE.UITexture], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UISprite], [36, UE.UIHorizontalLayout], [37, UE.UIItem], [38, UE.UIText], [39, UE.UIItem], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UISprite], [43, UE.UIText]];
    this.BtnBindInfo = [[4, this.Vjl], [24, this.L3e], [27, this.jjl]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeSuccess, this.NTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeFail, this.NTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeSwitchType, this.Njl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpgradeComposeLevel, this.GTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeSuccess, this.NTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeFail, this.NTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeSwitchType, this.Njl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpgradeComposeLevel, this.GTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    if (this.GOe && TimerSystem_1.TimerSystem.Has(this.GOe)) {
      TimerSystem_1.TimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  async OnBeforeStartAsync() {
    await ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync();
    this.mFi = [3, 1, 2, 4];
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.W7t);
    this.Ivt.SetHelpButtonShowState(false);
    this.Ivt.SetCanChange(this.CanToggleChange);
    await this.Ivt.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
    await this.Ivt.RefreshTabItemByLengthAsync(this.mFi.length);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(19));
    var t = {
      MaxNumber: 0,
      ValueChangeFunction: this.LGt
    };
    this.WGe.Init(t);
    this.WGe.SetUiActive(true);
    this.WGe.SetNumberSelectTipsVisible(false);
    this.WGe.SetAddReduceButtonActive(true);
    this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(17), this.TGt);
    this.BTi = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.cHe);
    this.vNt = new FilterEntrance_1.FilterEntrance(this.GetItem(33), this.FNt);
    this.vNt.SetActive(false);
    this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(3), this.FNt);
    this.MNt.SetSortToggleState(true);
    this.SNt = new StarLevelComponent_1.StarLevelComponent(this.GetHorizontalLayout(36));
    this.IGt = new MediumItemGrid_1.MediumItemGrid();
    this.IGt.Initialize(this.GetItem(16).GetOwner());
    this.IGt.BindOnCanExecuteChange(() => false);
    this.IGt.BindOnExtendToggleClicked(t => {
      t = t.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    });
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ComposeCurve");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.hvt = await t.Promise;
    this.ovt = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(7)?.GetOwner());
    var t = this.GetItem(8);
    t.SetUIActive(false);
    this.ovt.CreateItems(t.GetOwner(), GAP, this.Uye, 0);
    this.ovt.SetControllerItem(this.GetItem(41));
    this.bjl = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(28), this.GetItem(29).GetOwner(), this.Ujl);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(43), "ComposeExchangeTips");
  }
  OnStart() {
    CommonManager_1.CommonManager.SetCurrentSystem(1);
  }
  OnBeforeShow() {
    var t = this.OpenParam;
    this.v5l = t?.SelectData;
    this._um = t?.SkipSourceView;
    this.Kti = this.v5l?.ItemId ?? 0;
    this.qTi(t ? this.mFi.indexOf(t.Type) : 0);
    this.Kti = 0;
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 3;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      t = Number(t[0]);
      t = this.mFi.indexOf(t);
      if (!(t < 0)) {
        t = this.Ivt?.GetTabItemByIndex(t)?.GetRootItem();
        if (t !== undefined) {
          return [t, t];
        }
      }
    }
  }
  MTi(t) {
    var i;
    var e;
    if (t) {
      this.GetText(14).SetUIActive(true);
      t = this.fGt;
      i = (e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t.ConfigId)).Proficiency;
      e = e.MaxProficiencyCount;
      this.ETi(t.ComposeCount, i, e, this.t6);
    } else {
      this.GetText(14).SetUIActive(false);
    }
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    if (this.fGt && ModelManager_1.ModelManager.ComposeModel?.IsInPurificationList()) {
      var t = ModelManager_1.ModelManager.ComposeModel.CalculateNeedComposeMaterialList(this.fGt.ConfigId, this.t6);
      ModelManager_1.ModelManager.ComposeModel.PurificationComposeMaterialList = t.map(t => ({
        L8n: t.ItemId,
        UVn: t.RequiredNum
      }));
      const e = t.reverse();
      this.EGt?.RefreshByData(e.map(t => ({
        L8n: t.ItemId,
        UVn: t.RequiredNum,
        K6n: true
      })), () => {
        this.EGt?.GetScrollItemList().forEach((t, i) => {
          t.SetNeedNum(e[i].RequiredNum);
        });
      });
    } else {
      t = this.EGt?.GetScrollItemList();
      if (t) {
        for (const i of t) {
          i.SetUiActive(true);
          i.SetTimes(this.t6);
        }
      }
    }
  }
  RGt(t, i) {
    var e;
    if (t) {
      this.GetTexture(32)?.SetUIActive(true);
      this.GetText(31).SetUIActive(true);
      t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ComposeController_1.ComposeController.ComposeCoinId);
      e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(ComposeController_1.ComposeController.ComposeCoinId);
      if (t < i) {
        this.GetText(31).SetText(StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", i.toString()));
      } else {
        this.GetText(31).SetText(i.toString());
      }
      this.SetTextureByPath(e.IconSmall, this.GetTexture(32));
    } else {
      this.GetTexture(32)?.SetUIActive(false);
      this.GetText(31).SetUIActive(false);
    }
  }
  ETi(t, i, e, s) {
    var e = i * e;
    var t = t * i;
    var h = e - t;
    var t = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CumulativeProficiency"), t.toString(), e.toString());
    if (h > 0) {
      e = Math.min(h, i * s);
      i = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "+" + Math.min(e, h)).concat(" ", "(", t, ")");
      this.GetText(14).SetText(i);
    } else {
      s = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "").concat(" ", "(", t, ")");
      this.GetText(14).SetText(s);
    }
  }
  LNt() {
    return this.zNt(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType);
  }
  zNt(t) {
    let i = undefined;
    switch (t) {
      case 1:
        i = ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataList();
        break;
      case 2:
        i = ModelManager_1.ModelManager.ComposeModel.GetStructureDataList();
        break;
      case 3:
        i = ModelManager_1.ModelManager.ComposeModel.GetPurificationDataList();
        break;
      case 4:
        i = ModelManager_1.ModelManager.ComposeModel.GetExchangeDataList();
        break;
      default:
        return;
    }
    return i;
  }
  QTi() {
    var t;
    if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === 1) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ReagentProductionLevel");
      this.SetSpriteByPath(t, this.GetSprite(35), false);
    }
  }
  YGt() {
    RedDotController_1.RedDotController.BindRedDot("ComposeReagentProduction", this.GetItem(34));
  }
  AGt() {
    var t;
    if (this.fGt.ExistEndTime <= 0 && this.fGt.TotalMakeCountInLimitTime <= 0) {
      this.GetText(23)?.SetUIActive(false);
    } else {
      this.xjl = true;
      this.GetText(23)?.SetUIActive(true);
      if (this.fGt.IsLimitForever) {
        t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.fGt.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime());
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), "RemainingTime", t);
      } else {
        t = ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), "RefreshTime", t);
      }
    }
  }
  MLi() {
    this.t6 = 1;
    var t;
    var i = ComposeController_1.ComposeController.GetMaxCreateCount(this.fGt.ConfigId, this.fGt);
    this.WGe.ResetLimitMaxValue();
    this.WGe.Refresh(i);
    this.WGe.SetMaxBtnShowState(i > 1);
    if (this.v5l && ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId)?.ItemId === this.v5l.ItemId && (t = this.v5l.Count - this.v5l.SelectedCount) > 0) {
      if (t <= i) {
        this.WGe.ChangeValue(t);
      } else if (i >= 1) {
        this.WGe.ChangeValue(i);
      }
    }
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetReduceButtonInteractive(this.t6 > 1);
    this.WGe.SetUiActive(this.fGt.IsUnlock > 0);
    this.GetText(30).SetUIActive(this.fGt.IsUnlock > 0);
    if (this.fGt.IsUnlock) {
      this.IGt.SetUiActive(false);
      this.EGt.SetActive(true);
      t = ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(this.fGt.ConfigId);
      [this.SGt, this.yGt, t] = this.xGt(t);
      if (ModelManager_1.ModelManager.ComposeModel?.IsInPurificationList()) {
        ModelManager_1.ModelManager.ComposeModel.PurificationComposeMaterialList = [];
        t.reverse();
        t.forEach(t => {
          ModelManager_1.ModelManager.ComposeModel.PurificationComposeMaterialList.push({
            L8n: t.L8n,
            UVn: t.UVn
          });
        });
      }
      this.EGt.RefreshByData(t, () => {
        this.DGt();
      });
    } else {
      this.IGt.SetUiActive(true);
      this.EGt.SetActive(false);
      i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
      if (t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i.FormulaItemId)) {
        i = {
          Type: 4,
          Data: i.FormulaItemId,
          ItemConfigId: i.FormulaItemId,
          BottomTextId: t.Name,
          IsProhibit: true,
          IsOmitBottomText: true
        };
        this.IGt.Apply(i);
      }
    }
  }
  Hjl() {
    this.t6 = 1;
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetReduceButtonInteractive(true);
    this.WGe.SetUiActive(false);
    this.WGe.SetMaxBtnShowState(true);
    this.GetText(30).SetUIActive(true);
    this.IGt.SetUiActive(false);
    this.EGt.SetActive(true);
    this.SGt = false;
    this.yGt = 0;
    this.wjl = 0;
    this.EGt?.RefreshByData([{
      L8n: 0,
      UVn: 0,
      K6n: true,
      IsEmpty: true
    }]);
    this.WGe.Refresh(0);
  }
  Djl(t) {
    this.EGt?.RefreshByDataAsync([{
      L8n: this.wjl,
      UVn: ComposeDefine_1.EXCHANGE_COUNT,
      K6n: true
    }]).then(t);
    this.WGe?.SetUiActive(true);
    t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.wjl);
    this.WGe?.Refresh(MathUtils_1.MathUtils.GetFloatPointFloor(t / ComposeDefine_1.EXCHANGE_COUNT));
    this.GetText(43)?.SetUIActive(false);
  }
  xGt(t) {
    let i = false;
    let e = 0;
    t = t.filter(t => t.L8n !== ComposeController_1.ComposeController.ComposeCoinId || (i = true, e = t.UVn, false));
    return [i, e, t];
  }
  jTi(t = false) {
    let i = 0;
    if (this.Kti) {
      this.Rjl = true;
    }
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        i = this.Kti ? this.wHl(this.aTi) : this.PHl(this.aTi);
        var e = this.aTi[i];
        this.RefreshTips(e);
        this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId).ItemId;
        break;
      case 2:
        i = this.Kti ? this.wHl(this.hTi) : this.PHl(this.hTi);
        e = this.hTi[i];
        this.RefreshTips(e);
        this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId).ItemId;
        break;
      case 3:
        i = this.Kti ? this.wHl(this.lTi) : this.PHl(this.lTi);
        e = this.lTi[i];
        this.RefreshTips(e);
        this.xuo = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId).ItemId;
        break;
      case 4:
        i = (i = this.Kti ? this.Tjl.findIndex(t => t.ConfigId === this.Kti) : this.Tjl.findIndex(t => t.ConfigId === this.xuo)) >= 0 ? i : 0;
        e = this.Tjl[i];
        this.RefreshTips(e);
        this.xuo = e.ConfigId;
    }
    this.BTi.DeselectCurrentGridProxy();
    if (t) {
      this.BTi.ScrollToGridIndex(i);
    }
    this.BTi.SelectGridProxy(i);
  }
  wHl(t) {
    t = t.findIndex(t => ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t.ConfigId)?.ItemId === this.Kti);
    if (t >= 0) {
      return t;
    } else {
      return 0;
    }
  }
  PHl(t) {
    t = t.findIndex(t => ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t.ConfigId)?.ItemId === this.xuo);
    if (t >= 0) {
      return t;
    } else {
      return 0;
    }
  }
  RefreshTips(t, i = true) {
    if (this.fGt && this.fGt.ConfigId !== t.ConfigId) {
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = 0;
    }
    this.fGt = t;
    this.xjl = false;
    switch (this.fGt.MainType) {
      case 1:
        this.RefreshReagentProduction();
        break;
      case 2:
        this.RefreshStructure();
        break;
      case 3:
        this.RefreshPurification(i);
        break;
      case 4:
        this.RefreshExchange(i);
    }
    this.ekt();
    this.AGt();
    this.PGt();
    this.Gjl();
    this.dal();
    this.Rjl = false;
  }
  ekt() {
    var t = ModelManager_1.ModelManager.ComposeModel;
    let i = true;
    let e = true;
    let s = true;
    let h = true;
    if (this.fGt.MainType !== 4) {
      i = t.CheckComposeMaterialEnough(this.fGt.ConfigId);
      e = t.CheckUnlock(this.fGt);
      s = t.CheckCoinEnough(this.fGt.ConfigId);
      h = t.CheckLimitCount(this.fGt);
    }
    this.GetText(38).SetText(this.ikt(e, i, s, h));
    this.GetItem(25).SetUIActive(!e || !i || !h);
    this.GetButton(24).RootUIComp.SetUIActive(e && i && h);
  }
  RefreshReagentProduction() {
    this.Wjl();
    this.MTi(true);
    this.MLi();
  }
  RefreshStructure() {
    this.Wjl();
    this.MTi(false);
    this.MLi();
  }
  RefreshPurification(t = true) {
    this.Qjl(t);
    if (this.fGt.IsUnlock <= 0) {
      this.WGe.Refresh(0);
    }
    this.MLi();
    this.Ojl();
  }
  RefreshExchange(t = true) {
    this.Qjl(t);
    if (this.fGt.IsUnlock <= 0) {
      this.WGe.Refresh(0);
    }
    this.Hjl();
    this.Ojl();
  }
  Qjl(t = true) {
    this.GetItem(5)?.SetUIActive(true);
    this.GetItem(9)?.SetUIActive(false);
    var i = this.fGt.MainType === 4 ? this.fGt.ConfigId : ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId)?.ItemId;
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i);
    this.GetText(6).SetText(i);
    if (t) {
      var e = ModelManager_1.ModelManager.ComposeModel.GetSameGroupItem(this.fGt);
      let i = 0;
      for (let t = 0; t < e.length; t++) {
        if (this.fGt === e[t]) {
          i = t;
          break;
        }
      }
      this.ovt?.ReloadView(e.length, e, i);
      this.D8l = e;
    }
  }
  Wjl() {
    this.GetItem(9)?.SetUIActive(true);
    this.GetItem(5)?.SetUIActive(false);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(t.ItemId);
    this.GetText(13).SetText(i);
    var i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t.ItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "ItemTipsHaveNum", i);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId);
    if (i && (this.SetTextureByPath(i.Icon, this.GetTexture(11)), t = ConfigManager_1.ConfigManager.ItemConfig?.GetItemAttributeDesc(t.ItemId), this.GetText(15)?.SetText(t ?? ""), t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.QualityId))) {
      this.SetSpriteByPath(t.ComposeQualityBg, this.GetSprite(10), false);
    }
  }
  ikt(t, i, e, s) {
    if (t) {
      if (i) {
        if (s) {
          return "";
        } else if ((t = ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime()) === undefined) {
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCountWithoutTime");
        } else {
          return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCount"), t);
        }
      } else {
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeMaterial");
        if (e) {
          return StringUtils_1.StringUtils.Format(i, MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Material_Text"));
        } else {
          return StringUtils_1.StringUtils.Format(i, ConfigManager_1.ConfigManager.ItemConfig.GetItemName(ComposeController_1.ComposeController.ComposeCoinId));
        }
      }
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GenericPrompt_Unlocked_TipsText");
    }
  }
  PGt() {
    var i = this.fGt;
    if (i.TotalMakeCountInLimitTime <= 0) {
      this.WGe.ResetLimitMaxValue();
      this.GetText(21).SetUIActive(false);
    } else {
      this.xjl = true;
      var e = i.TotalMakeCountInLimitTime - i.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, e));
      this.GetText(21).SetUIActive(true);
      let t = e.toString();
      if (e === 0) {
        t = StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", e.toString());
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), "MakeLimit", t, i.TotalMakeCountInLimitTime);
    }
  }
  uum() {
    return !!this.v5l && !(this.v5l.Count <= 0) && (this.fGt.MainType === 4 ? this.fGt.ConfigId === this.v5l.ItemId : ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId)?.ItemId === this.v5l.ItemId);
  }
  Gjl() {
    if (this.uum()) {
      this.xjl = true;
      this.GetText(22)?.SetUIActive(true);
      var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(this.v5l.ItemId);
      var s = this.v5l.Count;
      let t = "";
      t = e < s ? StringUtils_1.StringUtils.Format(ComposeDefine_1.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN_B, e.toString()) : StringUtils_1.StringUtils.Format(ComposeDefine_1.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN_B, e.toString());
      this.GetSprite(42)?.SetUIActive(s <= e);
      let i = undefined;
      i = this._um ? skipViewPrefixMap.get(this._um) ?? "ComposeNeedTips" : "ComposeNeedTips";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(22), i, t, "" + s);
    } else {
      this.GetText(22)?.SetUIActive(false);
    }
    this.GetText(43)?.SetUIActive(this.fGt.MainType === 4 && this.wjl === 0);
  }
  dal() {
    this.GetItem(37).SetUIActive(this.xjl);
  }
  Ojl() {
    this.GetItem(39)?.SetUIActive(true);
    this.GetItem(40)?.SetUIActive(true);
    if (this.fGt?.ConfigId === this.D8l[0].ConfigId) {
      this.GetItem(39)?.SetUIActive(false);
    }
    if (this.fGt?.ConfigId === this.D8l[this.D8l.length - 1].ConfigId) {
      this.GetItem(40)?.SetUIActive(false);
    }
  }
  CQl() {
    let i = 0;
    for (let t = 0; t < this.D8l.length; t++) {
      if (this.fGt === this.D8l[t]) {
        i = t;
        break;
      }
    }
    this.ovt?.AttachToIndex(i);
  }
  B8l() {
    let t = 0;
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        t = this.G8l(this.aTi);
        break;
      case 3:
        t = this.G8l(this.lTi);
        break;
      case 2:
        t = this.G8l(this.hTi);
        break;
      case 4:
        t = this.G8l(this.Tjl);
    }
    this.BTi?.ScrollToGridIndex(t);
    this.BTi?.SelectGridProxy(t, false);
    var i = this.BTi.UnsafeGetGridProxy(t).GetItemGridExtendToggle();
    UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForViewSameGroup(i.RootUIComp);
  }
  G8l(i) {
    var t = i.indexOf(this.fGt);
    if (t < 0) {
      for (let t = 0; t < i.length; t++) {
        if (i[t].ConfigId === this.fGt.ConfigId) {
          return t;
        }
      }
    }
    return t;
  }
  Pjl() {
    this.GetItem(26)?.SetUIActive(true);
    this.Ivt?.SetCloseBtnShowState(false);
    this.EGt?.GetScrollItemByIndex(0)?.SetComposeChangeAble(false);
    this.kjl();
    this.SPe?.PlayLevelSequenceByName("PopupShow");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, "ComposeCarryOnView");
  }
  kjl() {
    var t;
    if (this.GetItem(26).bIsUIActive) {
      (t = ModelManager_1.ModelManager.ComposeModel.GetExchangeMaterialListByGroupId(this.fGt.ExchangeGroupId).filter(t => t.L8n !== this.fGt.ConfigId)).sort((t, i) => t.UVn !== i.UVn ? i.UVn - t.UVn : t.L8n - i.UVn);
      this.bjl?.RefreshByData(t);
    }
  }
  NNt() {
    var t = this.LNt();
    if (t) {
      for (const i of t) {
        if (i.ExistEndTime > 0 && !TimeUtil_1.TimeUtil.IsInTimeSpan(i.ExistStartTime, i.ExistEndTime)) {
          return true;
        }
      }
    }
    return false;
  }
  bNt() {
    return ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTimeValue() <= 0;
  }
  Fjl() {
    if (this.fGt.ExistEndTime > 0) {
      this.AGt();
      this.dal();
    }
  }
}
exports.ComposeCarryOnView = ComposeCarryOnView;
//# sourceMappingURL=ComposeCarryOnView.js.map