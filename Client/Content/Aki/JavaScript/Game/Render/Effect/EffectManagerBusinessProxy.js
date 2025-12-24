"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectManagerBusinessProxy = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
class EffectManagerBusinessProxy {
  constructor() {
    this.c1r = undefined;
    this.m1r = undefined;
    this.d1r = undefined;
    this.C1r = 0;
    this.g1r = e => {
      if (EffectSystem_1.EffectSystem.GetHideOnBurstSkill(e)) {
        this.m1r.add(e);
      }
    };
    this.f1r = e => {
      this.m1r.delete(e);
    };
    this.xie = () => {
      this.d1r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
      this.C1r = Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0;
    };
    this.BJe = (e, t, s) => {
      if (this.d1r && e === this.C1r && (e = this.d1r.GetComponent(41)?.GetSkillInfo(t)) && e.SkillGenre === 3) {
        this.c1r.Start();
        this.m1r.forEach(e => {
          if (EffectSystem_1.EffectSystem.IsValid(e)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("RenderEffect", 25, "Effect Recycled By Burst", ["path", EffectSystem_1.EffectSystem.GetPath(e)]);
            }
            EffectSystem_1.EffectSystem.StopEffectById(e, "[EffectManagerBusinessProxy.OnCharUseSkill]", true);
          }
        });
        this.c1r.Stop();
      }
    };
  }
  static Get() {
    if (!this.Me) {
      this.Me = new EffectManagerBusinessProxy();
      this.Me.Init();
    }
    return this.Me;
  }
  Init() {
    this.c1r = Stats_1.Stat.Create("EffectManagerBusinessProxy_DestroyOnBurst");
    this.m1r = new Set();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BeforePlayEffect, this.g1r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FinishEffect, this.f1r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.BJe);
  }
}
exports.EffectManagerBusinessProxy = EffectManagerBusinessProxy;
//# sourceMappingURL=EffectManagerBusinessProxy.js.map