import express from "express";
import auth from "../middleware/auth";
import dataCtrl from "../controllers/dataCtrl";

const router = express.Router();

router.post("/preferance", auth, dataCtrl.setPreferance);
router.get("/ispreferance", auth, dataCtrl.isPreferance);
router.post("/addcountry", auth, dataCtrl.addcountry);
router.patch("/searchcountry", auth, dataCtrl.searchcountry);
router.post("/addstate", auth, dataCtrl.addstate);
router.patch("/searchstate", auth, dataCtrl.searchstate);
router.post("/addcity", auth, dataCtrl.addcity);
router.patch("/searchcity", auth, dataCtrl.searchcity);
router.post("/addwork", auth, dataCtrl.addwork);
router.get("/searchwork", dataCtrl.searchwork);
router.post("/addaspire", auth, dataCtrl.addwork);
router.get("/searchaspire", dataCtrl.searchwork);
router.post("updatotherinfo", auth, dataCtrl.updateOtherinfo);
export default router;
