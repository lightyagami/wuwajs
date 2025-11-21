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
    this.GRm = 0;
    this.FRm = 0;
    this.NRm = 0;
    this.VRm = 0;
    this.lqe = undefined;
    this.S9_ = undefined;
    this.j1m = undefined;
    this.H1m = undefined;
    this.$1m = undefined;
    this.W1m = undefined;
    this.S_m = undefined;
    this.gym = undefined;
    this.Hea = undefined;
    this.bSm = new Map([[1, 11], [2, 11], [3, 12], [4, 12], [5, 12]]);
    this.dem = undefined;
    this.Q1m = undefined;
    this.Y1m = 1;
    this.K1m = 1;
    this.X1m = 1;
    this.Wum = false;
    this.z1m = undefined;
    this.Mmm = false;
    this.Emm = false;
    this.Imm = false;
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HonamiStoryDefine_1.HONAMI_HELP_READYGO);
    };
    this.Jvt = () => {
      this.CloseMe();
    };
    this.sh_ = () => {
      if (this.Q1m !== 0) {
        this.J1m(0);
      }
    };
    this.nh_ = () => {
      if (this.Imm) {
        if (this.Q1m !== 1) {
          if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot)) {
            this.H1m.SetRedDotShow(false);
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot, false);
          }
          this.J1m(1);
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_TowerUnlockedPrompt");
        this.H1m.GetTog.SetToggleState(0, false);
      }
    };
    this.Bpt = i => i !== this.Q1m;
    this.KTm = "";
    this.$An = i => {
      if (i === "Enter04" && this.KTm) {
        this.SetTextureByPath(this.KTm, this.GetTexture(0));
      }
    };
    this.Z1m = () => {
      switch (this.Q1m) {
        case 0:
          if (!(this.Y1m > this.GRm)) {
            return;
          }
          --this.Y1m;
          this.K1m = this.Y1m;
          break;
        case 1:
          if (!(this.Y1m > this.NRm)) {
            return;
          }
          --this.Y1m;
          this.X1m = this.Y1m;
      }
      var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m);
      this.z1m = i.DangerLv;
      this.Jjd();
      this.e_m();
      this.Tmm();
      this.$1m.SetCostData(i.ConsumeItems);
    };
    this.i_m = () => {
      switch (this.Q1m) {
        case 0:
          if (!(this.Y1m < this.FRm)) {
            return;
          }
          this.Y1m += 1;
          this.K1m = this.Y1m;
          break;
        case 1:
          if (!(this.Y1m < this.VRm)) {
            return;
          }
          this.Y1m += 1;
          this.X1m = this.Y1m;
      }
      var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m);
      this.z1m = i.DangerLv;
      this.Jjd();
      this.e_m();
      this.Tmm();
      this.$1m.SetCostData(i.ConsumeItems);
    };
    this.Qum = () => {
      this.Wum = this.GetExtendToggle(16).GetToggleState() === 1;
      this.$1m.RefreshView();
    };
  }
  get GetCurTarget() {
    return this.Q1m;
  }
  get GetCurDangerLv() {
    return this.Y1m;
  }
  get GetIsBuySafe() {
    return this.Wum;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UISprite], [16, UE.UIExtendToggle], [17, UE.UIText], [18, UE.UITexture], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIText]];
    this.BtnBindInfo = [[13, this.Z1m], [14, this.i_m], [16, this.Qum]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.j1m = new TargetTog();
    this.j1m.CanToggleChange = this.Bpt;
    this.H1m = new TargetTog();
    this.H1m.CanToggleChange = this.Bpt;
    this.$1m = new BtnGo();
    this.W1m = new PnlTeam();
    this.S9_ = new HonamiStoryQuestPanel_1.HonamiStoryQuestPanel();
    this.S_m = new HonamiStoryBozaiTalkPanel_1.HonamiStoryBozaiTalkPanel();
    this.gym = new HonamiStoryProfitPanel_1.HonamiStoryProfitPanel();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var i = [this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.j1m.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.H1m.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.$1m.CreateThenShowByActorAsync(this.GetItem(20).GetOwner()), this.W1m.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.S9_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.S_m.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()), this.gym.CreateThenShowByActorAsync(this.GetItem(23).GetOwner())];
    await Promise.all(i);
    this.lqe.SetHelpCallBack(this.pcr);
    this.lqe.SetCloseCallBack(this.Jvt);
    this.dem = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (this.dem) {
      i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(this.dem.Id);
      this.GRm = i.OriAreaDangerLevel;
      this.FRm = i.MaxAreaDangerLevel;
      this.NRm = i.OriTopTowerDangerLevel;
      this.VRm = i.MaxTopTowerDangerLevel;
      this.$1m.SetPnlSelectLv(this);
      this.Mmm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10121);
      this.Emm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10115);
      this.Imm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10120);
      if (this.Mmm) {
        this.K1m = this.dem.CurHonamiLv;
      } else {
        this.K1m = this.dem.GetCurrentProgressAreaDataId();
      }
      this.X1m = this.dem.CurTowerLv;
      if (this.Imm) {
        this.J1m(this.dem.CurTarget);
      } else {
        this.J1m(0);
        this.KTm = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfig(this.K1m).LvSelectBgPath;
      }
      this.SetTextureByPath(this.KTm, this.GetTexture(0));
      i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m);
      this.z1m = i.DangerLv;
      await this.lqe.SetCurrencyItemList([this.dem.OutCoinItemId]);
      this.j1m.RefreshTog(0, true);
      this.j1m.OnClickToggleBack = this.sh_;
      this.j1m.SetRedDotShow(false);
      this.H1m.RefreshTog(1, this.Imm);
      this.H1m.OnClickToggleBack = this.nh_;
      this.H1m.SetRedDotShow(false);
      this.S9_.Refresh(this.Q1m === 0);
      this.gym.RefreshNormal();
      this.Jjd();
      this.e_m();
      this.Tmm();
      this.$1m.SetCostData(i.ConsumeItems);
      this.$1m.SetRedDotShow(false);
      i = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(1);
      this.S_m.SetTalkInfoTextAndPlayAudio(i);
    }
  }
  OnBeforeShow() {
    this.W1m.RefreshView();
    this.S9_.Refresh(this.Q1m === 0);
    this.gym.RefreshNormal();
    this.I0m();
    this.T0m();
  }
  OnAfterShow() {
    this.dcm();
    this.Mdm();
    let i = 13;
    if (!this.Mmm && this.bSm.has(this.Y1m)) {
      i = this.bSm.get(this.Y1m);
    }
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetRandomDialogData(i);
    this.S_m.SetTalkInfoTextAndPlayAudio(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeHide() {
    this.dem.CurTarget = this.Q1m;
    this.dem.CurHonamiLv = this.K1m;
    this.dem.CurTowerLv = this.X1m;
  }
  GetCurSafeLeavePrice() {
    if (this.Emm && this.Q1m === 0 && this.Wum) {
      return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m).SafeLeavePrice;
    } else {
      return 0;
    }
  }
  dcm() {
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
  Mdm() {
    var i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTips) ?? true;
    if (this.Imm && i) {
      (i = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text = "HonamiStory_LevelUnlocked_6";
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", i);
      this.H1m.SetRedDotShow(true);
      this.$1m.SetRedDotShow(true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot, true);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTips, false);
    }
  }
  I0m() {
    var i;
    if (!this.Mmm) {
      i = this.dem.GetHonamiStoryAreaDataList().length;
      if (this.Y1m <= i && !this.dem.GetHonamiStoryAreaData(this.Y1m).IsAreaCanEnter) {
        this.j1m.SetRedDotShow(true);
        this.$1m.SetRedDotShow(true);
      }
    }
  }
  T0m() {
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockTogRedDot)) {
      this.H1m.SetRedDotShow(true);
    }
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot)) {
      this.$1m.SetRedDotShow(true);
    }
  }
  J1m(i) {
    switch (i) {
      case 0:
        this.Q1m = 0;
        this.Y1m = this.K1m;
        this.j1m.GetTog.SetToggleState(1, false);
        this.H1m.GetTog.SetToggleState(0, false);
        this.KTm = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("HonamiSelectLvBg1");
        break;
      case 1:
        this.Q1m = 1;
        this.Y1m = this.X1m;
        this.j1m.GetTog.SetToggleState(0, false);
        this.H1m.GetTog.SetToggleState(1, false);
        this.KTm = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("HonamiSelectLvBg2");
    }
    this.Hea?.StopSequenceByKey("Switch");
    this.Hea?.PlayLevelSequenceByName("Switch");
    var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m);
    this.z1m = i.DangerLv;
    this.Jjd();
    this.e_m();
    var t = this.Q1m === 0;
    this.S9_.Refresh(t);
    this.GetText(24).SetUIActive(t);
    this.GetText(6).SetUIActive(t);
    this.Tmm();
    this.$1m.SetCostData(i.ConsumeItems);
  }
  Jjd() {
    var i;
    var t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m);
    if (this.Q1m === 0) {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10121)) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), "HonamiStory_FreeRegionName");
      } else {
        i = this.dem.GetHonamiStoryAreaData(this.Y1m).Config.LvSelectName;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), i);
      }
    } else {
      i = this.dem.TowerName;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), i);
    }
    this.GetText(5).SetText(t.LvShow);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.FallQuaId);
  }
  Tmm() {
    var i;
    var t = this.GetExtendToggle(16);
    var e = this.GetText(17);
    var s = this.GetTexture(18);
    var h = this.GetText(19);
    if (this.Q1m === 0) {
      if (this.Emm) {
        t.RootUIComp.SetUIActive(true);
        e.SetUIActive(true);
        s.SetUIActive(true);
        h.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "HonamiStory_ExtractionChargeBuy");
        i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.dem.OutCoinItemId).Icon;
        this.SetTextureByPath(i, this.GetTexture(18));
        i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetDangerLevelConfig(this.Y1m);
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
      i = this.dem.GetMaxFloorByDangerLv(this.Y1m);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "HonamiStory_PassFloorsNumbers", i);
    }
  }
  e_m() {
    var e = this.GetButton(13);
    var s = this.GetButton(14);
    var h = this.GetSprite(12);
    var i = this.GetSprite(15);
    var t = this.GetText(9);
    var o = this.GetTexture(10);
    var r = this.GetTexture(8);
    e.RootUIComp.SetUIActive(this.Mmm);
    s.RootUIComp.SetUIActive(this.Mmm);
    h.SetUIActive(this.Mmm);
    i.SetUIActive(!this.Mmm);
    var a = "RomanNum" + this.Y1m.toString();
    if (this.Mmm) {
      let i = 0;
      let t = 0;
      switch (this.Q1m) {
        case 0:
          i = this.GRm;
          t = this.FRm;
          break;
        case 1:
          i = this.NRm;
          t = this.VRm;
      }
      e.SetSelfInteractive(this.Y1m !== i);
      s.SetSelfInteractive(this.Y1m !== t);
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a), h, false);
    } else {
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a), i, false);
    }
    let n = "";
    switch (this.z1m) {
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
    this.r_m = () => {
      this.OnClickToggleBack?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.r_m]];
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
    this.o_m = 0;
    this.Xum = undefined;
    this.Rmm = false;
    this.pEm = new Map();
    this.n_m = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
      if (!t || t.length === 0 || t.every(i => i === 0)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_Tips_TeamUnderstaffed");
      } else if (this.Xum) {
        var t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1);
        if (t.GetOverflowCapacity() > 0) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(418)).FunctionMap.set(2, this.a_m);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        } else if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.o_m) >= this.hgi) {
          t = this.Xum.GetCurTarget === 1;
          let i = this.Xum.GetIsBuySafe;
          if (t && (i = false, LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot))) {
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStorySelectLvTowerUnLockBtnGoRedDot, false);
          }
          this.Pdm(t);
          HonamiStoryController_1.HonamiStoryController.SendHonamiStoryItemEnterRequest(t, this.Xum.GetCurDangerLv, i);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_InsufficientBalance");
        }
      }
    };
    this.a_m = () => {
      HonamiStoryController_1.HonamiStoryController.OpenHonamiStoryBag();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.n_m]];
  }
  SetPnlSelectLv(i) {
    this.Xum = i;
    this.Rmm = ModelManager_1.ModelManager.FunctionModel.IsOpen(10121);
    i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (i) {
      this.o_m = i.OutCoinItemId;
    }
  }
  SetCostData(i) {
    this.pEm = i;
    this.RefreshView();
  }
  RefreshView() {
    var i = this.GetTexture(3);
    var t = this.GetText(4);
    var e = this.GetItem(5);
    let s = this.Xum.GetCurSafeLeavePrice();
    if (this.Rmm) {
      s += this.pEm.get(this.o_m) ?? 0;
    }
    var h = s > 0;
    e.SetUIActive(h);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.o_m);
    if (e) {
      this.SetTextureByPath(e.Icon, i);
      this.hgi = s;
      t.SetText(this.hgi.toString());
      h = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.o_m) >= this.hgi;
      t.SetChangeColor(!h, t.changeColor);
    }
  }
  Pdm(i) {
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
    this.s_m = [];
    this.a_m = () => {
      HonamiStoryController_1.HonamiStoryController.OpenHonamiStoryBag();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.a_m]];
  }
  OnStart() {
    this.h_m();
    this.RefreshView();
  }
  h_m() {
    var t = this.GetItem(3);
    var e = this.GetItem(4);
    let s = undefined;
    for (let i = 0; i < HonamiStoryDefine_1.HONAMI_ROLE_TEAM_COUNT; ++i) {
      s = i === 0 ? e : LguiUtil_1.LguiUtil.CopyItem(e, t);
      var h = new PnlHeadBox();
      h.CreateThenShowByActor(s.GetOwner());
      this.s_m.push(h);
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
      for (let i = 0; i < this.s_m.length; ++i) {
        if (i < t.length) {
          this.s_m[i].RefreshView(t[i]);
        } else {
          this.s_m[i].RefreshView(0);
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