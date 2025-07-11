"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridAppearAnimationBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class GridAppearAnimationBase {
  constructor(t) {
    this.GridPreserver = undefined;
    this.zqo = undefined;
    this.DisplayGridNum = 0;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.IsInGridAppearAnimation = false;
    this.HasShowFirstGrid = false;
    this.Zqo = new Map();
    this.uCt = () => {
      this.GridPreserver.NotifyAnimationEnd();
    };
    this.Tick = t => {
      this.OnUpdate(t);
    };
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 24, "设置错误，gridPreserver为空!");
      }
    }
    this.GridPreserver = t;
  }
  IsGridControlValid() {
    return !this.IsInGridAppearAnimation;
  }
  PlayGridAnim(t, i = false) {
    if (this.zqo) {
      this.GridPreserver.NotifyAnimationStart();
      this.zqo.Play("", t, i);
    } else if (this.GridPreserver.GetGridAnimationInterval() <= 0 && this.GridPreserver.GetGridAnimationStartTime() <= 0) {
      this.GridPreserver.NotifyAnimationEnd();
    } else {
      this.eGo();
      this.il();
    }
  }
  Clear() {
    if (this.zqo) {
      this.zqo.OnFinish.Unbind();
      this.GridPreserver.NotifyAnimationEnd();
    } else if (!(this.GridPreserver.GetGridAnimationInterval() <= 0) || !(this.GridPreserver.GetGridAnimationStartTime() <= 0)) {
      this.eGo();
    }
  }
  RegisterAnimController() {
    this.zqo = this.GridPreserver.GetUiAnimController();
    if (this.zqo) {
      this.zqo.SetTickableWhenPaused(true);
      this.zqo.OnFinish.Bind(this.uCt);
    }
  }
  eGo() {
    this.GridPreserver.NotifyAnimationEnd();
    this.RemoveTimer();
    this.OnInterrupt();
  }
  il() {
    this.DisplayGridNum = this.GridPreserver.GetDisplayGridNum();
    this.tGo();
    this.OnStart();
  }
  OnStart() {}
  OnUpdate(t) {}
  GridsForEach(i) {
    var e = this.GridPreserver.GetPreservedGridNum() - 1;
    for (let t = 0; t <= e; t++) {
      var s = this.GridPreserver.GetGridByDisplayIndex(t);
      i(t, s);
    }
  }
  End() {
    this.RemoveTimer();
    this.OnEnd();
  }
  OnEnd() {}
  OnInterrupt() {
    for (const t of this.Zqo.values()) {
      t.StopSequenceByKey("Start");
      t.Clear();
    }
    this.Zqo.clear();
  }
  ShowGrid(t, i) {
    t.SetUIActive(true);
    let e = this.Zqo.get(t);
    if (!e) {
      e = new LevelSequencePlayer_1.LevelSequencePlayer(t);
      this.Zqo.set(t, e);
    }
    e.StopSequenceByKey("Start");
    e.PlayLevelSequenceByName("Start");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowGridAnimation, i, t);
  }
  tGo() {
    if (this.sKe === TickSystem_1.TickSystem.InvalidId) {
      this.sKe = TickSystem_1.TickSystem.Add(this.Tick, "GridAppearAnimation", 0, true, undefined, true).Id;
    }
  }
  RemoveTimer() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
}
exports.GridAppearAnimationBase = GridAppearAnimationBase;
//# sourceMappingURL=GridAppearAnimationBase.js.map