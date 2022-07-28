import { Request, Response } from "express";
import Blogs from "../models/blogModel";
import Comments from "../models/commentModel";
import Preferances from "../models/preferanceModel";
import Users from "../models/userModel";
import { IReqAuth } from "../config/interface";
import mongoose from "mongoose";
import balanceCtrl from "./balanceCtrl";
import notificationCtrl from "./noticeCtrl";
import News from "../models/newsModel";

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;
  return { page, limit, skip };
};
const Pagination1 = (req: IReqAuth) => {
  let page = Math.floor(Number(req.query.page) / 3 + 1) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;
  return { page, limit, skip };
};

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const { title, content, description, thumbnail, category } = req.body;

      const newBlog = new Blogs({
        user: req.user._id,
        title: title.toLowerCase(),
        content,
        description,
        thumbnail,
        category,
      });

      await newBlog.save();
      if (
        req.user.blogcount === 0 &&
        req.user.referer !== "PediaGeek" &&
        req.user.referer !== ""
      ) {
        balanceCtrl.updateReferalbalance(req.user.referer, req.user._id);
        notificationCtrl.addNotification(
          req.user._id,
          "Referal money Added 🥰.",
          "Hii! " +
            " " +
            req.user.name +
            " Your referal amount is added to your wallet .Keep contributing and earn more ."
        );
      }
      req.user.blogcount = req.user.blogcount + 1;
      req.user.save();
      res.json({
        ...newBlog._doc,
        user: req.user,
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getHomeBlogs: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req) || { 4: 0 };
    try {
      if (Number(req.query.page) != 1) {
        let Data = await Blogs.aggregate([
          {
            $facet: {
              totalData: [
                // User
                {
                  $lookup: {
                    from: "users",
                    let: { user_id: "$user" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                      {
                        $project: {
                          password: 0,
                          referer: 0,
                          type: 0,
                          rf_token: 0,
                        },
                      },
                    ],
                    as: "user",
                  },
                },
                // array -> object
                { $unwind: "$user" },
                // Sorting
                { $sort: { earn: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                  $project: {
                    earn: 0,
                  },
                },
              ],
              totalCount: [
                {
                  $match: {},
                },
                { $count: "count" },
              ],
            },
          },
          {
            $project: {
              count: { $arrayElemAt: ["$totalCount.count", 0] },
              totalData: 1,
            },
          },
        ]);
        const blogs = Data[0].totalData;
        const count = Data[0].count;

        // Pagination
        let total = 0;

        if (count % limit === 0) {
          total = count / limit;
        } else {
          total = Math.floor(count / limit) + 1;
        }

        res.json({ blogs, total });
      } else {
        let Data = await Blogs.aggregate([
          {
            $search: {
              index: "bogs_search",
              text: {
                query: [
                  "monkypox",
                  "nature",
                  "hepatitits",
                  "world nature conservation",
                  "greenary",
                  "small things matters",
                  "natural beauty",
                  "nature",
                  "mountain",
                  "river",
                  "village"
                ],
                path: {
                  wildcard: "*",
                },
                fuzzy: {},
              },
            },
          },
          {
            $lookup: {
              from: "users",
              let: { user_id: "$user" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },

                {
                  $project: {
                    password: 0,
                    referer: 0,
                    type: 0,
                    rf_token: 0,
                  },
                },
              ],
              as: "user",
            },
          },
          // array -> object
          { $unwind: "$user" },
          // { $match: { $expr: { $eq: ["$user.role", "garnet"] } } },
          // Sorting
          { $limit: limit + 5 },
          {
            $project: {
              earn: 0,
            },
          },
        ]);

        res.json({ blogs: Data, total: 100 });
      }
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({ msg: err.message });
    }
  },
  getHomeBlogsBySearch: async (req: IReqAuth, res: Response) => {
    const { limit, skip } = Pagination1(req) || { 5: 0 };
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const user = await Preferances.findById(req.user._id);
      if (!user)
        if (!user)
          return res.status(200).json({ msg: "Personalize your feed." });
      const Data = await Blogs.aggregate([
        {
          $search: {
            index: "bogs_search",
            text: {
              query: user.interest,
              path: {
                wildcard: "*",
              },
              fuzzy: {},
            },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  referer: 0,
                  type: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "user",
          },
        },
        // array -> object
        { $unwind: "$user" },
        // Sorting
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            earn: 0,
          },
        },
      ]);

      res.json({ blogs: Data, total: 100 });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getHomeBlogsByCategory: async (req: IReqAuth, res: Response) => {
    const { limit, skip } = Pagination1(req) || { 5: 0 };
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const user = await Preferances.findById(req.user._id);
      if (!user) return res.status(200).json({ msg: "Personalize your feed." });
      const Data = await Blogs.aggregate([
        {
          $match: { $expr: { $in: ["$category", user.categoryid] } },
        },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  referer: 0,
                  type: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "user",
          },
        },
        // array -> object
        { $unwind: "$user" },
        // Sorting
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            earn: 0,
          },
        },
      ]);

      res.json({ blogs: Data, total: 100 });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getHomeBlogsByFollow: async (req: IReqAuth, res: Response) => {
    const { limit, skip } = Pagination1(req) || { 5: 0 };
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const user = await Users.findById(req.user._id);
      if (!user)
        if (!user)
          return res.status(200).json({ msg: "Personalize your feed." });
      const Data = await Blogs.aggregate([
        {
          $match: { $expr: { $in: ["$user", user.follower] } },
        },
        {
          $lookup: {
            from: "users",
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              {
                $project: {
                  password: 0,
                  referer: 0,
                  type: 0,
                  rf_token: 0,
                },
              },
            ],
            as: "user",
          },
        },
        // array -> object
        { $unwind: "$user" },
        // Sorting
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            earn: 0,
          },
        },
      ]);

      res.json({ blogs: Data, total: 100 });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getBlogsByCategory: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req) || { 5: 0 };
    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              // User
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    {
                      $project: {
                        password: 0,
                        referer: 0,
                        type: 0,
                        rf_token: 0,
                      },
                    },
                  ],
                  as: "user",
                },
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  earn: 0,
                },
              },
            ],
            totalCount: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlogsByUser: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req);
    try {
      const Data = await Blogs.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              // User
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getBlog: async (req: Request, res: Response) => {
    try {
      let blog = await Blogs.findOne({ _id: req.params.id })
        .populate("user", ["-password", "-type", "-paytm", "-referer"])
        .select("-earn");
      if (!blog) return res.status(400).json({ msg: "Blog does not exist." });
      delete blog.earn;
      blog.views = blog.views + 1;
      blog = await blog.save();

      if (blog.views === 20) {
        notificationCtrl.addNotification(
          blog.user,
          "Your blog is trending 🎉",
          " Your Blog : " +
            blog.title +
            " reached a milestone of 20 views. Keep sharing and earning.",
          "/blog/" + blog._id
        );
      }
      if (blog.views % 100 === 0) {
        notificationCtrl.addNotification(
          blog.user,
          "Your blog is trending 🎉",
          " Your Blog : " +
            blog.title +
            " reached a milestone of " +
            blog.views +
            " views. Keep sharing and earning.",
          "/blog/" + blog._id
        );
      }
      return res.json(blog);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const blog = await Blogs.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        req.body
      );

      if (!blog)
        return res.status(400).json({ msg: "Invalid Authentication." });

      res.json({ msg: "Update Success!", blog });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      // Delete Blog
      const blog = await Blogs.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!blog)
        return res.status(400).json({ msg: "Invalid Authentication." });

      // Delete Comments
      await Comments.deleteMany({ blog_id: blog._id });

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.aggregate([
        {
          $search: {
            index: "bogs_search",
            text: {
              query: req.query.title,
              path: {
                wildcard: "*",
              },
              fuzzy: {},
            },
          },
        },
        { $limit: 8 },
        {
          $project: {
            earn: 0,
          },
        },
      ]);

      if (!blogs.length) return res.status(400).json({ msg: "No Blogs." });
      res.json(blogs);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default blogCtrl;
