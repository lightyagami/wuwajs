"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarFuLuoLuoNoteItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("../../BattleUiTweenAnimPlayer");
class SpecialEnergyBarFuLuoLuoNoteItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Eah = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.x5e = [];
    this.Wju = -1;
    this.Dxt = false;
    this.Qju = false;
    this.ac = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.x5e.push(this.GetItem(0));
    this.x5e.push(this.GetItem(1));
    this.x5e.push(this.GetItem(2));
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
    this.InitTweenAnim(6);
    this.InitTweenAnim(7);
    this.PlayTweenAnim(3);
  }
  SetParent(t) {
    if (this.ParentUiItem !== t && (this.ParentUiItem = t, t = this.GetRootItem())) {
      t.SetUIParent(this.ParentUiItem);
    }
  }
  SetEnergyType(i) {
    if (i !== this.Wju) {
      var t = this.Wju;
      this.Wju = i;
      for (let t = 0; t < this.x5e.length; t++) {
        this.x5e[t].SetUIActive(i === t + 1);
      }
      this._Oe();
      if (t === 0 && this.Wju !== 0) {
        this.PlayTweenAnim(6);
      } else if (t !== 0 && this.Wju === 0 && !this.Qju) {
        this.PlayTweenAnim(7);
      }
    }
  }
  SetLockState(t) {
    if (this.Dxt !== t) {
      this.Dxt = t;
      this._Oe();
    }
  }
  SetPerformState(t) {
    if (this.Qju !== t) {
      this.Qju = t;
      this._Oe();
    }
  }
  _Oe() {
    let t = 0;
    if (this.Qju) {
      t = 1;
    } else if (this.Dxt && this.Wju > 0) {
      t = 2;
    }
    if (this.ac !== t) {
      if (this.ac === 0) {
        this.StopTweenAnim(3);
      } else if (this.ac === 1) {
        this.StopTweenAnim(5);
      } else if (this.ac === 2) {
        this.StopTweenAnim(4);
      }
      this.ac = t;
      if (this.ac === 0) {
        this.PlayTweenAnim(3);
      } else if (this.ac === 1) {
        this.PlayTweenAnim(5);
      } else if (this.ac === 2) {
        this.PlayTweenAnim(4);
      }
    }
  }
  InitTweenAnim(t) {
    this.Eah.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    this.Eah?.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.Eah?.StopTweenAnim(t);
  }
  ClearAllTweenAnim() {
    this.Eah?.Clear();
  }
}
exports.SpecialEnergyBarFuLuoLuoNoteItem = SpecialEnergyBarFuLuoLuoNoteItem;
//# sourceMappingURL=SpecialEnergyBarFuLuoLuoNoteItem.js.map