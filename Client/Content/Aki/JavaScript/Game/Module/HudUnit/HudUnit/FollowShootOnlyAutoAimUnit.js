"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShootOnlyAutoAimUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
class FollowShootOnlyAutoAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Kti = undefined;
    this.dzm = undefined;
    this.mzm = undefined;
    this.SPe = undefined;
    this.dce = false;
    this.Yti = false;
    this.kQ_ = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.Kti = this.GetItem(0);
    this.dzm = this.GetItem(1);
    this.mzm = this.GetItem(2);
    this.Kti?.SetUIActive(false);
    this.dzm?.SetUIActive(false);
    this.mzm?.SetUIActive(false);
    this.dce = false;
    this.Yti = false;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.Kti = undefined;
    this.dzm = undefined;
    this.mzm = undefined;
    this.SPe?.Clear();
    this.SPe = undefined;
    super.OnBeforeDestroy();
  }
  SetActive(t) {
    if (!this.IsCreateOrCreating) {
      if (t !== this.dce) {
        this.dce = t;
        this.dzm?.SetUIActive(false);
        this.mzm?.SetUIActive(false);
        if (t) {
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
        this.Yti = t;
        this.Kti.SetUIActive(t);
      }
    }
  }
}
exports.FollowShootOnlyAutoAimUnit = FollowShootOnlyAutoAimUnit;
//# sourceMappingURL=FollowShootOnlyAutoAimUnit.js.map