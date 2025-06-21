"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../GameSettings/GameSettingsManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  MAX_ENABLE_TIME = 2e4;
class TsAnimNotifyStateSceneInteract extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), this.SocketName = void 0, this.DataAssetRef = void 0, this.QualityRequire = 0, this.IgnoreCommonWeapon = !1, this.HandleMap = new Map
  }
  Constructor() {
    this.HandleMap = new Map
  }
  K2_NotifyBegin(e, t, r) {
    if (this.DataAssetRef) {
      var a = e.GetOwner();
      if (a instanceof TsBaseCharacter_1.default) {
        if (!ModelManager_1.ModelManager.SceneBattleInteractModel?.Open) return !1;
        if (0 < this.QualityRequire) {
          var i = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
          if (!i || i < 3) return !1
        }
        i = ResourceSystem_1.ResourceSystem.Load(this.DataAssetRef.ToAssetPathName(), UE.BP_SceneBattleInteract_C);
        if (!i) return !1;
        var s, n = ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(i);
        if (n) return s = n.Id, n.SetDispatchWeaponEventEnable(!0), n.SetUpdateLocationSocket(e, this.SocketName ?? FNameUtil_1.FNameUtil.EMPTY), n.SetEnable(!0, MAX_ENABLE_TIME), n.SetIgnoreCommonWeapon(this.IgnoreCommonWeapon), 0 !== (i = i.EntityType) && 1 !== i || (a = a.CharacterActorComponent?.Entity)?.Valid && (1 === i ? (i = a.GetComponent(0)?.GetSummonerId()) && (i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(i), n.BindEntityId(i)) : n.BindEntityId(a.Id)), this.HandleMap.set(e, s), !0
      }
    }
    return !1
  }
  K2_NotifyEnd(e, t) {
    if (this.DataAssetRef && e.GetOwner() instanceof TsBaseCharacter_1.default) {
      var r = this.HandleMap.get(e);
      if (r) return ModelManager_1.ModelManager.SceneBattleInteractModel?.Open && ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(r), this.HandleMap.delete(e), !0
    }
    return !1
  }
  GetNotifyName() {
    return "场景物件交互"
  }
}
exports.default = TsAnimNotifyStateSceneInteract;
//# sourceMappingURL=TsAnimNotifyStateSceneInteract.js.map