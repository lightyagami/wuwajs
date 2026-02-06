"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardBattleLoadingView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LoadingViewBase_1 = require("../../../Loading/View/LoadingViewBase");
class PhantomArenaCardBattleLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
    this.Olc = e => {
      if (e === "Start") {
        this.SequencePlayer?.PlayLevelSequenceByName("Loop");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    await this.vFm();
  }
  OnStart() {
    super.OnStart();
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SequencePlayer.BindSequenceCloseEvent(this.Olc);
    this.Uan();
    this.xsu();
  }
  UpdateProgressRate(e) {}
  UpdateProgressValue(e) {
    this.SetTextProgressValue(0, e);
    if (e === 100) {
      this.SequencePlayer?.StopSequenceByKey("Loop");
    }
  }
  OnLevelSequencePlayerBandStateChange(e) {
    this.SequencePlayer?.PlayLevelSequenceByName("Start");
  }
  async vFm() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    var a = [];
    a.push(this.SetTextureAsync(e.BvbLoadingBg, this.GetTexture(7)));
    a.push(this.SetTextureAsync(e.BvbLoadingTriangleBg, this.GetTexture(8)));
    a.push(this.SetTextureAsync(e.BvbLoadingLeftHand, this.GetTexture(9)));
    a.push(this.SetTextureAsync(e.BvbLoadingRightHand, this.GetTexture(10)));
    a.push(this.SetTextureAsync(e.BvbLoadingHandShadow, this.GetTexture(11)));
    await Promise.all(a);
  }
  Uan() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    var a = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(a).ActivityId;
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel(a);
    var a = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleId(a);
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(a);
    var a = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(a.Name, a.Name);
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.LoadingConfig;
    if (i) {
      i = i.Ng1;
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(i);
      this.GetText(2)?.SetText(e ?? "");
      this.GetText(3)?.SetText(`Lv.${t} ${a}`);
      this.SetTextureByPath(i?.RoleHeadTexture ?? "", this.GetTexture(1));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 77, "Cant get Phantom fighter Config");
    }
  }
  xsu() {
    var e;
    var a;
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.LoadingConfig;
    if (t) {
      t = t.e8n;
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(t);
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.NpcName, t.NpcName);
      a = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.NpcTitle, t.NpcTitle);
      this.GetText(5)?.SetText(e);
      this.GetText(6)?.SetText(`Lv.${t.NpcLevel} ${a}`);
      this.SetTextureByPath(t.NpcHead, this.GetTexture(4));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 77, "Cant get Phantom fighter Config");
    }
  }
}
exports.PhantomArenaCardBattleLoadingView = PhantomArenaCardBattleLoadingView;
//# sourceMappingURL=PhantomArenaCardBattleLoadingView.js.map