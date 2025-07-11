"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiFormationPanelData = exports.FormationItemData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const actionNames = [InputMappingsDefine_1.actionMappings.切换角色1, InputMappingsDefine_1.actionMappings.切换角色2, InputMappingsDefine_1.actionMappings.切换角色3, InputMappingsDefine_1.actionMappings.切换角色4];
class FormationItemData {
  constructor() {
    this.PlayerId = 0;
    this.RoleId = 0;
    this.RoleSkinId = 0;
    this.CreatureDataId = 0;
  }
}
exports.FormationItemData = FormationItemData;
class BattleUiFormationPanelData {
  constructor() {
    this.HIt = undefined;
    this.Nk_ = new Map();
    this.PositionItemMap = new Map();
  }
  Init() {}
  Clear() {
    this.PositionItemMap.clear();
  }
  UpdateFormationPanelData() {
    this.PositionItemMap.clear();
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
    var t = !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    for (const p of ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer() : [e]) {
      var a = p === e;
      var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(p);
      if (r) {
        r = r.GetGroup(1)?.GetRoleList();
        if (r) {
          if (a) {
            for (const M of r) {
              var o = M.RoleId;
              var n = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinIdByRoleId(o);
              this.PAl(p, o, n, M.CreatureDataId);
            }
          } else {
            var i = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(p);
            for (const u of r) {
              var s = u.RoleId;
              var l = i?.GetRoleInfoByConfigId(s);
              let e = 0;
              if (l) {
                e = l?.RoleSkinId ?? 0;
              } else {
                l = u.CreatureDataId;
                if (!l) {
                  return;
                }
                e = ModelManager_1.ModelManager.CreatureModel.GetEntity(l)?.Entity?.GetComponent(0)?.GetSkinId() ?? 0;
              }
              this.PAl(p, s, e, u.CreatureDataId);
            }
          }
        }
      } else if (!a && t) {
        r = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(p)?.RoleInfos;
        if (r) {
          for (const d of r) {
            this.PAl(p, d.RoleId, d.RoleSkinId);
          }
        }
      }
    }
  }
  PAl(e, t, a, r = undefined) {
    var o = this.PositionItemMap.size + 1;
    var n = new FormationItemData();
    n.PlayerId = e;
    n.RoleId = t;
    n.RoleSkinId = a;
    if (r !== undefined) {
      n.CreatureDataId = r;
    }
    this.PositionItemMap.set(o, n);
  }
  GetItemData(e) {
    return this.PositionItemMap.get(e);
  }
  GetRolePosition(e, t) {
    for (var [a, r] of this.PositionItemMap) {
      if (r.PlayerId === e && r.RoleId === t) {
        return a;
      }
    }
    return 0;
  }
  GetActionNames() {
    return actionNames;
  }
  SetInputType(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 48, "切换编队ActionInputHandler", ["type", e]);
    }
    this.HIt = this.Nk_.get(e);
  }
  RegisterInputHandler(e, t) {
    this.Nk_.set(e, t);
  }
  GetInputHandler() {
    return this.HIt;
  }
}
exports.BattleUiFormationPanelData = BattleUiFormationPanelData;
//# sourceMappingURL=BattleUiFormationPanelData.js.map