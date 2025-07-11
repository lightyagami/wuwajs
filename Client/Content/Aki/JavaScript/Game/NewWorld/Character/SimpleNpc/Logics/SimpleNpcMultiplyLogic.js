"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNpcMultiplyLogic = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const MapUtils_1 = require("../../../../../Core/Utils/MapUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SimpleNpcFlowConditionChecker_1 = require("./SimpleNpcFlowConditionChecker");
const DEFAULT_WAIT_TIME = 3;
const DEFAULT_LOOP_TIME = 10;
class SimpleNpcMultiplyLogic {
  constructor(t) {
    this.aor = undefined;
    this.Eor = [];
    this.Sor = [];
    this.NUe = ++SimpleNpcMultiplyLogic.Me;
    this.yor = undefined;
    this.Ior = [];
    this.Tor = 0;
    this.Lor = 0;
    this.Dor = true;
    this.IsPause = true;
    this.aor = t;
    this.Sor = new Array();
  }
  StartFlow() {
    this.IsPause = false;
    this.Ror();
    this.Uor();
  }
  Uor() {
    let e = void (this.Sor.length = 0);
    var t;
    var s = this.aor.FlowList;
    for (let t = 0, i = s.Num(); t < i; t++) {
      var r = s.Get(t);
      if (this.Eor[t]) {
        if (r.CheckType === 9) {
          if (SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.CheckFirstEnter(this.NUe)) {
            this.Sor.push(r);
            e = r;
            SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.SetFirstEnter(this.NUe);
            break;
          }
        } else if (SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.CheckCondition(r)) {
          this.Sor.push(r);
        }
      }
    }
    if (e) {
      this.Aor(e);
    } else if (t = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.Sor)) {
      this.Aor(t);
    }
  }
  Ror() {
    if (!this.Eor || this.Eor.length < this.aor.FlowList.Num()) {
      this.FilterFlowWorldState();
    }
  }
  FilterFlowWorldState() {
    var i = this.aor.FlowList.Num();
    for (this.Eor ||= new Array(); this.Eor.length < i;) {
      this.Eor.push(true);
    }
    var e = new Map();
    for (let t = 0; t < i; t++) {
      var s = this.aor.FlowList.Get(t);
      if (s.WorldState.WorldStateMap.Num() === 1 && (s = s.WorldState.WorldStateMap.GetKey(0)) !== undefined) {
        if (!e.get(s)) {
          e.set(s, new Array());
        }
        e.get(s).push(t);
      }
    }
    var r = new Array();
    for (let t = 0; t < i; t++) {
      r.push(this.Por(t));
    }
    var h = new Map();
    for (const n of e) {
      var t = n[0];
      h.set(t, -1);
      var o = h.get(t);
      for (const _ of n[1]) {
        if (r[_] >= 0 && (o < 0 || o > r[_])) {
          h.set(t, r[_]);
        }
      }
    }
    for (let t = 0; t < i; t++) {
      var l;
      var a = this.aor.FlowList.Get(t);
      if (a.WorldState.WorldStateMap.Num() === 0) {
        this.Eor[t] = true;
      } else if (a.WorldState.WorldStateMap.Num() === 1) {
        a = a.WorldState.WorldStateMap.GetKey(0);
        a = h.get(a);
        l = r[t];
        this.Eor[t] = a !== undefined && a >= 0 && l === a;
      } else {
        this.Eor[t] = r[t] === 0;
      }
    }
  }
  Por(t) {
    var i = this.aor.FlowList.Get(t);
    if (i.WorldState.WorldStateMap.Num() === 0) {
      return 0;
    }
    if (i.WorldState.WorldStateMap.Num() === 1) {
      const t = i.WorldState.WorldStateMap.GetKey(0);
      var e = this.GetWorldStateEnum(t);
      if (e === undefined) {
        return -1;
      } else if ((e = ModelManager_1.ModelManager.WorldModel.GetWorldState(e)) === undefined) {
        return -1;
      } else {
        return e - i.WorldState.WorldStateMap.Get(t);
      }
    }
    const s = i.WorldState.MeetAllConditions;
    let r = !!s;
    MapUtils_1.MapUtils.ForEach(i.WorldState.WorldStateMap, (t, i) => {
      t = this.GetWorldStateEnum(t);
      let e = undefined;
      if (t !== undefined) {
        e = ModelManager_1.ModelManager.WorldModel.GetWorldState(t);
      }
      r = e !== undefined ? s ? r && e >= i : r || e >= i : !s && r;
    });
    if (r) {
      return 0;
    } else {
      return -1;
    }
  }
  Aor(t) {
    this.yor = t;
    t = ConfigManager_1.ConfigManager.FlowConfig.GetRandomFlow(t.FlowListName, Number(t.FlowSubTitle), this.aor.GetOwner().ActorLabel);
    if (t) {
      this.Ior = t.TalkItems;
      this.wor(0);
    } else {
      this.Bor();
    }
  }
  wor(i) {
    this.Tor = i;
    var e = this.Ior;
    if (e.length > i) {
      var e = e[i];
      var s = this.aor.NpcList;
      if (s.Num() < 2) {
        let t = false;
        var r = this.aor.GetOwner();
        if (t = r instanceof UE.TsSimpleNpc_C ? this.bor(r, e) : t) {
          this.Dor = false;
          this.Lor = this.qor(e);
        } else {
          this.wor(i + 1);
        }
      } else {
        let t = -1;
        if ((t = this.yor.Pawn === 0 ? SimpleNpcFlowConditionChecker_1.SimpleNpcFlowConditionChecker.GetFlowActorIndex(e.WhoId) : this.yor.Pawn - 1) === -1) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 29, "请选择指定的演出目标ID", ["Id", e.WhoId], ["Name", this.aor.GetOwner().GetName()]);
          }
          this.wor(i + 1);
        } else if (s.Num() <= t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 29, "找不到演出目标", ["Index", t], ["Name", this.aor.GetOwner().GetName()]);
          }
          this.wor(i + 1);
        } else {
          r = s.Get(t);
          if (this.bor(r, e)) {
            this.Dor = false;
            this.Lor = this.qor(e);
          } else {
            this.wor(i + 1);
          }
        }
      }
    } else {
      this.Bor();
    }
  }
  bor(t, i) {
    let e = false;
    var s;
    var r = this.Gor(i.TidTalk);
    if (r) {
      e = true;
      s = this.qor(i, 0.05);
      t.ShowDialog(r, s);
    }
    return e = i.Montage && t.TryPlayMontage(i.Montage.ActionMontage.Path) ? true : e;
  }
  Gor(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    }
  }
  qor(t, i = 0) {
    let e = t.WaitTime;
    if (!e || e === 0) {
      e = DEFAULT_WAIT_TIME;
    }
    return e += i;
  }
  Bor() {
    this.Dor = true;
    let t = DEFAULT_LOOP_TIME;
    if (this.yor) {
      t = this.yor.LoopTime;
    }
    this.Lor = t;
  }
  Tick(t) {
    if (this.Lor > 0 && (this.Lor -= t, this.Lor <= 0)) {
      if (this.Dor) {
        if (!this.IsPause) {
          this.Uor();
        }
      } else {
        this.wor(this.Tor + 1);
      }
    }
  }
  StopFlow() {
    this.Dor = true;
    this.Lor = 0;
    var e = this.aor?.NpcList;
    if (e && e?.Num() > 2) {
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t);
        s.HideDialog();
        s.StopMontage();
      }
    } else {
      var t = this.aor.GetOwner();
      if (t instanceof UE.TsSimpleNpc_C) {
        t.HideDialog();
        t.StopMontage();
      }
    }
  }
  get IsPlaying() {
    return !this.Dor;
  }
  GetWorldStateEnum(t) {
    switch (t) {
      case 0:
        return "DefaultState";
      case 2:
      case 1:
        return "NpcWorldState";
      default:
        return;
    }
  }
}
(exports.SimpleNpcMultiplyLogic = SimpleNpcMultiplyLogic).Me = 0;
//# sourceMappingURL=SimpleNpcMultiplyLogic.js.map