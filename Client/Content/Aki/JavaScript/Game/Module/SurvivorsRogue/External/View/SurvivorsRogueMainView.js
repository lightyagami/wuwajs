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
    this.PGd = undefined;
    this.AGd = undefined;
    this.PWa = t => {
      if (this.ActivityDataBase.Id === t) {
        this.WGd();
      }
    };
    this.Z9d = () => {
      this.WGd();
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
        this.ejd();
      }
    };
    this.ymm = () => {
      this.WGd();
    };
    this.rH_ = [];
    this.tjd = 0;
    this.ijd = 0;
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
      if (t !== this.Ra_ && (this.Ra_ = t, t = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY() ?? 0, this.ScrollContentLastPosY = t, this.DGd(t), this.d$_(t), this.UGd(), this.StartElasticMovement) && Math.abs(this.ScrollViewComp.GetVelocity().Y) < this.WWd) {
        t = this.DiffAreaUiInfoList[this.CurrentDiff];
        this.ScrollLevelIdToBottom(t.LowerBoundLevelId, true);
        this.StartElasticMovement = false;
      }
    };
    this.QWd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueChangeAreaDuration");
    this.KWd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueAreaBottomScale");
    this.XWd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueBackgroundParallaxFactor");
    this.WWd = CommonParamById_1.configCommonParamById.GetFloatConfig("SurvivorsRogueAutoAttachVelocityY");
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
    this.BGd = () => {
      UiManager_1.UiManager.OpenView("SurvivorsRogueRewardView", undefined, (t, i) => {
        if (t) {
          this.AddChildViewById(i);
        }
      });
    };
    this.kGd = () => {
      UiManager_1.UiManager.OpenView("SurvivorsHandbookView");
    };
    this.OGd = () => {
      UiManager_1.UiManager.OpenView("SurvivorsTalentTreeView");
    };
    this.qGd = () => {
      var t;
      if (!this.IsDragging) {
        if (this.FW_ && !this.GGd()) {
          t = this.DiffAreaUiInfoList[this.CurrentDiff + 1];
          this.ScrollLevelIdToBottom(t.LowerBoundLevelId, true);
        }
      }
    };
    this.FGd = () => {
      var t;
      if (!this.IsDragging) {
        if (this.FW_ && !this.NGd()) {
          t = this.DiffAreaUiInfoList[this.CurrentDiff - 1];
          this.ScrollLevelIdToBottom(t.LowerBoundLevelId, true);
        }
      }
    };
    this.RNd = t => {
      if (t) {
        this.PGd = new SurvivorsActivityDefine_1.SurvivorsLevelInfo();
        for (const i of this.LevelInfoItemMap.values()) {
          i.SetSaveFile(this.PGd);
        }
      }
    };
    this.VGd = t => {
      var i = this.ActivityDataBase.IsEndlessMode(t);
      if (this.ActivityDataBase.GetLevelUnlockState(t, i)) {
        var e;
        var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(t);
        ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo = this.PGd;
        if (this.PGd.IsSaveFile) {
          if (this.PGd.LevelId !== t) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterHasSaveTips");
            return;
          } else {
            e = {
              IsExternal: true,
              Batch: this.PGd.Batch,
              MaxBatch: this.PGd.MaxBatch
            };
            UiManager_1.UiManager.OpenView("SurvivorsRogueExitView", e);
            return;
          }
        }
        this.PGd.LevelId = t;
        this.PGd.InstId = i.InstId;
        this.PGd.IsEndless = this.ActivityDataBase.IsEndlessMode(t);
        UiManager_1.UiManager.OpenView("SurvivorsLevelDetailView");
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterLockTips");
      }
    };
    this.CEd = () => {
      this.CloseMe();
    };
    this.jGd = () => {
      var t = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig()?.HelpId;
      if (t) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIExtendToggle], [10, UE.UIExtendToggle], [11, UE.UIExtendToggle], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.SpineSkeletonAnimationComponent], [25, UE.UIItem]];
    this.BtnBindInfo = [[7, this.qGd], [8, this.FGd]];
  }
  async OnCreateAsync() {
    this.AGd = await this.SAo("UiCurve_AreaMove");
  }
  async OnBeforeStartAsync() {
    var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (t && (this.ActivityDataBase = t, (t = []).push(this.HGd()), this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(), t.push(this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), this.CaptionItem.SetCloseCallBack(this.CEd), this.CaptionItem.SetHelpCallBack(this.jGd), this.ButtonTalentTree = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), t.push(this.ButtonTalentTree.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())), this.ButtonTalentTree.SetFunction(this.OGd), this.ButtonHandbook = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), t.push(this.ButtonHandbook.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())), this.ButtonHandbook.SetFunction(this.kGd), this.ButtonReward = new SurvivorsFunctionButtonItem_1.SurvivorsFunctionButtonItem(), t.push(this.ButtonReward.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())), this.ButtonReward.SetFunction(this.BGd), await Promise.all(t), t = await ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestLastFile())) {
      this.PGd = t;
      this.sH_();
      this.Jfo();
      this.rjd();
    }
  }
  OnStart() {
    this.ScrollViewComp.OnLateUpdate.Bind(() => {
      this.$Gd();
      this.ScrollViewComp.OnLateUpdate.Unbind();
    });
  }
  OnBeforeShow() {
    this.WGd();
    this.Jjd();
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
    SurvivorsActivityController_1.SurvivorsActivityController.CheckIsActivityClose();
  }
  OnAfterShow() {
    ControllerHolder_1.ControllerHolder.SurvivorsRogueController.TryOpenWeaponUnlockView().then(t => {
      if (!t) {
        this.ejd();
      }
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsInstSettle, this.RNd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Z9d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.Oli);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, this.ymm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsInstSettle, this.RNd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Z9d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.Oli);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, this.ymm);
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
    this.ijd = CENTER_AREA_HALF_HEIGHT;
    this.tjd = this.ScrollViewComp.RootUIComp.GetHeight() / 2;
  }
  sH_() {
    var t = this.GetScrollViewWithScrollbar(1).ContentUIItem;
    this.rH_.push({
      Item: t,
      InitPosY: t.GetAnchorOffsetY() ?? 0,
      ParallaxFactor: this.XWd
    });
  }
  $Gd() {
    var t = this.PGd.LevelId;
    if (t) {
      this.ScrollLevelIdToCenter(t);
    } else {
      t = this.ActivityDataBase.GetFocusLevelId();
      this.ScrollLevelIdToCenter(t);
    }
    for (const i of this.LevelInfoItemMap.values()) {
      i.SetSaveFile(this.PGd);
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
    if (s && (e = (0, puerts_1.$ref)(new UE.Vector2D(this.ScrollViewComp.ContentUIItem.RelativeLocation)), s = s.GetBottomPosItem(), this.ScrollViewComp.StopMovement(), i && this.KGd(), this.ScrollViewComp.ScrollToBottom(e, s, i), i && (this.ScrollViewComp.Tweener?.SetDuration(this.QWd), this.ScrollViewComp.Tweener?.SetCurveFloat(this.AGd), this.YW_()), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "指定关卡滚动至下方", ["LevelId", t], ["Tween", i]);
    }
  }
  ScrollLevelIdToCenter(t) {
    var i = this.LevelItemMap.get(t);
    if (!!i && !((i = -i.GetOriginalItem().GetAnchorOffsetY() - this.tjd) <= 0)) {
      this.Q_t.Reset();
      this.Q_t.Y = i;
      this.ScrollViewComp.StopMovement();
      this.ScrollViewComp.ContentUIItem.SetAnchorOffset(this.Q_t.ToUeVector2D());
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SurvivorsRogue", 37, "指定关卡滚动至中心区域", ["LevelId", t], ["PosY", i]);
      }
    }
  }
  KGd() {
    this.FW_ = false;
    this.ScrollViewComp.SetRayCastTargetForScrollView(false);
    this.XGd(false);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 37, "ScrollTweenerStart");
    }
  }
  ScrollTweenerEnd() {
    this.FW_ = true;
    this.ScrollViewComp.SetRayCastTargetForScrollView(true);
    this.XGd(true);
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
  GGd() {
    return this.CurrentDiff === 2;
  }
  NGd() {
    return this.CurrentDiff === 0;
  }
  async HGd() {
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
      a.OnButtonClickedCallback = this.VGd;
      var v = this.GetItem(s[t]);
      e.push(a.CreateThenShowByActorAsync(v.GetOwner()));
      this.LevelItemMap.set(n, a);
    }
    await Promise.all(e);
  }
  rjd() {
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsActivityConfigByActivityId(this.ActivityDataBase.Id).AreaBoundLevelId;
    var e = this.ScrollViewComp.RootUIComp.GetHeight() * this.KWd;
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
  UGd() {
    for (var [t, i] of this.LevelItemMap.entries()) {
      i = i.GetRootActor().D_K2_GetActorLocation();
      this.LevelInfoItemMap.get(t).GetRootActor().D_K2_SetActorLocation(i, false, undefined, false);
    }
  }
  DGd(i) {
    let e = 0;
    for (let t = 1; t < this.DiffAreaUiInfoList.length; t++) {
      var s = this.DiffAreaUiInfoList[t];
      if (i + s.LowerBoundPosY > 0) {
        break;
      }
      e = s.Diff;
    }
    if (this.CurrentDiff !== e) {
      this.ojd(this.CurrentDiff).SetToggleState(0);
      this.CurrentDiff = e;
      this.njd();
    }
  }
  njd() {
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
    this.ojd(this.CurrentDiff).SetToggleState(1);
  }
  GetNearestCenterLevelId() {
    let t = 0;
    var i;
    var e;
    var s = MathUtils_1.MathUtils.Int32Max;
    var r = this.ScrollViewComp.ContentUIItem.GetAnchorOffsetY();
    var h = r - this.ijd;
    var o = r + this.ijd;
    for ([i, e] of this.LevelItemMap.entries()) {
      var n = e.GetOriginalItem();
      var n = n.GetHeight() - n.GetAnchorOffsetY() - this.tjd;
      if (h <= n && n <= o && Math.abs(n - this.tjd) < s) {
        t = i;
      }
    }
    return t;
  }
  ojd(t) {
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
  XGd(i) {
    this.LevelItemMap.forEach(t => {
      t.SetButtonInteractive(i);
    });
  }
  ejd() {
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
  Jjd() {
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
  WGd() {
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