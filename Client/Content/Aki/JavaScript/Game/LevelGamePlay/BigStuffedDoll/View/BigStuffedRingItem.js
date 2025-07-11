"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigStuffedRingItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BigStuffedDefine_1 = require("../BigStuffedDefine");
const BigStuffedRingBgItem_1 = require("./BigStuffedRingBgItem");
const BigStuffedRingLightItem_1 = require("./BigStuffedRingLightItem");
const BigStuffedRingSpecialAreaItem_1 = require("./BigStuffedRingSpecialAreaItem");
const BLANK_QTE_ANIM = "Miss";
const GOODAREA_QTE_ANIM = "Press01";
const BONUSAREA_QTE_ANIM = "Press02";
const SWITCH_IN_CURRENT = "In";
const SWITCH_OUT_CURRENT = "Out";
const CURRENT_RING_SHOW = "Start01";
const NOT_CURRENT_RING_SHOW = "Start02";
const COMMON_LIGHT = "Light01";
const PERFECT_LIGHT = "Light02";
class BigStuffedRingItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.Id = -1;
    this.Pfl = undefined;
    this.Ebl = undefined;
    this.wfl = undefined;
    this.Bfl = undefined;
    this.bfl = undefined;
    this.qfl = undefined;
    this.LevelSequencePlayer = undefined;
    this.Yrn = undefined;
    this.Gfl = false;
    this.cce = Rotator_1.Rotator.Create();
    this.XZh = 0;
    this.YZh = 0;
    this.Nfl = false;
    this.LDl = false;
    this.RDl = 0;
    this.Ibl = -1;
    this.owt = t => {
      switch (t) {
        case BLANK_QTE_ANIM:
        case GOODAREA_QTE_ANIM:
        case BONUSAREA_QTE_ANIM:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBigStuffedDollRingItemSequencePlayStart, this.Id, this.RDl, this.Ibl);
      }
    };
    this.yct = t => {
      switch (t) {
        case BLANK_QTE_ANIM:
        case GOODAREA_QTE_ANIM:
        case BONUSAREA_QTE_ANIM:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBigStuffedDollRingItemSequencePlayEnd, this.Id, this.RDl, this.Ibl);
      }
    };
    this.Id = t;
    this.wfl = i;
    this.Pfl = ModelManager_1.ModelManager.BigStuffedDollModel.GetRingConfig(t);
    if (this.Pfl) {
      this.Nfl = this.Config.InvalidBox.length === 0;
      i = this.Pfl.IsAnticlockwise ? 1 : 0;
      this.Ebl = ModelManager_1.ModelManager.BigStuffedDollModel.GameInfo.AddRingInfo(t, i);
      this.Bfl = new BigStuffedRingBgItem_1.BigStuffedRingBgItem(this.Id, this.Pfl, this.Ebl);
      this.bfl = new BigStuffedRingSpecialAreaItem_1.BigStuffedRingSpecialAreaItem(this.Id, this.Pfl, this.Ebl);
      this.qfl = new BigStuffedRingLightItem_1.BigStuffedRingLightItem(this.Id, this.Pfl);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]环配置找不到", ["id", t]);
    }
  }
  get Config() {
    return this.Pfl;
  }
  async InitAsync() {
    await this.CreateThenShowByActorAsync(this.wfl);
    var t = this.Pfl.Offset;
    if (t && (t.length > 0 && this.RootItem.SetAnchorOffsetX(this.Pfl.Offset[0]), t.length > 1)) {
      this.RootItem.SetAnchorOffsetY(this.Pfl.Offset[1]);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(3);
    await this.Bfl.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(4);
    await this.bfl.CreateThenShowByActorAsync(t.GetOwner());
    var t = this.GetItem(5);
    await this.qfl.CreateThenShowByActorAsync(t.GetOwner());
    this.Yrn = this.GetItem(2);
    this.Yrn.SetUIRelativeRotation(Rotator_1.Rotator.Create().ToUeRotator());
    this.Yrn.SetUIActive(false);
    this.GetTexture(0).SetAlpha(0);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceStartEvent(this.owt);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
  }
  OnAreaClick(t, i) {
    this.RDl = t;
    this.Ibl = i?.ContinuousIndex ?? -1;
    let e = undefined;
    let s = undefined;
    switch (t) {
      case 0:
        e = BLANK_QTE_ANIM;
        break;
      case 1:
        e = GOODAREA_QTE_ANIM;
        s = COMMON_LIGHT;
        break;
      case 2:
      case 3:
        e = BONUSAREA_QTE_ANIM;
        s = PERFECT_LIGHT;
    }
    this.LevelSequencePlayer.StopCurrentSequence(true, true);
    if (e) {
      this.LevelSequencePlayer.PlayLevelSequenceByName(e);
    }
    if (s) {
      this.LevelSequencePlayer.PlayLevelSequenceByName(s);
    }
  }
  OnArrowEnter() {
    this.Gfl = true;
    this.Yrn?.SetUIActive(true);
    this.LevelSequencePlayer.StopCurrentSequence(true, true);
    if (this.LDl) {
      this.LevelSequencePlayer.PlayLevelSequenceByName(SWITCH_IN_CURRENT);
    } else {
      this.LevelSequencePlayer.PlayLevelSequenceByName(CURRENT_RING_SHOW);
      this.LDl = true;
    }
  }
  OnArrowExit() {
    this.Gfl = false;
    this.Yrn?.SetUIActive(false);
    this.LevelSequencePlayer.StopCurrentSequence(true, true);
    if (this.LDl) {
      this.LevelSequencePlayer.PlayLevelSequenceByName(SWITCH_OUT_CURRENT);
    } else {
      this.LevelSequencePlayer.PlayLevelSequenceByName(NOT_CURRENT_RING_SHOW);
      this.LDl = true;
    }
  }
  OnArrowStayAreaUpdate(t) {
    if (this.Gfl) {
      var i = this.Ebl.GetValidAreas();
      if (i) {
        if (t < 0 || t >= i?.length) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]初始化Arrow时：相对有效区域索引越界", ["relativeValidAreaIndex", t]);
          }
        } else {
          i = i[t];
          this.XZh = -Math.max(i.StartCellIndex - 1, 0) * BigStuffedDefine_1.SINGLECELL_ANGLE;
          this.YZh = -i.EndCellIndex * BigStuffedDefine_1.SINGLECELL_ANGLE;
          if (this.YZh >= this.XZh) {
            this.YZh -= 360;
          }
          switch (i.ArrowDirection) {
            case 0:
              this.cce.Yaw = this.XZh;
              break;
            case 1:
              this.cce.Yaw = this.YZh;
          }
          this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "[BigStuffedDoll]初始化Arrow时：找不到有效区域", ["id", this.Id]);
      }
    }
  }
  OnTick(e) {
    var s = ModelManager_1.ModelManager.BigStuffedDollModel;
    if (this.Gfl && this.Pfl && s.GetGameStage() === 2) {
      var h = s.GetArrowSpeed(this.Pfl);
      if (h) {
        let t = -1;
        switch (s.CurrentArrowDirection) {
          case 0:
            t = -1;
            break;
          case 1:
            t = 1;
        }
        e = e / 1000;
        let i = this.cce.Yaw;
        if (this.Nfl) {
          i = this.cce.Yaw + t * (h * e);
        } else {
          if ((i = this.cce.Yaw + t * (h * e)) < this.YZh) {
            i = this.YZh;
            s.ArrowDirectionReverse();
          }
          if (i > this.XZh) {
            i = this.XZh;
            s.ArrowDirectionReverse();
          }
        }
        this.cce.Yaw = i;
        this.Yrn?.SetUIRelativeRotation(this.cce.ToUeRotator());
      }
    }
  }
  SpawnContinuousArea(t) {
    this.bfl.SpawnSingleContinuousArea(t);
  }
  GetCurrentArrowStayCellIndex() {
    var t;
    if (this.Gfl) {
      t = Math.abs(this.cce.Yaw) % 360;
      return Math.floor(t / BigStuffedDefine_1.SINGLECELL_ANGLE) + 1;
    } else {
      return 0;
    }
  }
}
exports.BigStuffedRingItem = BigStuffedRingItem;
//# sourceMappingURL=BigStuffedRingItem.js.map