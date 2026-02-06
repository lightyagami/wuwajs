"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const CampUtils_1 = require("../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
class TsAnimNotifyStateCleanBurstCamera extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.隐藏敌对目标Mesh = true;
    this.隐藏敌对目标特效 = true;
    this.不接受命中特效 = true;
    this.TsHideMesh = false;
    this.TsHideEffect = false;
    this.TsHiddenMap = undefined;
    this.TsNoHitEffect = false;
  }
  Constructor() {
    this.TsHideMesh = false;
    this.TsHideEffect = false;
    this.TsHiddenMap = undefined;
    this.TsNoHitEffect = false;
  }
  K2_NotifyBegin(t, s, e) {
    var i;
    var r;
    var a = t.GetOwner();
    if (!(a instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    if (!a.CharacterActorComponent.IsAutonomousProxy) {
      return false;
    }
    this.TsHideMesh = this.隐藏敌对目标Mesh;
    this.TsHideEffect = this.隐藏敌对目标特效;
    this.TsNoHitEffect = this.不接受命中特效;
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (o.IsInit && o.Entity.Active && (r = (i = o.Entity.GetComponent(3))?.Actor) && r !== a && CampUtils_1.CampUtils.GetCampRelationship(r.Camp, a.Camp) !== 1 && (this.TsHiddenMap ||= new Map(), this.TsHideEffect && (this.HideEffect(o, true), this.TsHiddenMap.set(o, -1)), this.TsHideMesh)) {
        r = i.DisableActor("[TsAnimNotifyStateCleanBurstCamera] 大招镜头帧事件隐藏Mesh");
        this.TsHiddenMap.set(o, r);
      }
    }
    if (this.TsNoHitEffect) {
      if (t = a.GetEntityNoBlueprint()) {
        if (t = t.GetComponent(217)) {
          t.TagContainer.UpdateExactTag(2, -1728163740, 1);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 20, "No Entity for TsBaseCharacter ANS CleanBurstCamera Begin", ["Name", a.GetName()]);
      }
    }
    return true;
  }
  K2_NotifyTick(t, s, e) {
    if (this.TsHideEffect && this.TsHiddenMap) {
      for (const i of this.TsHiddenMap.keys()) {
        if (i.Valid) {
          this.HideEffect(i, true);
        }
      }
    }
    return true;
  }
  K2_NotifyEnd(t, s) {
    var e;
    if (this.TsNoHitEffect && (t = t.GetOwner()) instanceof TsBaseCharacter_1.default) {
      if (e = t.GetEntityNoBlueprint()) {
        if (e = e.GetComponent(217)) {
          e.TagContainer.UpdateExactTag(2, -1728163740, -1);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 20, "No Entity for TsBaseCharacter ANS CleanBurstCamera End", ["Name", t.GetName()]);
      }
    }
    if (this.TsHiddenMap) {
      for (var [i, r] of this.TsHiddenMap) {
        if (i.Valid && (this.TsHideMesh && i.Entity.GetComponent(3).EnableActor(r), this.TsHideEffect)) {
          this.HideEffect(i, false);
        }
      }
      this.TsHiddenMap = undefined;
    }
    return true;
  }
  GetNotifyName() {
    return "大招时显隐Mesh和特效";
  }
  HideEffect(t, s) {
    t.Entity.GetComponent(43)?.CurrentSkill?.SetEffectHidden(s);
    t.Entity.GetComponent(21)?.SetHidden(s);
  }
}
exports.default = TsAnimNotifyStateCleanBurstCamera;
//# sourceMappingURL=TsAnimNotifyStateCleanBurstCamera.js.map