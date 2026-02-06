"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadNetworkMarkItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
class InfrRoadNetworkMarkItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.J5m = 0;
    this.euf = false;
    this.D_g = 0;
    this.Hea = undefined;
    this.b6m = undefined;
    this.iuf = undefined;
    this.lBf = undefined;
    this.R6m = () => {
      this.b6m?.(this.J5m);
    };
    this.yct = t => {
      if (t === "Finish") {
        this.iuf?.();
        this.iuf = undefined;
      } else if (t === "Unlock") {
        this.lBf?.();
        this.lBf = undefined;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UINiagara], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.R6m]];
  }
  get Lo() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(this.J5m);
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.BindSequenceCloseEvent(this.yct);
  }
  OnAfterShow() {
    if (!this.euf) {
      this.Hea?.PlayLevelSequenceByName("Start");
    }
  }
  Refresh(t) {
    this.J5m = t;
    this.zhu();
    this.w6m();
    this.PKt();
  }
  zhu() {
    var t;
    if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.J5m)?.Status !== Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress) {
      this.GetSprite(5).SetUIActive(false);
    } else {
      t = this.Lo.Difficulty;
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(InfrastructureDefine_1.difficultySpriteResourceId[t]).Path;
      this.SetSpriteByPath(t, this.GetSprite(5), true);
    }
  }
  w6m() {
    var t = ModelManager_1.ModelManager.InfrastructureModel;
    var e = t.GetRoadDataByRoadId(this.J5m);
    this.GetSprite(4).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    if (e && e?.Status !== Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock) {
      if (t.TracedRoadId === this.J5m) {
        this.GetSprite(3).SetUIActive(true);
      } else if (t.RecommendRoadId === this.J5m) {
        this.GetSprite(4).SetUIActive(true);
      }
    } else {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
      this.Hea?.PlayLevelSequenceByName("LockState");
    }
  }
  PKt() {
    var t = ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.J5m)?.Status ?? Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock;
    if (t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusLock) {
      this.GetItem(8).SetUIActive(true);
      this.GetUiNiagara(7).SetUIActive(false);
    } else if (t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete) {
      if (!this.euf || this.D_g !== this.J5m) {
        this.GetItem(8).SetUIActive(false);
        this.GetItem(2).SetUIActive(true);
        this.GetItem(1).SetUIActive(true);
        this.GetUiNiagara(7).SetUIActive(true);
        this.GetItem(6).SetUIActive(true);
      }
    } else {
      this.GetItem(8).SetUIActive(false);
      this.GetUiNiagara(7).SetUIActive(true);
    }
    var e = ModelManager_1.ModelManager.InfrastructureModel.GetRoadMaterialEnough(this.J5m);
    this.GetItem(9).SetUIActive(e && t === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusProgress);
  }
  SetOnClickToggleCb(t) {
    this.b6m = t;
  }
  SetSelected(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
    if (t) {
      this.b6m?.(this.J5m);
    }
  }
  SetNeedPlayFinishSeq(t, e) {
    this.euf = t;
    this.D_g = e;
  }
  ShowMarkFinish(t) {
    this.euf = false;
    this.PKt();
    this.Hea?.PlayLevelSequenceByName("Finish");
    this.iuf = t;
  }
  ShowMarkUnlock(t) {
    ModelManager_1.ModelManager.InfrastructureModel.SetUnlockRoadMarkPlaySeq(this.J5m);
    this.Hea?.PlayLevelSequenceByName("Unlock");
    this.lBf = t;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e = this.GetExtendToggle(0)?.GetRootComponent();
    if (e) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.InfrRoadNetworkMarkItem = InfrRoadNetworkMarkItem;
//# sourceMappingURL=InfrRoadNetworkMarkItem.js.map