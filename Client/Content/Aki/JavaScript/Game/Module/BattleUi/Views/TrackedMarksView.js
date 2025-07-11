"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackedMarksView = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MarkItemUtil_1 = require("../../Map/Marks/MarkItemUtil");
const MapLogger_1 = require("../../Map/Misc/MapLogger");
const TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const TrackedMark_1 = require("./TrackedMark");
const TrackedMarkForTower_1 = require("./TrackedMarkForTower");
class TrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.wmt = new Map();
    this.rgt = false;
    this.ngt = i => {
      if (MarkItemUtil_1.MarkItemUtil.CanShowTrackMark(i)) {
        if (!(i.TrackTarget instanceof UE.Actor) || i.TrackTarget.IsValid()) {
          let r = this.wmt.get(i.TrackSource);
          if (!r) {
            r = new Map();
            this.wmt.set(i.TrackSource, r);
          }
          if (!r.has(i.Id)) {
            let e = undefined;
            e = new (TowerDefenceController_1.TowerDefenseController.CheckIsTowerEntity(i) ? TrackedMarkForTower_1.TrackedMarkForTower : TrackedMark_1.TrackedMark)(i);
            r.set(i.Id, e);
            e.Initialize(this.RootItem);
            let t = ModelManager_1.ModelManager.BattleUiModel.TrackDatas.get(i.TrackSource);
            if (!t) {
              t = new Map();
              ModelManager_1.ModelManager.BattleUiModel.TrackDatas.set(i.TrackSource, t);
            }
            t.set(i.Id, i);
          }
          this.rgt = true;
        }
      } else {
        MapLogger_1.MapLogger.Debug(63, "标记系统-追踪->TackedMarksView.TrackMark,追踪标记不满足显示条件", ["trackData", i]);
      }
    };
    this.sgt = e => {
      var t;
      var r = this.wmt.get(e.TrackSource);
      if (r) {
        if ((t = r.get(e.Id)) && (t.Destroy(), r.delete(e.Id), t = ModelManager_1.ModelManager.BattleUiModel.TrackDatas.get(e.TrackSource))) {
          t.delete(e.Id);
        }
        this.rgt = true;
      }
    };
    this.agt = (e, t, r) => {
      var e = this.wmt.get(e);
      if (e &&= e.get(t)) {
        e.UpdateTrackTarget(r);
      }
    };
    this.hgt = (e, t, r) => {
      var e = this.wmt.get(e);
      if (e &&= e.get(t)) {
        e.SetVisibleByOccupied(r);
      }
    };
    this.Yq1 = (e, t, r) => {
      var e = this.wmt.get(e);
      if (e &&= e.get(t)) {
        e.SetVisibleByInteractionSpotOccupied(r);
      }
    };
  }
  Initialize(e) {
    super.Initialize(e);
    this.yWe();
    if (ModelManager_1.ModelManager.BattleUiModel.TrackDatas) {
      for (var [, t] of ModelManager_1.ModelManager.BattleUiModel.TrackDatas) {
        for (var [, r] of t) {
          this.ngt(r);
        }
      }
    }
  }
  Reset() {
    super.Reset();
    this.Nmt();
    for (const e of this.wmt.values()) {
      for (const t of e.values()) {
        t.Destroy();
      }
    }
    this.wmt.clear();
  }
  OnShowBattleChildViewPanel() {
    for (const e of this.wmt.values()) {
      for (const t of e.values()) {
        t.OnUiShow();
      }
    }
  }
  Update(e) {
    TrackedMarksView.Ult.Start();
    ModelManager_1.ModelManager.TrackModel.ClearGroupMinDistance();
    for (const i of this.wmt.values()) {
      for (const s of i.values()) {
        s.UpdateTrackDistance();
      }
    }
    TrackedMarksView.Ult.Stop();
    for (var [t, r] of this.wmt) {
      for (const a of r.values()) {
        if (this.rgt) {
          if (this.IsTrackTargetRepeat(a, t)) {
            a.ShouldShowTrackMark = false;
          } else {
            a.ShouldShowTrackMark = true;
          }
        }
        a.Update(e);
      }
    }
    this.rgt = false;
  }
  IsTrackTargetRepeat(e, t) {
    for (var [r, i] of this.wmt) {
      for (const s of i.values()) {
        if (e.TrackTarget === s.TrackTarget && t < r) {
          return true;
        }
      }
    }
    return false;
  }
  OnHideBattleChildViewPanel() {
    for (const e of this.wmt.values()) {
      for (const t of e.values()) {
        t.OnUiHide();
      }
    }
  }
  yWe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.ngt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.sgt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateTrackTarget, this.agt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetTrackMarkOccupied, this.hgt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetInteractSpotOccupied, this.Yq1);
  }
  Nmt() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMark, this.ngt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.sgt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateTrackTarget, this.agt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetTrackMarkOccupied, this.hgt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetInteractSpotOccupied, this.Yq1);
  }
  DestroyOverride() {
    return true;
  }
}
(exports.TrackedMarksView = TrackedMarksView).Ult = Stats_1.Stat.Create("[BattleView]UpdateTrackDistance");
//# sourceMappingURL=TrackedMarksView.js.map