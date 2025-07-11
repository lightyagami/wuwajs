"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureCompassUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
const MAX_ARROW_COUNT = 5;
class TreasureCompassUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.aHl = undefined;
    this.kRe = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.hHl = [];
    this.Lrt = true;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnCreateAsync() {
    var e = [];
    for (let t = 0; t < MAX_ARROW_COUNT; t++) {
      e.push(this.lHl());
    }
    await Promise.all(e);
  }
  OnBeforeDestroy() {
    for (const t of this.hHl) {
      t.Clean();
      t.Destroy();
    }
    this.hHl.length = 0;
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  async lHl() {
    var t = new TreasureCompassArrow();
    this.hHl.push(t);
    await t.CreateByResourceIdAsync("UiItem_ShipRingArrow");
  }
  OnStart() {
    super.OnStart();
    this.Lrt = false;
    this.aHl = this.GetItem(0);
    for (const t of this.hHl) {
      t.GetRootItem().SetUIParent(this.aHl);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetActive(t) {
    if (t !== this.Lrt) {
      if (this.Lrt = t) {
        super.SetActive(true);
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlaySequencePurely("Start", false);
      } else {
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
          if (!this.Lrt) {
            super.SetActive(false);
          }
        });
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTreasureCompassUnitVisibleChange, t);
    }
  }
  InitHide() {
    super.SetActive(false);
    this.Lrt = false;
  }
  RefreshCompass(e, s) {
    TreasureCompassUnit._Hl.Start();
    var i = e.length;
    var r = this.hHl.length;
    var o = undefined;
    var h = undefined;
    let a = false;
    let n = -1;
    for (let t = 0; t < i; t++) {
      if ((o = e[t]).IsEnableCompassTracking) {
        if ((n += 1) >= r) {
          break;
        }
        if (t >= MAX_ARROW_COUNT) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Track", 67, "[TreasureCompassUnit]箭头显示数量超过最大值, UI对象可能存在泄露");
          }
          break;
        }
        var u;
        var h = this.hHl[n];
        if (o.IsNearbyTracking) {
          h.SetVisible(false);
        } else {
          a = true;
          o.Location.Subtraction(s, this.kRe);
          u = MathUtils_1.MathUtils.GetAngleByVector2D(this.kRe);
          this.cie.Yaw = -u + CameraController_1.CameraController.CameraRotator.Yaw;
          h.SetRotation(this.cie.ToUeRotator());
          if (o.DistSquared < o.HighlightRangeSquared) {
            h.SetHighLight(true);
            h.GetRootItem().SetAsLastHierarchy();
          } else {
            u = 1 - (o.DistSquared - o.HighlightRangeSquared) * 0.5 / (o.RangeSquared - o.HighlightRangeSquared);
            u = MathUtils_1.MathUtils.Clamp(u, 0.5, 1);
            h.SetArrowScale(u);
            h.SetHighLight(false);
          }
          h.SetVisible(true);
        }
      }
    }
    for (let t = n = n < 0 ? 0 : n; t < r; t++) {
      this.hHl[t].SetVisible(false);
    }
    if (a && !this.Lrt) {
      this.SetActive(true);
    } else if (!a && this.Lrt) {
      this.SetActive(false);
    }
    TreasureCompassUnit._Hl.Stop();
  }
}
(exports.TreasureCompassUnit = TreasureCompassUnit)._Hl = Stats_1.Stat.Create("TreasureCompassUnitRefresh");
class TreasureCompassArrow extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eii = undefined;
    this.RWl = undefined;
    this.cHl = Vector_1.Vector.Create();
    this.wWl = false;
    this.Lrt = true;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.Lrt = false;
    this.RootItem?.SetUIActive(false);
    this.eii = this.GetItem(0);
    this.eii?.SetUIActive(true);
    this.RWl = this.GetItem(1);
    this.RWl?.SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Clean() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  SetVisible(t) {
    if (t !== this.Lrt) {
      if (this.Lrt = t) {
        this.RootItem?.SetUIActive(true);
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlaySequencePurely("Start", false);
      } else {
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
          if (!this.Lrt) {
            this.RootItem?.SetUIActive(false);
          }
        });
      }
    }
  }
  SetRotation(t) {
    this.RootItem?.SetUIRelativeRotation(t);
  }
  SetArrowScale(t) {
    this.cHl.X = t;
    this.cHl.Y = t;
    this.eii?.SetUIItemScale(this.cHl.ToUeVectorOld());
  }
  SetHighLight(t) {
    if (t !== this.wWl) {
      this.wWl = t;
      this.eii?.SetUIActive(!t);
      this.RWl?.SetUIActive(t);
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlaySequencePurely("Start", false);
    }
  }
}
//# sourceMappingURL=TreasureCompassUnit.js.map