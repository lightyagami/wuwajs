"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PnlHeadBox = exports.PnlTeam = exports.BtnGo = exports.TargetTog = exports.HonamiStoryLevelInfoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const DifficultUnlockTipView_1 = require("../../InstanceDungeon/DifficultUnlockTipView");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryBozaiTalkPanel_1 = require("./Items/HonamiStoryBozaiTalkPanel");
const HonamiStoryProfitPanel_1 = require("./Items/HonamiStoryProfitPanel");
const HonamiStoryQuestPanel_1 = require("./Items/HonamiStoryQuestPanel");
const safeColor = UE.Color.FromHex("#59859C");
const averageColor = UE.Color.FromHex("#6982D1");
const hardColor = UE.Color.FromHex("#A04661");
class HonamiStoryLevelInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ezm = 0;
    this.tzm = 0;
    this.izm = 0;
    this.rzm = 0;
    this.lqe = undefined;
    this.S9_ = undefined;
    this.ofm = undefined;
    this.nfm = undefined;
    this.sfm = undefined;
    this.afm = undefined;
    this.kfm = undefined;
    this.zLm = undefined;
    this.Hea = undefined;
    this.uDm = new Map([[1, 11], [2, 11], [3, 12], [4, 12], [5, 12]]);
    this.Wim = undefined;
    this.hfm = undefined;
    this.ufm = 1;
    this.lfm = 1;
    this._fm = 1;
    this.g0m = false;
    this.cfm = undefined;
    this.hvm = false;
    this.lvm = false;
    this._vm = false;
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_READYGO);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.sh_ = () => {
      if (this.hfm !== 0) {
        this.dfm(0);
      }
    };
    this.nh_ = () => {
      if (this._vm) {
        if (this.hfm !== 1) {
          if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot)) {
            this.nfm.SetRedDotShow(false);
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot, false);
          }
          this.dfm(1);
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_TowerUnlockedPrompt");
        this.nfm.GetTog.SetToggleState(0, false);
      }
    };
    this.Bpt = i => i !== this.hfm;
    this.cFm = "";
    this.$An = i => {
      if (i === "Enter04" && this.cFm) {
        this.SetTextureByPath(this.cFm, this.GetTexture(0));
      }
    };
    this.mfm = () => {
      switch (this.hfm) {
        case 0:
          if (!(this.ufm > this.ezm)) {
            return;
          }
          --this.ufm;
          this.lfm = this.ufm;
          break;
        case 1:
          if (!(this.ufm > this.izm)) {
            return;
          }
          --this.ufm;
          this._fm = this.ufm;
      }
      var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm);
      this.cfm = i.DangerLv;
      this.iHd();
      this.ffm();
      this.uvm();
      this.sfm.SetCostData(i.ConsumeItems);
    };
    this.Cfm = () => {
      switch (this.hfm) {
        case 0:
          if (!(this.ufm < this.tzm)) {
            return;
          }
          this.ufm += 1;
          this.lfm = this.ufm;
          break;
        case 1:
          if (!(this.ufm < this.rzm)) {
            return;
          }
          this.ufm += 1;
          this._fm = this.ufm;
      }
      var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm);
      this.cfm = i.DangerLv;
      this.iHd();
      this.ffm();
      this.uvm();
      this.sfm.SetCostData(i.ConsumeItems);
    };
    this.C0m = () => {
      this.g0m = this.GetExtendToggle(16).GetToggleState() === 1;
      this.sfm.RefreshView();
    };
  }
  get GetCurTarget() {
    return this.hfm;
  }
  get GetCurDangerLv() {
    return this.ufm;
  }
  get GetIsBuySafe() {
    return this.g0m;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UISprite], [16, UE.UIExtendToggle], [17, UE.UIText], [18, UE.UITexture], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIText]];
    this.BtnBindInfo = [[13, this.mfm], [14, this.Cfm], [16, this.C0m]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.ofm = new TargetTog();
    this.ofm.CanToggleChange = this.Bpt;
    this.nfm = new TargetTog();
    this.nfm.CanToggleChange = this.Bpt;
    this.sfm = new BtnGo();
    this.afm = new PnlTeam();
    this.S9_ = new HonamiStoryQuestPanel_1.HonamiStoryQuestPanel();
    this.kfm = new HonamiStoryBozaiTalkPanel_1.HonamiStoryBozaiTalkPanel();
    this.zLm = new HonamiStoryProfitPanel_1.HonamiStoryProfitPanel();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var i = [this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.ofm.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.nfm.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.sfm.CreateThenShowByActorAsync(this.GetItem(20).GetOwner()), this.afm.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.S9_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.kfm.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()), this.zLm.CreateThenShowByActorAsync(this.GetItem(23).GetOwner())];
    await Promise.all(i);
    this.lqe.SetHelpCallBack(this.pcr);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.Wim = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (this.Wim) {
      i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(this.Wim.Id);
      this.ezm = i.OriAreaDangerLevel;
      this.tzm = i.MaxAreaDangerLevel;
      this.izm = i.OriTopTowerDangerLevel;
      this.rzm = i.MaxTopTowerDangerLevel;
      this.sfm.SetPnlSelectLv(this);
      this.hvm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10121);
      this.lvm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10115);
      this._vm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10120);
      if (this.hvm) {
        this.lfm = this.Wim.CurHonamiLv;
      } else {
        this.lfm = this.Wim.GetCurrentProgressAreaDataId();
      }
      this._fm = this.Wim.CurTowerLv;
      if (this._vm) {
        this.dfm(this.Wim.CurTarget);
      } else {
        this.dfm(0);
        this.cFm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfig(this.lfm).LvSelectBgPath;
      }
      this.SetTextureByPath(this.cFm, this.GetTexture(0));
      i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm);
      this.cfm = i.DangerLv;
      await this.lqe.SetCurrencyItemList([this.Wim.OutCoinItemId]);
      this.ofm.RefreshTog(0, true);
      this.ofm.OnClickToggleBack = this.sh_;
      this.ofm.SetRedDotShow(false);
      this.nfm.RefreshTog(1, this._vm);
      this.nfm.OnClickToggleBack = this.nh_;
      this.nfm.SetRedDotShow(false);
      this.S9_.Refresh(this.hfm === 0);
      this.zLm.RefreshNormal();
      this.iHd();
      this.ffm();
      this.uvm();
      this.sfm.SetCostData(i.ConsumeItems);
      this.sfm.SetRedDotShow(false);
      i = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(1);
      this.kfm.SetTalkInfoTextAndPlayAudio(i);
    }
  }
  OnBeforeShow() {
    this.afm.RefreshView();
    this.S9_.Refresh(this.hfm === 0);
    this.zLm.RefreshNormal();
    this.vEm();
    this.yEm();
    this.sfm.RefreshView();
  }
  OnAfterShow() {
    this.q0m();
    this.JCm();
    let i = 13;
    if (!this.hvm && this.uDm.has(this.ufm)) {
      i = this.uDm.get(this.ufm);
    }
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(i);
    this.kfm.SetTalkInfoTextAndPlayAudio(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeHide() {
    this.Wim.CurTarget = this.hfm;
    this.Wim.CurHonamiLv = this.lfm;
    this.Wim.CurTowerLv = this._fm;
  }
  GetCurSafeLeavePrice() {
    if (this.lvm && this.hfm === 0 && this.g0m) {
      return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm).SafeLeavePrice;
    } else {
      return 0;
    }
  }
  q0m() {
    var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvAreaUnLockTips) ?? undefined;
    if (i) {
      for (const s of [...i.keys()].sort((i, t) => i - t)) {
        if (i.get(s)) {
          var t;
          var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfig(s);
          if (e && e.UnLockTips) {
            (t = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = e.UnLockTips;
            UiManager_1.UiManager.OpenView("DifficultUnlockTipView", t);
            i.set(s, false);
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvAreaUnLockTips, i);
            return;
          }
        }
      }
    }
  }
  JCm() {
    var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTips) ?? true;
    if (this._vm && i) {
      (i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "HonamiStory_LevelUnlocked_6";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i);
      this.nfm.SetRedDotShow(true);
      this.sfm.SetRedDotShow(true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTips, false);
    }
  }
  vEm() {
    var i;
    if (!this.hvm) {
      i = this.Wim.GetHonamiStoryAreaDataList().length;
      if (this.ufm <= i && this.Wim.GetHonamiStoryAreaData(this.ufm).IsAreaCanEnter) {
        this.ofm.SetRedDotShow(true);
        this.sfm.SetRedDotShow(true);
      }
    }
  }
  yEm() {
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot)) {
      this.nfm.SetRedDotShow(true);
    }
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot)) {
      this.sfm.SetRedDotShow(true);
    }
  }
  dfm(i) {
    switch (i) {
      case 0:
        this.hfm = 0;
        this.ufm = this.lfm;
        this.ofm.GetTog.SetToggleState(1, false);
        this.nfm.GetTog.SetToggleState(0, false);
        this.cFm = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("HonamiSelectLvBg1");
        break;
      case 1:
        this.hfm = 1;
        this.ufm = this._fm;
        this.ofm.GetTog.SetToggleState(0, false);
        this.nfm.GetTog.SetToggleState(1, false);
        this.cFm = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("HonamiSelectLvBg2");
    }
    this.Hea?.StopSequenceByKey("Switch");
    this.Hea?.PlayLevelSequenceByName("Switch");
    var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm);
    this.cfm = i.DangerLv;
    this.iHd();
    this.ffm();
    var t = this.hfm === 0;
    this.S9_.Refresh(t);
    this.GetText(24).SetUIActive(t);
    this.GetText(6).SetUIActive(t);
    this.uvm();
    this.sfm.SetCostData(i.ConsumeItems);
  }
  iHd() {
    var i;
    var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm);
    if (this.hfm === 0) {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10121)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), "HonamiStory_FreeRegionName");
      } else {
        i = this.Wim.GetHonamiStoryAreaData(this.ufm).Config.LvSelectName;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), i);
      }
    } else {
      i = this.Wim.TowerName;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), i);
    }
    this.GetText(5).SetText(t.LvShow);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.FallQuaId);
  }
  uvm() {
    var i;
    var t = this.GetExtendToggle(16);
    var e = this.GetText(17);
    var s = this.GetTexture(18);
    var h = this.GetText(19);
    if (this.hfm === 0) {
      if (this.lvm) {
        t.RootUIComp.SetUIActive(true);
        e.SetUIActive(true);
        s.SetUIActive(true);
        h.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "HonamiStory_ExtractionChargeBuy");
        i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Wim.OutCoinItemId).Icon;
        this.SetTextureByPath(i, this.GetTexture(18));
        i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.ufm);
        this.GetText(19).SetText(i.SafeLeavePrice.toString());
      } else {
        t.RootUIComp.SetUIActive(false);
        e.SetUIActive(true);
        s.SetUIActive(false);
        h.SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "HonamiStory_DepartAnytime");
      }
    } else {
      t.RootUIComp.SetUIActive(false);
      e.SetUIActive(true);
      s.SetUIActive(false);
      h.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "HonamiStory_PassFloors");
      i = this.Wim.GetMaxFloorByDangerLv(this.ufm);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "HonamiStory_PassFloorsNumbers", i);
    }
  }
  ffm() {
    var e = this.GetButton(13);
    var s = this.GetButton(14);
    var h = this.GetSprite(12);
    var i = this.GetSprite(15);
    var t = this.GetText(9);
    var o = this.GetTexture(10);
    var r = this.GetTexture(8);
    e.RootUIComp.SetUIActive(this.hvm);
    s.RootUIComp.SetUIActive(this.hvm);
    h.SetUIActive(this.hvm);
    i.SetUIActive(!this.hvm);
    var a = "RomanNum" + this.ufm.toString();
    if (this.hvm) {
      let i = 0;
      let t = 0;
      switch (this.hfm) {
        case 0:
          i = this.ezm;
          t = this.tzm;
          break;
        case 1:
          i = this.izm;
          t = this.rzm;
      }
      e.SetSelfInteractive(this.ufm !== i);
      s.SetSelfInteractive(this.ufm !== t);
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a), h, false);
    } else {
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a), i, false);
    }
    let n = "";
    switch (this.cfm) {
      case 1:
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "HonamiStory_easy");
        t.SetColor(safeColor);
        o.SetColor(safeColor);
        n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("DangerLvBg1");
        break;
      case 2:
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "HonamiStory_medium");
        t.SetColor(averageColor);
        o.SetColor(averageColor);
        n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("DangerLvBg2");
        break;
      case 3:
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "HonamiStory_hard");
        t.SetColor(hardColor);
        o.SetColor(hardColor);
        n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("DangerLvBg3");
    }
    this.SetTextureByPath(n, r);
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
  }
}
exports.HonamiStoryLevelInfoView = HonamiStoryLevelInfoView;
class TargetTog extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DKi = false;
    this.Target = undefined;
    this.OnClickToggleBack = undefined;
    this.CanToggleChange = undefined;
    this.pfm = () => {
      this.OnClickToggleBack?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.pfm]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.Target));
  }
  RefreshTog(i, t) {
    this.Target = i;
    this.DKi = t;
    this.GetItem(1).SetUIActive(this.DKi);
    this.GetItem(2).SetUIActive(!this.DKi);
  }
  get GetTog() {
    return this.GetExtendToggle(0);
  }
  SetRedDotShow(i) {
    this.GetItem(3).SetUIActive(i);
  }
}
exports.TargetTog = TargetTog;
class BtnGo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.hgi = 0;
    this.vfm = 0;
    this.v0m = undefined;
    this.dvm = false;
    this.U2m = new Map();
    this.yfm = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
      if (!t || t.length === 0 || t.every(i => i === 0)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_Tips_TeamUnderstaffed");
      } else if (this.v0m) {
        var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1);
        if (t.GetOverflowCapacity() > 0) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(418)).FunctionMap.set(2, this.Mfm);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        } else if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.vfm) >= this.hgi) {
          t = this.v0m.GetCurTarget === 1;
          let i = this.v0m.GetIsBuySafe;
          if (t && (i = false, LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot))) {
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot, false);
          }
          this._pm(t);
          HonamiStoryController_1.HonamiStoryController.SendHonamiStoryItemEnterRequest(t, this.v0m.GetCurDangerLv, i);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_InsufficientBalance");
        }
      }
    };
    this.Mfm = () => {
      HonamiStoryController_1.HonamiStoryController.OpenHonamiStoryBag();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.yfm]];
  }
  SetPnlSelectLv(i) {
    this.v0m = i;
    this.dvm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10121);
    i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (i) {
      this.vfm = i.OutCoinItemId;
    }
  }
  SetCostData(i) {
    this.U2m = i;
    this.RefreshView();
  }
  RefreshView() {
    var i = this.GetTexture(3);
    var t = this.GetText(4);
    var e = this.GetItem(5);
    let s = this.v0m.GetCurSafeLeavePrice();
    if (this.dvm) {
      s += this.U2m.get(this.vfm) ?? 0;
    }
    var h = s > 0;
    e.SetUIActive(h);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.vfm);
    if (e) {
      this.SetTextureByPath(e.Icon, i);
      this.hgi = s;
      t.SetText(this.hgi.toString());
      h = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.vfm) >= this.hgi;
      t.SetChangeColor(!h, t.changeColor);
    }
  }
  _pm(i) {
    var t;
    if (i) {
      HonamiStoryController_1.HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(7);
    } else if (i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData()) {
      if (i.IsAllAreaPass()) {
        HonamiStoryController_1.HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(6);
      } else {
        t = i.GetCurrentProgressAreaDataId();
        if ((i = i.GetHonamiStoryAreaData(t)) && i.IsAreaCanEnter) {
          t = i.Config.MainBTId;
          HonamiStoryController_1.HonamiStoryController.SetHonamiStoryLoadingInfoByBtId(t);
        }
      }
    }
  }
  SetRedDotShow(i) {
    this.GetItem(2).SetUIActive(i);
  }
}
exports.BtnGo = BtnGo;
class PnlTeam extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sfm = [];
    this.Mfm = () => {
      HonamiStoryController_1.HonamiStoryController.OpenHonamiStoryBag();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Mfm]];
  }
  OnStart() {
    this.Efm();
    this.RefreshView();
  }
  Efm() {
    var t = this.GetItem(3);
    var e = this.GetItem(4);
    let s = undefined;
    for (let i = 0; i < HonamiStoryDefine_1.HONAMI_ROLE_TEAM_COUNT; ++i) {
      s = i === 0 ? e : LguiUtil_1.LguiUtil.CopyItem(e, t);
      var h = new PnlHeadBox();
      h.CreateThenShowByActor(s.GetOwner());
      this.Sfm.push(h);
    }
  }
  RefreshView() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().PowerLevel;
    this.GetText(1).SetText(i.toString());
    var i = ModelManager_1.ModelManager.HonamiStoryModel.QuickAllCheck(false);
    this.GetSprite(2).SetUIActive(i);
    this.GetItem(5).SetUIActive(i);
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
    if (t) {
      for (let i = 0; i < this.Sfm.length; ++i) {
        if (i < t.length) {
          this.Sfm[i].RefreshView(t[i]);
        } else {
          this.Sfm[i].RefreshView(0);
        }
      }
    }
  }
}
exports.PnlTeam = PnlTeam;
class PnlHeadBox extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  RefreshView(i) {
    var t;
    var e;
    this.GetSprite(0).SetUIActive(i === 0);
    this.GetTexture(1).SetUIActive(i !== 0);
    if (i !== 0 && (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i))) {
      e = ((e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(i)) !== undefined ? e.GetRoleSkinConfig() : t).RoleHeadIconLarge;
      this.SetRoleIconByRoleIdOrSkinId(e, this.GetTexture(1), i, t.SkinId);
    }
  }
}
exports.PnlHeadBox = PnlHeadBox;
//# sourceMappingURL=HonamiStoryLevelInfoView.js.map