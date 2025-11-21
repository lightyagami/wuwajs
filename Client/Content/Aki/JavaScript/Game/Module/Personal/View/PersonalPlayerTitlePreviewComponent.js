"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitlePreviewComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PersonalPlayerTitlePreviewComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.SVd = undefined;
    this.MVd = undefined;
    this.EVd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.SVd = new PlayerTitleItem_1.PlayerTitleItem();
    this.MVd = new PlayerTitleItem_1.PlayerTitleItem();
    this.EVd = new PlayerTitleItem_1.PlayerTitleItem();
    await this.SVd.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    await this.MVd.CreateThenShowByActorAsync(this.GetItem(10).GetOwner());
    await this.EVd.CreateThenShowByActorAsync(this.GetItem(11).GetOwner());
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.bco();
  }
  bco() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  Refresh(e) {
    var i;
    var t;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetPlayerTitleItemConfig(e);
    var a = ModelManager_1.ModelManager.PersonalModel.GetCurCardId();
    var a = ConfigManager_1.ConfigManager.InventoryConfig.GetCardItemConfig(a);
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    var r = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(r);
    this.GetText(0).ShowTextNew(e.Description);
    if (e.IsShowProgress) {
      i = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleData(e.Id)?.CurProgress;
      t = ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleData(e.Id)?.TargetProgress;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.ItemAccess, i, t);
    } else {
      this.GetText(1).ShowTextNew(e.ItemAccess);
    }
    this.GetText(2).ShowTextNew(e.TitleName);
    this.GetText(7).SetText(ModelManager_1.ModelManager.FunctionModel.GetPlayerName());
    this.GetText(9).SetText(ModelManager_1.ModelManager.FunctionModel.GetPlayerName());
    this.SetTextureShowUntilLoaded(a.FunctionViewCardPath, this.GetTexture(3));
    this.SetTextureShowUntilLoaded(r.GetRoleHeadIconCircle(), this.GetTexture(4));
    this.SetTextureShowUntilLoaded(r.GetRoleHeadIconCircle(), this.GetTexture(5));
    this.SetTextureShowUntilLoaded(a.LongCardPath, this.GetTexture(6));
    this.Gac(e);
  }
  Gac(e) {
    this.SVd?.Refresh(e.Id, ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleStarLevel(e.Id), ModelManager_1.ModelManager.PersonalModel.GetSex());
    this.MVd?.Refresh(e.Id, ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleStarLevel(e.Id), ModelManager_1.ModelManager.PersonalModel.GetSex());
    this.EVd?.Refresh(e.Id, ModelManager_1.ModelManager.PersonalModel.GetPlayerTitleStarLevel(e.Id), ModelManager_1.ModelManager.PersonalModel.GetSex());
  }
}
exports.PersonalPlayerTitlePreviewComponent = PersonalPlayerTitlePreviewComponent;
//# sourceMappingURL=PersonalPlayerTitlePreviewComponent.js.map