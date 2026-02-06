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
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
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
  K2_NotifyBegin(e, t, i) {
    if (this.DataAssetRef) {
      var r = e.GetOwner();
      var a = r instanceof TsBaseCharacter_1.default;
      var s = r instanceof TsBaseVehicle_1.default;
      if (a || s) {
        if (!ModelManager_1.ModelManager.SceneBattleInteractModel?.Open) {
          return false;
        }
        if (this.QualityRequire > 0) {
          s = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEQUALITY);
          if (!s || s < 3) {
            return false;
          }
        }
        s = ResourceSystem_1.ResourceSystem.Load(this.DataAssetRef.ToAssetPathName(), UE.BP_SceneBattleInteract_C);
        if (!s) {
          return false;
        }
        var n = ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(s);
        if (n) {
          var o = n.Id;
          n.SetDispatchWeaponEventEnable(true);
          n.SetUpdateLocationSocket(e, this.SocketName ?? FNameUtil_1.FNameUtil.EMPTY);
          n.SetEnable(true, MAX_ENABLE_TIME);
          n.SetIgnoreCommonWeapon(this.IgnoreCommonWeapon);
          this.HandleMap.set(e, o);
          if (!!a && ((e = s.EntityType) === 0 || e === 1)) {
            if ((o = r.CharacterActorComponent?.Entity)?.Valid) {
              if (e === 1) {
                if (a = o.GetComponent(0)?.GetSummonerId()) {
                  s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(a);
                  n.BindEntityId(s);
                }
              } else {
                n.BindEntityId(o.Id);
              }
            }
          }
          if (this.ShieldWaterMoveEffect) {
            e = r.GetEntityNoBlueprint();
            if (e?.Valid) {
              a = e.GetComponent(217);
              if (a) {
                a.TagContainer.UpdateExactTag(4, -1921814084, 1);
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
      var i = e.GetOwner();
      if (i instanceof TsBaseCharacter_1.default) {
        var r = this.HandleMap.get(e);
        if (r) {
          if (ModelManager_1.ModelManager.SceneBattleInteractModel?.Open) {
            ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(r);
          }
          this.HandleMap.delete(e);
          if (this.ShieldWaterMoveEffect) {
            r = i.CharacterActorComponent?.Entity;
            if (r?.Valid) {
              e = r.GetComponent(217);
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