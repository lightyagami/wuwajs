"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapTravelMainView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const PropRewardConfById_1 = require("../../../../../../Core/Define/ConfigQuery/PropRewardConfById");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySmallItemGrid_1 = require("../../UniversalComponents/ActivitySmallItemGrid");
const ActivityButtonItem_1 = require("../../UniversalComponents/Functional/ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityMapTravelController_1 = require("../ActivityMapTravelController");
const MapTravelSubViewButton_1 = require("./Component/MapTravelSubViewButton");
const MapTravelSubViewPhantomCollect_1 = require("./Component/MapTravelSubViewPhantomCollect");
const MapTravelSubViewPhantomQuest_1 = require("./Component/MapTravelSubViewPhantomQuest");
const MapTravelSubViewSoarChallenge_1 = require("./Component/MapTravelSubViewSoarChallenge");
const MapTravelSubViewTravelTask_1 = require("./Component/MapTravelSubViewTravelTask");
const SPINE_PLAY_TIME_SCALE = 1.5;
const openTweenGroupDefine = [0, -1, -1, 1];
const closeTweenGroupDefine = [1, -1, 0, -1];
const SPINE_LAYER_WIDTH = 2520;
class MapTravelMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Otl = undefined;
    this.xVl = undefined;
    this.RVl = undefined;
    this.wVl = undefined;
    this.PVl = undefined;
    this.UVl = undefined;
    this.DVl = new Map();
    this.SubViewProxyMap = new Map();
    this.ActivityBaseData = undefined;
    this.BVl = 0;
    this.qVl = -1;
    this.Cjl = false;
    this.gjl = 0;
    this.Y5l = new UE.Rotator(0, 0, 0);
    this.BgOffset = 0;
    this.BgScale = 1;
    this.BgLocation = undefined;
    this.kVl = () => {
      if (this.BVl === 0) {
        this.CloseMe();
      } else {
        this.GVl();
      }
    };
    this.$An = t => {
      if (t === "LevelChange") {
        this._Vl(this.qVl);
      }
    };
    this.OVl = () => {
      this.qVl = this.qVl - 1;
      this.UiViewSequence.PlaySequence("SwitchLeft", true);
    };
    this.FVl = () => {
      this.qVl = this.qVl + 1;
      this.UiViewSequence.PlaySequence("SwitchRight", true);
    };
    this.NVl = () => {
      ActivityMapTravelController_1.ActivityMapTravelController.RequestMapTravelLevelUp(t => {
        this.Cjl = t;
      });
    };
    this.dvt = t => {
      if (this.BVl === 0 && (t === "CommonRewardView" && (this.gjl > 0 ? this.fjl() : this.VVl()), t === "RoleLevelUpSuccessAttributeView")) {
        this.VVl();
      }
    };
    this.OnOpenSubView = t => {
      this.jVl(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIMultiTemplateLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UITexture], [20, UE.UIItem], [21, UE.UIItem], [22, UE.SpineSkeletonAnimationComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem]];
    this.BtnBindInfo = [[4, this.OVl], [5, this.FVl]];
  }
  async OnBeforeStartAsync() {
    var t;
    this.ActivityBaseData = this.OpenParam;
    if (this.ActivityBaseData) {
      t = [];
      this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
      t.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
      this.Otl.SetCloseCallBack(this.kVl);
      this.xVl = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(0));
      this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
      t.push(this.wVl.CreateByActorAsync(this.GetItem(13).GetOwner()));
      this.PVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionActivate();
      t.push(this.PVl.CreateByActorAsync(this.GetItem(12).GetOwner()));
      this.UVl = new ActivityButtonItem_1.ActivityButtonItem();
      t.push(this.UVl.CreateByActorAsync(this.GetItem(11).GetOwner()));
      this.UVl.SetFunction(this.NVl);
      t.push(this.HVl());
      this.RVl = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(7), () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid());
      await Promise.all(t);
    }
  }
  async HVl() {
    var t;
    var i;
    var e = [];
    for ([t, i] of [[1, 14], [2, 15], [3, 16], [4, 17]]) {
      var s = new MapTravelSubViewButton_1.MapTravelSubViewButton(t);
      e.push(s.CreateThenShowByActorAsync(this.GetItem(i).GetOwner()));
      this.DVl.set(t, s);
      s.SetFunction(this.OnOpenSubView);
    }
    await Promise.all(e);
  }
  OnStart() {
    this.UVl.SetRedDotVisible(true);
    this.qVl = this.ActivityBaseData.TravelLevel;
    var t = this.ActivityBaseData.GetActivityConfig();
    this.Otl.SetTitleByTextIdAndArgNew(t.TabName.get(0));
    this.GetSpine(22).SetTimeScale(SPINE_PLAY_TIME_SCALE);
    var t = this.GetItem(25);
    var i = this.GetItem(27);
    var e = i.K2_GetComponentLocation();
    this.BgOffset = Math.abs(t.K2_GetComponentLocation().X - e.X);
    var s = SPINE_LAYER_WIDTH;
    this.BgScale = (this.BgOffset + s) / s * i.K2_GetComponentScale().X;
    this.BgLocation = this.GetItem(27).K2_GetComponentLocation();
    this.BgLocation = new UE.Vector(t.K2_GetComponentLocation().X, e.Y, t.K2_GetComponentLocation().Z);
  }
  OnBeforeShow() {
    this.D5e();
  }
  OnBeforeDestroy() {
    this.Y5l = undefined;
    this.BgLocation = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.dvt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.dvt);
  }
  D5e() {
    this._Vl(this.qVl);
    this.WVl();
  }
  _Vl(t) {
    var i = t < this.ActivityBaseData.TravelLevel;
    if (t < this.ActivityBaseData.TravelLevel) {
      this.QVl(t);
    } else if (t === this.ActivityBaseData.TravelLevel) {
      this.KVl(t);
    } else {
      this.$Vl(t);
    }
    var e = this.ActivityBaseData.TravelLevelData.get(t);
    var e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetLevelExpConfig(e.Id);
    this.GetText(1).SetText(t.toString());
    this.gjl = 0;
    var s = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId");
    var h = [];
    for (const a of e.RewardDropId > 0 ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.RewardDropId) : []) {
      var r = {
        Item: a,
        HasClaimed: i
      };
      h.push(r);
      if (a[0].ItemId === s) {
        this.gjl++;
      }
    }
    this.RVl.RefreshByData(h);
    this.GetItem(6).SetUIActive(h.length > 0);
    this.GetItem(9).SetUIActive(!StringUtils_1.StringUtils.IsEmpty(e.TipsLock));
    if (!StringUtils_1.StringUtils.IsEmpty(e.TipsLock)) {
      e = i ? e.TipsDone : e.TipsLock;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e);
    }
    this.GetButton(4).RootUIComp.SetUIActive(t > 0);
    this.GetButton(5).RootUIComp.SetUIActive(t < this.ActivityBaseData.MaxTravelLevel);
  }
  XVl(t, i) {
    this.z5l(t / i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "MapTravelExpYellow_Text", t, i);
    this.GetText(3).SetUIActive(true);
  }
  z5l(t) {
    var t = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    this.GetTexture(2).SetFillAmount(t);
    var i = (1 - t) * 360;
    this.Y5l.Yaw = i;
    this.GetItem(24).SetUIActive(t > 0.5);
    this.GetItem(23).SetUIRelativeRotation(this.Y5l);
    this.GetItem(24).SetUIRelativeRotation(this.Y5l);
  }
  QVl(t) {
    var t = this.ActivityBaseData.TravelLevelData.get(t);
    var i = t.TargetExp;
    var t = t.TargetExp;
    this.XVl(i, t);
    this.wVl.SetUiActive(false);
    this.PVl.SetUiActive(true);
    this.UVl.SetUiActive(false);
    this.PVl.SetTextByTextId("MapTravelReward_Get");
  }
  KVl(t) {
    var t = this.ActivityBaseData.MaxTravelLevel === t;
    var i = !t && this.ActivityBaseData.CanTravelLevelUp();
    var e = this.ActivityBaseData.GetCurrentExp();
    var s = this.ActivityBaseData.GetCurrentTargetExp();
    if (t) {
      this.z5l(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "MapTravelLevelMaxYellow_Text");
      this.GetText(3).SetUIActive(true);
    } else {
      this.XVl(e, s);
    }
    this.wVl.SetUiActive(!t && !i);
    this.wVl.SetTextByTextId("PrefabTextItem_2462272635_Text");
    this.PVl.SetUiActive(t);
    this.UVl.SetUiActive(i);
    if (t) {
      this.PVl.SetTextByTextId("MapTravelLv_Max");
    }
    if (i) {
      this.UiViewSequence.PlaySequence("PreLevelUp");
    }
  }
  $Vl(t) {
    var i = this.ActivityBaseData.TravelLevelData.get(t);
    var t = this.ActivityBaseData.MaxTravelLevel === t;
    var i = t ? i.AccumulateExp : i.TargetExp;
    if (t) {
      this.z5l(0);
      this.GetText(3).SetUIActive(false);
    } else {
      this.XVl(0, i);
    }
    this.wVl.SetUiActive(true);
    this.wVl.SetTextByTextId("MapTravelLevelOverUp_Text");
    this.PVl.SetUiActive(false);
    this.UVl.SetUiActive(false);
  }
  VVl() {
    if (this.Cjl) {
      this.UiViewSequence.PlaySequence("LevelUp", false);
      this.qVl = this.qVl + 1;
      this._Vl(this.qVl);
      this.WVl();
    }
  }
  fjl() {
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("FlyStrengthItemId");
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i);
    if (i && i.Parameters) {
      let t = 0;
      for (var [, e] of i.Parameters) {
        t = e;
        break;
      }
      if (t !== 0) {
        i = PropRewardConfById_1.configPropRewardConfById.GetConfig(t);
        if (i) {
          let t = 0;
          for (const s of i.Props) {
            if (s.Id === 10) {
              t = s.Value;
              break;
            }
          }
          if (t !== 0) {
            t *= this.gjl;
            ActivityMapTravelController_1.ActivityMapTravelController.OpenSoarStrengthView(t);
          }
        }
      }
    }
  }
  WVl() {
    var t;
    var i;
    var e = this.ActivityBaseData.GetActivityConfig();
    for ([t, i] of this.DVl.entries()) {
      var [s, h] = this.ActivityBaseData.GetTypeProgress(t);
      var r = Math.ceil(s / h * 100);
      i.SetProgressText(r + "%");
      i.SetProgressTextChangeColor(s !== h);
      i.SetNameTextId(e.TabName.get(t));
      var r = this.ActivityBaseData.GetTypeRedDotState(t);
      var a = this.ActivityBaseData.GetTypeNewState(t);
      i.SetItemNew(!r && a);
      i.RefreshRedDot(r);
      i.SetItemDone(s === h);
    }
  }
  async YVl(t) {
    var i = this.SubViewProxyMap.get(t);
    if (!i) {
      var e = this.GetItem(18);
      switch (t) {
        case 1:
          var s = new MapTravelSubViewTravelTask_1.MapTravelSubViewTravelTask(this.ActivityBaseData);
          await s.CreateByResourceIdAsync("UiItem_TravelMapTask", e);
          var s = {
            Type: t,
            SpineSkinName: "Green",
            UiProxy: s
          };
          this.SubViewProxyMap.set(t, s);
          return s;
        case 2:
          s = new MapTravelSubViewPhantomQuest_1.MapTravelSubViewQuest(this.ActivityBaseData);
          await s.CreateByResourceIdAsync("UiItem_TravelMapPhantomTask", e);
          s = {
            Type: t,
            SpineSkinName: "Blue",
            UiProxy: s
          };
          this.SubViewProxyMap.set(t, s);
          return s;
        case 3:
          s = new MapTravelSubViewPhantomCollect_1.MapTravelSubViewPhantomCollect(this.ActivityBaseData);
          await s.CreateByResourceIdAsync("UiItem_TravelMapPhantomCollect", e);
          s = {
            Type: t,
            SpineSkinName: "Grey",
            UiProxy: s
          };
          this.SubViewProxyMap.set(t, s);
          return s;
        case 4:
          s = new MapTravelSubViewSoarChallenge_1.MapTravelSubViewSoarChallenge(this.ActivityBaseData);
          await s.CreateByResourceIdAsync("UiItem_TravelMapSoarChallenge", e);
          s = {
            Type: t,
            SpineSkinName: "Orange",
            UiProxy: s
          };
          this.SubViewProxyMap.set(t, s);
          return s;
      }
    }
    return i;
  }
  async jVl(t) {
    this.BVl = t;
    const i = await this.YVl(t);
    if (i) {
      const e = this.ActivityBaseData.GetActivityConfig();
      this.SetTextureShowUntilLoaded(e.TabIcon.get(t), this.GetTexture(19));
      this.G1a(t, true);
      this.GetSpine(22).SetSkin(i.SpineSkinName);
      this.GetSpine(22).SetAnimation(0, "AniOpen", false).AnimationComplete.Add(() => {
        this.Otl.SetTitleByTextIdAndArgNew(e.TabName.get(t));
        this.xVl.PlayLevelSequenceByName("Start", false);
        i.UiProxy.SetActive(true);
        i.UiProxy.PlayStartSequence();
      });
      this.xVl.PlayLevelSequenceByName("Close");
      this.UiViewSequence.PlaySequence("AniOpen", true);
    }
  }
  async GVl() {
    var t = this.BVl;
    const i = await this.YVl(t);
    if (i) {
      if (i.UiProxy.NeedDestroySelf) {
        this.SubViewProxyMap.delete(t);
      }
      this.D5e();
      i.UiProxy.PlayCloseSequence().finally(() => {
        i.UiProxy.SetActive(false);
      });
      this.G1a(t, false);
      this.GetSpine(22).SetSkin(i.SpineSkinName);
      this.GetSpine(22).SetAnimation(0, "AniClose", false).AnimationComplete.Add(() => {
        var t = this.ActivityBaseData.GetActivityConfig();
        this.Otl.SetTitleByTextIdAndArgNew(t.TabName.get(0));
        this.xVl.PlayLevelSequenceByName("Start", false);
        if (i.UiProxy.NeedDestroySelf) {
          i.UiProxy.Destroy();
        }
      });
      this.xVl.PlayLevelSequenceByName("Close");
      this.UiViewSequence.PlaySequence("AniClose", true);
      this.BVl = 0;
    }
  }
  G1a(i, e) {
    var s = (e ? this.GetItem(20) : this.GetItem(21)).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var h = s.Num();
    var r = e ? openTweenGroupDefine : closeTweenGroupDefine;
    for (let t = 0; t < h; t++) {
      var a = s.Get(t);
      switch (r[t]) {
        case 1:
          var n = a.GetPlayTween();
          var o = this.DVl.get(i).GetIconItem().K2_GetComponentLocation();
          if (e) {
            this.LWl(n, o, true);
            this.LWl(n, this.BgLocation, false);
          } else {
            this.LWl(n, this.BgLocation, true);
            this.LWl(n, o, false);
          }
          break;
        case 0:
          n = a.GetPlayTween();
          this.LWl(n, new UE.Vector(this.BgScale, this.BgScale, this.BgScale), !e);
      }
      a.Stop();
      a.Play();
    }
  }
  LWl(t, i, e) {
    if (e) {
      t.from = i;
    } else {
      t.to = i;
    }
  }
}
exports.MapTravelMainView = MapTravelMainView;
//# sourceMappingURL=MapTravelMainView.js.map