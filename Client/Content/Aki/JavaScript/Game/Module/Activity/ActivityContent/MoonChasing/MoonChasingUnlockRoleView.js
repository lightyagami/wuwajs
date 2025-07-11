"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingUnlockRoleView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CharacterItemWithLine_1 = require("./Main/Business/Common/Character/CharacterItemWithLine");
const CharacterListModule_1 = require("./Main/Business/Common/Character/CharacterListModule");
class MoonChasingUnlockRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CharacterListModule = undefined;
    this.RoleId = undefined;
    this.dke = () => new CharacterItemWithLine_1.CharacterItemWithLine();
    this.m2e = () => {
      this.RoleId = ModelManager_1.ModelManager.MoonChasingBusinessModel.PopUnlockRoleId();
      if (this.RoleId) {
        this.UiViewSequence?.PlaySequencePurely("Switch");
        this.bl();
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.SpineSkeletonAnimationComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.m2e]];
  }
  async OnBeforeStartAsync() {
    this.RoleId = ModelManager_1.ModelManager.MoonChasingBusinessModel.PopUnlockRoleId();
    this.CharacterListModule = new CharacterListModule_1.CharacterListModule(this.dke);
    await this.CharacterListModule.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  async RAr(e) {
    await this.SetSpineAssetByPath(e.SmallSpineAtlas, e.SmallSpineSkeletonData, this.GetSpine(0));
    this.GetSpine(0).SetAnimation(0, "idle", true);
  }
  async bl() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.RoleId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    var i = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(this.RoleId);
    await Promise.all([this.RAr(e), this.CharacterListModule.RefreshByDataAsync(i.GetCharacterDataList())]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.JoinDialog);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.bl();
  }
}
exports.MoonChasingUnlockRoleView = MoonChasingUnlockRoleView;
//# sourceMappingURL=MoonChasingUnlockRoleView.js.map