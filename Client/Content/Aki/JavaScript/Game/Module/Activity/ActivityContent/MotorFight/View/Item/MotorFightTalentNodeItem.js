"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightTalentNodeItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
class MotorFightTalentNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super();
    this.Data = undefined;
    this.PreItem = undefined;
    this.LineComponentList = [];
    this.GridPanelItem = undefined;
    this.OnClickCallback = t => {};
    this.N8e = () => {
      if (this.OnClickCallback) {
        this.OnClickCallback(this);
      }
    };
    this.Data = i;
    this.PreItem = t;
    this.GridPanelItem = s;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [10, UE.UISprite], [11, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [0, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(0).bLockStateOnSelect = true;
  }
  Refresh(t) {
    this.Data = t ?? this.Data;
    var i = ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.GetMotorFightActivityData();
    var e = this.Data.PreNode;
    for (let s = 0; s < e.length; s++) {
      var h = i.GetMotorFightTalentData(e[s]).Row - this.Data.Row;
      var h = this.GetPrePosItem(h);
      if (this.LineComponentList[s] === undefined) {
        LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_MotorFightTogLine", h).then(t => {
          const i = new MotorFightTalentLine();
          i.CreateThenShowByActorAsync(t).then(() => {
            i.Refresh(this.Data.IsUnLock);
          });
          this.LineComponentList[s] = i;
        });
      } else {
        this.LineComponentList[s].Refresh(this.Data.IsUnLock);
      }
    }
    var t = i.GetTalentCoinNum() >= this.Data.Cost;
    var s = i.IsPreNodeAllUnlock(this.Data);
    var o = this.GetSprite(10);
    this.SetSpriteByPath(this.Data.Icon, o, false);
    o.SetChangeColor(!this.Data.IsUnLock, o.changeColor);
    var o = s && this.Data.IsFinishPreCondition && t;
    this.GetSprite(7).SetUIActive(!o && !this.Data.IsUnLock);
    this.GetSprite(8).SetUIActive(o && !this.Data.IsUnLock);
    this.GetSprite(11).SetUIActive(o && !this.Data.IsUnLock);
    this.GetSprite(9).SetUIActive(this.Data.IsUnLock);
    if (i.SelectedTalentNodeId === this.Data.Id) {
      this.OnClickCallback(this);
    }
  }
  GetPrePosItem(t) {
    if (t > 0) {
      return this.GetItem(3);
    } else if (t < 0) {
      return this.GetItem(1);
    } else {
      return this.GetItem(2);
    }
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleState(t, false);
  }
}
exports.MotorFightTalentNodeItem = MotorFightTalentNodeItem;
class MotorFightTalentLine extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  Refresh(t) {
    this.GetSprite(0)?.SetUIActive(t);
    this.GetSprite(1)?.SetUIActive(!t);
  }
}
//# sourceMappingURL=MotorFightTalentNodeItem.js.map