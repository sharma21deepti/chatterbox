const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} = require("../controllers/user");
const { validateCreateUser } = require("../validators/user");
const { handleValidation, allowRole } = require("../middleware/user");
const { authenticateToken } = require("../middleware/auth");
// router.get("/api/users", (req, res) => {
//   const html = `
//       <ol>
//       ${userData.map((user) => `<li>${user?.first_name}</li>`).join("")}
//       </ol>
//       `;

//   res.json(html);
// });
router
  .route("/")
  .get(authenticateToken, allowRole("user", "admin"), getAllUsers)
  .post(
    authenticateToken,
    allowRole("user", "admin"),
    validateCreateUser,
    handleValidation,
    handleCreateUser
  );

router.get("/:id", authenticateToken, allowRole("user", "admin"), getUserById);

router.patch("/:id", authenticateToken, allowRole("admin"), handleUpdateUser);

router.delete("/:id", authenticateToken, allowRole("admin"), handleDeleteUser);

module.exports = router;
