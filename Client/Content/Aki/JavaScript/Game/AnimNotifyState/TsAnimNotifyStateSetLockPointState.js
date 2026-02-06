"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateSetLockPointState extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.BoneName = "";
    this.SoftLockValid = false;
    this.HardLockValid = false;
    this.OldSoftLockValid = false;
    this.OldHardLockValid = false;
  }
  Constructor() {
    this.OldSoftLockValid = false;
    this.OldHardLockValid = false;
  }
  K2_NotifyBegin(t, e, i) {
    var s;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.CharacterActorComponent.LockOnParts.has(this.BoneName) ? (s = t.CharacterActorComponent.LockOnParts.get(this.BoneName), this.OldSoftLockValid = s.SoftLockValid, this.OldHardLockValid = s.HardLockValid, s.SoftLockValid = this.SoftLockValid, s.HardLockValid = this.HardLockValid, Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(34)?.RefreshCurrentLockState(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.CharacterActorComponent.Entity), this.BoneName), true) : (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 57, `[TsAnimNotifyStateSetLockPointState.NotifyBegin]: 角色'${t.GetName()}'未找到锁定点'${this.BoneName}'`), false));
  }
  K2_NotifyEnd(t, e) {
    var i;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t.CharacterActorComponent.LockOnParts.has(this.BoneName) ? ((i = t.CharacterActorComponent.LockOnParts.get(this.BoneName)).SoftLockValid = this.OldSoftLockValid, i.HardLockValid = this.OldHardLockValid, true) : (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 57, `[TsAnimNotifyStateSetLockPointState.NotifyEnd]: 角色'${t.GetName()}'未找到锁定点'${this.BoneName}'`), false));
  }
  GetNotifyName() {
    return "设置部位软硬锁是否启用";
  }
}
exports.default = TsAnimNotifyStateSetLockPointState;
//# sourceMappingURL=TsAnimNotifyStateSetLockPointState.js.map