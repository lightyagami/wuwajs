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
    this.PWa = t => {
      if (this.ActivityDataBase.Id === t) {
        this.L2d();
      }
    };
    this.G3d = () => {
      this.L2d();
      var i = this.ActivityDataBase.GetAllLevelId();
      for (let t = i.length - 1; t >= 0; t--) {
        var e = i[t];
        var s = this.ActivityDataBase.GetCurrentLevelInfoByLevelId(e);
        var r = this.LevelItemMap.get(e);
        var h = this.LevelInfoItemMap.get(e);
        if (s && h) {
          r.Refresh(e, s.IsEndlessMode);
          h.Refresh(s, false, t);
        }
      }
    };
    this.Oli = (t, i) => {
      if (t === "SurvivorsWeaponUnlockView") {
        this.F3d();
      }
    };
    this.mKd = () => {
      this.L2d();
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
    this.Ga_ = t => {
      var t = t.Y;
      if (t !== this.Ra_ && (this.Ra_ = t, t = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY() ?? 0, this.ScrollContentLastPosY = t, this.f2d(t), this.d$_(t), this.g2d(), this.StartElasticMovement) && Math.abs(this.ScrollViewComp.GetVelocity().Y) < this.AVd) {
        t = this.DiffAreaUiInfoList[this.CurrentDiff];
        this.ScrollLevelIdToBottom(t.LowerBoundLevelId, true);
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
    this.CUu = t => {
      if (t && (t = t.getAnimationName(), (t = diffIdUnlockToSpineName.indexOf(t)) !== -1)) {
        this.GetSpine(22)?.SetAnimation(0, diffIdToleSpineName[t], true);
      }
    };
    this.p2d = () => {
      UiManager_1.UiManager.OpenView("SurvivorsRogueRewardView", undefined, (t, i) => {
        if (t) {
          this.AddChildViewById(i);
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
      var t;
      if (!this.IsDragging) {
        if (this.FW_ && !this.M2d()) {
          t = this.DiffAreaUiInfoList[this.CurrentDiff + 1];
          this.ScrollLevelIdToBottom(t.LowerBoundLevelId, true);
        }
      }
    };
    this.E2d = () => {
      var t;
      if (!this.IsDragging) {
        if (this.FW_ && !this.I2d()) {
          t = this.DiffAreaUiInfoList[this.CurrentDiff - 1];
          this.ScrollLevelIdToBottom(t.LowerBoundLevelId, true);
        }
      }
    };
    this.eqd = t => {
      if (t) {
        this.d2d = new SurvivorsActivityDefine_1.SurvivorsLevelInfo();
        for (const i of this.LevelInfoItemMap.values()) {
          i.SetSaveFile(this.d2d);
        }
      }
    };
    this.T2d = t => {
      var i = this.ActivityDataBase.IsEndlessMode(t);
      if (this.ActivityDataBase.GetLevelUnlockState(t, i)) {
        var e;
        var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(t);
        ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo = this.d2d;
        if (this.d2d.IsSaveFile) {
          if (this.d2d.LevelId !== t) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterHasSaveTips");
            return;
          } else {
            e = {
              IsExternal: true,
              Batch: this.d2d.Batch,
              MaxBatch: this.d2d.MaxBatch
            };
            UiManager_1.UiManager.OpenView("SurvivorsRogueExitView", e);
            return;
          }
        }
        this.d2d.LevelId = t;
        this.d2d.InstId = i.InstId;
        this.d2d.IsEndless = this.ActivityDataBase.IsEndlessMode(t);
        UiManager_1.UiManager.OpenView("SurvivorsLevelDetailView");
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterLockTips");
      }
    };
    this.Yyd = () => {
      this.CloseMe();
    };
    this.b2d = () => {
      var t = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig()?.HelpId;
      if (t) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
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
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (t && (this.ActivityDataBase = t, (t = []).push(this.R2d()), this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(), t.push(this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), this.CaptionItem.SetCloseCallBack(this.Yyd), this.CaptionItem.SetHelpCallBack(this.b2d), this.ButtonTalentTree = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), t.push(this.ButtonTalentTree.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.ButtonTalentTree.SetFunction(this.y2d), this.ButtonHandbook = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), t.push(this.ButtonHandbook.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.ButtonHandbook.SetFunction(this.v2d), this.ButtonReward = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), t.push(this.ButtonReward.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())), this.ButtonReward.SetFunction(this.p2d), await Promise.all(t), t = await ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestLastFile())) {
      this.d2d = t;
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
    ControllerHolder_1.ControllerHolder.SurvivorsRogueController.TryOpenWeaponUnlockView().then(t => {
      if (!t) {
        this.F3d();
      }
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsInstSettle, this.eqd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.G3d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.Oli);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, this.mKd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsInstSettle, this.eqd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.G3d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.Oli);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, this.mKd);
  }
  OnBeforeDestroy() {
    this.rH_.length = 0;
    this.ScrollViewComp.OnScrollValueChange.Unbind();
    this.ScrollViewComp.OnPointerBeginDragCallBack.Unbind();
    this.ScrollViewComp.OnPointerEndDragCallBack.Unbind();
    this.GetSpine(22)?.AnimationComplete.Remove(this.CUu);
    this.QW_();
  }
  async SAo(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    return new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat).Promise;
  }
  OnTick(t) {
    for (const i of this.LevelInfoItemMap.values()) {
      i.OnTick(t);
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
    var t = this.GetScrollViewWithScrollbar(1).ContentUIItem;
    this.rH_.push({
      Item: t,
      InitPosY: t.GetAnchorOffsetY() ?? 0,
      ParallaxFactor: this.xVd
    });
  }
  w2d() {
    var t = this.d2d.LevelId;
    if (t) {
      this.ScrollLevelIdToCenter(t);
    } else {
      t = this.ActivityDataBase.GetFocusLevelId();
      this.ScrollLevelIdToCenter(t);
    }
    for (const i of this.LevelInfoItemMap.values()) {
      i.SetSaveFile(this.d2d);
    }
  }
  d$_(e) {
    this.rH_.forEach(t => {
      var i = t.InitPosY + (e - this.ScrollContentInitPosY) * t.ParallaxFactor;
      t.Item.SetAnchorOffsetY(Math.max(0, i));
    });
  }
  ScrollLevelIdToBottom(t, i = true) {
    var e;
    var s = this.LevelItemMap.get(t);
    if (s && (e = (0, puerts_1.$ref)(new UE.Vector2D(this.ScrollViewComp.ContentUIItem.RelativeLocation)), s = s.GetBottomPosItem(), this.ScrollViewComp.StopMovement(), i && this.A2d(), this.ScrollViewComp.ScrollToBottom(e, s, i), i && (this.ScrollViewComp.Tweener?.SetDuration(this.DVd), this.ScrollViewComp.Tweener?.SetCurveFloat(this.m2d), this.YW_()), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "指定关卡滚动至下方", ["LevelId", t], ["Tween", i]);
    }
  }
  ScrollLevelIdToCenter(t) {
    var i = this.LevelItemMap.get(t);
    if (!!i && !((i = -i.GetOriginalItem().GetAnchorOffsetY() - this.N3d) <= 0)) {
      this.Q_t.Reset();
      this.Q_t.Y = i;
      this.ScrollViewComp.StopMovement();
      this.ScrollViewComp.ContentUIItem.SetAnchorOffset(this.Q_t.ToUeVector2D());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SurvivorsRogue", 37, "指定关卡滚动至中心区域", ["LevelId", t], ["PosY", i]);
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
    var i = this.ActivityDataBase.GetAllLevelId();
    var e = [];
    var s = [18, 17, 16, 15, 14, 13, 12];
    var r = this.GetItem(20);
    var h = this.GetItem(25);
    r.SetUIActive(false);
    h.SetUIActive(false);
    var o = this.GetItem(19);
    for (let t = i.length - 1; t >= 0; t--) {
      var n = i[t];
      var a = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(n).LevelInfoType === 0 ? r : h;
      var v = new SurvivorsLevelInfoItem_1.SurvivorsLevelInfoItem();
      var a = LguiUtil_1.LguiUtil.CopyItem(a, o);
      e.push(v.CreateThenShowByActorAsync(a.GetOwner()));
      a.SetUIActive(true);
      this.LevelInfoItemMap.set(n, v);
      var a = new SurvivorsLevelItem_1.SurvivorsLevelItem();
      a.OnButtonClickedCallback = this.T2d;
      var v = this.GetItem(s[t]);
      e.push(a.CreateThenShowByActorAsync(v.GetOwner()));
      this.LevelItemMap.set(n, a);
    }
    await Promise.all(e);
  }
  j3d() {
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.ActivityDataBase.Id).AreaBoundLevelId;
    var e = this.ScrollViewComp.RootUIComp.GetHeight() * this.UVd;
    for (let t = 0; t < i.length; t++) {
      var s = i[t];
      var r = this.LevelItemMap.get(s).GetOriginalItem();
      var h = r.GetHeight();
      var r = r.GetAnchorOffsetY();
      var s = {
        Diff: 0 + t,
        LowerBoundLevelId: s,
        LowerBoundPosY: r - h + e
      };
      this.DiffAreaUiInfoList.push(s);
    }
    this.CurrentUnlockDiff = this.ActivityDataBase.GetCurrentUnlockDiffId();
    var t = diffIdToleSpineName[this.CurrentUnlockDiff];
    this.GetSpine(22).AnimationComplete.Add(this.CUu);
    this.GetSpine(22).SetAnimation(0, t, true);
  }
  g2d() {
    for (var [t, i] of this.LevelItemMap.entries()) {
      i = i.GetRootActor().D_K2_GetActorLocation();
      this.LevelInfoItemMap.get(t).GetRootActor().D_K2_SetActorLocation(i, false, undefined, false);
    }
  }
  f2d(i) {
    let e = 0;
    for (let t = 1; t < this.DiffAreaUiInfoList.length; t++) {
      var s = this.DiffAreaUiInfoList[t];
      if (i + s.LowerBoundPosY > 0) {
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
    var t = this.GetText(21);
    let i = "";
    switch (this.CurrentDiff) {
      case 2:
        i = "SurvivorsLevelDifficult_TagName";
        break;
      case 1:
        i = "SurvivorsLevelOrdinary_TagName";
        break;
      case 0:
        i = "SurvivorsLevelSimple_TagName";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
    this.H3d(this.CurrentDiff).SetToggleState(1);
  }
  GetNearestCenterLevelId() {
    let t = 0;
    var i;
    var e;
    var s = MathUtils_1.MathUtils.Int32Max;
    var r = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY();
    var h = r - this.V3d;
    var o = r + this.V3d;
    for ([i, e] of this.LevelItemMap.entries()) {
      var n = e.GetOriginalItem();
      var n = n.GetHeight() - n.GetAnchorOffsetY() - this.N3d;
      if (h <= n && n <= o && Math.abs(n - this.N3d) < s) {
        t = i;
      }
    }
    return t;
  }
  H3d(t) {
    switch (t) {
      case 2:
        return this.GetExtendToggle(9);
      case 1:
        return this.GetExtendToggle(10);
      case 0:
        return this.GetExtendToggle(11);
    }
    return this.GetExtendToggle(10);
  }
  D2d(i) {
    this.LevelItemMap.forEach(t => {
      t.SetButtonInteractive(i);
    });
  }
  F3d() {
    let t = false;
    for (var [i, e] of this.LevelInfoItemMap.entries()) {
      var s = this.ActivityDataBase.TryRemoveLevelNewUnlock(i, false);
      var r = this.ActivityDataBase.TryRemoveLevelNewUnlock(i, true);
      var i = this.ActivityDataBase.TryRemoveLevelNewFinished(i);
      if (r) {
        e.PlaySequenceByName("EndlessOpen");
        t = true;
      } else if (s) {
        e.PlaySequenceByName("Unlock");
        t = true;
      } else if (i) {
        e.PlaySequenceByName("Complete");
      }
    }
    if (t) {
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
    let t = this.LevelItemMap.size;
    for (var [i, e] of this.LevelItemMap.entries()) {
      var s = this.ActivityDataBase.GetCurrentLevelInfoByLevelId(i);
      var r = this.LevelInfoItemMap.get(i);
      if (s) {
        e.Refresh(i, s.IsEndlessMode);
        r.Refresh(s, false, t);
        t--;
      }
    }
  }
  L2d() {
    var t = this.ActivityDataBase.GetFinishedRewardTaskCount().toString();
    var i = this.ActivityDataBase.RewardTaskMap.size.toString();
    this.ButtonReward.SetDescText("SurvivorsReward", t, i);
    this.ButtonReward.SetRedDotVisible(this.ActivityDataBase.GetRewardRedDotState());
    var t = this.ActivityDataBase.GetAllItemUnlockCount().toString();
    var i = this.ActivityDataBase.GetAllItemCount().toString();
    this.ButtonHandbook.SetDescText("SurvivorsCollection", t, i);
    var t = this.ActivityDataBase.TalentNodeMap;
    let e = 0;
    for (const s of t.values()) {
      if (s.Status === 1) {
        e++;
      }
    }
    i = t.size.toString();
    this.ButtonTalentTree.SetRedDotVisible(this.ActivityDataBase.GetTalentTreeRed());
    this.ButtonTalentTree.SetDescText("SurvivorsSkillTree", e.toString(), i);
  }
}
exports.SurvivorsRogueMainView = SurvivorsRogueMainView;
//# sourceMappingURL=SurvivorsRogueMainView.js.map