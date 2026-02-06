"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisQteProgressItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ArtemisQteDefine_1 = require("./ArtemisQteDefine");
const ArtemisQteRingBgSingleItem_1 = require("./ArtemisQteRingBgSingleItem");
const ArtemisQteRingSingleItem_1 = require("./ArtemisQteRingSingleItem");
const MIN_ANIM_TIME = 100;
const PROGRESS_START_ANGLE = -53;
const PROGRESS_END_ANGLE = 0;
const PAUSE_TIME = 0;
const YAW_MAX_ANGLE = ArtemisQteDefine_1.QTE_RING_ANGLE * 2;
class ArtemisQteProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GamePlayId = 0;
    this.GameInfo = undefined;
    this.RingInfo = undefined;
    this.cce = Rotator_1.Rotator.Create();
    this.r8f = Rotator_1.Rotator.Create();
    this.hc_ = Rotator_1.Rotator.Create();
    this.cc_ = false;
    this.Vbn = 0;
    this.uc_ = 0;
    this.K1t = 0;
    this.XZh = 0;
    this.YZh = 0;
    this.RotateMode = 0;
    this.PeriodAlphaTotalTime = 0;
    this.PeriodAlphaCurrentTime = 0;
    this.y7_ = new Map();
    this.Qfl = new Map();
    this.jfl = [];
    this.Bzf = undefined;
    this.kzf = undefined;
    this.o8f = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.o8f.length = 0;
    this.y7_.clear();
    this.Qfl.clear();
    this.jfl.length = 0;
  }
  Init(t, i) {
    this.GameInfo = i;
    this.RingInfo = this.GameInfo.GetRingInfo();
    this.GamePlayId = t;
    i = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId);
    this.K1t = Math.max(i.HitColdTime, MIN_ANIM_TIME);
    t = i.HiddenInterval[0];
    t = t * 2 + i.HiddenInterval[1];
    if (t > 0) {
      this.PeriodAlphaTotalTime = t;
    }
  }
  InitRing() {
    this.RingInfo.ClearValidAreas();
    this.SpawnBgArea();
    this?.InitAllQteAreas();
    var t = this.GameInfo.CursorSpeed;
    var i = this.GameInfo.RingSpeed;
    if (!(t > 0) || !(i > 0)) {
      this.RotateMode = t > 0 ? 0 : 1;
    }
  }
  OnTick(t) {
    var i = this.dc_();
    this.mc_(i, t);
    this.Nqe(i);
    this.gsi(t);
  }
  gsi(t) {
    if (!this.GameInfo.IsGamePause()) {
      var i = this.GameInfo.CursorSpeed;
      var e = this.GameInfo.RingSpeed;
      var i = this.RotateMode === 0 ? i : e;
      var e = this.RingInfo?.ArrowDirection === 0 ? -1 : 1;
      var s = t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      this.cce.Yaw = this.Gt_(e, i, s);
      var h = this.GetItem(7);
      switch (this.RotateMode) {
        case 0:
          h?.SetUIRelativeRotation(this.cce.ToUeRotator());
          this.RingInfo.CurrentArrowStayCellIndex = this.Ft_();
          break;
        case 1:
          this.o8f.forEach(t => {
            t = t?.GetRootItem();
            if (t?.IsUIActiveSelf()) {
              t.SetUIRelativeRotation(this.cce.ToUeRotator());
            }
          });
          for (const a of this.RingInfo.GetQteAreas().keys()) {
            this.GetQteAreaTexture(a).SetUIRelativeRotation(this.cce.ToUeRotator());
          }
          for (const n of this.RingInfo.GetPerfectAreas().keys()) {
            this.GetPerfectAreaTexture(n).SetUIRelativeRotation(this.cce.ToUeRotator());
          }
          this.RingInfo.CurrentArrowStayCellIndex = ArtemisQteDefine_1.QTE_RINGCELLCOUNT - this.Ft_() + 1;
      }
      if (this.PeriodAlphaTotalTime > 0) {
        var r = this.Nt_(this.PeriodAlphaCurrentTime);
        for (const o of this.RingInfo.GetQteAreas().keys()) {
          this.GetQteAreaTexture(o).SetAlpha(r);
        }
        for (const _ of this.RingInfo.GetPerfectAreas().keys()) {
          this.GetPerfectAreaTexture(_).SetAlpha(r);
        }
        this.PeriodAlphaCurrentTime += t;
        if (this.PeriodAlphaCurrentTime >= this.PeriodAlphaTotalTime) {
          this.PeriodAlphaCurrentTime = 0;
        }
      }
    }
  }
  Nt_(t) {
    var i = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId);
    var e = i.HiddenInterval[0];
    var s = i.HiddenInterval[1];
    var i = i.HiddenInterval[2];
    var h = (s - i) / 2;
    if (t < e) {
      return 1;
    } else if (t < e + h) {
      return 1 - (t - e) / h;
    } else if (t < e + h + i) {
      return 0;
    } else if (t < e + s) {
      return (t - e - h - i) / h;
    } else {
      return 1;
    }
  }
  Ft_() {
    var t = Math.abs(this.cce.Yaw) % ArtemisQteDefine_1.QTE_RING_ANGLE;
    return Math.floor(t / ArtemisQteDefine_1.QTE_SINGLECELL_ANGLE) + 1;
  }
  Gt_(t, i, e) {
    let s = this.cce.Yaw;
    if (this.RingInfo?.IsWholeRing) {
      s += t * (i * e);
    } else {
      if ((s += t * (i * e)) < this.YZh) {
        s = this.YZh + 1;
        this.RingInfo.OnArrowDirectionReverse();
      }
      if (s > this.XZh) {
        s = this.XZh;
        this.RingInfo.OnArrowDirectionReverse();
      }
    }
    if (s > 0) {
      s -= ArtemisQteDefine_1.QTE_RING_ANGLE;
    }
    return s % YAW_MAX_ANGLE;
  }
  OnAreaClick(t, i) {
    switch (t) {
      case 0:
        this.Bzf = undefined;
        this.PlayAnim("Miss");
        break;
      case 1:
        this.PeriodAlphaCurrentTime = 0;
        this.Bzf = undefined;
        this.kzf = "Success";
        this.StopTargetPlayingSequence("Perfect");
        this.StopTargetPlayingSequence("Perfect_Light");
        if (i) {
          this.AnyTargetPlayAnim(t, "Success", i.ContinuousIndex, true);
        }
        break;
      case 2:
        this.PeriodAlphaCurrentTime = 0;
        this.Bzf = "Perfect";
        this.kzf = "Perfect_Light";
        this.PlayAnim("Perfect");
        if (i) {
          this.AnyTargetPlayAnim(t, "Perfect_Light", i.ContinuousIndex, false);
        }
    }
  }
  PlayAnim(t) {
    for (const i of this.y7_.values()) {
      i?.PlayAnim(t);
    }
    for (const e of this.Qfl.values()) {
      e?.PlayAnim(t);
    }
  }
  StopTargetPlayingSequence(t) {
    for (const i of this.y7_.values()) {
      i?.StopPlayingSequence(t);
    }
    for (const e of this.Qfl.values()) {
      e?.StopPlayingSequence(t);
    }
  }
  AnyTargetPlayAnim(t, i, e, s) {
    if (t === 2) {
      for (const h of this.Qfl) {
        if (!(this.Qfl.size > 1)) {
          this.Fug(h[1], i, s);
          return;
        }
        if (h[0] !== e) {
          this.Fug(h[1], i, s);
          return;
        }
      }
    } else {
      for (const r of this.y7_) {
        if (!(this.y7_.size > 1)) {
          this.Fug(r[1], i, s);
          return;
        }
        if (r[0] !== e) {
          this.Fug(r[1], i, s);
          return;
        }
      }
    }
  }
  Fug(t, i, e) {
    if (t) {
      if (e) {
        t.PlayAnim(i);
      } else {
        t.PlayLevelSequenceByName(i);
      }
    }
  }
  qzf(t, i) {
    t = (t === 2 ? this.Qfl : this.y7_).get(i);
    if (t && (this.Bzf && t.PlayAnim(this.Bzf), this.kzf)) {
      t.PlayLevelSequenceByName(this.kzf);
      this.kzf = undefined;
    }
  }
  Nqe(t) {
    var i = Math.ceil(t * 100);
    this.GetText(5).SetText(i + "%");
    this.r8f.Yaw = MathUtils_1.MathUtils.Lerp(PROGRESS_START_ANGLE, PROGRESS_END_ANGLE, t);
    this.GetItem(6)?.SetUIRelativeRotation(this.r8f.ToUeRotator());
  }
  mc_(t, i) {
    let e = t;
    if (this.cc_) {
      this.Vbn += i;
      e = PAUSE_TIME < this.Vbn && this.Vbn <= PAUSE_TIME + this.K1t ? (i = (this.Vbn - PAUSE_TIME) / this.K1t, MathUtils_1.MathUtils.Lerp(this.uc_, t, i)) : (this.cc_ = false, t);
    }
    this.hc_.Yaw = MathUtils_1.MathUtils.Lerp(PROGRESS_START_ANGLE, PROGRESS_END_ANGLE, e);
  }
  OnArrowStayAreaUpdate(t) {
    var i = this.GameInfo.GetRingInfo().GetValidAreas();
    if (!(t < 0) && !(t >= i.length)) {
      i = i[t];
      this.XZh = -Math.max(i.StartCellIndex - 1, 0) * ArtemisQteDefine_1.QTE_SINGLECELL_ANGLE;
      this.YZh = -i.EndCellIndex * ArtemisQteDefine_1.QTE_SINGLECELL_ANGLE;
      if (this.YZh >= this.XZh) {
        this.YZh -= 360;
      }
      switch (i.ArrowDirection) {
        case 0:
          this.cce.Yaw = this.XZh;
          break;
        case 1:
          this.cce.Yaw = this.YZh;
      }
      this.GetItem(7)?.SetUIRelativeRotation(this.cce.ToUeRotator());
    }
  }
  dc_() {
    var t = this.GameInfo.CurrentScore;
    var i = (ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId)).MaxScore;
    return MathUtils_1.MathUtils.Clamp(t / i, 0, 1);
  }
  StartAnimProgress() {
    this.uc_ = this.dc_();
    this.Vbn = 0;
    this.cc_ = true;
  }
  EnterNextRound() {
    this.uc_ = 0;
  }
  Yt_(t) {
    let i = 3;
    return i = t.length === 2 ? this.rvl(t[0], t[1]) : i;
  }
  rvl(t, i) {
    return Math.min(i, Math.floor(MathUtils_1.MathUtils.GetRandomRange(t, i + 1)));
  }
  ResetArea(t, i) {
    switch (i) {
      case 1:
        this.RingInfo.RemoveQteArea(t);
        var e = this.y7_.get(t);
        if (e) {
          e.SetUiActive(false);
          this.jfl.push(e);
          this.y7_.delete(t);
        }
        break;
      case 2:
        this.RingInfo.RemovePerfectArea(t);
        e = this.Qfl.get(t);
        if (e) {
          e.SetUiActive(false);
          this.jfl.push(e);
          this.Qfl.delete(t);
        }
    }
  }
  ResetAreaInLink(t, i) {
    switch (i) {
      case 1:
        this.ResetArea(t, 1);
        if (this.Qfl.has(t)) {
          this.ResetArea(t, 2);
        }
        break;
      case 2:
        this.ResetArea(t, 2);
        this.ResetArea(t, 1);
    }
  }
  ResetAllArea() {
    for (const t of this.y7_.keys()) {
      this.ResetArea(t, 1);
    }
    for (const i of this.Qfl.keys()) {
      this.ResetArea(i, 2);
    }
  }
  async zt_(t, i, e, s) {
    let h = this.jfl.pop();
    if (!h) {
      h = new ArtemisQteRingSingleItem_1.ArtemisQteRingSingleItem();
      n = this.GetItem(3);
      n = LguiUtil_1.LguiUtil.CopyItem(n, this.GetItem(8));
      await h.CreateByActorAsync(n.GetOwner());
    }
    var r = (0, ArtemisQteDefine_1.fixedCellIndex)(e);
    var a = (0, ArtemisQteDefine_1.fixedCellIndex)(r + s - 1);
    var n = (r - 1) * ArtemisQteDefine_1.QTE_SINGLECELL_ANGLE;
    h.InitItem();
    h.SetRotation(-n);
    h.SetFill(s / ArtemisQteDefine_1.QTE_RINGCELLCOUNT);
    h.SetType(i);
    switch (i) {
      case 1:
        this.RingInfo.AddQteArea(t, r, a);
        this.y7_.set(t, h);
        break;
      case 2:
        this.RingInfo.AddPerfectArea(t, r, a);
        this.Qfl.set(t, h);
        h.GetRootItem().SetAsLastHierarchy();
    }
    h.SetUiActive(true);
  }
  async S7_(i, e, s) {
    await this.zt_(i, 1, e, s);
    this.qzf(1, i);
    var h = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId);
    if (this.rvl(0, 100) <= this.GameInfo.PerfectAppearRate) {
      var s = Math.min(s, h.PerfectSize);
      var h = e;
      var r = (e + s) % ArtemisQteDefine_1.QTE_RINGCELLCOUNT;
      let t = e;
      t = h <= r ? this.rvl(h, r - s + 1) : this.rvl(h, h + s - 1 - s + 1) % ArtemisQteDefine_1.QTE_RINGCELLCOUNT;
      await this.zt_(i, 2, t, s);
      this.qzf(2, i);
    }
  }
  SpawnAreaAtValidArea(t, i) {
    var e = i.StartCellIndex;
    var i = i.EndCellIndex;
    var s = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId);
    var h = (0, ArtemisQteDefine_1.calculateCellSize)(e, i);
    var s = this.Yt_(s.RandomArea);
    if (h <= s) {
      this.S7_(t, e, h);
    } else if (e <= i) {
      i = this.rvl(e, i - s + 1);
      this.S7_(t, i, s);
    } else {
      i = this.rvl(e, e + h - 1 - s + 1) % ArtemisQteDefine_1.QTE_RINGCELLCOUNT;
      this.S7_(t, i, s);
    }
  }
  Jt_() {
    var t = this.RingInfo.GetQteAreas().get(0)?.StartCellIndex ?? 0;
    var i = ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId);
    this.ResetAllArea();
    var e = ArtemisQteDefine_1.QTE_RINGCELLCOUNT / i.MultiBoxGroup;
    if (Number.isInteger(e)) {
      var s;
      var h = i.MultiBoxGroup;
      var r = this.rvl(1, ArtemisQteDefine_1.QTE_RINGCELLCOUNT);
      if (h === 1 && t) {
        s = this.Yt_(i.RandomArea);
        t = (t + ArtemisQteDefine_1.QTE_RINGCELLCOUNT / 2) % ArtemisQteDefine_1.QTE_RINGCELLCOUNT;
        this.S7_(0, t, s);
      } else {
        for (let t = 0; t < h; t++) {
          var a = this.Yt_(i.RandomArea);
          var n = t * e + r + 1;
          this.S7_(t, n, a);
        }
      }
    }
  }
  Zt_() {
    this.ResetAllArea();
    var i = this.RingInfo?.GetValidAreas();
    if (i) {
      for (let t = 0; t < i.length; t++) {
        this.SpawnAreaAtValidArea(t, i[t]);
      }
    }
  }
  InitAllQteAreas() {
    if (this.RingInfo?.IsWholeRing) {
      this.Jt_();
    } else {
      this.Zt_();
    }
  }
  SpawnContinuousArea(t, i = 1) {
    if (this.RingInfo?.IsWholeRing) {
      switch ((ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId)).RefreshType) {
        case 0:
          break;
        case 1:
          this.Jt_();
          break;
        case 2:
          this.ResetAreaInLink(t, i);
          if (this.RingInfo.GetQteAreas().size === 0) {
            this.Jt_();
          }
      }
    } else {
      var e = this.RingInfo.GetValidAreas();
      this.ResetAreaInLink(t, i);
      this.SpawnAreaAtValidArea(t, e[t]);
    }
  }
  GetQteAreaTexture(t) {
    return this.y7_.get(t).GetRootItem();
  }
  GetPerfectAreaTexture(t) {
    return this.Qfl.get(t).GetRootItem();
  }
  async SpawnBgArea() {
    const e = this.GetItem(3);
    if (this.RingInfo.IsWholeRing) {
      await (h = new ArtemisQteRingBgSingleItem_1.ArtemisQteRingBgSingleItem(1, ArtemisQteDefine_1.QTE_RINGCELLCOUNT, true)).CreateThenShowByActorAsync(e.GetOwner());
      this.o8f.push(h);
      h?.SetType(0);
      this.RingInfo.AddValidArea(1, ArtemisQteDefine_1.QTE_RINGCELLCOUNT);
    } else {
      var i;
      var s = [];
      for (const o of (ConfigManager_1.ConfigManager.ArtemisActivityConfig?.GetArtemisQteConfigById(this.GamePlayId)).InvalidArea) {
        if (Array.isArray(o)) {
          if (i = o) {
            s.push([i[0], i[1]]);
          }
        } else if (i = o) {
          s.push([i.ArrayInt[0], i.ArrayInt[1]]);
        }
      }
      s.sort((t, i) => t[0] - i[0]);
      var h = s[s.length - 1][1];
      let t = (0, ArtemisQteDefine_1.fixedCellIndex)(h + 1);
      for (const _ of s) {
        var r = _[0];
        var a = _[1];
        this.RingInfo.AddValidArea(t, (0, ArtemisQteDefine_1.fixedCellIndex)(r - 1));
        t = (0, ArtemisQteDefine_1.fixedCellIndex)(a + 1);
      }
      h = this.RingInfo.GetValidAreas();
      const n = [];
      h.forEach(t => {
        var i = t.StartCellIndex;
        var t = t.EndCellIndex;
        var i = new ArtemisQteRingBgSingleItem_1.ArtemisQteRingBgSingleItem(i, t, false);
        var t = LguiUtil_1.LguiUtil.CopyItem(e, this.GetItem(8));
        n.push(i.CreateThenShowByActorAsync(t.GetOwner()));
        this.o8f.push(i);
      });
      await Promise.all(n);
    }
  }
  SetCurrentPlayingSequenceName(t) {
    this.Bzf = t;
  }
}
exports.ArtemisQteProgressItem = ArtemisQteProgressItem;
//# sourceMappingURL=ArtemisQteProgressItem.js.map