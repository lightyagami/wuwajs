"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueMainView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsActivityController_1 = require("../../Activity/SurvivorsActivityController");
const SurvivorsActivityDefine_1 = require("../../Activity/SurvivorsActivityDefine");
const SurvivorsFunctionButtonItem_1 = require("../Components/SurvivorsFunctionButtonItem");
const SurvivorsLevelInfoItem_1 = require("../Components/SurvivorsLevelInfoItem");
const SurvivorsLevelItem_1 = require("../Components/SurvivorsLevelItem");
const diffIdToleSpineName = ["Idle1", "Idle2", "Idle3"];
const diffIdUnlockToSpineName = ["None", "Idle1to2", "Idle2to3"];
const CENTER_AREA_HALF_HEIGHT = 100;
class SurvivorsRogueMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ActivityDataBase = undefined;
    this.ScrollViewComp = undefined;
    this.CaptionItem = undefined;
    this.ButtonTalentTree = undefined;
    this.ButtonHandbook = undefined;
    this.ButtonReward = undefined;
    this.LevelInfoItemMap = new Map();
    this.LevelItemMap = new Map();
    this.d2d = undefined;
    this.m2d = undefined;
    this.PWa = i => {
      if (this.ActivityDataBase.Id === i) {
        this.L2d();
      }
    };
    this.G3d = () => {
      this.L2d();
      var t = this.ActivityDataBase.GetAllLevelId();
      for (let i = t.length - 1; i >= 0; i--) {
        var e = t[i];
        var s = this.ActivityDataBase.GetCurrentLevelInfoByLevelId(e);
        var r = this.LevelItemMap.get(e);
        var h = this.LevelInfoItemMap.get(e);
        if (s && h) {
          r.Refresh(e, s.IsEndlessMode);
          h.Refresh(s, false, i);
        }
      }
    };
    this.Oli = (i, t) => {
      if (i === "SurvivorsWeaponUnlockView") {
        this.F3d();
      }
    };
    this.rH_ = [];
    this.N3d = 0;
    this.V3d = 0;
    this.Ra_ = 0.001;
    this.ScrollContentInitPosY = 0;
    this.ScrollContentLastPosY = 0;
    this.IsDragging = false;
    this.StartElasticMovement = false;
    this.pKe = () => this.IsDragging = true;
    this.SKe = () => {
      this.IsDragging = false;
      return this.StartElasticMovement = true;
    };
    this.Ga_ = i => {
      var i = i.Y;
      if (i !== this.Ra_ && (this.Ra_ = i, i = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY() ?? 0, this.ScrollContentLastPosY = i, this.f2d(i), this.d$_(i), this.g2d(), this.StartElasticMovement) && Math.abs(this.ScrollViewComp.GetVelocity().Y) < this.AVd) {
        i = this.DiffAreaUiInfoList[this.CurrentDiff];
        this.ScrollLevelIdToBottom(i.LowerBoundLevelId, true);
        this.StartElasticMovement = false;
      }
    };
    this.DVd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueChangeAreaDuration");
    this.UVd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueAreaBottomScale");
    this.xVd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueBackgroundParallaxFactor");
    this.AVd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueAutoAttachVelocityY");
    this.Q_t = Vector2D_1.Vector2D.Create();
    this.FW_ = true;
    this.GW_ = false;
    this.HW_ = () => {
      if (!this.IsDestroyOrDestroying) {
        this.ScrollTweenerEnd();
      }
    };
    this.DiffAreaUiInfoList = [];
    this.CurrentDiff = -1;
    this.CurrentUnlockDiff = -1;
    this.CUu = i => {
      if (i && (i = i.getAnimationName(), (i = diffIdUnlockToSpineName.indexOf(i)) !== -1)) {
        this.GetSpine(22)?.SetAnimation(0, diffIdToleSpineName[i], true);
      }
    };
    this.p2d = () => {
      UiManager_1.UiManager.OpenView("SurvivorsRogueRewardView", undefined, (i, t) => {
        if (i) {
          this.AddChildViewById(t);
        }
      });
    };
    this.v2d = () => {
      UiManager_1.UiManager.OpenView("SurvivorsHandbookView");
    };
    this.y2d = () => {
      UiManager_1.UiManager.OpenView("SurvivorsTalentTreeView");
    };
    this.S2d = () => {
      var i;
      if (this.FW_ && !this.M2d()) {
        i = this.DiffAreaUiInfoList[this.CurrentDiff + 1];
        this.ScrollLevelIdToBottom(i.LowerBoundLevelId, true);
      }
    };
    this.E2d = () => {
      var i;
      if (this.FW_ && !this.I2d()) {
        i = this.DiffAreaUiInfoList[this.CurrentDiff - 1];
        this.ScrollLevelIdToBottom(i.LowerBoundLevelId, true);
      }
    };
    this.eqd = i => {
      if (i) {
        this.d2d = new SurvivorsActivityDefine_1.SurvivorsLevelInfo();
        for (const t of this.LevelInfoItemMap.values()) {
          t.SetSaveFile(this.d2d);
        }
      }
    };
    this.T2d = i => {
      if (this.ActivityDataBase.GetCurrentLevelInfoByLevelId(i).Info.K6n) {
        var t;
        var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(i);
        ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo = this.d2d;
        if (this.d2d.IsSaveFile) {
          if (this.d2d.LevelId !== i) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterHasSaveTips");
            return;
          } else {
            t = {
              IsExternal: true,
              Batch: this.d2d.Batch,
              MaxBatch: this.d2d.MaxBatch
            };
            UiManager_1.UiManager.OpenView("SurvivorsRogueExitView", t);
            return;
          }
        }
        this.d2d.LevelId = i;
        this.d2d.InstId = e.InstId;
        this.d2d.IsEndless = this.ActivityDataBase.IsEndlessMode(i);
        UiManager_1.UiManager.OpenView("SurvivorsLevelDetailView");
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterLockTips");
      }
    };
    this.Yyd = () => {
      this.CloseMe();
    };
    this.b2d = () => {
      var i = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig()?.HelpId;
      if (i) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIExtendToggle], [10, UE.UIExtendToggle], [11, UE.UIExtendToggle], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.SpineSkeletonAnimationComponent], [25, UE.UIItem]];
    this.BtnBindInfo = [[7, this.S2d], [8, this.E2d]];
  }
  async OnCreateAsync() {
    this.m2d = await this.SAo("UiCurve_AreaMove");
  }
  async OnBeforeStartAsync() {
    var i = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (i && (this.ActivityDataBase = i, (i = []).push(this.R2d()), this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(), i.push(this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), this.CaptionItem.SetCloseCallBack(this.Yyd), this.CaptionItem.SetHelpCallBack(this.b2d), this.ButtonTalentTree = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), i.push(this.ButtonTalentTree.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.ButtonTalentTree.SetFunction(this.y2d), this.ButtonHandbook = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), i.push(this.ButtonHandbook.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.ButtonHandbook.SetFunction(this.v2d), this.ButtonReward = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), i.push(this.ButtonReward.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())), this.ButtonReward.SetFunction(this.p2d), await Promise.all(i), i = await ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestLastFile())) {
      this.d2d = i;
      this.sH_();
      this.Jfo();
      this.j3d();
    }
  }
  OnStart() {
    this.ScrollViewComp.OnLateUpdate.Bind(() => {
      this.w2d();
      this.ScrollViewComp.OnLateUpdate.Unbind();
    });
  }
  OnBeforeShow() {
    this.L2d();
    this.B4d();
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
    SurvivorsActivityController_1.SurvivorsActivityController.CheckIsActivityClose();
  }
  OnAfterShow() {
    ControllerHolder_1.ControllerHolder.SurvivorsRogueController.TryOpenWeaponUnlockView().then(i => {
      if (!i) {
        this.F3d();
      }
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsInstSettle, this.eqd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.G3d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.Oli);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsInstSettle, this.eqd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.G3d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.Oli);
  }
  OnBeforeDestroy() {
    this.rH_.length = 0;
    this.ScrollViewComp.OnScrollValueChange.Unbind();
    this.ScrollViewComp.OnPointerBeginDragCallBack.Unbind();
    this.ScrollViewComp.OnPointerEndDragCallBack.Unbind();
    this.GetSpine(22)?.AnimationComplete.Remove(this.CUu);
    this.QW_();
  }
  async SAo(i) {
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    return new LoadAsyncPromise_1.LoadAsyncPromise(i, UE.CurveFloat).Promise;
  }
  OnTick(i) {
    for (const t of this.LevelInfoItemMap.values()) {
      t.OnTick(i);
    }
  }
  Jfo() {
    this.ScrollViewComp = this.GetScrollViewWithScrollbar(2);
    this.ScrollViewComp.ScrollToEaseType = 28;
    this.ScrollViewComp.OnScrollValueChange.Bind(this.Ga_);
    this.ScrollViewComp.OnPointerBeginDragCallBack.Bind(this.pKe);
    this.ScrollViewComp.OnPointerEndDragCallBack.Bind(this.SKe);
    this.ScrollContentInitPosY = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY() ?? 0;
    this.ScrollContentLastPosY = this.ScrollContentInitPosY;
    this.V3d = CENTER_AREA_HALF_HEIGHT;
    this.N3d = this.ScrollViewComp.RootUIComp.GetHeight() / 2;
  }
  sH_() {
    var i = this.GetScrollViewWithScrollbar(1).ContentUIItem;
    this.rH_.push({
      Item: i,
      InitPosY: i.GetAnchorOffsetY() ?? 0,
      ParallaxFactor: this.xVd
    });
  }
  w2d() {
    var i = this.d2d.LevelId;
    if (i) {
      this.ScrollLevelIdToCenter(i);
    } else {
      i = this.ActivityDataBase.GetFocusLevelId();
      this.ScrollLevelIdToCenter(i);
    }
    for (const t of this.LevelInfoItemMap.values()) {
      t.SetSaveFile(this.d2d);
    }
  }
  d$_(e) {
    this.rH_.forEach(i => {
      var t = i.InitPosY + (e - this.ScrollContentInitPosY) * i.ParallaxFactor;
      i.Item.SetAnchorOffsetY(Math.max(0, t));
    });
  }
  ScrollLevelIdToBottom(i, t = true) {
    var e;
    var s = this.LevelItemMap.get(i);
    if (s && (e = (0, puerts_1.$ref)(new UE.Vector2D(this.ScrollViewComp.ContentUIItem.RelativeLocation)), s = s.GetBottomPosItem(), this.ScrollViewComp.StopMovement(), t && this.A2d(), this.ScrollViewComp.ScrollToBottom(e, s, t), t && (this.ScrollViewComp.Tweener?.SetDuration(this.DVd), this.ScrollViewComp.Tweener?.SetCurveFloat(this.m2d), this.YW_()), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "指定关卡滚动至下方", ["LevelId", i], ["Tween", t]);
    }
  }
  ScrollLevelIdToCenter(i) {
    var t = this.LevelItemMap.get(i);
    if (!!t && !((t = -t.GetOriginalItem().GetAnchorOffsetY() - this.N3d) <= 0)) {
      this.Q_t.Reset();
      this.Q_t.Y = t;
      this.ScrollViewComp.StopMovement();
      this.ScrollViewComp.ContentUIItem.SetAnchorOffset(this.Q_t.ToUeVector2D());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SurvivorsRogue", 37, "指定关卡滚动至中心区域", ["LevelId", i], ["PosY", t]);
      }
    }
  }
  A2d() {
    this.FW_ = false;
    this.ScrollViewComp.SetRayCastTargetForScrollView(false);
    this.D2d(false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "ScrollTweenerStart");
    }
  }
  ScrollTweenerEnd() {
    this.FW_ = true;
    this.ScrollViewComp.SetRayCastTargetForScrollView(true);
    this.D2d(true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "ScrollTweenerEnd");
    }
  }
  YW_() {
    if (!this.GW_) {
      if (this.ScrollViewComp.Tweener) {
        this.GW_ = true;
        this.ScrollViewComp.Tweener.OnCompleteCallBack.Bind(this.HW_);
      }
    }
  }
  QW_() {
    this.GW_ = false;
    this.ScrollViewComp.Tweener?.OnCompleteCallBack.Unbind();
  }
  M2d() {
    return this.CurrentDiff === 2;
  }
  I2d() {
    return this.CurrentDiff === 0;
  }
  async R2d() {
    var t = this.ActivityDataBase.GetAllLevelId();
    var e = [];
    var s = [18, 17, 16, 15, 14, 13, 12];
    var r = this.GetItem(20);
    var h = this.GetItem(25);
    r.SetUIActive(false);
    h.SetUIActive(false);
    var o = this.GetItem(19);
    for (let i = t.length - 1; i >= 0; i--) {
      var n = t[i];
      var a = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(n).LevelInfoType === 0 ? r : h;
      var v = new SurvivorsLevelInfoItem_1.SurvivorsLevelInfoItem();
      var a = LguiUtil_1.LguiUtil.CopyItem(a, o);
      e.push(v.CreateThenShowByActorAsync(a.GetOwner()));
      a.SetUIActive(true);
      this.LevelInfoItemMap.set(n, v);
      var a = new SurvivorsLevelItem_1.SurvivorsLevelItem();
      a.OnButtonClickedCallback = this.T2d;
      var v = this.GetItem(s[i]);
      e.push(a.CreateThenShowByActorAsync(v.GetOwner()));
      this.LevelItemMap.set(n, a);
    }
    await Promise.all(e);
  }
  j3d() {
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.ActivityDataBase.Id).AreaBoundLevelId;
    var e = this.ScrollViewComp.RootUIComp.GetHeight() * this.UVd;
    for (let i = 0; i < t.length; i++) {
      var s = t[i];
      var r = this.LevelItemMap.get(s).GetOriginalItem();
      var h = r.GetHeight();
      var r = r.GetAnchorOffsetY();
      var s = {
        Diff: 0 + i,
        LowerBoundLevelId: s,
        LowerBoundPosY: r - h + e
      };
      this.DiffAreaUiInfoList.push(s);
    }
    this.CurrentUnlockDiff = this.ActivityDataBase.GetCurrentUnlockDiffId();
    var i = diffIdToleSpineName[this.CurrentUnlockDiff];
    this.GetSpine(22).AnimationComplete.Add(this.CUu);
    this.GetSpine(22).SetAnimation(0, i, true);
  }
  g2d() {
    for (var [i, t] of this.LevelItemMap.entries()) {
      t = t.GetRootActor().D_K2_GetActorLocation();
      this.LevelInfoItemMap.get(i).GetRootActor().D_K2_SetActorLocation(t, false, undefined, false);
    }
  }
  f2d(t) {
    let e = 0;
    for (let i = 1; i < this.DiffAreaUiInfoList.length; i++) {
      var s = this.DiffAreaUiInfoList[i];
      if (t + s.LowerBoundPosY > 0) {
        break;
      }
      e = s.Diff;
    }
    if (this.CurrentDiff !== e) {
      this.H3d(this.CurrentDiff).SetToggleState(0);
      this.CurrentDiff = e;
      this.$3d();
    }
  }
  $3d() {
    var i = this.GetText(21);
    let t = "";
    switch (this.CurrentDiff) {
      case 2:
        t = "SurvivorsLevelDifficult_TagName";
        break;
      case 1:
        t = "SurvivorsLevelOrdinary_TagName";
        break;
      case 0:
        t = "SurvivorsLevelSimple_TagName";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    this.H3d(this.CurrentDiff).SetToggleState(1);
  }
  GetNearestCenterLevelId() {
    let i = 0;
    var t;
    var e;
    var s = MathUtils_1.MathUtils.Int32Max;
    var r = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY();
    var h = r - this.V3d;
    var o = r + this.V3d;
    for ([t, e] of this.LevelItemMap.entries()) {
      var n = e.GetOriginalItem();
      var n = n.GetHeight() - n.GetAnchorOffsetY() - this.N3d;
      if (h <= n && n <= o && Math.abs(n - this.N3d) < s) {
        i = t;
      }
    }
    return i;
  }
  H3d(i) {
    switch (i) {
      case 2:
        return this.GetExtendToggle(9);
      case 1:
        return this.GetExtendToggle(10);
      case 0:
        return this.GetExtendToggle(11);
    }
    return this.GetExtendToggle(10);
  }
  D2d(t) {
    this.LevelItemMap.forEach(i => {
      i.SetButtonInteractive(t);
    });
  }
  F3d() {
    let i = false;
    for (var [t, e] of this.LevelInfoItemMap.entries()) {
      var s = this.ActivityDataBase.TryRemoveLevelNewUnlock(t, false);
      var r = this.ActivityDataBase.TryRemoveLevelNewUnlock(t, true);
      var t = this.ActivityDataBase.TryRemoveLevelNewFinished(t);
      if (r) {
        e.PlaySequenceByName("EndlessOpen");
        i = true;
      } else if (s) {
        e.PlaySequenceByName("Unlock");
        i = true;
      } else if (t) {
        e.PlaySequenceByName("Complete");
      }
    }
    if (i) {
      this.ActivityDataBase.RefreshActivityRedDot();
    }
    if (this.ActivityDataBase.IsEndlessFirstOpenCheck()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsLevelSelection_EndlessTips");
    }
    var h = this.ActivityDataBase.GetCurrentUnlockDiffId();
    if (h > this.CurrentUnlockDiff) {
      this.CurrentUnlockDiff = h;
      h = diffIdUnlockToSpineName[this.CurrentUnlockDiff];
      this.GetSpine(22).SetAnimation(0, h, false);
    }
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
  }
  B4d() {
    let i = this.LevelItemMap.size;
    for (var [t, e] of this.LevelItemMap.entries()) {
      var s = this.ActivityDataBase.GetCurrentLevelInfoByLevelId(t);
      var r = this.LevelInfoItemMap.get(t);
      if (s) {
        e.Refresh(t, s.IsEndlessMode);
        r.Refresh(s, false, i);
        i--;
      }
    }
  }
  L2d() {
    var i = this.ActivityDataBase.GetFinishedRewardTaskCount().toString();
    var t = this.ActivityDataBase.RewardTaskMap.size.toString();
    this.ButtonReward.SetDescText("SurvivorsReward", i, t);
    this.ButtonReward.SetRedDotVisible(this.ActivityDataBase.GetRewardRedDotState());
    var i = this.ActivityDataBase.GetAllItemUnlockCount().toString();
    var t = this.ActivityDataBase.GetAllItemCount().toString();
    this.ButtonHandbook.SetDescText("SurvivorsCollection", i, t);
    var i = this.ActivityDataBase.TalentNodeMap;
    let e = 0;
    for (const s of i.values()) {
      if (s.Status === 1) {
        e++;
      }
    }
    t = i.size.toString();
    this.ButtonTalentTree.SetRedDotVisible(this.ActivityDataBase.GetTalentTreeRed());
    this.ButtonTalentTree.SetDescText("SurvivorsSkillTree", e.toString(), t);
  }
}
exports.SurvivorsRogueMainView = SurvivorsRogueMainView;
//# sourceMappingURL=SurvivorsRogueMainView.js.map