"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGamePlayView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Macro_1 = require("../../../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchTipData_1 = require("../Data/FloroRanchTipData");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchCommonTipItem_1 = require("./Item/FloroRanchCommonTipItem");
const FloroRanchCurrencyItem_1 = require("./Item/FloroRanchCurrencyItem");
const FloroRanchDayProgressItem_1 = require("./Item/FloroRanchDayProgressItem");
const FloroRanchDebugInfoPanel_1 = require("./Item/FloroRanchDebugInfoPanel");
const FloroRanchPopupRewardPanel_1 = require("./Item/FloroRanchPopupRewardPanel");
const FloroRanchTerrainTipItem_1 = require("./Item/FloroRanchTerrainTipItem");
const FloroRanchUiCardItem_1 = require("./Item/FloroRanchUiCardItem");
const FloroRanchUiRoleSkillItem_1 = require("./Item/FloroRanchUiRoleSkillItem");
const FloroRanchUiTerrainItem_1 = require("./Item/FloroRanchUiTerrainItem");
const FloroRanchUiToyItem_1 = require("./Item/FloroRanchUiToyItem");
const TERRAIN_ITEM_START_INDEX = 24;
class FloroRanchGamePlayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.SOu = 0;
    this.Vhu = [];
    this.xKu = undefined;
    this.CNe = undefined;
    this.MOu = undefined;
    this.gOu = undefined;
    this.EOu = undefined;
    this.IOu = undefined;
    this.TOu = undefined;
    this.bOu = undefined;
    this.ROu = undefined;
    this.wOu = undefined;
    this.tM1 = undefined;
    this.Zge = 0;
    this.Yuu = new Map();
    this.zuu = new Map();
    this.Juu = new Map();
    this.xpu = undefined;
    this.LOu = undefined;
    this.UKu = undefined;
    this.AOu = e => {
      var i = this.Yuu.get(e).GetEntity();
      var t = this.zuu.get(e).GetEntity();
      var i = !i && !t;
      this.Yuu.get(e).SetInteractive(!i);
    };
    this.zpe = e => {
      var i = e.EntityType;
      var e = e.CheckGetComponent(0).Point;
      if (i === 1) {
        e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTerrainEntityByPoint(e);
        this.vJc(undefined, e);
      } else if (i === 2) {
        this.yJc(undefined);
      }
      this.RefreshCurrencyInfo();
    };
    this.vJc = (e, i) => {
      this.MOu.ChangeTipInfo(1, e, i);
      this.jt_();
    };
    this.POu = e => {
      var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTerrainEntityByPoint(e);
      var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(e);
      this.MOu.ChangeTipInfo(1, e, i);
      this.jt_();
    };
    this.yJc = e => {
      this.MOu.ChangeTipInfo(2, e, undefined);
      this.jt_();
    };
    this.xOu = e => {
      e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(e);
      this.MOu.ChangeTipInfo(2, e, undefined);
      this.jt_();
    };
    this.DOu = e => {
      e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(e);
      if (e) {
        this.MOu.ChangeTipInfo(1, e, undefined);
      } else {
        this.MOu.ChangeTipInfo(0, undefined, undefined);
      }
      this.UOu();
    };
    this.dbu = () => {
      this.MOu.Clear();
      this.jt_();
      this.TLt();
    };
    this.BOu = e => {
      if (e === "Close") {
        this.TOu?.SetUiActive(false);
      }
    };
    this.kOu = e => {
      if (e === "Close") {
        this.bOu?.SetUiActive(false);
      }
    };
    this.bRu = () => {
      this.RefreshCurrencyInfo();
      if (this.tM1?.GetCurrentSequence() === "Hit") {
        this.tM1?.ReplaySequenceByKey("Hit");
      } else {
        this.tM1?.PlayLevelSequenceByName("Hit");
      }
    };
    this.BKu = () => {
      this.RefreshCurrencyInfo();
    };
    this.kdu = e => {
      this.xOu(e);
    };
    this.qdu = e => {
      this.POu(e);
    };
    this._Cu = e => {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.CanFsmInsertSkillTask()) {
        this.dbu();
        UiManager_1.UiManager.OpenView("FloroRanchSkillTipView", e);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FloroRanchSkillCantUse");
      }
    };
    this.Vdu = () => {
      var e;
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.CanFsmInsertSkillTask()) {
        this.dbu();
        this.SetMaskPanelActive(true);
        this.SetNewDayButtonActive(false);
        e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
        FloroRanchController_1.FloroRanchController.SendFloroRanchPlayNextDayRequest(this.CNe.Id, e, e => {
          if (e) {
            this.RefreshCurrencyInfo();
            this.uXa();
          }
        });
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_NextDayLock");
      }
    };
    this.OOu = () => {
      this.dbu();
      UiManager_1.UiManager.OpenView("FloroRanchIncomeDetailView", this.DOu);
    };
    this.qOu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchGamePlayExplainView");
    };
    this.GOu = () => {
      this.dbu();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ShowRecordView();
    };
    this.kKu = () => {
      if (this.UKu.IsShowOrShowing) {
        this.UKu.Hide();
      } else {
        this.UKu.Show();
      }
    };
    this.OKu = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_AnimalAllFull");
    };
    this.jdu = () => {
      this.dbu();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.PauseGame();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchPauseView");
    };
    this.xvu = () => {
      this.dbu();
      this.SOu = (this.SOu + 1) % this.Vhu.length;
      var e = this.Vhu[this.SOu];
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSpeed, e);
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetTimeDilation(e);
      var i = e >= FloroRanchDefine_1.FLORO_RANCH_MAX_SPEED;
      if (i) {
        this.GetText(2).SetText("MAX");
      } else {
        this.GetText(2).SetText("×" + e.toFixed(1));
      }
      this.GetSprite(4).SetUIActive(this.SOu !== 0);
    };
    this.mji = () => {
      this.dbu();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(FloroRanchDefine_1.FLORO_RANCH_GAME_PLAY_HELP_ID);
    };
    this.N7c = () => {
      this.RefreshCurrencyInfo();
      this.uXa();
    };
    this.FOu = () => {
      this.qKu();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UITexture], [14, UE.UITexture], [15, UE.UIItem], [52, UE.UIText], [51, UE.UITexture], [54, UE.UIButtonComponent], [16, UE.UIItem], [17, UE.UIButtonComponent], [18, UE.SpineSkeletonAnimationComponent], [19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [37, UE.UIItem], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UIItem], [43, UE.UIItem], [44, UE.UIItem], [45, UE.UIItem], [46, UE.UIItem], [47, UE.UIItem], [48, UE.UIText], [49, UE.UIButtonComponent], [50, UE.UIItem], [53, UE.UIText], [55, UE.UIButtonComponent], [56, UE.UIButtonComponent], [57, UE.UIItem], [58, UE.UITexture], [59, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.jdu], [3, this.xvu], [5, this.mji], [20, this._Cu], [17, this.Vdu], [54, this.OOu], [49, this.dbu], [55, this.qOu], [6, this.GOu], [56, this.kKu], [59, this.OKu]];
  }
  async OnBeforeStartAsync() {
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.MOu = new FloroRanchTipData_1.FloroRanchTipData();
    this.NOu();
    await this.qcu();
    var i = [];
    i.push(this.Uvu());
    i.push(this.pSu());
    i.push(this.VOu());
    i.push(this.jOu());
    i.push(this.HOu());
    for (let e = 0; e < FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT; e++) {
      i.push(this.tcu(e));
      i.push(this.CreateSpineItem(e));
    }
    for (let e = 0; e < ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount; e++) {
      i.push(this.rcu(e));
    }
    this.gOu = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    var e = this.GetItem(1);
    i.push(this.gOu.CreateThenShowByActorAsync(e.GetOwner()));
    await Promise.all(i);
    this.ROu = new LevelSequencePlayer_1.LevelSequencePlayer(this.TOu.GetRootItem());
    this.ROu.BindSequenceCloseEvent(this.BOu);
    this.wOu = new LevelSequencePlayer_1.LevelSequencePlayer(this.bOu.GetRootItem());
    this.wOu.BindSequenceCloseEvent(this.kOu);
    this.tM1 = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(15));
  }
  OnBeforeShow() {
    this.SetNewDayButtonActive(false);
    this.SetMaskPanelActive(false);
    this.SetShowButtonActive(false);
    this.RefreshCurrencyInfo();
    this.uXa();
    this.GetSpine(18).SetAnimation(0, "idle", true);
    this.GetItem(45).SetUIActive(false);
    this.GetItem(47).SetUIActive(false);
    for (const e of ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetShowTerrainEntityList()) {
      e.GetUiItemComponent().PlayShowAnim();
    }
    for (const i of ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetShowToyEntityList()) {
      i.GetUiItemComponent().PlayShowAnim();
    }
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RoleEntity.GetUiItemComponent().PlayShowAnim();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh, this.N7c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.FOu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh, this.N7c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.FOu);
  }
  async BindTerrainItem(e) {
    var i = e.CheckGetComponent(0).Point;
    let t = this.Yuu.get(i);
    if (!t) {
      await this.tcu(i);
      t = this.Yuu.get(i);
    }
    t.BindData(e);
    return t;
  }
  async tcu(e) {
    var i = new FloroRanchUiTerrainItem_1.FloroRanchUiTerrainItem();
    if (e < 0 || e > FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "TerrainItem index is out of range: " + e);
      }
    } else {
      await i.CreateThenShowByActorAsync(this.GetItem(TERRAIN_ITEM_START_INDEX + e).GetOwner());
      i.BindClickPosCallback(() => {
        this.qdu(e);
      });
      i.BindEntityChangedCallback(this.AOu);
      i.SetInteractive(false);
      this.Yuu.set(e, i);
    }
  }
  async BindToyItem(e) {
    var i = e.CheckGetComponent(0).Point;
    let t = this.Juu.get(i);
    if (!t) {
      await this.rcu(i);
      t = this.Juu.get(i);
    }
    t.BindData(e);
    return t;
  }
  async rcu(e) {
    var i;
    var t;
    var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    if (e < 0 || s <= e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "ToyItem index is out of range: " + e);
      }
    } else {
      (s = new FloroRanchUiToyItem_1.FloroRanchUiToyItem()).BindClickCallback(() => {
        this.kdu(e);
      });
      t = this.GetItem(22);
      i = this.GetItem(21);
      t = LguiUtil_1.LguiUtil.CopyItem(t, i);
      await s.CreateThenShowByActorAsync(t.GetOwner());
      this.Juu.set(e, s);
    }
  }
  async BindSpineItem(e) {
    var i = e.CheckGetComponent(0).Point;
    let t = this.zuu.get(i);
    if (!t) {
      await this.CreateSpineItem(i);
      t = this.zuu.get(i);
    }
    t.BindData(e);
    t.ResetLayer();
    return t;
  }
  async CreateSpineItem(e) {
    var i = this.GetItem(45);
    var t = this.GetItem(44);
    var s = new FloroRanchUiCardItem_1.FloroRanchUiCardItem();
    var i = LguiUtil_1.LguiUtil.CopyItem(i, t);
    await s.CreateByActorAsync(i.GetOwner());
    s.BindEntityChangedCallback(this.AOu);
    s.BindMoveCurve(this.xKu);
    var t = this.Yuu.get(e).GetRootActor().GetTransform();
    s.FollowPosition(t);
    this.zuu.set(e, s);
  }
  async BindRoleSkillItem(e) {
    if (!this.LOu) {
      await this.VOu();
    }
    this.LOu.BindData(e);
    return this.LOu;
  }
  async VOu() {
    if (!this.LOu) {
      this.LOu = new FloroRanchUiRoleSkillItem_1.FloroRanchUiRoleSkillItem();
      this.LOu.BindClickSkillCallback(this._Cu);
      await this.LOu.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
    }
  }
  async Uvu() {
    var e = this.GetItem(7);
    this.bOu = new FloroRanchTerrainTipItem_1.FloroRanchTerrainTipItem();
    await this.bOu.CreateByResourceIdAsync("PnlMapInfo", e, false);
    this.TOu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    await this.TOu.CreateByResourceIdAsync("PnlCardItemInfo", e, false);
    this.GetButton(56).RootUIComp.SetUIActive(false);
  }
  async pSu() {
    this.xpu = new FloroRanchPopupRewardPanel_1.FloroRanchPopupRewardPanel();
    await this.xpu.CreateThenShowByActorAsync(this.GetItem(46).GetOwner());
    this.xpu.BindCoinChangeCallBack(this.bRu);
    this.xpu.BindDiamondChangeCallBack(this.BKu);
  }
  NOu() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchSubDungeonData(e).IsEndlessMode;
    this.Vhu = e ? FloroRanchDefine_1.floroRanchEndlessSpeedList : FloroRanchDefine_1.floroRanchSpeedList;
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSpeed, FloroRanchDefine_1.FLORO_RANCH_DEFAULT_SPEED);
    if (e && (this.SOu = this.Vhu.indexOf(e), this.SOu === -1)) {
      this.SOu = this.Vhu.length - 1;
    }
    e = this.Vhu[this.SOu];
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSpeed, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("FloroRanch", 78, `speed: ${e}, CurSpeedIndex: ${this.SOu}`);
    }
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetTimeDilation(e);
    if (e === FloroRanchDefine_1.FLORO_RANCH_MAX_SPEED) {
      this.GetText(2).SetText("MAX");
    } else {
      this.GetText(2).SetText("×" + e.toFixed(1));
    }
    this.GetSprite(4).SetUIActive(this.SOu !== 0);
  }
  async jOu() {
    this.EOu = new FloroRanchDayProgressItem_1.FloroRanchDayProgressItem();
    var e = this.GetItem(16);
    await this.EOu.CreateByResourceIdAsync("PnlDayStateB", e, false);
  }
  async HOu() {
    this.IOu = new FloroRanchDayProgressItem_1.FloroRanchDayProgressItem();
    var e = this.GetItem(16);
    await this.IOu.CreateByResourceIdAsync("PnlDayState", e, false);
  }
  async qcu() {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/UI/UIResources/UiActivity/Curve/Pasture/Curve_ItemMove.Curve_ItemMove", UE.CurveFloat, e => {
      this.xKu = e;
      i.SetResult(undefined);
    });
    await i.Promise;
  }
  RefreshCurrencyInfo() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.CoinData;
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    var t = e.GetAmount();
    var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.StageTarget;
    this.GetText(12).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(t) + "/" + ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(s));
    this.GetTexture(14).SetFillAmount(t / s);
    this.gOu.SetCurrencyData(i);
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastDayIncome();
    this.GetText(52).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(t));
    this.SetTextureByPath(e.ConfigData.GetSmallIcon(), this.GetTexture(51));
    this.SetTextureByPath(e.ConfigData.GetSmallIcon(), this.GetTexture(13));
  }
  uXa() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    var e = this.CNe.GetFloroRanchSubDungeonData(e);
    var i = this.CNe.GetFloroRanchDungeonData(e.InstanceId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i.GetDungeonName());
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.CurStage;
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsEndlessMode;
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "Farm_Stage1", i);
    } else {
      e = e.GetMaxStage();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "Farm_Stage2", i, e);
    }
    this.IOu.SetUiActive(t);
    this.EOu.SetUiActive(!t);
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemindDay;
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.StageDayCount;
    (t ? this.IOu : this.EOu).RefreshDay(i, e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Farm_DaySum", ModelManager_1.ModelManager.FloroRanchGamePlayModel.TotalDayCount);
    this.qKu();
  }
  SetNewDayButtonActive(e) {
    this.GetButton(17)?.RootUIComp.SetUIActive(e);
  }
  SetShowButtonActive(e) {
    this.GetButton(6)?.RootUIComp.SetUIActive(e);
  }
  SetMaskPanelActive(e) {
    this.GetItem(50)?.SetUIActive(e);
  }
  SetToyPanelActive(e) {
    this.GetItem(21)?.SetUIActive(e);
  }
  async PlayNewDayAnim() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.TotalDayCount;
    if (e !== 1) {
      await this.UiViewSequence.PlaySequenceAsync("NewDay", new CustomPromise_1.CustomPromise());
    }
    if (e === 1) {
      this.PlayFloroAudio(1);
    }
    this.RefreshCurrencyInfo();
    this.uXa();
  }
  jt_() {
    var e = this.MOu.LastMainEntityData;
    var i = this.MOu.LastSubEntityData;
    var t = this.MOu.MainEntityData;
    var s = this.MOu.SubEntityData;
    var a = this.MOu.LastTipType;
    var r = this.MOu.TipType;
    var a = a === 0 || r === 0;
    if (t) {
      this.WOu(a);
    } else if (e) {
      this.QOu(a);
    }
    if (s) {
      this.KOu(a);
    } else if (i) {
      this.XOu(a);
    }
    this.UOu();
  }
  XOu(e = true) {
    this.wOu.PlayLevelSequenceByName("Close");
    if (!e) {
      this.wOu.EndSequenceLastFrame("Close");
      this.bOu?.SetUiActive(false);
    }
  }
  QOu(e = true) {
    this.ROu.PlayLevelSequenceByName("Close");
    if (!e) {
      this.ROu.EndSequenceLastFrame("Close");
      this.TOu?.SetUiActive(false);
    }
  }
  KOu(e = true) {
    var i = this.MOu.SubEntityData;
    this.bOu.RefreshInfoTipByEntity(i);
    var i = this.MOu.MainEntityData;
    this.YOu(i ? FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT : FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER);
    this.wOu.PlayLevelSequenceByName("Start");
    if (!e) {
      this.wOu.EndSequenceLastFrame("Start");
    }
    this.MLt();
  }
  WOu(e = true) {
    var i = this.MOu.MainEntityData;
    this.TOu?.RefreshInfoTipByParam({
      TipType: 0,
      EntityData: i,
      RemoveCallback: this.zpe,
      CurrencyData: undefined
    });
    this.ROu.PlayLevelSequenceByName("Start");
    if (!e) {
      this.ROu.EndSequenceLastFrame("Start");
    }
    this.MLt();
  }
  YOu(e) {
    var i = this.bOu?.GetRootItem();
    if (i) {
      i.SetHeight(e);
    }
  }
  UOu() {
    this.zOu(this.MOu.LastTipType, this.MOu.LastMainEntityData, this.MOu.LastSubEntityData, false);
    this.zOu(this.MOu.TipType, this.MOu.MainEntityData, this.MOu.SubEntityData, true);
  }
  zOu(e, i, t, s) {
    if (e === 1) {
      let e = -1;
      if (i) {
        e = i.GetPoint();
      } else if (t) {
        e = t.GetPoint();
      }
      t = this.Yuu.get(e);
      if (t) {
        t.SetSelectState(s);
      }
    }
    if (e === 2 && (t = i?.GetPoint() ?? -1, e = this.Juu.get(t))) {
      e.SetSelectState(s);
    }
  }
  MLt() {
    this.GetButton(49).RootUIComp.SetUIActive(true);
  }
  TLt() {
    this.GetButton(49).RootUIComp.SetUIActive(false);
  }
  async ShowPopupReward(e, i, t) {
    var s = this.GetTexture(13);
    var a = s.GetUIWorldPosition();
    a.X += s.GetWidth() / 2;
    this.xpu.BindCoinTargetPos(a);
    await this.xpu.ShowPopupReward(e, i, t);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetTimeDilation(1);
    if (!ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsExit) {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ExitGame(false);
    }
  }
  PlayFloroAudio(e) {
    if (this.Zge !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0);
    }
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRandomAudioDataByType(e);
    var t = i.GetAudioText();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(48), t);
    this.GetItem(47).SetUIActive(true);
    var t = i.GetAudioEvent();
    this.Zge = AudioSystem_1.AudioSystem.PostEvent(t, undefined, {
      CallbackMask: 1,
      CallbackHandler: (e, i) => {
        if (e === 0) {
          this.GetItem(47)?.SetUIActive(false);
        }
      }
    });
    if (e === 0 && (i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.RoleEntity)) {
      i.GetUiItemComponent().PlaySkillAnim();
    }
  }
  qKu() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount;
    let i = "#ffffff";
    if (e >= this.CNe.CardLimitCount) {
      i = "#ff5d5d";
    } else if (e >= FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT) {
      i = "#fec455";
    }
    this.GetText(53).SetText(`<color=${i}>${e}</color>/${FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT}`);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      var i;
      var t;
      var e = e[0];
      if (e === "FirstTerrainWithCard") {
        for (let e = 0; e < FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT; e++) {
          if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(e)) {
            if (i = this.Yuu.get(e)?.GetRootItem()) {
              return [i, i];
            } else {
              return undefined;
            }
          }
        }
      }
      if (e === "Tips") {
        if (t = this.TOu?.GetRootItem()) {
          return [t, t];
        } else {
          return undefined;
        }
      }
      if (e === "RemoveBtn") {
        if (t = this.TOu?.GetGuideUiItem("0")) {
          return [t, t];
        } else {
          return undefined;
        }
      }
      if (e === "FirstTerrainWithRedCard") {
        for (let e = 0; e < FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT; e++) {
          var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(e);
          if (s) {
            var s = s.CheckGetComponent(1);
            if (s && s.CardData?.GetCardSpecialEffect() === 2) {
              if (s = this.Yuu.get(e)?.GetRootItem()) {
                return [s, s];
              } else {
                return undefined;
              }
            }
          }
        }
      }
    }
  }
}
exports.FloroRanchGamePlayView = FloroRanchGamePlayView;
//# sourceMappingURL=FloroRanchGamePlayView.js.map