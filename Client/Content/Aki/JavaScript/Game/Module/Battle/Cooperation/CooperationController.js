"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CooperationController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const FormationDataController_1 = require("../../Abilities/FormationDataController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class CooperationController {
  static TryCooperate(e) {
    if (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "在换人请求返回前尝试换人");
      }
    } else {
      var o = ModelManager_1.ModelManager.SceneTeamModel;
      var r = o.GetCurrentTeamItem;
      var a = r?.EntityHandle;
      if (a && r.GetCreatureDataId() !== e) {
        var a = a.Entity.CheckGetComponent(215);
        var n = o.GetTeamItem(e, {
          ParamType: 3
        });
        if (n?.EntityHandle) {
          if (n.IsMyRole()) {
            if (a.HasTag(1008164187)) {
              if (n.IsDead()) {
                ControllerHolder_1.ControllerHolder.DeadReviveController.TryReviveRoleWhenCurrentRoleDead(n.GetCreatureDataId(), n.GetConfigId);
              }
            } else if (!a.HasTag(191377386)) {
              var l = ModelManager_1.ModelManager.TowerModel.CheckInTower();
              var t = ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower();
              var t = l || t;
              if (a.HasTag(-1697149502)) {
                if (t && !FormationDataController_1.FormationDataController.GlobalIsInFight) {
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotChangeRoleBeforeStartBattle");
                }
              } else {
                if (o.CurrentGroupType === 1) {
                  if (n.IsDead()) {
                    if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() || l) {
                      if (l) {
                        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonShieldViewCantOpen");
                      }
                      return;
                    } else {
                      ControllerHolder_1.ControllerHolder.DeadReviveController.TryReviveRole(n.GetCreatureDataId(), n.GetConfigId);
                      return;
                    }
                  } else {
                    if ((t = n.CanGoBattle()) !== 0) {
                      if (Log_1.Log.CheckInfo()) {
                        Log_1.Log.Info("SceneTeam", 48, "上场角色无法换人", ["Result", t], ["roleId", n.GetConfigId]);
                      }
                    } else {
                      this.n7a(r, n);
                    }
                    return;
                  }
                }
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SceneTeam", 48, "当前正在非战斗编队组，不能切角色");
                }
              }
            }
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneTeam", 48, "上场角色为其他玩家的角色", ["CreatureDataId", e]);
            }
            if (n.IsDead()) {
              ControllerHolder_1.ControllerHolder.DeadReviveController.CheckOtherPlayerReviveCooldown(n.GetPlayerId(), n.GetCreatureDataId());
            } else if (!a.HasTag(-1697149502)) {
              this.n7a(r, n);
            }
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "上场角色实体不存在", ["CreatureDataId", e]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "下场角色实体不存在或相同", ["CreatureDataId", e]);
      }
    }
  }
  static n7a(e, o) {
    for (const r of ModelManager_1.ModelManager.CooperationModel.GetHandlers()) {
      if (r.Trigger(e, o)) {
        break;
      }
    }
  }
}
(exports.CooperationController = CooperationController).FormationInputHandler = e => {
  let o = -1;
  switch (e) {
    case InputMappingsDefine_1.actionMappings.切换角色1:
      o = 1;
      break;
    case InputMappingsDefine_1.actionMappings.切换角色2:
      o = 2;
      break;
    case InputMappingsDefine_1.actionMappings.切换角色3:
      o = 3;
      break;
    case InputMappingsDefine_1.actionMappings.切换角色4:
      o = 4;
  }
  if (!(o < 0)) {
    e = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(o)?.CreatureDataId ?? 0;
    CooperationController.TryCooperate(e);
  }
};
//# sourceMappingURL=CooperationController.js.map