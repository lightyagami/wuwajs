"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMapNpcUi = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const PhantomArenaDefine_1 = require("../../../PhantomArena/PhantomArenaDefine");
class PhantomArenaMapNpcUi extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.MNf = false;
    this.MCt = 0;
    this.A4_ = e => {
      if (e === "Start" && this.MNf) {
        this.SPe?.PlaySequence("Unlock");
        this.MNf = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UITexture]];
  }
  OnStart() {
    this.SPe = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.SPe.BindOnEndSequenceEvent(this.A4_);
  }
  OnAfterShow() {
    this.SPe?.PlaySequence("Start");
  }
  SetData(e) {
    var a;
    var r;
    if (this.MCt !== e) {
      this.MCt = e;
      if (a = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(e)) {
        r = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(a.Id);
        this.GetTexture(6)?.SetUIActive(r === 2);
        this.GetItem(4)?.SetUIActive(r === 2);
        this.GetItem(3)?.SetUIActive(r === 0);
        r = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(a.Id)?.qgf ?? true ? a.NpcMapHead : ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(PhantomArenaDefine_1.MYSTERY_NPC_HEAD);
        this.TrySetTextureByPath(r, this.GetTexture(2));
        this.GetText(1)?.SetText(a.NpcNumber);
        if ((r = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentPhantomArenaActivityData()?.GetCurrentUnlockChallengeIds())?.has(a.Id)) {
          this.MNf = true;
          r.delete(a.Id);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "PhantomArenaMapNpcUi找不到对应的挑战数据", ["markId", e]);
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
  }
}
exports.PhantomArenaMapNpcUi = PhantomArenaMapNpcUi;
//# sourceMappingURL=PhantomArenaMapNpcUi.js.map