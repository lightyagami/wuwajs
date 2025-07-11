"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkMenu = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const MarkMenuItem_1 = require("./MarkMenuItem");
class MarkMenu extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.Q2o = undefined;
    this.d5a = [];
    this.C5a = [];
  }
  GetResourceId() {
    return "UiItem_MarkList_Prefab";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Close]];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
  }
  g5a(t) {
    this.C5a = [];
    var r = t - this.d5a.length;
    for (let e = 0; e < r; ++e) {
      var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(2));
      this.d5a.push(i);
    }
    for (let e = 0; e < this.d5a.length; ++e) {
      var s = e < t;
      if (s) {
        this.C5a.push(this.d5a[e]);
      }
      this.d5a[e].SetUIActive(s);
    }
    return this.C5a;
  }
  OnShowWorldMapSecondaryUi(e) {
    this.C5a = this.g5a(e.length);
    this.Q2o = [];
    let t = 0;
    for (const i of e) {
      const s = new MarkMenuItem_1.MarkMenuItem();
      var r = this.C5a[t++];
      s.Init(r, i).finally(() => {
        s.SetOnClick(e => {
          if (e === 1) {
            s.PlayReleaseSequence().then(() => {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MarkMenuClickItem, i);
            }, () => {});
          }
        });
        this.Q2o.push(s);
        this.RootItem.SetUIActive(true);
      });
    }
  }
  OnCloseWorldMapSecondaryUi() {
    for (const t of this.Q2o) {
      this.d5a = this.d5a.filter(e => e !== t.GetRootItem());
      t.Destroy();
    }
  }
  OnBeforeDestroy() {
    this.Q2o = [];
  }
  GetNeedBgItem() {
    return false;
  }
}
exports.MarkMenu = MarkMenu;
//# sourceMappingURL=MarkMenu.js.map