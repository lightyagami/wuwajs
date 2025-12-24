"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContinuousRingArea = exports.RingArea = exports.ArtemisQteRingInfo = exports.ArtemisQteGameInfo = exports.fixedCellIndex = exports.calculateCellSize = exports.QTE_SINGLECELL_ANGLE = exports.QTE_RING_ANGLE = exports.QTE_RINGCELLCOUNT = undefined;
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
function calculateCellSize(e, t) {
  if (e <= t) {
    return t - e + 1;
  } else {
    return exports.QTE_RINGCELLCOUNT - e + t + 1;
  }
}
function fixedCellIndex(e) {
  var t;
  if (e > exports.QTE_RINGCELLCOUNT) {
    if ((t = e % exports.QTE_RINGCELLCOUNT) == 0) {
      return exports.QTE_RINGCELLCOUNT;
    } else {
      return t;
    }
  } else if (e <= 0) {
    return e + exports.QTE_RINGCELLCOUNT;
  } else {
    return e;
  }
}
exports.QTE_RINGCELLCOUNT = 36;
exports.QTE_RING_ANGLE = 360;
exports.QTE_SINGLECELL_ANGLE = exports.QTE_RING_ANGLE / exports.QTE_RINGCELLCOUNT;
exports.calculateCellSize = calculateCellSize;
exports.fixedCellIndex = fixedCellIndex;
class ArtemisQteGameInfo {
  constructor() {
    this.Ebl = undefined;
    this.afl = 0;
    this.CurrentScore = 0;
    this.CurrentRound = 0;
    this.MaxRound = 0;
    this.CursorSpeed = 0;
    this.RingSpeed = 0;
    this.PerfectAppearRate = 0;
  }
  CreateRingInfo(e) {
    this.Ebl = new ArtemisQteRingInfo(e);
  }
  GetRingInfo() {
    return this.Ebl;
  }
  Clear() {
    this.Ebl?.Clear();
    this.Ebl = undefined;
    this.afl = 0;
    this.CurrentScore = 0;
    this.CurrentRound = 0;
    this.MaxRound = 0;
  }
  SetGameStage(e) {
    this.afl = e;
  }
  GetGameStage() {
    return this.afl;
  }
  IsGamePause() {
    return this.afl !== 2;
  }
  IsGameEnd() {
    return this.afl >= 4;
  }
}
exports.ArtemisQteGameInfo = ArtemisQteGameInfo;
class ArtemisQteRingInfo {
  constructor(e) {
    this.ArrowDirection = e;
    this.CurrentArrowStayRelativeValidAreaIndex = -1;
    this.CurrentArrowStayCellIndex = 0;
    this.ValidAreas = [];
    this.ft_ = new Map();
    this.Mbl = new Map();
    this.IsWholeRing = true;
  }
  Clear() {
    this.ValidAreas.length = 0;
    this.ft_.clear();
  }
  GetValidAreas() {
    return this.ValidAreas;
  }
  AddValidArea(e, t) {
    this.ValidAreas.push(new RingArea(e, t, this.ArrowDirection));
  }
  ClearValidAreas() {
    this.ValidAreas.length = 0;
  }
  GetQteAreas() {
    return this.ft_;
  }
  GetQteArea(e) {
    return this.ft_.get(e);
  }
  AddQteArea(e, t, s) {
    this.ft_.set(e, new ContinuousRingArea(e, t, s, this.ArrowDirection));
  }
  RemoveQteArea(e) {
    this.ft_.delete(e);
  }
  GetPerfectAreas() {
    return this.Mbl;
  }
  GetPerfectArea(e) {
    return this.Mbl.get(e);
  }
  AddPerfectArea(e, t, s) {
    this.Mbl.set(e, new ContinuousRingArea(e, t, s, this.ArrowDirection));
  }
  RemovePerfectArea(e) {
    this.Mbl.delete(e);
  }
  CheckInArea(e, t) {
    for (var [, s] of e) {
      var r = s.StartCellIndex;
      var i = s.EndCellIndex;
      if (r <= i) {
        if (r <= t && t <= i) {
          return s;
        }
      } else if (r <= t && t <= exports.QTE_RINGCELLCOUNT || t >= 1 && t <= i) {
        return s;
      }
    }
  }
  EnterNextValidArea() {
    var e = this.ValidAreas.length;
    if (e) {
      switch (this.ArrowDirection) {
        case 0:
          this.CurrentArrowStayRelativeValidAreaIndex++;
          break;
        case 1:
          this.CurrentArrowStayRelativeValidAreaIndex--;
      }
      if (this.CurrentArrowStayRelativeValidAreaIndex >= e) {
        this.CurrentArrowStayRelativeValidAreaIndex = 0;
      } else if (this.CurrentArrowStayRelativeValidAreaIndex < 0) {
        this.CurrentArrowStayRelativeValidAreaIndex = e - 1;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnArtemisQteAreaChange, this.CurrentArrowStayRelativeValidAreaIndex);
    }
  }
  OnArrowDirectionReverse() {
    switch (this.ArrowDirection) {
      case 0:
        this.ArrowDirection = 1;
        break;
      case 1:
        this.ArrowDirection = 0;
    }
    for (const t of this.ValidAreas) {
      t.OnArrowDirectionReverse();
    }
    for (var [, e] of this.ft_) {
      e.OnArrowDirectionReverse();
    }
  }
}
exports.ArtemisQteRingInfo = ArtemisQteRingInfo;
class RingArea {
  constructor(e, t, s) {
    this.StartCellIndex = e;
    this.EndCellIndex = t;
    this.ArrowDirection = s;
  }
  OnArrowDirectionReverse() {
    switch (this.ArrowDirection) {
      case 0:
        this.ArrowDirection = 1;
        break;
      case 1:
        this.ArrowDirection = 0;
    }
  }
}
class ContinuousRingArea extends (exports.RingArea = RingArea) {
  constructor(e, t, s, r) {
    super(t, s, r);
    this.ContinuousIndex = e;
    this.StartCellIndex = t;
    this.EndCellIndex = s;
    this.ArrowDirection = r;
  }
}
exports.ContinuousRingArea = ContinuousRingArea;
//# sourceMappingURL=ArtemisQteDefine.js.map