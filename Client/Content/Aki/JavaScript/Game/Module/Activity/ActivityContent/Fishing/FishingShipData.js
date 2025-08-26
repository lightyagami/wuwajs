"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingShipData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const MapDefine_1 = require("../../../Map/MapDefine");
class FishingShipData {
  constructor() {
    this.dh_ = 1;
    this.mh_ = false;
    this.Ch_ = false;
    this.yx_ = false;
    this.Wpo = 0;
    this.sDe = undefined;
    this.osn = undefined;
    this.Uk_ = 0;
    this.gh_ = () => {
      var e = this.sDe;
      if (e && EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.gh_)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.gh_);
        ModelManager_1.ModelManager.MapModel.SyncLocalShipLocationToCacheInfo();
        ModelManager_1.ModelManager.MapModel.RemoveMapMarkByType(31);
        ModelManager_1.ModelManager.MapModel.TryRecreateShipMark();
      }
      if (e && e.Entity && (EventSystem_1.EventSystem.HasWithTarget(e.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.M6l) && EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.M6l), EventSystem_1.EventSystem.HasWithTarget(e.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E6l))) {
        EventSystem_1.EventSystem.RemoveWithTarget(e.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E6l);
      }
      this.Sx_(false);
      this.sDe = undefined;
      this.osn = undefined;
    };
    this.M6l = () => {
      this.Sx_(true);
    };
    this.E6l = () => {
      this.Sx_(false);
    };
  }
  RefreshData(e) {
    this.dh_ = e.Z7n;
    this.Ch_ = e.qT_;
    this.mh_ = e.GT_;
    this.Wpo = MathUtils_1.MathUtils.LongToNumber(e.F4n);
    this.Uk_ = e.XP_;
    this.RefreshShipEntity(this.Wpo);
  }
  SetLastPortId(e) {
    this.Uk_ = e;
  }
  SetIsInPortInternal(e) {
    this.mh_ = e;
  }
  RefreshShipEntity(t) {
    if (t === this.Wpo) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo);
      var i = t?.Entity;
      if (t?.Valid && i?.IsStart && t.Id !== this.sDe?.Id) {
        this.gh_();
        this.sDe = t;
        this.osn = i.GetComponent(173);
        var r = i.GetComponent(1)?.Owner;
        if (r?.IsValid()) {
          GlobalData_1.GlobalData.BpEventManager.当捕鱼船创建时.Broadcast(r);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingShipDataRefresh);
        var r = i.GetComponent(234);
        var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
        let e = false;
        if (r && n) {
          e = r.IsDriver(n);
        }
        this.Sx_(e);
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.gh_);
        EventSystem_1.EventSystem.AddWithTarget(i, EventDefine_1.EEventName.OnVehicleBeenEntered, this.M6l);
        EventSystem_1.EventSystem.AddWithTarget(i, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E6l);
        this.$cc(this.sDe);
      }
    }
  }
  $cc(e) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.OnlineModel.OwnerId) {
      e = new MapDefine_1.FishingShipMarkCreateInfo({
        TrackTarget: e.Id,
        MarkConfigId: MapDefine_1.FISHING_SHIP_MARK_ID,
        MarkType: 31,
        TrackSource: 1,
        EntityConfigId: e.PbDataId,
        MapAndDungeonInfo: {
          MapConfigId: MapDefine_1.BIG_WORLD_MAP_ID
        }
      });
      ModelManager_1.ModelManager.MapModel.RemoveMapMarkByType(31);
      ModelManager_1.ModelManager.MapModel.CreateMapMark(e);
    }
  }
  Sx_(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Fishing", 48, "驾驶捕鱼船状态改变", ["isDriving", e]);
    }
    this.yx_ = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DriveFishingShipStateChanged, e);
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  GetEntityHandle() {
    var e = this.sDe;
    if (e?.Valid) {
      return e;
    }
  }
  GetCurrentHp() {
    return this.osn?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) ?? 0;
  }
  GetMaxHp() {
    return this.osn?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n) ?? 0;
  }
  GetCurrentSkinId() {
    return this.dh_;
  }
  AddAttributeListener(e, t) {
    this.osn?.AddListener(e, t);
  }
  RemoveAttributeListener(e, t) {
    this.osn?.RemoveListener(e, t);
  }
  GetAttributeValue(e) {
    return this.osn?.GetCurrentValue(e) ?? 0;
  }
  IsShipInPort() {
    return this.mh_;
  }
  IsShipSailing() {
    return this.Ch_;
  }
  IsShipDriving() {
    return this.yx_;
  }
  GetLastPortId() {
    return this.Uk_;
  }
}
exports.FishingShipData = FishingShipData;
//# sourceMappingURL=FishingShipData.js.map