"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardData = undefined;
class RewardData {
  constructor(t, e) {
    this.G0i = undefined;
    this.N0i = undefined;
    this.O0i = new Map();
    this.k0i = new Map();
    if (t) {
      this.G0i = t;
    }
    this.N0i = e || {
      ItemList: []
    };
  }
  SetItemList(t) {
    if (t) {
      for (const i of this.N0i.ItemList = t) {
        var e = i.UniqueId;
        if (e !== undefined && e > 0) {
          this.k0i.set(e, i);
        } else {
          e = i.ConfigId;
          if (e !== undefined && e > 0) {
            var s = this.O0i.get(e);
            if (!s) {
              this.O0i.set(e, i);
              return;
            }
            s.Count += i.Count;
          }
        }
      }
    }
  }
  AddItem(t) {
    let e = this.GetItemList();
    e = e || [];
    var s;
    var i = t.UniqueId;
    if (i !== undefined && i > 0) {
      e.push(t);
      this.k0i.set(i, t);
    } else if ((i = t.ConfigId) !== undefined && i > 0) {
      if (s = this.O0i.get(i)) {
        s.Count += t.Count;
      } else {
        e.push(t);
        this.O0i.set(i, t);
      }
    }
  }
  AddItemList(t) {
    if (t) {
      for (const e of t) {
        this.AddItem(e);
      }
    }
  }
  SetProgressQueue(t) {
    this.N0i.ProgressQueue = t;
  }
  SetExploreRecordInfo(t) {
    this.N0i.ExploreRecordInfo = t;
  }
  SetExploreBarDataList(t) {
    this.N0i.ExploreBarDataList = t;
  }
  SetButtonInfoList(t) {
    this.N0i.ButtonInfoList = t;
  }
  SetExploreFriendDataList(t) {
    this.N0i.ExploreFriendDataList = t;
  }
  SetTargetReached(t) {
    this.N0i.TargetReached = t;
  }
  SetHalfAreaData(t) {
    this.N0i.ScoreHalfArea = t;
  }
  SetStateToggle(t) {
    this.N0i.StateToggle = t;
  }
  SetAccumulatedScoreData(t) {
    this.N0i.AccumulatedScoreData = t;
  }
  SetBabelTowerSuccessData(t) {
    this.N0i.BabelTowerSuccessData = t;
  }
  SetDangoAbyssSuccessData(t) {
    this.N0i.DangoAbyssSuccessData = t;
  }
  SetHonamiTowerSuccessData(t) {
    this.N0i.HonamiTowerSuccessData = t;
  }
  SetScoreReached(t) {
    this.N0i.ScoreReached = t;
  }
  SetRewardInfo(t) {
    this.G0i = t;
  }
  GetRewardInfo() {
    return this.G0i;
  }
  GetExtendRewardInfo() {
    return this.N0i;
  }
  GetItemList() {
    return this.N0i.ItemList;
  }
  GetItemByConfigId(t) {
    return this.O0i.get(t);
  }
  GetItemByUniqueId(t) {
    return this.k0i.get(t);
  }
}
exports.RewardData = RewardData;
//# sourceMappingURL=RewardData.js.map