import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Preferances from "../models/preferanceModel";
import Countries from "../models/countryModel";
import Cities from "../models/cityModel";
import States from "../models/stateModel";
import Works from "../models/workModel";
import bcrypt from "bcrypt";

const dataCtrl = {
  setPreferance: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const { locality, state, city, country, birthday, interests, language } =
        req.body;

      await Preferances.findOneAndUpdate(
        { _id: req.user._id },
        { locality, state, city, country, birthday, interests, language },
        { upsert: true, new: true }
      );
      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addcountry: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const { country } = req.body;
      const countri = new Countries({ name: country });
      const saved = countri.save();
      res.json(saved);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchcountry: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      console.log(req.query.country);
      let countries = await Countries.find({
        //updated only to convert to lower case.
        name: { $regex: `${req.query.country}`.toLocaleLowerCase() },
      }).limit(10);
      res.json(countries);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addcity: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const { city } = req.body;
      const countri = new Cities({ name: city });
      const saved = countri.save();
      res.json(saved);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchcity: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      console.log(req.query.city);
      let cities = await Cities.find({
        //updated only to convert to lower case.
        name: { $regex: `${req.query.city}`.toLocaleLowerCase() },
      }).limit(10);
      res.json(cities);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addstate: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const { state } = req.body;
      const countri = new States({ name: state });
      const saved = countri.save();
      res.json(saved);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchstate: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      console.log(req.query.state);
      let states = await States.find({
        //updated only to convert to lower case.
        name: { $regex: `${req.query.state}`.toLocaleLowerCase() },
      }).limit(10);

      res.json(states);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addwork: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const { work } = req.body;
      const countri = new Works({ name: work });
      const saved = countri.save();
      res.json(saved);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchwork: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      console.log(req.query.work);
      let works = await Works.find({
        //updated only to convert to lower case.
        name: { $regex: `${req.query.work}`.toLocaleLowerCase() },
      }).limit(10);
      res.json(works);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default dataCtrl;
