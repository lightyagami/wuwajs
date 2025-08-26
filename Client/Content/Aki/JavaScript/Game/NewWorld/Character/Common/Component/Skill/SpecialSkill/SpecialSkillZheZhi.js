"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillZheZhi = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const Global_1 = require("../../../../../../Global");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const GameplayCueController_1 = require("../../Abilities/GameplayCueSFX/Controller/GameplayCueController");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const HE_MAX_COUNT = 3;
const HE_ACTIVE_DIS = 3000;
const BLACKBOARD_KEY = "FlyTargetHe";
const activeTag = -1285044114;
const MARK_CUE_ID = 1105001040;
const LINE_CUE_ID = 1105001041;
class SpecialSkillZheZhi extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.f2a = undefined;
    this.n$t = undefined;
    this.M2a = new Map();
    this.S2a = new Set();
    this.Xte = undefined;
    this.E2a = undefined;
    this.wau = GameplayCueController_1.INVALID_CUE_HANDLE;
    this.y2a = false;
    this.Aau = GameplayCueController_1.INVALID_CUE_HANDLE;
    this.T2a = 0;
    this.gU = false;
    this.fii = (0, puerts_1.$ref)(undefined);
    this.L2a = Vector2D_1.Vector2D.Create();
    this.N2a = (0, puerts_1.$ref)(0);
    this.F2a = (0, puerts_1.$ref)(0);
    this.D2a = 0;
    this.A2a = 0;
  }
  OnStart() {
    this.f2a = this.SpecialSkillComponent.Entity;
    this.n$t = this.f2a.GetComponent(3);
    var e = this.f2a.GetComponent(0);
    if (e.GetPlayerId() === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) {
      this.Xte = this.f2a?.GetComponent(206);
      for (let t = 1; t < HE_MAX_COUNT + 1; t++) {
        const s = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.f2a, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, t);
        if (!s) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 4, "折枝伴生物初始化失败", ["CurGetPosition", t], ["ZhezhiEntityId", this.f2a.Id], ["ZhezhiCreatureDataId", e?.GetCreatureDataId()], ["CustomServerEntityIds", e?.CustomServerEntityIds]);
          }
          return;
        }
        this.M2a.set(t, s);
        var i = s.Entity.GetComponent(122);
        i.SetLogicRange(HE_ACTIVE_DIS);
        i.CreatePerceptionEvent(HE_ACTIVE_DIS, s.Entity?.GameBudgetManagedToken, () => {
          this.S2a.add(s);
        }, () => {
          if (this.S2a.has(s)) {
            this.S2a.delete(s);
          }
        });
      }
      this.gU = true;
    }
  }
  OnDisable() {
    this.R2a();
  }
  OnTick(t) {
    if (this.gU) {
      this.U2a();
    }
  }
  U2a() {
    if (this.M2a) {
      let r = Number.MAX_VALUE;
      let h = 0;
      let a = Number.MAX_VALUE;
      let l = 0;
      this.V2a();
      this.M2a.forEach((t, e) => {
        var i = t.Entity;
        var s = i?.GetComponent(206);
        if (i && i.Active && this.S2a.has(t) && s?.HasTag(activeTag)) {
          t = i.GetComponent(3);
          s = UE.GameplayStatics.D_ProjectWorldToScreen(Global_1.Global.CharacterController, t.ActorLocationProxy.ToUeVector(), this.fii, true);
          i = (0, puerts_1.$unref)(this.fii);
          if (s && i.X > 0 && i.X < this.D2a && i.Y > 0 && i.Y < this.A2a) {
            this.L2a.Set(i.X - this.D2a / 2, (i.Y - this.A2a / 2) / 10);
            if ((s = this.L2a.SizeSquared()) < r) {
              h = e;
              r = s;
            }
          } else if ((i = Vector_1.Vector.DistSquared(t.ActorLocationProxy, this.n$t.ActorLocationProxy)) < a) {
            l = e;
            a = i;
          }
        }
      });
      var t = h > 0 ? h : l;
      if (t === 0 && this.T2a !== 0) {
        this.R2a();
      }
      if (t !== 0) {
        if (this.T2a === t) {
          this.x2a();
        } else {
          this.P2a(t);
        }
      }
    }
  }
  V2a() {
    Global_1.Global.CharacterController?.GetViewportSize(this.N2a, this.F2a);
    this.D2a = (0, puerts_1.$unref)(this.N2a);
    this.A2a = (0, puerts_1.$unref)(this.F2a);
  }
  P2a(t) {
    var e = this.M2a.get(t);
    if (e) {
      this.Pau();
      this.w2a(e);
      this.H2a(e);
      BlackboardController_1.BlackboardController.SetIntValueByEntity(this.f2a.Id, BLACKBOARD_KEY, e.Entity.Id);
    }
    if (!this.Xte?.HasTag(activeTag)) {
      this.Xte?.AddTag(activeTag);
    }
    var e = this.f2a.GetComponent(40);
    if (e?.Valid) {
      e.CallAnimBreakPoint();
    }
    this.T2a = t;
  }
  R2a() {
    if (this.T2a !== 0) {
      BlackboardController_1.BlackboardController.SetIntValueByEntity(this.f2a.Id, BLACKBOARD_KEY, 0);
      if (this.Xte?.HasTag(activeTag)) {
        this.Xte?.RemoveTag(activeTag);
      }
      this.Pau();
      this.T2a = 0;
    }
  }
  w2a(t) {
    t = t.Entity.GetComponent(21);
    this.wau = t.AddCue(MARK_CUE_ID);
    this.E2a = t.GetCueByHandle(this.wau);
  }
  H2a(t) {
    var e = this.f2a.GetComponent(21);
    this.Aau = e.AddCue(LINE_CUE_ID, {
      Instigator: t
    });
  }
  x2a() {
    var t;
    if (this.E2a && EffectSystem_1.EffectSystem.IsValid(this.E2a.EffectViewHandle) && (t = EffectSystem_1.EffectSystem.GetSureEffectActor(this.E2a.EffectViewHandle))?.IsValid()) {
      t = t.WasRecentlyRenderedOnScreen();
      if (!this.y2a && t) {
        EffectSystem_1.EffectSystem.ReplayEffect(this.E2a.EffectViewHandle, "UpdateHeSelectMark");
      }
      this.y2a = t;
    }
  }
  Pau() {
    var t = this.M2a.get(this.T2a);
    if (t?.Valid) {
      t = t.Entity.GetComponent(21);
      if (this.wau !== GameplayCueController_1.INVALID_CUE_HANDLE) {
        t?.RemoveCueByHandle(this.wau);
      }
      this.wau = GameplayCueController_1.INVALID_CUE_HANDLE;
    }
    var t = this.f2a.GetComponent(21);
    if (this.Aau !== GameplayCueController_1.INVALID_CUE_HANDLE) {
      t?.RemoveCueByHandle(this.Aau);
    }
    this.Aau = GameplayCueController_1.INVALID_CUE_HANDLE;
  }
}
exports.SpecialSkillZheZhi = SpecialSkillZheZhi;
//# sourceMappingURL=SpecialSkillZheZhi.js.map