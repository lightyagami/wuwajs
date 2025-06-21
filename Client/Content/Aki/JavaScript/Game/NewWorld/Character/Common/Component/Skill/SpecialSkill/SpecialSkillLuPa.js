"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialSkillLuPa = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../../../Global"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  HudUnitUtils_1 = require("../../../../../../Module/HudUnit/Utils/HudUnitUtils"),
  CampUtils_1 = require("../../../Blueprint/Utils/CampUtils"),
  LockOnUtils_1 = require("../../LockOn/LockOnUtils"),
  SpecialSkillBase_1 = require("./SpecialSkillBase"),
  GAP_TIME = 200,
  DISTANCE = 5e3,
  RADIUS = 500,
  PROFILE_KEY = "SpecialSkillLuPa_IsBlock",
  SPECIAL_SKILL_ID = 1207601;
class SpecialSkillLuPa extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments), this.Hte = void 0, this.EIe = void 0, this.cBe = void 0, this.rqo = void 0, this.eMc = !1, this.A_u = void 0, this.HFt = 0, this.soi = Vector_1.Vector.Create(), this.jma = new Vector2D_1.Vector2D, this.ck1 = 0, this.hoi = void 0, this.hBa = void 0
  }
  OnStart() {
    this.Hte = this.SpecialSkillComponent.Entity.GetComponent(3), this.EIe = this.SpecialSkillComponent.Entity.GetComponent(0), this.cBe = this.SpecialSkillComponent.Entity.GetComponent(40);
    var i = this.SpecialSkillComponent.Entity.GetComponent(205);
    this.hBa = this.cBe?.GetSkill(SPECIAL_SKILL_ID), this.Hte?.IsAutonomousProxy && (this.rqo = i.ListenForTagAddOrRemove(-307383857, (i, t) => {
      this.P_u(), this.eMc = t, this.HFt = 0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, void 0)
    })), 0 === this.ck1 && (i = this.hBa?.SkillInfo?.SpecialBuffInCode)?.Num() && (this.ck1 = Number(i.Get(0)))
  }
  OnEnd() {
    this.rqo?.EndTask()
  }
  OnTick(i) {
    this.eMc && (0 === this.HFt && this.Yhc(DISTANCE, RADIUS), this.HFt += i, this.HFt > GAP_TIME) && (this.HFt = 0)
  }
  Yhc(i, t) {
    var e = [],
      s = (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(i, 62, e), this.Hte.Actor.Camp),
      r = (this.soi.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation()), this.soi);
    let o = Number.MAX_VALUE,
      h = void 0;
    for (const _ of e)
      if (LockOnUtils_1.LockOnUtils.IsValidLockOnTarget(_))
        if (_.Entity.GetComponent(174)) {
          var l = _.Entity.GetComponent(2);
          if (l) {
            l = CampUtils_1.CampUtils.GetCampRelationship(l.Actor.Camp, s);
            if (2 === l) {
              l = _.Entity.GetComponent(0)?.GetEntityType();
              if (l === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
                var l = _.Entity.GetComponent(1).ActorLocationProxy,
                  n = HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(l.ToUeVector(), this.jma);
                if (n && !(this.jma.Size() > t)) {
                  const i = Vector_1.Vector.Dist(r, l);
                  if (!(i > o)) {
                    n = this.Coi(r, l);
                    if (n?.bBlockingHit) {
                      var l = _.Entity.GetComponent(1).Owner,
                        n = n.Actors.Get(0),
                        a = ModelManager_1.ModelManager.CreatureModel.GetEntityActorByChildActor(n);
                      if (l !== n && l !== a) continue
                    }
                    o = i, h = _
                  }
                }
              }
            }
          }
        } h !== this.A_u && (this.P_u(), h && this.NEn(h), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SpecialSkillLuPaSwitchLockTarget, h))
  }
  Coi(i, t) {
    if (this.hoi || (this.hoi = ModelManager_1.ModelManager.BulletModel.NewTraceElement(UE.TraceLineElement, ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim), this.hoi.bIsSingle = !0, this.hoi.bIgnoreSelf = !0), this.hoi.WorldContextObject = this.Hte.Owner, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, i), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, t), TraceElementCommon_1.TraceElementCommon.LineTrace(this.hoi, PROFILE_KEY)) return this.hoi.HitResult
  }
  NEn(i) {
    i.Entity.GetComponent(174).AddBuff(this.ck1, {
      InstigatorId: this.EIe.GetCreatureDataId(),
      Reason: "露帕特殊技能瞄准目标加Buff",
      PreMessageId: this.hBa?.MNc
    }), this.A_u = i
  }
  P_u() {
    this.A_u?.Valid && (this.A_u.Entity.GetComponent(174)?.RemoveBuff(this.ck1, -1, "露帕特殊技能瞄准目标移除Buff", this.hBa?.MNc), this.A_u = void 0)
  }
}
exports.SpecialSkillLuPa = SpecialSkillLuPa;
//# sourceMappingURL=SpecialSkillLuPa.js.map