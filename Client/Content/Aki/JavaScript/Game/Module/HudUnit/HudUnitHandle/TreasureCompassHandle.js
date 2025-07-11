"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureCompassHandle = undefined;
const Stats_1 = require("../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TreasureCompassUnit_1 = require("../HudUnit/TreasureCompassUnit");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class TreasureCompassHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.uHl = undefined;
    this.dHl = false;
    this.A2n = 0;
    this.mHl = e => {
      if (!(this.dHl = e)) {
        this.uHl?.SetActive(false);
      }
    };
  }
  OnInitialize() {
    super.OnInitialize();
    this.dHl = ModelManager_1.ModelManager.TreasureHuntModel.IsCompassActive();
    this.A2n = 0;
    this.CHl();
  }
  OnDestroyed() {
    if (this.uHl) {
      this.DestroyHudUnit(this.uHl);
      this.uHl = undefined;
    }
    ControllerHolder_1.ControllerHolder.TreasureHuntController.ClearNearbyTrack();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateCompassActive, this.mHl);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateCompassActive, this.mHl);
  }
  CHl() {
    this.uHl = this.NewHudUnitWithReturn(TreasureCompassUnit_1.TreasureCompassUnit, "UiItem_ShipRing", false, () => {
      this.uHl?.InitHide();
    }, true);
  }
  OnTick(e) {
    if (this.dHl) {
      TreasureCompassHandle.Ult.Start();
      var s = ModelManager_1.ModelManager.TreasureHuntModel.GetTreasureList();
      if (s && s.length !== 0) {
        var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
        if (t) {
          let e = undefined;
          for (const r of s) {
            if (r.IsEnableCompassTracking) {
              e = r;
              break;
            }
          }
          if (e) {
            if (e.IsNearbyTracking) {
              if (e.DistSquared > e.NearbyTrackHideRangeSquared) {
                this.A2n = 0;
                ControllerHolder_1.ControllerHolder.TreasureHuntController.ClearNearbyTrack();
              }
            } else if (e.DistSquared < e.NearbyTrackShowRangeSquared && e.EntityId !== this.A2n) {
              this.A2n = e.EntityId;
              ControllerHolder_1.ControllerHolder.TreasureHuntController.SetNearbyTrack(e.EntityId);
            }
          } else {
            this.A2n = 0;
            ControllerHolder_1.ControllerHolder.TreasureHuntController.ClearNearbyTrack();
          }
          this.uHl?.RefreshCompass(s, t);
        }
      }
      TreasureCompassHandle.Ult.Stop();
    }
  }
}
(exports.TreasureCompassHandle = TreasureCompassHandle).Ult = Stats_1.Stat.Create("TreasureCompassHandleTick");
//# sourceMappingURL=TreasureCompassHandle.js.map