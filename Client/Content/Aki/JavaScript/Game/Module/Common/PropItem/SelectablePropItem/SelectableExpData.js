"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectableExpData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class SelectableExpData {
  constructor() {
    this.ArrivedLevel = 0;
    this.ArrivedExp = 0;
    this.ArrivedFillAmount = 0;
    this.CurrentMaxExp = 0;
    this.CurrentLevel = 0;
    this.CurrentExp = 0;
    this.CurrentMaxLevel = 0;
    this.LimitLevel = 0;
    this.FrontExp = 0;
    this.SBt = false;
    this.yBt = 0;
    this.MaxExpCacheMap = new Map();
    this.GetMaxExpFunction = undefined;
    this.IBt = false;
  }
  static PhraseData(t) {
    var e = new SelectableExpData();
    if (t.MaxExpFunction) {
      e.SetMaxExpFunction(t.MaxExpFunction);
    }
    e.UpdateComponent(t.CurrentLevel, t.CurrentMaxLevel, t.CurrentExp);
    e.UpdateExp(0);
    return e;
  }
  UpdateComponent(t, e, i, s = undefined, h = false) {
    this.ArrivedLevel = t;
    this.CurrentLevel = t;
    this.CurrentMaxLevel = e;
    this.CurrentExp = i;
    this.LimitLevel = s;
    this.IBt = h;
    if (this.CurrentLevel === this.CurrentMaxLevel) {
      this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel - 1);
    } else {
      this.CurrentMaxExp = this.StageMaxExp(this.CurrentLevel);
    }
  }
  UpdateExp(t) {
    return (!this.IsInMax() || !(t > this.FrontExp)) && !(this.Wxt(t), 0);
  }
  Wxt(t) {
    var e;
    this.FrontExp = t;
    this.yBt = t;
    this.SBt = this.CurrentExp + t >= this.CurrentMaxExp;
    if (this.SBt) {
      e = this.CurrentExp + t - this.CurrentMaxExp;
      this.UpdateNextExp(e, this.CurrentLevel + 1);
    } else {
      e = (this.CurrentExp + t) / this.CurrentMaxExp;
      this.UpdateCurrentExp(t, this.CurrentLevel, e);
    }
  }
  UpdateNextExp(e, i) {
    if (i >= this.CurrentMaxLevel) {
      this.UpdateCurrentExp(e, i, 1);
    } else {
      let t = this.MaxExpCacheMap.get(i);
      if (!t) {
        t = this.GetMaxExpFunction(i);
        this.MaxExpCacheMap.set(i, t);
      }
      if (e >= t) {
        this.UpdateNextExp(e - t, i + 1);
      } else {
        this.UpdateCurrentExp(e, i, e / t);
      }
    }
  }
  UpdateCurrentExp(t, e, i) {
    this.ArrivedExp = t;
    this.ArrivedFillAmount = i;
    this.ArrivedLevel = e;
  }
  StageMaxExp(t) {
    if (!this.GetMaxExpFunction) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelExperienceComponent", 10, "Unregistered SetMaxExpFunction CallBack");
      }
      return 0;
    }
    let e = this.MaxExpCacheMap.get(t);
    return e = e || this.GetMaxExpFunction(t);
  }
  GetMaxExp(t) {
    if (this.IBt) {
      return this.AddUpMaxExp(t);
    } else {
      return this.StageMaxExp(t);
    }
  }
  AddUpMaxExp(e) {
    let i = 0;
    for (let t = 1; t <= e; t++) {
      i += this.StageMaxExp(t);
    }
    return i;
  }
  IsInMax() {
    return this.ArrivedLevel === this.CurrentMaxLevel;
  }
  GetOverExp() {
    var t = this.GetExpDistanceToMax();
    var t = this.yBt - t;
    if (t > 0) {
      return t;
    } else {
      return 0;
    }
  }
  GetIsAddUp() {
    return this.IBt;
  }
  SetMaxExpFunction(t) {
    this.GetMaxExpFunction = t;
  }
  GetCurrentLevel() {
    return this.CurrentLevel;
  }
  GetExpDistanceToMax() {
    return this.GetExpDistanceToLevel(this.CurrentMaxLevel);
  }
  GetExpDistanceToLevel(t) {
    if (t <= this.CurrentLevel) {
      return 0;
    }
    var e = Math.min(t, this.CurrentMaxLevel);
    let i = 0;
    for (let t = 0; t <= e - 1; t++) {
      i += this.StageMaxExp(t);
    }
    let s = 0;
    for (let t = 0; t <= this.CurrentLevel - 1; t++) {
      s += this.StageMaxExp(t);
    }
    return i - s - this.CurrentExp;
  }
  GetCurrentExp() {
    return this.CurrentExp;
  }
  GetCurrentMaxLevel() {
    return this.CurrentMaxLevel;
  }
  GetLimitLevel() {
    return this.LimitLevel;
  }
  GetArrivedAddExp() {
    return this.ArrivedExp;
  }
  GetCurrentAddExp() {
    return this.yBt;
  }
  GetArrivedLevel() {
    return this.ArrivedLevel;
  }
  GetArrivedFillAmount() {
    return this.ArrivedFillAmount;
  }
  GetIfNext() {
    return this.SBt;
  }
}
exports.SelectableExpData = SelectableExpData;
//# sourceMappingURL=SelectableExpData.js.map