"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportTrialRoleViewModel = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class NewPlayerSupportTrialRoleViewModel {
  constructor(e, t, r, i, s = undefined) {
    this.v3f = 0;
    this.y3f = "";
    this.S3f = "";
    this.M3f = undefined;
    this.E3f = 0;
    this.I3f = new Map();
    this.T3f = undefined;
    this.b3f = undefined;
    this.v3f = e;
    this.y3f = t;
    this.S3f = r;
    this.E3f = i;
    this.M3f = s;
  }
  get TrialRoleType() {
    return this.v3f;
  }
  get CaptionIcon() {
    return this.y3f;
  }
  get CaptionText() {
    return this.S3f;
  }
  get SelectedGroupId() {
    return this.M3f;
  }
  get HelpId() {
    return this.E3f;
  }
  GetCurUseTrialRoleId() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetCurUseTrialRole(this.TrialRoleType)?.TrialRoleId;
  }
  CurUseTrialRoleGroupData() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetCurUseTrialRole(this.TrialRoleType);
  }
  GetTrialRoleByGroupId(e) {
    return ModelManager_1.ModelManager.TrialRoleModel.GetDataByGroupId(e);
  }
  GetTrialRoleList() {
    return ModelManager_1.ModelManager.TrialRoleModel.GetDataListByType(this.TrialRoleType);
  }
  SetRequestTrialRoleLvUpFunc(e) {
    this.T3f = e;
  }
  GetRequestTrialRoleLvUpFunc() {
    return this.T3f;
  }
  SetRequestSetCurUseTrialRoleFunc(e) {
    this.b3f = e;
  }
  GetRequestSetCurUseTrialRoleFunc() {
    return this.b3f;
  }
  SetTrialRoleGroupUnlockDesc(e) {
    this.I3f = e;
  }
  GetTrialRoleGroupUnlockDesc(e) {
    return this.I3f.get(e);
  }
}
exports.NewPlayerSupportTrialRoleViewModel = NewPlayerSupportTrialRoleViewModel;
//# sourceMappingURL=NewPlayerSupportTrialRoleViewModel.js.map