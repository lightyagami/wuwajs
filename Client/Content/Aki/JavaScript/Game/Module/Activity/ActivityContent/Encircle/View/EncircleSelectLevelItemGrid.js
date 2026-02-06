"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncircleSelectLevelItemGrid = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityEncircleController_1 = require("../ActivityEncircleController");
const NORMAL_COLOR = "FFFFFF";
const LOCK_COLOR = "C2D1DD";
class EncircleSelectLevelItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.m_i = undefined;
    this.Xy = 0;
    this.jFe = false;
    this.X3g = false;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.jVg = undefined;
    this.GTg = i => {
      if (this.m_i) {
        this.RefreshView(this.m_i);
      }
    };
    this.Wbg = () => {
      var i;
      if (this.jFe) {
        if (this.X3g) {
          i = {
            GroupId: this.m_i.GroupId
          };
          UiManager_1.UiManager.OpenView("EncircleLevelDetailView", i);
          return;
        } else {
          i = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(this.jVg.Challenges[0]);
          if (i = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleChallengeConfig(i.PreId)) {
            i = i.LevelTitle;
            i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i);
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Encirle_DifficultyLockTips_Text", i);
            return;
          } else {
            return undefined;
          }
        }
      }
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Encirle_LevelLockTips_Text");
    };
    this.RefreshTimeTick = i => {
      this.Qbg();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIArtText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite]];
    this.BtnBindInfo = [[0, this.Wbg]];
  }
  J$l() {
    this.sKe = TickSystem_1.TickSystem.Add(this.RefreshTimeTick, "EncircleSelectLevelItemGrid", 0, true, undefined, true).Id;
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Pause(this.sKe);
    }
  }
  OnStart() {
    this.J$l();
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EncircleDataUpdate, this.GTg);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EncircleDataUpdate, this.GTg);
  }
  OnBeforeShow() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Resume(this.sKe);
    }
  }
  RefreshView(i) {
    this.m_i = i;
    this.jVg = ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetEncircleGroup(this.m_i.GroupId);
    this.Qbg();
    this.Pqe();
    this.Lbg();
    this._Ge();
  }
  Qbg() {
    var i = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    if (i) {
      this.jFe = i.CheckChallengeIsOpen(this.jVg.Challenges[0]);
      this.X3g = i.CheckPreChallengeComplete(this.jVg.Challenges[0]);
      this.GetItem(1)?.SetUIActive(this.jFe && this.X3g);
      this.GetItem(2)?.SetUIActive(!this.jFe || !this.X3g);
      this.GetItem(5)?.SetUIActive(!this.jFe);
      this.GetSprite(11)?.SetUIActive(this.jFe);
      if (!this.jFe) {
        this.GetText(6)?.SetText(i.GetUnlockDesc(this.jVg.Challenges[0]));
      }
      if (this.jFe && this.X3g) {
        this.GetText(4)?.SetColor(UE.Color.FromHex(NORMAL_COLOR));
        this.GetSprite(11)?.SetColor(UE.Color.FromHex(NORMAL_COLOR));
      } else {
        this.GetText(4)?.SetColor(UE.Color.FromHex(LOCK_COLOR));
        this.GetSprite(11)?.SetColor(UE.Color.FromHex(LOCK_COLOR));
      }
    }
  }
  _Ge() {
    var i = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    if (i) {
      i = i.CheckGroupRedPointShow(this.jVg.Id);
      this.GetItem(10)?.SetUIActive(i);
    }
  }
  Pqe() {
    this.GetArtText(3)?.SetText((this.Xy + 1).toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.jVg.LevelTitle);
  }
  Lbg() {
    var i;
    var t = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    if (t) {
      i = t.CheckChallengeComplete(this.jVg.Challenges[0]);
      this.GetItem(7)?.SetUIActive(i);
      i = t.CheckChallengeComplete(this.jVg.Challenges[1]);
      this.GetItem(8)?.SetUIActive(i);
      this.GetItem(9)?.SetUIActive(i);
    }
  }
  SetIndex(i) {
    this.Xy = i;
  }
  OnAfterHide() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Pause(this.sKe);
    }
  }
  OnBeforeDestroy() {
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
    this.RemoveEventListener();
  }
}
exports.EncircleSelectLevelItemGrid = EncircleSelectLevelItemGrid;
//# sourceMappingURL=EncircleSelectLevelItemGrid.js.map