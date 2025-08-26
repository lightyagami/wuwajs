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
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteComponentAssembly_1 = require("../RouletteComponent/RouletteComponentAssembly");
const RouletteInputManager_1 = require("../RouletteInputManager");
const RouletteAssemblyGridItem_1 = require("./RouletteAssemblyGridItem");
const RouletteAssemblyTips_1 = require("./RouletteAssemblyTips");
class RouletteAssemblyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ffo = 0;
    this.pfo = undefined;
    this.vfo = undefined;
    this.Mfo = undefined;
    this.Efo = 1;
    this.ToggleLeft = undefined;
    this.ToggleRight = undefined;
    this.Sfo = undefined;
    this.yfo = undefined;
    this.Ifo = undefined;
    this.Tfo = undefined;
    this.Lfo = 0;
    this.Dfo = undefined;
    this.lqe = undefined;
    this.Rfo = undefined;
    this.Mpt = undefined;
    this.UOt = true;
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
      var e = this.Sfo?.GridIndex;
      this.Sfo = t;
      if (e !== undefined && e !== this.Sfo.GridIndex) {
        this.pfo.GetGridByIndex(e)?.SetGridToggleState(false);
      }
      this.pfo.SetCurrentGridByData(t);
      this.Afo = 1;
    };
    this.Bfo = (t, e) => {
      if (this.Sfo && e === 1) {
        e = this.Sfo.GridIndex === t.GridIndex;
        if (Info_1.Info.IsInGamepad() && e) {
          this.Ufo();
        }
        return !e;
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
      var e = t.State;
      var i = t.Data;
      var t = t.MediumItemGrid;
      this.yfo = i;
      if (e === 1 && (this.Mfo.DeselectCurrentGridProxy(), this.Mfo.SelectGridProxy(i.Index), this.qfo(), this.RefreshTips(), ModelManager_1.ModelManager.RouletteModel.TryRemoveRedDotItem(this.yfo.Id))) {
        t.RefreshRedDot();
      }
    };
    this.Vbt = (t, e, i) => {
      return !this.yfo || i !== 1 || this.yfo.Id !== t.Id;
    };
    this.Xpt = () => {
      var t = this.yfo;
      var e = this.Sfo.DeepCopy();
      var i = t.State === 2;
      switch (t.State) {
        case 2:
          e.Id = 0;
          e.Name = undefined;
          e.State = 2;
          if (t.GridType === 0) {
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(t.Id, 0);
          } else if (t.GridType === 2) {
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(3001, 0, t.Id);
          }
          break;
        case 0:
          e.Id = t.Id;
          e.State = 1;
          if (t.GridType === 0) {
            if ((s = this.Sfo.Id) !== 0) {
              ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(s, 0);
            }
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(t.Id, 1);
          } else if (t.GridType === 2) {
            if ((s = this.Sfo.Id) !== 0) {
              ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(3001, 0, s);
            }
            ModelManager_1.ModelManager.RouletteModel.SendExploreToolEquipLogData(3001, 1, t.Id);
          }
          break;
        case 1:
          {
            e.Id = t.Id;
            e.State = 1;
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
      this.pfo.RefreshCurrentGridData(e);
      const o = this.Sfo.DataIndex;
      this.Gfo(o, e);
      this.Sfo = e;
      this.Esi(i);
      this.qfo();
      this.Nfo();
    };
    this.Ofo = (t, e) => {
      var i = t;
      let s = 0;
      if (this.TempKeepSelect) {
        s = this.Mfo.GetSelectedGridIndex();
        this.TempKeepSelect = false;
      } else {
        for (let t = 0; t < i.length; t++) {
          if (i[t].State === 2) {
            s = t;
          }
        }
      }
      this.kfo(s, i);
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
        Log_1.Log.Info("Phantom", 37, "保存当前轮盘数据");
      }
      var t = this.Tfo.get(0);
      var e = this.Tfo.get(1);
      var i = this.Tfo.get(2);
      ControllerHolder_1.ControllerHolder.RouletteController.SaveCurrentRouletteData(t, e, i[0], false);
    };
    this._Ia = t => {
      t = t === 1 ? 1 : 0;
      ModelManager_1.ModelManager.RouletteModel.SaveRouletteSelectConfig(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIExtendToggle], [5, UE.UILoopScrollViewComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIExtendToggle], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem]];
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
    this.Rfo = new RouletteAssemblyTips_1.RouletteAssemblyTips();
    await this.Rfo.CreateByActorAsync(this.GetItem(8).GetOwner());
    this.Rfo.SetActive(false);
  }
  OnStart() {
    var t = this.OpenParam;
    this.ffo = t.RouletteType ?? 0;
    this.Dfo = new ButtonItem_1.ButtonItem(this.GetItem(7));
    this.Dfo.SetFunction(this.Xpt);
    this.Dfo.SetActive(false);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    var t = this.ffo === 0 ? "Text_ExploreToolsTitle_Text" : "Text_FuncToolsTitle_Text";
    this.lqe.SetTitleLocalText(t);
    this.lqe.SetCloseCallBack(this.Wfo);
    this.ToggleLeft = this.GetExtendToggle(3);
    this.ToggleLeft.CanExecuteChange.Bind(() => this.$fo(this.ToggleLeft.ToggleState, 1));
    this.ToggleRight = this.GetExtendToggle(4);
    this.ToggleRight.CanExecuteChange.Bind(() => this.$fo(this.ToggleRight.ToggleState, 13));
    this.GetItem(9).SetUIActive(false);
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.Ofo);
    this.Mpt.SetActive(false);
    this.Yfo();
    this.Jfo();
    var t = this.GetItem(1);
    if (this.ffo === 0) {
      this.pfo = new RouletteComponentAssembly_1.RouletteComponentAssemblyExplore();
    } else {
      this.pfo = new RouletteComponentAssembly_1.RouletteComponentAssemblyFunction();
    }
    this.pfo.SetRootActor(t.GetOwner(), true);
    this.zfo();
    this.Zfo();
    this.epo();
    this.pfo.SetAllGridToggleSelfInteractive(true);
    this.pfo.AddAllGridToggleCanExecuteChangeEvent(this.Bfo);
    this.tpo();
    this.Afo = 0;
    this.jfo();
  }
  OnBeforeHide() {
    this.ipo();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.RouletteModel.SaveRedDotItemList();
    if (this.pfo) {
      this.pfo.Destroy();
      this.pfo = undefined;
    }
    if (this.vfo) {
      this.vfo.Destroy();
      this.vfo = undefined;
    }
    if (this.Mfo) {
      this.Mfo.ClearGridProxies();
      this.Mfo = undefined;
    }
    this.Sfo = undefined;
    if (this.Ifo) {
      this.Ifo.clear();
    }
    if (this.Tfo) {
      this.Tfo.clear();
    }
    this.Rfo.Destroy();
    this.Dfo.Destroy();
    this.lqe.Destroy();
    this.Mpt.Destroy();
    this.Mpt.ClearComponentsData();
    this.ToggleLeft = undefined;
    this.ToggleRight = undefined;
  }
  OnBeforeShow() {
    if (this.UOt) {
      this.opo();
      this.UOt = false;
    }
  }
  OnTick(t) {
    var [t, e] = this.vfo.Tick(t);
    this.pfo.Refresh(t, e);
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
    var e;
    if (t.length === 1 || isNaN(Number(t[0]))) {
      e = Number(t[0]);
      if (e = this.Mfo?.GetGridAndScrollToByJudge(e, (t, e) => t === e.Id)) {
        return [e, e];
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
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("Roulette_Assembly_Gamepad_DeadLimit");
    this.vfo = new RouletteInputManager_1.rouletteInputManager[Info_1.Info.InputControllerMainType](t, 0, undefined, e);
    this.vfo.BindEvent();
    this.vfo.OnInit();
    this.vfo.SetIsNeedEmpty(true);
  }
  opo() {
    this.pfo.Reset();
    var t = this.OpenParam.SelectGridIndex ?? 0;
    this.pfo.GetGridByIndex(t).SetGridToggleState(true);
    if (Info_1.Info.IsInGamepad()) {
      this.Afo = 0;
    } else {
      this.Afo = 1;
    }
  }
  Yfo() {
    var t = ModelManager_1.ModelManager.RouletteModel;
    this.Ifo = t.CreateAssemblyGridData();
    this.Tfo = t.CreateTempAssemblyIdListData(t.ExploreSkillIdListServer, t.FunctionIdListServer, t.CurrentEquipItemId);
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
      var e = this.Sfo.GridType;
      var i = this.Ifo.get(e);
      var s = [];
      for (let t = 0; t < i.length; t++) {
        var h = i[t];
        if (e === 2) {
          if (i[t].ItemType !== this.Efo) {
            continue;
          }
        }
        h.State = this._po(i[t], this.Sfo);
        h.RelativeIndex = this.lpo(i[t]);
        s.push(h);
      }
      this.TempKeepSelect = t;
      this.RefreshItemFilterSort(30, s);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "未收到选中轮盘格子数据,无法刷新");
    }
  }
  kfo(t, e) {
    this.yfo = undefined;
    this.Mfo.DeselectCurrentGridProxy();
    this.GetLoopScrollViewComponent(5).RootUIComp.SetUIActive(e.length > 0);
    this.GetItem(9).SetUIActive(e.length <= 0);
    if (e.length > 0) {
      this.Mfo.ReloadData(e);
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
    }
  }
  _po(t, e) {
    let i = 0;
    if (this.Tfo.get(e.GridType).includes(t.Id)) {
      i = 1;
    }
    return i = t.Id === e.Id ? 2 : i;
  }
  qfo() {
    this.GetItem(14).SetUIActive(false);
    if (this.yfo) {
      if (this.yfo.GridType === 0) {
        if (!ControllerHolder_1.ControllerHolder.RouletteController.CheckCanExploreSkillEquip(this.yfo.Id)) {
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
    }
  }
  Gfo(t, e) {
    var i = this.Tfo.get(e.GridType);
    if (t >= 0 && t < i.length) {
      this.Tfo.get(e.GridType)[t] = e.Id;
    }
  }
  RefreshItemFilterSort(t, e) {
    this.Mpt.UpdateData(t, e);
    this.Mpt.SetActive(false);
  }
  RefreshTips() {
    let t = undefined;
    switch (this.yfo.GridType) {
      case 1:
        this.Rfo.SetActive(false);
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
  }
  upo(t) {
    var e = new RouletteDefine_1.AssemblyTipsData();
    var i = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(t.Id);
    e.GridType = 0;
    e.GridId = t.Id;
    e.TextMain = i.CurrentSkillInfo;
    e.IsIconTexture = false;
    e.IconPath = i.BackGround;
    e.HelpId = i?.HelpId ?? 0;
    e.Title = t.Name;
    e.CanSetItemNum = ModelManager_1.ModelManager.RouletteModel.GetExploreSkillShowSetNumById(t.Id);
    e.NeedItemMap = i.Cost;
    const s = new Set();
    i.Authorization.forEach((t, e) => {
      s.add(t);
    });
    e.Authorization = Array.from(s);
    return e;
  }
  cpo(t) {
    var e = new RouletteDefine_1.AssemblyTipsData();
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.Id);
    e.GridType = 2;
    e.GridId = t.Id;
    e.BgQuality = i.QualityId;
    e.Title = t.Name;
    e.TextMain = i.AttributesDescription;
    e.TextSub = i.BgDescription;
    if (i.ItemAccess && i.ItemAccess?.length > 0) {
      for (const h of i.ItemAccess) {
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
          e.GetWayData.push(s);
        }
      }
    }
    return e;
  }
  rpo() {
    if (this.Sfo) {
      var e = this.Sfo.GridType === 2;
      this.GetItem(2).SetUIActive(e);
      if (e) {
        let t = this.Efo;
        e = this.Sfo.Id;
        if (e !== 0) {
          t = ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(e) ? 13 : 1;
          this.Efo = t;
        }
        (t === 1 ? this.ToggleLeft : this.ToggleRight).SetToggleState(1);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "未收到选中轮盘格子数据,无法刷新");
    }
  }
  $fo(t, e) {
    return !t || this.Efo !== e;
  }
  OZt(t, e) {
    if (e === 1 && this.Efo !== t) {
      this.Efo = t;
      (this.Efo === 1 ? this.ToggleRight : this.ToggleLeft).SetToggleState(0);
      this.Esi();
    }
  }
  jfo() {
    this.qfo();
  }
  ipo() {
    var t = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId !== 0;
    var e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    var i = this.OpenParam;
    if (e === 3002 && t) {
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3001);
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(3001);
    } else if ((e = i.EndSwitchSkillId) !== undefined && (e !== 3001 || !!t)) {
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
      ControllerHolder_1.ControllerHolder.RouletteController.ExploreSkillSetRequest(e);
    }
  }
}
exports.RouletteAssemblyView = RouletteAssemblyView;
//# sourceMappingURL=RouletteAssemblyView.js.map