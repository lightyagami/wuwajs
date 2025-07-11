"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandModel = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const TuningStandBubbleProxy_1 = require("./Bubble/TuningStandBubbleProxy");
const TuningStandDefine_1 = require("./TuningStandDefine");
class TuningStandModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.GridData = [];
    this.CurIndex = undefined;
    this.CurNodeIndex = 0;
    this.IsPressing = false;
    this.BubbleProxy = undefined;
    this.PrevResetTime = 0;
    this.ResetTimes = 0;
    this.EventList = [];
    this.CurAkTime = 0;
  }
  LoadData(t) {
    this.Config = t;
    this.ResetTimes = 0;
    this.InitGridData();
    this.InitTalkBubble();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelPlay", 77, "调律台资源开始加载");
    }
  }
  GetIsPressing() {
    return this.IsPressing;
  }
  GetCurIndex() {
    return this.CurIndex;
  }
  GetGridList() {
    return this.GridData;
  }
  CheckOpValidState(t, i) {
    var e;
    var s;
    var n;
    var r = t.GetCurGridState();
    if (r.State === 0) {
      return 1;
    } else if (i.GridType === IAction_1.ETuningStandGridType.Empty) {
      return 4;
    } else {
      e = i.GetCurGridState();
      s = t.GridLoc;
      n = i.GridLoc;
      if (r.State === e.State) {
        return 2;
      } else if (Math.abs(s[0] - n[0]) + Math.abs(s[1] - n[1]) > 1) {
        return 4;
      } else if (i.GridMainType === 1 || i.GridMainType === 3 && !this.CheckEndValid(t, i) || t.GridValue > i.GridValue) {
        return 1;
      } else if (e.State === 0) {
        return 0;
      } else {
        return 3;
      }
    }
  }
  CheckEndValid(t, i) {
    t = t.GetCurGridState();
    if (i.GridType === IAction_1.ETuningStandGridType.End1) {
      return t.State === 1;
    } else {
      return t.State === 2;
    }
  }
  InitGridData() {
    this.GridData.length = 0;
    this.CurIndex = undefined;
    this.CurNodeIndex = 0;
    this.CreateEventList();
    for (let t = 0; t < this.Config.BoardConfig.Grids.length; t++) {
      var i = new TuningStandDefine_1.TuningGridData();
      i.Index = t;
      i.GridType = this.Config.BoardConfig.Grids[t];
      if (i.GridType === IAction_1.ETuningStandGridType.Start1) {
        i.StaticState.State = 1;
      } else if (i.GridType === IAction_1.ETuningStandGridType.Start2) {
        i.StaticState.State = 2;
      }
      i.GridValue = TuningStandDefine_1.gridValueMap.get(i.GridType);
      i.GridMainType = TuningStandDefine_1.gridMainTypeMap.get(i.GridType);
      this.GridData.push(i);
    }
  }
  ResetGrid() {
    if (!(Time_1.Time.Now - TuningStandDefine_1.RESET_COOL_DOWN < this.PrevResetTime)) {
      this.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.Reset);
      this.PrevResetTime = Time_1.Time.Now;
      this.ResetTimes++;
      if (this.ResetTimes === TuningStandDefine_1.RESET_TIMES_THREDHOLD) {
        this.ProcessTooLong();
      }
      this.InitGridData();
    }
  }
  UnloadData() {
    this.Config = undefined;
    this.ResetTimes = 0;
    this.PrevResetTime = 0;
    this.DestroyBubble();
    this.GridData.length = 0;
    this.CurIndex = undefined;
    this.CurNodeIndex = 0;
    this.EventList.length = 0;
  }
  InitData(t) {
    this.IsPressing = t;
    this.CurIndex = undefined;
  }
  OnPress(t) {
    if (t.GridMainType !== 3 && t.StaticState.State !== 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandOnLinkMiss, false);
      this.InitData(true);
      t = t.Index;
      this.CurIndex = t;
      this.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.StartLink);
      if (this.ClearAllNextPathStatic(t)) {
        this.PlayAkEvent(false);
      } else {
        this.PlayStartEvent();
      }
    }
  }
  OnRelease(t) {
    var i;
    var e = this.Config.VisualType === IAction_1.ETuningStandVisualType.Tuning;
    var s = this.CurIndex;
    this.InitData(false);
    this.SaveDynamicGrid();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandUpdate);
    if (this.CheckAllClear()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandSuccess);
      this.kFu();
    } else if (s !== undefined && (i = this.CheckEndCount(), this.GridData[s].GridMainType === 3) && e) {
      if (i[0] === i[1]) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandOnLinkMiss, true);
        AudioSystem_1.AudioSystem.PostEvent("play_ui_tiaolvtai_attention2");
      }
      if (i[0] === 1 && i[1] !== 1) {
        this.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.LinkUp);
      } else if (i[0] === i[1]) {
        this.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.LinkMiss);
      }
    }
  }
  OnHover(t) {
    if (!this.IsPressing) {
      return 0;
    }
    var i = this.GridData[this.CurIndex];
    var e = this.CheckOpValidState(i, t);
    if (e === 4) {
      return 0;
    }
    if (e === 1) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_tiaolvtai_attention3");
      return 2;
    }
    if (e === 3) {
      this.ClearAllNextPathDynamic(t.Index);
    } else if (e === 2) {
      if (this.CurIndex !== t.Index) {
        this.PlayAkEvent(false);
      }
      if (!this.ClearAllNextPathDynamic(t.Index)) {
        i.GetCurGridState().Next = undefined;
      }
      this.CurIndex = t.Index;
      return 1;
    }
    t.IsStatic = false;
    i.GetCurGridState().Next = t.Index;
    t.DynamicState.State = i.GetCurGridState().State;
    t.DynamicState.Prev = this.CurIndex;
    t.DynamicState.Next = undefined;
    this.CurIndex = t.Index;
    this.PlayAkEvent(true);
    return 1;
  }
  ClearAllNextPathStatic(t) {
    t = this.GridData[t];
    if (t.StaticState.Next === undefined) {
      return false;
    }
    t.IsStatic = true;
    let i = t.StaticState.Next;
    for (t.StaticState.Next = undefined; i !== undefined;) {
      var e = this.GridData[i];
      i = e.StaticState.Next;
      e.IsStatic = true;
      e.StaticState.State = 0;
      e.DynamicState.Next = undefined;
      e.DynamicState.Prev = undefined;
      e.StaticState.Next = undefined;
      e.StaticState.Prev = undefined;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandUpdate);
    return true;
  }
  ClearAllNextPathDynamic(t) {
    let i = false;
    var t = this.GridData[t];
    if (t.IsStatic) {
      t.IsStatic = false;
      t.DynamicState.State = t.StaticState.State;
      t.DynamicState.Prev = t.StaticState.Prev;
      t.DynamicState.Next = t.StaticState.Next;
    }
    var t = t.GetCurGridState();
    var e = t.State;
    let s = t.Next;
    t.Next = undefined;
    var n = [];
    for (; s !== undefined;) {
      var r;
      var o = this.GridData[s];
      s = o.GetCurGridState().Next;
      if (o.GetCurGridState().State !== e) {
        return false;
      }
      if (o.StaticState.State !== e && o.StaticState.State !== 0 && (r = o.StaticState.Prev, (r = this.GridData[r]).GetCurGridState().State === r.StaticState.State)) {
        i = true;
        n.push(o.Index);
      } else {
        o.IsStatic = false;
        o.DynamicState.State = 0;
        o.DynamicState.Next = undefined;
        o.DynamicState.Prev = undefined;
      }
    }
    if (i && (t = this.CheckRecoverLead(n)) !== -1) {
      this.RecoverGrid(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandUpdate);
    return i;
  }
  SaveDynamicGrid() {
    for (const i of this.GridData) {
      if (!i.IsStatic) {
        i.IsStatic = true;
        i.StaticState.State = i.DynamicState.State;
        i.StaticState.Next = i.DynamicState.Next;
        i.StaticState.Prev = i.DynamicState.Prev;
        i.DynamicState.State = 0;
        i.DynamicState.Next = undefined;
        i.DynamicState.Prev = undefined;
      }
    }
    for (const e of this.GridData) {
      var t = e.StaticState.Next;
      if (t !== undefined && this.GridData[t].StaticState.State !== e.StaticState.State) {
        e.StaticState.Next = undefined;
      }
    }
  }
  CheckAllClear() {
    for (const t of this.GridData) {
      if (t.GridMainType !== 0 && t.StaticState.State === 0) {
        return false;
      }
    }
    return true;
  }
  CheckEndCount() {
    var t = [0, 0];
    for (const i of this.GridData) {
      if (i.GridMainType === 3 && (t[1]++, i.StaticState.State !== 0)) {
        t[0]++;
      }
    }
    return t;
  }
  CheckRecoverLead(t) {
    var i = t.length;
    if (i === 1) {
      return t[0];
    }
    var e = new Map();
    for (const n of t) {
      e.set(n, 0);
    }
    for (const r of t) {
      if (e.get(r) !== -1) {
        let t = r;
        while (t !== undefined) {
          if (e.has(t)) {
            var s = e.get(t);
            if (t === r) {
              e.set(r, 1);
            } else {
              if (s !== 0) {
                e.set(r, s + 1);
                break;
              }
              e.set(t, -1);
              e.set(r, e.get(r) + 1);
            }
          }
          s = this.GridData[t];
          t = s.StaticState.Next;
        }
      }
    }
    for (const o of e) {
      if (o[1] === i) {
        return o[0];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 77, "Check Recover Leading Error", ["RecoverList", t]);
    }
    return -1;
  }
  RecoverGrid(t) {
    let i = t;
    var e = this.GridData[t].StaticState.State;
    for (; i !== undefined;) {
      var s = this.GridData[i];
      if (t !== i && s.GetCurGridState().State !== 0 && s.GetCurGridState().State !== e) {
        return;
      }
      i = s.StaticState.Next;
      s.IsStatic = true;
      s.DynamicState.Next = undefined;
      s.DynamicState.Prev = undefined;
    }
  }
  kFu() {
    var t = [];
    for (const i of this.GridData) {
      if (i.GridMainType === 1) {
        t.push(i.Index);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandSuccessShowStart, t);
  }
  CreateEventList() {
    this.EventList.length = 0;
    for (const i of this.Config.NoteSequence?.split(",") ?? []) {
      var t = ConfigManager_1.ConfigManager.TuningStandConfig?.GetEvent(i);
      if (t) {
        this.EventList.push(t);
      }
    }
  }
  PlayStartEvent() {
    if (!(this.CurAkTime + TuningStandDefine_1.AK_COOL_DOWN > Time_1.Time.Now)) {
      if (this.CurNodeIndex >= this.EventList.length) {
        this.CurNodeIndex = 0;
      }
      AudioSystem_1.AudioSystem.PostEvent(this.EventList[this.CurNodeIndex]);
      this.CurAkTime = Time_1.Time.Now;
    }
  }
  PlayAkEvent(t) {
    if (this.EventList.length !== 0 && !(this.CurAkTime + TuningStandDefine_1.AK_COOL_DOWN > Time_1.Time.Now)) {
      if (t) {
        this.CurNodeIndex++;
        if (this.CurNodeIndex >= this.EventList.length) {
          this.CurNodeIndex = 0;
        }
      } else {
        this.CurNodeIndex--;
        if (this.CurNodeIndex < 0) {
          this.CurNodeIndex = this.EventList.length - 1;
        }
      }
      AudioSystem_1.AudioSystem.PostEvent(this.EventList[this.CurNodeIndex]);
      this.CurAkTime = Time_1.Time.Now;
    }
  }
  InitTalkBubble() {
    if (this.Config.VisualType !== IAction_1.ETuningStandVisualType.Challenge && this.Config.BubbleConfig) {
      this.BubbleProxy = new TuningStandBubbleProxy_1.TuningStandBubbleProxy(this.Config.BubbleConfig);
    } else {
      this.BubbleProxy = undefined;
    }
  }
  TryStartBubbleFlow(t) {
    return !!this.BubbleProxy && this.BubbleProxy.TryStartBubbleFlow(t);
  }
  ProcessTooLong() {
    this.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.TooLong);
  }
  DestroyBubble() {
    this.BubbleProxy?.Destroy();
    this.BubbleProxy = undefined;
  }
}
exports.TuningStandModel = TuningStandModel;
//# sourceMappingURL=TuningStandModel.js.map