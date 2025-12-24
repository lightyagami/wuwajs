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
    this.U4m = 0;
    this.klf = false;
    this.MXf = 0;
    this.Hea = undefined;
    this.aVm = undefined;
    this.Olf = undefined;
    this.JRf = undefined;
    this.hVm = () => {
      this.aVm?.(this.U4m);
    };
    this.yct = t => {
      if (t === "Finish") {
        this.Olf?.();
        this.Olf = undefined;
      } else if (t === "Unlock") {
        this.JRf?.();
        this.JRf = undefined;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UINiagara], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.hVm]];
  }
  get Lo() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigById(this.U4m);
  }
  OnStart() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Hea.BindSequenceCloseEvent(this.yct);
  }
  OnAfterShow() {
    if (!this.klf) {
      this.Hea?.PlayLevelSequenceByName("Start");
    }
  }
  Refresh(t) {
    this.U4m = t;
    this.zhu();
    this.lVm();
    this.PKt();
  }
  zhu() {
    var t;
    if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.U4m)?.Status !== Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress) {
      this.GetSprite(5).SetUIActive(false);
    } else {
      t = this.Lo.Difficulty;
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(InfrastructureDefine_1.difficultySpriteResourceId[t]).Path;
      this.SetSpriteByPath(t, this.GetSprite(5), true);
    }
  }
  lVm() {
    var t = ModelManager_1.ModelManager.InfrastructureModel;
    var e = t.GetRoadDataByRoadId(this.U4m);
    this.GetSprite(4).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    if (e && e?.Status !== Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock) {
      if (t.TracedRoadId === this.U4m) {
        this.GetSprite(3).SetUIActive(true);
      } else if (t.RecommendRoadId === this.U4m) {
        this.GetSprite(4).SetUIActive(true);
      }
    } else {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
      this.Hea?.PlayLevelSequenceByName("LockState");
    }
  }
  PKt() {
    var t = ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(this.U4m)?.Status ?? Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock;
    if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusLock) {
      this.GetItem(8).SetUIActive(true);
      this.GetUiNiagara(7).SetUIActive(false);
    } else if (t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
      if (!this.klf || this.MXf !== this.U4m) {
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
    var e = ModelManager_1.ModelManager.InfrastructureModel.GetRoadMaterialEnough(this.U4m);
    this.GetItem(9).SetUIActive(e && t === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusProgress);
  }
  SetOnClickToggleCb(t) {
    this.aVm = t;
  }
  SetSelected(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
    if (t) {
      this.aVm?.(this.U4m);
    }
  }
  SetNeedPlayFinishSeq(t, e) {
    this.klf = t;
    this.MXf = e;
  }
  ShowMarkFinish(t) {
    this.klf = false;
    this.PKt();
    this.Hea?.PlayLevelSequenceByName("Finish");
    this.Olf = t;
  }
  ShowMarkUnlock(t) {
    ModelManager_1.ModelManager.InfrastructureModel.SetUnlockRoadMarkPlaySeq(this.U4m);
    this.Hea?.PlayLevelSequenceByName("Unlock");
    this.JRf = t;
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