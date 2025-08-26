"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const AchievementData_1 = require("./AchievementData");
const RECENT_FINISHED_LIST_LENGTH = 5;
const showFunctionList = [1];
class AchievementModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurrentSelectCategory = undefined;
    this.CurrentSelectGroup = undefined;
    this.CurrentSelectAchievementId = 0;
    this.AchievementSearchState = false;
    this.CurrentSearchText = "";
    this.CurrentFinishAchievementArray = new Array();
    this.CurrentCacheSearchData = undefined;
    this.Mbe = new Map();
    this.Ebe = new Map();
    this.Sbe = new Array();
    this.ybe = new Map();
    this.Ibe = new Map();
    this.Tbe = new Map();
    this.Lbe = new Array();
    this.Dbe = new Array();
    this.Eth = 0;
    this.Ith = 0;
    this.Rbe = (e, t) => t.GetFinishTime() - e.GetFinishTime();
  }
  Ube(e) {
    const t = new Array();
    ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupAchievementList(e).forEach(e => {
      e = this.GetAchievementData(e.Id);
      t.push(e);
    });
    this.Ebe.set(e, t);
  }
  Abe(e) {
    var t = ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementCategoryGroups(e);
    const i = new Array();
    t.forEach(e => {
      e = this.GetAchievementGroupData(e.Id);
      i.push(e);
    });
    this.ybe.set(e, i);
  }
  Pbe() {
    this.Sbe = new Array();
    ConfigManager_1.ConfigManager.AchievementConfig.GetAllAchievementCategory().forEach(e => {
      var t = new AchievementData_1.AchievementCategoryData(e.Id);
      if (showFunctionList.includes(e.FunctionType)) {
        this.Sbe.push(t);
      }
    });
  }
  xbe(e) {
    if (!this.Lbe.includes(e)) {
      this.Lbe.push(e);
    }
  }
  wbe(e) {
    if (!this.Dbe.includes(e)) {
      this.Dbe.push(e);
    }
  }
  Bbe(e) {
    var t = this.Lbe.indexOf(e);
    if (t >= 0) {
      this.Lbe.splice(t, 1);
    }
    var t = this.Dbe.indexOf(e);
    if (t >= 0) {
      this.Dbe.splice(t, 1);
    }
  }
  bbe() {
    this.Lbe.sort(this.Rbe);
  }
  qbe() {
    this.Dbe.sort(this.Rbe);
  }
  Gbe(e) {
    var t;
    var i = new AchievementData_1.AchievementData(e);
    if (!i.IfSingleAchievement()) {
      if ((t = i.GetNextLink()) > 0) {
        this.GetAchievementData(t).SetLastLink(e);
      }
    }
    this.Ibe.set(e, i);
  }
  Nbe(e) {
    var t = new AchievementData_1.AchievementGroupData(e);
    this.Tbe.set(e, t);
  }
  PhraseBaseData(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Achievement", 27, "Achievement PhraseBaseData response");
    }
    this.Lbe = new Array();
    this.Dbe = new Array();
    this.Ibe.clear();
    this.Ebe.clear();
    e.hvs.forEach(e => {
      this.GetAchievementGroupData(e.svs.s5n).Phrase(e.svs);
      e.avs.forEach(e => {
        var t = this.GetAchievementData(e.s5n);
        t.Phrase(e);
        if (t.GetFinishState() === 1) {
          this.xbe(t);
        } else if (t.GetFinishState() === 2) {
          this.wbe(t);
        }
      });
    });
    this.Eth = e.oS_;
    this.Ith = e.nS_;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAchievementDataNotify);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAchievementRedPoint);
  }
  PhraseUpdateData(e) {
    for (const t of e.avs) {
      this.GetAchievementData(t.s5n).Phrase(t);
    }
  }
  OnAchievementProgressNotify(e) {
    var t = this.GetAchievementData(e.s5n);
    var i = t.GetFinishState();
    t.Phrase(e);
    var e = t.GetFinishState();
    if (e !== i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Achievement", 27, "OnAchievementGroupProgressNotify", ["id", t.GetId()], ["currentState", e]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAchievementRedPoint);
    }
    this.Bbe(t);
    if (t.GetFinishState() === 1) {
      this.xbe(t);
    } else if (t.GetFinishState() === 2) {
      this.wbe(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAchievementDataNotify);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAchievementDataWithIdNotify, t.GetId());
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAchievementGroupDataNotify, t.GetGroupId());
  }
  OnAchievementGroupProgressNotify(e) {
    var t = this.GetAchievementGroupData(e.svs.s5n);
    var i = t.GetFinishState();
    t.Phrase(e.svs);
    var e = t.GetFinishState();
    if (e !== i && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAchievementRedPoint), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Achievement", 27, "OnAchievementGroupProgressNotify", ["id", t.GetId()], ["currentState", e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAchievementGroupDataNotify, t.GetId());
  }
  OnAchievementCountChangeNotify(e) {
    this.Ith = e.nS_;
    this.Eth = e.oS_;
  }
  GetGroupAchievements(e, t = true) {
    let i = this.Ebe.get(e);
    if (!i) {
      this.Ube(e);
      i = this.Ebe.get(e);
    }
    if (!t) {
      return i;
    }
    var r = new Array();
    for (let e = 0; e < i.length; e++) {
      if (i[e].GetShowState()) {
        r.push(i[e]);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Achievement", 27, "GetGroupAchievements not Show", ["id", i[e].GetId()], ["MaxProgress", i[e].GetMaxProgress()]);
      }
    }
    return r;
  }
  GetGroupAchievementsIsRedDot(e) {
    return this.GetGroupAchievements(e, false).some(e => e.RedPoint());
  }
  GetAchievementCategoryIndex(t) {
    return this.GetAchievementCategoryArray().findIndex(e => e.GetId() === t.GetId());
  }
  GetAchievementCategoryGroups(e, t = true) {
    let i = this.ybe.get(e);
    if (!i) {
      this.Abe(e);
      i = this.ybe.get(e);
    }
    if (!t) {
      return i ?? [];
    }
    const r = new Array();
    i.forEach(e => {
      if (e.GetShowState()) {
        r.push(e);
      }
    });
    r.sort((e, t) => e.GetSort() - t.GetSort());
    return r;
  }
  GetAchievementData(t) {
    if (!this.Ibe.get(t)) {
      try {
        this.Gbe(t);
      } catch (e) {
        if (e instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Achievement", 58, "成就初始化异常", e, ["id", t]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Achievement", 58, "成就初始化异常", ["error", e]);
        }
      }
    }
    return this.Ibe.get(t);
  }
  GetAllAchievementData() {
    return this.Ibe;
  }
  GetAchievementCategoryArray() {
    if (this.Sbe.length === 0) {
      this.Pbe();
    }
    return this.Sbe;
  }
  GetCategory(t) {
    var i = this.GetAchievementCategoryArray();
    let r = undefined;
    for (let e = 0; e < i.length; e++) {
      if (i[e].GetId() === t) {
        r = i[e];
      }
    }
    return r;
  }
  GetAchievementGroupData(e) {
    if (e) {
      if (!this.Tbe.has(e)) {
        this.Nbe(e);
      }
      return this.Tbe.get(e);
    }
  }
  GetAllAchievementGroupData() {
    return this.Tbe;
  }
  GetRecentFinishedAchievementList() {
    var t;
    var i;
    var r = new Array();
    this.bbe();
    for (let e = 0; e < this.Lbe.length && r.length < RECENT_FINISHED_LIST_LENGTH; e++) {
      if (!r.includes(this.Lbe[e].GetId())) {
        if (this.Lbe[e].GetShowState() && (t = this.GetAchievementGroupData(this.Lbe[e].GetGroupId()), t = ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(t.GetCategory()), showFunctionList.includes(t))) {
          r.push(this.Lbe[e].GetId());
        }
      }
    }
    if (r.length < RECENT_FINISHED_LIST_LENGTH) {
      this.qbe();
      for (let e = 0; e < this.Dbe.length && r.length < RECENT_FINISHED_LIST_LENGTH; e++) {
        if (!r.includes(this.Dbe[e].GetId())) {
          if (this.Dbe[e].GetShowState() && (i = this.GetAchievementGroupData(this.Dbe[e].GetGroupId()), i = ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(i.GetCategory()), showFunctionList.includes(i))) {
            r.push(this.Dbe[e].GetId());
          }
        }
      }
    }
    return r;
  }
  GetAchievementRedPointState() {
    return this.GetAchievementCategoryArray().some(e => this.GetCategoryRedPointState(e.GetId()));
  }
  GetCategoryRedPointState(e) {
    return this.GetAchievementCategoryGroups(e, false).some(e => e.SmallItemRedPoint());
  }
  GetCategoryStarNum(e) {
    let t = 0;
    for (const i of this.GetAchievementCategoryGroups(e)) {
      for (const r of this.GetGroupAchievements(i.GetId())) {
        t += r.GetMaxStar();
      }
    }
    return t;
  }
  GetFinishedAchievementNum() {
    return this.Ith;
  }
  GetAchievementFinishedStar() {
    return this.Eth;
  }
  RefreshSearchResult() {
    var e = this.GetAchievementCategoryArray();
    this.Mbe = new Map();
    e.forEach(e => {
      var t = this.Obe(e.GetId(), this.CurrentSearchText);
      if (Array.from(t.keys()).length > 0) {
        this.Mbe.set(e, t);
      }
    });
  }
  GetSearchResult() {
    return this.Mbe;
  }
  GetSearchResultIfNull() {
    let e = true;
    for (const t of this.Mbe.values()) {
      for (const i of t.values()) {
        if (i.length > 0) {
          e = false;
          break;
        }
      }
      if (!e) {
        break;
      }
    }
    return e;
  }
  Obe(e, t) {
    var i = new Map();
    var r = this.GetAchievementCategoryGroups(e);
    for (let e = 0; e < r.length; e++) {
      var n = this.GetGroupAchievements(r[e].GetId());
      const s = new Array();
      n.forEach(e => {
        if (!e.GetTitle() || !e.GetDesc()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Achievement", 27, "成就分类找不到名称", ["id", e.GetId()], ["title", e.GetTitle()], ["desc", e.GetDesc()]);
          }
        }
        if (e.GetTitle()?.includes(t) || e.GetDesc()?.includes(t)) {
          s.push(e);
        }
      });
      if (s.length > 0) {
        i.set(r[e], s);
      }
    }
    return i;
  }
  GetSearchResultData(e) {
    const r = new Array();
    for (const t of e.keys()) {
      e.get(t).forEach((e, t) => {
        var i = new AchievementData_1.AchievementSearchData();
        i.AchievementSearchGroupData = new AchievementData_1.AchievementSearchGroupData();
        i.AchievementSearchGroupData.AchievementGroupData = t;
        i.AchievementSearchGroupData.AchievementDataLength = e.length;
        r.push(i);
        e.forEach(e => {
          var t = new AchievementData_1.AchievementSearchData();
          t.AchievementData = e;
          r.push(t);
        });
      });
    }
    return r;
  }
  IsHideAchievementGroup(e) {
    e = this.GetAchievementGroupData(e)?.GetCategory();
    e = ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(e);
    return !showFunctionList.includes(e);
  }
  GmClearData() {
    this.CurrentFinishAchievementArray.length = 0;
  }
}
(exports.AchievementModel = AchievementModel).SortByTabIndex = (e, t) => t.GetFinishSort() - e.GetFinishSort();
//# sourceMappingURL=AchievementModel.js.map