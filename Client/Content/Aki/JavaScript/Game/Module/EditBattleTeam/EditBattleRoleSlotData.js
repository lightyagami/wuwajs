"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBattleRoleSlotData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const EditBattleRoleData_1 = require("./EditBattleRoleData");
class EditBattleRoleSlotData {
  constructor(t) {
    this.Wst = undefined;
    this.cC = t;
  }
  SetRoleData(t) {
    this.Wst = t;
  }
  SetRoleDataByPrewarInfo(t) {
    var e = t.GetConfigId();
    var a = t.GetSkinId();
    var i = t.GetOnlineNumber();
    var o = t.GetPlayerName();
    var r = t.GetPlayerId();
    var s = t.GetLevel();
    var l = t.IsSelf();
    var h = t.GetIsReady();
    this.Wst ||= new EditBattleRoleData_1.EditBattleRoleData();
    this.Wst.Init(r, e, a, i, o, s, l, h);
    this.Wst.ThirdPartyOnlineId = t.GetPlayerOnlineId();
  }
  ResetRoleData() {
    this.Wst = undefined;
  }
  get GetRoleData() {
    return this.Wst;
  }
  get GetRoleConfigId() {
    var t = this.GetRoleData;
    if (t) {
      return t.ConfigId;
    }
  }
  get HasRole() {
    return this.GetRoleData !== undefined;
  }
  get GetPosition() {
    return this.cC;
  }
  get IsProhibit() {
    var t;
    var e = ModelManager_1.ModelManager.EditBattleTeamModel;
    return !e.IsMultiInstanceDungeon && (e.GetLeaderIsSelf ? (t = this.GetPosition, (e = e.GetMaxLimitRoleCount()) !== 0 && e < t) : !this.HasRole || !this.GetRoleData.IsSelf);
  }
  get CanEditRoleSlot() {
    return !this.IsProhibit && (this.HasRole ? this.GetRoleData.IsSelf : ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderIsSelf);
  }
}
exports.EditBattleRoleSlotData = EditBattleRoleSlotData;
//# sourceMappingURL=EditBattleRoleSlotData.js.map