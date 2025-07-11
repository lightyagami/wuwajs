"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoDiceItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoDiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.lL1 = undefined;
    this.UiLevelSequence = undefined;
    this._L1 = e => {
      if (this.lL1.Kz_ === e) {
        this.GetItem(4).SetUIActive(true);
        this.UiLevelSequence.PlaySequence("Select");
      } else {
        this.GetItem(4).SetUIActive(false);
        this.UiLevelSequence.StopPrevSequence(false, true);
      }
    };
    this.zT1 = () => {
      this.GetItem(4).SetUIActive(false);
      this.UiLevelSequence.StopPrevSequence(false, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem]];
  }
  OnBeforeCreateImplement() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoRoundStart, this._L1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.zT1);
  }
  Refresh(e) {
    this.lL1 = e;
    var t = DangoManager_1.DangoManager.GetDangoData(e.Kz_);
    this.SetTextureShowUntilLoaded(t.DangoConfig.IconSmall, this.GetTexture(3));
    var t = ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoInfo(e.Kz_);
    var e = t.GetDiceIcon(e.D8n);
    var t = t.GetDiceConfig();
    this.GetItem(4).SetUIActive(false);
    this.SetTextureShowUntilLoaded(e, this.GetTexture(1));
    this.SetTextureShowUntilLoaded(t.DiceBackgroundIcon, this.GetTexture(0));
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoRoundStart, this._L1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh, this.zT1);
  }
}
exports.RacingBetsDangoDiceItem = RacingBetsDangoDiceItem;
//# sourceMappingURL=RacingBetsDangoDiceItem.js.map