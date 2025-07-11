"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQteRingQteItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../../Module/Util/LguiUtil");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const FishingQteDefine_1 = require("../../../FishingQteDefine");
class FishingQteRingQteItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i) {
    super();
    this.GameInfo = t;
    this.RingInfo = e;
    this.RingConfig = i;
    this.$t_ = undefined;
    this.y7_ = new Map();
    this.Qfl = new Map();
    this.jfl = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.$t_ = this.GetItem(0);
    this.$t_.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.$t_ = undefined;
    this.y7_.clear();
    this.Qfl.clear();
    this.jfl.length = 0;
  }
  Yt_(t) {
    let e = 3;
    return e = t.length === 2 ? this.rvl(t[0], t[1]) : e;
  }
  rvl(t, e) {
    return Math.min(e, Math.floor(MathUtils_1.MathUtils.GetRandomRange(t, e + 1)));
  }
  ResetArea(t, e) {
    switch (e) {
      case 1:
        this.RingInfo.RemoveQteArea(t);
        var i = this.y7_.get(t);
        if (i) {
          i.SetUiActive(false);
          this.jfl.push(i);
          this.y7_.delete(t);
        }
        break;
      case 2:
        this.RingInfo.RemovePerfectArea(t);
        i = this.Qfl.get(t);
        if (i) {
          i.SetUiActive(false);
          this.jfl.push(i);
          this.Qfl.delete(t);
        }
    }
  }
  ResetAreaInLink(t, e) {
    switch (e) {
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
    for (const e of this.Qfl.keys()) {
      this.ResetArea(e, 2);
    }
  }
  async zt_(t, e, i, s) {
    let h = this.jfl.pop();
    if (!h) {
      h = new FishingQteRingQteSingleItem();
      n = LguiUtil_1.LguiUtil.CopyItem(this.$t_, this.RootItem);
      await h.CreateByActorAsync(n.GetOwner());
    }
    var r = (0, FishingQteDefine_1.fixedCellIndex)(i);
    var a = (0, FishingQteDefine_1.fixedCellIndex)(r + s - 1);
    var n = (r - 1) * FishingQteDefine_1.FISHINGQTE_SINGLECELL_ANGLE;
    h.SetRotation(-n);
    h.SetFill(s / FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT);
    h.SetType(e);
    switch (e) {
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
  async S7_(e, i, s) {
    await this.zt_(e, 1, i, s);
    if (this.rvl(0, 100) <= this.GameInfo.PerfectAppearRate) {
      var s = Math.min(s, this.RingConfig.PerfectSize);
      var h = i;
      var r = (i + s) % FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT;
      let t = i;
      t = h <= r ? this.rvl(h, r - s + 1) : this.rvl(h, h + s - 1 - s + 1) % FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT;
      await this.zt_(e, 2, t, s);
    }
  }
  SpawnAreaAtValidArea(t, e) {
    var i = e.StartCellIndex;
    var e = e.EndCellIndex;
    var s = (0, FishingQteDefine_1.calculateCellSize)(i, e);
    var h = this.Yt_(this.RingConfig.RandomArea);
    if (s <= h) {
      this.S7_(t, i, s);
    } else if (i <= e) {
      e = this.rvl(i, e - h + 1);
      this.S7_(t, e, h);
    } else {
      e = this.rvl(i, i + s - 1 - h + 1) % FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT;
      this.S7_(t, e, h);
    }
  }
  Jt_() {
    var t = this.RingInfo.GetQteAreas().get(0)?.StartCellIndex ?? 0;
    this.ResetAllArea();
    var e = FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT / this.RingConfig.MultiBoxGroup;
    if (Number.isInteger(e)) {
      var i;
      var s = this.RingConfig.MultiBoxGroup;
      var h = this.rvl(1, FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT);
      if (s === 1 && t) {
        i = this.Yt_(this.RingConfig.RandomArea);
        t = (t + FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT / 2) % FishingQteDefine_1.FISHINGQTE_RINGCELLCOUNT;
        this.S7_(0, t, i);
      } else {
        for (let t = 0; t < s; t++) {
          var r = this.Yt_(this.RingConfig.RandomArea);
          var a = t * e + h + 1;
          this.S7_(t, a, r);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 37, "[FishingQte]格子扩展配置有误：不可被等分", ["配置组数", this.RingConfig.MultiBoxGroup]);
    }
  }
  Zt_() {
    this.ResetAllArea();
    var e = this.RingInfo.GetValidAreas();
    for (let t = 0; t < e.length; t++) {
      this.SpawnAreaAtValidArea(t, e[t]);
    }
  }
  InitAllQteAreas() {
    if (this.RingInfo.IsWholeRing) {
      this.Jt_();
    } else {
      this.Zt_();
    }
  }
  SpawnContinuousArea(t, e = 1) {
    if (this.RingInfo.IsWholeRing) {
      switch (this.RingConfig.RefreshType) {
        case 0:
          break;
        case 1:
          this.Jt_();
          break;
        case 2:
          this.ResetAreaInLink(t, e);
          if (this.RingInfo.GetQteAreas().size === 0) {
            this.Jt_();
          }
      }
    } else {
      var i = this.RingInfo.GetValidAreas();
      this.ResetAreaInLink(t, e);
      this.SpawnAreaAtValidArea(t, i[t]);
    }
  }
  GetQteAreaTexture(t) {
    return this.y7_.get(t).GetRootItem();
  }
  GetPerfectAreaTexture(t) {
    return this.Qfl.get(t).GetRootItem();
  }
  PlayAnim(t) {
    switch (t) {
      case "Fail":
        for (const e of this.y7_.values()) {
          e.PlayAnim(t);
        }
        for (const i of this.Qfl.values()) {
          i.PlayAnim(t);
        }
        break;
      case "Success":
        for (const s of this.y7_.values()) {
          s.PlayAnim(t);
        }
        break;
      case "PerfectQte":
        for (const h of this.Qfl.values()) {
          h.PlayAnim(t);
        }
    }
  }
}
exports.FishingQteRingQteItem = FishingQteRingQteItem;
class FishingQteRingQteSingleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.awl = new UE.FName("Progress");
    this.LevelSequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UITexture]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
    this.awl = undefined;
  }
  Cc_() {
    var t = [];
    t.push(this.GetTexture(0));
    t.push(this.GetTexture(1));
    t.push(this.GetTexture(2));
    t.push(this.GetTexture(3));
    t.push(this.GetTexture(4));
    return t;
  }
  SetRotation(t) {
    for (const e of this.Cc_()) {
      e.SetUIRelativeRotation(Rotator_1.Rotator.Create(0, t, 0).ToUeRotator());
    }
  }
  SetType(t) {
    switch (t) {
      case 1:
        this.GetTexture(0).SetUIActive(true);
        this.GetTexture(3).SetUIActive(false);
        break;
      case 2:
        this.GetTexture(0).SetUIActive(false);
        this.GetTexture(3).SetUIActive(true);
    }
  }
  SetFill(t) {
    for (const e of this.Cc_()) {
      e.SetFillAmount(t);
      e.SetCustomMaterialScalarParameter(this.awl, t);
    }
  }
  PlayAnim(t) {
    if (this.LevelSequencePlayer.GetCurrentSequence() === t) {
      this.LevelSequencePlayer.ReplaySequenceByKey(t);
    } else {
      this.LevelSequencePlayer.StopPlayingSequence(false, true);
      this.LevelSequencePlayer.PlayLevelSequenceByName(t, false);
    }
  }
}
//# sourceMappingURL=FishingQteRingQteItem.js.map