"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardBattleLoadingView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LoadingViewBase_1 = require("../../../Loading/View/LoadingViewBase");
class PhantomArenaCardBattleLoadingView extends LoadingViewBase_1.LoadingViewBase {
  constructor() {
    super(...arguments), this.SequencePlayer = void 0, this.Olc = e => {
      "Start" === e && this.SequencePlayer?.PlayLevelSequenceByName("Loop")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIText]
    ]
  }
  OnStart() {
    super.OnStart(), this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SequencePlayer.BindSequenceCloseEvent(this.Olc), this.Uan(), this.Hiu()
  }
  UpdateProgressRate(e) {}
  UpdateProgressValue(e) {
    this.SetTextProgressValue(0, e), 100 === e && this.SequencePlayer?.StopSequenceByKey("Loop")
  }
  OnLevelSequencePlayerBandStateChange(e) {
    this.SequencePlayer?.PlayLevelSequenceByName("Start")
  }
  Uan() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
      a = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterLevel(),
      n = ModelManager_1.ModelManager.PhantomArenaModel.GetMasterTitleId(),
      n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleMasterTitleById(n),
      n = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n.Name, n.Name),
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.LoadingConfig;
    t ? (t = t.pg1, t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(t), this.GetText(2)?.SetText(e ?? ""), this.GetText(3)?.SetText(`Lv.${a} ` + n), this.SetTextureByPath(t?.RoleHeadTexture ?? "", this.GetTexture(1))) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 77, "Cant get Phantom fighter Config")
  }
  Hiu() {
    var e, a, n = ModelManager_1.ModelManager.PhantomArenaBattleModel.LoadingConfig;
    n ? (n = n.e8n, n = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(n), e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n.NpcName, n.NpcName), a = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(n.NpcTitle, n.NpcTitle), this.GetText(5)?.SetText(e), this.GetText(6)?.SetText(`Lv.${n.NpcLevel} ` + a), this.SetTextureByPath(n.NpcHead, this.GetTexture(4))) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 77, "Cant get Phantom fighter Config")
  }
}
exports.PhantomArenaCardBattleLoadingView = PhantomArenaCardBattleLoadingView;
//# sourceMappingURL=PhantomArenaCardBattleLoadingView.js.map