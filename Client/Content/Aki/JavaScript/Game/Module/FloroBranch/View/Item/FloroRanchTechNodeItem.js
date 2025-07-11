"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTechNodeItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchTechNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor(i, t, s) {
    super();
    this.Data = undefined;
    this.PreItem = undefined;
    this.LineComponentList = [];
    this.GridPanelItem = undefined;
    this.OnClickCallback = i => {};
    this.N8e = () => {
      if (this.OnClickCallback) {
        this.OnClickCallback(this);
      }
    };
    this.Data = t;
    this.PreItem = i;
    this.GridPanelItem = s;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [8, UE.UISprite], [9, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [10, UE.UIExtendToggle], [11, UE.UISprite]];
    this.BtnBindInfo = [[10, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(10).bLockStateOnSelect = true;
  }
  Refresh(i) {
    this.Data = i ?? this.Data;
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e = this.Data.PreNode;
    for (let s = 0; s < e.length; s++) {
      var h = t.GetFloroRanchTechnologyData(e[s]).Row - this.Data.Row;
      var h = this.GetPrePosItem(h);
      if (this.LineComponentList[s] === undefined) {
        LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_PastureSkillLine", h).then(i => {
          const t = new FloroRanchTechLine();
          t.CreateThenShowByActorAsync(i).then(() => {
            t.Refresh(this.Data.IsUnLock);
          });
          this.LineComponentList[s] = t;
        });
      } else {
        this.LineComponentList[s].Refresh(this.Data.IsUnLock);
      }
    }
    var i = t.GetTechnologyCoinNum() >= this.Data.Cost;
    var s = t.IsPreNodeAllUnlock(this.Data);
    this.SetSpriteByPath(this.Data.Icon, this.GetSprite(8), false);
    this.SetSpriteByPath(this.Data.Icon, this.GetSprite(11), false);
    this.GetSprite(11).SetUIActive(!this.Data.IsUnLock);
    this.GetSprite(8).SetUIActive(this.Data.IsUnLock);
    this.GetSprite(6).SetUIActive(!this.Data.IsUnLock);
    this.GetSprite(7).SetUIActive(this.Data.IsUnLock);
    this.GetSprite(9).SetUIActive(!this.Data.IsUnLock && i && s);
    var i = t.GetNextCanUnlockTechId();
    if (i === this.Data.Id && (s = UiManager_1.UiManager.GetViewByName("FloroRanchTechnologyView")).IsShowOrShowing) {
      s.TrySelectTechNode(this);
    }
  }
  GetPrePosItem(i) {
    if (i > 0) {
      return this.GetItem(2);
    } else if (i < 0) {
      return this.GetItem(0);
    } else {
      return this.GetItem(1);
    }
  }
  SetToggleState(i) {
    this.GetExtendToggle(10).SetToggleState(i, false);
  }
}
exports.FloroRanchTechNodeItem = FloroRanchTechNodeItem;
class FloroRanchTechLine extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(i) {
    var t = this.GetSprite(0);
    t.SetChangeColor(!i, t.changeColor);
  }
}
//# sourceMappingURL=FloroRanchTechNodeItem.js.map