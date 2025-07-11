"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const TutorialDefine_1 = require("./TutorialDefine");
class TutorialModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RewardInfo = undefined;
    this.RewardList = [];
    this.CurrentExclusiveType = 0;
    this.bRo = new Map();
    this.qRo = new Map();
  }
  OnInit() {
    for (const t in TutorialDefine_1.ETutorialType) {
      var e = Number(t);
      if (!isNaN(e)) {
        this.bRo.set(e, new Map());
      }
    }
    return true;
  }
  InitTutorialTotalData() {
    for (const r of Array.from(this.qRo.values())) {
      var e = new TutorialDefine_1.TutorialSaveData();
      e.TimeStamp = r.TimeStamp;
      e.TutorialId = r.TutorialId;
      e.HasRedDot = r.HasRedDot;
      var t = e.TutorialData.TutorialType;
      var i = e.TutorialData.Id;
      this.bRo.get(t).set(i, e);
      this.bRo.get(TutorialDefine_1.ETutorialType.All).set(i, e);
      this.qRo.set(i, e);
    }
  }
  OnClear() {
    for (const e of this.bRo.values()) {
      e.clear();
    }
    this.bRo.clear();
    return true;
  }
  InitUnlockTutorials(e) {
    for (const r of e) {
      var t = new TutorialDefine_1.TutorialSaveData();
      t.TimeStamp = r.aws;
      t.TutorialId = r.s5n;
      t.HasRedDot = !r.nOs;
      var i = t.TutorialData.TutorialType;
      if (Object.values(TutorialDefine_1.ETutorialType).includes(i)) {
        if (!this.bRo.get(i).has(t.TutorialId)) {
          this.bRo.get(i).set(t.TutorialId, t);
          this.qRo.set(t.TutorialId, t);
        }
        this.InvokeTutorialRedDot(t);
      }
    }
  }
  InitDefaultUnlockTutorials() {
    var e;
    var t;
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllTutorial()) {
      if (i.DefaultUnlock && ((e = new TutorialDefine_1.TutorialSaveData()).TimeStamp = 0, e.TutorialId = i.Id, e.HasRedDot = false, t = i.TutorialType, Object.values(TutorialDefine_1.ETutorialType).includes(t))) {
        this.bRo.get(t).set(e.TutorialId, e);
        this.qRo.set(e.TutorialId, e);
      }
    }
  }
  UpdateUnlockTutorials(e) {
    var t = new TutorialDefine_1.TutorialSaveData();
    t.TimeStamp = e.aws;
    t.TutorialId = e.s5n;
    t.HasRedDot = !e.nOs;
    var e = t.TutorialData.TutorialType;
    if (Object.values(TutorialDefine_1.ETutorialType).includes(e) && !this.bRo.get(e).has(t.TutorialId)) {
      this.bRo.get(e).set(t.TutorialId, t);
      this.bRo.get(TutorialDefine_1.ETutorialType.All).set(t.TutorialId, t);
      this.qRo.set(t.TutorialId, t);
      this.InvokeUpdateTutorials();
      this.InvokeTutorialRedDot(t);
    }
  }
  GetUnlockedTutorialDataByType(o, e = 0) {
    var t;
    var i;
    var r;
    var a = [];
    for (const s of this.bRo.get(o).values()) {
      if (!s.IsExcludedFromWiki) {
        if (s.TutorialData?.ExclusiveType === e) {
          t = {
            IsTypeTitle: false,
            TextId: s.TutorialData.GroupName,
            SavedData: s,
            OwnerType: o
          };
          if (s.HasRedDot) {
            this.InvokeTutorialRedDot(s);
          }
          a.push(t);
        }
      }
    }
    a.sort((e, t) => {
      var i;
      var r;
      if (e.SavedData.HasRedDot && !t.SavedData.HasRedDot) {
        return -1;
      } else if (!e.SavedData.HasRedDot && t.SavedData.HasRedDot) {
        return 1;
      } else if (e.SavedData.HasRedDot && t.SavedData.HasRedDot || o === TutorialDefine_1.ETutorialType.All) {
        return t.SavedData.TimeStamp - e.SavedData.TimeStamp;
      } else {
        i = e.SavedData.TutorialData;
        r = t.SavedData.TutorialData;
        if (e.SavedData.TimeStamp !== t.SavedData.TimeStamp) {
          return e.SavedData.TimeStamp - t.SavedData.TimeStamp;
        } else if (i.TutorialOrder !== r.TutorialOrder) {
          return i.TutorialOrder - r.TutorialOrder;
        } else {
          return i.Id - r.Id;
        }
      }
    });
    if (o !== TutorialDefine_1.ETutorialType.All) {
      return a;
    }
    let n = a.length;
    for ([i, r] of a.entries()) {
      if (!r.SavedData.HasRedDot) {
        n = i + TutorialDefine_1.TutorialUtils.MaxLatestTutorial;
        break;
      }
    }
    return a.slice(0, n);
  }
  RemoveRedDotTutorialId(e) {
    if (this.qRo.has(e)) {
      (e = this.qRo.get(e)).HasRedDot = false;
      this.InvokeTutorialRedDot(e);
    }
  }
  RedDotCheckIsNewTutorial(e) {
    return this.qRo.get(e)?.HasRedDot ?? false;
  }
  InvokeUpdateTutorials() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTutorialUpdate);
  }
  InvokeTutorialRedDot(e) {
    var t = e ? e.TutorialId : 0;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotNewTutorial, t);
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotNewTutorialType, TutorialDefine_1.ETutorialType.All);
    }
  }
  RedDotCheckIsNewTutorialType(e) {
    if (this.bRo.has(e)) {
      for (const t of this.bRo.get(e).values()) {
        if (t.TutorialData?.ExclusiveType === this.CurrentExclusiveType && t.HasRedDot && !t.IsExcludedFromWiki) {
          return true;
        }
      }
    }
    return false;
  }
  MakeSearchList(e, t) {
    let i = undefined;
    var r = [];
    try {
      i = new RegExp(e, "i");
    } catch {
      return {
        ItemData: r,
        HasTutorial: false
      };
    }
    let o = false;
    for (const s of Array.from(this.bRo.keys()).sort(e => e === t ? -1 : 1)) {
      if (s !== TutorialDefine_1.ETutorialType.All) {
        var a;
        var n = [];
        for (const u of this.bRo.get(s).values()) {
          if (!u.IsExcludedFromWiki && !((a = u.GetTutorialTitle()).search(i) < 0)) {
            a = {
              IsTypeTitle: false,
              TextId: u.TutorialData.GroupName,
              SavedData: u,
              Text: a.replace(e, TutorialDefine_1.TutorialUtils.AddSearchHighlight(e))
            };
            o = true;
            n.push(a);
          }
        }
        if (t === TutorialDefine_1.ETutorialType.All) {
          r.push(...n);
        } else if (n.length) {
          r.push({
            IsTypeTitle: true,
            TextId: TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(s)
          });
          r.push(...n);
        }
      }
    }
    return {
      ItemData: r,
      HasTutorial: o
    };
  }
  GetSavedDataById(e) {
    return this.qRo.get(e);
  }
}
exports.TutorialModel = TutorialModel;
//# sourceMappingURL=TutorialModel.js.map