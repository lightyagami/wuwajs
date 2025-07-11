"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditTeamData = undefined;
const MultiTextLang_1 = require("../../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../../../Core/Utils/StringUtils");
const LevelGeneralCommons_1 = require("../../../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const BusinessDefine_1 = require("../BusinessDefine");
const CharacterData_1 = require("./CharacterData");
class EditTeamData {
  constructor(e, t, a) {
    this.Id = e;
    this.Type = t;
    this.UnLockCondition = a;
    this.CharacterDataList = [];
    this.jGi = 1;
    this.IsOwn = false;
    for (let e = 1; e <= BusinessDefine_1.CHARACTER_MAX; e++) {
      this.CharacterDataList.push(new CharacterData_1.CharacterData(e));
    }
  }
  get Level() {
    return this.jGi;
  }
  get Name() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel;
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.Id);
    if (t.Type === 1 && e.GetPlayerGender() === 1 || t.Type === 2 && e.GetPlayerGender() === 0) {
      return e.GetAccountName();
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
    }
  }
  GetCharacterDataList() {
    return this.CharacterDataList;
  }
  SetCharacterDataList(e) {
    this.CharacterDataList[0].SetCurrentValue(e.GGs);
    this.CharacterDataList[1].SetCurrentValue(e.OGs);
    this.CharacterDataList[2].SetCurrentValue(e.kGs);
    this.jGi = e.F6n;
  }
  SetCharacterDataByEditTeamData(e) {
    this.CharacterDataList[0].SetCurrentValue(e.CharacterDataList[0].CurrentValue);
    this.CharacterDataList[1].SetCurrentValue(e.CharacterDataList[1].CurrentValue);
    this.CharacterDataList[2].SetCurrentValue(e.CharacterDataList[2].CurrentValue);
    this.jGi = e.Level;
  }
  GetAllCharacterValue() {
    let e = 0;
    for (const t of this.CharacterDataList) {
      e += t.CurrentValue;
    }
    return e;
  }
  GetTeamDataUnLockState() {
    if (this.IsOwn) {
      return 2;
    }
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.Id);
    if (e.JumpType === 1) {
      if (ModelManager_1.ModelManager.MoonChasingTaskModel.GetMainLineState(e.JumpParam) !== 0) {
        return 1;
      }
    } else if (e.JumpType === 2) {
      if (ModelManager_1.ModelManager.MoonChasingTaskModel.GetBranchLineState(e.JumpParam) !== 0) {
        return 1;
      }
    }
    return 0;
  }
  GetUnLockConditionDesc() {
    var e = this.GetTeamDataUnLockState();
    if (e === 2) {
      return StringUtils_1.EMPTY_STRING;
    } else if (e === 0 && ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.Id).JumpType === 2) {
      if ((e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingIdByRoleId(this.Id)) <= 0) {
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Moonfiesta_InviteCondition2");
      } else {
        e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(e);
        return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Moonfiesta_InviteCondition1"), e.GetBuildingName());
      }
    } else {
      e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.UnLockCondition);
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    }
  }
}
exports.EditTeamData = EditTeamData;
//# sourceMappingURL=EditTeamData.js.map