"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPathFinder = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GridPathFinderDefine_1 = require("./GridPathFinderDefine");
class GridPathFinder {
  constructor(i, t = true, s = true, r = 0) {
    this.eFc = t;
    this.tFc = s;
    this.iFc = r;
    this.hB = undefined;
    this.rFc = [];
    this.oFc = [];
    this.hB = new GridPathFinderDefine_1.Grids(i);
  }
  FindPath(i, t) {
    this.rFc = [];
    this.oFc = [];
    this.hB.ResetGrids();
    var r;
    var s = this.hB.GetNodeAt(i);
    var e = this.hB.GetNodeAt(t);
    if (this.hB.IsWalkableAt(t) && this.hB.IsWalkableAt(i)) {
      s.IsOnOpenList = true;
      this.oFc.push(s);
      for (let t = 0; t < this.hB.Height; t++) {
        for (let i = 0; i < this.hB.Width; i++) {
          var h = this.hB.GetNodeAt({
            X: i,
            Y: t
          });
          if (h.IsWalkable) {
            h.SetH((0, GridPathFinderDefine_1.calculateHeuristic)(this.iFc, h.Position, e.Position));
          } else {
            h.SetValueToZero();
            h.IsOnClosedList = true;
            this.rFc.push(h);
          }
        }
      }
      let i = 0;
      while (this.oFc.length !== 0) {
        let t = 0;
        let s = this.oFc[0];
        for (let i = 0; i < this.oFc.length; i++) {
          var o = this.oFc[i];
          if (o.F < s.F) {
            s = o;
            t = i;
          }
        }
        s.IsOnOpenList = false;
        this.oFc.splice(t, 1);
        s.IsOnClosedList = true;
        this.rFc.push(s);
        if (s === e) {
          return (0, GridPathFinderDefine_1.backTrace)(e, this.eFc, this.tFc);
        }
        for (const d of this.hB.GetSurroundingNodes(s.Position)) {
          if (!d.IsOnClosedList && (r = s.G + d.Cost, !d.IsOnOpenList || r < d.G)) {
            d.SetG(r);
            d.ParentNode = s;
            if (d.IsOnOpenList) {
              d.ParentNode = s;
            } else {
              d.IsOnOpenList = true;
              this.oFc.push(d);
            }
          }
        }
        if (++i > MathUtils_1.MathUtils.Int32Max) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCommon", 37, "[GridPathFinder] 寻路搜索次数过多中止");
          }
          break;
        }
      }
    }
    return [];
  }
  UpdateGrid(i) {
    var t = this.hB.GetNodeByIndex(i.GridIndex);
    t.IsWalkable = i.Walkable;
    t.Cost = i.Cost;
  }
}
exports.GridPathFinder = GridPathFinder;
//# sourceMappingURL=GridPathFinder.js.map