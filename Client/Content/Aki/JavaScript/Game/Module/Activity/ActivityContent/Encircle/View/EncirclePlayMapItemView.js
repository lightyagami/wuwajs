"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncirclePlayMapItemView = undefined;
const UE = require("ue");
const EncircleHexType_1 = require("../../../../../../Core/Define/Config/SubType/EncircleHexType");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const EncircleDefine_1 = require("../EncircleDefine");
const EncirclePlayLevelController_1 = require("../EncirclePlayLevelController");
class EncirclePlayMapItemView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Dbg = undefined;
    this.Ubg = undefined;
    this.l8f = undefined;
    this.E9 = undefined;
    this.OTg = e => {
      if (!EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ClickMapItem(this.Dbg, this.Ubg)) {
        this.SetTabToggle(0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OTg]];
  }
  OnStart() {
    this.E9 = undefined;
    this.l8f = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.GetItem(2)?.SetUIActive(false);
  }
  SetPos(e, i) {
    this.Dbg = e;
    this.Ubg = i;
  }
  GetType() {
    return this.E9;
  }
  UTt(e) {
    var i = this.GetSprite(1);
    this.SetSpriteByPath(e, i, false);
  }
  ChangeNorMap(e, r = undefined) {
    const s = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetMapItemResource(e);
    const l = this.E9;
    const n = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetMapItemType(e);
    e = (this.E9 = n) === EncircleHexType_1.EncircleHexType.Plain;
    this.GetExtendToggle(0)?.SetToggleState(e ? 0 : 2);
    e = () => {
      this.PVg();
      var e;
      var i;
      var t = this.z7g(n, l);
      this.Z7g(n, l);
      this.e9g(n, l);
      this.t9g(n, l);
      if (n === EncircleHexType_1.EncircleHexType.LimitWall && r) {
        e = EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetCurrentRound();
        i = EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetLimitWallByPosKey(r).LimitRound;
        i = this.AVg(i - e);
        this.UTt(i);
      } else if (!t) {
        this.UTt(s);
      }
    };
    if (n === EncircleHexType_1.EncircleHexType.Monster && l === EncircleHexType_1.EncircleHexType.Trap) {
      TimerSystem_1.GameplayTimerSystem.Delay(e, 500);
    } else {
      e();
    }
  }
  z7g(e, i) {
    let t = false;
    if (e === EncircleHexType_1.EncircleHexType.Plain && i === EncircleHexType_1.EncircleHexType.LimitWall) {
      this.GetSprite(3)?.SetAlpha(0);
      this.GetItem(3)?.SetUIActive(true);
      this.l8f.PlayLevelSequenceByName("Ice");
      t = true;
    }
    return t;
  }
  Z7g(e, i) {
    if (e === EncircleHexType_1.EncircleHexType.Wall) {
      this.GetItem(3)?.SetUIActive(true);
      this.l8f.PlayLevelSequenceByName("Start");
    }
  }
  e9g(e, i) {
    if (e === EncircleHexType_1.EncircleHexType.Trap) {
      this.GetItem(3)?.SetUIActive(true);
    }
  }
  t9g(e, i) {
    if (e === EncircleHexType_1.EncircleHexType.DifficultyWall) {
      this.GetSprite(5)?.SetAlpha(1);
      this.GetItem(3)?.SetUIActive(true);
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().IncreaseDifficultyRound();
    }
  }
  PVg() {
    this.GetSprite(5)?.SetAlpha(0);
    this.GetTexture(4)?.SetAlpha(0);
    this.GetSprite(1)?.SetAlpha(1);
    this.GetItem(3)?.SetUIActive(false);
    this.l8f?.StopSequenceByKey("Next", true, true);
  }
  ShowMonsterMoveEffect(e) {
    if (e) {
      this.l8f?.PlayOrReplaySequenceByName("Next");
    } else {
      this.l8f?.StopSequenceByKey("Next", true, true);
    }
  }
  AVg(e) {
    if (e === 1) {
      return EncircleDefine_1.LIMIT_WALL_ROUND1;
    } else if (e === 2) {
      return EncircleDefine_1.LIMIT_WALL_ROUND2;
    } else {
      return undefined;
    }
  }
  OnBeforeDestroy() {
    this.l8f?.Clear();
    this.l8f = undefined;
  }
  ShowSuccess() {
    if (this.E9 && this.E9 === EncircleHexType_1.EncircleHexType.Wall) {
      this.GetItem(2)?.SetUIActive(true);
    }
  }
  SetTabToggle(e) {
    this.GetExtendToggle(0).SetToggleStateForce(e, false);
  }
}
exports.EncirclePlayMapItemView = EncirclePlayMapItemView;
//# sourceMappingURL=EncirclePlayMapItemView.js.map