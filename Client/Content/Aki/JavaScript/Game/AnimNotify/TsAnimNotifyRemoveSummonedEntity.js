"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyRemoveSummonedEntity extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.技能ID = -1;
    this.是否用当前Montage对应的技能ID = false;
    this.召唤者实体ID = -1;
    this.是否把当前播放动画的角色实体作为召唤者 = false;
    this.要删除的实体ID = -1;
    this.删除所有召唤者通过SkillId生成的实体 = false;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var e = e.GetOwner();
    let r = this.技能ID;
    let o = this.召唤者实体ID;
    let s = [];
    if (e instanceof TsBaseCharacter_1.default && (e = e.CharacterActorComponent?.Entity)?.Valid && (this.是否把当前播放动画的角色实体作为召唤者 && (o = e.Id), this.是否用当前Montage对应的技能ID) && (e = e.CheckGetComponent(43))) {
      r = e.GetCurrentMontageCorrespondingSkillId();
    }
    if (!ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(o)) {
      this.LogInternal("不存在召唤者实体" + o);
      return false;
    }
    if (this.删除所有召唤者通过SkillId生成的实体) {
      s = ModelManager_1.ModelManager.BulletModel.GetSummonEntityIds(o);
    } else {
      s.push(this.要删除的实体ID);
    }
    for (const i of s) {
      if (ModelManager_1.ModelManager.CreatureModel.GetServerEntityId(i)) {
        ControllerHolder_1.ControllerHolder.CreatureController.RemoveSummonEntityRequest(r, o, i);
      } else {
        this.LogInternal("不存在要删除的实体");
      }
    }
    return true;
  }
  GetNotifyName() {
    return "删除技能召唤的实体";
  }
  LogInternal(e) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Entity", 72, "[TsAnimNotifyRemoveSummonEntity]" + e, ["this.技能ID", this.技能ID], ["this.召唤者实体ID", this.召唤者实体ID], ["this.要删除的实体ID", this.要删除的实体ID]);
    }
  }
}
exports.default = TsAnimNotifyRemoveSummonedEntity;
//# sourceMappingURL=TsAnimNotifyRemoveSummonedEntity.js.map