"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiAlertClass = exports.MAX_ALERT = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
exports.MAX_ALERT = 100;
const ALERT_THRESHOLD = 1;
const SHOW_UI_FRAMES = 5;
class AiAlertClass {
  constructor(t) {
    this.Bte = t;
    this.bte = undefined;
    this.qte = 0;
    this.Gte = -0;
    this.Nte = -0;
    this.CallbackEvent = undefined;
    this.Lz = Vector_1.Vector.Create();
    this.Ote = SHOW_UI_FRAMES;
    this.kte = false;
    this.Fte = false;
    this.Vte = false;
    this.Hte = undefined;
    this.ExtraModifyAlterValue = t => {
      this.qte += t;
      this.qte = MathUtils_1.MathUtils.Clamp(this.qte, 0, exports.MAX_ALERT);
      this.jte();
    };
  }
  Init(t) {
    this.Hte = t;
    EventSystem_1.EventSystem.AddWithTarget(this.Hte.Entity, EventDefine_1.EEventName.SmartObjectAiAlterNotify, this.ExtraModifyAlterValue);
  }
  set AiAlertConfig(t) {
    if (this.bte = t) {
      if (t.ForwardAngle >= 180) {
        this.Gte = 1;
      } else {
        this.Gte = Math.cos(t.ForwardAngle * MathUtils_1.MathUtils.DegToRad);
      }
      if (t.DecreaseByDist > 0) {
        this.Nte = MathUtils_1.MathUtils.Square(t.BaseIncrease / t.DecreaseByDist);
      } else if ((this.Nte = 0) < t.MaxDist && t.AlertnessType === 3) {
        this.Nte = MathUtils_1.MathUtils.Square(t.MaxDist);
      }
      if (t.AlertnessType === 2 || t.AlertnessType === 3) {
        if (ModelManager_1.ModelManager.AlertMarkModel.AlertMarkInit) {
          if (t.AlertnessType === 2) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddStalkAlertMark, this.Hte.Entity?.Id, this.Hte.Owner);
          } else if (t.AlertnessType === 3) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddEavesdropMark, this.Hte.Entity?.Id, this.Hte.Owner, t.ShowDist);
          }
        } else {
          ModelManager_1.ModelManager.AlertMarkModel?.AddPendingMarkInfo(this.Hte.Entity?.Id, this.Hte.Owner, t.AlertnessType, t.ShowDist);
        }
      }
    }
  }
  get AiAlertConfig() {
    return this.bte;
  }
  get AlertValue() {
    return this.qte;
  }
  Clear() {
    this.qte = 0;
    this.Vte = false;
    this.kte = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveAlterMark, this.Bte.CharActorComp.Entity.Id);
    var t = this.Hte.Entity;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveStalkAlertMark, t?.Id);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveEavesdropMark, t?.Id);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Hte.Entity, EventDefine_1.EEventName.SmartObjectAiAlterNotify, this.ExtraModifyAlterValue);
  }
  Tick(t) {
    if (ModelManager_1.ModelManager.GameModeModel?.IsTeleport) {
      this.qte = 0;
      this.Vte = false;
      this.kte = false;
    } else if (this.bte) {
      if (this.qte === exports.MAX_ALERT) {
        if (!this.Bte.AiHateList.GetCurrentTarget()) {
          this.qte = Math.max(0, this.qte - t * this.bte.BaseDecrease * MathUtils_1.MathUtils.MillisecondToSecond);
          for (const n of this.Bte.AiPerception.Enemies) {
            var e = EntitySystem_1.EntitySystem.GetComponent(n, 178);
            if (e?.Valid) {
              e.RemoveBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, -1, "AiAlterClass MaxValue");
            }
          }
        }
      } else {
        var s = this.Bte.CharActorComp.ActorLocationProxy;
        var i = this.Bte.CharActorComp.ActorForwardProxy;
        let e = 0;
        if (!this.Bte.AiPerception.Enemies.size) {
          this.Vte = false;
        }
        for (const _ of this.Bte.AiPerception.Enemies) {
          var h = EntitySystem_1.EntitySystem.Get(_);
          if (h.GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) {
            this.Vte = false;
          } else {
            h.GetComponent(1).ActorLocationProxy.Subtraction(s, this.Lz);
            h = this.Lz.SizeSquared();
            if (this.Nte > 0 && h > this.Nte) {
              this.Vte = false;
            } else {
              this.Vte = true;
              h = Math.sqrt(h);
              let t = this.bte.BaseIncrease - this.bte.DecreaseByDist * h;
              if (!(t < e) && !(this.Lz.DotProduct(i) < this.Gte * h && (t *= this.bte.BackwardRate), t < e)) {
                e = t;
              }
            }
          }
        }
        if (e) {
          this.qte += t * e * MathUtils_1.MathUtils.MillisecondToSecond;
          if (this.qte >= exports.MAX_ALERT) {
            this.qte = exports.MAX_ALERT;
            for (const a of this.Bte.AiPerception.Enemies) {
              var r = EntitySystem_1.EntitySystem.GetComponent(a, 178);
              if (r?.Valid) {
                r.RemoveBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, -1, "AiAlterClass MaxValue");
              }
            }
            if (this.CallbackEvent) {
              this.CallbackEvent.Callback.Broadcast(true);
            }
          }
        } else {
          this.qte = Math.max(0, this.qte - t * this.bte.BaseDecrease * MathUtils_1.MathUtils.MillisecondToSecond);
        }
        this.jte();
      }
    } else {
      this.Vte = false;
    }
  }
  jte() {
    switch (this.AiAlertConfig.AlertnessType) {
      case 1:
        this.Wte();
        break;
      case 2:
        this.Kte();
        break;
      case 3:
        this.S2n();
    }
  }
  Wte() {
    if (this.qte > ALERT_THRESHOLD && !this.kte) {
      if (!(this.Ote-- > 0)) {
        this.Ote = SHOW_UI_FRAMES;
        this.kte = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddAlterMark, this.Bte.CharActorComp.Entity.Id, Vector_1.Vector.Create(), this.Bte.CharActorComp.Owner);
      }
    } else if (this.qte < ALERT_THRESHOLD) {
      if (this.kte) {
        this.kte = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveAlterMark, this.Bte.CharActorComp.Entity.Id);
      }
      this.Ote = SHOW_UI_FRAMES;
    }
  }
  Kte() {
    var t = this.Hte.Entity;
    if (this.kte) {
      if (this.qte < ALERT_THRESHOLD) {
        this.kte = false;
        this.Fte = false;
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnStalkAlertLifted);
      } else if (this.qte >= exports.MAX_ALERT) {
        if (!this.Fte) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnStalkFound, t?.Id);
          this.Fte = true;
        }
      }
    } else if (this.qte > ALERT_THRESHOLD) {
      this.kte = true;
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnStalkAlert);
    }
  }
  S2n() {
    if (this.qte >= exports.MAX_ALERT) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEavesdropFound, this.Hte.Entity?.Id);
    }
  }
  CheckInAlertRange() {
    return this.Vte;
  }
}
exports.AiAlertClass = AiAlertClass;
//# sourceMappingURL=AiAlertClass.js.map