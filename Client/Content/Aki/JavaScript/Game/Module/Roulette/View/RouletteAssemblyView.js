"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteAssemblyView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance");
const PhantomInteractController_1 = require("../../Phantom/PhantomInteract/PhantomInteractController");
const PhantomInteractModel_1 = require("../../Phantom/PhantomInteract/PhantomInteractModel");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteInputManager_1 = require("../RouletteInputManager");
const RouletteAssemblyTabItem_1 = require("./Components/RouletteAssemblyTabItem");
const RouletteAssemblyGridItem_1 = require("./RouletteAssemblyGridItem");
const RouletteAssemblyTips_1 = require("./RouletteAssemblyTips");
class RouletteAssemblyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ts1 = undefined;
    this.vfo = undefined;
    this.Mfo = undefined;
    this.Efo = 1;
    this.ToggleLeft = undefined;
    this.ToggleRight = undefined;
    this.Sfo = undefined;
    this.yfo = undefined;
    this.Lfo = 0;
    this.Dfo = undefined;
    this.lqe = undefined;
    this.Rfo = undefined;
    this.Mpt = undefined;
    this.UOt = true;
    this.nAd = undefined;
    this.RouletteUiItem = undefined;
    this.Tkf = undefined;
    this.fpo = t => {
      this.ts1.OnRouletteTypeSwitch(t);
      this.nFm();
    };
    this.Ufo = () => {
      var t = this.Afo === 0 ? 1 : 0;
      this.Afo = t;
    };
    this.cEa = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "检测到输入设备变化,切换装配界面表现", ["新输入类型", Info_1.Info.InputControllerType]);
      }
      this.xfo();
    };
    this.wfo = t => {
      var i = this.Sfo?.GridIndex;
      this.Sfo = t;
      if (i !== undefined && i !== this.Sfo.GridIndex) {
        this.pfo.GetGridByIndex(i)?.SetGridToggleState(false);
      }
      this.pfo.SetCurrentGridByData(t);
      this.Afo = 1;
    };
    this.Bfo = (t, i) => {
      if (this.Sfo && i === 1) {
        i = this.Sfo.GridIndex === t.GridIndex;
        if (Info_1.Info.IsInGamepad() && i) {
          this.Ufo();
        }
        return !i;
      }
      return true;
    };
    this.TempKeepSelect = false;
    this.cHe = () => {
      var t = new RouletteAssemblyGridItem_1.RouletteAssemblyGridItem();
      t.BindOnExtendToggleStateChanged(this.bfo);
      t.BindOnCanExecuteChange(this.Vbt);
      return t;
    };
    this.bfo = t => {
      var i = t.State;
      var e = t.Data;
      var t = t.MediumItemGrid;
      this.yfo = e;
      if (i === 1 && (this.Mfo.DeselectCurrentGridProxy(), this.Mfo.SelectGridProxy(e.Index), this.qfo(), this.RefreshTips(), ModelManager_1.ModelManager.RouletteModel.TryRemoveNewItem(this.yfo.Id))) {
        this.Mfo.RefreshGridProxy(t.GridIndex);
      }
    };
    this.Vbt = (t, i, e) => {
      return !this.yfo || e !== 1 || this.yfo.Id !== t.Id;
    };
    this.Xpt = () => {
      var t = this.yfo;
      var i = this.Sfo.DeepCopy();
      var e = t.State === 2;
      switch (t.State) {
        case 2:
          i.Id = 0;
          i.Name = undefined;
          i.State = 2;
          if (t.GridType === 0) {
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(t.Id, 0, this.ts1.CurrentRouletteType);
          } else if (t.GridType === 2) {
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(3001, 0, this.ts1.CurrentRouletteType, t.Id);
          }
          break;
        case 0:
          i.Id = t.Id;
          i.State = 1;
          if (t.GridType === 0) {
            if ((s = this.Sfo.Id) !== 0) {
              ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(s, 0, this.ts1.CurrentRouletteType);
            }
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(t.Id, 1, this.ts1.CurrentRouletteType);
          } else if (t.GridType === 2) {
            if ((s = this.Sfo.Id) !== 0) {
              ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(3001, 0, this.ts1.CurrentRouletteType, s);
            }
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(3001, 1, this.ts1.CurrentRouletteType, t.Id);
          }
          break;
        case 1:
          {
            i.Id = t.Id;
            i.State = 1;
            var s = this.pfo.GetGridByValidId(t.Id);
            var h = s.Data;
            h.Id = this.Sfo.Id;
            if (this.Sfo.Id === 0) {
              h.State = 2;
              h.Name = undefined;
            } else {
              h.State = 1;
            }
            s.RefreshGrid(h);
            const o = h.DataIndex;
            this.Gfo(o, h);
            break;
          }
      }
      this.pfo.RefreshCurrentGridData(i);
      const o = this.Sfo.DataIndex;
      this.Gfo(o, i);
      this.Sfo = i;
      this.Esi(e);
      this.qfo();
      this.Nfo();
    };
    this.Ofo = (t, i) => {
      var e = t;
      let s = 0;
      if (this.TempKeepSelect) {
        s = this.Mfo.GetSelectedGridIndex();
        this.TempKeepSelect = false;
      } else {
        for (let t = 0; t < e.length; t++) {
          if (e[t].State === 2) {
            s = t;
          }
        }
      }
      this.kfo(s, e);
    };
    this.Ffo = t => {
      this.OZt(1, t);
    };
    this.Vfo = t => {
      this.OZt(13, t);
    };
    this.Hfo = () => {
      this.jfo();
    };
    this.Wfo = () => {
      this.CloseMe();
    };
    this.Nfo = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "保存当前轮盘数据", ["Type", this.ts1.CurrentRouletteType]);
      }
      ControllerHolder_1.ControllerHolder.RouletteController.SaveRouletteDataRequest(this.ts1.CurrentRouletteListSaveData, t => {
        if (!t) {
          this.fpo(this.ts1.CurrentRouletteType);
        }
      });
    };
    this._Ia = t => {
      t = t === 1 ? 1 : 0;
      ModelManager_1.ModelManager.RouletteModel.SaveRouletteSelectConfig(t);
    };
    this.fUf = () => {
      PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionEditView();
    };
  }
  get pfo() {
    return this.ts1.GetRouletteComponent();
  }
  OnRegisterComponent() {
    if (this.OpenParam) {
      this.ts1 = this.OpenParam;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 37, "[Roulette] 装配界面打开时未获取到参数");
    }
    this.ts1.RegisterView(this);
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIExtendToggle], [5, UE.UILoopScrollViewComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIExtendToggle], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Ffo], [4, this.Vfo], [11, this._Ia]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteItemSelect, this.wfo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteSaveDataChange, this.Hfo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteItemUnlock, this.Ufo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteItemSelect, this.wfo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteSaveDataChange, this.Hfo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteItemUnlock, this.Ufo);
  }
  async OnBeforeStartAsync() {
    this.RouletteUiItem = this.GetItem(1);
    this.Dfo = new ButtonItem_1.ButtonItem(this.GetItem(7));
    this.Dfo.SetFunction(this.Xpt);
    this.Dfo.SetActive(false);
    this.Tkf = new ButtonItem_1.ButtonItem(this.GetItem(16));
    this.Tkf.SetFunction(this.fUf);
    this.Tkf.SetUiActive(false);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.Wfo);
    this.ToggleLeft = this.GetExtendToggle(3);
    this.ToggleLeft.CanExecuteChange.Bind(() => this.$fo(this.ToggleLeft.ToggleState, 1));
    this.ToggleRight = this.GetExtendToggle(4);
    this.ToggleRight.CanExecuteChange.Bind(() => this.$fo(this.ToggleRight.ToggleState, 13));
    this.GetItem(9).SetUIActive(false);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.Ofo);
    this.Mpt.SetActive(false);
    this.Jfo();
    var t = [];
    this.Rfo = new RouletteAssemblyTips_1.RouletteAssemblyTips();
    t.push(this.Rfo.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.nAd = new RouletteAssemblyTabItem_1.RouletteAssemblyTabItem();
    this.nAd.ToggleCallBack = this.fpo;
    t.push(this.nAd.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()));
    await Promise.all(t);
    this.Rfo.SetActive(false);
    await this.ts1.OnBeforeStartAsync();
    await this.nAd.Refresh(this.ts1.TypeList);
  }
  OnStart() {
    this.tpo();
    this.ts1.Start();
  }
  OnBeforeDestroy() {
    this.ipo();
    ModelManager_1.ModelManager.RouletteModel.SaveNewItemList();
    if (this.vfo) {
      this.vfo.Destroy();
      this.vfo = undefined;
    }
    if (this.Mfo) {
      this.Mfo.ClearGridProxies();
      this.Mfo = undefined;
    }
    this.Sfo = undefined;
    this.Rfo.Destroy();
    this.Dfo.Destroy();
    this.lqe.Destroy();
    this.Mpt.Destroy();
    this.ToggleLeft = undefined;
    this.ToggleRight = undefined;
    this.ts1.Destroy();
  }
  OnBeforeShow() {
    if (this.UOt) {
      this.nAd.SelectTab(this.ts1.CurrentRouletteType);
      this.UOt = false;
    } else {
      this.Esi(true);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 95, "刷新滑动列表2", ["this.ViewProxy.AssemblyGridDataMap", this.ts1.AssemblyGridDataMap]);
      }
    }
    this.ts1.BeforeShow();
    this.Rfo?.RefreshPhantomInteractEquipmentPanel();
    this.Tkf?.BindRedDot("RedDotPhantomInteractEditEntry");
  }
  OnAfterHide() {
    this.Tkf?.UnBindGivenUid(0);
  }
  OnTick(t) {
    var [t, i] = this.vfo.Tick(t);
    this.pfo.Refresh(t, i);
  }
  nFm() {
    this.zfo();
    this.Zfo();
    this.epo();
    this.pfo.SetAllGridToggleSelfInteractive(true);
    this.pfo.AddAllGridToggleCanExecuteChangeEvent(this.Bfo);
    this.Afo = 0;
    this.jfo();
    this.opo();
  }
  get Afo() {
    return this.Lfo;
  }
  set Afo(t) {
    switch (this.Lfo = t) {
      case 0:
        this.pfo.SetTipsActive(true);
        if (Info_1.Info.IsInTouch()) {
          this.pfo.RefreshTipsByText("Text_ExploreToolsChooseMobile_Text");
          this.pfo.SetNameVisible(false);
          this.pfo.SetRingVisible(false);
        } else if (Info_1.Info.IsInGamepad()) {
          this.pfo.RefreshTipsByText("Text_ExploreToolsChoosePC_Text");
          this.pfo.SetRingVisible(true);
        } else if (Info_1.Info.IsInKeyBoard()) {
          this.pfo.RefreshTipsByText("Text_ExploreToolsChoosePC_Text");
          this.pfo.SetRingVisible(false);
        }
        this.vfo.ActivateInput(true);
        break;
      case 1:
        this.pfo.SetTipsActive(false);
        this.pfo.SetRingVisible(false);
        if (Info_1.Info.IsInTouch()) {
          this.pfo.SetNameVisible(true);
        }
        this.vfo.ActivateInput(false);
        this.rpo();
        this.Esi();
        this.qfo();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t.length === 1 || isNaN(Number(t[0]))) {
      i = Number(t[0]);
      if (i = this.Mfo?.GetGridAndScrollToByJudge(i, (t, i) => t === i.Id)) {
        return [i, i];
      } else {
        return undefined;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", t]);
    }
  }
  epo() {
    this.pfo.RefreshRouletteType();
  }
  Zfo() {
    this.pfo.RefreshRoulettePlatformType();
  }
  zfo() {
    this.pfo.RefreshRouletteInputType();
    var t = Info_1.Info.IsInGamepad();
    this.GetItem(12).SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.RouletteModel.GetRouletteSelectConfig() === 1 ? 1 : 0;
      this.GetExtendToggle(11).SetToggleState(t, false);
      t = this.GetText(13);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_ExploreToolsClose_Text");
    }
  }
  xfo() {
    this.zfo();
    this.tpo();
    this.Afo = 0;
    this.opo();
  }
  tpo() {
    this.vfo?.Destroy();
    this.vfo = undefined;
    var t = this.GetItem(1).GetLGUISpaceAbsolutePosition();
    var t = RouletteInputManager_1.AngleCalculator.ConvertLguiPosToScreenPos(t.X, t.Y);
    var i = CommonParamById_1.configCommonParamById.GetFloatConfig("Roulette_Assembly_Gamepad_DeadLimit");
    this.vfo = new RouletteInputManager_1.rouletteInputManager[Info_1.Info.InputControllerMainType](t, 0, undefined, i);
    this.vfo.BindEvent();
    this.vfo.OnInit();
    this.vfo.SetIsNeedEmpty(true);
  }
  opo() {
    this.pfo.Reset();
    var t = this.ts1.OpenParam.SelectGridIndex ?? 0;
    this.ts1.OpenParam.SelectGridIndex = 0;
    var t = this.pfo.GetGridByIndex(t);
    t.SetGridToggleState(true, false);
    t.SetGridEquipped(true);
    this.wfo(t.Data);
    if (Info_1.Info.IsInGamepad()) {
      this.Afo = 0;
    } else {
      this.Afo = 1;
    }
  }
  Jfo() {
    this.Mfo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(5), this.GetItem(6).GetOwner(), this.cHe);
  }
  lpo(t) {
    t = this.pfo.GetGridByValidId(t.Id);
    if (t) {
      return t.Data.GridIndex + 1;
    } else {
      return 0;
    }
  }
  Esi(t = false) {
    if (this.Sfo) {
      var i = this.Sfo.GridType;
      var e = this.ts1.AssemblyGridDataMap.get(i) ?? [];
      var s = [];
      for (let t = 0; t < e.length; t++) {
        var h = e[t];
        if (i === 2) {
          if (e[t].ItemType !== this.Efo) {
            continue;
          }
        }
        h.State = this._po(e[t], this.Sfo);
        h.RelativeIndex = this.lpo(e[t]);
        s.push(h);
      }
      this.TempKeepSelect = t;
      this.RefreshItemFilterSort(30, s);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "未收到选中轮盘格子数据,无法刷新");
    }
  }
  kfo(t, i) {
    this.yfo = undefined;
    this.Mfo.DeselectCurrentGridProxy();
    this.GetLoopScrollViewComponent(5).RootUIComp.SetUIActive(i.length > 0);
    this.GetItem(9).SetUIActive(i.length <= 0);
    if (i.length > 0) {
      this.Mfo.ReloadData(i);
      if (!this.Mfo.IsGridDisplaying(t)) {
        this.Mfo.ScrollToGridIndex(t);
      }
      this.Mfo.SelectGridProxy(t, true);
    } else {
      if (Info_1.Info.IsInGamepad()) {
        this.Afo = 0;
      }
      this.Rfo.SetActive(false);
      this.qfo();
      this.Tkf?.SetUiActive(false);
    }
  }
  _po(t, i) {
    let e = 0;
    let s = [];
    if (i.GridType === 2) {
      s.push(this.ts1.CurrentRouletteListSaveData.ExtraItemId);
    } else {
      s = this.ts1.CurrentRouletteListSaveData.RouletteIdList;
    }
    if (s.includes(t.Id)) {
      e = 1;
    }
    return e = t.Id === i.Id ? 2 : e;
  }
  qfo() {
    this.GetItem(14).SetUIActive(false);
    if (this.yfo) {
      if (this.yfo.GridType === 0) {
        var i = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(this.yfo.Id);
        if (!i) {
          return;
        }
        if (!ControllerHolder_1.ControllerHolder.RouletteController.CheckCanExploreSkillEquip(this.yfo.Id) || !i.AssemblyEquipButton) {
          this.Dfo.SetActive(false);
          this.GetItem(14).SetUIActive(true);
          return;
        }
      }
      let t = undefined;
      switch (this.yfo.State) {
        case 2:
          t = "Text_PhantomTakeOff_Text";
          break;
        case 1:
          t = "Text_PhantomReplace_Text";
          break;
        case 0:
          t = "Text_PhantomPutOn_Text";
      }
      this.Dfo.SetShowText(t);
      this.Dfo.SetActive(true);
    } else {
      this.Dfo.SetActive(false);
      this.Tkf?.SetUiActive(false);
    }
  }
  Gfo(t, i) {
    var e;
    if (i.GridType === 2) {
      this.ts1.CurrentRouletteListSaveData.ExtraItemId = i.Id;
    } else {
      e = this.ts1.CurrentRouletteListSaveData.RouletteIdList;
      if (t >= 0 && t < e.length) {
        e[t] = i.Id;
      }
    }
  }
  RefreshItemFilterSort(t, i) {
    this.Mpt.UpdateData(t, i);
    this.Mpt.SetActive(false);
  }
  RefreshTips() {
    let t = undefined;
    switch (this.yfo.GridType) {
      case 1:
        this.Rfo.SetActive(false);
        this.Tkf?.SetUiActive(false);
        return;
      case 0:
        this.Rfo.SetActive(true);
        t = this.upo(this.yfo);
        break;
      case 2:
        this.Rfo.SetActive(true);
        t = this.cpo(this.yfo);
    }
    this.Rfo.Refresh(t);
    this.Tkf?.SetUiActive(t.ShowPhantomInteractEquipment);
  }
  upo(t) {
    var i = new RouletteDefine_1.AssemblyTipsData();
    var e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(t.Id);
    i.GridType = 0;
    i.GridId = t.Id;
    i.TextMain = e.CurrentSkillInfo;
    i.IsIconTexture = false;
    i.IconPath = e.BackGround;
    i.HelpId = e?.HelpId ?? 0;
    i.Title = t.Name;
    i.CanSetItemNum = ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowSetNumById(t.Id);
    i.NeedItemMap = e.Cost;
    i.ShowPhantomInteractEquipment = PhantomInteractModel_1.PhantomInteractModel.CheckIsPhantomInteractExploreTool(t.Id);
    const s = new Set();
    e.Authorization.forEach((t, i) => {
      s.add(t);
    });
    i.Authorization = Array.from(s);
    return i;
  }
  cpo(t) {
    var i = new RouletteDefine_1.AssemblyTipsData();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id);
    i.GridType = 2;
    i.GridId = t.Id;
    i.BgQuality = e.QualityId;
    i.Title = t.Name;
    i.TextMain = e.AttributesDescription;
    i.TextSub = e.BgDescription;
    if (e.ItemAccess && e.ItemAccess?.length > 0) {
      for (const h of e.ItemAccess) {
        var s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(h);
        if (s) {
          s = {
            Id: h,
            Type: s?.Type,
            Text: s?.Description,
            SortIndex: s?.SortIndex,
            Function: () => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(h, t.Id);
            }
          };
          i.GetWayData.push(s);
        }
      }
    }
    return i;
  }
  rpo() {
    if (this.Sfo) {
      var i = this.Sfo.GridType === 2;
      this.GetItem(2).SetUIActive(i);
      if (i) {
        let t = this.Efo;
        i = this.Sfo.Id;
        if (i !== 0) {
          t = ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(i) ? 13 : 1;
          this.Efo = t;
        }
        (t === 1 ? this.ToggleLeft : this.ToggleRight).SetToggleState(1);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "未收到选中轮盘格子数据,无法刷新");
    }
  }
  $fo(t, i) {
    return !t || this.Efo !== i;
  }
  OZt(t, i) {
    if (i === 1 && this.Efo !== t) {
      this.Efo = t;
      (this.Efo === 1 ? this.ToggleRight : this.ToggleLeft).SetToggleState(0);
      this.Esi();
    }
  }
  jfo() {
    this.qfo();
  }
  ipo() {
    var t = this.ts1.OpenParam.EndSwitchSkillId;
    if (t !== undefined) {
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t, 0, "RouletteAssemblyView.SetExploreSkill");
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(t);
    }
  }
}
exports.RouletteAssemblyView = RouletteAssemblyView;
//# sourceMappingURL=RouletteAssemblyView.js.map