"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerStageItemBase_1 = require("./ShipTowerStageItemBase");
const stageTypeMap = new Map([[0, ShipTowerStageItemBase_1.ShipTowerStageItemOneTime], [1, ShipTowerStageItemBase_1.ShipTowerStageItemRefresh], [2, ShipTowerStageItemBase_1.ShipTowerStageItemEndless]]);
const MASK_LAYER_TAG = "ShipTower.CheckNeedShowView";
class ShipTowerView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.zJa = undefined;
    this.UiScrollViewStage = undefined;
    this.Z9_ = undefined;
    this.rH_ = [];
    this.Ra_ = 0.001;
    this.e$_ = 0;
    this.t$_ = 0;
    this.Ua_ = undefined;
    this.Da_ = 0;
    this.OA_ = new Map();
    this.hpt = [];
    this.sma = undefined;
    this.UiCureChangeArea = undefined;
    this.ChangeAreaScrollDuration = 0;
    this.UiCureFlipPage = undefined;
    this.UiCureScrollTo = undefined;
    this.FlipPageDistanceThreshold = 0;
    this.FlipPageScrollDuration = 0;
    this.FlipPageIntervalDistance = 0;
    this.i$_ = undefined;
    this.r$_ = undefined;
    this.o$_ = undefined;
    this.n$_ = undefined;
    this.s$_ = 0;
    this.a$_ = 0;
    this.h$_ = 0;
    this.l$_ = 0;
    this._$_ = new UE.Rotator(0, 0, 0);
    this.c$_ = new UE.Rotator(0, 0, 0);
    this.u$_ = new UE.Rotator(0, 0, 0);
    this.GW_ = false;
    this.FW_ = true;
    this.bzt = false;
    this.pKe = () => {
      this.bzt = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "拖动开始");
      }
      return true;
    };
    this.SKe = () => {
      this.bzt = false;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "拖动结束");
      }
      return true;
    };
    this.Xtc = t => {
      this.Ytc(false);
    };
    this.Ba_ = () => {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewBuff({
        OperationType: 0
      });
    };
    this.R2e = () => {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewReward();
    };
    this.fq_ = () => {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewRecord();
    };
    this.ka_ = () => {
      if (!this.NW_()) {
        for (const t of this.Ua_) {
          if (t.OutIndex + 1 < this.Da_) {
            this.VW_(t.OutIndex);
            return;
          }
        }
        this.VW_(0);
      }
    };
    this.Oa_ = () => {
      if (!this.jW_()) {
        for (const t of this.Ua_) {
          if (t.OutIndex > this.Da_) {
            this.VW_(t.OutIndex);
            return;
          }
        }
        this.VW_(this.Ua_[this.Ua_.length - 1].OutIndex);
      }
    };
    this.HW_ = () => {
      TimerSystem_1.TimerSystem.Next(() => {
        if (!this.IsDestroyOrDestroying) {
          this.ScrollTweenerEnd();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Temp", 69, "Tweener滚动完成");
          }
        }
      });
    };
    this.Ga_ = t => {
      var i;
      var e;
      var t = t.Y;
      if (t !== this.Ra_ && (this.Ra_ = t, e = (i = this.UiScrollViewStage.ContentUIItem.GetAnchorOffsetY() ?? 0) - this.t$_, this.t$_ = i, this.Fa_(i), this.d$_(i), this.UpdateGearScroll(e), this.UpdateCompassPercent(t), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("ShipTower", 69, "关卡列表滚动", ["比例[0-1]", t], ["增值", e], ["位置", i], ["顶部关卡索引", this.Da_], ["调试状态", ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub]);
      }
    };
    this.$W_ = () => {
      var t = ModelManager_1.ModelManager.ShipTowerModel.IsExistFirstGetBuff();
      this.GetItem(28)?.SetUIActive(t);
    };
    this.gq_ = () => {
      var t = ModelManager_1.ModelManager.ShipTowerModel.IsEndlessRecordOpen();
      this.GetButton(2)?.RootUIComp.SetUIActive(t);
    };
    this.kOe = () => {
      this.VG_();
      if (ModelManager_1.ModelManager.ShipTowerModel.TimeIsOver()) {
        this.jm();
        ModelManager_1.ModelManager.ShipTowerModel?.CheckIsNeedShowConfirmSeasonUpdate();
      }
    };
    this.Usa = () => {
      if (this.OpenParam?.IsFromInstanceDungeon) {
        ModelManager_1.ModelManager.ShipTowerModel.OpenConfirmBackWorld();
      } else {
        this.CloseMe();
      }
    };
    this.BA_ = () => {
      this.jG_();
    };
    this.a9_ = t => {
      this.OA_.get(t)?.UpdateData();
    };
    this._ti = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(ShipTowerDefine_1.SHIP_TOWER_HELP_ID);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIScrollViewWithScrollbarComponent], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIItem], [26, UE.UISprite], [25, UE.UISprite], [27, UE.UISprite], [28, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Ba_], [2, this.fq_], [5, this.ka_], [6, this.Oa_], [22, this.R2e]];
  }
  Es_() {
    if (!this.OpenParam?.IsOpenCover) {
      ModelManager_1.ModelManager.ShipTowerModel.ClearChallengeStageData();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ShipTower", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async nH_() {
    if (!this.OpenParam?.IsFromInstanceDungeon) {
      await ModelManager_1.ModelManager.ShipTowerModel.OpenWelcomeView();
    }
  }
  async OnCreateAsync() {
    this.UiCureChangeArea = await this.SAo(ShipTowerDefine_1.shipTowerCurveRes.ChangeArea);
    this.UiCureFlipPage = await this.SAo(ShipTowerDefine_1.shipTowerCurveRes.FlipPage);
    this.UiCureScrollTo = this.UiCureChangeArea;
  }
  async SAo(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat).Promise;
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await this.nH_();
    await ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto();
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.Usa);
    this.zJa.SetHelpBtnActive(true);
    this.zJa.SetHelpCallBack(this._ti);
    await this.Na_();
  }
  OnStart() {
    this.i$_ = this.GetItem(24);
    this.r$_ = this.GetSprite(26);
    this.o$_ = this.GetSprite(25);
    this.n$_ = this.GetSprite(27);
    this.UiScrollViewStage = this.GetScrollViewWithScrollbar(21);
    this.m$_();
    this.f$_();
    this.g$_();
    this.C$_();
    this.UiScrollViewStage.ScrollToEaseType = 28;
    this.UiScrollViewStage.OnScrollValueChange.Bind(this.Ga_);
    this.UiScrollViewStage.OnPointerBeginDragCallBack.Bind(this.pKe);
    this.UiScrollViewStage.OnPointerEndDragCallBack.Bind(this.SKe);
    this.e$_ = this.UiScrollViewStage.ContentUIItem.GetAnchorOffsetY() ?? 0;
    this.t$_ = this.e$_;
    this.Z9_ = this.GetItem(20);
    this.Ua_ = ConfigManager_1.ConfigManager.ShipTowerConfig.GetAllShowStageCfg();
    this.sH_();
    this.Fa_(this.e$_);
    this.bA_();
    this.InitCurStageItemPos();
    this.Pem();
  }
  Pem() {
    const t = this.OpenParam?.IsFromInstanceDungeon;
    this.UiBehaviourHomeBtn?.AddExtraAsyncCallback(async () => {
      if (t && ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower()) {
        ModelManager_1.ModelManager.TowerModel.CurrentTowerId = -1;
        await ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    });
  }
  InitCurStageItemPos() {
    var t;
    var i;
    var e = this.WW_();
    if (e) {
      this.v$_(0, false);
      e = (e = this.GetItem(7 + e.OrderIndex - 1)).GetStretchTop() + e.GetHeight() / 2;
      t = this.UiScrollViewStage.RootUIComp.GetHeight();
      i = this.UiScrollViewStage.ContentUIItem.GetHeight();
      i = Math.max(0, Math.min(i - t, e - t / 2));
      this.UiScrollViewStage.SetScrollValue(new UE.Vector2D(0, i));
    }
  }
  WW_() {
    if (this.OpenParam?.StageId !== undefined) {
      return ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(this.OpenParam.StageId);
    } else {
      return ModelManager_1.ModelManager.ShipTowerModel.GetNextChallengeStageData();
    }
  }
  sH_() {
    for (let t = 0; t < this.Z9_.UIChildren.Num(); t++) {
      var i = this.Z9_.UIChildren.Get(t);
      var e = this.p$_(i);
      this.rH_.push({
        Item: i,
        InitPosY: i.GetAnchorOffsetY() ?? 0,
        ParallaxSub: e
      });
    }
  }
  p$_(t, i = 1, e = 1) {
    t = t.GetDisplayName().split("#");
    t = Number(t[i]);
    if (isNaN(t)) {
      return e;
    } else {
      return t / 100;
    }
  }
  m$_() {
    var t = this.UiScrollViewStage.RootUIComp;
    this.FlipPageScrollDuration = this.p$_(t, 1, 0.2);
    this.FlipPageDistanceThreshold = this.p$_(t, 2, 300);
    this.FlipPageIntervalDistance = this.p$_(t, 3, 2);
  }
  f$_() {
    this.ChangeAreaScrollDuration = this.p$_(this.i$_);
  }
  g$_() {
    this.s$_ = this.p$_(this.r$_, 1, 300);
    this.a$_ = this.p$_(this.o$_, 1, 600);
  }
  C$_() {
    this.h$_ = this.p$_(this.n$_, 1, -45);
    this.l$_ = this.p$_(this.n$_, 2, 45);
  }
  bA_() {
    var t = this.OpenParam?.StageId ?? ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList[0].Id;
    var i = this.OpenParam?.ApplyTeamEditStageId;
    var e = this.OpenParam?.IsOpenStageDesc;
    var s = this.OpenParam?.IsOpenCover;
    if (e) {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewDesc({
        StageId: t,
        ApplyTeamEditStageId: i,
        IsOpenCover: s
      }, () => {
        this.h9_();
      });
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerRewardReceive, this.BA_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerSureResetStage, this.a9_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerStageUpdate, this.a9_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerSureCoverChallenge, this.a9_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerBuffNewUpdate, this.$W_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerEndlessRecordUpdate, this.gq_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.Xtc);
    RedDotController_1.RedDotController.BindRedDot("ShipTowerReward", this.GetItem(23));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerRewardReceive, this.BA_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerSureResetStage, this.a9_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerStageUpdate, this.a9_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerSureCoverChallenge, this.a9_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerBuffNewUpdate, this.$W_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerEndlessRecordUpdate, this.gq_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.Xtc);
    RedDotController_1.RedDotController.UnBindGivenUi("ShipTowerReward", this.GetItem(23));
  }
  OnBeforeShow() {
    this.Slo();
    this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, 500);
    ModelManager_1.ModelManager.ShipTowerModel.CloseWelcomeView();
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerSeason, ModelManager_1.ModelManager.ShipTowerModel.CurSeason);
  }
  OnAfterPlayStartSequence() {
    if (!this.OpenParam?.IsOpenStageDesc) {
      this.h9_();
    }
  }
  async h9_() {
    this.Ytc(true);
    await this.ztc().finally(() => {
      this.Ytc(false);
    });
  }
  async ztc() {
    await ModelManager_1.ModelManager.ShipTowerModel.CheckIsNeedShowSeasonReview();
    await ModelManager_1.ModelManager.ShipTowerModel.CheckShowGetBuff();
  }
  Ytc(t) {
    UiLayer_1.UiLayer.SetShowMaskLayer(MASK_LAYER_TAG, t);
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.UiScrollViewStage.OnScrollValueChange.Unbind();
    this.UiScrollViewStage.OnPointerBeginDragCallBack.Unbind();
    this.UiScrollViewStage.OnPointerEndDragCallBack.Unbind();
    this.QW_();
  }
  OnAfterDestroy() {}
  async Na_() {
    if (ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList.length === 0) {
      ModelManager_1.ModelManager.ShipTowerModel.CreateDefaultStageDataList();
    }
    var t = ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList;
    let s = 7;
    await Promise.all(t.map(async t => {
      var i = this.GetItem(s++);
      var e = new (stageTypeMap.get(t.StageType))();
      await e.Init(i, t);
      this.OA_.set(t.Id, e);
      this.hpt.push(e);
    }));
  }
  NW_() {
    return this.Ra_ <= 0.05;
  }
  jW_() {
    return this.Ra_ >= 0.95;
  }
  VW_(t) {
    if (this.FW_) {
      if (ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub) {
        this.f$_();
      }
      this.UiScrollViewStage.ScrollToDuration = this.ChangeAreaScrollDuration;
      this.UiCureScrollTo = this.UiCureChangeArea;
      this.v$_(t);
    }
  }
  ScrollToIndexFlipPage(t, i = true) {
    this.UiScrollViewStage.ScrollToDuration = this.FlipPageScrollDuration;
    this.UiCureScrollTo = this.UiCureFlipPage;
    if (i) {
      this.v$_(t);
    } else {
      this.KW_(t);
    }
  }
  XW_(t) {
    return MathCommon_1.MathCommon.Clamp(7 + t, 7, 18);
  }
  v$_(t, i = true) {
    var e = this.XW_(t);
    var s = this.GetItem(e);
    var h = (0, puerts_1.$ref)(new UE.Vector2D(this.UiScrollViewStage.ContentUIItem.RelativeLocation));
    this.UiScrollViewStage.StopMovement();
    this.UiScrollViewStage.ScrollToTop(h, s, i);
    this.UiScrollViewStage.Tweener?.SetCurveFloat(this.UiCureScrollTo);
    if (i) {
      this.ScrollTweenerStart();
      this.YW_();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "关卡滚动到顶部", ["第几艘", t + 1], ["组件索引", e]);
    }
  }
  KW_(t, i = true) {
    var e = this.XW_(t);
    var s = this.GetItem(e);
    var h = (0, puerts_1.$ref)(new UE.Vector2D(this.UiScrollViewStage.ContentUIItem.RelativeLocation));
    this.UiScrollViewStage.StopMovement();
    this.UiScrollViewStage.ScrollToBottom(h, s, i);
    this.UiScrollViewStage.Tweener?.SetCurveFloat(this.UiCureScrollTo);
    if (i) {
      this.ScrollTweenerStart();
      this.YW_();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "关卡滚动到底部", ["第几艘", t + 1], ["组件索引", e]);
    }
  }
  ScrollTweenerStart() {
    this.FW_ = false;
    this.UiScrollViewStage.SetRayCastTargetForScrollView(false);
    this.zW_(false);
  }
  zW_(i) {
    this.hpt.forEach(t => {
      t.SetClickEnable(i);
    });
  }
  ScrollTweenerEnd() {
    this.FW_ = true;
    this.UiScrollViewStage.SetRayCastTargetForScrollView(true);
    this.zW_(true);
  }
  YW_() {
    if (!this.GW_) {
      if (this.UiScrollViewStage.Tweener) {
        this.GW_ = true;
        this.UiScrollViewStage.Tweener.OnCompleteCallBack.Bind(this.HW_);
      }
    }
  }
  QW_() {
    this.GW_ = false;
    this.UiScrollViewStage.Tweener?.OnCompleteCallBack.Unbind();
  }
  d$_(s) {
    const h = ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub;
    this.rH_.forEach(t => {
      var i = h ? this.p$_(t.Item) : t.ParallaxSub;
      var e = t.InitPosY + (s - this.e$_) * i;
      t.Item.SetAnchorOffsetY(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "更新视差节点位置", ["节点名", t.Item.GetDisplayName()], ["位置", e], ["相对比例", i]);
      }
    });
  }
  UpdateGearScroll(t) {
    if (ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub) {
      this.g$_();
    }
    var i = t / this.s$_ * 360;
    var e = t / this.a$_ * 360;
    this.c$_.Yaw = this.c$_.Yaw + i;
    this.u$_.Yaw = this.u$_.Yaw - e;
    this.r$_.SetUIRelativeRotation(this.c$_);
    this.o$_.SetUIRelativeRotation(this.u$_);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "更新齿轮滚动", ["增值", t], ["齿轮角度", i], ["大齿轮角度", e], ["齿轮长度", this.s$_], ["大齿轮长度", this.a$_]);
    }
  }
  UpdateCompassPercent(t) {
    if (ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub) {
      this.C$_();
    }
    var i = this.l$_ - this.h$_;
    var e = t * i + this.h$_;
    this._$_.Yaw = e;
    this.n$_.SetUIRelativeRotation(this._$_);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "更新指南针进度", ["比例[0-1]", t], ["总角度", i], ["当前角度", e], ["开始角度", this.h$_], ["结束角度", this.l$_]);
    }
  }
  Fa_(i) {
    let e = this.Da_;
    for (let t = 7; t <= 18; t++) {
      var s = this.GetItem(t);
      var h = s.GetHeight();
      var s = s.GetStretchTop() + h;
      e = t - 7 + 1;
      if (i <= s) {
        break;
      }
    }
    if (this.Da_ !== e) {
      this.Da_ = e;
      for (const t of this.Ua_) {
        if (t.OutIndex >= this.Da_) {
          this.GetText(19).ShowTextNew(t.Name);
          break;
        }
      }
    }
  }
  CheckFlipPage(i) {
    var e = this.t$_;
    if (this.FW_ && !(this.Ra_ <= 0) && !(this.Ra_ >= 1) && !this.bzt) {
      var t = ModelManager_1.ModelManager.ShipTowerModel.DebugParallaxSub;
      if (t) {
        this.m$_();
      }
      if (!(Math.abs(i) > this.FlipPageIntervalDistance)) {
        var s = this.UiScrollViewStage.RootUIComp.GetHeight();
        for (let t = 0; t < this.Ua_.length; t++) {
          var h = this.Ua_[t - 1];
          var a = this.Ua_[t];
          if (h && h.OutIndex + 1 === a.OutIndex) {
            this.JW_(h.OutIndex - 1, h.OutIndex, s, i > 0);
            return;
          }
          if (this.ZW_(a.OutIndex, e)) {
            return;
          }
          if (this.eQ_(a.OutIndex - 1, e + s)) {
            return;
          }
        }
      }
    }
  }
  JW_(t, i, e, s) {
    var h = this.t$_;
    var a = h + e;
    var r = this.GetStageItemPosY(t, false);
    var o = this.GetStageItemPosY(i);
    if (!(a < r + this.FlipPageDistanceThreshold * 0.5)) {
      if (!(a < o)) {
        if ((r = this.UiScrollViewStage.ContentUIItem.GetHeight()) <= o + e) {
          if (r - e - h < this.FlipPageDistanceThreshold * 0.5) {
            this.ScrollToIndexFlipPage(i, true);
            return;
          } else {
            this.ScrollToIndexFlipPage(s ? i : t, s);
            return;
          }
        } else {
          if (!(h > o + this.FlipPageDistanceThreshold * 0.5)) {
            this.ScrollToIndexFlipPage(i);
          }
          return;
        }
      }
      this.ScrollToIndexFlipPage(s ? i : t, s);
    }
  }
  ZW_(t, i) {
    var e = this.GetStageItemPosY(t);
    var s = this.FlipPageDistanceThreshold;
    var i = i - e;
    return -s < i && i < s && (-s * 0.5 < i ? this.ScrollToIndexFlipPage(t, true) : this.ScrollToIndexFlipPage(t - 1, false), true);
  }
  eQ_(t, i) {
    i -= this.GetStageItemPosY(t, false);
    return i > -this.FlipPageDistanceThreshold && i < this.FlipPageDistanceThreshold && (i < this.FlipPageDistanceThreshold * 0.5 ? this.ScrollToIndexFlipPage(t, false) : this.ScrollToIndexFlipPage(t + 1, true), true);
  }
  GetStageItemPosY(t, i = true) {
    var t = this.XW_(t);
    var t = this.GetItem(t);
    var e = t.GetStretchTop();
    if (i) {
      return e;
    } else {
      return e + t.GetHeight();
    }
  }
  Slo() {
    this.gq_();
    this.jG_();
    this.$W_();
  }
  jG_() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText();
    var t = `${ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName()}(${t})`;
    this.GetText(3).SetText(t);
    this.VG_();
  }
  VG_() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.GetRewardCountDownDesc();
    this.GetText(4)?.SetText(t);
  }
  jm() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.sma)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.sma);
      this.sma = undefined;
    }
  }
}
exports.ShipTowerView = ShipTowerView;
//# sourceMappingURL=ShipTowerView.js.map