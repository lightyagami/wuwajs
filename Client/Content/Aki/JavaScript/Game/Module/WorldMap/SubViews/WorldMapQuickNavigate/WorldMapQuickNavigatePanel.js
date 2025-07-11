"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapQuickNavigatePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const ExploreProgressController_1 = require("../../../ExploreProgress/ExploreProgressController");
const MapUtil_1 = require("../../../Map/MapUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const WorldMapDefine_1 = require("../../WorldMapDefine");
const PopupRightItemA_1 = require("../Common/PopupRightItemA");
const NavigateIconItem_1 = require("./NavigateIconItem");
const QuickNavigateDynamicData_1 = require("./QuickNavigateDynamicData");
const QuickNavigateDynamicItem_1 = require("./QuickNavigateDynamicItem");
const QuickNavigateDynamicScrollItem_1 = require("./QuickNavigateDynamicScrollItem");
const QuickNavigateLoopScrollAreaGridItem_1 = require("./QuickNavigateLoopScrollAreaGridItem");
const QuickNavigateLoopScrollAreaGridItemData_1 = require("./QuickNavigateLoopScrollAreaGridItemData");
class WorldMapQuickNavigatePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.xYa = undefined;
    this.SequencePlayer = undefined;
    this.MPi = undefined;
    this.PYa = undefined;
    this.WNl = undefined;
    this.sma = undefined;
    this.xec = false;
    this.cHe = () => {
      return new QuickNavigateLoopScrollAreaGridItem_1.QuickNavigateLoopScrollAreaGridItem();
    };
    this.Mma = (e, t, i) => {
      return new QuickNavigateDynamicScrollItem_1.QuickNavigateDynamicScrollItem();
    };
    this.wYa = e => {
      if (e.ItemType === 0) {
        this.BYa(e.CountryId, e.Index);
      } else {
        this.lkn(e.StateId, e.Index);
      }
    };
    this.bYa = e => {
      var t = this.PYa.TryGetCachedData(e).AreaNavigateInfo;
      this.qYa(t.AreaId, e);
    };
    this.tZa = () => {
      this.GetItem(5).SetUIActive(true);
    };
    this.Teh = () => {
      this.GetItem(5).SetUIActive(false);
    };
    this.Leh = () => {
      this.xYa = undefined;
      this.JJa();
      this.Cth(4);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapFocusPlayer);
    };
    this.QNl = (e, t) => {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnWorldMapTrackMarkItem, t.MarkType, t.MarkId);
    };
    this.kOe = () => {
      if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
        ExploreProgressController_1.ExploreProgressController.QueryOnlinePlayersAreaAsyncRequest();
      }
    };
    this.KNl = () => {
      this.Cth(1);
    };
    this.e5l = () => {
      var e = this.Map.GetNavigateMarkList();
      this.OnBeforeShowWorldMapSecondaryUiAsync(e);
    };
  }
  GetResourceId() {
    return "UiItem_MapChange";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIHorizontalLayout]];
  }
  GetPopupRightItem() {
    return new PopupRightItemA_1.PopupRightItemA();
  }
  async OnBeforeStartAsync() {
    var e;
    if (this.UiBgItem) {
      await this.UiBgItem.CreateByResourceIdAsync("UiView_PopupR1", this.ParentUiItem, this.UsePool);
      e = this.GetOriginalActor().GetComponentByClass(UE.UIItem.StaticClass());
      this.UiBgItem.AttachItem(e, this.GetRootItem());
      this.UiBgItem.SetPopupViewBase();
      this.UiBgItem.OverrideBackBtnCallBack(this.Close);
      this.UiBgItem.SetTitleLocalTxt("MapQuickChange_Text");
      this.UiBgItem.SetTitleIcon("SP_IconMapChange");
      this.AddChild(this.UiBgItem);
    }
    this.PYa = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), this.GetItem(4).GetOwner(), this.cHe);
    this.MPi = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), new QuickNavigateDynamicItem_1.QuickNavigateDynamicItem(), this.Mma);
    await this.MPi.Init();
    this.WNl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), () => new NavigateIconItem_1.NavigateIconItem());
  }
  OnStart() {
    var e = this.GetRootItem();
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(e);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapFirstNavigateSelect, this.wYa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSecondNavigateSelect, this.bYa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapBeforeChangeMap, this.tZa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapAfterChangeMap, this.Teh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateOnlinePlayersArea, this.KNl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerMarkItemChanged, this.e5l);
    var e = TimeUtil_1.TimeUtil.InverseMillisecond * 3;
    this.sma = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, e);
    this.kOe();
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapFirstNavigateSelect, this.wYa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSecondNavigateSelect, this.bYa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapBeforeChangeMap, this.tZa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapAfterChangeMap, this.Teh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateOnlinePlayersArea, this.KNl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerMarkItemChanged, this.e5l);
    this.jm();
  }
  JJa() {
    var e;
    if (this.xYa === undefined && (this.xYa = {
      FirstIndex: 0,
      SecondIndex: 0,
      CountryId: 0,
      ExpandCountry: true,
      StateId: 0,
      AreaId: 0
    }, e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId(), e = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(e))) {
      this.xYa.CountryId = e.CountryId;
      this.xYa.StateId = e.StateId ?? 0;
      this.xYa.AreaId = e.AreaId;
    }
  }
  OnShowWorldMapSecondaryUi() {
    this.JJa();
    this.Cth(4);
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(e) {
    e = this.$Nl(e);
    await this.WNl?.RefreshByDataAsync(e);
  }
  OnCloseWorldMapSecondaryUi() {
    this.xYa = undefined;
  }
  OnBeforeDestroy() {
    this.PYa?.ClearGridProxies();
    this.PYa = undefined;
    this.MPi?.ClearChildren();
    this.MPi = undefined;
    this.WNl = undefined;
  }
  Cth(t) {
    var e;
    if (t === 4 || t === 3) {
      e = this.GYa(t);
      this.MPi.RefreshByData(e);
    }
    if (t === 2) {
      var i = this.GYa(t);
      let e = 0;
      for (const r of this.MPi.GetScrollItemItems()) {
        r.Update(i[e], e++);
      }
    }
    if (t === 4 || t === 1 || t === 2) {
      const a = this.kYa(t);
      this.PYa.RefreshByData(a, undefined, () => {
        var e;
        if (t === 4) {
          e = a.findIndex(e => e.IsSelected);
          this.PYa?.ScrollToGridIndex(e, false);
        } else if (this.xec) {
          this.PYa?.ScrollToGridIndex(0, false);
          this.xec = false;
        }
      });
    }
  }
  GYa(n) {
    var e = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryList;
    const o = [];
    e.forEach(e => {
      var t = e.CountryId;
      var i = e.NavigateCountry;
      var r = new QuickNavigateDynamicData_1.QuickNavigateDynamicData();
      r.ItemType = 0;
      r.CountryId = t;
      r.Index = o.length;
      r.IsSelected = this.xYa.CountryId === t;
      r.RefreshType = n;
      r.HasState = i.StateMap !== undefined;
      o.push(r);
      if (i.StateMap !== undefined) {
        for (const [, e] of i.StateMap) {
          if (this.xYa.CountryId === 0) {
            this.xYa.CountryId = t;
            this.xYa.ExpandCountry = true;
            this.xYa.StateId = e.StateId ?? 0;
            this.xYa.AreaId = e.AreaNavigateList[0].AreaId;
            r.IsSelected = this.xYa.CountryId === t;
          }
          r.StateId = e.StateId;
          var a = this.xYa.CountryId === t;
          var s = this.xYa.ExpandCountry;
          if (a && s && (this.xYa.FirstIndex = o.length - 1, (a = new QuickNavigateDynamicData_1.QuickNavigateDynamicData()).ItemType = 1, a.CountryId = t, a.StateId = e.StateId, a.Index = o.length, a.IsSelected = this.xYa.StateId === e.StateId, a.RefreshType = n, o.push(a), this.xYa.StateId === e.StateId)) {
            this.xYa.FirstIndex = o.length - 1;
          }
        }
      } else if (this.xYa.CountryId === 0) {
        this.xYa.CountryId = t;
        this.xYa.ExpandCountry = false;
        this.xYa.StateId = 0;
        this.xYa.AreaId = i.AreaNavigateList[0].AreaId;
        r.IsSelected = this.xYa.CountryId === t;
      }
    });
    return o;
  }
  kYa(r) {
    const a = [];
    var e = this.xYa.CountryId;
    var t = this.xYa.StateId;
    var e = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(e);
    let i = e.AreaNavigateList;
    (i = e.StateMap ? e.StateMap.get(t).AreaNavigateList : i).forEach(e => {
      var t = new QuickNavigateLoopScrollAreaGridItemData_1.QuickNavigateLoopScrollAreaGridItemData();
      t.AreaNavigateInfo = e;
      t.Index = a.length;
      t.RefreshType = r;
      a.push(t);
      if (this.xYa.AreaId === 0) {
        this.xYa.AreaId = e.AreaId;
      }
      var i = this.xYa.AreaId === e.AreaId;
      if (i) {
        this.xYa.FirstIndex = a.length - 1;
      }
      t.IsSelected = this.xYa.AreaId === e.AreaId;
    });
    return a;
  }
  Fp(e) {
    var t = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(e.CountryId)?.StateMap !== undefined;
    var i = e.StateId !== this.xYa?.StateId;
    var t = t && e.ExpandCountry !== this.xYa?.ExpandCountry;
    var r = e.CountryId !== this.xYa?.CountryId;
    var a = t || r;
    this.xYa = e;
    let s = 0;
    if (i || a) {
      if (i && !a) {
        s = 2;
        this.Cth(s);
        this.ZJa();
      } else if (r) {
        s = 4;
        this.Cth(s);
        this.ZJa();
      } else if (t) {
        s = 3;
        this.Cth(s);
      }
    } else {
      s = 1;
      this.Cth(s);
      this.ZJa();
    }
  }
  BYa(e, t) {
    var i = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(e);
    let r = !this.xYa.ExpandCountry;
    var a;
    var s;
    var n = e !== this.xYa.CountryId;
    if (i.StateMap !== undefined) {
      if (n) {
        r = true;
      }
      s = (a = i.StateMap.values().next().value).AreaNavigateList[0];
      this.xec = e === this.xYa?.CountryId;
      this.Fp({
        FirstIndex: t,
        SecondIndex: 0,
        CountryId: e,
        ExpandCountry: r,
        StateId: a.StateId,
        AreaId: s.AreaId
      });
    } else {
      this.xec = e === this.xYa?.CountryId;
      this.Fp({
        FirstIndex: t,
        SecondIndex: 0,
        CountryId: e,
        ExpandCountry: false,
        StateId: 0,
        AreaId: i.AreaNavigateList[0].AreaId
      });
    }
    if (n) {
      if (this.SequencePlayer.IsSequenceInPlaying("Switch")) {
        this.SequencePlayer.ReplaySequence("Switch");
      } else {
        this.SequencePlayer.PlaySequence("Switch");
      }
    }
  }
  lkn(e, t) {
    var i = e !== this.xYa.StateId;
    var r = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateCountryMap.get(this.xYa.CountryId).StateMap.get(e);
    this.Fp({
      FirstIndex: t,
      SecondIndex: 0,
      CountryId: this.xYa.CountryId,
      ExpandCountry: this.xYa?.ExpandCountry ?? true,
      StateId: e,
      AreaId: r.AreaNavigateList[0].AreaId
    });
    if (i) {
      if (this.SequencePlayer.IsSequenceInPlaying("Switch")) {
        this.SequencePlayer.ReplaySequence("Switch");
      } else {
        this.SequencePlayer.PlaySequence("Switch");
      }
    }
  }
  qYa(e, t) {
    this.Fp({
      FirstIndex: this.xYa.FirstIndex,
      SecondIndex: t,
      CountryId: this.xYa.CountryId,
      ExpandCountry: this.xYa?.ExpandCountry ?? true,
      StateId: this.xYa.StateId,
      AreaId: e
    });
  }
  ZJa(e = false) {
    if (e) {
      this.Close();
    }
    e = ConfigManager_1.ConfigManager.MapConfig.WorldMapNavigateAreaMap.get(this.xYa.AreaId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapNavigate, {
      MarkId: e.MarkId,
      MarkType: e.MarkType
    });
  }
  $Nl(e) {
    ModelManager_1.ModelManager.ExploreProgressModel.ClearTrackTaskAreaId();
    const i = [];
    e.forEach(e => {
      switch (e.MarkType) {
        case 12:
          i.push({
            Id: 1,
            IconPath: e.IconPath,
            ClickCallback: this.QNl,
            MarkItem: e
          });
          this.XNl(e);
          break;
        case 11:
          var t = e.PlayerIndex - 1;
          i.push({
            Id: 2 + t,
            IconId: WorldMapDefine_1.onlinePlayerIconPathList2[t],
            ClickCallback: this.QNl,
            MarkItem: e
          });
      }
    });
    i.sort((e, t) => t.Id - e.Id);
    i.push({
      Id: 0,
      IconId: "SP_IconCommonPlayer",
      ClickCallback: this.Leh
    });
    return i;
  }
  XNl(e) {
    var t;
    var i = e.TrackTarget;
    if (typeof i != "number") {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "UpdateTrackTaskArea", ["EntityId", i], ["MapId", e.MapId], ["MarkType", e.MarkType], ["MarkId", e.MarkId]);
      }
    } else {
      t = ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(e.MapId, i)?.AreaId;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ExploreProgress", 69, "UpdateTrackTaskArea", ["AreaId", t], ["EntityId", i], ["MapId", e.MapId], ["MarkType", e.MarkType], ["MarkId", e.MarkId]);
      }
      if (t && (i = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(t))) {
        ModelManager_1.ModelManager.ExploreProgressModel.SetTrackTaskAreaId(i, e.IconPath);
      }
    }
  }
  jm() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.sma)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.sma);
      this.sma = undefined;
    }
  }
}
exports.WorldMapQuickNavigatePanel = WorldMapQuickNavigatePanel;
//# sourceMappingURL=WorldMapQuickNavigatePanel.js.map