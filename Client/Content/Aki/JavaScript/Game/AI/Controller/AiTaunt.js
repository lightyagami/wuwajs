"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiTaunt = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TAUNT_VALUE = 1000000000;
class AiTaunt {
  constructor(t) {
    this.Bte = t;
    this.Lre = undefined;
    this.Dre = undefined;
    this.Rre = undefined;
    this.Ure = (t, i, s) => {
      if (t) {
        if (this.Dre !== -1) {
          this.Lre.RemoveHateListForTaunt(this.Dre);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 57, "[AiTaunt]设置新的嘲讽对象：", ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id], ["嘲讽者", i]);
        }
        this.Lre.AddNewHateListForTaunt(i, TAUNT_VALUE);
        this.Dre = i;
        this.Rre = s;
      } else if (s === this.Rre && (this.Are(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("AI", 57, "[AiTaunt]嘲讽时效结束：", ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id], ["嘲讽者", i]);
      }
    };
    this.xre = (t, i) => {
      if (this.Dre !== -1 && t !== this.Dre && (this.ClearCurrentTauntAndGe(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("AI", 57, "[AiTaunt]更高机制使之仇恨目标更改，嘲讽结束：", ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id]);
      }
    };
  }
  Init(t) {
    this.Lre = t;
    this.Dre = -1;
    this.Rre = undefined;
    this.BindEvent();
  }
  Tick() {
    if (this.Dre && this.Dre !== -1) {
      let t = true;
      var i;
      var s = EntitySystem_1.EntitySystem.Get(this.Dre);
      if (!(t = s?.Active && ((i = s.GetComponent(175))?.Valid && !i.IsInGame && (t = false), (i = s.GetComponent(205))?.Valid || (t = false), !i.HasTag(1008164187)) ? t : false)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 57, "[AiTaunt]嘲讽施加者目前失效或者死亡，导致嘲讽结束：", ["被嘲讽者", this.Bte.CharAiDesignComp.Entity.Id], ["嘲讽者", this.Dre]);
        }
        this.ClearCurrentTauntAndGe();
      }
    }
  }
  Clear() {
    this.ClearCurrentTauntAndGe();
    this.Lre = undefined;
    this.Dre = undefined;
    this.Rre = undefined;
    this.UnBindEvent();
  }
  Are() {
    if (this.Dre && this.Lre) {
      this.Lre.RemoveHateListForTaunt(this.Dre);
    }
    this.Dre = -1;
    this.Rre = undefined;
  }
  Reset(t) {
    this.Clear();
    this.Init(t);
  }
  ClearCurrentTauntAndGe() {
    this.Bte.CharAiDesignComp.Entity.GetComponent(174)?.RemoveBuffByHandle(this.Rre);
    this.Are();
  }
  BindEvent() {
    if (this.Bte.CharAiDesignComp.Valid) {
      EventSystem_1.EventSystem.AddWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiTauntAddOrRemove, this.Ure);
      EventSystem_1.EventSystem.AddWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiHateTargetChanged, this.xre);
    }
  }
  UnBindEvent() {
    var t = this.Bte.CharAiDesignComp?.Entity;
    if (t && (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.AiTauntAddOrRemove, this.Ure) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.AiTauntAddOrRemove, this.Ure), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.AiHateTargetChanged, this.xre))) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.AiHateTargetChanged, this.xre);
    }
  }
}
exports.AiTaunt = AiTaunt;
//# sourceMappingURL=AiTaunt.js.map