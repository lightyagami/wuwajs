"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewPlayerSupportTrialRoleViewModel = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class NewPlayerSupportTrialRoleViewModel {
  constructor(e, t, r, i, s = undefined) {
    this.Ajf = 0;
    this.Djf = "";
    this.Ujf = "";
    this.xjf = undefined;
    this.Bjf = 0;
    this.kjf = new Map();
    this.qjf = undefined;
    this.Ojf = undefined;
    this.Ajf = e;
    this.Djf = t;
    this.Ujf = r;
    this.Bjf = i;
    this.xjf = s;
  }
  get TrialRoleType() {
    return this.Ajf;
  }
  get CaptionIcon() {
    return this.Djf;
  }
  get CaptionText() {
    return this.Ujf;
  }
  get SelectedGroupId() {
    return this.xjf;
  }
  get HelpId() {
    return this.Bjf;
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
    this.qjf = e;
  }
  GetRequestTrialRoleLvUpFunc() {
    return this.qjf;
  }
  SetRequestSetCurUseTrialRoleFunc(e) {
    this.Ojf = e;
  }
  GetRequestSetCurUseTrialRoleFunc() {
    return this.Ojf;
  }
  SetTrialRoleGroupUnlockDesc(e) {
    this.kjf = e;
  }
  GetTrialRoleGroupUnlockDesc(e) {
    return this.kjf.get(e);
  }
}
exports.NewPlayerSupportTrialRoleViewModel = NewPlayerSupportTrialRoleViewModel;
//# sourceMappingURL=NewPlayerSupportTrialRoleViewModel.js.map