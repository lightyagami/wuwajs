"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../GameSettings/GameSettingsManager");
const ModelManager_1 = require("../Manager/ModelManager");
const MAX_ENABLE_TIME = 20000;
class TsAnimNotifyStateSceneInteract extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.SocketName = undefined;
    this.DataAssetRef = undefined;
    this.QualityRequire = 0;
    this.IgnoreCommonWeapon = false;
    this.ShieldWaterMoveEffect = false;
    this.HandleMap = new Map();
  }
  Constructor() {
    this.HandleMap = new Map();
  }
  K2_NotifyBegin(e, t, r) {
    if (this.DataAssetRef) {
      var i = e.GetOwner();
      if (i instanceof TsBaseCharacter_1.default) {
        if (!ModelManager_1.ModelManager.SceneBattleInteractModel?.Open) {
          return false;
        }
        if (this.QualityRequire > 0) {
          var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
          if (!a || a < 3) {
            return false;
          }
        }
        a = ResourceSystem_1.ResourceSystem.Load(this.DataAssetRef.ToAssetPathName(), UE.BP_SceneBattleInteract_C);
        if (!a) {
          return false;
        }
        var s = ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(a);
        if (s) {
          var n;
          var o = s.Id;
          s.SetDispatchWeaponEventEnable(true);
          s.SetUpdateLocationSocket(e, this.SocketName ?? FNameUtil_1.FNameUtil.EMPTY);
          s.SetEnable(true, MAX_ENABLE_TIME);
          s.SetIgnoreCommonWeapon(this.IgnoreCommonWeapon);
          var a = a.EntityType;
          if (a === 0 || a === 1) {
            if ((n = i.CharacterActorComponent?.Entity)?.Valid) {
              if (a === 1) {
                if (a = n.GetComponent(0)?.GetSummonerId()) {
                  a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(a);
                  s.BindEntityId(a);
                }
              } else {
                s.BindEntityId(n.Id);
              }
            }
          }
          this.HandleMap.set(e, o);
          if (this.ShieldWaterMoveEffect) {
            a = i.CharacterActorComponent?.Entity;
            if (a?.Valid) {
              s = a.GetComponent(209);
              if (s) {
                s.TagContainer.UpdateExactTag(4, -1921814084, 1);
              }
            }
          }
          return true;
        }
      }
    }
    return false;
  }
  K2_NotifyEnd(e, t) {
    if (this.DataAssetRef) {
      var r = e.GetOwner();
      if (r instanceof TsBaseCharacter_1.default) {
        var i = this.HandleMap.get(e);
        if (i) {
          if (ModelManager_1.ModelManager.SceneBattleInteractModel?.Open) {
            ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(i);
          }
          this.HandleMap.delete(e);
          if (this.ShieldWaterMoveEffect) {
            i = r.CharacterActorComponent?.Entity;
            if (i?.Valid) {
              e = i.GetComponent(209);
              if (e) {
                e.TagContainer.UpdateExactTag(4, -1921814084, -1);
              }
            }
          }
          return true;
        }
      }
    }
    return false;
  }
  GetNotifyName() {
    return "场景物件交互";
  }
}
exports.default = TsAnimNotifyStateSceneInteract;
//# sourceMappingURL=TsAnimNotifyStateSceneInteract.js.map