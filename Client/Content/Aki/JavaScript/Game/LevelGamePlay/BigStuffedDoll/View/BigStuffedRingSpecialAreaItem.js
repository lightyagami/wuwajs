"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedRingSpecialAreaItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Module/Util/LguiUtil");
const BigStuffedDefine_1 = require("../BigStuffedDefine");
const BigStuffedRingSubItem_1 = require("./BigStuffedRingSubItem");
class BigStuffedRingSpecialAreaItem extends BigStuffedRingSubItem_1.BigStuffedRingSubItem {
  constructor(t, i, e) {
    super(t, i);
    this.Wfl = new Map();
    this.Qfl = new Map();
    this.Kfl = new Map();
    this.awl = new UE.FName("Progress");
    this.$fl = undefined;
    this.jfl = [];
    this.Ebl = undefined;
    this.Type = 2;
    this.Ebl = e;
  }
  OnStart() {
    super.OnStart();
    this.TextureRing.SetUIActive(false);
    this.SpawnAllContinuousArea();
  }
  OnBeforeDestroy() {
    this.Wfl.clear();
    this.Qfl.clear();
    this.Kfl.clear();
    this.jfl.length = 0;
    super.OnBeforeDestroy();
  }
  SpawnAllContinuousArea() {
    this.Xfl();
    this.Tbl();
    this.Lbl();
    this.Ubl();
  }
  SpawnSingleContinuousArea(t) {
    this.Abl(t);
    this.Dbl(t, this.RingConfig.MultiBoxGroup !== 1);
    this.Rbl(t);
    this.Pbl(t);
  }
  Tbl() {
    var i = this.Ebl.GetValidAreas();
    this.Ebl.GetGoodAreas().clear();
    var t = this.RingConfig.InvalidBox.length === 0;
    if (t) {
      for (let t = 0; t < this.RingConfig.MultiBoxGroup; t++) {
        this.Dbl(t, this.RingConfig.MultiBoxGroup !== 1);
      }
    } else {
      for (let t = 0; t < i.length; t++) {
        this.Dbl(t, false);
      }
    }
  }
  Dbl(t, i) {
    this.Ebl.RemoveGoodArea(t);
    var e;
    var s = this.Ebl.GetValidAreas();
    if (this.RingConfig.InvalidBox.length === 0) {
      if (i) {
        i = BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT / this.RingConfig.MultiBoxGroup;
        if (Number.isInteger(i)) {
          i = this.evl(this.RingConfig.RandomBox);
          e = BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT / this.RingConfig.MultiBoxGroup;
          e = this.rvl(t * e + t + 1, t * e - i);
          this.tvl(t, 0, e, i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]格子扩展配置有误：不可被等分", ["配置组数", this.RingConfig.MultiBoxGroup]);
        }
      } else {
        if (this.$fl) {
          e = (this.$fl.StartCellIndex + BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT / 2) % BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT;
          i = this.evl(this.RingConfig.RandomBox);
          this.tvl(t, 0, e, i);
        } else {
          this.xbl(t, s[t]);
        }
        e = this.Ebl.GetGoodArea(t);
        this.$fl = new BigStuffedDefine_1.ContinuousArea(t, e.StartCellIndex, e.EndCellIndex, e.ArrowDirection);
      }
    } else if (t < s.length) {
      this.xbl(t, s[t]);
    }
  }
  xbl(t, i) {
    var e = i.StartCellIndex;
    var i = i.EndCellIndex;
    var s = (0, BigStuffedDefine_1.calculateCellSize)(e, i);
    var h = this.evl(this.RingConfig.RandomBox);
    if (s < h) {
      this.tvl(t, 0, e, s);
    } else if (e <= i) {
      i = this.rvl(e, i - h + 1);
      this.tvl(t, 0, i, h);
    } else {
      i = this.rvl(e, e + s - 1 - h + 1) % BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT;
      this.tvl(t, 0, i, h);
    }
  }
  Lbl() {
    var t;
    this.Ebl.GetPerfectAreas().clear();
    if (this.RingConfig.PerfectBox !== 0) {
      for ([t] of this.Ebl.GetGoodAreas()) {
        this.Rbl(t);
      }
    }
  }
  Rbl(t) {
    this.Ebl.RemovePerfectArea(t);
    var i;
    var e;
    var s;
    var h = this.RingConfig.PerfectBox;
    if (h !== 0) {
      if (i = this.Ebl.GetGoodArea(t)) {
        s = i.StartCellIndex;
        e = i.EndCellIndex;
        e = (0, BigStuffedDefine_1.calculateCellSize)(s, e);
        s = this.rvl(s, s + e - h) % BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT;
        if (this.wbl()) {
          this.tvl(i.ContinuousIndex, 2, s, h);
        } else {
          this.tvl(i.ContinuousIndex, 1, s, h);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]生成完美格子错误：找不到连续区域", ["连续区域索引", t]);
      }
    }
  }
  wbl() {
    var t;
    var i;
    var e = ModelManager_1.ModelManager.BigStuffedDollModel.CurrentScore;
    let s = 0;
    for ([t, i] of this.RingConfig.BonusRate) {
      if (!(e >= t)) {
        break;
      }
      s = i;
    }
    return s !== 0 && this.rvl(0, 100) <= s;
  }
  Ubl() {
    for (var [, t] of this.Qfl) {
      t.SetAsLastHierarchy();
    }
    for (var [, i] of this.Kfl) {
      i.SetAsLastHierarchy();
    }
  }
  Pbl(t) {
    this.Qfl.get(t)?.SetAsLastHierarchy();
    this.Kfl.get(t)?.SetAsLastHierarchy();
  }
  tvl(t, i, e, s) {
    let h = this.jfl.pop();
    if (!h) {
      r = LguiUtil_1.LguiUtil.DuplicateActor(this.TextureRing.GetOwner(), this.RootItem);
      h = r.GetComponentByClass(UE.UITexture.StaticClass());
    }
    var r = (e - 1) * BigStuffedDefine_1.SINGLECELL_ANGLE;
    h.SetUIRelativeRotation(Rotator_1.Rotator.Create(0, -r, 0).ToUeRotator());
    h.SetFillAmount(s / BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT);
    h.SetCustomMaterialScalarParameter(this.awl, s / BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT);
    var a = (e + s - 1) % BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT;
    switch (i) {
      case 0:
        this.Ebl.AddGoodArea(t, e, a);
        this.Wfl.set(t, h);
        h.SetColor(UE.Color.FromHex("#ECEACF"));
        break;
      case 1:
        this.Ebl.AddPerfectArea(t, e, a);
        this.Qfl.set(t, h);
        h.SetColor(UE.Color.FromHex("#FFBF3E"));
        break;
      case 2:
        this.Ebl.AddBonusArea(t, e, a);
        this.Kfl.set(t, h);
        h.SetColor(UE.Color.FromHex("#FC6F07"));
    }
    h.SetUIActive(true);
  }
  evl(t) {
    let i = 3;
    return i = t.length === 2 ? this.rvl(t[0], t[1]) : i;
  }
  rvl(t, i) {
    return Math.min(i, Math.floor(MathUtils_1.MathUtils.GetRandomRange(t, i + 1)));
  }
  Xfl() {
    for (var [, t] of this.Wfl) {
      this.jfl.push(t);
      t.SetUIActive(false);
    }
    this.Wfl.clear();
    for (var [, i] of this.Qfl) {
      this.jfl.push(i);
      i.SetUIActive(false);
    }
    this.Qfl.clear();
    for (var [, e] of this.Kfl) {
      this.jfl.push(e);
      e.SetUIActive(false);
    }
    this.Kfl.clear();
  }
  Abl(t) {
    var i = this.Wfl.get(t);
    if (i) {
      this.jfl.push(i);
      i.SetUIActive(false);
      this.Wfl.delete(t);
    }
    var i = this.Qfl.get(t);
    if (i) {
      this.jfl.push(i);
      i.SetUIActive(false);
      this.Wfl.delete(t);
    }
    var i = this.Kfl.get(t);
    if (i) {
      this.jfl.push(i);
      i.SetUIActive(false);
      this.Wfl.delete(t);
    }
  }
}
exports.BigStuffedRingSpecialAreaItem = BigStuffedRingSpecialAreaItem;
//# sourceMappingURL=BigStuffedRingSpecialAreaItem.js.map