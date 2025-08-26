"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRaceItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchRaceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.HAu = undefined;
    this.kqe = () => {
      UiManager_1.UiManager.OpenView("FloroRanchRaceSelectView", this.HAu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, r, t) {
    this.HAu = e.SubDungeonData;
    var a;
    var i = this.HAu.RaceList;
    var o = e.RaceId;
    this.GetSprite(1)?.SetUIActive(o === 0);
    if (o === 0) {
      this.GetSprite(3)?.SetUIActive(false);
      this.GetTexture(2)?.SetUIActive(false);
      a = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      this.GetItem(4)?.SetUIActive(a.IsOtherRaceHasRedDot(i));
    } else {
      a = i.includes(o);
      this.GetSprite(3)?.SetUIActive(a);
      i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchRaceData(o);
      this.GetTexture(2)?.SetUIActive(true);
      this.SetTextureByPath(i.Icon, this.GetTexture(2));
      a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchRaceRedDot) ?? new Set();
      this.GetItem(4)?.SetUIActive(!a.has(e.RaceId));
    }
  }
}
exports.FloroRanchRaceItem = FloroRanchRaceItem;
//# sourceMappingURL=FloroRanchRaceItem.js.map