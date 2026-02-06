"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureController = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const FurnitureAreaData_1 = require("./Data/FurnitureAreaData");
const FurnitureSceneSlotData_1 = require("./Data/FurnitureSceneSlotData");
const FurnitureDefine_1 = require("./FurnitureDefine");
class FurnitureController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, this.Rwl);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, this.Rwl);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26112, this.xcg);
    Net_1.Net.Register(28416, this.eAg);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26112);
    Net_1.Net.UnRegister(28416);
  }
  static UpdateData(e, r, t, a) {
    ModelManager_1.ModelManager.FurnitureModel.UpdateFurnitureInfo(e, r, t, a);
    this.Fjg();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFurnitureEntranceRedDot);
  }
  static async FurnitureSaveRequestAsync(e) {
    var r;
    var t;
    var a = new Protocol_1.Aki.Protocol.dbf();
    a.w6n = ModelManager_1.ModelManager.FurnitureModel.cVn;
    a.p6n = e.GetAreaId();
    a.Mbf = [];
    a.o4g = e.UsePreset;
    for ([r, t] of e.GetSceneSlotDataMap()) {
      var n = new Protocol_1.Aki.Protocol.Rbf();
      n.Ebf = r;
      n.Ibf = t.GetPlacedFurnitureConfigId();
      n.Tbf = [];
      for (let e = 0; e < t.GetSubSlotDataListLength(); e++) {
        var o = t.GetSubSlotData(e);
        n.Tbf.push(o.GetPlacedFurnitureConfigId());
      }
      a.Mbf.push(n);
    }
    var i = await Net_1.Net.CallAsync(15202, a);
    if (i) {
      if (i.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        FurnitureController.OnFurnitureSaveResponse(e, i.ybf);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DIY_SaveSuccess_Tip");
        return true;
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(i.G9n, 26608);
    }
    return false;
  }
  static OnFurnitureSaveResponse(e, r) {
    e.SetAtmosphere(r);
    r = new FurnitureAreaData_1.FurnitureAreaData();
    r.DeepCopy(e);
    ModelManager_1.ModelManager.FurnitureModel.FurnitureAreaDataMap.set(e.GetAreaId(), r);
  }
  static Fjg() {
    var e;
    if (this.CheckInMap()) {
      (e = ModelManager_1.ModelManager.FurnitureModel).FurnitureEntityVisibleManager.EnableAllFurnitureEntity();
      this.LoadAllFurnitureSceneItemByMapIdAsync(e.MapId, this.NonServerFurnitureEntityFilter);
    }
  }
  static CheckInMap() {
    var e;
    return !!ModelManager_1.ModelManager.WorldMapModel.IsPlayerInBigWorldInstanceDungeon() && (e = ModelManager_1.ModelManager.FurnitureModel.MapId, ModelManager_1.ModelManager.GameModeModel.MapId === e);
  }
  static async OpenFurnitureShopViewAsync(e = 0) {
    var r;
    var t = ModelManager_1.ModelManager.FurnitureModel;
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetGameplayConfigById(t.cVn);
    return !!t && (r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t.ShopNpcEntityId) === undefined, t = {
      ShopId: t.ShopId,
      NpcEntityId: r ? t.SpareShopNpcEntityId : t.ShopNpcEntityId,
      NpcName: t.ShopNpcName,
      NpcDesc: t.ShopNpcSpeak,
      NpcStartMontagePath: t.ShopNpcStartMontage,
      GoodsId: e,
      UseSpareShopNpc: r
    }, (await UiManager_1.UiManager.OpenViewAsync("FurnitureShopView", t)) !== undefined);
  }
  static StartEditArea() {
    var e = ModelManager_1.ModelManager.FurnitureModel.CurEditorAreaDataMap;
    e.clear();
    var r = ModelManager_1.ModelManager.FurnitureModel.FurnitureAreaDataMap;
    if (r && r.size !== 0) {
      for (const a of r.values()) {
        var t = new FurnitureAreaData_1.FurnitureAreaData();
        t.DeepCopy(a);
        e.set(a.GetAreaId(), t);
      }
      return e;
    }
  }
  static EndEditArea() {
    var e = ModelManager_1.ModelManager.FurnitureModel.CurEditorAreaDataMap;
    if (e && e.size !== 0) {
      e.clear();
    }
  }
  static async ApplyFurniturePresetAsync(r) {
    var e = r.GetAreaId();
    r.ClearSlotPlacedData();
    var e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurniturePresetConfig(e);
    if (e) {
      var t;
      var a;
      var n = [];
      for ([t, a] of e.FurniturePlaceInfo) {
        for (let e = 0; e < a.ArrayInt.length; e++) {
          var o;
          var i = a.ArrayInt[e];
          if (ModelManager_1.ModelManager.FurnitureModel.GetIsFurnitureUnlockById(i)) {
            o = {
              SlotEntityId: t,
              SubSlotIndex: e === 0 ? -1 : e - 1
            };
            n.push(this.PlaceFurnitureAsync({
              AreaSlotContext: {
                AreaData: r,
                SlotContext: o
              },
              FurnitureId: i,
              KeepSubFurniture: true
            }));
          }
        }
      }
      await Promise.all(n);
    }
  }
  static async PlaceFurnitureAsync(e) {
    var r = e.AreaSlotContext;
    var t = r.AreaData;
    var r = r.SlotContext;
    var a = r.SlotEntityId;
    const n = r.SubSlotIndex;
    var o = e.FurnitureId;
    var r = e.KeepSubFurniture;
    var i = t.GetSceneSlotData(a);
    if (i) {
      var e = n === -1;
      var l = new FurnitureSceneSlotData_1.FurnitureSceneSlotData();
      l.DeepCopy(i);
      t.SetSlotPlacedData(a, n, o);
      if (e && r && l) {
        for (const d of l.GetSubSlotDataList()) {
          const n = d.GetSlotIndex();
          var s;
          var u = d.GetPlacedFurnitureConfigId();
          if (!(u <= 0)) {
            if ((s = i.GetSubSlotData(n)) && s.CheckCanPlace(u)) {
              t.SetSlotPlacedData(a, n, u);
            }
          }
        }
      }
      t.UpdateAtmosphere();
      var _ = [];
      var M = ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager;
      if (e) {
        M.MarkFurnitureSceneItemAsNeedUnload(a, -1);
        for (let e = 0; e < i.GetSubSlotDataListLength(); e++) {
          if (!(i.GetSubSlotData(e).GetPlacedFurnitureConfigId() <= 0)) {
            M.MarkFurnitureSceneItemAsNeedUnload(a, e);
          }
        }
      } else {
        M.MarkFurnitureSceneItemAsNeedUnload(a, n);
      }
      var c = t.GetMapId();
      if (e) {
        _.push(this.LoadRootFurnitureSceneItemAsync(c, a, o, false));
        for (let e = 0; e < i.GetSubSlotDataListLength(); e++) {
          var f = i.GetSubSlotData(e);
          if (!(f.GetPlacedFurnitureConfigId() <= 0)) {
            _.push(this.LoadSubFurnitureSceneItemAsync(c, a, o, e, f.GetPlacedFurnitureConfigId(), false));
          }
        }
      } else {
        _.push(this.LoadSubFurnitureSceneItemAsync(c, a, i.GetPlacedFurnitureConfigId(), n, o, false));
      }
      await Promise.all(_);
      M.DoUnloadNeedUnloadedSceneItem();
      if (e) {
        M.ShowRootFurnitureSceneItem(a);
        for (let e = 0; e < i.GetSubSlotDataListLength(); e++) {
          if (!(i.GetSubSlotData(e).GetPlacedFurnitureConfigId() <= 0)) {
            M.ShowSubFurnitureSceneItem(a, e);
          }
        }
      } else {
        M.ShowSubFurnitureSceneItem(a, n);
      }
    }
  }
  static async LoadAllFurnitureSceneItemByMapIdAsync(e, r) {
    var t = [];
    for (const a of ModelManager_1.ModelManager.FurnitureModel.FurnitureAreaDataMap.values()) {
      if (a.GetMapId() === e) {
        t.push(this.LoadAllFurnitureSceneItemByAreaDataAsync(a, r));
      }
    }
    await Promise.all(t);
  }
  static async LoadAllFurnitureSceneItemByAreaDataAsync(e, r) {
    var t;
    var a;
    var n = e.GetMapId();
    var o = [];
    for ([t, a] of e.GetSceneSlotDataMap()) {
      var i = a.GetPlacedFurnitureConfigId();
      if (!(i <= 0)) {
        if (r(i)) {
          o.push(this.LoadRootFurnitureSceneItemAsync(n, t, a.GetPlacedFurnitureConfigId(), true));
        }
        for (let e = 0; e < a.GetSubSlotDataListLength(); e++) {
          var l = a.GetSubSlotData(e);
          var s = l.GetPlacedFurnitureConfigId();
          if (!(s <= 0)) {
            if (r(s)) {
              o.push(this.LoadSubFurnitureSceneItemAsync(n, t, a.GetPlacedFurnitureConfigId(), l.GetSlotIndex(), l.GetPlacedFurnitureConfigId(), true));
            }
          }
        }
      }
    }
    return (await Promise.all(o)).every(e => e);
  }
  static async LoadRootFurnitureSceneItemAsync(e, r, t, a) {
    var n;
    return !(t <= 0) && !(n = ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager).HasRootFurnitureSceneItem(r) && !!(e = ModelManager_1.ModelManager.FurnitureModel.GetRootFurnitureTransform(e, r)) && n.LoadRootFurnitureSceneItemAsync(r, t, e, a);
  }
  static async LoadSubFurnitureSceneItemAsync(e, r, t, a, n, o) {
    var i;
    return !(n <= 0) && !(i = ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager).HasSubFurnitureSceneItem(r, a) && !!(e = ModelManager_1.ModelManager.FurnitureModel.GetSubFurnitureTransform(e, r, t, a)) && i.LoadSubFurnitureSceneItemAsync(r, n, a, e, o);
  }
  static UnloadRootFurnitureSceneItem(e) {
    ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager.UnloadRootFurnitureSceneItem(e);
  }
  static UnloadSubFurnitureSceneItem(e, r) {
    ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager.UnloadSubFurnitureSceneItem(e, r);
  }
  static UnloadAllSubFurnitureSceneItem(e) {
    ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager.UnloadAllSubFurnitureSceneItem(e);
  }
  static UnloadAllFurnitureSceneItem() {
    ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager.UnloadAllFurnitureSceneItem();
  }
  static UnloadAllServerFurnitureSceneItem() {
    var e;
    var r;
    var t = ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager;
    for ([e, r] of t.GetSceneSlotItemInfoMap()) {
      var a;
      var n;
      var o = r.RootFurnitureSceneItem;
      if (o && (o = o.FurnitureConfigId, this.ServerFurnitureEntityFilter(o))) {
        t.UnloadRootFurnitureSceneItem(e);
      }
      for ([a, n] of r.SubFurnitureSceneItemMap.entries()) {
        var i = n.FurnitureConfigId;
        if (this.ServerFurnitureEntityFilter(i)) {
          t.UnloadSubFurnitureSceneItem(e, a);
        }
      }
    }
  }
  static DoUnloadNeedUnloadedSceneItem() {
    ModelManager_1.ModelManager.FurnitureModel.FurnitureSceneItemManager.DoUnloadNeedUnloadedSceneItem();
  }
  static async ChangeAreaFurnitureSceneItemsAsync(e, r) {
    for (var [t, a] of e.GetSceneSlotDataMap()) {
      this.UnloadRootFurnitureSceneItem(t);
      for (let e = 0; e < a.GetSubSlotDataListLength(); e++) {
        this.UnloadSubFurnitureSceneItem(t, a.GetSubSlotData(e).GetSlotIndex());
      }
    }
    await this.LoadAllFurnitureSceneItemByAreaDataAsync(r, this.AllFurnitureFilter);
  }
  static SetFurnitureAreaRedDotAsRead(e) {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    if (r.SaveLocalDataDelegate) {
      r.SaveLocalDataDelegate(r.cVn, 0, e, FurnitureDefine_1.FURNITURE_AREA_RED_DOT_LOCAL_KEY3, 1);
    }
  }
  static SetFurnitureHandBookItemRedDotAsRead(e) {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    if (r.SaveLocalDataDelegate) {
      r.SaveLocalDataDelegate(r.cVn, 0, e, FurnitureDefine_1.FURNITURE_HANDBOOK_ITEM_RED_DOT_LOCAL_KEY3, 1);
    }
  }
  static SetAllFurnitureHandBookItemRedDotAsRead() {
    var e = ModelManager_1.ModelManager.FurnitureModel;
    if (e.SaveLocalDataDelegate) {
      for (const r of e.UnlockFurnitureIdSet) {
        this.SetFurnitureHandBookItemRedDotAsRead(r);
      }
    }
  }
  static SetFurnitureShopItemRedDotAsRead(e) {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    if (r.SaveLocalDataDelegate) {
      r.SaveLocalDataDelegate(r.cVn, 0, e, FurnitureDefine_1.FURNITURE_SHOP_ITEM_RED_DOT_LOCAL_KEY3, 1);
    }
  }
  static SetAllFurnitureShopItemRedDotAsRead() {
    var e = ConfigManager_1.ConfigManager.FurnitureConfig.GetGameplayConfigById(ModelManager_1.ModelManager.FurnitureModel.cVn);
    if (e) {
      e = e.ShopId;
      e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(e);
      if (e) {
        for (const r of e) {
          if (ModelManager_1.ModelManager.FurnitureModel.CheckFurnitureShopItemRedDotByData(r)) {
            this.SetFurnitureShopItemRedDotAsRead(r.GetGoodsId());
          }
        }
      }
    }
  }
  static SetFurnitureDesignItemRedDotAsRead(e) {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    if (r.SaveLocalDataDelegate) {
      r.SaveLocalDataDelegate(r.cVn, 0, e, FurnitureDefine_1.FURNITURE_DESIGN_ITEM_RED_DOT_LOCAL_KEY3, 1);
    }
  }
  static TryJumpToFurnitureGift(e) {
    if (e.SourceType === 2 && !((e = e.GetWayId) <= 0)) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 2) {
        UiManager_1.UiManager.OpenView("Spring26QuestView", e);
      } else if (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(e)) {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TidName);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DIY_RolePresentTip", e);
      }
    }
  }
  static OpenFurnitureAreaSelectView() {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfigList();
    var a = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id;
    if (a) {
      let e = 0;
      for (const s of t) {
        var n = s.Id;
        if (r.GetAreaIsUnlock(n)) {
          var o = s.RangeEntityList;
          var i = ModelManager_1.ModelManager.CreatureModel;
          for (const u of o) {
            var l = i.GetEntityIdByPbDataId(u);
            var l = i.GetEntityById(l);
            if (l) {
              l = l.Entity?.GetComponent(91);
              if (l) {
                if (l.IsEntityInRange(a)) {
                  e = n;
                  break;
                }
              }
            }
          }
          if (e > 0) {
            break;
          }
        }
      }
      UiManager_1.UiManager.OpenView("FurnitureAreaSelectView", e);
    }
  }
  static async TeleportToAreaAsync(e) {
    var r;
    var e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(e);
    if (e) {
      (r = Vector_1.Vector.Create()).FromConfigVector(e.TeleportLocation);
      e = e.TeleportRotator;
      e = Rotator_1.Rotator.Create(e.Y, e.Z, e.X);
      await ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
        ClientReason: "TeleportToAreaAsync",
        TargetPosition: r.ToUeVector(),
        TargetRotation: e.ToUeRotator(),
        TeleportMode: 1
      });
    }
  }
  static FurnitureDesignReport(e) {
    var r = new LogReportDefine_1.FurnitureDesignLogEvent();
    var t = ModelManager_1.ModelManager.FurnitureModel;
    r.i_area_id = e.AreaId;
    r.i_type = e.OperationType;
    r.i_old_furniture_id = e.OldFurnitureId ?? 0;
    r.i_new_furniture_id = e.NewFurnitureId ?? 0;
    r.i_slot_id = e.SlotContext?.SlotEntityId ?? 0;
    r.i_sub_slot_index = e.SlotContext?.SubSlotIndex ?? 0;
    r.i_if_finish = t.GetFurniturePresetFunctionIsUnlocked() ? 1 : 0;
    r.s_trace_id = String(TimeUtil_1.TimeUtil.GetServerTimeStamp());
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
  }
  static FurnitureSaveReport(e) {
    var r = new LogReportDefine_1.FurnitureSaveLogEvent();
    r.i_area_id = e.AreaId;
    var t = e.OldAreaData;
    var a = e.NewAreaData;
    r.o_old_place = this.CoverAreaDataToReportData(t);
    r.o_new_place = this.CoverAreaDataToReportData(a);
    r.o_diff = this.GetAreaDataDiffToLogData(t, a);
    r.i_old_atmosphere = t.GetAtmosphere();
    r.i_new_atmosphere = a.GetAtmosphere();
    r.i_is_save = e.IsSave ? 1 : 0;
    r.s_trace_id = String(TimeUtil_1.TimeUtil.GetServerTimeStamp());
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
  }
  static CoverAreaDataToReportData(e) {
    var r;
    var t;
    var a = [];
    for ([r, t] of e.GetSceneSlotDataMap()) {
      var n = new LogReportDefine_1.FurniturePlaceLogData();
      n.i_furniture_id = t.GetPlacedFurnitureConfigId();
      n.i_slot_id = r;
      n.i_sub_slot_index = FurnitureDefine_1.FURNITURE_SCENE_SLOT_SUB_SLOT_INDEX;
      a.push(n);
      for (const i of t.GetSubSlotDataList()) {
        var o = new LogReportDefine_1.FurniturePlaceLogData();
        o.i_furniture_id = i.GetPlacedFurnitureConfigId();
        o.i_slot_id = r;
        o.i_sub_slot_index = i.GetSlotIndex();
        a.push(o);
      }
    }
    return a;
  }
  static GetAreaDataDiffToLogData(e, r) {
    var t;
    var a;
    var n = [];
    for ([t, a] of e.GetSceneSlotDataMap()) {
      var o;
      var i = r.GetSceneSlotData(t);
      var l = a.GetPlacedFurnitureConfigId();
      var s = i.GetPlacedFurnitureConfigId();
      if (l !== s) {
        (o = new LogReportDefine_1.FurniturePlaceDiffLogData()).i_slot_id = t;
        o.i_sub_slot_index = FurnitureDefine_1.FURNITURE_SCENE_SLOT_SUB_SLOT_INDEX;
        o.i_old_furniture_id = l;
        o.i_new_furniture_id = s;
        n.push(o);
      }
      var u = a.GetSubSlotDataListLength();
      for (let r = 0; r < u; r++) {
        var _ = a.GetSubSlotData(r);
        var M = i.GetSubSlotData(r);
        var _ = _.GetPlacedFurnitureConfigId();
        let e = 0;
        if (_ !== (e = M ? M.GetPlacedFurnitureConfigId() : e)) {
          (M = new LogReportDefine_1.FurniturePlaceDiffLogData()).i_slot_id = t;
          M.i_sub_slot_index = r;
          M.i_old_furniture_id = _;
          M.i_new_furniture_id = e;
          n.push(M);
        }
      }
      var c = i.GetSubSlotDataListLength();
      for (let e = u; e < c; e++) {
        var f = i.GetSubSlotData(e).GetPlacedFurnitureConfigId();
        var d = new LogReportDefine_1.FurniturePlaceDiffLogData();
        d.i_slot_id = t;
        d.i_sub_slot_index = e;
        d.i_old_furniture_id = 0;
        d.i_new_furniture_id = f;
        n.push(d);
      }
    }
    return n;
  }
}
exports.FurnitureController = FurnitureController;
(_a = FurnitureController).xcg = e => {
  if (e) {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    var t = r.cVn;
    if (t === e.w6n) {
      if (e.iug) {
        r.ClearCurrentAreaData();
      }
      r.AddUnlockAreaData(e.Ejf);
      if (_a.CheckInMap()) {
        r.FurnitureEntityVisibleManager.EnableAllFurnitureEntity();
        for (const n of e.Ejf) {
          var a = r.GetAreaData(n.p6n);
          if (a) {
            _a.LoadAllFurnitureSceneItemByAreaDataAsync(a, _a.NonServerFurnitureEntityFilter);
          }
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFurnitureAreaUnlockNotify, t, e.Ejf);
    }
  }
};
FurnitureController.eAg = e => {
  if (e) {
    var r = ModelManager_1.ModelManager.FurnitureModel;
    for (const t of e.aPg) {
      r.UnlockFurnitureIdSet.add(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFurnitureUnlockNotify, r.cVn, e.aPg);
  }
};
FurnitureController.nye = () => {
  _a.Fjg();
};
FurnitureController.Rwl = () => {
  _a.UnloadAllFurnitureSceneItem();
};
FurnitureController.FurnitureEntityFilter = e => {
  e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(e);
  return !!e && e.EntityId > 0;
};
FurnitureController.NonServerFurnitureEntityFilter = e => !_a.ServerFurnitureEntityFilter(e);
FurnitureController.ServerFurnitureEntityFilter = e => {
  e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(e);
  return !!e && !(e.EntityId <= 0) && (!!e.IsEntityGroup || ModelManager_1.ModelManager.FurnitureModel.IsSingleEntityFurnitureCanInteract(e));
};
FurnitureController.AllFurnitureFilter = e => true; //# sourceMappingURL=FurnitureController.js.map