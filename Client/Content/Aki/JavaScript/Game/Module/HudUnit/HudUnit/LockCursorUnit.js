"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockCursorUnit = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
class LockCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Fti = -1;
    this.Cce = -0;
    this.Dxt = 0;
    this.SPe = undefined;
    this.Vti = false;
    this.e6a = 0;
    this.t6a = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem]];
  }
  OnStart() {
    this.RootItem.SetAnchorAlign(2, 2);
    this.GetItem(1).SetUIActive(true);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.SetBarPercent(1);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Tick(t) {
    var e;
    if (!(this.Fti < 0)) {
      if (this.Cce > this.Fti) {
        this.SetBarPercent(1);
      } else {
        e = this.Cce / this.Fti;
        this.SetBarPercent(e);
        this.Cce += t;
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
  }
  Activate() {
    this.SetVisible(true, 0);
  }
  Deactivate() {
    this.Euo(0);
    this.SetVisible(false, 0);
  }
  SetActive(t) {
    if (!t) {
      this.DeactivateUnlockTimeDown();
    }
    this.jti(!this.Vti);
    this.GetItem(1).SetUIActive(!this.Vti);
    this.GetSprite(4).SetUIActive(!this.Vti);
    super.SetActive(t);
  }
  IsForceLockState() {
    return this.Dxt === 1;
  }
  ActivateUnlockTimeDown(t) {
    this.Fti = t;
    this.Cce = 0;
  }
  DeactivateUnlockTimeDown() {
    this.Fti = -1;
    this.Cce = 0;
    this.SetBarPercent(1);
  }
  Refresh(t, e, i) {
    var s = t?.Entity?.Id ?? 0;
    this.e6a = s;
    var s = t?.Entity?.GetComponent(217);
    this.Vti = s?.HasTag(-625862347) ?? false;
    this.SetVisible(!this.Vti, 2);
    var t = this.wke(e, i);
    this.i6a(t);
    this.Euo(t);
  }
  wke(t, e) {
    if (this.Vti) {
      return 0;
    } else if (e) {
      if (t?.Valid) {
        if ((e = t.Entity.GetComponent(217)).HasTag(-1150819426)) {
          return 1;
        } else if (e.HasTag(1260125908)) {
          return 2;
        } else {
          return 3;
        }
      } else {
        return 0;
      }
    } else {
      return 3;
    }
  }
  i6a(t) {
    if (t === 1) {
      if (t !== this.Dxt) {
        this.r6a();
        this.t6a = this.e6a;
      } else if (this.t6a !== this.e6a) {
        this.t6a = this.e6a;
        this.o6a();
      }
    }
  }
  Euo(t) {
    if (t !== this.Dxt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[LockCursorUnit]UpdateLockState", ["", t]);
      }
      if (this.Dxt === 0) {
        this.bco();
      } else if (this.Dxt === 2) {
        this.eOn();
      }
      if (t === 2) {
        this.ZGn();
      }
      this.Dxt = t;
      var e = this.GetItem(2);
      var i = this.GetItem(5);
      switch (t) {
        case 1:
          e.SetUIActive(true);
          i.SetUIActive(false);
          break;
        case 2:
          e.SetUIActive(false);
          i.SetUIActive(true);
          break;
        default:
          e.SetUIActive(false);
          i.SetUIActive(false);
      }
    }
  }
  jti(t) {
    var e = this.GetSprite(3);
    if (e.IsUIActiveSelf() !== t) {
      e.SetUIActive(t);
    }
  }
  SetBarPercent(t) {
    this.GetSprite(3).SetFillAmount(t);
  }
  bco() {
    this.SPe.PlaySequencePurely("Start");
  }
  ZGn() {
    this.SPe.PlaySequencePurely("Lock");
  }
  eOn() {
    this.SPe.PlaySequencePurely("Unlock");
  }
  r6a() {
    ModelManager_1.ModelManager.BattleUiModel.AudioData?.PlayAudio(2, 17);
  }
  o6a() {
    ModelManager_1.ModelManager.BattleUiModel.AudioData?.PlayAudio(3, 17);
  }
}
exports.LockCursorUnit = LockCursorUnit;
//# sourceMappingURL=LockCursorUnit.js.map