"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerScoreItem = undefined;
const UE = require("ue");
const Queue_1 = require("../../../../../../Core/Container/Queue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class WheelTowerScoreItem {
  constructor(e, t) {
    this.G_f = e;
    this.sit = t;
    this.F_f = new Map();
    this.Obi = undefined;
    this.N_f = new Queue_1.Queue();
    this.Rjt = false;
    this.ayf = new Map();
    this.pGo = () => {
      this.ayf.forEach(e => {
        e.Clear();
      });
      this.ayf.clear();
    };
    this.G_f.GetRootActor().OnDestroyed.Add(this.pGo);
  }
  Refresh(i) {
    var e;
    if (this.Rjt) {
      this.N_f.Push(i);
    } else {
      this.Rjt = true;
      if (this.Obi === i || (this.Obi !== undefined && this.F_f.get(this.Obi)?.SetUIActive(false), this.Obi = i, this.Obi === 0)) {
        this.Jft();
      } else if (this.F_f.has(i)) {
        this.F_f.get(i)?.SetUIActive(true);
        this.ayf.get(this.Obi)?.PlayOrReplaySequenceByName("Start");
        this.Jft();
      } else {
        e = ModelManager_1.ModelManager.WheelTowerModel.GetScoreResourceIdByLevel(i);
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
        this.G_f.LoadPrefabAsync(e, this.sit).then(e => {
          var e = e.GetComponentByClass(UE.UIItem.StaticClass());
          var t = new LevelSequencePlayer_1.LevelSequencePlayer(e);
          t.PlayOrReplaySequenceByName("Start");
          this.F_f.set(i, e);
          this.ayf.set(i, t);
          this.Jft();
        });
      }
    }
  }
  Jft() {
    var e;
    this.Rjt = false;
    if (!this.N_f.Empty) {
      e = this.N_f.Pop();
      this.Refresh(e);
    }
  }
}
exports.WheelTowerScoreItem = WheelTowerScoreItem;
//# sourceMappingURL=WheelTowerScoreItem.js.map