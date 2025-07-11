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
    this.NOu = 0;
    this.fhu = [];
    this.V9c = undefined;
    this.CNe = undefined;
    this.tOu = undefined;
    this.Zku = undefined;
    this.xOu = undefined;
    this.UOu = undefined;
    this.CGu = undefined;
    this.pGu = undefined;
    this.vGu = undefined;
    this.yGu = undefined;
    this.tM1 = undefined;
    this.Zge = 0;
    this.duu = new Map();
    this.muu = new Map();
    this.fuu = new Map();
    this.U0u = undefined;
    this.VOu = undefined;
    this.c9c = undefined;
    this.iOu = e => {
      var i = this.duu.get(e).GetEntity();
      var t = this.muu.get(e).GetEntity();
      var i = !i && !t;
      this.duu.get(e).SetInteractive(!i);
    };
    this.zpe = e => {
      var i = e.EntityType;
      var e = e.CheckGetComponent(0).Point;
      if (i === 1) {
        this.rOu(e);
      } else if (i === 2) {
        this.oOu(e);
      }
      this.RefreshCurrencyInfo();
    };
    this.rOu = e => {
      var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTerrainEntityByPoint(e);
      var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(e);
      this.tOu.ChangeTipInfo(1, e, i);
      this.jt_();
    };
    this.oOu = e => {
      e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(e);
      this.tOu.ChangeTipInfo(2, e, undefined);
      this.jt_();
    };
    this.KGu = e => {
      e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(e);
      if (e) {
        this.tOu.ChangeTipInfo(1, e, undefined);
      } else {
        this.tOu.ChangeTipInfo(0, undefined, undefined);
      }
      this.nOu();
    };
    this.QTu = () => {
      this.tOu.Clear();
      this.jt_();
      this.TLt();
    };
    this.XGu = e => {
      if (e === "Close") {
        this.CGu?.SetUiActive(false);
      }
    };
    this.YGu = e => {
      if (e === "Close") {
        this.pGu?.SetUiActive(false);
      }
    };
    this.rRu = () => {
      this.RefreshCurrencyInfo();
      this.tM1.PlayLevelSequenceByName("Hit");
    };
    this.dHc = () => {
      this.RefreshCurrencyInfo();
    };
    this.Zcu = e => {
      this.oOu(e);
    };
    this.tdu = e => {
      this.rOu(e);
    };
    this.dgu = e => {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.CanFsmInsertDailyTask()) {
        this.QTu();
        UiManager_1.UiManager.OpenView("FloroRanchSkillTipView", e);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("当前无法使用技能");
      }
    };
    this.ndu = () => {
      this.QTu();
      var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      FloroRanchController_1.FloroRanchController.SendFloroRanchPlayNextDayRequest(this.CNe.Id, e, e => {
        if (e) {
          this.RefreshCurrencyInfo();
          this.uXa();
        }
      });
    };
    this.lOu = () => {
      this.QTu();
      UiManager_1.UiManager.OpenView("FloroRanchIncomeDetailView", this.KGu);
    };
    this._Ou = () => {
      UiManager_1.UiManager.OpenView("FloroRanchGamePlayExplainView");
    };
    this.RGu = () => {
      this.QTu();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ShowRecordView();
    };
    this.u9c = () => {
      if (this.c9c.IsShowOrShowing) {
        this.c9c.Hide();
      } else {
        this.c9c.Show();
      }
    };
    this.mQc = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_AnimalAllFull");
    };
    this.sdu = () => {
      this.QTu();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.PauseGame();
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchPauseView");
    };
    this.Upu = () => {
      this.QTu();
      this.NOu = (this.NOu + 1) % this.fhu.length;
      var e = this.fhu[this.NOu];
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSpeed, e);
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetTimeDilation(e);
      var i = e >= FloroRanchDefine_1.FLORO_RANCH_MAX_SPEED;
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip = i) {
        this.GetText(2).SetText("MAX");
      } else {
        this.GetText(2).SetText("×" + e.toFixed(1));
      }
      this.GetSprite(4).SetUIActive(this.NOu !== 0);
    };
    this.mji = () => {
      this.QTu();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(FloroRanchDefine_1.FLORO_RANCH_GAME_PLAY_HELP_ID);
    };
    this.VSu = () => {
      this.RefreshCurrencyInfo();
      this.uXa();
    };
    this.$Uu = () => {
      this.RefreshCurrencyInfo();
    };
    this.DOu = () => {
      this.KWc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UISprite], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UITexture], [14, UE.UITexture], [15, UE.UIItem], [52, UE.UIText], [51, UE.UITexture], [54, UE.UIButtonComponent], [16, UE.UIItem], [17, UE.UIButtonComponent], [18, UE.SpineSkeletonAnimationComponent], [19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [37, UE.UIItem], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UIItem], [43, UE.UIItem], [44, UE.UIItem], [45, UE.UIItem], [46, UE.UIItem], [47, UE.UIItem], [48, UE.UIText], [49, UE.UIButtonComponent], [50, UE.UIItem], [53, UE.UIText], [55, UE.UIButtonComponent], [56, UE.UIButtonComponent], [57, UE.UIItem], [58, UE.UITexture], [59, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.sdu], [3, this.Upu], [5, this.mji], [20, this.dgu], [17, this.ndu], [54, this.lOu], [49, this.QTu], [55, this._Ou], [6, this.RGu], [56, this.u9c], [59, this.mQc]];
  }
  async OnBeforeStartAsync() {
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.tOu = new FloroRanchTipData_1.FloroRanchTipData();
    this.jOu();
    await this.tcu();
    var i = [];
    i.push(this.Dpu());
    i.push(this.yyu());
    i.push(this.HOu());
    i.push(this.BOu());
    i.push(this.kOu());
    for (let e = 0; e < FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT; e++) {
      i.push(this.puu(e));
      i.push(this.CreateSpineItem(e));
    }
    for (let e = 0; e < ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount; e++) {
      i.push(this.yuu(e));
    }
    this.Zku = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    var e = this.GetItem(1);
    i.push(this.Zku.CreateThenShowByActorAsync(e.GetOwner()));
    await Promise.all(i);
    this.vGu = new LevelSequencePlayer_1.LevelSequencePlayer(this.CGu.GetRootItem());
    this.vGu.BindSequenceCloseEvent(this.XGu);
    this.yGu = new LevelSequencePlayer_1.LevelSequencePlayer(this.pGu.GetRootItem());
    this.yGu.BindSequenceCloseEvent(this.YGu);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchCurrencyChange, this.$Uu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh, this.VSu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.DOu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchCurrencyChange, this.$Uu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh, this.VSu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.DOu);
  }
  async BindTerrainItem(e) {
    var i = e.CheckGetComponent(0).Point;
    let t = this.duu.get(i);
    if (!t) {
      await this.puu(i);
      t = this.duu.get(i);
    }
    t.BindData(e);
    return t;
  }
  async puu(e) {
    var i = new FloroRanchUiTerrainItem_1.FloroRanchUiTerrainItem();
    if (e < 0 || e > FloroRanchDefine_1.FLORO_RANCH_TERRAIN_ITEM_COUNT) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "TerrainItem index is out of range: " + e);
      }
    } else {
      await i.CreateThenShowByActorAsync(this.GetItem(TERRAIN_ITEM_START_INDEX + e).GetOwner());
      i.BindClickPosCallback(() => {
        this.tdu(e);
      });
      i.BindEntityChangedCallback(this.iOu);
      i.SetInteractive(false);
      this.duu.set(e, i);
    }
  }
  async BindToyItem(e) {
    var i = e.CheckGetComponent(0).Point;
    let t = this.fuu.get(i);
    if (!t) {
      await this.yuu(i);
      t = this.fuu.get(i);
    }
    t.BindData(e);
    return t;
  }
  async yuu(e) {
    var i;
    var t;
    var s = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    if (e < 0 || s <= e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "ToyItem index is out of range: " + e);
      }
    } else {
      (s = new FloroRanchUiToyItem_1.FloroRanchUiToyItem()).BindClickCallback(() => {
        this.Zcu(e);
      });
      t = this.GetItem(22);
      i = this.GetItem(21);
      t = LguiUtil_1.LguiUtil.CopyItem(t, i);
      await s.CreateThenShowByActorAsync(t.GetOwner());
      this.fuu.set(e, s);
    }
  }
  async BindSpineItem(e) {
    var i = e.CheckGetComponent(0).Point;
    let t = this.muu.get(i);
    if (!t) {
      await this.CreateSpineItem(i);
      t = this.muu.get(i);
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
    s.BindEntityChangedCallback(this.iOu);
    s.BindMoveCurve(this.V9c);
    var t = this.duu.get(e).GetRootActor().GetTransform();
    s.FollowPosition(t);
    this.muu.set(e, s);
  }
  async BindRoleSkillItem(e) {
    if (!this.VOu) {
      await this.HOu();
    }
    this.VOu.BindData(e);
    return this.VOu;
  }
  async HOu() {
    if (!this.VOu) {
      this.VOu = new FloroRanchUiRoleSkillItem_1.FloroRanchUiRoleSkillItem();
      this.VOu.BindClickSkillCallback(this.dgu);
      await this.VOu.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
    }
  }
  async Dpu() {
    var e = this.GetItem(7);
    this.pGu = new FloroRanchTerrainTipItem_1.FloroRanchTerrainTipItem();
    await this.pGu.CreateByResourceIdAsync("PnlMapInfo", e, false);
    this.CGu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    await this.CGu.CreateByResourceIdAsync("PnlCardItemInfo", e, false);
    this.GetButton(56).RootUIComp.SetUIActive(Macro_1.NOT_SHIPPING_ENVIRONMENT);
  }
  async yyu() {
    this.U0u = new FloroRanchPopupRewardPanel_1.FloroRanchPopupRewardPanel();
    await this.U0u.CreateThenShowByActorAsync(this.GetItem(46).GetOwner());
    this.U0u.BindCoinChangeCallBack(this.rRu);
    this.U0u.BindDiamondChangeCallBack(this.dHc);
  }
  jOu() {
    this.fhu = FloroRanchDefine_1.floroRanchSpeedList;
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSpeed, 1);
    if (e && (this.NOu = this.fhu.indexOf(e), this.NOu === -1)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "FloroRanchSpeed is out of range: " + e);
      }
      this.NOu = 0;
    }
    e = this.fhu[this.NOu];
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSpeed, e);
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetTimeDilation(e);
    this.GetText(2).SetText("×" + e.toFixed(1));
    this.GetSprite(4).SetUIActive(this.NOu !== 0);
  }
  async BOu() {
    this.xOu = new FloroRanchDayProgressItem_1.FloroRanchDayProgressItem();
    var e = this.GetItem(16);
    await this.xOu.CreateByResourceIdAsync("PnlDayStateB", e, false);
  }
  async kOu() {
    this.UOu = new FloroRanchDayProgressItem_1.FloroRanchDayProgressItem();
    var e = this.GetItem(16);
    await this.UOu.CreateByResourceIdAsync("PnlDayState", e, false);
  }
  async tcu() {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/UI/UIResources/UiActivity/Curve/Pasture/Curve_ItemMove.Curve_ItemMove", UE.CurveFloat, e => {
      this.V9c = e;
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
    this.Zku.SetCurrencyData(i);
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
    this.UOu.SetUiActive(t);
    this.xOu.SetUiActive(!t);
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.RemindDay;
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.StageDayCount;
    (t ? this.UOu : this.xOu).RefreshDay(i, e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Farm_DaySum", ModelManager_1.ModelManager.FloroRanchGamePlayModel.TotalDayCount);
    this.KWc();
  }
  SetNewDayButtonActive(e) {
    this.GetButton(17).RootUIComp.SetUIActive(e);
  }
  SetShowButtonActive(e) {
    this.GetButton(6).RootUIComp.SetUIActive(e);
  }
  SetMaskPanelActive(e) {
    this.GetItem(50).SetUIActive(e);
  }
  SetToyPanelActive(e) {
    this.GetItem(21).SetUIActive(e);
  }
  async PlayNewDayAnim() {
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.TotalDayCount !== 1) {
      await this.UiViewSequence.PlaySequenceAsync("NewDay", new CustomPromise_1.CustomPromise());
      this.PlayFloroAudio(1);
    }
    this.RefreshCurrencyInfo();
    this.uXa();
  }
  jt_() {
    var e = this.tOu.LastMainEntityData;
    var i = this.tOu.LastSubEntityData;
    var t = this.tOu.MainEntityData;
    var s = this.tOu.SubEntityData;
    var r = this.tOu.LastTipType;
    var a = this.tOu.TipType;
    var r = r === 0 || a === 0;
    if (t) {
      this.MGu(r);
    } else if (e) {
      this.EGu(r);
    }
    if (s) {
      this.TGu(r);
    } else if (i) {
      this.bGu(r);
    }
    this.nOu();
  }
  bGu(e = true) {
    this.yGu.PlayLevelSequenceByName("Close");
    if (!e) {
      this.yGu.EndSequenceLastFrame("Close");
      this.pGu?.SetUiActive(false);
    }
  }
  EGu(e = true) {
    this.vGu.PlayLevelSequenceByName("Close");
    if (!e) {
      this.vGu.EndSequenceLastFrame("Close");
      this.CGu?.SetUiActive(false);
    }
  }
  TGu(e = true) {
    var i = this.tOu.SubEntityData;
    this.pGu.RefreshInfoTipByEntity(i);
    var i = this.tOu.MainEntityData;
    this.NFu(i ? FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT : FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER);
    this.yGu.PlayLevelSequenceByName("Start");
    if (!e) {
      this.yGu.EndSequenceLastFrame("Start");
    }
    this.MLt();
  }
  MGu(e = true) {
    var i = this.tOu.MainEntityData;
    this.CGu?.RefreshInfoTipByParam({
      TipType: 0,
      EntityData: i,
      RemoveCallback: this.zpe,
      CurrencyData: undefined
    });
    this.vGu.PlayLevelSequenceByName("Start");
    if (!e) {
      this.vGu.EndSequenceLastFrame("Start");
    }
    this.MLt();
  }
  NFu(e) {
    var i = this.pGu?.GetRootItem();
    if (i) {
      i.SetHeight(e);
    }
  }
  nOu() {
    this.zGu(this.tOu.LastTipType, this.tOu.LastMainEntityData, this.tOu.LastSubEntityData, false);
    this.zGu(this.tOu.TipType, this.tOu.MainEntityData, this.tOu.SubEntityData, true);
  }
  zGu(e, i, t, s) {
    if (e === 1) {
      let e = -1;
      if (i) {
        e = i.GetPoint();
      } else if (t) {
        e = t.GetPoint();
      }
      t = this.duu.get(e);
      if (t) {
        t.SetSelectState(s);
      }
    }
    if (e === 2 && (t = i?.GetPoint() ?? -1, e = this.fuu.get(t))) {
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
    var r = s.GetUIWorldPosition();
    r.X += s.GetWidth() / 2;
    this.U0u.BindCoinTargetPos(r);
    await this.U0u.ShowPopupReward(e, i, t);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.SetTimeDilation(1);
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
  KWc() {
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
            if (i = this.duu.get(e)?.GetRootItem()) {
              return [i, i];
            } else {
              return undefined;
            }
          }
        }
      }
      if (e === "Tips") {
        if (t = this.CGu?.GetRootItem()) {
          return [t, t];
        } else {
          return undefined;
        }
      }
      if (e === "RemoveBtn") {
        if (t = this.CGu?.GetGuideUiItem("0")) {
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
              if (s = this.duu.get(e)?.GetRootItem()) {
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