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
    this.Slf = e;
    this.sit = t;
    this.Mlf = new Map();
    this.Obi = undefined;
    this.Elf = new Queue_1.Queue();
    this.Rjt = false;
    this.ICf = new Map();
    this.pGo = () => {
      this.ICf.forEach(e => {
        e.Clear();
      });
      this.ICf.clear();
    };
    this.Slf.GetRootActor().OnDestroyed.Add(this.pGo);
  }
  Refresh(i) {
    var e;
    if (this.Rjt) {
      this.Elf.Push(i);
    } else {
      this.Rjt = true;
      if (this.Obi === i || (this.Obi !== undefined && this.Mlf.get(this.Obi)?.SetUIActive(false), this.Obi = i, this.Obi === 0)) {
        this.Jft();
      } else if (this.Mlf.has(i)) {
        this.Mlf.get(i)?.SetUIActive(true);
        this.ICf.get(this.Obi)?.PlayOrReplaySequenceByName("Start");
        this.Jft();
      } else {
        e = ModelManager_1.ModelManager.WheelTowerModel.GetScoreResourceIdByLevel(i);
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
        this.Slf.LoadPrefabAsync(e, this.sit).then(e => {
          var e = e.GetComponentByClass(UE.UIItem.StaticClass());
          var t = new LevelSequencePlayer_1.LevelSequencePlayer(e);
          t.PlayOrReplaySequenceByName("Start");
          this.Mlf.set(i, e);
          this.ICf.set(i, t);
          this.Jft();
        });
      }
    }
  }
  Jft() {
    var e;
    this.Rjt = false;
    if (!this.Elf.Empty) {
      e = this.Elf.Pop();
      this.Refresh(e);
    }
  }
}
exports.WheelTowerScoreItem = WheelTowerScoreItem;
//# sourceMappingURL=WheelTowerScoreItem.js.map