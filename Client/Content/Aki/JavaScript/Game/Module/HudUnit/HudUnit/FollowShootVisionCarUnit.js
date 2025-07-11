"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShootVisionCarUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
class FollowShootVisionCarUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Kti = undefined;
    this.SPe = undefined;
    this.dce = false;
    this.Yti = false;
    this.kQ_ = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.Kti = this.GetItem(0);
    this.Kti.SetUIActive(false);
    this.dce = false;
    this.Yti = false;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.Kti = undefined;
    this.SPe?.Clear();
    this.SPe = undefined;
    super.OnBeforeDestroy();
  }
  SetActive(t) {
    if (!this.IsCreateOrCreating) {
      if (t !== this.dce) {
        if (this.dce = t) {
          super.SetActive(true);
          this.SPe?.StopSequenceByKey("Close");
          this.SPe?.PlaySequencePurely("Start");
          this.Yti = false;
          this.kQ_ = false;
        } else {
          this.SetTargetAimVisible(false, false);
          this.kQ_ = true;
          this.SPe?.StopSequenceByKey("Start");
          this.SPe?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise()).then(() => {
            if (!this.dce) {
              this.kQ_ = false;
              super.SetActive(false);
            }
          });
        }
      }
    }
  }
  SetTargetItemOffset(t, s) {
    if (this.Kti) {
      this.Kti.SetAnchorOffsetX(t);
      this.Kti.SetAnchorOffsetY(s);
    }
  }
  SetTargetAimVisible(t, s) {
    if (!this.kQ_ && this.Kti) {
      if (this.Yti === t) {
        if (t && s) {
          this.SPe?.PlaySequencePurely("Start_Red");
        }
      } else {
        if (this.Yti = t) {
          this.Kti.SetUIActive(true);
          this.SPe?.StopSequenceByKey("CloseL");
          this.SPe?.PlaySequencePurely("StartL");
        } else {
          this.SPe?.StopSequenceByKey("StartL");
          this.SPe?.PlaySequenceAsync("CloseL", new CustomPromise_1.CustomPromise()).then(() => {
            if (!this.Yti) {
              this.Kti?.SetUIActive(false);
            }
          });
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HudUnit", 67, "[FollowShootVisionCarAutoAimUnit]设置目标准心是否可见", ["isVisible", t]);
        }
      }
    }
  }
}
exports.FollowShootVisionCarUnit = FollowShootVisionCarUnit;
//# sourceMappingURL=FollowShootVisionCarUnit.js.map