const router = require("express").Router();
const listFavsController = require("../controllers/listFavs.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, listFavsController.list);
router.route("/:listFavsId").get(auth, listFavsController.show);
router.route("/").post(auth, listFavsController.create);
router.route("/:listFavsId").delete(auth, listFavsController.destroy);

module.exports = router;
