"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQuestModel = undefined;
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const MissionViewDefine_1 = require("../../../../BattleUi/Views/MissionView/MissionViewDefine");
const ConfirmBoxController_1 = require("../../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const MapController_1 = require("../../../../Map/Controller/MapController");
const MapDefine_1 = require("../../../../Map/MapDefine");
const FishingController_1 = require("../FishingController");
const FishingDefine_1 = require("../FishingDefine");
const MAX_INT32_NUMBER = 2147483647;
class FishingQuestModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.EntrustPool = [];
    this.Ntc = 0;
    this.CurrentTraceItem = 0;
    this.sB_ = undefined;
    this.uk_ = false;
    this.dk_ = 0;
    this.mk_ = 0;
    this.Xk_ = undefined;
    this.$O_ = 0;
    this.EntrustRefreshCostRatio = 0;
    this.Xbe = undefined;
    this.DayStartTime = 0;
    this.DayEndTime = 0;
    this.lz_ = false;
    this.Vtc = false;
    this.TraceFormClick = false;
    this.jtc = 0;
    this.Htc = false;
    this.CurrentEntrusts = new Map();
    this.UnDeliverableItemIdSet = new Set();
    this.Dx_ = () => {
      this.Bx_();
    };
    this.kx_ = () => {
      this.Bx_();
    };
    this.p5a = () => {
      if (this.uk_) {
        if (this.dk_) {
          this.TraceItem(this.dk_);
        } else {
          this.CurrentTraceEntrust = this.mk_;
          this.TraceEntrust();
        }
      }
      this.uk_ = false;
      this.mk_ = 0;
      this.dk_ = 0;
    };
    this.Gd_ = e => {
      if (e) {
        this.ReTraceMapMark();
      } else {
        this.RemoveAndUnTrackMark(false);
      }
    };
    this.$tc = e => {
      if (this.jtc === e && this.CurrentTraceItem) {
        this.TraceItem(this.CurrentTraceItem);
      }
    };
    this.u3e = () => {
      var e;
      if (this.CurrentTraceEntrust && FishingController_1.FishingController.IsInFishingShip() && ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.CurrentTraceEntrust).IsNight) {
        e = this.IsInNight();
        if (this.lz_ !== e) {
          this.TraceEntrust();
          if ((this.lz_ = e) && !this.Vtc || !e && this.Vtc) {
            this.Htc = true;
          }
        } else if (this.Htc) {
          this.Htc = false;
          this.TraceEntrust();
        }
      }
    };
  }
  get CurrentTraceEntrust() {
    return this.Ntc;
  }
  set CurrentTraceEntrust(e) {
    this.EndShowTrackText();
    this.Ntc = e;
  }
  OnInit() {
    for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingEntrustPool()) {
      this.EntrustPool.push(e.Id);
    }
    this.DayStartTime = CommonParamById_1.configCommonParamById.GetIntConfig("FishingDayBegin");
    this.DayEndTime = CommonParamById_1.configCommonParamById.GetIntConfig("FishingDayEnd");
    this.lz_ = this.IsInNight();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshDockId, this.Dx_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshBackpackData, this.kx_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.p5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingPointFinish, this.$tc);
    this.Xbe = TimerSystem_1.GameplayTimerSystem.Forever(this.u3e, TimeUtil_1.TimeUtil.InverseMillisecond * 3);
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshDockId, this.Dx_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshBackpackData, this.kx_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.p5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingPointFinish, this.$tc);
    TimerSystem_1.GameplayTimerSystem.Remove(this.Xbe);
    return true;
  }
  hY_() {
    this.UnDeliverableItemIdSet.clear();
    if (this.CurrentTraceEntrust) {
      var e;
      var i;
      var t = this.CurrentEntrusts.get(this.CurrentTraceEntrust);
      if (t === 3) {
        for ([e, i] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.CurrentTraceEntrust).EntrustTarget) {
          if (e && i && ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e) < i) {
            this.UnDeliverableItemIdSet.add(e);
          }
        }
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingBackpackDeliverableRefresh);
  }
  IsUnDeliverableByItemId(e) {
    for (const i of this.UnDeliverableItemIdSet.values()) {
      if (i === e) {
        return true;
      }
    }
    return false;
  }
  IsAcceptedEntrustItem(e) {
    for (var [i, t] of this.CurrentEntrusts) {
      if (t === 3 || t === 2) {
        for (const r of ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i).EntrustTarget.keys()) {
          if (e === r) {
            return true;
          }
        }
      }
    }
    return false;
  }
  UpdateEntrusts(e) {
    this.CurrentEntrusts.clear();
    this.CurrentTraceItem = 0;
    for (const r of Object.keys(e)) {
      var i = parseInt(r);
      switch (e[r]) {
        case Protocol_1.Aki.Protocol.cR_.Proto_Created:
          this.CurrentEntrusts.set(i, 0);
          break;
        case Protocol_1.Aki.Protocol.cR_.Proto_Acceptable:
          this.CurrentEntrusts.set(i, 1);
          break;
        case Protocol_1.Aki.Protocol.cR_.Proto_Accepted:
          var t = this.GetEntrustsDeliverable(i);
          this.CurrentEntrusts.set(i, t ? 2 : 3);
      }
    }
    if (this.CurrentTraceEntrust !== undefined && (this.Yk_(), this.CurrentTraceEntrust !== 0)) {
      this.TraceEntrust();
    }
    this.hY_();
  }
  GetEntrustsDeliverable(e) {
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
    if (i.EntrustType === 0 || i.EntrustType === 1) {
      return !!this.GetEntrustsTargetEnough(e) && (!i.EntrustDestination || ModelManager_1.ModelManager.FishingModel.DockId === i.EntrustDestination);
    } else {
      return i.EntrustType === 2 && ModelManager_1.ModelManager.FishingModel.DockId === i.EntrustDestination;
    }
  }
  GetEntrustsTargetEnough(e) {
    var i;
    var t;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
    if (e.EntrustType !== 0 && e.EntrustType !== 1) {
      return e.EntrustType === 2;
    }
    for ([i, t] of e.EntrustTarget) {
      if (!i || !t) {
        return false;
      }
      if (ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(i) < t) {
        return false;
      }
    }
    return true;
  }
  GetEntrustsByPoolType(e) {
    var i;
    var t = [];
    var r = ModelManager_1.ModelManager.FishingModel.DockId > 0;
    for ([i] of this.CurrentEntrusts) {
      if (!r) {
        var n = this.CurrentEntrusts.get(i);
        if (n !== 2 && n !== 3) {
          continue;
        }
      }
      if (ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i).EntrustPool === e) {
        t.push(i);
      }
    }
    return t;
  }
  GetPoolHasAnyEntrust(e) {
    var i;
    var t = ModelManager_1.ModelManager.FishingModel.DockId > 0;
    for ([i] of this.CurrentEntrusts) {
      if (!t) {
        var r = this.CurrentEntrusts.get(i);
        if (r !== 2 && r !== 3) {
          continue;
        }
      }
      if (ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i).EntrustPool === e) {
        return true;
      }
    }
    return false;
  }
  GetPoolHasAnyAcceptedEntrust(e) {
    for (var [i] of this.CurrentEntrusts) {
      i = this.CurrentEntrusts.get(i);
      if (i === 2 || i === 3) {
        return true;
      }
    }
    return false;
  }
  GetEntrustsLockState(e) {
    return this.CurrentEntrusts.get(e) === 0;
  }
  GetEntrustsRefreshCost(e) {
    e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
    e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingManualRefreshByEntrustPoolTypeAndStar(e.EntrustPool, e.Star);
    if (e && e[0]) {
      return e[0]?.RefreshCost * ((100 - this.EntrustRefreshCostRatio) / 100);
    } else {
      return -1;
    }
  }
  GetTraceEntrustItem() {
    if (this.CurrentTraceEntrust) {
      const r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.CurrentTraceEntrust);
      var e;
      var i;
      if (r.EntrustType !== 2) {
        for ([e, i] of r.EntrustTarget) {
          if (e && i) {
            if (ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e) < i) {
              const r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e);
              var t = r.Relation ?? 0;
              if (t > 0) {
                return t;
              } else {
                return e;
              }
            }
          }
        }
      }
    }
    return -1;
  }
  WO_() {
    var e;
    if (this.CurrentTraceEntrust) {
      if ((e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.CurrentTraceEntrust).EntrustDestination) <= 0) {
        return this.QO_();
      } else {
        return e;
      }
    } else {
      return -1;
    }
  }
  QO_() {
    var e = ModelManager_1.ModelManager.FishingModel.UnlockPort;
    var i = this.lVe();
    if (!i) {
      return -1;
    }
    let t = MAX_INT32_NUMBER;
    let r = undefined;
    for (const s of e) {
      var n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(s).EntityConfigId;
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(n);
      if (n && (n = {
        X: (n = n.Transform.Pos).X ?? 0,
        Y: n.Y ?? 0,
        Z: n.Z ?? 0
      }, n = Vector_1.Vector.Create(n), (n = Vector_1.Vector.Dist(i, n)) < t)) {
        t = n;
        r = s;
      }
    }
    return r || -1;
  }
  TraceEntrust() {
    var e;
    var i;
    this.Vtc = false;
    this.jtc = 0;
    this.CurrentTraceItem = 0;
    this.RemoveAndUnTrackMark();
    if (ModelManager_1.ModelManager.LoadingModel.IsLoading && this.CurrentTraceEntrust) {
      this.uk_ = true;
      this.mk_ = this.CurrentTraceEntrust;
    } else {
      if (this.CurrentTraceEntrust) {
        this.StartShowTrackText(this.CurrentTraceEntrust);
        if ((e = this.GetTraceEntrustItem()) <= 0) {
          this.Vtc = true;
          if ((i = this.WO_()) <= 0) {
            if (UiManager_1.UiManager.IsViewOpen("FishingQuestView") || UiManager_1.UiManager.IsViewOpen("FishingHandBookView")) {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_CurrentEntrustCannotTrace");
            }
          } else {
            i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(i);
            MapController_1.MapController.RequestTrackMapMark({
              MarkType: 34,
              MarkId: i.MarkId,
              Track: true
            });
            this.$O_ = i.MarkId;
            if (UiManager_1.UiManager.IsViewOpen("FishingQuestView") && this.TraceFormClick) {
              UiManager_1.UiManager.CloseView("FishingQuestView");
            }
          }
        } else {
          this.m$l(e, 0);
          if (this.Vtc && this.TraceFormClick && UiManager_1.UiManager.IsViewOpen("FishingQuestView")) {
            UiManager_1.UiManager.CloseView("FishingQuestView");
          }
        }
      }
      this.TraceFormClick = false;
    }
  }
  StartShowTrackText(t, r = 0) {
    if (t) {
      var n;
      var s;
      var o = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(t);
      var a = [];
      for ([n, s] of o.TargetDesText) {
        var h = new MissionViewDefine_1.FishingEntrustStepTextInfo(s, n);
        a.push(h);
      }
      let e = undefined;
      let i = undefined;
      if (a.length === 1) {
        e = a[0];
      } else {
        i = a;
      }
      t = MissionViewDefine_1.FishingEntrustViewShowData.Create(t, 20, o.Name, e, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingEntrustStartShowTrackText, t, r);
    }
  }
  EndShowTrackText(e = 0) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingEntrustEndShowTrackText, this.CurrentTraceEntrust, e);
  }
  TraceItem(e) {
    this.Vtc = false;
    this.CurrentTraceEntrust = 0;
    this.jtc = 0;
    this.RemoveAndUnTrackMark();
    if (ModelManager_1.ModelManager.LoadingModel.IsLoading && e) {
      this.uk_ = true;
      this.dk_ = e;
    } else if (!(e <= 0)) {
      this.CurrentTraceItem = e;
      this.m$l(e, 1);
      if (this.Vtc && UiManager_1.UiManager.IsViewOpen("FishingHandBookView")) {
        UiManager_1.UiManager.CloseView("FishingHandBookView");
      }
    }
  }
  m$l(n, s) {
    var o;
    var a;
    var h;
    var _ = this.lVe();
    if (_) {
      let e = MAX_INT32_NUMBER;
      let i = undefined;
      let t = undefined;
      let r = undefined;
      for (const g of ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointByShowItem(n)) {
        if (!ModelManager_1.ModelManager.FishingModel.GetFishingPointHaveFinishingIdByConfigId(g.Id)) {
          o = ModelManager_1.ModelManager.FishingModel.GetFishingPointEntityIdByConfigId(g.Id);
          if ((a = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o)) && (a = {
            X: (a = a.Transform.Pos).X ?? 0,
            Y: a.Y ?? 0,
            Z: a.Z ?? 0
          }, a = Vector_1.Vector.Create(a), (h = Vector_1.Vector.Dist(_, a)) < e)) {
            e = h;
            i = a;
            t = o;
            r = g.Id;
          }
        }
      }
      if (i && t !== undefined) {
        if (UiManager_1.UiManager.IsViewOpen("FishingQuestView") || UiManager_1.UiManager.IsViewOpen("FishingHandBookView")) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_DetectSuccess");
        }
        this.jtc = r;
        this.aB_(t, s);
        this.Vtc = true;
      } else if (UiManager_1.UiManager.IsViewOpen("FishingQuestView") || UiManager_1.UiManager.IsViewOpen("FishingHandBookView")) {
        if (ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(n).Time !== 3 || ModelManager_1.ModelManager.FishingQuestModel.IsInNight()) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_FishingPointCannotTrace");
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NightTargetTip");
        }
      }
    }
  }
  lVe() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(3);
      if (e) {
        return e.ActorLocationProxy;
      }
    }
  }
  aB_(e, i) {
    this.Xk_ = new MapDefine_1.FishingPointMarkCreateInfo({
      TrackTarget: e,
      MarkConfigId: FishingDefine_1.FISHING_POINT_MARK_ID,
      MarkType: 32,
      EntityConfigId: e,
      DestroyOnUnTrack: true,
      FishPointDetectSourceType: i,
      MapAndDungeonInfo: {
        MapConfigId: MapDefine_1.BIG_WORLD_MAP_ID,
        DungeonId: MapDefine_1.BIG_WORLD_MAP_ID
      }
    });
    if (ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle()) {
      this.sB_ = ModelManager_1.ModelManager.MapModel.CreateMapMark(this.Xk_);
      ModelManager_1.ModelManager.MapModel.SetTrackMark(this.Xk_.MarkType, this.sB_, true);
      return this.sB_;
    }
  }
  RemoveAndUnTrackMark(e = true) {
    if (this.sB_ && (ModelManager_1.ModelManager.MapModel.RemoveMapMark(32, this.sB_), this.sB_ = undefined, e)) {
      this.Xk_ = undefined;
    }
    if (this.$O_ !== 0) {
      MapController_1.MapController.RequestTrackMapMark({
        MarkType: 34,
        MarkId: this.$O_,
        Track: false
      });
      this.$O_ = 0;
    }
  }
  Yk_() {
    ModelManager_1.ModelManager.MapModel.RemoveMapMarkByType(32);
  }
  ReTraceMapMark() {
    if (this.Xk_ && this.sB_ === undefined) {
      this.sB_ = ModelManager_1.ModelManager.MapModel.CreateMapMark(this.Xk_);
      ModelManager_1.ModelManager.MapModel.SetTrackMark(this.Xk_.MarkType, this.sB_, true);
    }
  }
  Bx_() {
    for (var [e, i] of this.CurrentEntrusts) {
      if (i === 3 || i === 2) {
        i = this.GetEntrustsDeliverable(e);
        this.CurrentEntrusts.set(e, i ? 2 : 3);
      }
    }
    if (this.CurrentTraceEntrust) {
      this.TraceEntrust();
    }
    this.hY_();
  }
  OnFishingItemSell(e, i, t) {
    for (var [r, n] of this.CurrentEntrusts) {
      r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(r);
      if (r.EntrustPool !== FishingDefine_1.FISHING_QUICK_SAIL_POOL && n !== 1 && n !== 0) {
        for (var [s] of r.EntrustTarget) {
          if (e.includes(s)) {
            (s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(249)).IsEscViewTriggerCallBack = false;
            s.FunctionMap.set(0, () => {
              ConfirmBoxController_1.ConfirmBoxController.CloseConfirmBoxView();
            });
            s.FunctionMap.set(1, () => {
              if (i) {
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
              } else {
                UiManager_1.UiManager.OpenView("FishingQuestView");
              }
            });
            s.FunctionMap.set(2, () => {
              t();
            });
            ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(s);
            return true;
          }
        }
      }
    }
    return false;
  }
  AutoTraceEntrust() {
    var e;
    var i;
    var t = [];
    for ([e, i] of this.CurrentEntrusts) {
      var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e);
      if (r.EntrustPool !== FishingDefine_1.FISHING_QUICK_SAIL_POOL && i !== 1 && i !== 0) {
        t.push(r);
      }
    }
    if (!(t.length <= 0)) {
      t.sort((e, i) => {
        var t = e.EntrustPool;
        var r = i.EntrustPool;
        if (t !== r) {
          return t - r;
        } else {
          return e.Star - i.Star;
        }
      });
      FishingController_1.FishingController.RequestFishingEntrustTrace(t[0].Id);
    }
  }
  IsInNight() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour;
    return e >= this.DayEndTime || e < this.DayStartTime;
  }
}
exports.FishingQuestModel = FishingQuestModel;
//# sourceMappingURL=FishingQuestModel.js.map