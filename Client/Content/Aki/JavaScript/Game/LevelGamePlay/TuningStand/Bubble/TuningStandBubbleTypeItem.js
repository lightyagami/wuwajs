"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandBubbleTypeTooLong = exports.TuningStandBubbleTypeReset = exports.TuningStandBubbleTypeLinkComplete = exports.TuningStandBubbleTypeLinkMiss = exports.TuningStandBubbleTypeLinkUp = exports.TuningStandBubbleTypeInValidLink = exports.TuningStandBubbleTypeStartLink = exports.TuningStandBubbleTypeEnter = exports.TuningStandBubbleTypeBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FULUOLUO_TALK = "FLL";
const MALE_TALK = "M";
const FEMALE_TALK = "F";
class TuningStandBubbleTypeBase {
  constructor() {
    this.CanInterruptBySelf = false;
    this.PlayFlow = undefined;
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.Enter;
    this.TalkList = [];
    this.TimerHandle = undefined;
    this.CurIndex = 0;
    this.RemainTime = 2;
  }
  GetCanInterruptBySelf() {
    return this.CanInterruptBySelf;
  }
  TryStartBubble(t) {
    return false;
  }
  Init(t) {
    this.PlayFlow = t;
    var e = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(t.FlowListName, t.FlowId, t.StateId);
    if (e) {
      for (const s of e) {
        if (s.Name === "ShowTalk") {
          for (const n of s.Params.TalkItems) {
            var i = this.CreateBubbleData(n);
            if (i) {
              this.TalkList.push(i);
            }
          }
        }
      }
      if (this.TalkList.length === 0) {
        this.PlayFlow = undefined;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 77, "找不到对应的剧本配置", ["FlowListName", t.FlowListName], ["FlowId", t.FlowId], ["StateId", t.StateId]);
    }
  }
  Interrupted() {
    if (this.TimerHandle) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.TimerHandle)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle);
      }
      this.TimerHandle = undefined;
    }
  }
  OnBubbleEnd() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandBubbleEnd, this.BubbleType);
  }
  Destroy() {
    this.Interrupted();
    this.PlayFlow = undefined;
  }
  CreateBubbleData(t) {
    var e = {
      WaitTime: 0
    };
    if (t.WaitTime && t.WaitTime > 0) {
      e.WaitTime = t.WaitTime;
    }
    var [i, s, n] = this.GetTalkData(t);
    if (i) {
      if (s) {
        e.MainRoleTex = n;
        e.MainRoleTalk = t.TidTalk;
      } else {
        e.FloroTex = n;
        e.FloroTalk = t.TidTalk;
      }
      if (e.WaitTime === 0) {
        e.WaitTime = this.RemainTime;
      }
      return e;
    }
  }
  GetTalkData(t) {
    var e = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId ?? -1);
    if (!e) {
      return [false, false, ""];
    }
    var i = t.Name !== FULUOLUO_TALK;
    var e = e.HeadIconAsset;
    if (i) {
      var s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      if (s === 0 && t.Name === MALE_TALK || s === 1 && t.Name === FEMALE_TALK) {
        return [false, false, ""];
      }
    }
    return [true, i, e];
  }
  UpdateBubble() {
    var t;
    if (this.CurIndex >= this.TalkList.length) {
      this.OnBubbleEnd();
    } else {
      t = this.TalkList[this.CurIndex];
      this.CurIndex++;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandBubbleUpdate, t);
      this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.UpdateBubble();
      }, t.WaitTime * 1000);
    }
  }
}
class TuningStandBubbleTypeEnter extends (exports.TuningStandBubbleTypeBase = TuningStandBubbleTypeBase) {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.Enter;
    this.HasPlayedOnce = false;
  }
  TryStartBubble(t) {
    return !!this.PlayFlow && !this.HasPlayedOnce && !(this.HasPlayedOnce = true, this.UpdateBubble(), 0);
  }
}
exports.TuningStandBubbleTypeEnter = TuningStandBubbleTypeEnter;
class TuningStandBubbleTypeStartLink extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.StartLink;
    this.cxu = false;
  }
  TryStartBubble(t) {
    if (t) {
      return !!this.PlayFlow && !this.cxu && (this.CurIndex = 0, this.UpdateBubble(), this.cxu = true);
    } else {
      return !(this.cxu = true);
    }
  }
}
exports.TuningStandBubbleTypeStartLink = TuningStandBubbleTypeStartLink;
const COOL_DOWN_TIME = 20;
class TuningStandBubbleTypeInValidLink extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.InvalidLink;
    this.dxu = 0;
  }
  TryStartBubble(t) {
    return !!this.PlayFlow && !(Time_1.Time.Now - COOL_DOWN_TIME < this.dxu) && !(this.dxu = Time_1.Time.Now, this.CurIndex = 0, this.UpdateBubble(), 0);
  }
}
exports.TuningStandBubbleTypeInValidLink = TuningStandBubbleTypeInValidLink;
class TuningStandBubbleTypeLinkUp extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.LinkUp;
    this.HasPlayedOnce = false;
  }
  TryStartBubble(t) {
    if (t) {
      return !!this.PlayFlow && !this.HasPlayedOnce && !(this.HasPlayedOnce = true, this.CurIndex = 0, this.UpdateBubble(), 0);
    } else {
      return !(this.HasPlayedOnce = true);
    }
  }
}
exports.TuningStandBubbleTypeLinkUp = TuningStandBubbleTypeLinkUp;
class TuningStandBubbleTypeLinkMiss extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.LinkMiss;
  }
  TryStartBubble(t) {
    return !!this.PlayFlow && (this.CurIndex = 0, this.UpdateBubble(), true);
  }
}
exports.TuningStandBubbleTypeLinkMiss = TuningStandBubbleTypeLinkMiss;
class TuningStandBubbleTypeLinkComplete extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.LinkComplete;
  }
  TryStartBubble(t) {
    return !!this.PlayFlow && (this.CurIndex = 0, this.UpdateBubble(), true);
  }
}
exports.TuningStandBubbleTypeLinkComplete = TuningStandBubbleTypeLinkComplete;
class TuningStandBubbleTypeReset extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.Reset;
    this.HasPlayedOnce = false;
  }
  TryStartBubble(t) {
    if (t) {
      return !!this.PlayFlow && !this.HasPlayedOnce && !(this.HasPlayedOnce = true, this.CurIndex = 0, this.UpdateBubble(), 0);
    } else {
      return !(this.HasPlayedOnce = true);
    }
  }
}
exports.TuningStandBubbleTypeReset = TuningStandBubbleTypeReset;
class TuningStandBubbleTypeTooLong extends TuningStandBubbleTypeBase {
  constructor() {
    super(...arguments);
    this.BubbleType = IAction_1.ETuningStandBubbleTriggerType.TooLong;
    this.HasPlayedOnce = false;
  }
  TryStartBubble(t) {
    if (!this.PlayFlow || this.HasPlayedOnce) {
      return false;
    }
    this.HasPlayedOnce = true;
    this.CurIndex = 0;
    var e = this.TalkList[0];
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TuningStandTooLongTime, e.MainRoleTex !== undefined);
    this.UpdateBubble();
    return true;
  }
}
exports.TuningStandBubbleTypeTooLong = TuningStandBubbleTypeTooLong;
//# sourceMappingURL=TuningStandBubbleTypeItem.js.map