import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admins, validateAdmin } from "../models/adminSchema.js";

class AdminsController {
  async get(req, res) {
    try {
      const admins = await Admins.find();

      if (!admins) {
        return res.status(400).json({
          msg: "Admin is not defined",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "All Admins",
        variant: "success",
        payload: admins,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async registerAdmin(req, res) {
    try {
      const { error } = validateAdmin(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "error",
          payload: null,
        });

      const { username, password } = req.body;

      const existingAdmin = await Admins.findOne({ username });

      if (existingAdmin)
        return res.status(400).json({
          msg: "Admin already exists.",
          variant: "error",
          payload: null,
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const admin = await Admins.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json({
        msg: "Admin registered successfully",
        variant: "success",
        payload: admin,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }

  //   async delete(req, res) {
  //     try {
  //       const { id } = req.params;
  //       await Admins.findByIdAndDelete(id);
  //       res.status(201).json({
  //         msg: "blog is deleted",
  //         variant: "success",
  //         payload: null,
  //       });
  //     } catch {
  //       res.status(500).json({
  //         msg: "server error",
  //         variant: "error",
  //         payload: null,
  //       });
  //     }
  //   }
  //   async updateBlog(req, res) {
  //     try {
  //       const { id } = req.params;
  //       let blog = await Admins.findByIdAndUpdate(id, req.body, { new: true });
  //       res.status(200).json({
  //         msg: "user updated",
  //         variant: "success",
  //         payload: blog,
  //       });
  //     } catch (err) {
  //       res.status(500).json({
  //         msg: err.message,
  //         variant: "error",
  //         payload: null,
  //       });
  //     }
  //   }
}

export default new AdminsController();
